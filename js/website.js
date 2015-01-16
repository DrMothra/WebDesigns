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
    //Load in objects
    var totalObjects = 3;
    var displayGroup = null;
    var tile = null;
    var tileMesh = null;
    var textures = [];
    var displayImages = ['research.jpg', 'projects.jpg', 'portfolio.jpg', 'webGL.jpg', 'traject.jpg', 'blog.jpg', 'contact.jpg'];

    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
        if(loaded == total) {
            console.log('All objects loaded');
            displayGroup.add(tile);
            displayGroup.rotation.x = Math.PI/2;
            displayGroup.scale.set(10, 10, 10);
            tileMesh.material.map = textures[6];
        }
    };



    var onError = function ( xhr ) {
    };


    var imageLoader = new THREE.ImageLoader( manager );
    var tex;
    for(var i=0; i<displayImages.length; ++i) {
        imageLoader.load( 'images/'+displayImages[i], function ( image ) {
            tex = new THREE.Texture(image);
            textures.push(tex);
            tex.needsUpdate = true;
        } );
    }


    // model

    var modelLoader = new THREE.OBJLoader( manager );
    var surroundMat = new THREE.MeshPhongMaterial( {color: 0x0000ff});

    modelLoader.load( 'models/surround.obj', function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material = surroundMat;

            }

        } );

        displayGroup = object;
        displayGroup.name = 'displayGroup';
        _this.scene.add( displayGroup );
        /*
         var newObj = object.clone();
         _this.scene.add(newObj);
         newObj.position.x = 30;
         */

    }, null, onError );

    modelLoader.load( 'models/displayFront.obj', function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                //child.material.map = textures[0];
                tileMesh = child;

            }

        } );

        tile = object;
        tile.name = 'tile';
        /*
        var newObj = object.clone();
        _this.scene.add(newObj);
        newObj.position.x = 30;
        */

    }, null, onError );


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