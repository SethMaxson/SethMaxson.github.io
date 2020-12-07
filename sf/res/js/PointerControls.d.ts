/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
import { Camera, EventDispatcher, Object3D } from '../../../node_modules/three/src/Three.js';
export declare class PointerLockControls extends EventDispatcher {
    isLocked: boolean;
    domElement: HTMLElement;
    pitchObject: Object3D;
    yawObject: Object3D;
    PI_2: number;
    constructor(camera: Camera, domElement?: HTMLElement);
    onMouseMove(target: PointerLockControls): (event: MouseEvent) => void;
    onPointerlockChange(target: PointerLockControls): (this: Document, event: Event) => void;
    onPointerlockError(): void;
    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Object3D;
    lock(): void;
    unlock(): void;
}
