import { Character } from './character.js';
import { Vector2 } from './utility.js';
import { LevelMap, HitBox } from './map.js';
import { Sprite } from './sprite.js';
export declare class PlayerGridBased extends Character {
    weapon: Sprite;
    constructor(name: string, x: number, y: number, dir: number);
    update(map: LevelMap): void;
    draw(ctx: CanvasRenderingContext2D, offset: Vector2): void;
}
export declare class Player extends Character {
    weapon: Sprite;
    feetHitBox: HitBox;
    boundaryCollision: {
        top: boolean;
        right: boolean;
        left: boolean;
        bottom: boolean;
    };
    bumped: {
        x: boolean;
        y: boolean;
    };
    constructor(name: string, x: number, y: number, dir: number, sprite?: string);
    update(map: LevelMap): void;
    draw(ctx: CanvasRenderingContext2D, offset: Vector2): void;
    move(map: LevelMap): void;
    resetBounds(): void;
    calcBoundsCollision(otherBox: HitBox, map: LevelMap): void;
}
