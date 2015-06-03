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

    //Alter camera
    this.camera.position.set(1500, 330, 1055 );
    var lookAt = new THREE.Vector3(-90, 310, 20);
    this.controls.setLookAt(lookAt);
    //Create ground plane consisting of boxes
    this.boxes = [];
    this.animationTime = 0;
    this.timeInc = Math.PI / 64;
    var startX = -550, startZ = 0;
    this.startY = -100;
    this.cubesPerRow = 50;
    this.numRows = 10;
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

    //Cube animation
    this.amplitude = 40;
    this.waveCycle = 20;
    this.waveDelta = (2 * Math.PI)/this.waveCycle;
    this.startCube = 0;
    this.endCube = this.startCube + this.cubesPerRow;
    this.currentCube = this.startCube;

    //Research object
    var _this = this;
    this.square = 240;
    var tex = THREE.ImageUtils.loadTexture( "textures/projects.jpg" );
    var plane = new THREE.PlaneGeometry(50, 50, 8, 8);
    var planeMat = new THREE.MeshLambertMaterial( {map: tex} );
    this.model = new THREE.Mesh(plane, planeMat);
    this.scene.add( this.model);
    this.animating = true;
    this.waitTime = 5;
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
    //Position model
    this.model.position.set(this.boxes[this.square].position.x, this.boxes[this.square].position.y+30, this.boxes[this.square].position.z);
};

$(document).ready(function() {
    //Initialise app
    skel.init();
    var container = document.getElementById("WebGL-output");
    var app = new Website();
    app.init(container);
    app.createScene();

    //GUI callbacks
    $('.lightGlu').colorbox( {rel:'lightGlu', transition:"none", width:"75%", height:"75%"} );
    $('.lightMedical').colorbox( {rel:'lightMedical', transition:"none", width:"75%", height:"75%"} );
    app.run();
});
