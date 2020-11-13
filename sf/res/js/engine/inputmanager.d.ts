import * as THREE from '../../../../node_modules/three/src/Three.js';
/**
* This is used to track and manage user input.
*/
export declare class InputManager {
    keys: {
        [key: string]: IInputKey;
    };
    constructor();
    update(): void;
    setKey(keyName: string, pressed: boolean): void;
    getMovementDirection(): THREE.Vector3;
}
interface IInputKey {
    down: boolean;
    justPressed: boolean;
}
export {};
