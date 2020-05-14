let molecules = [];
const numOfMolecules = 500;
const gridCols = 10;
const gridRows = 10;
let gridWidth;
let gridHeight;
let intersectCount = 0;
let radiusMin = this.radius;
let radiusMax = this.radius;

const lifeCycle = 10000;
let percentOfInfected = 10;
let rateOfInfection = 0.5;
let percentOfSocialDistancing = 75;
showLines = false;
healthyStep = true;
let visualHeight = 150;
let graphHeight = 100;
let visualData = [];
let graphLeftOffset = 300;
let graphTopOffset = 30;
let graphWidth = 500;

let gridMolecules = [];

function setup() {
    createCanvas(1000, 1000);
    pixelDensity(1)
    background(127);

    makeMolecules();
    showGUI();

    gridifyBalls();

    gridWidth = width / gridCols;
    gridHeight = (height - visualHeight) / gridRows;
    smooth();
    // noLoop();

}

function draw() {

    background(240);
    make2dArray();
    resetBalls();
    splitIntoGrids();
    checkIntersections();
    if (guiObj.drawGrid) drawGrid();
    renderGrid();
    if(guiObj.renderGraph) renderGraph();


}

var guiObj = {
    drawGrid: true,
    renderGraph: true

  };
function showGUI(){
    let gui = new dat.GUI();
    gui.domElement.id = "gui";

    gui.add(guiObj, "drawGrid");
    gui.add(guiObj, "renderGraph");
}

function makeMolecules(){
       for (let i = 0; i < numOfMolecules; i++) {
    
           let randomNum = random();
           const Distancing = (randomNum < percentOfSocialDistancing / 100);
           if (randomNum < percentOfInfected  /100) {
               molecules.push(new Infector(i, false));
    
           } else {
               molecules.push(new Healthy(i,Distancing));
           }
       }
    }



function make2dArray() {
    gridMolecules = [];

    for (let i = 0; i < gridRows; i++) {
        gridMolecules.push([])
        for (let j = 0; j < gridCols; j++) {
            gridMolecules[i].push([])
        }
    }
}

function checkIntersections() {


    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            let tempArray = gridMolecules[i][j];
            let numInArray = tempArray.length
            if (numInArray > 1) {
                for (let z = 0; z < numInArray; z++) {
                    for (let w = z + 1; w < numInArray; w++) {
                        let indexValue01 = tempArray[z];
                        let indexValue02 = tempArray[w];

                        if(molecules[indexValue01].checkIntersecting(indexValue02)){
                            molecules[indexValue01].checkHealth(indexValue02)
                        }
                    }
                }
            }
        }
    }
}

function drawGrid() {
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            noFill();
            strokeWeight(1)
            stroke(0, 244, 0, 50);
            rect(j * gridWidth, i * gridHeight, gridWidth, gridHeight);

            let intersectCount = 0;

            let tempArray = gridMolecules[i][j];
            let numArray = tempArray.length;

            tempArray.forEach(function (indexValue) {

                if (molecules[indexValue].intersecting == true) {
                    intersectCount++
                }
            })

            if (numArray == 0) {
                numArray = ""
            }

            noStroke();
            fill(255, 255, 255, 255);
            textSize(16);
            textAlign(RIGHT);
            text(numArray, j * gridWidth + gridWidth - 5, i * gridHeight + 20);

            fill(255, 50, 0, 150);
            text(intersectCount, j * gridWidth + gridWidth - 5, i * gridHeight + gridHeight - 5);

        }
    }
   

}

function splitIntoGrids() {


    molecules.forEach(function (molecule) {
        let iNum = floor(molecule.position.y / gridHeight);
        let jNum = floor(molecule.position.x / gridWidth);
        
        if(iNum<0){iNum=0}
        if(iNum>gridRows-1){iNum=gridRows-1}
        if(jNum<0){jNum=0}
        if(jNum>gridCols-1){
            jNum=gridCols-1
        }
        
        gridMolecules[iNum][jNum].push(molecule.arrayPosition);

        if (molecule.position.x % width < molecule.radius && molecule.position.x > width) {    
            gridMolecules[iNum][jNum - 1].push(molecule.arrayPosition);
            molecule.left = true;
        }
        
        if (molecule.position.x % width > width - molecule.radius && molecule.position.x < width - width) {
            gridMolecules[iNum][jNum + 1].push(molecule.arrayPosition);
            molecule.right = true;
        }
        
        if (molecule.position.y % height < molecule.radius && molecule.position.y > height) {   
            gridMolecules[iNum - 1][jNum].push(molecule.arrayPosition);
            molecule.bottom = true;
        }
        
        if (molecule.position.y % height > height - molecule.radius && molecule.position.y < height - visualHeight - width) {
            gridMolecules[iNum + 1][jNum].push(molecule.arrayPosition);
            molecule.top = true;
        }

        if(molecule.top && molecule.left){
            gridMolecules[jNum-1][iNum - 1].push(molecule.arrayPosition);
        }
        if(molecule.top && molecule.right){
            gridMolecules[jNum+1][iNum - 1].push(molecule.arrayPosition);
        }
        if(molecule.bottom && molecule.left){
            gridMolecules[jNum - 1][iNum + 1].push(molecule.arrayPosition);
        }
        if(molecule.bottom && molecule.right){
            gridMolecules[jNum + 1][iNum + 1].push(molecule.arrayPosition);
        }
    });

}
function gridifyBalls(){
    let iNum = Math.ceil( Math.sqrt(numOfMolecules));
    let jNum = iNum;
    let iSize = width / iNum;
    let jSize = (height-visualHeight) / jNum;

    molecules.forEach(function(molecule,index){
        let iPos = index % iNum;
        let jPos = Math.floor(index / jNum);
        molecule.position.x = iPos * iSize + 20;
        molecule.position.y = jPos * jSize + 20;

    });
}
function renderGraph(){
    let healthy = molecules.filter(function (molecule){
        return molecule.constructor.name === "Healthy";
    });

    let infected = molecules.filter(function (molecule){
        return molecule.constructor.name === "Infector";
    });

    let recovered = molecules.filter(function (molecule){
        return molecule.constructor.name === "Recovered";
    });

    let healthyHeight= map(healthy.length,0,numOfMolecules,0,graphHeight);
    let infectedHeight= map(infected.length,0,numOfMolecules,0,graphHeight);
    let recoveredHeight= map(recovered.length,0,numOfMolecules,0,graphHeight);


    if(visualData.length > graphWidth){
        visualData.shift();
    }
    visualData.push({
        healthy:healthyHeight,
        infected:infectedHeight,
        recovered: recoveredHeight
    });

    push();
    translate(0,height-visualHeight);
    visualData.forEach(function(data,index) {
    
    
    fill(255,0,0);
    noStroke();
    rect( index++, graphTopOffset + data.healthy + data.recovered ,1, data.infected)


    fill(0,255,0);
    noStroke();
    rect(index++,graphTopOffset + data.recovered , 1 ,data.healthy)

    fill(0,0,255);
    noStroke();
    rect(index++,graphTopOffset  , 1 ,data.recovered)

    })    
    pop();

};
function renderGrid() {


    molecules.forEach(function (molecule) {
        molecule.step();
        molecule.checkEdges();
        molecule.render();

    });

   
}

function resetBalls() {
 
    for (let i = 0; i < numOfMolecules; i++) {
        molecules[i].reset();
    }



   
}