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
    this.animationTime = 0;
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
    this.square = 230;
    var tex = THREE.ImageUtils.loadTexture( "textures/research.jpg" );
    var plane = new THREE.PlaneGeometry(30, 30, 16, 16);
    var planeMat = new THREE.MeshLambertMaterial( {map: tex} );
    this.model = new THREE.Mesh(plane, planeMat);
    this.model.rotation.y = -Math.PI/2;
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

    if(this.elapsedTime >= this.waitTime || this.animating) {
        this.animating = true;
        var nextCube;
        for(var i=0; i<=this.waveCycle; ++i) {
            nextCube = this.currentCube-i;
            if(nextCube < this.startCube || nextCube >= this.endCube) continue;
            for(var row=0; row<this.numRows; ++row) {
                this.boxes[nextCube+(row*this.cubesPerRow)].position.y = this.startY + (this.amplitude * Math.sin(this.waveDelta * i));
            }
        }
        //Position model
        this.model.position.set(this.boxes[this.square].position.x, this.boxes[this.square].position.y+30, this.boxes[this.square].position.z);

        if(++this.currentCube >= (this.endCube+this.waveCycle)) {
            this.currentCube = this.startCube;
            this.animating = false;
        }
        this.elapsedTime = 0;
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
