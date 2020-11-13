import { Main, InputManager } from "./../engine.js";
import { Motion, PersonMotion, PlayerMotion } from './../motion.js';
import { PointerLockControls } from '../../../../../sf/res/js/PointerControls.js';
import { Characters } from '../../../../../sf/res/js/characters.js';
export interface CellCoordinates {
    x: number;
    y: number;
}
export declare abstract class Controls {
    firstPerson: boolean;
    _zoom: number;
    _zoomMax: number;
    _zoomMin: number;
    Camera: THREE.Camera;
    mainProcess: Main;
    InputManager: InputManager;
    PointerControls: PointerLockControls;
    abstract motion: Motion | PersonMotion | PlayerMotion;
    abstract mesh: THREE.Mesh | Characters.Person3D;
    constructor(camera: THREE.Camera, main: Main);
    getObject(): THREE.Object3D;
    lock(): void;
    get isLocked(): boolean;
    zoom(mod: number): void;
    cell(): CellCoordinates;
    abstract update(delta: number): void;
}
