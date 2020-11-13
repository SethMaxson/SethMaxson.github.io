import { Vector2 } from "./utility.js";
export declare class Sprite {
    /** Position in pixels */
    position: Vector2;
    rotation: number;
    /** Duration of each frame of sprite animation */
    animcycle: number;
    frame: number;
    frameWidth: number;
    frameHeight: number;
    renderSize: Vector2;
    offset: Vector2;
    image: HTMLImageElement;
    animation: SpriteAnimation;
    constructor(x?: number, y?: number, sprite?: string);
    update(): void;
    draw(ctx: CanvasRenderingContext2D, offset: Vector2): void;
    /** Get the current position as a cell/tile */
    get cell(): Vector2;
}
export declare class SpriteAnimation {
    startFrame: Vector2;
    endFrame: Vector2;
    length: number;
    direction: AnimationDirections;
    repeat: number;
    constructor(startX?: number, startY?: number, lengthX?: number, lengthY?: number, repeat?: number);
    recalculate(): void;
}
declare enum AnimationDirections {
    Horizontal = 0,
    Vertical = 1
}
export {};
