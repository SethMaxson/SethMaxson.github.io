import * as THREE from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Characters } from './characters.js';
import { Engine } from './engine.js';
import { main, Entity } from './engine/engine.js';
import { Stage } from './engine/stage.js';

declare function randomize(Array: any): any;

/**
* Interface for the JSON structure of a chunk
*/
interface chunkMapJSON
{
	size: { width: number, height: number },
	chunks: string[][]
}

/**
* Interface for the JSON structure of a chunk
*/
interface chunkJSON
{
	base: chunkModel,
	environment: environmentData,
	setDressing: chunkModel[],
	entities: entityNode[]
}

/**
* JSON structure environment options
*/
interface environmentData
{
	hasSea: boolean,
	seaLevel?: number
}

/**
* JSON structure of a model
*/
interface chunkModel
{
	path: string,
	position?: vec3,
	scale?: vec3,
	rotation?: vec3
}

interface entityNode
{
	name: string;
	position: vec3;
};

/**
* Basically a Vector3
*/
interface vec3
{
	x: number;
	y: number;
	z: number;
};

// export const chunkScale = 100;
export const chunkScale = 10;
export const viewRadius = 2;

export class ChunkLoader
{
	private personLoaderReady: boolean = false;
	promise: JQuery.Promise<any>;
	engineInstance: Engine.Main;
	constructor(main: Engine.Main)
	{
		this.engineInstance = main;
		let prom = $.Deferred((def) => {
			Characters.PersonLoader(() => { this.personLoaderReady = true; def.resolve(); }, true );
		});
		this.promise = prom.promise();
		// Characters.PersonLoader(() => { this.personLoaderReady = true; this.promise.resolve(); } );
	};
	/**
	* load an entity model/scene
	*/
	getPerson(name: string, x: number, y: number, z: number, refrainFromAddingToMainStage: boolean = false): void|Engine.Entity
	{
		let entity: entityNode = {
			name: name,
			position: {
				x: x,
				y: y,
				z: z
			}
		};
		// this.promise.then(() =>
		// {
			let person = Characters.getPC(entity.name, entity.position.x, entity.position.y, entity.position.z);
			if (person)
			{
				let ent = new Engine.Entity(person);
				if (!refrainFromAddingToMainStage) {
					this.engineInstance.MainStage.Entities.Add(ent);
				};
				return ent;
			}
			else
			{
				console.log(`Could not find definition for person "${entity.name}".`)
			}
		// });
	}
	/**
	* load a terrain model/scene
	*/
	loadTerrain(position: THREE.Vector3, file: string, callback?: {(board: THREE.Object3D): void}) {
		// declare the container for the loaded mesh
		var board = new THREE.Object3D();
		// declare the loader object that will do the loading
		var loader = new GLTFLoader();
		// do the actual loading
		loader.load( file, ( gltf ) => {
			board.add(gltf.scene);
			gltf.scene.traverse((node0) =>
			{
				let node = node0 as THREE.Mesh;
				if ( node.isMesh ) {
					this.engineInstance.Collidable.push(node);

					if (node.material != undefined) {
						node.receiveShadow = true;
						node.castShadow = true;
						if (Array.isArray(node.material)) {
							node.material.forEach(mat => {
								this.prepMaterial(mat as THREE.MeshPhongMaterial);
							});
						}
						else
						{
							this.prepMaterial(node.material as THREE.MeshPhongMaterial);
						}
					}
				};
			});
			if (callback) {
				callback(board);
			}
		} );
		board.position.copy(position);
		return board;
	}
	/**
	* load a chunk from JSON
	*/
	loadChunk(file: string, position: THREE.Vector3 = new THREE.Vector3(0, 0, 0))
	{
		// position = position.multiplyScalar(chunkScale);
		position = position.multiplyScalar(chunkScale).add(new THREE.Vector3(0.5 * chunkScale, 0, 0.5 * chunkScale));

		// declare the container for the loaded stuff
		// var chunkObj = new THREE.Object3D();
		var chunkObj = new Stage(this.engineInstance);
		let target = this;
		$.ajax({
			crossDomain: true,
			url: `/dnd/res/data/map/chunks/${file}.json`,
			dataType: 'json',
			error: function (xmlHttpReq, status, err) {
				var something = xmlHttpReq;
			},
			success: function (returnedData: chunkJSON) {
				returnedData.entities.forEach(ent => {
					let person = target.getPerson(ent.name, ent.position.x, ent.position.y, ent.position.z);
					if (person) {
						// chunkObj.add((person as Engine.Entity).Model);
						person.Model.position.set(0, 0, 0);
						person.Motion.position.set(ent.position.x, ent.position.y, ent.position.z).add(position);
						chunkObj.Entities.Add(person);
					}
				});
				returnedData.setDressing.forEach(obj =>
				{
					let pos = obj.position ? new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z) : new THREE.Vector3();
					let setDress = target.loadTerrain(pos, obj.path);
					if (obj.scale) {
						setDress.scale.set(obj.scale.x, obj.scale.y, obj.scale.z);
					}
					// chunkObj.add(setDress);
					chunkObj.Terrain.add(setDress);
				});
				if (returnedData.base.path.length > 0)
				{
					let b = returnedData.base;
					let pos = b.position ? new THREE.Vector3(b.position.x, b.position.y, b.position.z) : new THREE.Vector3();
					let map = target.loadTerrain(pos, b.path);
					if (b.scale) {
						map.scale.set(b.scale.x, b.scale.y, b.scale.z);
					}
					// map.scale.multiplyScalar(0.1);
					// chunkObj.add(map);
					chunkObj.Terrain.add(map);
				}
				if (returnedData.environment.hasSea) {
					let sea = new Sea(main);
					sea.mesh.position.y += returnedData.environment.seaLevel as number;
					chunkObj.add(sea.mesh);

					target.engineInstance.onRenderFcts.push(function(delta: number, now: number){
						// sea.uniforms.uTime.value = now * 0.1;
						sea.uniforms.uTime.value = now * 0.2;
					});
				}
				main.Scene.add(chunkObj);
				chunkObj.position.copy(position);
				chunkObj.scale.multiplyScalar(0.1);
			}
		});
		return chunkObj;
	}

	/**
	* Normalize loaded materials for consistent rendering
	*/
	private prepMaterial(material: THREE.MeshPhongMaterial) {
		if (material.map != undefined) {
			material.map.minFilter = THREE.LinearFilter;
			material.map.magFilter = THREE.LinearFilter;
			material.transparent = true;
		}
	}
}

interface ChunkManagerChunkEntry
{
	x: number;
	y: number;
	chunk: Stage;
}

export class ChunkManager
{
	chunkLoader: ChunkLoader;
	chunkMap?: chunkMapJSON;
	private chunkDictionary: ChunkManagerChunkEntry[];
	constructor(loader: ChunkLoader, file: string, cellX?: number, cellY?: number)
	{
		this.chunkLoader = loader;
		this.chunkDictionary = [];
		let target = this;
		$.ajax({
			crossDomain: true,
			url: `/dnd/res/data/map/chunk-maps/${file}.json`,
			dataType: 'json',
			error: function (xmlHttpReq, status, err) {
				throw err;
			},
			success: function (dat: chunkMapJSON)
			{
				target.chunkMap = dat;
				if (cellX == undefined) {
					cellX = Math.floor(dat.size.width / 2);
				}
				if (cellY == undefined) {
					cellY = Math.floor(dat.size.height / 2);
				}

				for (let i = 0; i < dat.chunks.length; i++) {
					const row = dat.chunks[i];
					for (let j = 0; j < row.length; j++) {
						target.loadChunk(j, i);
					}
				}
			}
		});
	}
	loadChunk(x: number, y: number)
	{
		if (this.chunkMap && !this.findChunk(x, y) && (y < this.chunkMap.chunks.length))
		{
			let chunkName = this.chunkMap.chunks[y][x];
			if (chunkName) {
				let chunk = this.chunkLoader.loadChunk(chunkName, new THREE.Vector3(x, 0, y));
				this.chunkDictionary.push({ x: x, y: y, chunk: chunk });
			}
		}
	}
	unloadChunk(x: number, y: number)
	{
		if (this.chunkMap)
		{
			let chunk = this.findChunk(x, y);
			if (chunk)
			{
				let newArray = this.chunkDictionary.filter(chunk =>
				{
						return !(chunk.x == x && chunk.y == y);
				});
				this.chunkDictionary = newArray;
				chunk.unload();
			}
		}
	}
	findChunk(x: number, y: number): Stage|undefined
	{
		let hits = this.chunkDictionary.filter(chunk =>
		{
			return chunk.x == x && chunk.y == y;
		});
		if (hits.length > 0) {
			return hits[0].chunk;
		} else {
			return undefined;
		}
	}
	update(x: number, y: number): void
	{
		// Not sure if I should unload old chunks before loading new ones, or vice versa

		let start = {
			x: Math.max(x - viewRadius, 0),
			y: Math.max(y - viewRadius, 0)
		}
		let end = {
			x: x + viewRadius,
			y: y + viewRadius
		}
		let hits = this.chunkDictionary.filter(chunk =>
		{
			return (chunk.x < start.x || chunk.x > end.x)
				|| (chunk.y < start.y || chunk.y > end.y);
		});
		for (let index = 0; index < hits.length; index++) {
			const hit = hits[index];
			this.unloadChunk(hit.x, hit.y);
		}
		for (let i = start.y; i <= end.y; i++) {
			for (let j = start.x; j <= end.x; j++) {
				this.loadChunk(j, i);
			}

		}
	}
}