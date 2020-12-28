import * as THREE from '../../../../node_modules/three/src/Three.js';
/**
* This is used to track and manage user input.
*/
export declare class InputManager {
    keys: {
        /**Left mouse button */
        click: IInputKey;
        /**Right mouse button */
        rightClick: IInputKey;
        talk: IInputKey;
        magic: IInputKey;
        jump: IInputKey;
        changeView: IInputKey;
        sprint: IInputKey;
        ascend: IInputKey;
        descend: IInputKey;
        pause: IInputKey;
        inventory: IInputKey;
        left: IInputKey;
        right: IInputKey;
        up: IInputKey;
        down: IInputKey;
        gun: IInputKey;
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
