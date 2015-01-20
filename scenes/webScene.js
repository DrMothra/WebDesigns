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
					"geometry" : "display",
					"material" : "grey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"man_clone_1" : {
					"geometry" : "man",
					"material" : "grey",
					"position" : [ 2.5, -10, -25 ],
					"rotation" : [ 0, 0, 0 ],
					"scale"	   : [ 0.2, 0.2, 0.2 ],
					"visible"  : true
				},

				"surround2" : {
					"geometry" : "display",
					"material" : "grey",
					"position" : [ 20, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"surround3" : {
					"geometry" : "display",
					"material" : "grey",
					"position" : [ 40, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				}
			}
		}
    },

	"geometries": {

		"display": {
			"type":	"binary",
			"url":	"models/surround.js"
		},

		"man": {
			"type": "binary",
			"url" : "models/Male02_bin.js"
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