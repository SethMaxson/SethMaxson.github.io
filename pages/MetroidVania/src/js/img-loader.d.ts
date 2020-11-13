import IPoint2D from "./interfaces/point2d.js";
export declare const characterIdleRight: Sprite;
export declare const characterIdleLeft: Sprite;
export declare const characterWalkingRight: Sprite;
export declare const characterWalkingLeft: Sprite;
export declare const characterWhipRight: Sprite;
export declare const characterWhipLeft: Sprite;
export declare const characterDamageRight: Sprite;
export declare const characterDamageLeft: Sprite;
export declare const characterJumpRight: Sprite;
export declare const characterJumpLeft: Sprite;
export declare const characterFallRight: Sprite;
export declare const characterFallLeft: Sprite;
export declare const characterDeadRight: Sprite;
export declare const characterDeadLeft: Sprite;
export declare const npcImgs: {
    left: Sprite;
    right: Sprite;
    alert: Sprite;
};
export declare const smbSheet: {
    ground: Sprite;
    brick: Sprite;
    pipeTopLeft: Sprite;
    pipeTopRight: Sprite;
    questionBlock: Sprite;
    hardBlock: Sprite;
    pipeLeft: Sprite;
    pipeRight: Sprite;
};
export declare const goombaImgs: Sprite;
export declare const environmentImgs: HTMLImageElement[];
export declare const itemImgs: {
    healthPlusOne: HTMLImageElement[];
    healthUpgrade: HTMLImageElement[];
    key: HTMLImageElement[];
};
export declare const bgImgs: HTMLImageElement[];
export declare const bgParallaxImgs: HTMLImageElement[];
export declare const woodenDoor: HTMLImageElement[];
export declare const zombieLeft: HTMLImageElement[];
export declare const zombieRight: HTMLImageElement[];
export declare const zombieRiseLeft: HTMLImageElement[];
export declare const zombieRiseRight: HTMLImageElement[];
export declare const enemyDeath: Sprite;
export declare const ghostRight: HTMLImageElement[];
export declare const ghostLeft: HTMLImageElement[];
export interface Sprite {
    image: HTMLImageElement;
    frameSize: IPoint2D;
    animationOffset: IPoint2D;
    length: number;
}
