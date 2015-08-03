/**
 * Created by DrTone on 29/07/2015.
 */
//Interface to 3D model


//Init this app from base
function Interface() {
    BaseApp.call(this);
}

Interface.prototype = new BaseApp();

Interface.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
    this.halfWidth = window.innerWidth/2;
    this.halfHeight = window.innerHeight/2;
    this.xRotScale = Math.PI/4;
    this.yRotScale = Math.PI/4;
};

Interface.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Load desired model
    this.modelLoader = new THREE.OBJMTLLoader();
    this.model = null;
    var _this = this;


    this.modelLoader.load( 'models/pumpkin.obj', 'models/pumpkin.mtl', function ( object ) {

        _this.scene.add( object );
        _this.model = object;
        object.rotation.y = -Math.PI/2;
        object.position.set(0, 0, 0);
        _this.loadedModel = object;

    } );
};

Interface.prototype.update = function() {
    BaseApp.prototype.update.call(this);


    if(this.model) {
        this.model.rotation.y = -Math.PI/2 + ((this.mouse.endX - this.halfWidth)*this.xRotScale)/this.halfWidth;
        this.model.rotation.x = ((this.mouse.endY - this.halfHeight)*this.yRotScale)/this.halfHeight;
    }
    //DEBUG
    console.log("X =", this.mouse.endX - this.halfWidth);

};

$(document).ready(function() {
    //Init app
    var container = document.getElementById("WebGL-output");
    var app = new Interface();
    app.init(container);
    app.createScene();

    //GUI callbacks

    app.run();
});