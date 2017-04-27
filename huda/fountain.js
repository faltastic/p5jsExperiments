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
}
// end preload

function ftext(fountain, particle) {
    stroke(fountain.colors[Math.floor(particle.life * fountain.colors.length)]);
    noFill();
    textSize(particle.partSize);
    text(s[particle.id % 26], particle.location.x, particle.location.y);
}

function xfimage(fountain, particle) {
    var xx = particle.location.x + noiseX;
    var yy = particle.location.y + noiseY;
    push();
    translate(xx, yy);
    scale(particle.partSize / 100);
    image(kaz, 0, 0);
    image(eyes[particle.id % 7], 0, 0);
    pop();
    noTint();
}

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("myBanner");
    frameRate(29);
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
        , lifetime: 500
         // angle: [240, 300],
        , size: [32, 124]
        , partSize: 0.010 //dxy: [0.1, 0.1],
        , dxy: [0.33, 0.33]
        , rate: [40, 0.001]
        , x: 0.4
        , y: 0.4
    };
    Fountain_display("ximage", xfimage);
    //set draw function based on shape name
    of = new Fountain(null, t);
}

function draw() {

    noffx += 0.005;
    noffy += 0.005;

    noiseX = map(mouseX, 0, width, width/20, -width/20);
    noiseY = map(mouseY, 0, height, height/20, -height/20);

    background(157, 20, 20);

    of.Draw();
    of.Create();
    of.Step();

}
