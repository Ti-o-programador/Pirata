// motor de fisica
const Engine = Matter.Engine;
// cria o mundo
const World = Matter.World;
// cria os corpos / objetos dentro do mundo
const Bodies = Matter.Bodies;
// restricao
const Constraint = Matter.Constraint;

const Body = Matter.Body

var engine, world, ground;
var backgroundImg, towerImg, cannonImg, cannonBaseImg;
var tower, cannon, cannonBall;
var angle = 15;
var balls=[];

function preload() 
{
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  cannonImg = loadImage("./assets/canon.png");
  cannonBaseImg = loadImage("./assets/cannonBase.png");
}

function setup() 
{
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

function draw() 
{
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width *2, 1);

  push(); // captura uma nova configuracao
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop(); // volta a configuracao anterior
  
  cannon.show();
  //cannonBall.display();

  for (let i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i)
  }

}

function keyReleased()
{
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed()
{
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball,i)
{
  if(ball){
    ball.display();
  }
}

