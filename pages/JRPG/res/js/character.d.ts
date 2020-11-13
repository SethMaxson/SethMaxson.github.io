import { Enums, Vector2 } from "./utility.js";
import { LevelMap, HitBox } from './map.js';
export declare class Character {
    animationLength: number;
    name: string;
    /** Position in pixels */
    position: Vector2;
    velocity: Vector2;
    speed: number;
    moving: boolean;
    direction: number;
    hitbox: HitBox;
    movetype: number;
    /** Duration of each frame of sprite animation */
    animcycle: number;
    frame: number;
    frameSize: Vector2;
    renderSize: Vector2;
    message: string;
    offset: Vector2;
    frameOffset: number;
    hidden: boolean;
    image: HTMLImageElement;
    specialFlags: string[];
    constructor(name: string, x: number, y: number, dir: number, moveType: number, message: string, sprite?: string);
    update(map: LevelMap): void;
    draw(ctx: CanvasRenderingContext2D, offset: Vector2): void;
    /** Get the current position as a cell/tile */
    get cell(): Vector2;
    moveStart(dir: Enums.Directions, map: LevelMap): void;
}
