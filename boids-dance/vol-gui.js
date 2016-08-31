
var input;
var analyzer;
var vol = 0.5;
var v = 1;

// Control Parameters
var sepF = 50,
    cohForce = 0.01;
    
// GUI functions
var gui;
var guiP;
var guiParams = function () {
    this.reactivity =sepF;
   // this.cohesion = 5;
};

function initGUI() {
    guiP = new guiParams();
    gui = new dat.GUI();
     gui.add(guiP, 'reactivity', 1, 100);
   // gui.add(guiP, 'cohesion', 1, 100);
};

function updateParams() {
    sepF = guiP.reactivity;
   // cohForce = map(guiP.cohesion,1,100,0,1.0);
};



function setup() {
    initGUI();
    // Create an Audio input
    mic = new p5.AudioIn();
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
}

function draw() {
    //background(200);
    // Get the overall volume (between 0 and 1.0)
    vol = mic.getLevel();
    updateParams();
}

function mouseReleased() {
    return false;
}