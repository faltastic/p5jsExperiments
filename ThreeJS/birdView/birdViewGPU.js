var NBirds = 4;


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
        else {
                        this.checkBounds();

                    }

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




var SCREEN_WIDTH = window.innerWidth
    , SCREEN_HEIGHT = window.innerHeight
    , SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2
    , SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
var container, camera, scene, renderer
    , birds, bird;
var boid, boids;
var hydra = [];
var stats;
var lookAt = new THREE.Vector3();
var flockPosition =  new THREE.Vector3();

var boidsGPU;
init();
animate();

function init() {
  if (turbojs) {
     boidsGPU = turbojs.alloc(8*NBirds);
     //var nFactor = 4;
     for (var i = 0; i < 8*NBirds; i=i+8) {
         //position
         boidsGPU.data[i] = 400*Math.random()-200;
         boidsGPU.data[i+1] = 400*Math.random()-200;
         boidsGPU.data[i+2] = 400*Math.random()-200;
         boidsGPU.data[i+3] = 0;
         //veolcity
         boidsGPU.data[i+4] = Math.random();
         boidsGPU.data[i+5] = Math.random();
         boidsGPU.data[i+6] = Math.random();
         boidsGPU.data[i+7] = 0;


     }

    var maxSpeed=2.0;
  var maxSteerForce = 0.1;

// do another for velocity which is used in only move function
// or go through it one by one

    turbojs.run(boidsGPU, `

const int eightNBirds = 8*${NBirds};
 vec4 acceleration =vec4(1000,0.1,0.1,0.);
    float width = 500.;
    float height = 500.;
    float depth = 200.;
    //, _goal,
    float neighborhoodRadius = 100.;
    float maxSpeed = ${maxSpeed}.;
    float maxSteerForce = ${maxSteerForce};
    bool avoidWalls = false;

vec4 avoid_walls(vec4 boids) {
    boids = boids*1.1;
return boids;
}
vec4 move(vec4 vel, vec4 pos) {
        vel += acceleration;

      float l = sqrt(dot(vel, vel));

        if (l > maxSpeed) {
            vel/(l / maxSpeed);
        }
        pos = pos + vel;
       // acceleration=0;

     return vel;
}

void main(void) {

    vec4 boids = read();

   // boids = avoid_walls(boids);


   vec4 boidPos;
   vec4 boidVel;
    for(int i = 0; i < eightNBirds; i+=8) {

    boidPos = vec4(boids[i],boids[i+1],boids[i+2],boids[i+3]);
    boidVel = vec4(boids[i+4],boids[i+5],boids[i+6],boids[i+7]);
    // boidVel = boids;
     boidVel = move(boidVel, boidPos);
     boids = boidVel;
   }
    commit(boids);
    //commit(boidPos);
    //commit();

}
`
     );
     console.log(boidsGPU.data); //.subarray(0, NBirds*2));
 }




    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 450;
    scene = new THREE.Scene();
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x061934, 100, 1000);
    birds = [];
    boids = [];
    for (var i = 0; i < NBirds; i++) {

        boid = boids[i] = new Boid();

        boid.position.x = boidsGPU.data[4*i];
        boid.position.y = boidsGPU.data[4*i+1];
        boid.position.z = boidsGPU.data[4*i+2];

        boid.velocity.x = boidsGPU.data[4*i+4];
        boid.velocity.y = boidsGPU.data[4*i+5];
        boid.velocity.z = boidsGPU.data[4*i+6];

        boid.setAvoidWalls(true);
        boid.setWorldSize(500, 500, 400);

        bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
            color: 0xeeeeee
            , side: THREE.DoubleSide
        }));
        bird.phase = Math.floor(Math.random() * 62.83);
        scene.add(bird);
    }
    // Center Hedron
    var icosahedron = new THREE.IcosahedronBufferGeometry(40, 1);
    var hydraStroke = new THREE.MeshBasicMaterial({
        color: 0xeeeeee
        , wireframe: true
        , wireframeLinewidth: 1
    });
    var hydraFill = new THREE.MeshNormalMaterial();
    hydra[0] = new THREE.Mesh(icosahedron, hydraStroke);
    hydra[0].position.x = 0;
    hydra[0].position.y = 0;
    hydra[0].position.z = 0;
    camDirection = hydra[0].position;
    //hydra[0].userData = {URL: "http://google.com"};
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

    flockPosition =  new THREE.Vector3();
    camera.position.copy(birds[2].position);
    for (var i = 0, il = birds.length; i < il; i++) {

        boid = boids[i];
        flockPosition.add(boid.position);

        boid.run(boids);
        bird = birds[i];
        bird.position.copy(boids[i].position);
        color = bird.material.color;
        color.r = color.g = color.b = (500 - bird.position.z) / 1000;
        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
        bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
    }

    flockPosition.multiplyScalar(1/NBirds);

    hydra[1].rotation.y += 0.005;
    hydra[1].rotation.z += 0.005;
    hydra[0].rotation.y += 0.005;
    hydra[0].rotation.z += 0.005;


    /*
    lookAt = boids[2].position;
    lookAt = boids[2].velocity;
    lookAt.addVectors(boids[2].position, (boids[2].velocity).multiplyScalar(0.5));
    */
    //it's fun to change vecolity to the bird you watch
    //boids[2].velocity.multiplyScalar(2.5);
    //lookAt = boids[2].position.add(boids[2].velocity);
    //lookAt = boids[2].position;
    lookAt = flockPosition;
    //same bird position and velocity is crazy;

    //camera.lookAt(boids[0].position.add(boids[0].velocity));
    camera.lookAt(lookAt);

    //calcualte an average position and always look at the flock!


    renderer.render(scene, camera);
}
