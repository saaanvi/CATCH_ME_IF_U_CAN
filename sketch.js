var skyImg
var fish
var craneImg,crane
var fish1, fish2
var fishGroup
var score =0;
var gameState ="play"
var restart,restartImg

function preload() {
    skyImg=loadImage("ocean2.jpg");
    peng_stand = loadAnimation("walk1.png")
    peng_pick=loadAnimation("down1.png","walk1.png")
    peng_walk=loadAnimation("walk1.png","walk2.png","walk3.png",
    "walk4.png","walk5.png","walk6.png","walk7.png","walk8.png","walk9.png","walk10.png","walk11.png");
  //  craneimg2= loadAnimation("cranemirror.png")
    fish1=loadImage("fisha.png");
    fish2=loadImage("fishb.png");
    fish3= loadImage("fishc.png")
    fish4=loadImage("fishd.png")
   urchinImg=loadImage("urchin.png")
   restartImg=loadImage("restart.png")
  
}

function setup(){
        
        createCanvas(1200,600);
    crane=createSprite(200,100,20,20);
    crane.addAnimation("standing",peng_stand);
   // crane.addAnimation("mirror",craneimg2)
    crane.scale=0.8
   // crane.debug=true;
  
    restart=createSprite(600,200)
    restart.addImage(restartImg)
    restart.scale=0.5
    restart.visible=false
    

    fishGroup=createGroup();
urchinGroup=createGroup();

    

    
}

function draw(){
    background(skyImg);
    drawSprites()

if(gameState=== "play"){

    restart.visible=false
     if(keyDown("a")){
    crane.x=crane.x-5
    crane.changeAnimation("standing",crane1Img);
   
    }

    if(keyDown("w")){
    crane.y=crane.y-5       
    }

    if(keyDown("d")){
    crane.x=crane.x+5   
    //crane.changeAnimation("mirror",craneimg2)   
     
    }

    if(keyDown("s")){
    crane.y=crane.y+5        
    }

    spawnFish();
    if(score >7){
        spawnUrchin();
    }
    spawnUrchin();

    for (var i = 0; i < fishGroup.length; i++) {
        var temp_item = fishGroup.get(i);

        if (mousePressedOver(temp_item)&& crane.isTouching(temp_item)) {
            score = score + 1;

            temp_item.destroy()

            console.log("touched and clicked")
        }
    }
   

    
   

textSize(50);
fill("black")
text("Score :"+score,600,300)
if(crane.isTouching(urchinGroup)){
    gameState ="end"
}
}
else if(gameState==="end"){
    console.log("end")
    textSize(50);
    fill("black");
    text("GAME OVER",600,300);
    restart.visible=true
    fishGroup.setVelocityXEach(0)

    if(mousePressedOver(restart)){
        gameState="play"
        score =0;
        fishGroup.destroyEach();
    }
}

}




   
    
function spawnFish(){
    if (frameCount % 50 === 0){

        var r = Math.round(random(1,3))
        if(r===1){
            var fish = createSprite(0,random(300,600),10,40);
            fish.velocityX = 6
            var rand = Math.round(random(1,2));
            switch(rand) {
              case 1: fish.addImage(fish1);
                      break;
              case 2: fish.addImage(fish2);
                      break;
             
              default: break;
            }
            fish.scale=0.4
        }else{
            var fish = createSprite(1200,random(300,600),10,40);
            fish.velocityX = -6
            var rand = Math.round(random(1,2));
            switch(rand) {
              case 1: fish.addImage(fish1);
                      break;
              case 2: fish.addImage(fish2);
                      break;
             
              default: break;
            }
            fish.scale=0.4
            fish.lifetime=200
        }
        
    //  fish.debug=true  
     fishGroup.add(fish)
      
       //generate random obstacles
      
    }
}

function spawnUrchin(){
    if (frameCount % 120 === 0){

        var urchin = createSprite(0,random(300,600),10,40);
        urchin.velocityX = 6+(score/10)
           
               urchin.addImage(urchinImg);
                     
            
            urchin.scale=0.3
            urchin.lifetime=200
            urchinGroup.add(urchin)
        
}}
