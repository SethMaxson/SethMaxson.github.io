import { Camera, EventDispatcher, Object3D } from './../../../../../node_modules/three/src/Three.js';
import { Main } from "./../engine.js";
import { InputManager } from "./../inputmanager.js";
import { Motion, PersonMotion, PlayerMotion } from './../motion.js';
import { Characters } from './../../characters.js';
import { chunkScale } from "./../../chunk-loader.js";

export interface CellCoordinates
{
	x: number,
	y: number
}

export abstract class Controls extends EventDispatcher
{
	firstPerson: boolean = true;
	_zoom: number = 5;
	_zoomMax: number = 10;
	_zoomMin: number = 0.2;
	Camera: THREE.Camera;
	mainProcess: Main;
	InputManager: InputManager;

	isLocked: boolean = false;
	domElement: HTMLElement;
	pitchObject: Object3D;
	yawObject: Object3D;
	PI_2: number = Math.PI / 2;

	abstract motion: Motion | PersonMotion | PlayerMotion;
	abstract mesh: THREE.Mesh|Characters.Person3D;
	constructor(camera: THREE.Camera, main: Main)
	{
		super();

		this.Camera = camera;
		this.domElement = main.renderer.domElement || document.body;

		camera.rotation.set(0, 0, 0);

		this.pitchObject = new Object3D();
		this.pitchObject.add(camera);

		this.yawObject = new Object3D();
		this.yawObject.position.y = 10;
		this.yawObject.add(this.pitchObject);

		this.connect();

		this.mainProcess = main;
		this.InputManager = main.InputManager;
	}

	zoom(mod: number) {
		this._zoom += mod;
		this._zoom = Math.max(Math.min(this._zoom, this._zoomMax), this._zoomMin);
		if (!this.firstPerson)
				this.Camera.position.z = this._zoom;
	}

	cell(): CellCoordinates
	{
		var thing = this.motion.position;
		var cell = {
			x: Math.floor(thing.x / chunkScale),
			y: Math.floor(thing.z / chunkScale)
		};
		return cell;
	}

	onMouseMove(target: Controls)
	{
		return function curried_func(event: MouseEvent)
		{
			if (target.isLocked === false) return;
			// @ts-ignore
			var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			// @ts-ignore
			var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			target.yawObject.rotation.y -= movementX * 0.002;
			target.pitchObject.rotation.x -= movementY * 0.002;

			target.pitchObject.rotation.x = Math.max(- target.PI_2, Math.min(target.PI_2, target.pitchObject.rotation.x));
		}
	}

	onPointerlockChange(target: Controls)
	{
		return function curried_func(this: Document, event: Event)
		{
			if (document.pointerLockElement === target.domElement)
			{
				target.dispatchEvent({ type: 'lock' });
				target.isLocked = true;
			} else
			{
				target.dispatchEvent({ type: 'unlock' });
				target.isLocked = false;
			}
		}
	}

	onPointerlockError()
	{
		console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
	}

	connect(): void
	{
		document.addEventListener('mousemove', this.onMouseMove(this), false);
		document.addEventListener('pointerlockchange', this.onPointerlockChange(this), false);
		document.addEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	disconnect(): void
	{
		document.removeEventListener('mousemove', this.onMouseMove(this), false);
		document.removeEventListener('pointerlockchange', this.onPointerlockChange(this), false);
		document.removeEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	dispose(): void
	{
		this.disconnect();
	};

	getObject(): Object3D
	{
		return this.yawObject;
	};

	lock(): void
	{
		this.domElement.requestPointerLock();
	};

	unlock(): void
	{
		document.exitPointerLock();
	};

	/** Toggles between first and third person views */
	toggleView()
	{
		this.firstPerson = !this.firstPerson;
		if (this.firstPerson == true)
		{
			this.Camera.position.z = 0;
			if (this.mesh != undefined)
			{
				this.mesh.visible = false;
			}
		} else
		{
			this.Camera.position.z = this._zoom;
			if (this.mesh != undefined)
			{
				this.mesh.visible = true;
				this.motion.rotation.y = this.getObject().rotation.y;
			}
		}
	}

	abstract update(delta: number): void;
}