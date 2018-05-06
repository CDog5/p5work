const TIME_INTERVAL = 0.1;
const RADIUS = 150
const LIGHT_GREY = 150
const WHITE = 255

// This function gets called once at the start
function setup() {
  createCanvas(640, 480)
}

class Player {
    constructor() {
        this.x = 400;
        this.y = 200;
    }

    moveLeft(){
        if (this.x > 0){
            this.x -= 5;
        }
    }
            
    moveRight(){
        if (this.x > 0){
            this.x += 5;
        }
    }
}


var player = new Player();

// This is called inside a forever loop
function draw() {
    background('blue');
    noStroke();
    rect(player.x, player.y, 60, 60);

    rect(width / 2, height - 180, 20, 180)

    if (keyIsDown(LEFT_ARROW)) {
        player.moveLeft()
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.moveRight()
    }
    if (keyIsDown(UP_ARROW)) {
        if (y > 0){
            y -= 5
        }
    }
    if (keyIsDown(DOWN_ARROW)) {
        if (y < height - 60)
            y += 5
    }
}




