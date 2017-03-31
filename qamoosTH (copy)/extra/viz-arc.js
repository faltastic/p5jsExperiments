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
    var myCanvas = createCanvas(0.99* windowWidth, windowHeight / 0.8);
    myCanvas.parent("theCanvas");
    frameRate(2);
    rectMode(CORNERS);
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);
    textAlign(RIGHT);
    textSize(16);
    textFont('Sche');
    
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
       h[i] = map(n[i], 0, nMax, 1, 4);
        theta[i] = i * TWO_PI / N;
         //h[i] = map(n[i], 0, nMax, 1, height/20);
   x[i] =  width*(i)/(1.1*N);
        y[i] = height / 1.3;
        //y[i] = (height / 2) + R * sin(theta[i]);
        d = rndData; //words[i]['con'];
        names[i] = "";
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
    
    
    for (var i = 0; i <N; i++) {
        fill(pal[words[i]['cat']-1]);
        strokeWeight(1.5);
        noStroke();
        ellipse(x[i], y[i], h[i], h[i]);
        
        
        stroke(pal[words[i]['cat']-1]); 
        //stroke(0);
        noFill();
        strokeWeight(0.1);
        for (var j = 0; j < N; j++) {
                //for (var k = 0; k < d[i][j]; k++) {
                
                if(d[i][j]>0.1){
                    strokeWeight(d[i][j]/4);
               arc( abs(x[i]+x[j])/2,y[i], 
         abs(x[j] - x[i])/2, abs(x[j] - x[i])/2,
         PI , 0, OPEN) ;     
                //}
                }
                
            
        }
        
        push();
        noStroke();
        fill(0);
        //wtranslate(width/2, height/2);
        //rotate(HALF_PI);
        translate(x[i],y[i]+20);
        if(i%2!=0) {stroke(0);line(0,0,0,80); translate(0,90);}
        rotate(-HALF_PI);
        noStroke();
        fill(0);
        text(t[i], 0,0);
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
                if(random(20)<15){rndData[i][j] = 0;}
                if(random(20)<1.0){rndData[i][j] =1;}
                if(random(20)<0.05){rndData[i][j] =2;}
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