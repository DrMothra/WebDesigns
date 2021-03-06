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
    //Objects to animate
    this.animating = [];
    this.rotInc = Math.PI*3;
    this.posInc = 130;
    this.animationTime = 3;
};

Website.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Create ground plane
    var groundGeom = new THREE.PlaneGeometry(1024, 1024);
    var groundMat = new THREE.MeshPhongMaterial( {color: 0x00ff00});
    var ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -100;
    this.scene.add(ground);

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

    //Set up label data
    this.labelNames = ['Research', 'Projects', 'Portfolio', 'WebGL', 'TrajectASketch', 'Blog', 'Contact'];
    var labelPositions = [
        -280, 30, 0,    //Research
        -180, 30, 0,    //Projects
        -80, 30, 0,     //Portfolio
        25, 30, 0,      //WebGL
        110, 30, 0,     //TrajectASketch
        230, 30, 0,     //Blog
        325, 30, 0      //Contact
    ];

    var labelScales = [
        100, 100, 1,
        100, 100, 1,
        100, 100, 1,
        100, 100, 1,
        100, 100, 1,
        100, 100, 1,
        100, 100, 1
    ];

    var labelData = [];
    var label;
    for(var i= 0,pos=0; i<this.labelNames.length; ++i, pos+=3) {
        label = {};
        label.name = this.labelNames[i];
        label.x = labelPositions[pos];
        label.y = labelPositions[pos+1];
        label.z = labelPositions[pos+2];
        labelData.push(label);
    }
    var labelPos = new THREE.Vector3();
    var labelScale = new THREE.Vector3();
    var spriteLabel;
    for(var sprite= 0, scales=0; sprite<this.labelNames.length; ++sprite, scales+=3) {
        labelPos.x = labelData[sprite].x;
        labelPos.y = labelData[sprite].y;
        labelPos.z = labelData[sprite].z;
        labelScale.x = labelScales[scales];
        labelScale.y = labelScales[scales+1];
        labelScale.z = labelScales[scales+2];
        spriteLabel = spriteManager.create(this.labelNames[sprite], labelPos, labelScale, 32, 1, false);
        this.scene.add(spriteLabel);
    }

    //Welcome text
    var welcomePos = new THREE.Vector3(0, 150, 0);
    var welcomeScale = new THREE.Vector3(150, 150, 1);
    var textColour = { r: 255, g:255, b: 0, a: 1.0};
    spriteManager.setBorderProperties(10, textColour);
    var mainText = spriteManager.create('Welcome', welcomePos, welcomeScale, 36, 1, true);
    this.scene.add(mainText);
};

Website.prototype.clearLabels = function() {
    //Make all labels invisible
    var sprite;
    for(var label=0; label<this.labelNames.length; ++label) {
        sprite = this.scene.getObjectByName(this.labelNames[label]+'Label', true);
        if(sprite) {
            sprite.visible = false;
        }
    }
};

Website.prototype.update = function() {
    //Perform any updates
    var elapsed = this.clock.getDelta();
    var i;
    BaseApp.prototype.update.call(this);

    //Check for mouse over
    //Perform mouse hover
    var vector = new THREE.Vector3(( this.mouse.endX / window.innerWidth ) * 2 - 1, -( this.mouse.endY / window.innerHeight ) * 2 + 1, 0.5);
    this.projector.unprojectVector(vector, this.camera);

    var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

    this.clearLabels();
    this.hoverObjects.length = 0;
    this.hoverObjects = raycaster.intersectObjects(this.scene.children, true);

    //Check hover actions
    if(this.hoverObjects.length != 0) {
        for(i=0; i<this.hoverObjects.length; ++i ) {
            var label = spriteManager.getSprite(this.hoverObjects[i].object.name);
            if(label) {
                label.visible = true;
            }
        }
    }

    //Check selections
    if(this.pickedObjects.length !=0 && !this.objectsPicked) {
        this.objectsPicked = true;
        this.selectedObject = this.getSelectedObject();
        if(this.selectedObject >= 0) {
            //Animate all objects
            var select;
            var labels = this.labelNames.length;
            for(i=0; i<labels; ++i) {
                select = (this.selectedObject + i) % labels;
                var animObj = {};
                animObj.group = this.scene.getObjectByName(this.labelNames[select], true).parent;
                animObj.startTime = this.clock.getElapsedTime() + (i*0.5);
                animObj.endTime = animObj.startTime + this.animationTime;
                this.animating.push(animObj);
            }
        }
    }

    //Animations
    if(this.animating.length != 0) {
        var timeNow = this.clock.getElapsedTime();
        var animation;
        for(var obj=0; obj<this.animating.length; ++obj) {
            animation = this.animating[obj];
            if(timeNow >= animation.startTime) {
                if(timeNow < animation.endTime) {
                    this.animating[obj].group.rotation.y += elapsed * this.rotInc;
                    this.animating[obj].group.position.y += elapsed * this.posInc;
                } else {
                    this.animating.splice(0, 1);
                    if(this.animating.length === 0) {
                        this.nextPage(this.labelNames[this.selectedObject]);
                    }
                }
            }
        }
    }
};

Website.prototype.getSelectedObject = function() {
    //See if list of picked objects has any scene objects in it
    //Can ignore 'base' and anything with label in it
    var name;
    for(var obj=0; obj<this.pickedObjects.length; ++obj) {
        name = this.pickedObjects[obj].object.name;
        if(name.indexOf('base') >= 0 || name.indexOf('Label') >= 0) continue;
        for(var i=0; i<this.labelNames.length; ++i) {
            if(this.labelNames[i] === name) {
                //Return object index
                return i;
            }
        }
    }

    return -1;
};

Website.prototype.nextPage = function(pageName) {
    //Load next page or scene
    window.open(pageName + '.html', '_self');
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