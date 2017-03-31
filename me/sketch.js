var imgHtml;
			var imagePath = 'me.jpg';

			var imgContainerEl = document.getElementById( 'img-container' );
			var canvasContainerEl = document.getElementById( 'canvas-container' );

			var params = {
				amount:     35,
				iterations: 20,
				quality:    30,
				seed:       25
			};

function preload() {
  // playIcn = loadImage("icns/play.png");
}

function setup() {
    var myCanvas = createCanvas(windowWidth, 1.05 * windowHeight);
    myCanvas.parent("theCanvas");

   // imgHtml =select("#imageGlitch");
    imgHtml =document.getElementById( 'imageGlitch');
    console.log(imgHtml);
    frameRate(12);
}

function draw() {

   glitchIt();
}

function glitchIt(){
				params.amount=99*noise(frameCount);

				params.iterations= 50*noise(100+frameCount);
				params.quality=99*noise(400+frameCount);
				params.seed=99*noise(800+frameCount);


			loadImage( imagePath, function ( img ) {
				glitch( params )
					.fromImage( img )
					.toDataURL()
					.then( function( dataURL ) {
						var imageEl = new Image();
						//imageEl.src = dataURL;
                    imgHtml.src = dataURL;
						//imgContainerEl.appendChild( imageEl );
					} );

				/*
                glitch( params )
					.fromImage( img )
					.toImageData()
					.then( function( imageData ) {
						var canvasEl = document.createElement( 'canvas' );
						canvasEl.width = imageData.width;
						canvasEl.height = imageData.height;
						canvasEl.style.width = imageData.width + 'px';
						var ctx = canvasEl.getContext( '2d' );
						canvasContainerEl.appendChild( canvasEl );
						ctx.putImageData( imageData, 0, 0 );
					} );
                    */
			} );

			function loadImage ( src, callback ) {
				var imageEl = new Image();

				imageEl.onload = function () {
					callback( imageEl );
				};

				imageEl.src = src;
			}

}
