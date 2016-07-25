// http://jsfiddle.net/shivasaxena/8Z4N4/1/

var container, stats;
var camera, scene, projector, renderer;
var particleMaterial;
var objects = [];
init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML =
        '<a href="http://threejs.org" target="_blank">three.js</a> - clickable objects';
    container.appendChild(info);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,
        1, 10000);
    camera.position.set(0, 300, 500);
    scene = new THREE.Scene();
    var geometry = new THREE.CubeGeometry(100, 100, 100);
    for (var i = 0; i < 5; i++) {
        var object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            opacity: 0.5
        }));
        object.position.x = i;
        object.position.y = i * 10 + i * 100;
        object.position.z = i;
        console.log(object);
        switch (i) {
            case 0:
                object.userData = {
                    URL: "http://google.com"
                };
                break;
            case 1:
                object.userData = {
                    URL: "http://yahoo.com"
                };
                break;
            case 2:
                object.userData = {
                    URL: "http://msn.com"
                };
                break;
            case 3:
                object.userData = {
                    URL: "http://engadget.com"
                };
                break;
            case 4:
                object.userData = {
                    URL: "http://stackoverflow.com"
                };
                break;
        }
        scene.add(object);
        objects.push(object);
    }
    var PI2 = Math.PI * 2;
    particleMaterial = new THREE.SpriteCanvasMaterial({
        color: 0x000000,
        program: function(context) {
            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill();
        }
    });
    projector = new THREE.Projector();
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
   
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
        1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL);
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
   
}
var radius = 600;
var theta = 0;

function render() {
    renderer.render(scene, camera);
}