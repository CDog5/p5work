class Link {
    constructor(other) {
        this.other = other;
    }
}

class Node {
    constructor(id, i, j) {
        this.id = id;
        this.i = i;
        this.j = j;
        this.links = [];
        this.wall = (random(1) < 0.4)
    }

    scale(amount) {
        this.x = this.i * amount;
        this.y = this.j * amount;
    }

    addLink(link) {
        if (!link.other.wall) {
            this.links.push(link);
        }
    }
}

class PathFinder {
    constructor(heuristic) {
        this.nodes = {};
        this.openSet = {};
        this.closedSet = {};
        this.cameFrom = {};
        this.gScore = {};
        this.fScore = {};
        this.heuristic = heuristic;
        this.totalPath = [];
        this.complete = false;
        this.failed = false;
    }

    update() {
        if (this.complete) {
            return;
        }

        if (Object.keys(this.openSet).length > 0) {
            let currentId;

            // Find the lowest fScore value
            Object.keys(this.openSet).forEach(openSetId => {
                if (currentId) {
                    if (this.fScore[currentId] > this.fScore[openSetId]) {
                        currentId = openSetId;
                    }
                } else {
                    currentId = openSetId;
                }
            })

            //console.log('Current Id', currentId);
            //console.log('End Id', this.endId);

            if (currentId == this.endId) {
                console.log('We made it');

                this.totalPath = []
                this.totalPath.push(this.nodes[currentId]);
                let tempC = currentId;
                while (this.cameFrom[tempC]) {
                    tempC = this.cameFrom[tempC];
                    this.totalPath.push(this.nodes[tempC]);
                }
                this.complete = true;
                return;
            } else {
                // Do nothing
                this.totalPath = []
                this.totalPath.push(this.nodes[currentId]);
                let tempC = currentId;
                while (!!this.cameFrom[tempC]) {
                    tempC = this.cameFrom[tempC];
                    this.totalPath.push(this.nodes[tempC]);
                }
            }

            delete(this.openSet[currentId]);
            this.closedSet[currentId] = true;

            this.nodes[currentId].links
                .filter(link => !(this.closedSet[link.other.id]))
                .forEach(link => {
                    // Ensure the neighbor is in the open set
                    this.openSet[link.other.id] = true;
    
                    let tempG = this.gScore[currentId] + 1;
                    let existingG = this.gScore[link.other.id];
                    
                    if ((!!existingG) && (tempG > existingG)) {
                        return;
                    }

                    this.cameFrom[link.other.id] = currentId;
                    this.gScore[link.other.id] = tempG;
                    this.fScore[link.other.id] = this.gScore[link.other.id] + this.heuristic(this.nodes[currentId], link.other);
                });
        } else {
            console.log('Failed to find path');
            this.complete = true;
            this.failed = true;
        }
    }

    setStartAndEnd(startId, endId) {
        this.startId = startId;
        this.endId = endId;
        this.openSet[this.startId] = true;
        this.gScore[this.startId] = 0;
        this.fScore[this.startId] = this.heuristic(this.nodes[this.startId], this.nodes[this.endId]);
        this.nodes[this.startId].wall = false;
        this.nodes[this.endId].wall = false;
    }

    getStart() {
        return this.nodes[this.startId];
    }

    getEnd() {
        return this.nodes[this.endId];
    }

    addNode(node) {
        this.nodes[node.id] = node;
    }

    addLink(fromId, toId) {
        this.nodes[fromId].addLink(new Link(this.nodes[toId]));
    }
}