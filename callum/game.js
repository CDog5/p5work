class Obstacle {
    constructor() {
        this.width = 20
        this.height = Math.random() * 100;
        this.x = width;
        this.y = height - this.height;
        this.finished = false;
        
    }

    moveLeft() {
        if (this.x > 0){
            this.x -= 5;
        } else {
            this.finished = true
        } 
    }

    draw(){
        rect(this.x, this.y,this.width, this.height)
    } 
}

class Player {
    constructor() {
        this.x = 400;
        this.y = 200;
    }


    draw(){
        rect(this.x, this.y, 60, 60);  
    }

    moveLeft(){
        if (this.x > 0){
            this.x -= 5;
        }
    }
            
    moveRight(){
        if (this.x < width - 60){
            this.x += 5;
        }
    }
    moveUp(){
        if (this.y > 0){
            this.y -= 5

        }
    }
    moveDown(){
        if (this.y < height - 60){
            this.y += 5
        }
    }
}

let player;
let obstacle;

// This function gets called once at the start
function setup() {
    createCanvas(640, 480);

    player = new Player();
    obstacle = new Obstacle();
}

// This is called inside a forever loop
function draw() {
    background('blue');
    noStroke();
    player.draw();
    obstacle.draw();

    obstacle.moveLeft();
    if (obstacle.finished) {
        obstacle = new Obstacle()
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.moveLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.moveRight();
    }
    if (keyIsDown(UP_ARROW)) {
        player.moveUp();
    }
    if (keyIsDown(DOWN_ARROW)) {
        player.moveDown();
    }

}



