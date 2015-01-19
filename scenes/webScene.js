{

	"metadata": {
		"formatVersion": 3.2,
		"type" : "scene"
	},

	"urlBaseType" : "relativeToHTML",

    "objects": {

		"group" : {
			"position" : [ 0, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround" : {
					"type" : "obj",
					"url" : "models/surround.obj",
					"material" : "grey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"surround2" : {
					"type" : "obj",
					"url" : "models/surround.obj",
					"material" : "grey",
					"position" : [ 30, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				}
			}
		}
    },

    "materials": {
        "grey": {
			"type": "MeshPhongMaterial",
			"parameters": { "color": 16737894, "ambient": 16737894, "specular": 2236962, "shininess": 40, "wrapAround": true, "wrapRGB": [ 0.15, 0.02, 0.01 ] }
        }
    },

	"defaults": {

	}

}