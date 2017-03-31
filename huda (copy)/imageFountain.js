var of;
var littleImg;
var eyes = [];
var w1 = 50;
var noiseX, noiseY, noffx, noffy;

function preload() {
    kaz = loadImage("img/kazoza.png");
    for (var i = 1; i < 9; i++) {
        var eye = loadImage("img/eyes/eye" + i + ".png");
        eyes[i - 1] = eye;
    }
} // end preload
function ftext(fountain, particle) {
    stroke(fountain.colors[Math.floor(particle.life * fountain.colors.length)]);
    noFill();
    textSize(particle.partSize);
    text(s[particle.id % 26], particle.location.x, particle.location.y);
}

function xfimage(fountain, particle) {
    //var i = Math.floor(particle.life*fountain.colors.length);
    //var c = fountain.colors[i];
    //if (c.rgba[3]==0) return;
    //var img = littleImg; //fountain.f.image;
    /*if (c.rgba[3]!=255 || c.rgba[1]!=255 || c.rgba[2]!=255 || c.rgba[0]!=255)
     img = imagetint(this, img, i, c);
     noStroke();
     if (particle.rotation==0 && particle.partSize == 1) {
       image(img, particle.location.x, particle.location.y);
       noTint();
       return;
     }
     */
    var xx = particle.location.x + noiseX;
    var yy = particle.location.y + noiseY;
    push();
    translate(xx, yy);
    //rotate(particle.rotation);
    scale(particle.partSize / 100);
    image(kaz, 0, 0);
    //tint(175,100);
    image(eyes[particle.id % 7], 0, 0);
    pop();
    noTint();
}

function setup() {
    //createCanvas(400, 400);
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("myBanner");
    frameRate(24);
    littleImg = loadImage("img/eyes/eye1.png");
    noiseX = 0;
    noiseY = 0; //height/2;
    noffx = random(2000);
    noffy = random(2000);
    
    imageMode(CENTER);
    //// Resize
    var h1 = kaz.height * w1 / kaz.width;
    kaz.resize(w1, h1);
    for (var i = 0; i < eyes.length; i++) {
        eyes[i].resize(w1, h1);
    }
    var t = {
        name: "test"
        , shape: "ximage"
        , acceleration: -0.1
        , colors: ["blue", [0, 255, 127, 127], [0, 255, 64, 32]]
        , lifetime: 500, // angle: [240, 300],
        size: [32, 124]
        , partSize: 0.010, //dxy: [0.1, 0.1],
        dxy: [0.33, 0.33]
        , rate: [40, 0.001]
        , x: 0.4
        , y: 0.4
    };
    Fountain_display("ximage", xfimage);
    //set draw function based on shape name
    of = new Fountain(null, t);
}

function draw() {
    //   var o = round(map(mouseX,0,width,1,8));
    // var f = map(mouseY, 0, height, 0.01, 0.8);
    //noiseDetail(o,f);
    //noiseX = map(noise(noffx),0,1,0.4*width,0.6*width);
    //noiseY = map(noise(noffy),0,1,0.4*height,0.6*height);
    noffx += 0.002;
    noffy += 0.002;
    //var deltax = map(mouseX, 0, width, width / 18, -width/18);
    //var deltay = map(mouseY, 0, height, height / 18, -height / 18);
    noiseX = map(mouseX, 0, width, width/20, -width/20);
    noiseY = map(mouseY, 0, height, height/20, -height/20);
    //noiseX = constrain(noiseX+deltax,0,width);
    //noiseY = constrain(noiseY+deltay,0,height);
    background(157, 20, 20);
    //background(0);
    of.Draw();
    of.Create();
    of.Step();
    /*
    noStroke();
    fill(255);
    textSize(16);
    text(of.length, width / 2, 20);
    stroke(0);
    */
}