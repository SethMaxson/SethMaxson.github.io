/// <reference types="node" />
import Enemy from "../../base-types/enemy.js";
export default class Goomba extends Enemy {
    moveSpeed: number;
    movingLeft: boolean;
    animationIntervalId: NodeJS.Timeout | null;
    deathAnimationId: NodeJS.Timeout | null;
    constructor(startVals: any);
    ai(): void;
    deathAnimation(): void;
    animate(): void;
}
