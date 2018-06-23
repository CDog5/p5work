
let ship 
function setup() {
    createCanvas(640, 480);
    ship = new Spaceship()
}
class Spaceship {
    draw(){
        triangle(240, 250, 250, 275, 260 ,250 );
        //console.log("Drawing")
        
    }

}

function draw(){
    ship.draw();
}



