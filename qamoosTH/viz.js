// Controls
var autoPlay = true;
// fixed variables for data
var N;
var n = []
    , h = []
    , t = [];
var w;
var d = [];

var rndData =[];

var names = [];
var theta = []
    , x = []
    , y = [];
var R;
var bell;
var muteIcn, playIcn;
////
// temp. variables
var today = 0
    , yesterday = 0;
var namesP;
var vol = 0
    , soundOn = true;

var fontAR;
var pal =[];


function preload() {
    //fontAR= loadFont('./css/fonts/DroidNaskh-Regular.ttf');
    /*
    bell = createAudio('sound/SD.wav');

    playIcn = loadImage("icns/play.png");
    muteIcn = loadImage("icns/mute.png");
    */
}

function setup() {
    var myCanvas = createCanvas(0.85* windowWidth, windowHeight / 0.8);
    myCanvas.parent("theCanvas");
    frameRate(2);
    //rectMode(CORNERS);
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);
    textAlign(LEFT);
    textSize(12);
    textFont('CairoReg');
    
    pal = [color(74,139,115,175), color(37,93,108,175), color(92,93,136,175), color(59,137,201,175)];
    
    // prepare data
    //N = 20;
    N = words.length;
    //console.log(N);
    
    randomData();
    
    w = width / N;
    baseH = height / 1.2;
    R = width / 4;
    //nMax = 0;
    nMax = 20;
    /*    
    for (var i = 0; i < N; i++) {
      if( n[i] = words[i]['ex'].length > nMax){
        nMax = words[i]['ex'].length;
      }
    }
    */
    
   // N =30;
    for (var i = 0; i < N; i++) {
        t[i] = words[i]['term'];
        
        n[i] = floor(random(5, 20)); //words[i]['ex'].length; 
        h[i] = map(n[i], 0, nMax, 2, 20);
        theta[i] = i * TWO_PI / N;
        x[i] = (width / 2) + R * cos(theta[i]);
        y[i] = (height / 2) + R * sin(theta[i]);
        d = rndData; //words[i]['con'];
        //names[i] = "";
        for (var j = 0; j < n[i]; j++) {
            // names[i] += "<p>" + words[i]['ex'][j] + " </p> " ;
        }
    }
    namesP = select('#namesP');
    //console.log(d);
    //console.log(namesP);
    stroke(0);
    noFill();
    // ellipse(width/2,height/2, R,R);
    
    console.log(t);
    for (var i = 0; i <N; i++) {
        /*
        fill(pal[words[i]['cat']-1]);
        strokeWeight(1.5);
        noStroke();
        ellipse(
            (width / 2) + 1.075 * R * cos(theta[i]), 
            (height / 2) + 1.075 * R * sin(theta[i]),
            h[i], h[i]);
        */
        
        
        stroke(pal[words[i]['cat']-1]); 
        //stroke(0);
        noFill();
        strokeWeight(0.1);
        for (var j = 0; j < N; j++) {
            if(d[i][j]>0.1){
                    strokeWeight(d[i][j]/5);// console.log(i + " , " + j);
               // for (var k = 0; k < d[i][j]; k++) {
                    //strokeWeight(d[i][j]);
                    if(words[i]['cat'] >0){
                    bezier(x[i], y[i],                         
                           //(x[i]+x[j])/2, (y[i]+y[j])/2,
                           //(x[i]+x[j])/2, (y[i]+y[j])/2,
                           width / 2, height / 2,
                           width / 2, height / 2,
                           x[j], y[j]);
                    }
                 /*beginShape();
                 curveVertex(x[i], y[i]);
                 curveVertex((x[i]+x[j])/2, (y[i]+y[j])/2);
                  curveVertex(x[j], y[j]);
                endShape();``
                */
                /*
                curveTightness(map(dist(x[i],y[i],x[j],y[j]), 1, 2*R, -2,0) );
                curve((width / 2) + 3 * R * cos(theta[i]),(height / 2) + 3 * R * sin(theta[i]), 
                        x[i], y[i],                         
                        x[j], y[j],
                        (width / 2) + 3 * R * cos(theta[j]),(height / 2) + 3 * R * sin(theta[j]) );
                  */      
                //}
                
            }
        }
        
        push();
        noStroke();
        fill(0);
        translate(width/2, height/2);
        rotate(theta[i]);
        translate(1.2*R,0);
        textAlign(LEFT);
        
        if(i>floor(N/4) && i<floor(3*N/4)) {
           
           translate(0,-6); 
           rotate(PI); 
           textAlign(RIGHT);
           
        }
        text(t[i], 0,0);
        pop();
        
        push();
        translate(width/2, height/2);
        rotate(theta[i]);
        translate(1.12*R,0);
        fill(pal[words[i]['cat']-1],10);
        strokeWeight(1.5);
        noStroke();
        //ellipse(
        rect(-0.04*R, -6, h[i],5);
        
        pop();
        
    }
}

function randomData() {
    //words = [];
    for (var i = 0; i < N; i++) {
        
        rndData[i] = [];
        
        for (var j = 0; j < N; j++) {
            if (i == j) {
                rndData[i][j] = 0;
            }
            else {
                
                //rndData[i][j] = floor(random(0,1.3));
                if(random(30)<15){rndData[i][j] = 0;}
                if(random(30)<random(1,1.4) ){rndData[i][j] =1;}
                if(random(30)<random(0.05,0.08) ) {rndData[i][j] =2;}
            
                }
        }
    }
    //console.log(words);
    /* words[i] =
        {
         "title": "شباب",
         "con":[0,2,1,0,4],
         "ex": [
         "سليمان صابر علي محمدين",
         "غريب عبد العزيز عبد اللطيف",
         "محمد السيد لبيب محمد",
         "احمد عزيز الدين فرج عبد الله"
         ]
     }*/
}

function draw() {
    /*    

    if(autoPlay){
      today = (today+1)%N;
    }
    else if(mouseY <baseH) {
      today = floor(map(mouseX, 0, width, 0, N));
    }
  
    // new day
    if( today != yesterday ){
      
      background(0);
      noStroke();
      fill(255);
      for (var i = 0; i < N; i++) {
       rect(i*w, baseH, (i+1)*w, h[i] );
      }
     
      // highlight today 
      fill(255,0,0);
      stroke(255,0,0);
      text( d[today], today*w + 0.5*w, baseH + 20);
      text( n[today], today*w + 0.5*w, h[today] - 20);
      
      rect(today*w, baseH, (today+1)*w , h[today]);
     
      // sound
      vol = map(n[today],0,nMax, 0.5, 1);
      if(!soundOn){vol = 0;}

      bell.volume(vol);
      
      // write names to HTML
      namesP.html( names[today]); 
    }

    yesterday = today;


    if(soundOn){
      image(playIcn,width - 32, 0, 32,32 );
    }
    else{
      image(muteIcn,width - 32, 0, 32,32 );
    }
    */
}

function mouseReleased() {
    autoPlay = !autoPlay;
    if (mouseX > width - 32 && mouseY < 32) {
        soundOn = !soundOn;
    }
}