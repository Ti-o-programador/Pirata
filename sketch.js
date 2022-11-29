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
var boatJson, boatImg, boatAnimation = [];
var brokenBoatJson, brokenBoatImg, brokenBoatAnimation = [];
var splashJson, splashImg, splashAnimation = [];
var angle = 15;
var balls = [];
var pirateSound, explosionSound, splashSound;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  cannonImg = loadImage("./assets/canon.png");
  cannonBaseImg = loadImage("./assets/cannonBase.png");

  boatJson = loadJSON("./assets/boat/boat.json");
  boatImg = loadImage("./assets/boat/boat.png");
  brokenBoatJson = loadJSON("./assets/boat/brokenBoat.json");
  brokenBoatImg = loadImage("./assets/boat/brokenBoat.png");
  splashJson = loadJSON("./assets/waterSplash/waterSplash.json");
  splashImg = loadImage("./assets/waterSplash/waterSplash.png");

  pirateSound = loadSound("./assets/assets_pirate_laugh.mp3");
  explosionSound = loadSound("./assets/assets_cannon_explosion.mp3");
  splashSound = loadSound("./assets/assets_cannon_water.mp3");

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

  var boatFrames = boatJson.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatImg.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatJson.frames;
  for(var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatImg.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var splashFrames = splashJson.frames;
  for(var i = 0; i < splashFrames.length; i++) {
    var pos = splashFrames[i].position;
    var img = splashImg.get(pos.x, pos.y, pos.w, pos.h);
    splashAnimation.push(img);
  }
}

// function animation(json, image, animation) {
//   var frames = json.frames;
//   for (var i = 0; i < frames.length; i++) {
//     var pos = frames[i].position;
//     var img = image.get(pos.x, pos.y, pos.w, pos.h);
//     animation.push(img);
//   }
// }

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
    colisionWithBoat(i);
  }

  showBoats();
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
    explosionSound.play();
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
    if (ball.body.position.y >= height - 50) {
      ball.remove(i);
    } else if (ball.body.position.x >= width) {
      World.remove(world, ball.body);
      delete balls[i];
    } 
        
  }
}

function showBoats() {

  if (boats.length > 0) {
    if (boats[boats.length - 1] === undefined
      || boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);
      boats.push(boat);
    }
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });
        boats[i].show();
        boats[i].animate();
        var collision = Matter.SAT.collides(boats[i].body, tower);
      }

    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }

}

function colisionWithBoat(ballIndex) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[ballIndex] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[ballIndex].body, boats[i].body);
      if (!boats[i].isBroken) {
        if (collision.collided) {
          boats[i].remove(i);
          World.remove(world, balls[ballIndex].body);
          delete balls[ballIndex];
        }
      }
    }
  }
}
