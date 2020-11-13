import IPoint2D from "../interfaces/point2d.js";
import { Sprite } from '../img-loader.js';
interface SpriteOffset {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface EntitySize {
    w: number;
    h: number;
}
interface EntityConstructorArguments {
    size?: EntitySize;
    pos?: IPoint2D;
    vel?: IPoint2D;
    color?: string;
    sprites?: CanvasImageSource[] | Sprite;
    spriteOffset?: SpriteOffset;
    tile?: boolean;
}
declare class Entity {
    size: EntitySize;
    pos: IPoint2D;
    vel: IPoint2D;
    color: string;
    sprites: CanvasImageSource[] | Sprite | null;
    spriteOffset: SpriteOffset;
    spriteIdx: number;
    nullImg: HTMLImageElement;
    tile: boolean;
    type: string;
    isEnemy?: boolean;
    isInteractive?: boolean;
    constructor(args: EntityConstructorArguments);
    render(ctx: CanvasRenderingContext2D): void;
    applyVelocity(deltaT: number): void;
    input(): void;
    update(): void;
    interact(instigator: Entity): void;
}
export default Entity;
