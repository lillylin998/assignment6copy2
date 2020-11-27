let facemesh;
let video;
let predictions = [];
let keypoints = [10,338,297,332,284,251,389,356,454,323,361,288,397,365,179,378,400,377,152,148];
let verticesX = [];
let verticesY = [];


function setup() {

  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

  //  facemesh.load();
    

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  translate(video.width, 0)
  scale(-1.0,1.0)
  image(video, 0, 0, width, height);
    
  push();
  drawSunflower();
  pop();
    
  //  drawKeypoints();
}


function drawSunflower(){
    
   let allpoints;
    
    for(let i = 0; i < predictions.length; i++){
        allpoints = predictions[i].scaledMesh;
        print(allpoints);
        for(let j = 0; j < keypoints.length; j++){
            for(let k = 0; k < 2; k++){
                let index = keypoints[j];
                //print(index)
                verticesX[j]= allpoints[index][0];
                verticesY[j]= allpoints[index][1];
                print(verticesX, verticesY)
            }
        }
        break;
    }
   // print(verticesY);
    let count=0;
   for(let i = 0; i < predictions.length; i++){
       allpoints = predictions[i].scaledMesh;
   // print(allpoints);
   for(let i=0; i<keypoints.length/4;i++){
           let distFace = dist(allpoints[10][0],allpoints[10][1],allpoints[152][0],allpoints[152][1]);
  let px = verticesX[count*4];
  let py = verticesY[count*4];
  let qx = verticesX[count+3];
  let qy = verticesY[count+3];
  let a = atan2(qy-py,qx-px);
  let deltaY = py-qy;
  push()
  translate(px,py);
  if(deltaY >0){
     rotate(-a)
  }else{
     rotate(a);
  }
      // print(a);
   
  beginShape()
  
  let distPetal = dist(px,py,qx,qy);
  //distFace = 200;
  curveVertex(0,0);
  curveVertex(0,0);
  curveVertex(0+0.1*distPetal,0-distFace/5);
  curveVertex(0+distPetal/2,0-distFace/3);
  curveVertex(0+0.9*distPetal,0-distFace/5);
  curveVertex(0+distPetal,0);
  curveVertex(0+distPetal,0);
  endShape()
  pop();
  //  print("hello");
       
//       fill(255);
//        ellipse(px,py,20);
//       fill(0)
//       ellipse(qx,qy,20);
//       
//   print(px,py)
       count+=1;
       print(count);
   }
       
    }
    
    }

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
      print(keypoints)
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

