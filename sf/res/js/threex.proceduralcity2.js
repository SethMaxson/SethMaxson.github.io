// from @mrdoob http://www.mrdoob.com/lab/javascript/webgl/city/01/

var THREEx = THREEx || {}

THREEx.ProceduralCity	= function(){
	// build the base geometry for each building
	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	// translate the geometry to place the pivot point at the bottom instead of the center
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	// get rid of the bottom face - it is never seen
	geometry.faces.splice( 6, 2 );
	geometry.faceVertexUvs[0].splice( 10, 3 );
	// change UVs for the top face
	// - it is the roof so it wont use the same texture as the side of the building
	// - set the UVs to the single coordinate 0,0. so the roof will be the same color
	//   as a floor row.
	geometry.faceVertexUvs[0][4][0].set( 0, 0 );
	geometry.faceVertexUvs[0][4][1].set( 0, 0 );
	geometry.faceVertexUvs[0][4][2].set( 0, 0 );
	geometry.faceVertexUvs[0][5][0].set( 0, 0 );
	geometry.faceVertexUvs[0][5][1].set( 0, 0 );
	geometry.faceVertexUvs[0][5][2].set( 0, 0 );
	// geometry.faceVertexUvs[0][2][3].set( 0, 0 );


	// buildMesh
	var buildingMesh= new THREE.Mesh( geometry );

	this.createBuilding	= function(){
		return buildingMesh
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		buildingTexture							//
	//////////////////////////////////////////////////////////////////////////////////

	// generate the texture
	var buildingTexture		= new THREE.Texture( generateTextureCanvas() );
	buildingTexture.anisotropy	= renderer.capabilities.getMaxAnisotropy();
	buildingTexture.needsUpdate	= true;

	this.getBuildingTexture = function(){
		return buildingTexture;
	}


	//////////////////////////////////////////////////////////////////////////////////
	//		lamp								//
	//////////////////////////////////////////////////////////////////////////////////

	var lampGeometry= new THREE.CubeGeometry( 0.1, 3, 0.1)
	var lampMesh	= new THREE.Mesh(lampGeometry)

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// var nBlockX	= 10
	// var nBlockZ	= 10
	var nBlockX	= 3
	var nBlockZ	= 3
	var blockSizeX	= 50
	var blockSizeZ	= 50
	// var blockDensity= 20
	var blockDensity= 10
	var roadW	= 8
	var roadD	= 8
	var buildingMaxW= 15
	var buildingMaxD= 15
	var sidewalkW	= 2
	var sidewalkH	= 0.1
	var sidewalkD	= 2
	var lampDensityW= 4
	var lampDensityD= 4
	var lampH	= 5

	this.createSquareGround	= function(){
		// var geometry	= new THREE.PlaneGeometry( 1, 1, 1 );
		// var material	= new THREE.MeshLambertMaterial({
		// 	color	: 0x222222
		// })
		// var ground	= new THREE.Mesh(geometry, material)
		// ground.lookAt(new THREE.Vector3(0,1,0))
		// ground.scale.x	= (nBlockZ)*blockSizeZ
		// ground.scale.y	= (nBlockX)*blockSizeX
		// return ground

		var tronGrid = new THREE.Group();
		var intensity = 0.01;
		var h	= (nBlockZ)*blockSizeZ
		var w	= (nBlockX)*blockSizeX
		var rectLight = new THREE.RectAreaLight( 0xdd22ff, intensity, w, h );
		rectLight.lookAt( 0, 0, 0 );
		rectLight.rotation.x = -Math.PI / 2;
		tronGrid.add( rectLight );

		var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({color: 0xdd22ff,}) );
		rectLightMesh.scale.x = rectLight.width;
		rectLightMesh.scale.y = rectLight.height;
		rectLight.position.y = -0.5;
		rectLight.add( rectLightMesh );

		// var rectLightGrid = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshLambertMaterial({color: 0x6600aa, transparent: true, }) );
		var rectLightGrid = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshLambertMaterial({color: 0x110066, transparent: true, }) );
		rectLightGrid.receiveShadow = true;
		rectLightGrid.scale.x = rectLight.width;
		rectLightGrid.scale.y = rectLight.height;
		rectLightGrid.material.alphaMap = new THREE.TextureLoader().load("/img/textures/gridBump.png");
		rectLightGrid.material.alphaMap.wrapS = THREE.RepeatWrapping;
		rectLightGrid.material.alphaMap.wrapT = THREE.RepeatWrapping;
		rectLightGrid.material.alphaMap.repeat.set(w, h);
		rectLightGrid.rotation.x = -Math.PI / 2;
		tronGrid.add( rectLightGrid );

		return tronGrid;
	}
	this.createSquareLamps	= function(){
		var object3d	= new THREE.Object3D()

		var lampGeometry= new THREE.CubeGeometry(1,1,1)
		lampGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
		var lampMesh	= new THREE.Mesh(lampGeometry)

		var lightsGeometry	= new THREE.Geometry();
		var lampsGeometry	= new THREE.Geometry();
		for( var blockZ = 0; blockZ < nBlockZ; blockZ++){
			for( var blockX = 0; blockX < nBlockX; blockX++){
				// lampMesh.position.x	= 0
				// lampMesh.position.z	= 0
				function addLamp(position){
					//////////////////////////////////////////////////////////////////////////////////
					//		light								//
					//////////////////////////////////////////////////////////////////////////////////

					var lightPosition	= position.clone()
					lightPosition.y		= sidewalkH+lampH+0.1
					// set position for block
					lightPosition.x		+= (blockX+0.5-nBlockX/2)*blockSizeX
					lightPosition.z		+= (blockZ+0.5-nBlockZ/2)*blockSizeZ

					lightsGeometry.vertices.push(lightPosition );
					//////////////////////////////////////////////////////////////////////////////////
					//		head								//
					//////////////////////////////////////////////////////////////////////////////////

					// set base position
					lampMesh.position.copy(position)
					lampMesh.position.y	= sidewalkH+lampH
					// add poll offset
					lampMesh.scale.set(0.2,0.2,0.2)
					// colorify
					for(var i = 0; i < lampMesh.geometry.faces.length; i++ ) {
						lampMesh.geometry.faces[i].color.set('white' );
					}
					// set position for block
					lampMesh.position.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					lampMesh.position.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					// merge it with cityGeometry - very important for performance
					lampMesh.updateMatrix();
					lampsGeometry.merge(lampMesh.geometry, lampMesh.matrix);

					//////////////////////////////////////////////////////////////////////////////////
					//		poll								//
					//////////////////////////////////////////////////////////////////////////////////

					// set base position
					lampMesh.position.copy(position)
					lampMesh.position.y	+= sidewalkH
					// add poll offset
					lampMesh.scale.set(0.1,lampH,0.1)
					// colorify
					for(var i = 0; i < lampMesh.geometry.faces.length; i++ ) {
						lampMesh.geometry.faces[i].color.set('grey' );
					}
					// set position for block
					lampMesh.position.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					lampMesh.position.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					// merge it with cityGeometry - very important for performance
					lampMesh.updateMatrix();
					lampsGeometry.merge(lampMesh.geometry, lampMesh.matrix);

					//////////////////////////////////////////////////////////////////////////////////
					//		base								//
					//////////////////////////////////////////////////////////////////////////////////
					// set base position
					lampMesh.position.copy(position)
					lampMesh.position.y	+= sidewalkH
					// add poll offset
					lampMesh.scale.set(0.12,0.4,0.12)
					// colorify
					for(var i = 0; i < lampMesh.geometry.faces.length; i++ ) {
						// lampMesh.geometry.faces[i].color.set('maroon' );
						lampMesh.geometry.faces[i].color.set(0x222222);
					}
					// set position for block
					lampMesh.position.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					lampMesh.position.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					// merge it with cityGeometry - very important for performance
					lampMesh.updateMatrix();
					lampsGeometry.merge(lampMesh.geometry, lampMesh.matrix);
				}
				// south
				var position	= new THREE.Vector3()
				for(var i = 0; i < lampDensityW+1; i++){
					position.x	= (i/lampDensityW-0.5)*(blockSizeX-roadW-sidewalkW)
					position.z	= -0.5*(blockSizeZ-roadD-sidewalkD)
					addLamp(position)
				}
				// north
				for(var i = 0; i < lampDensityW+1; i++){
					position.x	= (i/lampDensityW-0.5)*(blockSizeX-roadW-sidewalkW)
					position.z	= +0.5*(blockSizeZ-roadD-sidewalkD)
					addLamp(position)
				}
				// east
				for(var i = 1; i < lampDensityD; i++){
					position.x	= +0.5*(blockSizeX-roadW-sidewalkW)
					position.z	= (i/lampDensityD-0.5)*(blockSizeZ-roadD-sidewalkD)
					addLamp(position)
				}
				// west
				for(var i = 1; i < lampDensityD; i++){
					position.x	= -0.5*(blockSizeX-roadW-sidewalkW)
					position.z	= (i/lampDensityD-0.5)*(blockSizeZ-roadD-sidewalkD)
					addLamp(position)
				}


			}
		}

		// build the lamps Mesh
		var material	= new THREE.MeshLambertMaterial({
			vertexColors	: THREE.VertexColors
		});
		var lampsMesh	= new THREE.Mesh(lampsGeometry, material );
		object3d.add(lampsMesh)

		//////////////////////////////////////////////////////////////////////////////////
		//		comment								//
		//////////////////////////////////////////////////////////////////////////////////

		var texture = new THREE.TextureLoader().load("/img/textures/lensflare2_alpha.png");
		var material	= new THREE.PointsMaterial({
			map		: texture,
			size		: 3,
			transparent	: true,
			depthWrite: false,
			// depthTest: false,
			// alphaTest: 0.2,
			color: 0xff00cc
		});
		var lightParticles	= new THREE.Points( lightsGeometry, material );
		lightParticles.sortParticles = true;
		object3d.add( lightParticles );

		return object3d
	}
	this.createSquareCarLights	= function(){
		var carLightsDensityD	= 4
		var carW		= 1
		var carH		= 2

		var geometry	= new THREE.Geometry();
		var position	= new THREE.Vector3()
		position.y	= carH/2

		var colorFront		= new THREE.Color('white')
		var colorBack		= new THREE.Color('red')

		for( var blockX = 0; blockX < nBlockX; blockX++){
			for( var blockZ = 0; blockZ < nBlockZ; blockZ++){
				function addCarLights(position){
					//////////////////////////////////////////////////////////////////////////////////
					//		comment								//
					//////////////////////////////////////////////////////////////////////////////////

					var positionL	= position.clone()
					positionL.x	+= -carW/2
					// set position for block
					positionL.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					positionL.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					geometry.vertices.push( positionL );
					geometry.colors.push( colorFront )

					var positionR	= position.clone()
					positionR.x	+= +carW/2
					// set position for block
					positionR.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					positionR.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					geometry.vertices.push( positionR );
					geometry.colors.push( colorFront )

					//////////////////////////////////////////////////////////////////////////////////
					//		comment								//
					//////////////////////////////////////////////////////////////////////////////////
					position.x	= -position.x

					var positionL	= position.clone()
					positionL.x	+= -carW/2
					// set position for block
					positionL.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					positionL.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					geometry.vertices.push( positionL );
					geometry.colors.push( colorBack )

					var positionR	= position.clone()
					positionR.x	+= +carW/2
					// set position for block
					positionR.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
					positionR.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ
					geometry.vertices.push( positionR );
					geometry.colors.push( colorBack )
				}
				// east
				for(var i = 0; i < carLightsDensityD+1; i++){
					position.x	= +0.5*blockSizeX-roadW/4
					position.z	= (i/carLightsDensityD-0.5)*(blockSizeZ-roadD)
					addCarLights(position)
				}
			}
		}
		//////////////////////////////////////////////////////////////////////////////////
		//		comment								//
		//////////////////////////////////////////////////////////////////////////////////

		var object3d	= new THREE.Object3D

		var texture	= THREE.ImageUtils.loadTexture( "/img/textures/lensflare2_alpha.png" );
		var material	= new THREE.PointsMaterial({
			map		: texture,
			size		: 6,
			transparent	: true,
			vertexColors	: THREE.VertexColors
		});
		var particles	= new THREE.Points( geometry, material );
		particles.sortParticles = true;
		object3d.add(particles)

		return object3d
	}
	this.createSquareSideWalks	= function(){
		var buildingMesh= this.createBuilding()
		var sidewalksGeometry= new THREE.Geometry();
		const w = blockSizeX-roadW;
		const h = blockSizeZ-roadD;
		for( var blockZ = 0; blockZ < nBlockZ; blockZ++){
			for( var blockX = 0; blockX < nBlockX; blockX++){
				// set position
				buildingMesh.position.x	= (blockX+0.5-nBlockX/2)*blockSizeX
				buildingMesh.position.z	= (blockZ+0.5-nBlockZ/2)*blockSizeZ

				buildingMesh.scale.x	= w
				buildingMesh.scale.y	= sidewalkH
				buildingMesh.scale.z	= h

				// merge it with cityGeometry - very important for performance
				buildingMesh.updateMatrix();
				sidewalksGeometry.merge(buildingMesh.geometry, buildingMesh.matrix);
			}
		}
		// build the mesh
		// var material	= new THREE.MeshLambertMaterial({
		// 	color	: 0x444444
		// });

		var material	= new THREE.MeshLambertMaterial({
			color	: 0x444444,
			color	: 0x0066aa,
			// transparent: true,
			// emissive: 0x0066aa,
			// emissiveIntensity:2,
			// emissiveMap: new THREE.TextureLoader().load('/img/textures/gridBump.png'),
			map: new THREE.TextureLoader().load("/img/textures/gridBump.png"),
		});

		var sidewalksMesh	= new THREE.Mesh(sidewalksGeometry, material );
		sidewalksMesh.receiveShadow = true;
		sidewalksMesh.material.map.wrapS = THREE.RepeatWrapping;
		sidewalksMesh.material.map.wrapT = THREE.RepeatWrapping;
		sidewalksMesh.material.map.repeat.set(w, h);
		return sidewalksMesh;
	}
	this.createSquareBuildings	= function(){
		// var buildingMesh= this.createBuilding()
		// var cityGeometry= new THREE.Geometry();
		// for( var blockZ = 0; blockZ < nBlockZ; blockZ++){
		// 	for( var blockX = 0; blockX < nBlockX; blockX++){
		// 		for( var i = 0; i < blockDensity; i++){
		// 			// set position
		// 			buildingMesh.position.x	= (Math.random()-0.5)*(blockSizeX-buildingMaxW-roadW-sidewalkW)
		// 			buildingMesh.position.z	= (Math.random()-0.5)*(blockSizeZ-buildingMaxD-roadD-sidewalkD)

		// 			// add position for the blocks
		// 			buildingMesh.position.x	+= (blockX+0.5-nBlockX/2)*blockSizeX
		// 			buildingMesh.position.z	+= (blockZ+0.5-nBlockZ/2)*blockSizeZ

		// 			// put a random scale
		// 			buildingMesh.scale.x	= Math.min(Math.random() * 5 + 10, buildingMaxW);
		// 			buildingMesh.scale.y	= (Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
		// 			buildingMesh.scale.z	= Math.min(buildingMesh.scale.x, buildingMaxD)

		// 			this.colorifyBuilding(buildingMesh)

		// 			// merge it with cityGeometry - very important for performance
		// 			buildingMesh.updateMatrix();
		// 			cityGeometry.merge(buildingMesh.geometry, buildingMesh.matrix);
		// 		}
		// 	}
		// }

		// // build the city Mesh
		// var material	= new THREE.MeshLambertMaterial({
		// 	map		: buildingTexture,
		// 	vertexColors	: THREE.VertexColors
		// });
		// var cityMesh	= new THREE.Mesh(cityGeometry, material );
		// return cityMesh







		var buildingMesh= this.createBuilding()
		var cityGeometry= new THREE.Geometry();
		const adjBlockSizeX = blockSizeX - (sidewalkW*2) - roadW;
		const adjBlockSizeZ = blockSizeZ - (sidewalkD*2) - roadD;
		const minBuildingHeight = 20;
		const maxBuildingHeight = 80;
		const blockWidthInBuildings = 5;
		const blockDepthInBuildings = 5;
		const averageBuildingWidth = adjBlockSizeX/blockWidthInBuildings;
		const averageBuildingDepth = adjBlockSizeZ/blockDepthInBuildings;
		// const textures = ['map', 'emissiveMap', 'specularMap'];

		for( var blockZ = 0; blockZ < nBlockZ; blockZ++){
			for( var blockX = 0; blockX < nBlockX; blockX++){
				for (let i = 0; i < blockDepthInBuildings; i++) {
					for (let j = 0; j < blockWidthInBuildings; j++) {
						const height=Math.floor(Math.random() * (maxBuildingHeight - minBuildingHeight + 1) + minBuildingHeight);
						const width= averageBuildingWidth - (Math.floor(Math.random() * 2));
						const depth= averageBuildingDepth - (Math.floor(Math.random() * 2));


						buildingMesh.position.x	= averageBuildingWidth/2;
						buildingMesh.position.z	= averageBuildingDepth/2;

						buildingMesh.position.x += j * averageBuildingWidth;
						buildingMesh.position.z += i * averageBuildingDepth;

						buildingMesh.position.x	+= (blockX-nBlockX/2)*blockSizeX;
						buildingMesh.position.x += sidewalkW + roadW/2;

						buildingMesh.position.z	+= (blockZ-nBlockZ/2)*blockSizeZ;
						buildingMesh.position.z += sidewalkD + roadD/2;

						// put a random scale
						buildingMesh.scale.x = width;
						// buildingMesh.scale.y = (Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
						buildingMesh.scale.y = height;
						buildingMesh.scale.z = depth;

						this.colorifyBuilding(buildingMesh)

						// merge it with cityGeometry - very important for performance
						buildingMesh.updateMatrix();
						cityGeometry.merge(buildingMesh.geometry, buildingMesh.matrix);
					}
				}
			}
		}

		// build the city Mesh
		var material	= new THREE.MeshLambertMaterial({
			map		: buildingTexture,
			side: THREE.FrontSide,
			vertexColors	: THREE.VertexColors
		});

		var cityMesh	= new THREE.Mesh(cityGeometry, material );
		return cityMesh
	}

	this.createSquareCity	= function(){
		var object3d		= new THREE.Object3D()

		// var carLightsMesh	= this.createSquareCarLights()
		// object3d.add(carLightsMesh)

		var lampsMesh		= this.createSquareLamps()
		object3d.add(lampsMesh)

		var sidewalksMesh	= this.createSquareSideWalks()
		object3d.add(sidewalksMesh)

		var buildingsMesh	= this.createSquareBuildings()
		object3d.add(buildingsMesh)

		var groundMesh	= this.createSquareGround()
		object3d.add(groundMesh)

		return object3d
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	this.createMrDoobCity	= function(){
		var buildingMesh= this.createBuilding()
		var cityGeometry= new THREE.Geometry();
		for( var i = 0; i < 20000; i ++ ){
			// put a random position
			buildingMesh.position.x	= Math.floor( Math.random() * 200 - 100 ) * 10;
			buildingMesh.position.z	= Math.floor( Math.random() * 200 - 100 ) * 10;
			// put a random rotation
			buildingMesh.rotation.y	= Math.random()*Math.PI*2;

			// put a random scale
			buildingMesh.scale.x	= Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
			buildingMesh.scale.y	= (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
			buildingMesh.scale.z	= buildingMesh.scale.x

			this.colorifyBuilding(buildingMesh)
			// merge it with cityGeometry - very important for performance
			buildingMesh.updateMatrix();
			cityGeometry.merge(buildingMesh.geometry, buildingMesh.matrix);
		}
		// build the mesh
		var material	= new THREE.MeshLambertMaterial({
			map		: buildingTexture,
			vertexColors	: THREE.VertexColors
		});
		var cityMesh	= new THREE.Mesh(cityGeometry, material );
		return cityMesh
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// base colors for vertexColors. light is for vertices at the top, shadow is for the ones at the bottom
	var light	= new THREE.Color( 0xffffff )
	var shadow	= new THREE.Color( 0x303050 )
	this.colorifyBuilding	= function(buildingMesh){
		// establish the base color for the buildingMesh
		var value	= 1 - Math.random() * Math.random();
		var baseColor	= new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
		// set topColor/bottom vertexColors as adjustement of baseColor
		var topColor	= baseColor.clone().multiply( light );
		var bottomColor	= baseColor.clone().multiply( shadow );
		// set .vertexColors for each face
		var geometry	= buildingMesh.geometry;
		// for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
		// 	if ( j === 2 ) {
		// 		// set face.vertexColors on root face
		// 		geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
		// 	} else {
		// 		// set face.vertexColors on sides faces
		// 		geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
		// 	}
		// }
		geometry.faces[0].vertexColors = [ topColor, bottomColor, topColor ]
		geometry.faces[1].vertexColors = [ bottomColor, bottomColor, topColor ]
		geometry.faces[2].vertexColors = [ topColor, bottomColor, topColor ]
		geometry.faces[3].vertexColors = [ bottomColor, bottomColor, topColor ]
		geometry.faces[4].vertexColors = [ bottomColor, bottomColor, bottomColor ]
		geometry.faces[5].vertexColors = [ bottomColor, bottomColor, bottomColor ]
		geometry.faces[6].vertexColors = [ topColor, bottomColor, topColor ]
		geometry.faces[7].vertexColors = [ bottomColor, bottomColor, topColor ]
		geometry.faces[8].vertexColors = [ topColor, bottomColor, topColor ]
		geometry.faces[9].vertexColors = [ bottomColor, bottomColor, topColor ]
	}

	return

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////


	function generateTextureCanvas(){
		// build a small canvas 32x64 and paint it in white
		var canvas	= document.createElement( 'canvas' );
		canvas.width	= 32;
		canvas.height	= 64;
		var context	= canvas.getContext( '2d' );
		// plain it in white
		context.fillStyle	= '#ffffff';
		context.fillRect( 0, 0, 32, 64 );
		// draw the window rows - with a small noise to simulate light variations in each room
		for( var y = 2; y < 64; y += 2 ){
			for( var x = 0; x < 32; x += 2 ){
				var value	= Math.floor( Math.random() * 64 );
				context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
				context.fillRect( x, y, 2, 1 );
			}
		}

		// build a bigger canvas and copy the small one in it
		// This is a trick to upscale the texture without filtering
		var canvas2	= document.createElement( 'canvas' );
		canvas2.width	= 512;
		canvas2.height	= 1024;
		var context	= canvas2.getContext( '2d' );
		// disable smoothing
		context.imageSmoothingEnabled		= false;
		context.webkitImageSmoothingEnabled	= false;
		context.mozImageSmoothingEnabled	= false;
		// then draw the image
		context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
		// return the just built canvas2
		return canvas2;
	}
}