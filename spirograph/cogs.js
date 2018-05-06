class Cog {

    constructor(radius, angularVelocity) {
        this.children = [];
        this.relativePosition = createVector(radius, 0);
        this.angularVelocity = angularVelocity;
    }

    update(parentPosition) {
        this.parentPosition = parentPosition;
        this.relativePosition.rotate(this.angularVelocity);
        this.position = p5.Vector.add(parentPosition, this.relativePosition);
        this.children.forEach(c => c.update(this.position));
    }

    iterate(receiver) {
        receiver(this);
        this.children.forEach(c => c.iterate(receiver));
    }

    addChild(child) {
        this.children.push(child);
    }
}

class PointEmitter {
    constructor(receiver, minDistance) {
        this.receiver = receiver;
        this.minDistance;
        this.lastPoint = undefined;
    }

    addPoint(p) {
        if (!!this.lastPoint) {
            let d = dist(p.x, p.y, this.lastPoint.x, this.lastPoint.y);
            if (d > MIN_DISTANCE) {
                this.receiver(p);
                this.lastPoint = p;
            }
        } else {
            this.receiver(p);
            this.lastPoint = p;
        }
    }
}