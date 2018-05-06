const TIME_INTERVAL = 0.01;
const MAX_POINTS = 255;
const MIN_DISTANCE = 10;

let rootCog;
let pointEmitter;
let t = 0.01;

let points = [];
let startPosition;

function setup() {
    createCanvas(640, 480);
    noFill();
    background(0);
    strokeWeight(5);
    colorMode(HSB);

    startPosition = createVector(width / 2, height / 2);
    rootCog = new Cog(random(40, 70), PI / 120);
    pointEmitter = new PointEmitter((p) => points.push(p), MIN_DISTANCE);

    let angle = PI / 50;
    let nextCog = rootCog;
    for (x=0; x<2; x++) {
        let nextChild = new Cog(random(40, 70), angle);
        nextCog.addChild(nextChild);
        nextCog = nextChild;
        angle *= -1;
        angle /= 3;
    }

    nextCog.drawPoint = true;
}

function draw() {
    background(0)

    stroke(map(sin(t), -1, 1, 0, 255), 255, 255);

    let lines = [];
    rootCog.update(startPosition);
    rootCog.iterate(c => {
        if (c.drawPoint) {
            pointEmitter.addPoint(c.position);
        }
        lines.push({
            start : c.parentPosition,
            end: c.position
        })
    });

    if (points.length > MAX_POINTS) {
        points.splice(0, 1);
    }

    points.forEach(p => point(p.x, p.y));

    lines.forEach(l => {
        line(l.start.x, l.start.y, l.end.x, l.end.y);
    })

    t += TIME_INTERVAL;
}