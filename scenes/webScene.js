{

	"metadata": {
		"formatVersion": 3.2,
		"type" : "scene"
	},

	"urlBaseType" : "relativeToHTML",

    "objects": {

		"topic1" : {
			"position" : [ -300, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround1" : {
					"geometry" : "displayCover",
					"material" : "shinyGrey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"display1" : {
					"geometry" : "displayFront",
					"material" : "research",
					"position" : [ 0, 0, 0],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible" : true
				}
			}
		},


		"topic2" : {
			"position" :[ -200, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround2" : {
						"geometry" : "displayCover",
							"material" : "shinyGrey",
							"position" : [ 0, 0, 0 ],
							"rotation" : [ 1.5, 0, 0 ],
							"scale"	   : [ 15, 15, 15 ],
							"visible"  : true
				},

				"display2" : {
						"geometry" : "displayFront",
							"material" : "projects",
							"position" : [ 0, 0, 0],
							"rotation" : [ 1.5, 0, 0 ],
							"scale"	   : [ 15, 15, 15 ],
							"visible" : true
				}
			}
		},

		"topic3" : {
			"position" : [ -100, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround3" : {
					"geometry" : "displayCover",
						"material" : "shinyGrey",
						"position" : [ 0, 0, 0 ],
						"rotation" : [ 1.5, 0, 0 ],
						"scale"	   : [ 15, 15, 15 ],
						"visible"  : true
				},

				"display3" : {
					"geometry" : "displayFront",
						"material" : "portfolio",
						"position" : [ 0, 0, 0],
						"rotation" : [ 1.5, 0, 0 ],
						"scale"	   : [ 15, 15, 15 ],
						"visible" : true
				}
			}
		},


		"topic4" : {
			"position" :[ 0, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround4" : {
					"geometry" : "displayCover",
						"material" : "shinyGrey",
						"position" : [ 0, 0, 0 ],
						"rotation" : [ 1.5, 0, 0 ],
						"scale"	   : [ 15, 15, 15 ],
						"visible"  : true
				},

				"display4" : {
					"geometry" : "displayFront",
						"material" : "webGL",
						"position" : [ 0, 0, 0],
						"rotation" : [ 1.5, 0, 0 ],
						"scale"	   : [ 15, 15, 15 ],
						"visible" : true
				}
			}
		},

		"topic5" : {
			"position" :[ 100, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround5" : {
					"geometry" : "displayCover",
					"material" : "shinyGrey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"display5" : {
					"geometry" : "displayFront",
					"material" : "traject",
					"position" : [ 0, 0, 0],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible" : true
				}
			}
		},

		"topic6" : {
			"position" : [ 200, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround6" : {
					"geometry" : "displayCover",
					"material" : "shinyGrey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"display6" : {
					"geometry" : "displayFront",
					"material" : "blog",
					"position" : [ 0, 0, 0],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible" : true
				}
			}
		},


		"topic7" : {
			"position" :[ 300, 0, 0 ],
			"rotation" : [ 0, 0, 0 ],
			"scale"	   : [ 1, 1, 1 ],
			"visible"  : true,
			"children" : {

				"surround7" : {
					"geometry" : "displayCover",
					"material" : "shinyGrey",
					"position" : [ 0, 0, 0 ],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible"  : true
				},

				"display7" : {
					"geometry" : "displayFront",
					"material" : "contact",
					"position" : [ 0, 0, 0],
					"rotation" : [ 1.5, 0, 0 ],
					"scale"	   : [ 15, 15, 15 ],
					"visible" : true
				}
			}
		}
    },

	"geometries": {

		"displayCover": {
			"type":	"binary",
			"url":	"models/surround.js"
		},

		"displayFront": {
			"type": "binary",
			"url" : "models/displayFront.js"
		}
	},

    "materials": {
        "shinyGrey": {
			"type": "MeshPhongMaterial",
			"parameters": { "color": 6710886, "ambient": 6710886, "specular": 2236962, "shininess": 40 }
        },

		"basicGrey": {
			"type": "MeshBasicMaterial",
			"parameters": { "color": 6710886 }
		},

		"research": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_research" }
		},

		"projects": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_projects" }
		},

		"portfolio": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_portfolio" }
		},

		"webGL": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_webGL" }
		},

		"traject": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_traject" }
		},

		"blog": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_blog" }
		},

		"contact": {
			"type": "MeshLambertMaterial",
			"parameters": { "color": 16777215, "map": "texture_contact" }
		}

    },

	"textures": {
		"texture_research": {
			"url": "images/research.jpg",
			"anisotropy": 4
		},

		"texture_projects": {
			"url": "images/folder.jpg",
			"anisotropy": 4
		},

		"texture_portfolio": {
			"url": "images/portfolio1.jpg",
			"anisotropy": 4
		},

		"texture_webGL": {
			"url": "images/webGL.jpg",
			"anisotropy": 4
		},

		"texture_traject": {
			"url": "images/traject.jpg",
			"anisotropy": 4
		},

		"texture_blog": {
			"url": "images/blog.jpg",
			"anisotropy": 4
		},

		"texture_contact": {
			"url": "images/contact.jpg",
			"anisotropy": 4
		}
	},

	"defaults": {

	}

}