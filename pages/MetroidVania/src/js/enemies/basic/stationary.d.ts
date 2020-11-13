/// <reference types="node" />
import Enemy from "../../base-types/enemy.js";
export default class Stationary extends Enemy {
    playerLoc: any;
    animationIntervalId: NodeJS.Timeout;
    deathAnimationId: NodeJS.Timeout | null;
    attack: boolean;
    distToPlayerIntervalId: NodeJS.Timeout;
    constructor(startVals: any);
    ai(): void;
    distToPlayer(): void;
    die(): void;
    deathAnimation(): void;
    animate(): void;
    applyVelocity(): void;
    bump(): void;
    update(): void;
}
