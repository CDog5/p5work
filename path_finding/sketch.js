let pathFinder;

const COLS = 16;
const ROWS = 12;
const SCALE = 25;

function calcCoordScalar(i, j) {
    return (i * ROWS) + j;
}

function setup() {
    createCanvas(COLS * SCALE, ROWS * SCALE);
    colorMode(RGB);

    pathFinder = new PathFinder((a, b) => {
        dist(a.i, a.j, b.i, b.j);
    });

    for (let i=0; i<COLS; i++) {
        for (let j=0; j<ROWS; j++) {
            pathFinder.addNode(new Node(calcCoordScalar(i, j), i, j));
        }
    }

    // Set start
    pathFinder.setStartAndEnd(calcCoordScalar(0, 0), calcCoordScalar(COLS-1, ROWS-1));

    Object.values(pathFinder.nodes).forEach(node => {
        node.scale(SCALE);

        if (node.i > 0) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i - 1, node.j));
        }
        if (node.i < (COLS - 1)) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i + 1, node.j));
        }
        if (node.j > 0) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i, node.j - 1));
        }
        if (node.j < (ROWS - 1)) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i, node.j + 1));
        }
    })

    console.log('Nodes', Object.values(pathFinder.nodes))
}

function draw() {
    pathFinder.update();

    background(0);
    translate(SCALE / 2, SCALE / 2);

    stroke(150);
    strokeWeight(4);
    Object.values(pathFinder.nodes).forEach(node => {
        if (node.wall) {
            stroke(10);
        } else {
            stroke(200);
        }

        point(node.x, node.y);
    }); 

    stroke(0, 255, 0);
    let start = pathFinder.getStart();
    point(start.x, start.y);

    let end = pathFinder.getEnd();
    point(end.x, end.y);

    stroke(255, 0, 0);
    pathFinder.totalPath.forEach(node => {
        point(node.x, node.y);
    });

    // stroke(255, 0, 255);
    // pathFinder.getPathSoFar().forEach(node => {
    //     point(node.x, node.y);
    // });

    // stroke(0, 255, 0);
    // strokeWeight(1);
    // Object.values(pathFinder.nodes).forEach(node => {
    //     node.links.forEach(link => {
    //         line(node.x, node.y, link.other.x, link.other.y);
    //     })
    // }); 
}