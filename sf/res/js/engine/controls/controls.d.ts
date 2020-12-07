import { EventDispatcher, Object3D } from './../../../../../node_modules/three/src/Three.js';
import { Main } from "./../engine.js";
import { InputManager } from "./../inputmanager.js";
import { Motion, PersonMotion, PlayerMotion } from './../motion.js';
import { Characters } from './../../characters.js';
export interface CellCoordinates {
    x: number;
    y: number;
}
export declare abstract class Controls extends EventDispatcher {
    firstPerson: boolean;
    _zoom: number;
    _zoomMax: number;
    _zoomMin: number;
    Camera: THREE.Camera;
    mainProcess: Main;
    InputManager: InputManager;
    isLocked: boolean;
    domElement: HTMLElement;
    pitchObject: Object3D;
    yawObject: Object3D;
    PI_2: number;
    abstract motion: Motion | PersonMotion | PlayerMotion;
    abstract mesh: THREE.Mesh | Characters.Person3D;
    constructor(camera: THREE.Camera, main: Main);
    zoom(mod: number): void;
    cell(): CellCoordinates;
    onMouseMove(target: Controls): (event: MouseEvent) => void;
    onPointerlockChange(target: Controls): (this: Document, event: Event) => void;
    onPointerlockError(): void;
    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Object3D;
    lock(): void;
    unlock(): void;
    abstract update(delta: number): void;
}
