/// <reference types="node" />
import Enemy from "../../base-types/enemy.js";
export default class Zombie extends Enemy {
    moveSpeed: number;
    movingLeft: boolean;
    animationIntervalId: NodeJS.Timeout | null;
    deathAnimationId: NodeJS.Timeout | null;
    spawnId: NodeJS.Timeout;
    constructor(startVals: any);
    ai(): void;
    spawnAnimation(): void;
    deathAnimation(): void;
    animate(): void;
}
