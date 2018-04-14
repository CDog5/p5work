let pathFinder;

const COLS = 30;
const ROWS = 20;
const SCALE = 25;

const DRAW_SETS = false;

function calcCoordScalar(i, j) {
    return (i * ROWS) + j;
}

function euclideanDistance(a, b) {
    dist(a.i, a.j, b.i, b.j);
}

function taxiCabDistance(a, b) {
    return abs(a.i - b.i) + abs(a.j - b.j);
}

function setup() {
    createCanvas(COLS * SCALE, ROWS * SCALE);
    colorMode(RGB);

    pathFinder = new PathFinder(taxiCabDistance);

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

        if ((node.i > 0) && (node.j > 0)) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i - 1, node.j - 1));
        }
        if ((node.i > 0) && (node.j < (ROWS - 1))) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i - 1, node.j + 1));
        }
        if ((node.i < (COLS - 1)) && (node.j > 0)) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i + 1, node.j - 1));
        }
        if ((node.i < (COLS - 1)) && (node.j < (ROWS - 1))) {
            pathFinder.addLink(node.id, calcCoordScalar(node.i + 1, node.j + 1));
        }
    })

    console.log('Nodes', Object.values(pathFinder.nodes))
}

function draw() {
    pathFinder.update();

    noFill();
    background(255);
    translate(SCALE / 2, SCALE / 2);

    stroke(0);
    strokeWeight(10);
    Object.values(pathFinder.nodes).forEach(node => {
        if (node.wall) {
            stroke(10);
        } else {
            stroke(230);
        }

        point(node.x, node.y);
    }); 

    if (DRAW_SETS) {
        // Draw the open set
        stroke(0, 255, 0);
        Object.keys(pathFinder.openSet).forEach(id => {
            let node = pathFinder.nodes[id];
            point(node.x, node.y);
        })

        // Draw the closed set
        stroke(255, 0, 0);
        Object.keys(pathFinder.closedSet).forEach(id => {
            let node = pathFinder.nodes[id];
            point(node.x, node.y);
        })
    }

    stroke(200, 0, 200);
    let start = pathFinder.getStart();
    point(start.x, start.y);

    let end = pathFinder.getEnd();
    point(end.x, end.y);

    // Draw the complete path
    if (pathFinder.failed) {
        stroke(255, 0, 0);
    } else {
        stroke(0, 0, 255);
    }

    beginShape()
    pathFinder.totalPath.forEach(node => {
        //point(node.x, node.y);
        vertex(node.x, node.y);
    });
    endShape();

    // Draw Links
    // stroke(0, 255, 0);
    // strokeWeight(1);
    // Object.values(pathFinder.nodes).forEach(node => {
    //     node.links.forEach(link => {
    //         line(node.x, node.y, link.other.x, link.other.y);
    //     })
    // }); 
}