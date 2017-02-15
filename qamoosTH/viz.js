
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
var bell;
var muteIcn, playIcn;
////
// temp. variables
var hostLoc = "";
var loadId = 0;
var backTerms = [];
var namesP;
var vol = 0
    , soundOn = true;
var fontAR;
var pal = [];
var t0 = 0;
var tAnime = 600;
var termText;
var termTextAreaHtml;
var termTextHtml; // html element for term text
var infoButton; // 
var chordSize = 30;
var zoomPhoto = false;
var about = false;
var aboutText = "<h5>يعني ايه قاموس الثورة؟</h5>" + "<p>     اتكلمنا كتير فى السنين الأخيرة فى مصر وعن طريق الكلام ده اتوصلنا لنوع من اللغة الجديدة. بنستخدم مفردات زى “عيش – حرية – عدالة اجتماعية” للتعبير عن مطالبنا، و بنستخدم مفردات تانية عشان نميز الاحداث المختلفة اللى حصلت.</p><p>" + "اللغة الجديدة اللى طورناها دى، اتاحت لنا اسلوب مشترك نتكلم بيه حوالين موضوع محدد. قاموس الثورة بيجمع المفردات المستخدمة فى اللغة الجديدة وبيطلب منك انك تحاول تعرّف الكلمات، لأن تحت عباية اللغة المشتركة فيه كتير من الأفكار و الآراء المختلفة والدليل على كده ان ممكن شخصين يستخدموا نفس الكلمة و كل واحد فيهم يقصد حاجة مختلفة تماماً.</p>";

function preload() {}

function setup() {
    var myCanvas = createCanvas(0.97 * windowWidth, 0.97 * windowHeight);
    myCanvas.parent("theCanvas");
    // HTML elements
    termTextHtml = select('#termText');
    termTextAreaHtml = select('#termTextArea');
    //frameRate(2);
    //rectMode(CORNERS);
    ellipseMode(RADIUS);
    smooth();
    strokeWeight(1);
    textAlign(LEFT);
    textSize(12);
    textFont('NotoKufi');
    pal = [color(74, 139, 115, 175), color(37, 93, 108, 175), color(92, 93, 136, 175), color(59, 137, 201, 175)];
    // prepare data
    N = words.length;
    d = Drough;
    //console.log(Drough); 
    R = height / 3.25;
    Cx = (windowWidth * 2.5 / 100) + width / 2;
   
   
    for (var i = 0; i < N; i++) {
        t[i] = words[i]['term'];
        theta[i] = i * TWO_PI / N;
        x[i] = Cx + 1.1 * R * cos(theta[i]);
        y[i] = (height / 2) + 1.1 * R * sin(theta[i]);
       
    }
    stroke(0);
    noFill();
    hostLoc = window.location.href; 
    if(hostLoc.indexOf('#') > 0 ){
        if(hostLoc.indexOf('about') > 0){
            loadId = 126;
        }
        else{
        loadId = parseInt(hostLoc.substring(hostLoc.indexOf('#')+1));
        }
        console.log(loadId);
        hostLoc = hostLoc.substring(0,hostLoc.indexOf('#'));
        console.log(hostLoc);
    }
    else{ loadId=-1;}
}

var opac =175;
function chordAll() {
    isChordAll = true;
    background(255);
    textSize(12);
     pal = [color(74, 139, 115, opac), color(37, 93, 108, opac), color(92, 93, 136, opac), color(59, 137, 201, opac)];
    dThetaN = TWO_PI/(2*N);
    for (var i = 0; i < N; i++) {
        stroke(pal[words[i]['cat'] - 1]);
        noFill();
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
        textAlign(LEFT);
        if (i > floor(N / 4) && i < floor(3 * N / 4)) {
            translate(0, -6);
            rotate(PI);
            textAlign(RIGHT);
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
    rTheta = cartesToPolar(mouseX, mouseY, width / 2, height / 2, 0);
    if (rTheta[0] > 0.3 * R && rTheta[0] < 2.0 * R) {
        //theta[i] = i * TWO_PI / N;    with  i = myTerm
        currentTerm = int(N * (dThetaN + rTheta[1]) / TWO_PI) % N;
        opac = 175/3;
    }
    else{ currentTerm = null; opac =175;}
   
    chordAll();
    if (currentTerm !=null) {
        var hoverTerm = currentTerm;
        var maxCo = max(d[hoverTerm]);
       // console.log(maxCo);
        for (var j = 0; j < N; j++) {
            if (d[hoverTerm][j] !=0) {
                stroke(30);
                strokeWeight(map(d[hoverTerm][j],1,maxCo, 1.5,4));
                //strokeWeight(2);
                bezier(x[hoverTerm], y[hoverTerm], Cx, height / 2, Cx, height / 2, x[j], y[j]);
            }
        }
        push();
        noStroke();
        fill(0);
        translate(Cx, height / 2);
        rotate(theta[hoverTerm]);
        translate(1.2 * R, 0);
        textAlign(LEFT);
        if (hoverTerm > floor(N / 4) && hoverTerm < floor(3 * N / 4)) {
            translate(0, -6);
            rotate(PI);
            textAlign(RIGHT);
        }
        fill(255);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        text(t[hoverTerm], 0, 0);
        fill(0);
        textFont('NotoKufiBold');
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
    strokeOut = color(0, 100, 100); //color(39,97,105);//color(13,181,203);//,color(39,97,105, 175), color(0,223,252, 175),color(26,139,154, 175)//color(175); // pal[words[i]['cat'] - 1];
    strokeIn = color(0, 100, 100);
    //color(39,97,105);//color(0);//color(39,97,105); //
    originalN = [];
    originalN[0] = i;
    tNew[0] = t[i]; // wont be used
    thetaEnd[0] = 0; //theta[i]; //  = selected old Theta;
    thetaMove[0] = theta[i];
    xNew[0] = x[i]; // = selcted xOld;
    yNew[0] = y[i]; // = selcted yOld;
    strokeNew[0] = color(0);
    incoming[0] = false;
    var maxCo = max(d[i]);
    for (var j = 0; j < N; j++) {
        
        if (d[i][j] != 0 ) {
            nNew++;
            originalN.push(j);
            incoming.push(true);
            tNew.push(t[j]);
            strokeNew.push(map(d[i][j],1,maxCo, 1,4));
        }
        /*
        if (d[j][i] != 0) {
            incoming[nNew - 1] = false;
            if (d[j][i] < 3) {
                strokeNew[nNew - 1] = d[j][i];
            }
            else {
                strokeNew[nNew - 1] = 3;
            }
        }*/
    }
    dThetaN = TWO_PI/(2*originalN.length);
    backTerms.push(i);
}

function chordOneDraw(t, t0, tAnime) {
    // zoom = 1; // map(zoomVal,-3,3,0.5,1.5);
    R1 = width/12; //map(t - t0, 0, tAnime, R, width / 12);
    W1 =1.7 * width / 10 ; // map(t - t0, 0, tAnime, Cx, 1.7 * width / 10);
    H1 = 0.33 * height;
    //map(t-t0, 0, tAnime, height/2, height/3);
    textSize(map(nNew, 1, 26, 13, 10));
    if (nNew > 25) {
        textSize(9);
    }
    //console.log(nNew);
    //console.log(incoming);
    background(255, map(t - t0, 0, tAnime, 25, 255));
   // background(255);
    noFill();
    for (var j = 0; j < nNew; j++) {
        thetaEnd[j] = (thetaEnd[0] + (j * TWO_PI / nNew)) % (TWO_PI);
        thetaMove[j] = map(t - t0, 0, tAnime, 0, thetaEnd[j]);
        if( t-t0 > tAnime/1.1){
            // make sure thetas end up perfect
            thetaMove[j]  = thetaEnd[j];
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
        bezier(xNew[0], yNew[0], W1, H1, W1, H1, xNew[j], yNew[j]);
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
        textAlign(LEFT);
        if (thetaMove[j] > (TWO_PI / 4) && thetaMove[j] < (3 * TWO_PI / 4)) {
            translate(0, 0);
            rotate(PI);
            textAlign(RIGHT);
        }
        text(tNew[j], 0, 0);
        pop();
    }
    if (t - t0 > tAnime - 20) {
        window.location.replace(hostLoc+"#"+originalN[0]);
        select('#textBox').style("visibility", "visible");
        select('#linkBox').style("visibility", "visible");
        select('#aboutLink').style("visibility", "visible");
        var fileName = "data/txt/" + (originalN[0] + 1) + ".txt";
        document.getElementById("downLink").href = fileName;
        //console.log(fileName);
        loadStrings(fileName, showTermText);
        showLinks();
        if (tNew.length > 25) {
            select('#zoom-photo').style("visibility", "visible");
            zoomPhoto = true;
            document.getElementById("zoomInPhoto").src = "img/full.png";
        }
        else {
            select('#zoom-photo').style("visibility", "hidden");
            zoomPhoto = false;
        }
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
    t0 = millis();
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
        t0 = millis();
        backTerms.pop();
        chordOne(newTerm);
    }
}

function cancelAbout() {
    about = false;
    document.getElementById("linkBox").style.maxHeight = "30vh";
    select('#theCanvas').style("visibility", "visible");
    select('#listTitle').style("visibility", "hidden");
    select('#downLink').style("visibility", "visible");
}

function showAbout() {
    about = true;
    window.location.replace(hostLoc+"#about");
    var fileName = "data/about.txt";
    loadStrings(fileName, showAboutText);
    var aboutTitle = "عن القاموس";
    select('#title').html(aboutTitle);
    document.getElementById("linkBox").style.maxHeight = "70vh";
    var linksText = "";
    for (var i = 0; i < N; i++) {
        linksText += '<a href="#' + i + '" onClick="listTermClick(' + i + ')" >' + t[i] + '</a> <br/>';
    }
    select('#linkBox').html(linksText);
    select('#theCanvas').style("visibility", "hidden");
    select('#listTitle').style("visibility", "visible");
    select('#zoom-photo').style("visibility", "hidden");
    select('#downLink').style("visibility", "hidden");
    zoomPhoto = false;
}

function showAboutText(lines) {
    var aboutText = '<p>' + lines.join('') + '</p>';
    termTextHtml.html(aboutText);
    document.getElementById("termTextArea").scrollTop = 0;
};

function draw() {
    // console.log(mouseX/width);
    if (document.readyState === "complete" && frameCount > 60 && frameCount < 65) {
        chordAll();
       
    }
    if(loadId>=0 && frameCount > 120 ){
     loadIdWorkAround();
    }
    if (!isChordAll && (millis() - t0) < tAnime) {
        chordOneDraw(millis(), t0, tAnime);
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
            currentTerm = abs(int(originalN.length * (dThetaN + rTheta[1]) / TWO_PI) % originalN.length);
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
    if (isChordAll) {
        //theta[i] = i * TWO_PI / N;    with  i = myTerm
        var newTerm = currentTerm;
        t0 = millis();
        chordOne(newTerm);
    }
    else if (clickChord) {
        var newTerm = currentTerm;
        newTerm = originalN[newTerm];
        t0 = millis();
        //console.log(originalN);
        chordOne(newTerm);
    }
   
}

function loadIdWorkAround(){
      if(loadId<125){
        var newTerm = loadId;
        t0 = millis();
        chordOne(newTerm);
        loadId=-1;
       }
        else if(loadId==126){
        t0 = millis();
        chordOne(0);
        loadId++;
        }
        else{
        loadId++;
        if(loadId>200) {showAbout();loadId=-1;}
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

function chordOneZoom(t, t0, tAnime) {
    zoom = map(zoomVal,-3,3,0.5,1.5);
    var txtWidth = map(zoomVal,-3,3,75,45);
    termTextAreaHtml.style("width", txtWidth.toString()+"%");
    var R1 = map(t - t0, 0, tAnime, R, zoom*R/1.5);
    var W1 = map(t - t0, 0, tAnime, Cx, zoom*Cx/1.75);
    var H1 = height / 2;
    //map(t-t0, 0, tAnime, height/2, height/3);
    textSize(map(nNew, 1, 50, 16, 12));
    //console.log(nNew);
    //console.log(incoming);
    background(255, map(t - t0, 0, tAnime, 25, 275));
    noFill();
    for (var j = 0; j <= nNew; j++) {
        thetaEnd[j] = (thetaEnd[0] + (j * TWO_PI / nNew)) % (TWO_PI);
        thetaMove[j] = thetaEnd[j];
        xNew[j] = W1 + R1 * cos(thetaMove[j]);
        yNew[j] = H1 + R1 * sin(thetaMove[j]);
        //console.log(thetaEnd[j]);
        strokeWeight(strokeNew[j]);
        if (incoming[j]) {
            stroke(strokeIn);
        }
        else {
            stroke(strokeOut);
        }
        // stroke(strokeOut);
        bezier(xNew[0], yNew[0], W1, H1, W1, H1, xNew[j], yNew[j]);
    }
    for (var j = 0; j < nNew; j++) {
        push();
        noStroke();
        fill(0);
        translate(W1, H1);
        rotate(thetaMove[j]);
        translate(1.1 * R1, 0);
        if (j == 0) {
            ellipse(0, 0, 4, 4);
        }
        translate(0.1 * R1, 0);
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
  
}
*/