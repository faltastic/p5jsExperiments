

// edit of fountain sketch
// http://pastebin.com/abDpCgGt

var num = 500, Tau=60;
var theta =0, rs=0;
var mic, fft;

function setup() {
   createCanvas(800,800);

   rs = random(232323);

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);


   //rectMode(CORNERS);
   noFill();
   colorMode(HSB,255,255,255,100);
}



function draw() {


   var spectrum = fft.analyze();

   var bass = fft.getEnergy('bass');
   var lowMid = fft.getEnergy('lowMid');
   var mid = fft.getEnergy('mid');
   var highMid = fft.getEnergy('highMid');
   var treble = fft.getEnergy('treble');

   /*
   rect(0,height, width/5,height-bass);
   rect(width/5,height, 2*width/5,height-lowMid);
   rect(2*width/5,height, 3*width/5,height-mid);
   rect(3*width/5,height, 4*width/5,height-highMid);
   rect(4*width/5,height, width,height-treble);
   */


   /*
   noFill();
   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
   }
   endShape();
   */

  var s = bass/2;


  randomSeed(rs);

  background(2,30);
  noStroke();
  translate(width/2, height/2);



  for (var i=0; i<num; i++) {

    push();
    var r = random(TWO_PI);
    rotate(r);

    var d = map(treble, 0, 255, s, height*0.4);


    //var d =  random(s, height*.35);

    if (random(1)>0.9) d = random(s,height*.5);
    if (random(1)>.97) d = random(s-50,s-10);
    var s2 = s + random(-10,10);
    var x = map(sin(theta+random(TWO_PI)), -1, 1, s2, d);
    var sz = treble/55;

    var hue = random(bass);

    fill(hue,175,255,100);

    ellipse(x, 0, sz, sz);
    //line(100,0,x,0);
    pop();

  }

  theta += TWO_PI/Tau;
  //console.log(theta);
}

