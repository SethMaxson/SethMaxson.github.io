import { Vector2 } from './utility.js';
/**
* This is used to track and manage user input.
*/
export declare class InputManager {
    keys: {
        left: IInputKey;
        right: IInputKey;
        up: IInputKey;
        down: IInputKey;
        sprint: IInputKey;
        attack: IInputKey;
        [key: string]: IInputKey;
    };
    constructor(fullScreenOnly?: boolean);
    update(): void;
    setKey(keyName: string, pressed: boolean): void;
    getMovementDirection(): Vector2;
}
interface IInputKey {
    down: boolean;
    justPressed: boolean;
}
export {};
