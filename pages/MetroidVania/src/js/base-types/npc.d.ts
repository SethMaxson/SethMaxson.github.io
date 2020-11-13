/// <reference types="node" />
import Entity from "./entity.js";
import Creature from './creature.js';
import DialogPrinter from '../ui/dialog-printer.js';
export default class NPC extends Creature {
    playerLoc: any;
    animationIntervalId: NodeJS.Timeout;
    deathAnimationId: NodeJS.Timeout | null;
    distToPlayerIntervalId: NodeJS.Timeout;
    boundaryCollision: {
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    boundaries: {
        bottom: {
            x: number;
            y: number;
        };
        left: {
            x: number;
            y: number;
        };
        right: {
            x: number;
            y: number;
        };
    };
    inRange: boolean;
    deathAnimation: any;
    constructor(startVals: any);
    ai(): void;
    interact(instigator: Creature): void;
    talk(instigator: Creature, dialogPrinter: DialogPrinter): void;
    update(): void;
    calculateBounds(): void;
    distToPlayer(): void;
    render(ctx: CanvasRenderingContext2D): void;
    calcBoundsCollision(otherBox: Entity): void;
    animate(): void;
    applyVelocity(): void;
}
