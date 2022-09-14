// motor de fisica
const Engine = Matter.Engine;
// cria o mundo
const World = Matter.World;
// cria os corpos / objetos dentro do mundo
const Bodies = Matter.Bodies;
// restricao
const Constraint = Matter.Constraint;

var engine, world, ground;
var backgroundImg, towerImg, cannonImg, cannonBaseImg;
var tower, cannon, cannonBall;
var angle = 15;

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

  cannon = new Cannon(180,110,130,100,angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
 
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width *2, 1);

  push(); // captura uma nova configuracao
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop(); // volta a configuracao anterior
  
  cannon.show();
  cannonBall.display();

}
