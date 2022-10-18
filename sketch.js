// motor de fisica
const Engine = Matter.Engine;
// cria o mundo
const World = Matter.World;
// cria os corpos / objetos dentro do mundo
const Bodies = Matter.Bodies;
// restricao
const Constraint = Matter.Constraint;
// manipula os objetos
const Body = Matter.Body;

var engine, world, ground;
var backgroundImg, towerImg, cannonImg, cannonBaseImg;
var tower, cannon, cannonBall, boat, boats = [];
var angle = 15;
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  cannonImg = loadImage("./assets/canon.png");
  cannonBaseImg = loadImage("./assets/cannonBase.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  push(); // captura uma nova configuracao
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop(); // volta a configuracao anterior

  cannon.show();

  for (let i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
  }

  showBoats();
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, i) {
  if (ball) {
    ball.display();
  }
}

function showBoats() {

  if (boats.length > 0) {
    if (boats[boats.length -1].body.position.x < width -300
      || boats[boats.length -1] === undefined
      ) {
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);
      boats.push(boat);
    }
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });
        boats[i].show();

      }

    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }

}

