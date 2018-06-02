class Sun {
    constructor () {
        this.pos = createVector(250, 250)
    }
    draw(){
        fill ('goldenrod')
        ellipse(this.pos.x, this.pos.y , 50 , 50)
    }
}

class Planet {
    constructor () {
        this.pos = createVector(350, 10)
        this.vel = createVector(1.5 , 0)
        this.acc = createVector()
    }
    draw(){
        fill ('red')
        ellipse(this.pos.x, this.pos.y , 30 , 30)
    }
    update(){
        this.vel.add(this.acc) 
       this.pos.add(this.vel)
       this.acc.mult(0)
    }
    applyForce(force){
        this.acc.add(force)
    }
}

let sun 
let planet

// This function gets called once at the starts
function setup() {
    createCanvas(640, 480);
    sun = new Sun()
    planet = new Planet()
}

// This is called inside a forever loop
function draw() {
    background('blue')
    sun.draw()

    // Calculate some forces
    let gravity = createVector(0 , 0.1)
    let wind = createVector(0.05 , 0)
    let sunsGravity = p5.Vector.sub(sun.pos, planet.pos);
    sunsGravity.setMag(0.1)

    // Apply forces to the planet
    //planet.applyForce(gravity)
    //planet.applyForce(wind) 
    planet.applyForce(sunsGravity);

    // Update and Draw
    planet.update()
    planet.draw()
}