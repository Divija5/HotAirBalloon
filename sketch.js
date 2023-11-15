var gameState = "play";
var score = 0;

function preload(){
  backgroundImg = loadImage('assets/bg.png');
  balloonImg = loadAnimation('assets/balloon1.png', 'assets/balloon2.png', 'assets/balloon3.png');
  obsTop1Img = loadImage('assets/obsTop1.png');
  obsTop2Img = loadImage('assets/obsTop2.png');
  obsBottom1Img = loadImage('assets/obsBottom1.png');
  obsBottom2Img = loadImage('assets/obsBottom2.png');
  obsBottom3Img = loadImage('assets/obsBottom3.png');
  gameOverImg = loadImage('assets/gameOver1.png');
  restartImg = loadImage('assets/restart1.png');
  jumpSound = loadSound('assets/jump1.wav');
  dieSound = loadSound('assets/die.mp3');
}


function setup(){
  createCanvas(400,400)
  bg = createSprite(165, 485);
  bg.addImage(backgroundImg);
  bg.scale = 1.3;

  balloon = createSprite(100,200);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;
  balloon.debug = true;

  bottomGround = createSprite(200,390,400,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,400,20);
  topGround.visible = false;

  gameOver = createSprite(200,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(200,200);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;

  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();
  barGroup = new Group();
}


function draw(){

  if(gameState == "play"){

  if (keyDown("space")){
    balloon.velocityY = -6
    jumpSound.play();
  }
  balloon.velocityY += 1

  spawnObstaclesTop();
  spawnObstaclesBottom();
  bar();

  if(balloon.isTouching(topObstaclesGroup) || balloon.isTouching(bottomObstaclesGroup) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround)){
    gameState = "end";
    dieSound.play();
  }
  }
  if(gameState == "end"){
    gameOver.visible = true;
    restart.visible = true;
    balloon.velocityX = 0;
    balloon.velocityY = 0;
    balloon.y = 200;
    topObstaclesGroup.setVelocityXEach(0);
    bottomObstaclesGroup.setVelocityXEach(0);
    topObstaclesGroup.setLifetimeEach(-1);
    bottomObstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      resetGame()
    }
  }

  drawSprites();
  gameScore();

}


function spawnObstaclesTop(){
  if(World.frameCount % 60==0){
  obsSprite = createSprite(400,50,20,20);
  obsSprite.velocityX = -5;
  obsSprite.y = Math.round(random(10,80));
  var rand = Math.round(random(1,2));
  switch(rand){
    case 1 : obsSprite.addImage(obsTop1Img);
    break;
    case 2 : obsSprite.addImage(obsTop2Img);
    break;
    default:break;
  }
  obsSprite.scale = 0.1;
  obsSprite.lifetime = 100;
  obsSprite.debug = true;
  topObstaclesGroup.add(obsSprite);
  }
}

function spawnObstaclesBottom(){
  if(World.frameCount % 70==0){
    obsSprite = createSprite(400,350,20,20);
    obsSprite.velocityX = -5
    obsSprite.y = Math.round(random(350,380));
    var rand2 = Math.round(random(1,3));
    switch(rand2){
      case 1 : obsSprite.addImage(obsBottom1Img);
      break;
      case 2 : obsSprite.addImage(obsBottom2Img);
      break;
      case 3 : obsSprite.addImage(obsBottom3Img);
      break;
      default:break;
    }
    obsSprite.scale = 0.1;
    obsSprite.lifetime = 100;
    obsSprite.debug = true;
    bottomObstaclesGroup.add(obsSprite);
  }
}

function resetGame(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  score = 0;
}

function bar(){
  if(World.frameCount % 60==0){
    var bar = createSprite(400,200,10,800);
    bar.velocityX = -6;
    bar.visible = false;
    bar.lifetime = 70;
    barGroup.add(bar);
  }
}

function gameScore(){
  if(balloon.isTouching(barGroup)){
    score = score + 1;
  }

  textSize(20);
  fill("yellow");
  text("Score :" +score, 30, 30);
}