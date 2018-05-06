class Cog {

    constructor(radius, angularVelocity, radialOffset) {
        this.children = [];
        this.angle = 0;
        this.radius = radius;
        this.radialOffset = radialOffset || 0;
        this.angularVelocity = angularVelocity;
        this.drawPoint = false;
        this.drawCog = false;
    }

    update() {
        this.angle += this.angularVelocity;
        this.children.forEach(c => c.update());
    }

    draw() {
        push();
        translate(this.radialOffset, 0);
        rotate(this.angle);
        if (this.drawCog) {
            strokeWeight(1);
            ellipse(0, 0, this.radius, this.radius);
        }
        if (this.drawPoint) {
            strokeWeight(10);
            point(0, 0);
        }
        this.children.forEach(c => c.draw());
        pop();
    }

    addChild(child) {
        this.children.push(child);
    }
}