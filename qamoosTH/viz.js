// Controls
var autoPlay = true;
var isChordAll = true;
// fixed variables for data
var N;
var n = []
    , h = []
    , t = [];
var Cx;
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
var tAnime = 600;
var termText;
var termTextAreaHtml; 
var termTextHtml; // html element for term text
var infoButton; // 


var aboutText = "<h5>يعني ايه قاموس الثورة؟</h5>"+ "<p>     اتكلمنا كتير فى السنين الأخيرة فى مصر وعن طريق الكلام ده اتوصلنا لنوع من اللغة الجديدة. بنستخدم مفردات زى “عيش – حرية – عدالة اجتماعية” للتعبير عن مطالبنا، و بنستخدم مفردات تانية عشان نميز الاحداث المختلفة اللى حصلت.</p><p>"+"اللغة الجديدة اللى طورناها دى، اتاحت لنا اسلوب مشترك نتكلم بيه حوالين موضوع محدد. قاموس الثورة بيجمع المفردات المستخدمة فى اللغة الجديدة وبيطلب منك انك تحاول تعرّف الكلمات، لأن تحت عباية اللغة المشتركة فيه كتير من الأفكار و الآراء المختلفة والدليل على كده ان ممكن شخصين يستخدموا نفس الكلمة و كل واحد فيهم يقصد حاجة مختلفة تماماً.</p>";

function preload() {
    //fontAR= loadFont('./css/fonts/DroidNaskh-Regular.ttf');
    /*
    bell = createAudio('sound/SD.wav');

    playIcn = loadImage("icns/play.png");
    muteIcn = loadImage("icns/mute.png");
    */
}

function setup() {
    var myCanvas = createCanvas(windowWidth, 1.05 * windowHeight);
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
    textFont('CairoReg');
    pal = [color(74, 139, 115, 175), color(37, 93, 108, 175), color(92, 93, 136, 175), color(59, 137, 201, 175)];
    // prepare data
    //N = 20;
    N = words.length;
    
    rndData = Drough;
    //console.log(Drough); 
    R = height / 3.25;
    Cx = width / 2.5;
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
        x[i] = Cx + R * cos(theta[i]);
        y[i] = (height / 2) + R * sin(theta[i]);
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
    chordAll();
    //chordOne();
    
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
                    bezier(x[i], y[i], 
                        Cx, height / 2, Cx, height / 2, x[j], y[j]);
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
        rect(-0.04 * R, -6, h[i], 5);
        pop();
    }
    termTextAreaHtml.style("width", "35%");
    termText = aboutText;
    //termTextHtml.html(termText);
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
            if (d[i][j] < 6) {
                strokeNew.push(d[i][j]);
            }
            else {
                strokeNew.push(6);
            }
        }
        if (d[j][i] != 0) {
            incoming[nNew - 1] = false;
            if (d[j][i] < 6) {
                strokeNew[nNew - 1] = d[j][i];
            }
            else {
                strokeNew[nNew - 1] = 6;
            }
        }
    }
}

function chordOneDraw(t, t0, tAnime) {
    var R1 = map(t - t0, 0, tAnime, R, height / 4.0);
    var W1 = map(t - t0, 0, tAnime, Cx, width / 3);
    var H1 = height / 2;
    //map(t-t0, 0, tAnime, height/2, height/3);
    textSize(map(nNew, 1, 50, 16, 12));
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
    var fileName = "data/1.txt";
    loadStrings(fileName, showTermText);
}

function showTermText(lines) {
   
    termText = '<p>' + lines.join('</p><p>') + '</p>';
    termTextAreaHtml.style("width", "45%");
    termTextHtml.html(termText);
  
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

function draw() {
    if(frameCount<3){
        $("#termText").typed({strings: [aboutText] });
    }
    if (!isChordAll && (millis() - t0) < tAnime) {
        chordOneDraw(millis(), t0, tAnime);
    }
   
}

function mouseReleased() {
    
    var rTheta = cartesToPolar(mouseX, mouseY);
    if (isChordAll) {
        
        if (rTheta[0] > 0.85 * R && rTheta[0] < 1.5 * R) {
            //theta[i] = i * TWO_PI / N;    with  i = myTerm
            var newTerm = ceil(N * rTheta[1] / TWO_PI) % N;
            t0 = millis();
            chordOne(newTerm);
        }
    }
    else {
        chordAll();
    }
    document.getElementById('infoButton').addEventListener('click', function () {
        
        termTextAreaHtml.style("width", "38%");
        termText = aboutText;
        termTextHtml.html(termText);
       

    });
}

function cartesToPolar(x, y) {
    var rTheta = [];
    if (x < width / 2) {
        x = (x - Cx);
    }
    else {
        x = +(x - Cx);
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