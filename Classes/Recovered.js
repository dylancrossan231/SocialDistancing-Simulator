class Recovered extends Molecule{
    constructor(_i,_Distancing){
        super(_i,_Distancing);
        
    }

    render(){
        noStroke()


        // if (this.intersecting) {
        //     fill(0, 0, 255, 255);
        // }
        // else {
            fill(0, 0, 255, 125);
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

    checkHealth(_indexValue) {
    }

}