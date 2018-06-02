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
    constructor (initialPos) {
        this.pos = initialPos;
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
let planets = []

// This function gets called once at the starts
function setup() {
    createCanvas(640, 480);
    sun = new Sun()
}

function mouseDragged(){
    let planet = new Planet(createVector(mouseX,mouseY))
    console.log("New Planet Created.")
    planets.push(planet)
}

// This is called inside a forever loop
function draw() {
    background('blue')
    sun.draw()

    // Calculate some forces
    let gravity = createVector(0 , 0.1)
    let wind = createVector(0.05 , 0)

    // Apply forces to the planet
    //planet.applyForce(gravity)
    //planet.applyForce(wind) 
    planets.forEach(planet => {
        let sunsGravity = p5.Vector.sub(sun.pos, planet.pos);
        let d = sunsGravity.mag();
        sunsGravity.setMag(1000.0 / (d*d))

        planet.applyForce(sunsGravity);

        // Update and Draw
        planet.update()
        planet.draw()
    }) 
}