import Entity from "./entity.js";
import Creature from './creature.js';
export default class Enemy extends Creature {
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
    constructor(startVals: any);
    ai(): void;
    update(): void;
    calculateBounds(): void;
    calcBoundsCollision(otherBox: Entity): void;
}
