// Controls
var autoPlay = true;
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
var hostLoc ="";
var currentLoc="";
var backTerms=[];
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
var zoomPhoto =false;
var about = false;
var aboutText = "<h5>يعني ايه قاموس الثورة؟</h5>" + "<p>     اتكلمنا كتير فى السنين الأخيرة فى مصر وعن طريق الكلام ده اتوصلنا لنوع من اللغة الجديدة. بنستخدم مفردات زى “عيش – حرية – عدالة اجتماعية” للتعبير عن مطالبنا، و بنستخدم مفردات تانية عشان نميز الاحداث المختلفة اللى حصلت.</p><p>" + "اللغة الجديدة اللى طورناها دى، اتاحت لنا اسلوب مشترك نتكلم بيه حوالين موضوع محدد. قاموس الثورة بيجمع المفردات المستخدمة فى اللغة الجديدة وبيطلب منك انك تحاول تعرّف الكلمات، لأن تحت عباية اللغة المشتركة فيه كتير من الأفكار و الآراء المختلفة والدليل على كده ان ممكن شخصين يستخدموا نفس الكلمة و كل واحد فيهم يقصد حاجة مختلفة تماماً.</p>";

function preload() {
   
}

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
    //N = 20;
    N = words.length;
    rndData = Drough;
    //console.log(Drough); 
    R = height / 3.25;
    Cx = (windowWidth * 2.5 / 100) + width / 2;
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
        x[i] = Cx + 1.1 * R * cos(theta[i]);
        y[i] = (height / 2) + 1.1 * R * sin(theta[i]);
        d = rndData; //words[i]['con'];
        //names[i] = "";
        for (var j = 0; j < n[i]; j++) {
            // names[i] += "<p>" + words[i]['ex'][j] + " </p> " ;
        }
    }
    //console.log(d);
    //console.log(namesP);
    stroke(0);
    noFill();
    //console.log(t);
    //chordOne();
    hostLoc = window.location.href;
    console.log(hostLoc);
}

function chordAll() {
    isChordAll = true;
    background(255);
    textSize(12);
    for (var i = 0; i < N; i++) {
        stroke(pal[words[i]['cat'] - 1]);
        //stroke(50);
        noFill();
        //strokeWeight(0.051);
        for (var j = 0; j < N; j++) {
            if (d[i][j] > 0.1) {
                strokeWeight(d[i][j] / 10); // console.log(i + " 
                if (words[i]['cat'] > 0) {
                    bezier(x[i], y[i], Cx, height / 2, Cx, height / 2, x[j], y[j]);
                }
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
        //rect(-0.04 * R, -6, h[i], 5);
        pop();
    }
    //termTextAreaHtml.style("width", "35%");
    termText = ""; // aboutText;
    termTextHtml.html(termText);
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
    thetaEnd[0] = theta[i]; //  = selected old Theta;
    thetaMove[0] = theta[i];
    xNew[0] = x[i]; // = selcted xOld;
    yNew[0] = y[i]; // = selcted yOld;
    strokeNew[0] = color(0);
    incoming[0] = false;
    for (var j = 0; j < N; j++) {
        if ((d[i][j] != 0) || (d[j][i] != 0)) {
            nNew++;
            originalN.push(j);
            incoming.push(true);
            tNew.push(t[j]);
            if (d[i][j] < 3) {
                strokeNew.push(d[i][j]);
            }
            else {
                strokeNew.push(3);
            }
        }
        if (d[j][i] != 0) {
            incoming[nNew - 1] = false;
            if (d[j][i] < 3) {
                strokeNew[nNew - 1] = d[j][i];
            }
            else {
                strokeNew[nNew - 1] = 3;
            }
        }
    }
    backTerms.push(i);
    console.log(backTerms);
}

function chordOneDraw(t, t0, tAnime) {
     // zoom = 1; // map(zoomVal,-3,3,0.5,1.5);
    R1 = map(t - t0, 0, tAnime, R, width / 12);
    W1 = map(t - t0, 0, tAnime, Cx, 1.7 * width / 10);
    H1 = 0.33 * height;
    //map(t-t0, 0, tAnime, height/2, height/3);
    textSize(map(nNew, 1, 26, 13, 10));
    if(nNew>25){
        textSize(9);
    }
    //console.log(nNew);
    //console.log(incoming);
    background(255, map(t - t0, 0, tAnime, 25, 275));
    noFill();
    for (var j = 0; j <= nNew; j++) {
        thetaEnd[j] = (thetaEnd[0] + (j * TWO_PI / nNew)) % (TWO_PI);
        thetaMove[j] = map(t - t0, 0, tAnime, thetaEnd[0], thetaEnd[j]);
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
            // ellipse(0, 0, 4, 4);
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
    if (t - t0 > tAnime - 20) {
        select('#textBox').style("visibility", "visible");
        select('#linkBox').style("visibility", "visible");
        select('#aboutLink').style("visibility", "visible");
        var fileName = "data/txt/"+(originalN[0]+1)+".txt";
        document.getElementById("downLink").href=fileName;
        //console.log(fileName);
        loadStrings(fileName, showTermText);
        showLinks();
        
        if(tNew.length>25){
            select('#zoom-photo').style("visibility", "visible");
            zoomPhoto =  true;
            document.getElementById("zoomInPhoto")
                .src="img/full.png";
        }
        else{
             select('#zoom-photo').style("visibility", "hidden");
            zoomPhoto = false;
        }
    }
    if (t - t0 > tAnime - 5) {
        // Cx = W1;
    }
}

function showTermText(lines) {
    termText = '<p>' + lines.join('</p><p>') + '</p>';
    // termTextAreaHtml.style("width", "55%");
    var txtWidth = 100; //map(zoomVal,-3,3,70,45);
    //termTextAreaHtml.style("width", txtWidth.toString()+"%");
    termTextHtml.html(termText);
    select('#title').html(tNew[0]);
    
}

function showLinks() {
   
    //var linksText = tNew.slice(1, tNew.length).join('<br/>'); 
    var linksText ="";
    
    for(var i=1;i<tNew.length;i++){
        linksText+='<a href="#' +originalN[i]+ '" onClick="listTermClick('+i+')" >'+ tNew[i]+ '</a> <br/>';    
    }
    select('#linkBox').html(linksText);
}

function listTermClick(newTermId){
    about=false;
    var newTerm = newTermId;
        newTerm = originalN[newTerm];
        t0 = millis();
        //console.log(originalN);
        chordOne(newTerm);
}

function previousTerm(){ 
    if (backTerms.length > 1) {
        backTerms.pop();
        var newTerm = backTerms[backTerms.length - 1];
        t0 = millis();
        backTerms.pop();
        chordOne(newTerm);
    }
}

function showAbout() {
    
    about = true;
    var fileName = "data/about.txt";
    loadStrings(fileName, showAboutText);
    select('#title').html('عن القاموس');
    backTerms.push(backTerms[backTerms.length]);
   // document.getElementById("downLink").href="";
    
    
}

function showAboutText(lines) {
    var aboutText = '<p>' + lines.join('') + '</p>';
    termTextHtml.html(aboutText);
};

function draw() {
    
   // console.log(mouseX/width);
    if (document.readyState === "complete" && frameCount > 60 && frameCount < 65) {
        chordAll();
    }
    if (isChordAll) {
        rTheta = cartesToPolar(mouseX, mouseY, width / 2, height / 2, 0);
        if (rTheta[0] > 0.7 * R && rTheta[0] < 2.0 * R) {
            //theta[i] = i * TWO_PI / N;    with  i = myTerm
            push();
            translate(Cx, height / 2);
            noFill();
            stroke(255);
            strokeWeight(6);
            ellipse(0, 0, 1.15 * R, 1.15 * R);
            currentTerm = int(N * rTheta[1] / TWO_PI) % N;
            rotate(theta[currentTerm]);
            translate(1.15 * R, 0);
            fill(0, 100, 100);
            noStroke();
            //noFill();
            ellipse(0, 0, 3, 3);
            pop();
        }
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
            currentTerm = abs(int(originalN.length * rTheta[1] / TWO_PI) % originalN.length);
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
    
    if (!isChordAll && (millis() - t0) < tAnime) {
        chordOneDraw(millis(), t0, tAnime);
    }
    
    //var rTheta = cartesToPolar(mouseX, mouseY,zoom*Cx/2, thetaEnd[0]);
    //  console.log(rTheta[0]);
    //console.log(zoom*Cx/2 + "  " + mouseX);
    //console.log(rTheta[1]*360/TWO_PI);
    /*
    if(!isChordAll && zoomInButton){
        zoomInButton.mousePressed(function(){
            zoomVal++;
            zoomVal=constrain(zoomVal,-3,3);
            console.log("plus");
        })
        zoomOutButton.mousePressed(function(){
            zoomVal--;
            zoomVal=constrain(zoomVal,-3,3);
        })
        if ((millis() - t0) < tAnime){
            isChordAll = false;
           chordOneZoom();
            console.log(zoom);
        }
    }*/
}
var rTheta = 0;
var rThetaPrev = 0;
var currentTerm;

function mouseReleased() {
    if (isChordAll) {
        //theta[i] = i * TWO_PI / N;    with  i = myTerm
        var newTerm = currentTerm;
        t0 = millis();
        chordOne(newTerm);
    }
    else if (!about && !zoomPhoto && mouseY<0.5*height && mouseX<0.39*width) {
        var newTerm = currentTerm;
        newTerm = originalN[newTerm];
        t0 = millis();
        console.log(originalN);
        chordOne(newTerm);
    }
    
    //console.log(rTheta[1]);
    //newTerm=originalN[newTerm];
    //    document.getElementById('infoButton').addEventListener('click', function () {
    //        
    //        termTextAreaHtml.style("width", "38%");
    //        termText = aboutText;
    //        termTextHtml.html(termText);    
    //   });
}

function whichTheta(mouseTheta, compareTheta) {}

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