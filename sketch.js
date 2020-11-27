let facemesh;
let video;
let predictions = [];
let crowns = [];
let ready = false;
let button;
let pressed = false;
let crownNo = -1;
let font;
let timer = 0;


function preload(){
    
    for(let i = 0; i<5; i++){
        crowns[i] = loadImage('crown'+(i+1)+'.png');
    }
    print(crowns);
   // crowns[0] = loadImage('crown1.png');
   // crowns[1] = loadImage('crown2.png');
    font = loadFont('sweetpurple.otf');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
    
  video = createCapture(VIDEO);
  video.size(640, 480);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

    video.hide();
    
    button = new Clickable();
    button.locate(200,550);
    button.resize(200,50);
    button.strokeWeight = 2;
    button.stroke = "#D3A62A"
    button.text = "Press to Start!";
    button.textFont = font;
    button.textSize = 30;
    button.color = "#F4DB95"
    button.onPress = function(){
        button.color = "#D3A62A";
        pressed = true;
        crownNo += 1;
          if(crowns[crownNo] == undefined){
        crownNo = 0;
    }
    button.onRelease = function(){
        button.color = "#F4DB95"
    }
    }
    

    
}

function modelReady() {
  console.log("Model ready!");
  ready = true;
}

function draw() {

  background('#FCC8D2');
  loadingScreen();
    
  push();
  translate(video.width, 0)
  scale(-1.0,1.0)
  image(video, 0, 0, 640, 480);
  pop();  
    
    
    
    if(ready){

        button.draw();
        textFont(font);
        textSize(64);
        text('the fairest of them all',300,500);
        if(pressed){
           placeCrown(crownNo);
            button.text = "Press Me";
        }
        
    }
}


function loadingScreen(){
     
    textFont(font);
    textSize(40)
    if(ready === false){
        //print(millis())
        
        if(millis()-timer<300){
            text('Loading.', 320,240);
            
        }
        if(millis()-timer>600){
            text('Loading. .', 320,240);
            
        } 
        if(millis()-timer>900){
            text('Loading. . .', 320,240);
            timer = millis();
            
        }
    } 
    
}

function switchCrown(){
    crownNo += 1;
    if(crowns[crownNo] == undefined){
        crownNo = 0;
    }
    return crownNo;
}

function placeCrown(num){
    
   push();
  translate(video.width, 0);
  scale(-1.0,1.0);
  
    let allpoints;
    
    for(let i = 0; i < predictions.length; i++){
        allpoints = predictions[i].scaledMesh;
        let leftTempleX = allpoints[54][0];
        let leftTempleY = allpoints[54][1];
        let rightTempleX = allpoints[284][0];
        let rightTempleY = allpoints[284][1];
        
        //ellipse(leftTempleX, leftTempleY,20);
        let crownWidth = dist(leftTempleX,leftTempleY,rightTempleX, rightTempleY);
        
       // image(crowns[1],leftTempleX-crownWidth*1.5/8,leftTempleY-crownWidth, crownWidth*1.5, crownWidth);
        
        if(rightTempleY-leftTempleY > 20){
            let a = atan2(rightTempleY-leftTempleY,rightTempleX-leftTempleX);
            //print(a);
            push();
            translate(leftTempleX-crownWidth*1.5/8,leftTempleY-crownWidth);
            rotate(a);
            image(crowns[num],0,0,crownWidth*1.5,crownWidth);
            pop();
        } else if(rightTempleY-leftTempleY <-20){
             let a = atan2(rightTempleY-leftTempleY,rightTempleX-leftTempleX);     
            push();
            translate(leftTempleX-crownWidth*1.5/8,leftTempleY-crownWidth);
            rotate(a);
            image(crowns[num],0,0,crownWidth*1.5,crownWidth);
            pop();
                  }else{
             image(crowns[num],leftTempleX-crownWidth*1.5/8,leftTempleY-crownWidth, crownWidth*1.5, crownWidth);
        }
        
    
    }
    
   pop(); 
}
