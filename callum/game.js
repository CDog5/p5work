const TIME_INTERVAL = 0.1;
const RADIUS = 150
const LIGHT_GREY = 150
const WHITE = 255

// This function gets called once at the start
function setup() {
  createCanvas(640, 480)

}

// This function gets called every frame
var x = 400
var y = 200
function draw() {
    background('blue');
    rect(x,y,60,60);
}
 function keyTyped() {
     //console.log(x, y);
    if (key == 'w'){
        if (y == 0){}
        else {y -= 10}
    } else if (key == 'a'){
        if (x == 0){}
        else {x -= 10}
    } else if (key == 's'){
        if (y == 410){}
        else {y += 10}
    } else if (key == 'd'){
        if (x == 570){}
        else {x += 10}
    }
}
