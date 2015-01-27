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
};

Website.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    var _this = this;

    THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    //Load floor
    var width = 900;
    var height = 200;
    var floorGeom = new THREE.PlaneGeometry(width, height);
    var floorMaterial = new THREE.MeshLambertMaterial({ color: 0x0000aa });
    var floor = new THREE.Mesh(floorGeom, floorMaterial);
    floor.name = 'floor';
    floor.position.y = -50;
    floor.rotation.x = -Math.PI/2;
    this.scene.add(floor);

    //Load in scene
    var _this = this;
    var loader = new THREE.SceneLoader();
    loader.addHierarchyHandler( "obj", THREE.OBJLoader );
    //loader.addGeometryHandler( "obj", THREE.OBJLoader );
    loader.addGeometryHandler( "binary", THREE.BinaryLoader );

    var callbackProgress = function( progress, result ) {

    };

    var callbackFinished = function( result) {
        console.log('All loaded');
        _this.scene.add(result.scene);
        //DEBUG
        //console.log('Scene =', result.scene);

    };

    loader.callbackProgress = callbackProgress;

    loader.load( "scenes/webScene.js", callbackFinished);


};

Website.prototype.update = function() {
    //Perform any updates

    BaseApp.prototype.update.call(this);
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