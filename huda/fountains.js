var of;
var s="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var littleImg;

function ftext(fountain, particle) {
  stroke(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  noFill();
  textSize(particle.partSize);
  text(s[particle.id%26], particle.location.x, particle.location.y);
}

function xfimg(fountain, particle) {
  stroke(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  noFill();
  textSize(particle.partSize);
  text(s[particle.id%26], particle.location.x, particle.location.y);
}


function xfimage(fountain, particle) {
   var i = Math.floor(particle.life*fountain.colors.length);
   var c = fountain.colors[i];
   if (c.rgba[3]==0) return;
   var img = littleImg; //fountain.f.image;
   if (c.rgba[3]!=255 || c.rgba[1]!=255 || c.rgba[2]!=255 || c.rgba[0]!=255)
    img = imagetint(this, img, i, c);
    noStroke();
    if (particle.rotation==0 && particle.partSize == 1) {
      image(img, particle.location.x, particle.location.y);
      noTint();
      return;
    }
    push();
    translate(particle.location.x, particle.location.y);  
    rotate(particle.rotation);
    scale(particle.partSize);    
    image(img, 0, 0);
    pop();
    noTint();
}

function setup() {
    //createCanvas(400, 400);
     var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("myBanner");
    
  littleImg = loadImage("img/eyes/eye1.png");   
    var t =
    {
        name: "test",
        shape: "image",
        //file: 'img/eyes/eye1.png',
        colors: ["blue",[0,255,127,127],[0,255,64,32]],
        lifetime: 600,
        angle: [240, 300],
        size: [8, 32],
        dxy: [0.1, 0.1],
        x: 0.5,
        y: 0.3
    };
    
    Fountain_display("image", fimage); 
    
    //set draw function based on shape name
    of = new Fountain(null, t);
}

function draw() {
  background(51);
  of.Draw();
  of.Create();
  of.Step();
  noStroke();
  fill(255);
  textSize(16);
  text(of.length, width/2, 20);
  stroke(0);
}

