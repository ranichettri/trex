var trex,trex_animat,ground,ground_animat,invisible_wall, cloud_animat, cloudGroup, obstacle_1, obstacle_2, obstacle_3,obstacle_4;
var obstacle_5,obstacle_6,obstacleGroup,trex_c;
var END=0,PLAY=1,gameState=PLAY;
var gameOver , restart,gameOver_i,restart_i;
var count,high;

function preload(){
trex_animat = loadAnimation("trex1.png","trex3.png","trex4.png");
  
ground_animat = loadImage("ground2.png");
  
cloud_animat = loadImage("cloud.png");  
  
obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");
  
trex_c=loadImage("trex_collided.png");  
  
gameOver_i=loadImage("gameOver.png");
  
restart_i=loadImage("restart.png");  
  
}
function setup(){
createCanvas(600,300);
  trex=createSprite(300,200,10,10);
  trex.addAnimation("trex",trex_animat);
  trex.addImage("trexGameover",trex_c);
  trex.scale=0.4;
  
  invisible_wall=createSprite(300,270,600,10);
  invisible_wall.visible=false;
  
  ground=createSprite(300,260,600,10);
  ground.addAnimation("ground",ground_animat);
  ground.x = ground.width /2;
  
  cloudGroup=new Group();
  
  obstacleGroup=new Group();
  
  gameOver=createSprite(300,160);
  gameOver.addImage("gameOver",gameOver_i);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart=createSprite(300,190);
  restart.addImage("restart",restart_i);
  restart.visible=false;
  restart.scale=0.5;
  
  count=0;
  
  high=0;
}
function draw(){
background(0);
  
  text("score: "+count,500,50);
  text("High Score: "+high,400,50)
  
 if(gameState === PLAY) {
   ground.velocityX=-6;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   trex.velocityY=trex.velocityY+0.5;
  
   if(keyDown("space") && trex.y >= 241.5){
     trex.velocityY=-10;
   }

   spawnCloud();
   spawnObstacle();
   
   count=count+Math.round(getFrameRate()/60);
   
   if(trex.isTouching(obstacleGroup)){
     gameState=END;
   }
 }
 if(gameState === END){
   ground.velocityX=0;
   obstacleGroup.setVelocityEach(0,0);
   cloudGroup.setVelocityEach(0,0);
   obstacleGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   trex.changeImage("trexGameover",trex_c);
   restart.visible=true;
   gameOver.visible=true;
   trex.velocityY=0;
 } 
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  trex.collide(invisible_wall);
  drawSprites();
  
}

function spawnCloud(){
  if(frameCount % 50 === 0){
var cloud = createSprite(600,random(70,200),10,10);
    cloud.addAnimation("cloud",cloud_animat);
    cloud.scale=0.6;
    cloud.velocityX=-5;
    cloud.lifetime=125;
    trex.depth = cloud.depth+1;
    cloudGroup.add(cloud);
}
}

function spawnObstacle(){
if(frameCount % 40 === 0 ){
  var obstacle = createSprite(600,250,10,10);
    obstacle.velocityX=-6;
    var ran = Math.round(random(1,6));
    switch(ran){
      case 1 : obstacle.addImage(obstacle_1);
              break;
      case 2 : obstacle.addImage(obstacle_2);
              break;        
      case 3 : obstacle.addImage(obstacle_3);
              break;
      case 4 : obstacle.addImage(obstacle_4);
              break;
      case 5 : obstacle.addImage(obstacle_5);
              break;
      case 6 : obstacle.addImage(obstacle_6);
              break;         
       default : break       
    }
       obstacle.scale=0.5;
    obstacle.lifetime=100; 
    obstacleGroup.add(obstacle);    
}

}
function reset(){
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("trex",trex_animat);
  if(high < count){
  high=count;
  }
  count = 0;
}