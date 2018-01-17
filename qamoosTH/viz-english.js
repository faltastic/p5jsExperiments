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
var nFrames = 0;
var totalFrames = 50;
var termText;
var termTextAreaHtml;
var termTextHtml; // html element for term text
var zoomPhoto = false;
var about = false;
var aboutText = "";
var myCanvas;


function setup() {
    myCanvas = createCanvas(0.97 * windowWidth, 0.97 * windowHeight);
    myCanvas.parent("theCanvas");
    // HTML elements
    termTextHtml = select('#termText');
    termTextAreaHtml = select('#termTextArea');
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);
    //textAlign(LEFT, CENTER);
    textSize(12);
    textFont('OswaldLight');
    pal = [color(74, 139, 115, 175), color(37, 93, 108, 175), color(92, 93, 136, 175), color(59, 137, 201, 175)];
    // prepare data
    N = words.length;
    d = Drough;
    //console.log(Drough);
    R = height / 3.5;
    Cx = (windowWidth * 2.5 / 100) + width / 2;
    for (var i = 0; i < N; i++) {
        //words[i]['term'] = words[i]['term'].trim();
        t[i] = words[i]['English'];
        t[i] = t[i].charAt(0).toUpperCase() + t[i].slice(1);
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
        hostLoc = hostLoc.substring(0, hostLoc.indexOf('#'));
    }
    else {
        loadId = -1;
    }
}
var opac = 175;

function chordAll() {
    isChordAll = true;
    select('#englishLink').style("visibility", "visible");
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
            translate(0,2);
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
            translate(0,2);
            rotate(PI);
            textAlign(RIGHT, CENTER);
        }
        fill(255);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        fill(0);
        textFont('Oswald');
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
var barWidth;

function chordOne(newTerm) {
    isChordAll = false;
    nFrames = 0;
    select('#englishLink').style("visibility", "hidden");
    var i = newTerm; //floor(random(N));
    incoming = [];
    nNew = 1;
    thetaEnd = [];
    thetaMove = [];
    xNew = [];
    yNew = [];
    tNew = [];
    strokeNew = [];
    strokeOut = color(0, 100, 100);
    strokeIn = color(0, 100, 100);
    originalN = [];
    originalN[0] = i;
    tNew[0] = t[i]; // wont be used
    thetaEnd[0] = PI; //theta[i]; //  = selected old Theta;
    thetaMove[0] = theta[i];
    xNew[0] = x[i]; // = selcted xOld;
    yNew[0] = y[i]; // = selcted yOld;
    strokeNew[0] = color(0);
    incoming[0] = false;
    var maxCo = max(d[i]);
    for (var j = 0; j < N; j++) {
        if (d[i][j] != 0) {
            nNew++;
            originalN.push(j);
            incoming.push(true);
            tNew.push(t[j]);
            strokeNew.push(map(d[i][j], 1, maxCo, 1, 4));
        }

    }
    R1 = width / 12;
    W1 = 0.833*width; // 1.75 * width / 10;
    H1 = 0.33 * height;
    dThetaN = TWO_PI / (2 * originalN.length);
    backTerms.push(i);

}

function chordOneDraw() {
    if (nFrames < totalFrames) {
        textSize(map(nNew, 1, 26, 13, 10));
        if (nNew > 25) {
            textSize(9);
        }
        textFont('OswaldLight');
        background(255);
        noFill();
        for (var j = 0; j < nNew; j++) {
            thetaEnd[j] = (thetaEnd[0] - (j * TWO_PI / nNew)) % (TWO_PI);
            //thetaMove[j] = map(t - t0, 0, tAnime, 0, thetaEnd[j]);
            thetaMove[j] = map(nFrames, 0, totalFrames, PI, thetaEnd[j]);
            if (nFrames + 3 > totalFrames) {
                // make sure thetas end up perfect
                thetaMove[j] = thetaEnd[j];
            }
            xNew[j] = W1 + R1 * cos(thetaMove[j]);
            yNew[j] = H1 + R1 * sin(thetaMove[j]);
            strokeWeight(strokeNew[j]);
            if (incoming[j]) {
                stroke(strokeIn);
            }
            else {
                stroke(strokeOut);
            }
            // stroke(strokeOut);
            if (j>0){
                bezier(xNew[0], yNew[0], W1, H1, W1, H1, xNew[j], yNew[j]);
            }
        }
        for (var j = 0; j < nNew; j++) {
            push();
            noStroke();
            translate(W1, H1);
            rotate(thetaMove[j]);
            translate(1.1 * R1, 0);
            if (j == 0) {
                fill(strokeOut);
                ellipse(0, 0, 4, 4);
            }
            fill(0);
            translate(0.1 * R1, 0);
            textAlign(LEFT, CENTER);
            if (thetaMove[j] > (TWO_PI / 4) && thetaMove[j] < (3 * TWO_PI / 4)) {
                translate(0, 2);
                rotate(PI);
                textAlign(RIGHT, CENTER);
            }
            text(tNew[j], 0, 0);
            pop();
        }
        if (nFrames + 3 > totalFrames) {
            window.location.replace(hostLoc + "#" + originalN[0]);
            select('#textBox').style("visibility", "visible");
            select('#linkBox').style("visibility", "visible");
            select('#aboutLink').style("visibility", "visible");
            var fileName = "data/txt/en/" + (originalN[0] + 1) + ".txt";
            // var pdfFileName = "data/pdfs/" + (originalN[0] + 1) + ".pdf";
            // document.getElementById("downLink").href = pdfFileName;
            //console.log(fileName);
            loadStrings(fileName, showTermText);
            showLinks();


                select('#zoom-photo').style("visibility", "visible");
                zoomPhoto = true;
                document.getElementById("zoomInPhoto").src = "img/graphs/graph" + (originalN[0] + 1) + ".png";

//            if (tNew.length > 10){
//                document.getElementById("linkBox").style.marginRight ="0px";
//            }
//            else{
//                document.getElementById("linkBox").style.marginRight = barWidth +"px";
//            }
        }
        nFrames++;
    }
}


function showTermText(lines) {
    termText = '<p>' + lines.join('</p><p>') + '</p>';
    // termTextAreaHtml.style("width", "55%");
    var txtWidth = 100; //map(zoomVal,-3,3,70,45);
    //termTextAreaHtml.style("width", txtWidth.toString()+"%");
    termTextHtml.html(termText);
    document.getElementById("termTextArea").scrollTop = 0;
    select('#title').html(tNew[0]);
}

function showLinks() {
    //var linksText = tNew.slice(1, tNew.length).join('<br/>');
    var linksText = "";
    for (var i = 1; i < tNew.length; i++) {
        linksText += '<a href="#' + originalN[i] + '" onClick="listTermClick(' + i + ')" >' + tNew[i] + '</a> <br/>';
    }
    select('#linkBox').html(linksText);
    document.getElementById("linkBox").scrollTop = 0;
}

function listTermClick(newTermId) {
    var newTerm = newTermId;
    if (about) {
        // backTerms.pop();
        cancelAbout();
    }
    else {
        newTerm = originalN[newTerm];
    }
    nFrames=0;
    //console.log(originalN);
    chordOne(newTerm);
}

function previousTerm() {
    if (about) {
        cancelAbout();
    }
    if (backTerms.length > 1) {
        backTerms.pop();
        var newTerm = backTerms[backTerms.length - 1];
        nFrames=0;
        backTerms.pop();
        chordOne(newTerm);
    }
}

function cancelAbout() {
    about = false;
    document.getElementById("linkBox").style.maxHeight = "33vh";
    select('#theCanvas').style("visibility", "visible");
    select('#listTitle').style("visibility", "hidden");
  //select('#downLink').style("visibility", "visible");
}

function showAbout() {
    about = true;
    window.location.replace(hostLoc + "#about");
    var fileName = "data/about-Eng.txt";
    loadStrings(fileName, showAboutText);
    var aboutTitle = "About";
    aboutTitle += "&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.facebook.com/RevolutionDictionary/' target ='_blank'> <img src='icns/facebook-4-24.png' /></a> &nbsp; <a href='https://twitter.com/qamosalthawra' target ='_blank'> <img src='icns/twitter-4-24.png' /></a> &nbsp; <a href='https://soundcloud.com/qamos-al-thawra' target ='_blank'> <img src='icns/soundcloud-4-24.png' /></a>";
    select('#title').html(aboutTitle);
    document.getElementById("linkBox").style.maxHeight = "75vh";
    var linksText = "";
    for (var i = 0; i < N; i++) {
        linksText += '<a href="#' + i + '" onClick="listTermClick(' + i + ')" >' + t[i] + '</a> <br/>';
    }
    select('#linkBox').html(linksText);
    select('#theCanvas').style("visibility", "hidden");
    select('#listTitle').style("visibility", "visible");
    select('#zoom-photo').style("visibility", "hidden");
    //select('#downLink').style("visibility", "hidden");
    //document.getElementsByClassName("modal").style.Background="#000";
    zoomPhoto = false;
}

function showAboutText(lines) {
    var aboutText = '<p>' + lines.join('') + '</p>';
    termTextHtml.html(aboutText);
    document.getElementById("termTextArea").scrollTop = 0;
};

function draw() {

    if (document.readyState === "complete" && frameCount > 60 && frameCount < 65) {
        chordAll();
    }
    if (loadId >= 0 && frameCount > 120) {
        loadIdWorkAround();
    }
    if (!isChordAll && nFrames < totalFrames) {
        chordOneDraw();
    }
}

function mouseMoved() {
    if (isChordAll && frameCount > 65) {
        chordAllSelect();
    }
    else {
        rTheta = cartesToPolar(mouseX, mouseY, W1, H1, thetaEnd[0]);
        if (rTheta[0] < 1.33 * R1) {
            push();
            translate(W1, H1);
            noFill();
            stroke(255);
            strokeWeight(6);
            ellipse(0, 0, 1.1 * R1, 1.1 * R1);
            currentTerm = abs(int(originalN.length * (rTheta[1] -TWO_PI) / TWO_PI) % originalN.length);
            //ceil(N * rTheta[1] / TWO_PI) % N;
            //console.log(currentTerm);
            //
            rotate(thetaEnd[0]);
            translate(1.1 * R1, 0);
            stroke(0, 100, 100);
            strokeWeight(1.0);
            ellipse(0, 0, 3, 3);
            pop();
            push();
            translate(W1, H1);
            rotate(thetaEnd[currentTerm]);
            translate(1.1 * R1, 0);
            fill(0, 100, 100);
            noStroke();
            //noFill();
            ellipse(0, 0, 2, 2);
            pop();
        }
    }
}
var rTheta = 0;
var rThetaPrev = 0;
var currentTerm;

function mouseReleased() {
    var clickChord = false;
    if (rTheta[0] < 1.5 * R1) {
        if (!about && !zoomPhoto) {
            clickChord = true;
        }
        if (zoomPhoto && rTheta[0] > 0.5 * R1) {
            clickChord = true;
        }
    }
    if (isChordAll && currentTerm != null) {
        var newTerm = currentTerm;
        nFrames =0;
        chordOne(newTerm);
    }
    else if (clickChord) {
        var newTerm = currentTerm;
        newTerm = originalN[newTerm];
        nFrames = 0;
        //console.log(originalN);
        chordOne(newTerm);
    }
}

function loadIdWorkAround() {
    if (loadId < 125) {
        var newTerm = loadId;
        nFrames=0;
        chordOne(newTerm);
        loadId = -1;
    }
    else if (loadId == 126) {
        nFrames=0;
        chordOne(0);
        loadId++;
    }
    else {
        loadId++;
        if (loadId > 200) {
            showAbout();
            loadId = -1;
        }
    }
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

/*
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

}
*/
