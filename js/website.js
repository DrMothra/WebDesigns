/**
 * Created by DrTone on 04/12/2014.
 */
//Visualisation framework

function createLabel(name, position, scale, colour, fontSize, opacity) {

    var fontface = "Arial";
    var borderThickness = 5;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = fontSize + "px " + fontface;

    var metrics = context.measureText( name );
    var textWidth = metrics.width;

    //Background
    context.fillStyle = "rgba(255, 255, 255, 1.0)";

    //Border
    context.strokeStyle = "rgba(0, 0, 255, 1.0)";

    context.lineWidth = borderThickness;

    roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontSize * 1.4 + borderThickness, 20);

    //Text
    context.fillStyle = "rgba(0, 0, 0, 1.0)";
    context.fillText( name, borderThickness, fontSize + borderThickness);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    //texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial({
            //color: color,
            transparent: false,
            opacity: opacity,
            useScreenCoordinates: false,
            blending: THREE.AdditiveBlending,
            map: texture}
    );

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = name;
    sprite.visible = false;

    sprite.scale.set(scale.x, scale.y, 1);
    sprite.position.set(position.x, position.y, position.z);

    return sprite;
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

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
    var welcome = createLabel(" Welcome ", textPos, textScale, null, 48, 1);
    this.scene.add(welcome);
    var labelPos = new THREE.Vector3(100, 100, 0);
    this.researchLabel = createLabel(" Research ", labelPos, textScale, null, 32, 1);
    this.scene.add(this.researchLabel);
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
                this.researchLabel.visible = true;
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