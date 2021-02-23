var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;

var backgroungImg,humanImg,icebergImg,iglooImg,penguinImg;
var ground;
var igloo , penguin;

var gameState = "play";
function preload(){
backgroundImg = loadImage("sprites/Background.jpg");
humanImg = loadImage("sprites/Human.png");
icebergImg = loadImage("sprites/Iceberg.png");
penguinImg = loadImage("sprites/Penguin.png");
iglooImg = loadImage("sprites/Igloo.png");
  
}

function setup() {
  createCanvas(1000,800);
  
  backgr=createSprite(0,0,1000,600);
  backgr.addImage(backgroundImg);
  backgr.scale=3;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  ground = createSprite(500,550,1000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  human = createSprite(100,450,10,10);
  human.addImage(humanImg);
  human.scale = 0.5;

  penguin =  createSprite(500,480,10,10);
  penguin.addImage(penguinImg);
  penguin.scale = 0.3;
  penguin.debug = false;
  
  obstaclesGroup = new Group();
  iglooGroup = new Group();
}

function draw() {
  
  background(255);
  if(gameState==="play"){

  
  //score= score+ Math.round(getFrameRate()/100);
    
  if(ground.x<100) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  
  if(keyDown("space")){
    penguin.velocityY = -10
score = score+1
  }
  if(keyDown(RIGHT_ARROW)){
    penguin.x += 2
  }
  penguin.velocityY = penguin.velocityY +0.8
  penguin.collide(ground);
  
  if(frameCount === 1000 ){
igloo = createSprite(850,450,10,10);
igloo.addImage(iglooImg);
igloo.scale = 0.3;
iglooGroup.add(igloo);
  }
  if(iglooGroup.isTouching(penguin)){
    gameState = "won"
  }
  if(obstaclesGroup.isTouching(penguin)){
gameState = "end"
  }
  if(frameCount===1000 && igloo.isTouching(penguin)){
    gameState = "end"
  }
  spawnObstacles();
}
drawSprites();
  if(gameState === "end"){
    backgr.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
      penguin.velocityY = 0;
      stroke("black");
      textSize(50);
      fill("black");
      text("Game Over",480,200);
  }
  if(gameState === "won"){
    backgr.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
      penguin.velocityY = 0;
      stroke("black");
      textSize(50);
      fill("black");
      text("YOU WON",480,200);
  }

  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

}



function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(800,550,10,40);
    obstacle.velocityX = -3;
    obstacle.y = random(100,550)
    obstacle.addImage(icebergImg);
    obstacle.debug = false;
    obstacle.setCollider("rectangle",0,0,20,30)
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    human.depth = obstacle.depth+1;
    penguin.depth = obstacle.depth+1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}





