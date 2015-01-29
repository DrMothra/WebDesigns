/**
 * Created by DrTone on 04/12/2014.
 */
//Visualisation framework

//Init this app from base
function Website() {
    BaseApp.call(this);
}

Website.prototype = new BaseApp();

Website.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);

    //Set up label data
    var labelNames = ['Research', 'Projects', 'Portfolio', 'WebGL', 'TrajectASketch', 'Blog', 'Contact'];
    var labelPositions = [
        -100, 100, 0,
        -80, 100, 0,
        -60, 100, 0,
        -40, 100, 0,
        -20, 100, 0,
        0, 100, 0,
        20, 100, 0
    ];

    this.labelData = [];
    var label;
    for(var i= 0,pos=0; i<labelNames.length; ++i, pos+=3) {
        label = {};
        label.name = labelNames[i];
        label.x = labelPositions[pos];
        label.y = labelPositions[pos+1];
        label.z = labelPositions[pos+2];
        this.labelData.push(label);
    }
};

Website.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    var _this = this;

    THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    //Load in scene
    var loader = new THREE.SceneLoader();
    loader.addHierarchyHandler( "obj", THREE.OBJLoader );
    //loader.addGeometryHandler( "obj", THREE.OBJLoader );
    loader.addGeometryHandler( "binary", THREE.BinaryLoader );

    var callbackProgress = function( progress, result ) {

    };

    var callbackFinished = function( result) {
        console.log('All loaded');
        _this.scene.add(result.scene);
    };

    loader.callbackProgress = callbackProgress;

    loader.load( "scenes/webScene.js", callbackFinished);

    //Text labels
    var textPos = new THREE.Vector3(0, 150, 0);
    var textScale = new THREE.Vector3(350, 100, 1);
    var welcome = spriteManager.create(" Welcome ", textPos, textScale, 48, 1, true);
    this.scene.add(welcome);
    var labelPos = new THREE.Vector3(100, 100, 0);
    var researchLabel = spriteManager.create(" Research ", labelPos, textScale, 32, 1, false);
    this.scene.add(researchLabel);
};

Website.prototype.update = function() {
    //Perform any updates
    BaseApp.prototype.update.call(this);

    //Check for mouse over
    //Perform mouse hover
    var vector = new THREE.Vector3(( this.mouse.endX / window.innerWidth ) * 2 - 1, -( this.mouse.endY / window.innerHeight ) * 2 + 1, 0.5);
    this.projector.unprojectVector(vector, this.camera);

    var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

    this.hoverObjects.length = 0;
    this.hoverObjects = raycaster.intersectObjects(this.scene.children, true);

    //Check hover actions
    if(this.hoverObjects.length != 0) {
        for(var i=0; i<this.hoverObjects.length; ++i ) {
            if(this.hoverObjects[i].object.name === 'display0') {
                var research = spriteManager.getSprite(' Research ');
                if(research) {
                    research.visible = true;
                }
            }
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