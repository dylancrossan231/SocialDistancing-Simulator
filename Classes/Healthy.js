class Healthy extends Molecule{
    constructor(_i,_Distancing){
        super(_i,_Distancing);
        
    }
    render(){
                noStroke()

                super.render();
                // if (this.intersecting) {
                //     fill(0, 150, 0, 255);
                // }
                // else {
                    fill(0, 255, 0, 125);
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
        if(otherMolecule.constructor.name == "Infector"){
            let randomNum = random();
            if(randomNum < rateOfInfection){
            molecules[this.arrayPosition] = new Infector(this.arrayPosition);
            molecules[this.arrayPosition].isSocialDistancing = this.isSocialDistancing;
            molecules[this.arrayPosition].position = this.position;
            molecules[this.arrayPosition].velocity = this.velocity;
            molecules[this.arrayPosition].radius = this.radius;
            }

        }
     }
}