var mic, fft;

function setup() {
   createCanvas(710,255);
   noFill();

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
   rectMode(CORNERS);
  
}

function draw() {
   background(225);

   var spectrum = fft.analyze();

   fill(255,55,55);
   var bass = fft.getEnergy('bass');
   rect(0,height, width/5,height-bass);
   var lowMid = fft.getEnergy('lowMid');
   rect(width/5,height, 2*width/5,height-lowMid);
   var mid = fft.getEnergy('mid');
   rect(2*width/5,height, 3*width/5,height-mid);
   var highMid = fft.getEnergy('highMid');
   rect(3*width/5,height, 4*width/5,height-highMid);
   var treble = fft.getEnergy('treble');
   rect(4*width/5,height, width,height-treble);
   
   
   noFill();
   
   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
   }
   endShape();
}

