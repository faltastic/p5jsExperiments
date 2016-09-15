/*
var input;
var analyzer;
var vol = 0.5;
var v = 1;
var s = 0;
var x, y = 0;
var sp = 5;
var r = 3;
var c = 1;

// Control Parameters
var waves = 3
    , spacing = 50
    , radius = 50
    , speed = 50
    , trail = 50
    , funnyRadius = false;
// GUI functions
var gui;
var guiP;
var guiParams = function () {
    this.waves = 3;
    this.spacing = 50;
    this.radius = 50;
    this.speed = 50;
    this.trail = 50;
    this.funnyRadius = false;
    
};

function initGUI() {
    guiP = new guiParams();
    gui = new dat.GUI();
    gui.add(guiP, 'waves', 0, 8);
    gui.add(guiP, 'spacing', 1, 100);
    gui.add(guiP, 'radius', 1, 100);
    gui.add(guiP,'speed', 1 , 100);
    gui.add(guiP,'trail', 1, 100);
    gui.add(guiP,'funnyRadius', false)
};

function updateParams() {
    sp = guiP.spacing/2;
    r = guiP.radius/5;
    c = map(guiP.speed,1,100,2,0.3);
    
    // cohForce = map(guiP.cohesion,1,100,0,1.0);
};

function setup() {
    initGUI();
    
    var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
    
    colorMode(HSB,360,100,100,100);
    noStroke();
    
    // Create an Audio input
    //mic = new p5.AudioIn();
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    //mic.start();
    
}

function draw() {
    //background(200);
    // Get the overall volume (between 0 and 1.0)
    //vol = mic.getLevel();
    updateParams();
    
    fill(360,0,100, 100- guiP.trail);
    rect(0, 0, width, height);
   
    for (var i = 1; i < ceil(guiP.waves+1); i++) {
        for (var y = 0; y < height; y = y + sp) {
            
            s = sin(radians(1.5*y - i * frameCount/c));
            
            x = map(s, -1, 1, width/2 - 100, 100+width/2);
            
            
            fill(0, 0, 0);
            
            if (guiP.funnyRadius) {
               var r1 = 2*r - r*(abs(s));
                ellipse(x, y, r1, r1);
            }
            else{
              ellipse(x, y, r, r);
            }
        }
    }
}
*/
function mouseReleased() {
    setup();
}


var pend; 
 
var posx, posy, newposx, newposy; //these keep track of the tip's position
var centerx, centery;             //anchor point of the pendulum
var w;
var h;
var s;                      //scaling factor for drawing the arms

function setup() {
    
    pend = new DoublePendulum();
    var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
    
    colorMode(HSB,360,100,100,100);
    noStroke();


 
  s = 30;
  centerx = width/2;
  centery = height/2;
  pend.m1=random(1,3);
  pend.m2=random(0.5,2);
  pend.l1= random(3,5);
  pend.l2=8-pend.l1;
  pend.g=10;
   
  pend.x[0]=3;
  pend.x[1]=0;
  pend.x[2]=3.14;
  pend.x[3]=0;
  
   
  posx = centerx + s*pend.l1*sin(pend.x[0]) + s*pend.l2*sin(pend.x[2]);
  posy = centery + s*pend.l1*cos(pend.x[0]) + s*pend.l2*cos(pend.x[2]);
   
  background(0);
  smooth();
   
}
 
function draw() {
  h =0.03;    
  pend.update();
    
  newposx = centerx + s*pend.l1*sin(pend.x[0]) + s*pend.l2*sin(pend.x[2]);
  newposy = centery + s*pend.l1*cos(pend.x[0]) + s*pend.l2*cos(pend.x[2]);
     
  noStroke();
  
  if (frameCount %10 == 0){
    background(0,10);
  }
  
    
   var vel = sqrt((posx-newposx)*(posx-newposx) + (posy-newposy)*(posy-newposy));
  
    // should calculate vel wrt the actual states instead of the xy pos as it doesn't scale well right now
     
  stroke(frameCount/5%360,100-vel*5,100,vel*10+50);
  strokeWeight(1.5);
  line(posx,posy,newposx,newposy);
     
  posx = newposx;
  posy = newposy;
    
  stroke(100,0,100,15);
  strokeWeight(0.5);
  
  pend.drawP();
  
}
 


function DoublePendulum() {
 
  this.m1;
  this.m2; //point masses at the ends of the arms
  this.g;      //gravity constant
  this.l1;
  this.l2; //arm lengths
 
 this.x= [3,0,3.14,0];
    //new float[4];      //state vector,  state vars are theta1 theta1' theta2 theta2'
   
  this.dx = [0,0,0,0];// = new float[4];     //for storing the value of the state function at the current state
 
   
  this.update=function() {
     
    //evaluate the state functions
    this.dx[0] = this.x[1];
     
    this.dx[1] = -this.g*(2*this.m1 + this.m2)*sin(this.x[0]) -
            this.m2*this.g*sin(this.x[0]-2*this.x[2]) -
            2*sin(this.x[0] - this.x[2])*this.m2*(this.x[3]*this.x[3] * this.l2 +
            this.x[1]*this.x[1]*this.l1 * cos(this.x[0] - this.x[2]));
    this.dx[1] = this.dx[1]/(this.l1*(2*this.m1 + this.m2 -this.m2*cos(2*this.x[0]-2*this.x[2])));
    this.dx[1] = this.dx[1]-0.08*this.x[1]/(abs(this.x[1])+0.01); //friction, should probably be elaborated on
     
    this.dx[2] = this.x[3];
     
    this.dx[3] = 2*sin(this.x[0] - this.x[2])*(this.x[1]*this.x[1]*this.l1*(this.m1 + this.m2) +
            this.g*(this.m1 + this.m2)*cos(this.x[0]) +
            this.x[3]*this.x[3]*this.l2*this.m2*cos(this.x[0] - this.x[2]));
    this.dx[3] = this.dx[3]/(this.l2*(2*this.m1 + this.m2 -this.m2*cos(2*this.x[0]-2*this.x[2])));
    this.dx[3] = this.dx[3]-0.1*this.x[3]/(abs(this.x[3])+0.01); //friction
     
    //euler step
    this.x[0] += h*this.dx[0];
    this.x[1] += h*this.dx[1];
    this.x[2] += h*this.dx[2];
    this.x[3] += h*this.dx[3];
      
     // console.log(this.x[0]);
  }
   
  this.drawP =function() {
    endx = centerx + s*this.l1*sin(this.x[0]);
    endy = centery + s*this.l1*cos(this.x[0]);
         
  
  line(centerx,centery,endx,endy);
  line(endx,
       endy,
       endx+s*this.l2*sin(this.x[2]),
       endy+s*this.l2*cos(this.x[2]));
         
  }
}
