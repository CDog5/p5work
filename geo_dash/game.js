class GravityHandler {
    constructor(force) {
        this.force = force;
    }

    update(receiver, t) {
        receiver.applyForce(this.force);
    }

    draw() {
        
    }
}

class JumpHandler {
    constructor(maxJumpLength, jumpForce) {
        this.maxJumpLength = maxJumpLength;
        this.jumpForce = jumpForce;
        this.jumpStartedAt = 0;
    }

    startJump(t) {
        this.jumpStartedAt = t;
    }

    setIsHoldingJump(isHoldingJump) {
        // If we are not holding jump, reset the jump start time
        if (!isHoldingJump) {
            this.endJump();
        }
    }

    endJump() {
        this.jumpStartedAt = 0;
    }

    update(receiver, t) {
        if (this.jumpStartedAt > 0) {
            receiver.applyForce(this.jumpForce);
        }

        if ((t - this.jumpStartedAt) > this.maxJumpLength) {
            this.endJump();
        }
    }

    draw() {
        
    }
}

class Player {
    constructor(startPosition, size) {
        this.position = startPosition;
        this.velocity = createVector();
        this.acceleration = createVector();
        this.size = size;
        this.jumpStartedAt = 0;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    isOnGround() {
        return (this.position.y === (height - this.size.y));
    }

    update(t) {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // reset acceleration
        this.acceleration.mult(0);

        // Keep within bounds
        this.position.x = constrain(this.position.x, 0, width - this.size.x);
        this.position.y = constrain(this.position.y, 0, height - this.size.y);

        // if on ground, set velocity to zero
        if (this.isOnGround()) {
            this.velocity.y = 0;
        }
    }

    draw() {
        noStroke();
        fill('white');
        push();

        translate(this.position.x, this.position.y);
        rect(0, 0, this.size.x, this.size.y);
        pop();
    }
}

class Obstacle {
    constructor(velocity) {
        this.size = createVector(50, random(20, 100))
        this.position = createVector(width, height - this.size.y);
        this.velocity = velocity;
    }

    isOnScreen() {
        return this.position.x > 0;
    }

    update(t) {
        this.position.add(this.velocity);
    }

    draw() {
        noStroke();
        fill('green');
        push();

        translate(this.position.x, this.position.y);
        rect(0, 0, this.size.x, this.size.y);
        pop();
    }
}

class ObstacleEmitter {
    constructor(receiver, timePeriod, velocity) {
        this.lastObstacleAt = 0;
        this.timePeriod = timePeriod;
        this.receiver = receiver;
        this.velocity = velocity;
    }

    update(t) {
        if (t > (this.timePeriod + this.lastObstacleAt)) {
            this.receiver(new Obstacle(this.velocity));
            this.lastObstacleAt = t;
        }
    }

    draw() {

    }
}