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
        this.wall = (random(1) < 0.2)
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
        this.wentTo = {};
        this.gScore = {};
        this.fScore = {};
        this.heuristic = heuristic;
        this.totalPath = [];
    }

    getPathSoFar() {
        let pathSoFar = [];

        let id = this.startId;
        while (this.wentTo[id]) {
            id = this.wentTo[id];
            pathSoFar.push(this.nodes[id]);
        }

        return pathSoFar;
    }

    update() {
        if (this.totalPath.length > 0) {
            return;
        }

        if (Object.keys(this.openSet).length > 0) {
            let currentId;

            Object.keys(this.openSet).forEach(openSetId => {
                if (currentId) {
                    if (this.fScore[currentId] < this.fScore[openSetId]) {
                        currentId = openSetId;
                    }
                } else {
                    currentId = openSetId;
                }
            })

            if (currentId == this.endId) {
                console.log('We made it');

                this.totalPath = []
                this.totalPath.push(this.nodes[currentId]);
                while (this.cameFrom[currentId]) {
                    currentId = this.cameFrom[currentId];
                    this.totalPath.push(this.nodes[currentId]);
                }

                console.log('Total Path', this.totalPath);

                return;
            }

            delete(this.openSet[currentId]);
            this.closedSet[currentId] = true;

            this.nodes[currentId].links
                .filter(link => !(this.closedSet[link.other.id]))
                .forEach(link => {
                    if (!this.openSet[link.other.id]) {
                        this.openSet[link.other.id] = true;
                    }

                    let tempG = this.gScore[currentId] + 1;
                    let existingG = this.gScore[link.other.id];
                    
                    if ((!existingG) || (tempG <= existingG)) {
                        this.cameFrom[link.other.id] = currentId;
                        this.wentTo[currentId] = link.other.id;
                        this.gScore[link.other.id] = tempG;
                        this.fScore[link.other.id] = this.gScore[link.other.id] + this.heuristic(this.nodes[currentId], link.other);
                    } else {

                    }
                });
        }
    }

    setStartAndEnd(startId, endId) {
        this.startId = startId;
        this.endId = endId;
        this.openSet[this.startId] = true;
        this.gScore[this.startId] = 0;
        this.fScore[this.startId] = this.heuristic(this.nodes[this.startId], this.nodes[this.endId])
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