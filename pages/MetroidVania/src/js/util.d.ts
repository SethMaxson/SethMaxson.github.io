import Entity from './base-types/entity';
export declare const globals: {
    screenWidth: number;
    screenHeight: number;
    gravity: number;
    maxVelocity: number;
    transparentColor: string;
    tileSize: number;
};
export declare const isObjEmpty: (obj: any) => boolean;
export declare const randomColor: () => string;
export declare const boxCollision: (b1: Entity, b2: Entity) => boolean;
