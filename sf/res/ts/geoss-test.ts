import * as THREE from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Engine } from './engine.js';
import { CharactersModular } from './characters-modular.js';
import { FOUR } from './four.js';
import { THREEx } from './threex.js';
import { PersonMotion } from './engine/motion.js';
var main: Engine.Main;
let Characters = CharactersModular;

function getHorizontalDistance(pos1: THREE.Vector3, pos2: THREE.Vector3) {
	return Math.sqrt( Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.z - pos2.z, 2));
}

$(document).ready(function() {
	Engine.Initialize();
	// Engine.Initialize("Ship");
	main = Engine.main;
	function init() {
		main.start();
		Characters.PersonLoader(function() {
			let playerModel = new Engine.Entity(Characters.getPC("Player") as CharactersModular.Person3D);
			// let playerModel = new Engine.Entity(Characters.getPC("Sidhon") as CharactersModular.Person3D);
			playerModel.Events.Died = function(){
				alert("GAME OVER!");
				init();
				// location.reload(); // reloads the web page
			};
			playerModel.Events.HealthChanged = function(){
				main.HUD.healthBar.update(playerModel.Health);
			};
			main.MainStage.Entities.Add(playerModel);
			(main.Controls.motion as PersonMotion).physicsBody = playerModel.Motion.physicsBody;
			playerModel.Motion = main.Controls.motion as PersonMotion;
			playerModel.Motion.attachPhysics();
			main.world.addBody(playerModel.Motion.physicsBody as CANNON.Body);
			playerModel.Model.visible = false;
			main.Controls.mesh = playerModel.Model;
			main.Motions = [];

			let baddie = new Engine.Entity(Characters.getRandom(-1, 1, -15, "bugbear", "m"));
			baddie.Events.Died = function(){
				alert("Died!");
			};
			main.MainStage.Entities.Add(baddie);


			let testerMan = new Engine.Entity(Characters.getRandom(0, 0, -81, "halforc", "m"));
			testerMan.Model.name = "Sidekick";
			testerMan.Motion.baseSpeed = testerMan.Motion.baseSpeed * 2;
			testerMan.Events.Died = function(){
				alert("Died!");
			};
			main.MainStage.Entities.Add(testerMan);

			//#region add NPCs
			main.MainStage.Entities.AddMesh(Characters.getRandom(3, 0, -82, "drow", "m"));
			main.MainStage.Entities.AddMesh(Characters.getPC("Kevin", 1, 1, -19) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Torque", 0, 1, -20) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Raven", 1, 2, -10) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Ty", 0, 2, -10) as CharactersModular.Person3D);

			main.MainStage.Entities.AddMesh(Characters.getPC("Jasper", 1, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Zenrya", 0, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Falimur", -1, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Shamous", -2, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Namfoodle", -3, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Zora", -4, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Redji", -5, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Bud", -6, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Wickerbeak", -7, 0, -80) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Sidhon", -8, 0, -80) as CharactersModular.Person3D);

			// main.MainStage.Entities.AddMesh(Characters.getPC("Smith", -6, 22, -258) as CharactersModular.Person3D);
			// main.MainStage.Entities.AddMesh(Characters.getPC("Sir Jeffrey", -8, 22, -258) as CharactersModular.Person3D);
			// main.MainStage.Entities.AddMesh(Characters.getPC("Mirage", 5, 2, -80));

			// let miracle = new Engine.Entity(Characters.getPC("Miracle", -1, 2, -80));
			// // main.DebugHelper.addPerson(miracle.Model);
			// main.MainStage.Entities.Add(miracle);
			// main.onRenderFcts.push(function(delta: number, now: number){
			// 	miracle.Motion.face(playerModel);
			// 	// miracle.Motion.velocity.z = 2;
			// });
			//#endregion

			// main.DebugHelper.addPerson(playerModel.Model);

			//#region low-level AI Tests
			// Follower test
			main.onRenderFcts.push(function(delta: number, now: number){
				testerMan.Motion.speed = 0;
				let easeUp = 3;
				let socialDistance = 1.5;

				if(testerMan.Motion.position.distanceTo(playerModel.Model.position) < 100) {
					let dis = getHorizontalDistance(testerMan.Motion.position, playerModel.Model.position);
					testerMan.Motion.speed = dis > easeUp? testerMan.Motion.baseSpeed : Math.max(dis - socialDistance, 0) * testerMan.Motion.baseSpeed;
					testerMan.Motion.face(playerModel);
					testerMan.Motion.walk()
					if(dis <= socialDistance) {
						testerMan.Motion.speed = -testerMan.Motion.baseSpeed;
					}
					// check if need to jump
					if (dis > easeUp && playerModel.Model.position.y - testerMan.Motion.position.y > 0.2) {
						testerMan.Motion.jump();
					}
				}
			});

			// // Baddie test
			// main.onRenderFcts.push(function(delta: number, now: number){
			// 	let me = baddie;
			// 	let target = playerModel.Model;
			// 	let visionDistance = 20;
			// 	me.Motion.speed = 0;
			// 	let easeUp = 1.5;
			// 	let socialDistance = 0.5;

			// 	if(me.Motion.position.distanceTo(target.position) < visionDistance) {
			// 		let dis = getHorizontalDistance(me.Motion.position, target.position);
			// 		me.Motion.speed = dis > easeUp? me.Motion.baseSpeed : Math.max(dis - socialDistance, 0) * me.Motion.baseSpeed;
			// 		me.Motion.face(playerModel);
			// 		// me.Motion.walk()
			// 		if(dis <= socialDistance) {
			// 			me.Motion.speed = -me.Motion.baseSpeed;
			// 			let targetEnt = main.Entities.GetByModelID(target.uuid);
			// 			if (targetEnt)
			// 			{
			// 				attack(me, targetEnt);
			// 			}
			// 		}
			// 		// check if need to jump
			// 		if (dis > easeUp && target.position.y - me.Motion.position.y > 0.2) {
			// 			me.Motion.jump();
			// 		}
			// 	}
			// });
			//#endregion
			main.HUD.setEntity(main.Entities.GetByModelID(playerModel._Model.uuid) as Engine.Entity);
		}, true);

		main.Sky.hemiLight.intensity = 0.8;
		main.Sky.sun.light.intensity = 0.7;
		// main.Controls.motion.position.set(0, 1,-85);
		(main.Controls.motion as Engine.PlayerMotion).baseSpeed = (main.Controls.motion as Engine.PlayerMotion).baseSpeed * 2;
		main.Controls.motion.rotation.y += Math.PI;
		main.Controls.getObject().rotation.y += Math.PI;



		// create geometric objects
		let mapScale = new THREE.Vector3(400, 400, 400);
		let map = getTestTerrain(main, new THREE.Vector3(0,0,0), mapScale);
		main.Scene.add(map);
		// let paros = getParos(main, new THREE.Vector3(-1.28,0,-0.5), mapScale);
		let paros = getParos(main, new THREE.Vector3(-1.28,0,-0.5), mapScale);
		main.Scene.add(paros);

		let sea = new Sea(main);
		sea.mesh.position.y -= 2;
		main.Scene.add(sea.mesh);
		main.onRenderFcts.push(function(delta: number, now: number){
			sea.uniforms.uTime.value = now * 0.2;
		});

		// main.Scene.add(loadTerrain(main, new THREE.Vector3(20, 0, 0), '/res/models/vehicles/ship_light.gltf'));

		// main.Scene.add(loadTerrain(main, new THREE.Vector3(), '/res/models/vehicles/airship.glb'));

		// Test City render
		// let amarillo = loadTerrain(main, new THREE.Vector3(-0.13991, 0, -0.5645).multiplyScalar(mapScale.x), '/res/models/architecture/amarillo.glb');
		// amarillo.scale.multiplyScalar(0.01);
		// let amarillo = loadTerrain(main, new THREE.Vector3(-0.13991, 0, -0.5645).multiplyScalar(mapScale.x), new THREE.Vector3(1, 1, 1), '/res/models/architecture/amarillo.glb');
		// // amarillo.position.y += 0.1;
		// main.Scene.add(amarillo);


		// transform objects
		new THREEx.WindowResize(main.renderer, main.Camera);
		main.update();
	}

	function getTestTerrain(main: Engine.Main, position: THREE.Vector3, scale: THREE.Vector3) {
		return loadTerrain(main, position, scale, '/res/models/terrain/geoss.glb', false);
	}

	function getParos(main: Engine.Main, position: THREE.Vector3, scale: THREE.Vector3) {
		return loadTerrain(main, position, scale, '/res/models/terrain/paros.glb', true,
		function(board: THREE.Object3D) {
			prepareLOD(main, board, position, scale);
		});
	}

	function prepareLOD(main: Engine.Main, board: THREE.Object3D, position: THREE.Vector3, scale: THREE.Vector3) {
		board.scale.copy(scale);
		//lod test
		var lod = new THREE.LOD();

		let subLOD = {
			high: board.getObjectByName("lod_high"),
			mid: board.getObjectByName("lod_mid"),
			low: board.getObjectByName("lod_low")
		}
		// lod.position.copy(subLOD.high.position);
		lod.position.copy(position);
		for( var i = 0; i < 3; i++ ) {

			/** The distance interval at which LODs are changed */
			let dis = scale.x * (i);
			switch (i) {
				case 0:
					// High detail
					if (subLOD.high) {
						subLOD.high.traverse(function (node)
						{
							//@ts-ignore
							if ( node.isMesh ) {
								main.Collidable.push(node);
								addToPhysics(node, position, scale, true);
							};
						});
						subLOD.high.position.set(0, 0, 0);
						lod.addLevel( subLOD.high, dis );
					}
					break;
				case 1:
					// Mid detail
					if (subLOD.mid) {
						subLOD.mid.position.set(0, 0, 0);
						lod.addLevel( subLOD.mid, dis );
					}
					break;
				case 2:
					// Low detail
					if (subLOD.low) {
						subLOD.low.position.set(0, 0, 0);
						lod.addLevel( subLOD.low, dis );
					}
					break;
				default:
					break;
			}

		}

		board.add( lod );
		//end lod test
	};

	init();

	$("#warp-test").on("click", () =>
	{
		teleport();
	})
});

/**
 * Moves the player to the specified position
 * @param x destination x coordinate
 * @param y destination y coordinate
 * @param z destination z coordinate
 */
export function teleport(x: number = 0, y: number = 1, z: number = 0)
{
	main.Controls.motion.physicsBody?.position.set(x, y, z);
}

/**
 * A placeholder attack function for pre-alpha
 * @param attacker The entity making the attack
 * @param target The entity being attacked
 */
function attack(attacker: Engine.Entity, target: Engine.Entity) {
	// target.Health.damage(2);
	target.Health.damage(20);
};

/**
 * Load a GLTF file, initialize it for terrain collisions, and return a THREE.Object3D containing the mesh(es)
 * @param main main instance of the engine
 * @param position the coordinates at which the loaded model should be placed
 * @param file path to model file
 * @param hasLOD indicate whether level of detail is present in model
 * @param callback optional function to execute after load has finished
 */
function loadTerrain(main: Engine.Main, position: THREE.Vector3, scale: THREE.Vector3, file: string, hasLOD = false, callback?: any) {
	// declare the container for the loaded mesh
	var board = new THREE.Object3D();
	// declare the loader object that will do the loading
	var loader = new GLTFLoader();
	// do the actual loading
	loader.load( file, ( gltf ) => {
		board.add(gltf.scene);
		gltf.scene.traverse( function ( node ) {
			applyTransforms(node);
			//@ts-ignore
			if (node.isMesh && !hasLOD) {
				main.Collidable.push(node);
				addToPhysics(node, position, scale, hasLOD);
			};

			//@ts-ignore
			if (node.material != undefined && node.material.map != undefined)
			{
				let mat = (node as THREE.Mesh).material as THREE.MeshBasicMaterial;
				(mat.map as THREE.Texture).minFilter = THREE.LinearFilter;
				(mat.map as THREE.Texture).magFilter = THREE.LinearFilter;
				// (mat.map as THREE.Texture).minFilter = THREE.NearestFilter;
				// (mat.map as THREE.Texture).magFilter = THREE.NearestFilter;
				mat.alphaTest = 0.5;
				mat.transparent = true;
				node.receiveShadow = true;
				node.castShadow = true;
			}

		});
		if (callback) {
			callback(board);
		}
	});
	if (!hasLOD) {
		board.scale.copy(scale);
	}
	board.position.copy(position);
	return board;
}

function applyTransforms(node: THREE.Object3D, baseMatrix?: THREE.Matrix4)
{
	//#region "apply" rotation, position, scale, etc.
	node.updateMatrix();
	let clonedMatrix = node.matrix.clone();
	if (baseMatrix) {
		clonedMatrix = clonedMatrix.multiply(baseMatrix);
	}
	//@ts-ignore
	if (node.geometry) {
		//@ts-ignore
		node.geometry.applyMatrix4( clonedMatrix );
	}
	else
	{
		node.traverse(function (child)
		{
			// Make sure the object doesn't call the function on itself and cause infinite recursion
			if (child.name != node.name) {
				applyTransforms(child, clonedMatrix);
			}
		})
	}
	node.applyMatrix4(clonedMatrix);
	node.position.set( 0, 0, 0 );
	node.rotation.set( 0, 0, 0 );
	node.scale.set( 1, 1, 1 );
	node.updateMatrix();
	//#endregion
}

function addToPhysics(obj?: THREE.Object3D, position?: THREE.Vector3, scale?: THREE.Vector3, hasLOD: boolean = false)
{
	let toAdd = obj ? obj : main.Collidable;

	if (Array.isArray(toAdd)) {
		for (let i = 0; i < main.Collidable.length; i++) {
			main.Collidable[i].traverse(addObject3DToPhysics);
		}
	}
	else
	{
		// addObject3DToPhysics(toAdd, position, scale);
		toAdd.traverse(function (node)
		{
			addObject3DToPhysics(node, position, scale, hasLOD);
		});
	}
}

function addObject3DToPhysics(node: THREE.Object3D, position: THREE.Vector3 = node.position, scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1), hasLOD: boolean = false) {
	//@ts-ignore
	if (node.isMesh)
	{
		let vertices: number[] = [];
		let faces: number[] = [];
		let geom = new THREE.Geometry().fromBufferGeometry((node as THREE.Mesh).geometry as THREE.BufferGeometry);

		const geometry = new THREE.Geometry();
		// Get vertices
		if (geom.vertices)
		{
			for (var j = 0; j < geom.vertices.length; ++j)
			{
				vertices.push(geom.vertices[j].x, geom.vertices[j].y, geom.vertices[j].z);
				geometry.vertices.push(geom.vertices[j]);
			}
		}

		// Get faces
		if (geom.faces)
		{
			for (j = 0; j < geom.faces.length; ++j)
			{
				faces.push(geom.faces[j].a, geom.faces[j].b, geom.faces[j].c);
				geometry.faces.push(geom.faces[j]);
			}
		}

		if (faces.length > 0)
		{
			let destPos = hasLOD? new THREE.Vector3((position.x + node.position.x) * scale.x, (position.y + node.position.y) * scale.y, (position.z + node.position.z) * scale.z) : new THREE.Vector3((position.x + node.position.x), (position.y + node.position.y), (position.z + node.position.z));

			var cubeShape: CANNON.Trimesh = new CANNON.Trimesh(vertices, faces);
			cubeShape.setScale(new CANNON.Vec3(scale.x, scale.y, scale.z));

			var cubeBody: CANNON.Body = new CANNON.Body({ mass: 0, shape: cubeShape });
			cubeBody.position.set(destPos.x, destPos.y, destPos.z);
			// cubeBody.addShape(cubeShape);
			cubeBody.computeAABB();
			main.world.addBody(cubeBody);

			// used for debugging collision body positions
			if (false) {
				const material = new THREE.MeshPhongMaterial({ color: 0xffff00, opacity: 0.1, side: THREE.DoubleSide, transparent: true });
				const mesh = new THREE.Mesh(geometry, material);
				// mesh.scale.copy(scale);
				mesh.scale.set(scale.x, scale.y, scale.z);
				console.log(`${node.name}: Collision: position.x: ${position.x}`);
				mesh.position.set(destPos.x, destPos.y, destPos.z);
				main.Scene.add(mesh);
			}
		}
	};
}