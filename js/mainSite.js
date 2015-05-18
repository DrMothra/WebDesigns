/**
 * Created by atg on 18/05/2015.
 */

var BOX_SIZE = 20;

//Init this app from base
function Website() {
    BaseApp.call(this);
}

Website.prototype = new BaseApp();

Website.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
};

Website.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Create ground plane consisting of boxes
    this.boxes = [];
    this.amplitude = 20;
    this.animationTime = 0;
    var startX = -550, startZ = 0;
    this.startY = -100;
    this.cubesPerRow = 50;
    this.numRows = 10;
    this.timeInc = Math.PI / 64;
    var xGap = BOX_SIZE + 2, zGap = xGap;
    var boxGeom, boxMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff}), boxMesh;
    for(var row = 0; row<this.numRows; ++row) {
        startX = -550;
        startZ += zGap;
        for(var i=0; i<this.cubesPerRow; ++i) {
            boxGeom = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
            boxMesh = new THREE.Mesh(boxGeom, boxMaterial);
            boxMesh.position.set(startX, this.startY, startZ);
            this.scene.add(boxMesh);
            this.boxes.push(boxMesh);
            startX += xGap;
        }
    }

    //Pumpkin object

    var sphereGeom = new THREE.SphereGeometry(10, 16, 16);
    var sphereMat = new THREE.MeshPhongMaterial( {color: 0x0000ff});
    var sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.y = -100;
    sphere.position.z = 100;
    this.scene.add(sphere);
};

Website.prototype.update = function() {
    BaseApp.prototype.update.call(this);

    //Timing
    var delta = this.clock.getDelta();
    this.elapsedTime += delta;

    //Use sine wave to animate boxes
    for(var row=0; row<this.numRows; ++row) {
        for(var cube = 0; cube<this.cubesPerRow; ++cube) {
            this.boxes[cube + (row*this.cubesPerRow)].position.y = this.startY + (this.amplitude * Math.sin(this.elapsedTime + (cube * this.timeInc)));
        }
    }
};

$(document).ready(function() {
    //Initialise app
    var container = document.getElementById("WebGL-output");
    var app = new Website();
    app.init(container);
    app.createScene();

    //GUI callbacks

    app.run();
});
