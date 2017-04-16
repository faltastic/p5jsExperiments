var NBirds = 300;


// Based on http://www.openprocessing.org/visuals/?visualID=6910
var Boid = function () {
    var vector = new THREE.Vector3()
        , _acceleration, _width = 500
        , _height = 500
        , _depth = 200
        , _goal, _neighborhoodRadius = 100
        , _maxSpeed = 2
        , _maxSteerForce = 0.1
        , _avoidWalls = false;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();

    _acceleration = new THREE.Vector3();
    this.setGoal = function (target) {
        _goal = target;
    };
    this.setAvoidWalls = function (value) {
        _avoidWalls = value;
    };
    this.setWorldSize = function (width, height, depth) {
        _width = width;
        _height = height;
        _depth = depth;
    };
    this.run = function (boids) {
        if (_avoidWalls) {
            vector.set(-_width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
            vector.set(_width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
            vector.set(this.position.x, -_height, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
            vector.set(this.position.x, _height, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
            vector.set(this.position.x, this.position.y, -_depth);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
            vector.set(this.position.x, this.position.y, _depth);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            _acceleration.add(vector);
        }
        /* else {

                        this.checkBounds();

                    }
                    */
        if (Math.random() > 0.5) {
            this.flock(boids);
        }
        this.move();
    };
    this.flock = function (boids) {
        if (_goal) {
            _acceleration.add(this.reach(_goal, 0.005));
        }
        _acceleration.add(this.alignment(boids));
        _acceleration.add(this.cohesion(boids));
        _acceleration.add(this.separation(boids));
    };
    this.move = function () {
        this.velocity.add(_acceleration);
        var l = this.velocity.length();
        if (l > _maxSpeed) {
            this.velocity.divideScalar(l / _maxSpeed);
        }
        this.position.add(this.velocity);
        _acceleration.set(0, 0, 0);
    };
    this.checkBounds = function () {
        if (this.position.x > _width) this.position.x = -_width;
        if (this.position.x < -_width) this.position.x = _width;
        if (this.position.y > _height) this.position.y = -_height;
        if (this.position.y < -_height) this.position.y = _height;
        if (this.position.z > _depth) this.position.z = -_depth;
        if (this.position.z < -_depth) this.position.z = _depth;
    };
    //
    this.avoid = function (target) {
        var steer = new THREE.Vector3();
        steer.copy(this.position);
        steer.sub(target);
        steer.multiplyScalar(1 / this.position.distanceToSquared(target));
        return steer;
    };
    this.repulse = function (target) {
        var distance = this.position.distanceTo(target);
        if (distance < 100) {
            var steer = new THREE.Vector3();
            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);
            _acceleration.add(steer);
        }
    };
    this.reach = function (target, amount) {
        var steer = new THREE.Vector3();
        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);
        return steer;
    };
    this.alignment = function (boids) {
        var boid, velSum = new THREE.Vector3()
            , count = 0;
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            boid = boids[i];
            distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                velSum.add(boid.velocity);
                count++;
            }
        }
        if (count > 0) {
            velSum.divideScalar(count);
            var l = velSum.length();
            if (l > _maxSteerForce) {
                velSum.divideScalar(l / _maxSteerForce);
            }
        }
        return velSum;
    };
    this.cohesion = function (boids) {
        var boid, distance
            , posSum = new THREE.Vector3()
            , steer = new THREE.Vector3()
            , count = 0;
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.26) continue;
            boid = boids[i];
            distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                posSum.add(boid.position);
                count++;
            }
        }
        if (count > 0) {
            posSum.divideScalar(count);
        }
        steer.subVectors(posSum, this.position);
        var l = steer.length();
        if (l > _maxSteerForce) {
            steer.divideScalar(l / _maxSteerForce);
        }
        return steer;
    };
    this.separation = function (boids) {
        var boid, distance
            , posSum = new THREE.Vector3()
            , repulse = new THREE.Vector3();
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            boid = boids[i];
            distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                repulse.subVectors(this.position, boid.position);
                repulse.normalize();
                repulse.divideScalar(distance);
                posSum.add(repulse);
            }
        }
        return posSum;
    }
}
// GUI functions
var gui;
var guiP;
var guiParams = function () {
    this.LookAt = 'Flock';
};
var cameras = [
'Flock', 'AnotherBird', 'Forward', 'BirdView', 'DrunkBird', 'Ball'
];

function initGUI() {
    guiP = new guiParams();
    gui = new dat.GUI();
    gui.add(guiP, 'LookAt', cameras);
};

function updateParams() {
    LookAt = guiP.LookAt;
};

var SCREEN_WIDTH = window.innerWidth
    , SCREEN_HEIGHT = window.innerHeight
    , SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2
    , SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
var container, camera, scene, renderer
    , birds, bird;
var boid, boids;
var hydra = [];
var stats;
var camLookAt = new THREE.Vector3();
var flockPosition =  new THREE.Vector3();
init();
animate();

function init() {
    initGUI();
    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 450;
    scene = new THREE.Scene();
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 100, 1000);
    birds = [];
    boids = [];
    for (var i = 0; i < NBirds; i++) {
        boid = boids[i] = new Boid();
        boid.position.x = Math.random() * 400 - 200;
        boid.position.y = Math.random() * 400 - 200;
        boid.position.z = Math.random() * 400 - 200;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls(true);
        boid.setWorldSize(500, 500, 400);
        bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
            color: 0xdddddd
            , side: THREE.DoubleSide
        }));
        if(i==0){

        bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
            color: 0x0000ff
            , side: THREE.DoubleSide
        }));
        }
        bird.phase = Math.floor(Math.random() * 62.83);
        scene.add(bird);
    }
    // Center Hedron
    var icosahedron = new THREE.IcosahedronBufferGeometry(40, 1);
    var hydraStroke = new THREE.MeshBasicMaterial({
        color: 0xdddddd
        , wireframe: true
        , wireframeLinewidth: 1
    });
    var hydraFill =  new THREE.MeshBasicMaterial({
        color: 0x000000
    });
        //new THREE.MeshNormalMaterial();
    hydra[0] = new THREE.Mesh(icosahedron, hydraStroke);
    hydra[0].position.x = 0;
    hydra[0].position.y = 0;
    hydra[0].position.z = 0;
    camDirection = hydra[0].position;

    hydra[1] = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(39.95, 1), hydraFill);
    hydra[1].position.x = 0;
    hydra[1].position.y = 0;
    hydra[1].position.z = 0;
    scene.add(hydra[1]);
    scene.add(hydra[0]);
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    container = document.getElementById('threeCanvas');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    var vector = new THREE.Vector3(event.clientX - SCREEN_WIDTH_HALF, -event.clientY + SCREEN_HEIGHT_HALF, 0);
    for (var i = 0, il = boids.length; i < il; i++) {
        boid = boids[i];
        vector.z = boid.position.z;
        boid.repulse(vector);
    }
}
//
function animate() {
    requestAnimationFrame(animate);
    stats.begin();
    render();
    stats.end();
}
function render() {
    updateParams();
    flockPosition = new THREE.Vector3();
    camera.position.copy(boids[2].position);
    for (var i = 0, il = birds.length; i < il; i++) {
        boid = boids[i];
        flockPosition.add(boid.position);
        boid.run(boids);
        bird = birds[i];
        bird.position.copy(boids[i].position);
        //color = bird.material.color;
        //color.r = color.g = color.b = (500 - bird.position.z) / 1000;
        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
        bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
    }
    flockPosition.multiplyScalar(1 / NBirds);
    hydra[1].rotation.y += 0.01;
    hydra[1].rotation.z += 0.01;
    hydra[0].rotation.y += 0.01;
    hydra[0].rotation.z += 0.01;
    camLookAt.set(0, 0, 0);
    switch (LookAt) {
    case "Flock":
        camLookAt = flockPosition;
        break;
    case "AnotherBird":
        camLookAt.add(boids[1].position);
        break;
    case "Forward":
        camLookAt.addScaledVector(boids[2].position, 0.8);
        camLookAt.addScaledVector(boids[2].velocity, 8.0);
        break;
    case "BirdView":
        camLookAt.addScaledVector(boids[2].position, 0.8);
        camLookAt.addScaledVector(boids[2].velocity, 40.0);
        camLookAt.applyAxisAngle(boids[2].velocity, -Math.PI / 2);
        break;
    case "Ball":
        camLookAt.add(hydra[0].position); //boring
        break;
    case "DrunkBird":
        camLookAt.add(boids[2].position);
        camLookAt.addScaledVector(boids[2].velocity, 120.0);
        break;
    }
    camera.lookAt(camLookAt);
    renderer.render(scene, camera);
}
