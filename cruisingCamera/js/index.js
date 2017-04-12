var renderer, scene, camera;
var camPosIndex = 0;
var nx = Math.random(1000);
var ny = Math.random(1000);
var nz = Math.random(1000);
var speed;
var randomPoints = [];
var perlinPoints = [];
for (var i = 0; i < 3000; i++) {
    randomPoints.push(new THREE.Vector3(Math.random() * window.innerHeight - window.innerHeight / 2, Math.random() * window.innerHeight - window.innerHeight / 2, Math.random() * window.innerHeight - window.innerHeight / 2));
    perlinPoints.push(new THREE.Vector3(noise(nx + i / 5) * window.innerHeight - window.innerHeight / 2, noise(ny + i / 5) * window.innerHeight - window.innerHeight / 2, noise(nz + i / 5) * window.innerHeight - window.innerHeight / 2));
}
var splines = [
  ["Spline", new THREE.SplineCurve3(randomPoints.slice(1, 100))]
, ["Perlin Spline", new THREE.SplineCurve3(perlinPoints.slice(1, 200))]
, ["Helix Curve", new THREE.Curves.HelixCurve(200)]
, ["Trefoil Knot", new THREE.Curves.TrefoilKnot(50)]
, ["Torus Knot", new THREE.Curves.TorusKnot(100)]
, ["Cinquefoil Knot", new THREE.Curves.CinquefoilKnot(100)]
, ["Trefoil poly Knot", new THREE.Curves.TrefoilPolynomialKnot(50)]
, ["Granny Knot", new THREE.Curves.GrannyKnot()]
, ["Heart Curve", new THREE.Curves.HeartCurve(1)]
, ["Viviani Curve", new THREE.Curves.VivianiCurve(window.innerHeight / 3)]
, ["Knot Curve", new THREE.Curves.KnotCurve()]
, ["Figure 8 Knot", new THREE.Curves.FigureEightPolynomialKnot(2)]
, ["Decorated Torus Knot ", new THREE.Curves.DecoratedTorusKnot4a(100)]
//    ,
//			["DecoratedTorusKnot4b", new THREE.Curves.DecoratedTorusKnot4b()],
//			["DecoratedTorusKnot5a", new THREE.Curves.DecoratedTorusKnot5a()],
//			["DecoratedTorusKnot5c", new THREE.Curves.DecoratedTorusKnot5c()]
//
];
var splinesNames = {};
for (var i = 0; i < splines.length; i++) {
    splinesNames[splines[i][0]] = i;
}
var spline;
// GUI functions
var gui;
var guiP;
var guiParams = function () {
    this.speed = 50;
    this.curves = 0;
};

function initGUI() {
    guiP = new guiParams();
    gui = new dat.GUI();
    gui.add(guiP, 'speed', 0, 100);
    gui.add(guiP, 'curves', splinesNames);
};

function updateParams() {
    speed = guiP.speed / 10;
    spline = splines[parseInt(guiP.curves)][1];
};
init();
update();

function init() {
    initGUI();
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 2000);
    speed = 1;
    spline = splines[0][1];
    for (var i = 0; i < 3000; i++) {
        var b = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)
            , //new THREE.SphereGeometry( 1 ),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
            //new THREE.MeshBasicMaterial({color: "#EEEDDD"})
            //   new THREE.SphereGeometry(4, 6, 6, 0, Math.PI * 2, 0, Math.PI ),
            // new THREE.SphereGeometry(50, 8, 8, 2*Math.PI*Math.random(), Math.PI * 2, 2*Math.PI*Math.random(), 2*Math.PI),
            //      new THREE.LineBasicMaterial( {
            //					color: 0xffffff,
            //					transparent: true,
            //					opacity: 0.75
            //				} )
            /*
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF
                , wireframe: true
                , wireframeLinewidth: 0.51
               ,transparent: true
                   ,opacity: 0.25})
                   */
            //new THREE.MeshNormalMaterial()
        );
        //  b.position.x = perlinPoints[i].x;
        //    b.position.y = perlinPoints[i].y;
        //    b.position.z = perlinPoints[i].z;
        b.position.x = 1.2 * randomPoints[i].x;
        b.position.y = 1.2 * randomPoints[i].y;
        b.position.z = 1.2 * randomPoints[i].z;
        scene.add(b);
    }
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function update() {
    updateParams();
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    if (parseInt(guiP.curves) > 1) {
        camPosIndex += speed;
    }
    else {
        camPosIndex += speed / 10;
    }
    if (camPosIndex > 10000) {
        camPosIndex = 0;
    }
    /*
    nx += speed/1000;
    ny += speed/1000;
    nz += speed/1000;
    */
    var camPos = spline.getPoint(camPosIndex / 10000);
    var camRot = spline.getTangent(camPosIndex / 10000);
    /*
    camera.position.x = -300 + 600*noise(nx);
    camera.position.y = -300 + 600*noise(ny);
    camera.position.z = -300 + 600*noise(nz);
    */
    camera.position.x = camPos.x;
    camera.position.y = camPos.y;
    camera.position.z = camPos.z;
    camera.rotation.x = camRot.x;
    camera.rotation.y = camRot.y;
    camera.rotation.z = camRot.z;
    camera.lookAt(spline.getPoint((camPosIndex + 1) / 10000));
}
