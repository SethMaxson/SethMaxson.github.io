import { Main, InputManager } from "./../engine.js";
import { Motion, PersonMotion, PlayerMotion } from './../motion.js';
import { PointerLockControls } from '../../../../../sf/res/js/PointerControls.js';
import { Characters } from '../../../../../sf/res/js/characters.js';

export abstract class Controls
{
	firstPerson: boolean = true;
	_zoom: number = 5;
	_zoomMax: number = 10;
	_zoomMin: number = 0.2;
	Camera: THREE.Camera;
	mainProcess: Main;
	InputManager: InputManager;
	PointerControls: PointerLockControls;
	abstract motion: Motion | PersonMotion | PlayerMotion;
	abstract mesh: THREE.Mesh|Characters.Person3D;
	constructor(camera: THREE.Camera, main: Main)
	{
		this.Camera = camera;
		this.PointerControls = new PointerLockControls( this.Camera, main.renderer.domElement );
		this.mainProcess = main;
		this.InputManager = main.InputManager;
	}
	getObject(): THREE.Object3D
	{
		return this.PointerControls.getObject();
	}
	lock(): void
	{
		this.PointerControls.lock();
	}
	get isLocked(): boolean {
		return this.PointerControls.isLocked;
	}
	zoom(mod: number) {
		this._zoom += mod;
		this._zoom = Math.max(Math.min(this._zoom, this._zoomMax), this._zoomMin);
	}
	abstract update(delta: number): void;
}