class Infector extends Molecule{
    constructor(_i,_Distancing){
        super(_i,_Distancing);
        // recovered is called when the class is created and sets the timer for 10 seconds once infected.
        this.recovered()
    }

    
    //  Function runs, waits 10 seconds (1000ms) and 
    //  then runs code inside of setTimeout
     
    recovered() {
        setTimeout(() => {
            //code to set recovered
            molecules[this.arrayPosition] = new Recovered(this.arrayPosition);
            molecules[this.arrayPosition].isSocialDistancing = this.isSocialDistancing;
            molecules[this.arrayPosition].position = this.position;
            molecules[this.arrayPosition].velocity = this.velocity;
            molecules[this.arrayPosition].radius = this.radius;

        }, lifeCycle);
    }

    render(){
        noStroke()


        // if (this.intersecting) {
        //     fill(150, 0, 0, 255);
        // }
        // else {
            fill(255, 0, 0, );
        // }

        push()
        translate(this.position.x, this.position.y);

        ellipse(0, 0, this.radius * 2, this.radius * 2);

        noStroke();
        // fill(255, 255, 255, 255);
        // textSize(30);
        // textAlign(CENTER, CENTER);
        // text(this.arrayPosition, 0, 0);
        pop();

        }
    checkHealth(_indexValue){
        let otherMolecule = molecules[_indexValue];
        if(otherMolecule.constructor.name == "Healthy"){
            let randomNum = random();
            if(randomNum < rateOfInfection) {
            molecules[otherMolecule.arrayPosition] = new Infector(otherMolecule.arrayPosition);
            molecules[otherMolecule.arrayPosition].isSocialDistancing = this.isSocialDistancing;
            molecules[otherMolecule.arrayPosition].position = otherMolecule.position;
            molecules[otherMolecule.arrayPosition].velocity = otherMolecule.velocity;
            molecules[otherMolecule.arrayPosition].radius = otherMolecule.radius;
            }
        }
        
    }


}