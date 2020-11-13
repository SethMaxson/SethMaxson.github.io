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
	Engine.Initialize("");
	// Engine.Initialize("Ship");
	main = Engine.main;
	function init() {
		Characters.PersonLoader(function() {
			let playerModel = new Engine.Entity(Characters.getPC("Player", 0, 0, 0));
			// let playerModel = new Engine.Entity(Characters.getPC("Sidhon", 0, 0, 0));
			playerModel.Events.Died = function(){
				alert("GAME OVER!");
			};
			playerModel.Events.HealthChanged = function(){
				main.HUD.healthBar.update(playerModel.Health);
			};
			main.MainStage.Entities.Add(playerModel);
			playerModel.Motion = main.Controls.motion as PersonMotion;
			playerModel.Model.visible = false;
			main.Controls.mesh = playerModel.Model;
			main.Motions = [];

			main.MainStage.Entities.AddMesh(Characters.getPC("Kevin", 1, 1, -19) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Torque", 0, 1, -20) as CharactersModular.Person3D);

			let baddie = new Engine.Entity(Characters.getRandom(-1, 1, -15, "bugbear", "m"));
			baddie.Events.Died = function(){
				alert("Died!");
			};
			main.MainStage.Entities.Add(baddie);


			let testerMan = new Engine.Entity(Characters.getRandom(0, 2, -81, "halforc", "m"));
			testerMan.Model.name = "Sidekick";
			testerMan.Motion.baseSpeed = testerMan.Motion.baseSpeed * 2;
			testerMan.Events.Died = function(){
				alert("Died!");
			};
			main.MainStage.Entities.Add(testerMan);
			main.MainStage.Entities.AddMesh(Characters.getPC("Raven", 1, 2, -10) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Ty", 0, 2, -10) as CharactersModular.Person3D);
			main.MainStage.Entities.AddMesh(Characters.getPC("Jasper", 1, 2, -80) as CharactersModular.Person3D);
			// main.MainStage.Entities.AddMesh(Characters.getPC("Mirage", 5, 2, -80));
			main.MainStage.Entities.AddMesh(Characters.getPC("Zenny", 0, 2, -80) as CharactersModular.Person3D);

			// let miracle = new Engine.Entity(Characters.getPC("Miracle", -1, 2, -80));
			// // main.DebugHelper.addPerson(miracle.Model);
			// main.MainStage.Entities.Add(miracle);
			// main.onRenderFcts.push(function(delta: number, now: number){
			// 	miracle.Motion.face(playerModel);
			// 	// miracle.Motion.velocity.z = 2;
			// });

			main.DebugHelper.addPerson(playerModel.Model);

			// Follower test
			main.onRenderFcts.push(function(delta: number, now: number){
				testerMan.Motion.speed = 0;
				let easeUp = 3;
				let socialDistance = 1.5;

				if(testerMan.Motion.position.distanceTo(playerModel.Model.position) < 100) {
					let dis = getHorizontalDistance(testerMan.Motion.position, playerModel.Model.position);
					testerMan.Motion.speed = dis > easeUp? testerMan.Motion.baseSpeed : Math.max(dis - socialDistance, 0) * testerMan.Motion.baseSpeed;
					testerMan.Motion.face(playerModel);
					// testerMan.Motion.walk()
					if(dis <= socialDistance) {
						testerMan.Motion.speed = -testerMan.Motion.baseSpeed;
					}
					// check if need to jump
					if (dis > easeUp && playerModel.Model.position.y - testerMan.Motion.position.y > 0.2) {
						testerMan.Motion.jump();
					}
				}
			});

			// Baddie test
			main.onRenderFcts.push(function(delta: number, now: number){
				let me = baddie;
				let target = playerModel.Model;
				let visionDistance = 20;
				me.Motion.speed = 0;
				let easeUp = 1.5;
				let socialDistance = 0.5;

				if(me.Motion.position.distanceTo(target.position) < visionDistance) {
					let dis = getHorizontalDistance(me.Motion.position, target.position);
					me.Motion.speed = dis > easeUp? me.Motion.baseSpeed : Math.max(dis - socialDistance, 0) * me.Motion.baseSpeed;
					me.Motion.face(playerModel);
					// me.Motion.walk()
					if(dis <= socialDistance) {
						me.Motion.speed = -me.Motion.baseSpeed;
						let targetEnt = main.Entities.GetByModelID(target.uuid);
						if (targetEnt)
						{
							attack(me, targetEnt);
						}
					}
					// check if need to jump
					if (dis > easeUp && target.position.y - me.Motion.position.y > 0.2) {
						me.Motion.jump();
					}
				}
			});

			main.HUD.setEntity(main.Entities.GetByModelID(playerModel._Model.uuid) as Engine.Entity);
		}, true);

		main.Sky.hemiLight.intensity = 0.8;
		main.Sky.sun.light.intensity = 0.7;
		main.Controls.motion.position.set(0, 1,-85);
		(main.Controls.motion as Engine.PlayerMotion).baseSpeed = (main.Controls.motion as Engine.PlayerMotion).baseSpeed * 2;
		main.Controls.motion.rotation.y += Math.PI;
		main.Controls.getObject().rotation.y += Math.PI;

		function attack(attacker: Engine.Entity, target: Engine.Entity) {
			target.Health.damage(2);
		};



		// create geometric objects
		let mapScale = new THREE.Vector3(400, 400, 400);
		let map = getTestTerrain(main, new THREE.Vector3(0,0.1,0), mapScale);
		map.scale.copy(mapScale);
		main.Scene.add(map);
		let paros = getParos(main, new THREE.Vector3(-1.28,0,-0.5), mapScale);
		main.Scene.add(paros);

		let sea = new Sea(main);
		sea.mesh.position.y -= 2;
		main.Scene.add(sea.mesh);

		// main.Scene.add(loadTerrain(main, new THREE.Vector3(20, 0, 0), '/res/models/vehicles/ship_light.gltf'));

		// main.Scene.add(loadTerrain(main, new THREE.Vector3(), '/res/models/vehicles/airship.glb'));

		// Test City render
		let amarillo = loadTerrain(main, new THREE.Vector3(-0.13991, 0, -0.5645).multiplyScalar(400), '/res/models/architecture/amarillo.glb');
		amarillo.scale.multiplyScalar(0.01);
		amarillo.position.y += 0.1;
		main.Scene.add(amarillo);

		main.onRenderFcts.push(function(delta: number, now: number){
			sea.uniforms.uTime.value = now * 0.2;
		});

		// transform objects
		new THREEx.WindowResize(main.renderer, main.Camera);
		main.update();
	}

	function getTestTerrain(main: Engine.Main, position: THREE.Vector3, scale: THREE.Vector3) {
		return loadTerrain(main, position, '/res/models/terrain/geoss.glb', false,
			function(board: THREE.Object3D){
				if (false) {
					//lod test
					var paros_lod = new THREE.LOD();

					let lodMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
					let subLOD = {
						high: board.getObjectByName("Paros") as THREE.Object3D,
						mid: board.getObjectByName("Paros_Low") as THREE.Object3D
					}
					paros_lod.position.copy(subLOD.high.position);
					for( var i = 0; i < 3; i++ ) {

						var geometry = new THREE.IcosahedronBufferGeometry( 10, 3 - i )

						var mesh = new THREE.Mesh( geometry, lodMat );
						let dis = scale.x * (i);
						switch (i) {
							case 0:
								// High detail
								subLOD.high.position.set(0, 0, 0);
								console.log("High distance: " + dis);
								if (subLOD.high) paros_lod.addLevel( subLOD.high, dis );
								break;
							case 1:
								// Mid detail
								subLOD.mid.position.set(0, 0, 0);
								console.log("Mid distance: " + dis);
								if (subLOD.mid) paros_lod.addLevel( subLOD.mid, dis );
								break;
							case 2:
								// Low detail
								paros_lod.addLevel( mesh, dis );
								break;
							default:
								break;
						}

					}

					board.add( paros_lod );
					//end lod test
				}
			}
		);
	}

	function getParos(main: Engine.Main, position: THREE.Vector3, scale: THREE.Vector3) {
		return loadTerrain(main, position, '/res/models/terrain/paros.glb', true,
		function(board: THREE.Object3D) {
			prepareLOD(main, board, scale, position);
		});
	}

	function loadTerrain(main: Engine.Main, position: THREE.Vector3, file: string, hasLOD = false, callback?: any) {
		// declare the container for the loaded mesh
		var board = new THREE.Object3D();
		// declare the loader object that will do the loading
		var loader = new GLTFLoader();
		// do the actual loading
		loader.load( file, ( gltf ) => {
			board.add(gltf.scene);
			gltf.scene.traverse( function ( node ) {
				//@ts-ignore
				if ( node.isMesh && !hasLOD ) {
					main.Collidable.push(node);
				};
				//@ts-ignore
				if (node.material != undefined && node.material.map != undefined)
				{
					let mat = (node as THREE.Mesh).material as THREE.MeshBasicMaterial;
					(mat.map as THREE.Texture).minFilter = THREE.LinearFilter;
					(mat.map as THREE.Texture).magFilter = THREE.LinearFilter;
					mat.transparent = true;
					node.receiveShadow = true;
					node.castShadow = true;
				}

			});
			if (callback) {
				callback(board);
			}
		} );
		board.position.copy(position);
		return board;
	}

	function prepareLOD(main: Engine.Main, board: THREE.Object3D, scale: THREE.Vector3, position: THREE.Vector3) {
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

	$("#warp-test").click(() =>
	{
		teleport();
	})
});

export function teleport(x: number = 0, y: number = 1, z: number = 0)
{
	main.Controls.motion.position.set(x, y, z);
}