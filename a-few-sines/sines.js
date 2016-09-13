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

function mouseReleased() {
    return false;
}