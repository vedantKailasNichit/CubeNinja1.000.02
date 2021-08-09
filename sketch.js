var player, canvas, ground, jump = 10, pl1, pl2;
var p, p2, p3, p4, p5;
var g, plI1, plI2, plI3;
var level = 1;
var edges, tele;
var coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8;
var coinA;
var coinsCollected  = 0;

function preload(){
 p = loadImage('./images/player.png');
 p2 = loadImage('./images/player2.png');
 p3 = loadAnimation('./images/player2.png','./images/player3.png');
 p4 = loadImage('./images/player4.png');
 p5 = loadImage('./images/player3.png')
 g = loadImage('./images/ground.png');
 s = loadImage('./images/sky.png');
 plI1 = loadImage('./images/pl1.png');
 plI3 = loadAnimation('./images/tele1.png','./images/tele2.png','./images/tele3.png','./images/tele1.png','./images/tele1.png','./images/tele4.png','./images/tele5.png','./images/tele6.png','./images/tele7.png','./images/tele1.png','./images/tele1.png','./images/tele1.png','./images/tele8.png','./images/tele9.png','./images/tele10.png','./images/tele1.png');
 coinA = loadAnimation('./images/coin1.png','./images/coin2.png','./images/coin3.png','./images/coin4.png','./images/coin5.png','./images/coin6.png');
}
function setup(){
  canvas = createCanvas(1318, 625);
  player = createSprite(30,300,25,60);
  player.addAnimation('Player1',p);
  player.addAnimation('Player2',p2);
  player.addAnimation('left',p3);
  player.addImage('r',p4);
  player.addImage('jumpleft',p5)
  player
  ground = createSprite(width/2,height-10,width*2,30);
  ground.addImage('Ground',g);
  pl1 = createSprite(150,500,300,200);
  pl1.addImage('Pl1',plI1);
  pl2 = createSprite(300,500,300,200);
  pl2.addImage('Pl1',plI1);
  tele = createSprite(1240,550,20,100)
  tele.addAnimation('teleporter',plI3);
  coin1 = createSprite(300,570,20,20);
  coin1.addAnimation('coin',coinA);
  coin2 = createSprite(500,570,20,20);
  coin2.addAnimation('coin',coinA);
  coin3 = createSprite(700,570,20,20);
  coin3.addAnimation('coin',coinA);
  coin4 = createSprite(900,570,20,20);
  coin4.addAnimation('coin',coinA);

}
function draw(){
  background(s);
  fill(0,0,0,100);
  rect(0,0,1318,700);
  edges = createEdgeSprites();
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
  player.bounceOff(edges[2]);
  player.bounceOff(edges[3]);
  pl1.visible = false;
  pl2.visible = false;

  if(level === 1){
    jump = 10;
    Gravity(player,ground);
    coinCollection(coin1);
    coinCollection(coin2);
    coinCollection(coin3);
    coinCollection(coin4);
  }
  if(level === 2){
    jump = 20;
    pl1.visible = true;
    pl2.visible = true;
    Gravity(player,pl1);
    Gravity(player,pl2);
    Gravity(player,ground);
  }

  if(player.isTouching(tele) && level === 1){
    player.x = 30;
    player.y = 300;
    level = 2
  }
  textSize(30);
  text("Score: " + coinsCollected, 900,100);
  move();
  drawSprites();
}

function Gravity(player,ground){

  if(player.isTouching(ground)){
    player.velocityY = 0;
    player.collide(ground);
    if(keyDown(UP_ARROW)){
      player.velocityY = jump * -1;
    }    
  }
  else{
    player.velocityY = player.velocityY + 0.8;
  }
  
}

function move(){
  if(keyDown(RIGHT_ARROW)){
    player.x += 13;
    player.changeAnimation('r',p4);
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.changeAnimation('Player1',p);
  }
 
  if(keyDown(LEFT_ARROW)){
    player.x += 13 * -1;
    player.changeAnimation('left',p3);
  }

  if(keyWentUp(LEFT_ARROW)){
    player.changeAnimation('Player2',p2);
  }

  if(keyDown(UP_ARROW) && keyDown(RIGHT_ARROW)){
    player.changeAnimation('r',p4);
  }
  if(keyDown(UP_ARROW) && keyDown(LEFT_ARROW)){
    player.changeAnimation('jumpleft',p5);
  }
}

function coinCollection(coin){
  if(player.isTouching(coin)){
    coinsCollected += 1;
    console.log(coinsCollected);
    coin.destroy();
  }
}