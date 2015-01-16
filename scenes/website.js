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
					"rotation" : [ 0, 0, 0 ],
					"scale"	   : [ 5, 5, 5 ],
					"visible"  : true
				}
			}
		}
    },

    "materials": {
        "grey": {
            "type": "MeshPhongMaterial",
            "parameters": { "color": 6710886 }
        }
    }

}