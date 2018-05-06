let rootCog;
let t = 0.01;
let TIME_INTERVAL = 0.01;

let points = [];

function setup() {
    createCanvas(640, 480);
    noFill();
    background(0);
    colorMode(HSB);

    rootCog = new Cog(100, PI / 120);

    let nextCog = rootCog;
    for (x=0; x<5; x++) {
        let nextChild = new Cog(random(10, 100), random(-50, 50) * PI / 1000, random(10, 100));
        nextCog.addChild(nextChild);
        nextCog = nextChild;
    }

    nextCog.drawPoint = true;
}

function draw() {
    colorMode(RGB);
    background(0, 1);
    colorMode(HSB);
    //background('black')

    stroke(map(sin(t), -1, 1, 0, 255), 255, 255);

    push();
    translate(width / 2, height / 2);
    rootCog.update();
    rootCog.draw();
    pop();

    t += TIME_INTERVAL;
}