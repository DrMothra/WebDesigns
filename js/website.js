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

    //Load floor grid
    var width = 420;
    var height = 640;
    var gridGeom = new THREE.PlaneGeometry(width, height);
    var texture = THREE.ImageUtils.loadTexture("images/grid.png");
    var gridMaterial = new THREE.MeshLambertMaterial({ map : texture, transparent: true, opacity: 0.9});
    var grid = new THREE.Mesh(gridGeom, gridMaterial);
    grid.name = 'grid';
    grid.rotation.x = -Math.PI/2;
    this.scene.add(grid);

    //Load in scene
    var _this = this;
    var loader = new THREE.SceneLoader();
    loader.addHierarchyHandler( "obj", THREE.OBJLoader );


    var callbackProgress = function( progress, result ) {
        console.log('Loading...');
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