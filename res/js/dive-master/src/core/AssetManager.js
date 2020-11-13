import { LoadingManager, AnimationLoader, AudioLoader, TextureLoader, Mesh } from 'three';
import { Sprite, SpriteMaterial, DoubleSide, AudioListener, PositionalAudio } from 'three';
import { LineSegments, LineBasicMaterial, MeshBasicMaterial, BufferGeometry, Vector3, PlaneBufferGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { NavMeshLoader, CostTable } from 'yuka';
import { CONFIG } from './Config.js';

/**
* Class for representing the global asset manager. It is responsible
* for loading and parsing all assets from the backend and provide
* the result in a series of maps.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class AssetManager {

	/**
	* Constructs a new asset manager with the given values.
	*/
	constructor() {

		this.loadingManager = new LoadingManager();

		this.animationLoader = new AnimationLoader( this.loadingManager );
		this.audioLoader = new AudioLoader( this.loadingManager );
		this.textureLoader = new TextureLoader( this.loadingManager );
		this.gltfLoader = new GLTFLoader( this.loadingManager );
		this.navMeshLoader = new NavMeshLoader();

		this.listener = new AudioListener();

		this.animations = new Map();
		this.audios = new Map();
		this.configs = new Map();
		this.models = new Map();
		this.textures = new Map();

		this.navMesh = null;
		this.costTable = null;

	}

	/**
	* Initializes the asset manager. All assets are prepared so they
	* can be used by the game.
	*
	* @return {Promise} Resolves when all assets are ready.
	*/
	init() {

		this._loadAnimations();
		this._loadAudios();
		this._loadConfigs();
		this._loadModels();
		this._loadTextures();
		this._loadNavMesh();

		return new Promise( ( resolve ) => {

			this.loadingManager.onLoad = () => {

				resolve();

			};

		} );

	}

	/**
	* Clones the given audio source.
	*
	* @param {PositionalAudio} source - A positional audio.
	* @return {PositionalAudio} A clone of the given audio.
	*/
	cloneAudio( source ) {

		const audio = new source.constructor( source.listener );
		audio.buffer = source.buffer;

		return audio;

	}

	/**
	* Loads all external animations from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadAnimations() {

		const animationLoader = this.animationLoader;

		// player

		animationLoader.load( './animations/player.json', ( clips ) => {

			for ( const clip of clips ) {

				this.animations.set( clip.name, clip );

			}

		} );

		// blaster

		animationLoader.load( './animations/blaster.json', ( clips ) => {

			for ( const clip of clips ) {

				this.animations.set( clip.name, clip );

			}

		} );

		// shotgun

		animationLoader.load( './animations/shotgun.json', ( clips ) => {

			for ( const clip of clips ) {

				this.animations.set( clip.name, clip );

			}

		} );

		// assault rifle

		animationLoader.load( './animations/assaultRifle.json', ( clips ) => {

			for ( const clip of clips ) {

				this.animations.set( clip.name, clip );

			}

		} );

		return this;

	}

	/**
	* Loads all audios from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadAudios() {

		const audioLoader = this.audioLoader;
		const audios = this.audios;
		const listener = this.listener;

		const blasterShot = new PositionalAudio( listener );
		blasterShot.matrixAutoUpdate = false;

		const shotgunShot = new PositionalAudio( listener );
		shotgunShot.matrixAutoUpdate = false;

		const assaultRifleShot = new PositionalAudio( listener );
		assaultRifleShot.matrixAutoUpdate = false;

		const reload = new PositionalAudio( listener );
		reload.matrixAutoUpdate = false;

		const shotgunShotReload = new PositionalAudio( listener );
		shotgunShotReload.matrixAutoUpdate = false;

		const step1 = new PositionalAudio( listener );
		step1.matrixAutoUpdate = false;

		const step2 = new PositionalAudio( listener );
		step2.matrixAutoUpdate = false;

		const impact1 = new PositionalAudio( listener );
		impact1.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact1.matrixAutoUpdate = false;

		const impact2 = new PositionalAudio( listener );
		impact2.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact2.matrixAutoUpdate = false;

		const impact3 = new PositionalAudio( listener );
		impact3.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact3.matrixAutoUpdate = false;

		const impact4 = new PositionalAudio( listener );
		impact4.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact4.matrixAutoUpdate = false;

		const impact5 = new PositionalAudio( listener );
		impact5.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact5.matrixAutoUpdate = false;

		const impact6 = new PositionalAudio( listener );
		impact6.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact6.matrixAutoUpdate = false;

		const impact7 = new PositionalAudio( listener );
		impact7.setVolume( CONFIG.AUDIO.VOLUME_IMPACT );
		impact7.matrixAutoUpdate = false;

		const health = new PositionalAudio( listener );
		health.matrixAutoUpdate = false;

		const ammo = new PositionalAudio( listener );
		ammo.matrixAutoUpdate = false;

		audioLoader.load( './audios/blaster_shot.ogg', buffer => blasterShot.setBuffer( buffer ) );
		audioLoader.load( './audios/shotgun_shot.ogg', buffer => shotgunShot.setBuffer( buffer ) );
		audioLoader.load( './audios/assault_rifle_shot.ogg', buffer => assaultRifleShot.setBuffer( buffer ) );
		audioLoader.load( './audios/reload.ogg', buffer => reload.setBuffer( buffer ) );
		audioLoader.load( './audios/shotgun_shot_reload.ogg', buffer => shotgunShotReload.setBuffer( buffer ) );
		audioLoader.load( './audios/step1.ogg', buffer => step1.setBuffer( buffer ) );
		audioLoader.load( './audios/step2.ogg', buffer => step2.setBuffer( buffer ) );
		audioLoader.load( './audios/impact1.ogg', buffer => impact1.setBuffer( buffer ) );
		audioLoader.load( './audios/impact2.ogg', buffer => impact2.setBuffer( buffer ) );
		audioLoader.load( './audios/impact3.ogg', buffer => impact3.setBuffer( buffer ) );
		audioLoader.load( './audios/impact4.ogg', buffer => impact4.setBuffer( buffer ) );
		audioLoader.load( './audios/impact5.ogg', buffer => impact5.setBuffer( buffer ) );
		audioLoader.load( './audios/impact6.ogg', buffer => impact6.setBuffer( buffer ) );
		audioLoader.load( './audios/impact7.ogg', buffer => impact7.setBuffer( buffer ) );
		audioLoader.load( './audios/health.ogg', buffer => health.setBuffer( buffer ) );
		audioLoader.load( './audios/ammo.ogg', buffer => ammo.setBuffer( buffer ) );

		audios.set( 'blaster_shot', blasterShot );
		audios.set( 'shotgun_shot', shotgunShot );
		audios.set( 'assault_rifle_shot', assaultRifleShot );
		audios.set( 'reload', reload );
		audios.set( 'shotgun_shot_reload', shotgunShotReload );
		audios.set( 'step1', step1 );
		audios.set( 'step2', step2 );
		audios.set( 'impact1', impact1 );
		audios.set( 'impact2', impact2 );
		audios.set( 'impact3', impact3 );
		audios.set( 'impact4', impact4 );
		audios.set( 'impact5', impact5 );
		audios.set( 'impact6', impact6 );
		audios.set( 'impact7', impact7 );
		audios.set( 'health', health );
		audios.set( 'ammo', ammo );

		return this;

	}

	/**
	* Loads all configurations from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadConfigs() {

		const loadingManager = this.loadingManager;
		const configs = this.configs;

		// level config

		loadingManager.itemStart( 'levelConfig' );

		fetch( './config/level.json' )
			.then( response => {

				return response.json();

			} )
			.then( json => {

				configs.set( 'level', json );

				loadingManager.itemEnd( 'levelConfig' );

			} );

		return this;

	}

	/**
	* Loads all models from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadModels() {

		const gltfLoader = this.gltfLoader;
		const textureLoader = this.textureLoader;
		const models = this.models;
		const animations = this.animations;

		// shadow for soldiers

		const shadowTexture = textureLoader.load( './textures/shadow.png' );
		const planeGeometry = new PlaneBufferGeometry();
		const planeMaterial = new MeshBasicMaterial( { map: shadowTexture, transparent: true, opacity: 0.4 } );

		const shadowPlane = new Mesh( planeGeometry, planeMaterial );
		shadowPlane.position.set( 0, 0.05, 0 );
		shadowPlane.rotation.set( - Math.PI * 0.5, 0, 0 );
		shadowPlane.scale.multiplyScalar( 2 );
		shadowPlane.matrixAutoUpdate = false;
		shadowPlane.updateMatrix();

		// soldier

		gltfLoader.load( './models/soldier.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.animations = gltf.animations;

			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				if ( object.isMesh ) {

					object.material.side = DoubleSide;
					object.matrixAutoUpdate = false;
					object.updateMatrix();

				}

			} );

			renderComponent.add( shadowPlane );

			models.set( 'soldier', renderComponent );

			for ( let animation of gltf.animations ) {

				animations.set( animation.name, animation );

			}

		} );

		// level

		gltfLoader.load( './models/level.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			// add lightmap manually since glTF does not support this type of texture so far

			const mesh = renderComponent.getObjectByName( 'level' );
			mesh.material.lightMap = textureLoader.load( './textures/lightmap.png' );
			mesh.material.lightMap.flipY = false;
			mesh.material.map.anisotropy = 4;

			models.set( 'level', renderComponent );

		} );

		// blaster, high poly

		gltfLoader.load( './models/blaster_high.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'blaster_high', renderComponent );

		} );

		// blaster, low poly

		gltfLoader.load( './models/blaster_low.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'blaster_low', renderComponent );

		} );

		// shotgun, high poly

		gltfLoader.load( './models/shotgun_high.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'shotgun_high', renderComponent );

		} );

		// shotgun, low poly

		gltfLoader.load( './models/shotgun_low.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'shotgun_low', renderComponent );

		} );

		// assault rifle, high poly

		gltfLoader.load( './models/assaultRifle_high.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'assaultRifle_high', renderComponent );

		} );

		// assault rifle, low poly

		gltfLoader.load( './models/assaultRifle_low.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'assaultRifle_low', renderComponent );

		} );

		// health pack

		gltfLoader.load( './models/healthPack.glb', ( gltf ) => {

			const renderComponent = gltf.scene;
			renderComponent.matrixAutoUpdate = false;
			renderComponent.updateMatrix();

			renderComponent.traverse( ( object ) => {

				object.matrixAutoUpdate = false;
				object.updateMatrix();

			} );

			models.set( 'healthPack', renderComponent );

		} );

		// muzzle sprite

		const muzzleTexture = textureLoader.load( './textures/muzzle.png' );
		muzzleTexture.matrixAutoUpdate = false;

		const muzzleMaterial = new SpriteMaterial( { map: muzzleTexture } );
		const muzzle = new Sprite( muzzleMaterial );
		muzzle.matrixAutoUpdate = false;
		muzzle.visible = false;

		models.set( 'muzzle', muzzle );

		// bullet line

		const bulletLineGeometry = new BufferGeometry();
		const bulletLineMaterial = new LineBasicMaterial( { color: 0xfbf8e6 } );

		bulletLineGeometry.setFromPoints( [ new Vector3(), new Vector3( 0, 0, - 1 ) ] );

		const bulletLine = new LineSegments( bulletLineGeometry, bulletLineMaterial );
		bulletLine.matrixAutoUpdate = false;

		models.set( 'bulletLine', bulletLine );

	}

	/**
	* Loads all textures from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadTextures() {

		const textureLoader = this.textureLoader;

		let texture = textureLoader.load( './textures/crosshairs.png' );
		texture.matrixAutoUpdate = false;
		this.textures.set( 'crosshairs', texture );

		texture = textureLoader.load( './textures/damageIndicatorFront.png' );
		texture.matrixAutoUpdate = false;
		this.textures.set( 'damageIndicatorFront', texture );

		texture = textureLoader.load( './textures/damageIndicatorRight.png' );
		texture.matrixAutoUpdate = false;
		this.textures.set( 'damageIndicatorRight', texture );

		texture = textureLoader.load( './textures/damageIndicatorLeft.png' );
		texture.matrixAutoUpdate = false;
		this.textures.set( 'damageIndicatorLeft', texture );

		texture = textureLoader.load( './textures/damageIndicatorBack.png' );
		texture.matrixAutoUpdate = false;
		this.textures.set( 'damageIndicatorBack', texture );

		return this;

	}

	/**
	* Loads the navigation mesh from the backend.
	*
	* @return {AssetManager} A reference to this asset manager.
	*/
	_loadNavMesh() {

		const navMeshLoader = this.navMeshLoader;
		const loadingManager = this.loadingManager;

		loadingManager.itemStart( 'navmesh' );

		navMeshLoader.load( './navmeshes/navmesh.glb' ).then( ( navMesh ) => {

			this.navMesh = navMesh;

			loadingManager.itemEnd( 'navmesh' );

		} );

		//

		loadingManager.itemStart( 'costTable' );

		fetch( './navmeshes/costTable.json' )
			.then( response => {

				return response.json();

			} )
			.then( json => {

				this.costTable = new CostTable().fromJSON( json );

				loadingManager.itemEnd( 'costTable' );

			} );

		return this;

	}

}

export { AssetManager };
