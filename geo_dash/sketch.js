let t=0
const TIME_INTERVAL = 0.1;
const BOX_SIZE = 40;
const SPACEBAR = 32;

let player;
let jumpHandler;
let playerGravity;
let playerForces = []
let obstacles = [];
let obstacleEmitter;

// This function gets called once at the start
function setup() {
  createCanvas(640, 480)

  // First create the player
  player = new Player(createVector(width / 2, height - BOX_SIZE), createVector(BOX_SIZE, BOX_SIZE));

  playerGravity = new GravityHandler(createVector(0, 0.5));
  jumpHandler = new JumpHandler(1, createVector(0, -1.5));

  // Put all the force handlers into a loop so they can be iterated over neatly in draw
  playerForces.push(playerGravity);
  playerForces.push(jumpHandler);

  obstacleEmitter = new ObstacleEmitter((o) => obstacles.push(o), 10, createVector(-5, 0));
}

// This function gets called every frame
function draw() {
  background(51);

  // Handle any key hold based controls
  jumpHandler.setIsHoldingJump(keyIsDown(SPACEBAR));

  // Apply all the forces
  playerForces.forEach(fh => {
    fh.update(player, t);
    fh.draw();
  });

  // Update and draw all the obstacles
  obstacles.forEach(o => {
    o.update(t);
    o.draw();
  });

  // Update and draw the player
  player.update(t);
  player.draw();

  // Update the obstacle emitter
  obstacleEmitter.update(t);
  obstacleEmitter.draw();

  // Remove any obstacles no longer on the screen
  obstacles = obstacles.filter(o => o.isOnScreen());

  t += TIME_INTERVAL;
}

function keyPressed() {
  if (keyCode === SPACEBAR) {
    if (player.isOnGround()) {
      jumpHandler.startJump(t);
    }
  }
}