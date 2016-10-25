// Controls
var autoPlay = true;
var isChordAll = true;
// fixed variables for data
var N;
var n = []
    , h = []
    , t = [];
var w;
var d = [];
var rndData = [];
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
var pal = [];
var t0 = 0;

function preload() {
    //fontAR= loadFont('./css/fonts/DroidNaskh-Regular.ttf');
    /*
    bell = createAudio('sound/SD.wav');

    playIcn = loadImage("icns/play.png");
    muteIcn = loadImage("icns/mute.png");
    */
}

function setup() {
    var myCanvas = createCanvas(0.85 * windowWidth, windowHeight / 0.8);
    myCanvas.parent("theCanvas");
    //frameRate(2);
    //rectMode(CORNERS);
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);
    textAlign(LEFT);
    textSize(12);
    textFont('CairoReg');
    pal = [color(74, 139, 115, 175), color(37, 93, 108, 175), color(92, 93, 136, 175), color(59, 137, 201, 175)];
    // prepare data
    //N = 20;
    N = words.length;
    //console.log(N);
    randomData(50);
    w = width / N;
    baseH = height / 1.2;
    R = height / 3.5;
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
    //console.log(t);
    chordAll();
    //chordOne();
}

function chordAll() {
    isChordAll = true;
    background(255);
    textSize(12);
    for (var i = 0; i < N; i++) {
        stroke(pal[words[i]['cat'] - 1]);
        //stroke(0);
        noFill();
        strokeWeight(0.1);
        for (var j = 0; j < N; j++) {
            if (d[i][j] > 0.1) {
                strokeWeight(d[i][j] / 5); // console.log(i + " , " + j);
                // for (var k = 0; k < d[i][j]; k++) {
                //strokeWeight(d[i][j]);
                if (words[i]['cat'] > 0) {
                    bezier(x[i], y[i], //(x[i]+x[j])/2, (y[i]+y[j])/2,
                        //(x[i]+x[j])/2, (y[i]+y[j])/2,
                        width / 2, height / 2, width / 2, height / 2, x[j], y[j]);
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
        translate(width / 2, height / 2);
        rotate(theta[i]);
        translate(1.2 * R, 0);
        textAlign(LEFT);
        if (i > floor(N / 4) && i < floor(3 * N / 4)) {
            translate(0, -6);
            rotate(PI);
            textAlign(RIGHT);
        }
        text(t[i], 0, 0);
        pop();
        push();
        translate(width / 2, height / 2);
        rotate(theta[i]);
        translate(1.12 * R, 0);
        fill(pal[words[i]['cat'] - 1], 10);
        strokeWeight(1.5);
        noStroke();
        rect(-0.04 * R, -6, h[i], 5);
        pop();
    }
}
var incoming = [];
var nNew = 1;
var thetaEnd = [];
var thetaMove = [];
var xNew = [];
var yNew = [];
var tNew = [];
var strokeNew = [];
var strokeOut;
var strokeIn;

function chordOne(newTerm) {
    isChordAll = false;
    var i = newTerm; //floor(random(N));
    incoming = [];
    nNew = 1;
    thetaEnd = [];
    thetaMove = [];
    xNew = [];
    yNew = [];
    tNew = [];
    strokeNew = [];
    strokeOut = color(175); // pal[words[i]['cat'] - 1];
    strokeIn = color(0);
    tNew[0] = t[i]; // wont be used
    thetaEnd[0] = theta[i]; //  = selected old Theta;
    thetaMove[0] = theta[i];
    xNew[0] = x[i]; // = selcted xOld;
    yNew[0] = y[i]; // = selcted yOld;
    strokeNew[0] = color(0);
    incoming[0] = false;
    for (var j = 0; j < N; j++) {
        if ((d[i][j] != 0) || (d[j][i] != 0)) {
            nNew++;
            incoming.push(true);
            tNew.push(t[j]);
            strokeNew.push(d[i][j] * 1.5);
        }
        if (d[j][i] != 0) {
            incoming[nNew - 1] = false;
            strokeNew[nNew - 1] = d[j][i] * 1.5;
        }
    }
}

function chordOneDraw(t, t0, tAnime) {
    textSize(map(nNew, 1, 50, 16, 12));
    //console.log(nNew);
    //console.log(incoming);
    background(255, map(t - t0, 0, tAnime, 5, 255));
    noFill();
    for (var j = 1; j <= nNew; j++) {
        thetaEnd[j] = (thetaEnd[0] + (j * TWO_PI / nNew)) % (TWO_PI);
        thetaMove[j] = map(t - t0, 0, tAnime, thetaEnd[0], thetaEnd[j]);
        xNew[j] = (width / 2) + R * cos(thetaMove[j]);
        yNew[j] = (height / 2) + R * sin(thetaMove[j]);
        //console.log(thetaEnd[j]);
        strokeWeight(strokeNew[j]);
        if (incoming[j]) {
            stroke(strokeIn);
        }
        else {
            stroke(strokeOut);
        }
        // stroke(strokeOut);
        bezier(xNew[0], yNew[0], width / 2, height / 2, width / 2, height / 2, xNew[j], yNew[j]);
    }
    for (var j = 0; j < nNew; j++) {
        push();
        noStroke();
        fill(0);
        translate(width / 2, height / 2);
        rotate(thetaMove[j]);
        translate(1.1 * R, 0);
        if (j == 0) {
            ellipse(0, 0, 4, 4);
        }
        translate(0.1 * R, 0);
        textAlign(LEFT);
        if (thetaMove[j] > (TWO_PI / 4) && thetaMove[j] < (3 * TWO_PI / 4)) {
            translate(0, 0);
            rotate(PI);
            textAlign(RIGHT);
            // console.log(thetaEnd[j]);
        }
        text(tNew[j], 0, 0);
        pop();
    }
}

function randomData(r) {
    //words = [];
    for (var i = 0; i < N; i++) {
        rndData[i] = [];
        for (var j = 0; j < N; j++) {
            rndData[i][j] = 0;
            if (i == j) {
                rndData[i][j] = 0;
            }
            else {
                //rndData[i][j] = floor(random(0,1.3));
                if (random(r) < 15) {
                    rndData[i][j] = 0;
                }
                if (random(r) < random(1, 2.4)) {
                    rndData[i][j] = 1;
                }
                if (random(r) < random(0.06, 0.09)) {
                    rndData[i][j] = 2;
                }
                if (random(r) < random(0.03, 0.06)) {
                    rndData[i][j] = 3;
                }
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
    if (!isChordAll && (millis() - t0) < 400) {
        chordOneDraw(millis(), t0, 400);
    }
   // cartesToPolar(mouseX, mouseY);
}

function mouseReleased() {
    
    if (isChordAll) {    
        var rTheta = cartesToPolar(mouseX, mouseY);
        if (rTheta[0] > 0.85 * R) {
            //theta[i] = i * TWO_PI / N;    with  i = myTerm
            var newTerm = ceil(N * rTheta[1] / TWO_PI)%N;
            t0 = millis();
            chordOne(newTerm);
        }
    }
    else {
        chordAll();
    }
}

function cartesToPolar(x, y) {
    var rTheta = [];
    if (x < width / 2) {
        x = (x - (width / 2));
    }
    else {
        x = +(x - (width / 2));
    }
    if (y < height / 2) {
        y = height / 2 - y;
    }
    else {
        y = -(y - height / 2);
    }
    //console.log(floor(x) + " " + floor(y));
    rTheta[0] = sqrt((x * x) + (y * y));
    rTheta[1] = atan2(-y, x);
    if (rTheta[1] < 0) {
        rTheta[1] += TWO_PI;
    }
    //console.log(rTheta);
    return rTheta;
}