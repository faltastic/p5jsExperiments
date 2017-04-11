var isChordAll = true;
// fixed variables for data
var N;
var n = []
    , h = []
    , t = [];
var Cx;
var W1, H1, R1; // dims of small diagram
var d = [];
var rndData = [];
var names = [];
var theta = []
    , x = []
    , y = [];
var R;
////
// temp. variables
var hostLoc = "";
var loadId = 0;
var backTerms = [];
var namesP;
var fontAR;
var pal = [];
var t0 = 0;
var tAnime = 1000;
var nFrames = 0;
var totalFrames = 50;
var termText;
var termTextAreaHtml;
var termTextHtml; // html element for term text
var zoomPhoto = false;
var about = false;
var aboutText = "";

function preload() {}

function setup() {
    var myCanvas = createCanvas( 0.95*windowWidth,  0.97*(windowHeight-32));
    myCanvas.parent("chordEN");
    //frameRate(2);
    //rectMode(CORNERS);
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);

    textSize(12);
    textFont('Alegreya');
    pal = [color(74, 139, 115, 175), color(37, 93, 108, 175), color(92, 93, 136, 175), color(59, 137, 201, 175)];
    // prepare data
    N = words.length;
    d = Drough;
    //console.log(Drough);
    R = height / 4;
    Cx = 1.05*width/2;
    for (var i = 0; i < N; i++) {
        t[i] = words[i]['English'];
        theta[i] = i * TWO_PI / N;
        x[i] = Cx + 1.1 * R * cos(theta[i]);
        y[i] = (height / 2) + 1.1 * R * sin(theta[i]);
    }
    stroke(0);
    noFill();
    hostLoc = window.location.href;
    if (hostLoc.indexOf('#') > 0) {
        if (hostLoc.indexOf('about') > 0) {
            loadId = 126;
        }
        else {
            loadId = parseInt(hostLoc.substring(hostLoc.indexOf('#') + 1));
        }
        console.log(loadId);
        hostLoc = hostLoc.substring(0, hostLoc.indexOf('#'));
        console.log(hostLoc);
    }
    else {
        loadId = -1;
    }
}
var opac = 175;

function chordAll() {
    isChordAll = true;

    background(255);
    textSize(12);
    pal = [color(74, 139, 115, opac), color(37, 93, 108, opac), color(92, 93, 136, opac), color(59, 137, 201, opac)];
    dThetaN = TWO_PI / (2 * N);
    noFill();
    for (var i = 0; i < N; i++) {
        stroke(pal[words[i]['cat'] - 1]);
        for (var j = 0; j < N; j++) {
            if (d[i][j] > 2) {
                strokeWeight(d[i][j] / 25); // console.log(i + "
                bezier(x[i], y[i], Cx, height / 2, Cx, height / 2, x[j], y[j]);
            }
        }
        push();
        noStroke();
        fill(0);
        translate(Cx, height / 2);
        rotate(theta[i]);
        translate(1.2 * R, 0);
        textAlign(LEFT, CENTER);
        if (i > floor(N / 4) && i < floor(3 * N / 4)) {
            //translate(0, 2);
            rotate(PI);
            textAlign(RIGHT, CENTER);
        }
        text(t[i], 0, 0);
        pop();
        push();
        translate(Cx, height / 2);
        rotate(theta[i]);
        translate(1.12 * R, 0);
        fill(pal[words[i]['cat'] - 1], 10);
        strokeWeight(1.5);
        noStroke();
        pop();
    }
}

function chordAllSelect() {
    rTheta = cartesToPolar(mouseX, mouseY, Cx, height / 2, 0);
    if (rTheta[0] > 0.3 * R && rTheta[0] < 2.0 * R) {
        //theta[i] = i * TWO_PI / N;    with  i = myTerm
        currentTerm = int(N * (dThetaN + rTheta[1]) / TWO_PI) % N;
        opac = 0; // 175/5;
    }
    else {
        currentTerm = null;
        opac = 175;
    }
    chordAll();
    if (currentTerm != null) {
        var hoverTerm = currentTerm;
        var maxCo = max(d[hoverTerm]);
        stroke(30);
        pal = [color(74, 139, 115), color(37, 93, 108), color(92, 93, 136), color(59, 137, 201)];
        stroke(pal[words[hoverTerm]['cat'] - 1]);
        for (var j = 0; j < N; j++) {
            if (d[hoverTerm][j]) {
                if (d[hoverTerm][j] < maxCo / 2 || maxCo < 6) {
                    strokeWeight(2);
                }
                else {
                    strokeWeight(4);
                }
                bezier(x[hoverTerm], y[hoverTerm], Cx, height / 2, Cx, height / 2, x[j], y[j]);
            }
        }
        push();
        noStroke();
        fill(0);
        translate(Cx, height / 2);
        rotate(theta[hoverTerm]);
        translate(1.2 * R, 0);
        textAlign(LEFT, CENTER);
        if (hoverTerm > floor(N / 4) && hoverTerm < floor(3 * N / 4)) {
            //translate(0, 2);
            rotate(PI);
            textAlign(RIGHT, CENTER);
        }
        fill(255);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        fill(0);
        textFont('AlegreyaBold');
        text(t[hoverTerm], 0, 0);
        pop();
        push();
        fill(0);
        translate(Cx, height / 2);
        rotate(theta[hoverTerm]);
        translate(1.15 * R, 0);
        fill(0);
        stroke(0);
        ellipse(0, 0, 1.5, 1.5);
        pop();
    }
}
var incoming = [];
var nNew = 1;
var thetaEnd = [];
thetaEnd[0] = 0;
var thetaMove = [];
var xNew = [];
var yNew = [];
var tNew = []; //var tNewLink =[];
var strokeNew = [];
var strokeOut;
var strokeIn;
var originalN = [];
var dThetaN;

function draw() {
    // console.log(mouseX/width);
    if (document.readyState === "complete" && frameCount < 45) {
        chordAll();
    }
}

function mouseMoved() {
    if (isChordAll && frameCount > 65) {
        chordAllSelect();
    }
}
var rTheta = 0;
var rThetaPrev = 0;
var currentTerm;

function mouseReleased() {
}

function cartesToPolar(x, y, xOff, yOff, thetaStart) {
    var rTheta = [];
    if (x < xOff) {
        x = x - xOff;
    }
    else {
        x = x - xOff;
    }
    if (y < yOff) {
        y = yOff - y;
    }
    else {
        y = -(y - yOff);
    }
    //console.log(floor(x) + " " + floor(y));
    rTheta[0] = sqrt((x * x) + (y * y));
    rTheta[1] = (atan2(-y, x) - thetaStart) % TWO_PI;
    if (rTheta[1] < 0) {
        rTheta[1] += TWO_PI;
    }
    else if (rTheta[1] > TWO_PI) {
        rTheta[1] -= TWO_PI;
    }
    return rTheta;
}
