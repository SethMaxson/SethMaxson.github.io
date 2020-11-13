import { Character } from './character.js';
import { Vector2, Enums } from './utility.js';
import { MainContexts } from './engine.js';
export declare class LevelMap {
    size: Vector2;
    defaultStartPosition: Vector2;
    charas: Character[];
    collision: number[][];
    defaultTile: number;
    data: number[][];
    doors: DoorNode[];
    lastClick: Vector2;
    lastClickInPixels: Vector2;
    name: string;
    printCollisions: boolean;
    printLastClick: boolean;
    redraw: boolean;
    tiles: Vector2[];
    tileset: HTMLImageElement;
    blockers: HitBox[];
    /** strictly for debugging collisions. Delete once done. */
    drawCollisions: HitBox[];
    /** strictly for debugging collisions. Delete once done. */
    entityHitBox: {
        hitbox: HitBox;
        color: string;
    }[];
    constructor(name: string);
    load(filename: string): void;
    logClick(x: number, y: number): void;
    update(): void;
    draw(ctx: MainContexts, offset: Vector2, debug?: boolean): void;
    /**
     * Check if an entity can move to a cell
     * @param x X coordinate
     * @param y Y coordinate
     */
    isMovable(x: number, y: number): boolean;
    /**
     * Check if an entity can move to a cell
     * @param x X coordinate
     * @param y Y coordinate
     */
    isMovablePixels(hb: HitBox, x: number, y: number): boolean;
    addChara(chara: Character): void;
    createChara(data: string[]): void;
}
export declare class MapDocNode {
    tileset: TilesetNode;
    map: MapNode;
    event: EventNode;
    constructor();
}
export declare class TilesetNode {
    src: string;
    defaultTile: number;
    tiles: Vector2[];
}
export declare class MapNode {
    width: number;
    height: number;
    dataSize: number;
    tiles: any;
    collision: any;
}
export declare class EventNode {
    Character: CharacterNode[];
}
export interface CharacterNode {
    name: string;
    x: number;
    y: number;
    direction: number;
    moveType: number;
    message: string;
    sprite: string;
}
export declare enum CollisionTypes {
    None = 0,
    Normal = 1,
    SlashUp = 2,
    SlashDown = 3,
    Water = 4,
    Special = 5,
    Hazard = 6
}
export interface DoorNode {
    hitBox: HitBox;
    targetMap: string;
    targetX: number;
    targetY: number;
    targetDirection: Enums.Directions;
}
export declare class HitBox {
    position: Vector2;
    width: number;
    height: number;
    offset: Vector2;
    constructor(x?: number, y?: number, width?: number, height?: number, offsetX?: number, offsetY?: number);
}
