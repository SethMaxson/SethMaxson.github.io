/// <reference types="node" />
import Entity from "./base-types/entity.js";
import IPoint2D from "./interfaces/point2d.js";
import Creature from './base-types/creature.js';
export default class Player extends Creature {
    actionResets: {
        attack: boolean;
        attackPressed: boolean;
        animatingAttack: boolean;
        onGround: boolean;
        interactPressed: boolean;
        jumpPressed: boolean;
        canAirJump: boolean;
    };
    animationIntervalId: NodeJS.Timeout | null;
    animSpeed: number;
    attackId: NodeJS.Timeout | null;
    attackSpeed: number;
    attackFrames: boolean;
    attackVolume: Entity | null;
    attackPower: number;
    boundaries: {
        topLeft: IPoint2D;
        topRight: IPoint2D;
        rightTop: IPoint2D;
        right: IPoint2D;
        rightBottom: IPoint2D;
        bottomLeft: IPoint2D;
        bottomRight: IPoint2D;
        leftTop: IPoint2D;
        left: IPoint2D;
        leftBottom: IPoint2D;
    };
    boundaryCollision: {
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
    };
    coyoteTimeDuration: number;
    coyoteTimeRemaining: number;
    facingLeft: boolean;
    damageReset: boolean;
    deathAnimId: null;
    debugColor: string;
    iFrameDuration: number;
    interactVolume: Entity;
    interactVolumeActive: boolean;
    inventory: PlayerInventory;
    jumpAmount: number;
    knockbackAmount: number;
    maxHealth: number;
    moveSpeed: number;
    playerState: string;
    walkAudio: HTMLAudioElement;
    constructor(args: {
        spawnPos: IPoint2D;
    });
    render(ctx: CanvasRenderingContext2D): void;
    applyVelocity(deltaT: number): void;
    update(): void;
    animate(): void;
    clearAnimInterval(): void;
    startAnimInterval(): void;
    deathAnimation(): void;
    input(): void;
    attack(): void;
    attackAnimation(): void;
    attackReset(): void;
    calculateBounds(): {
        topLeft: IPoint2D;
        topRight: IPoint2D;
        rightTop: IPoint2D;
        right: IPoint2D;
        rightBottom: IPoint2D;
        bottomLeft: IPoint2D;
        bottomRight: IPoint2D;
        leftTop: IPoint2D;
        left: IPoint2D;
        leftBottom: IPoint2D;
    };
    calcBoundsCollision(otherBox: Entity): void;
    takeDamage(damageAmount: number): void;
    takeDamageReset(): void;
}
interface PlayerInventory {
    keys: number;
}
export {};
