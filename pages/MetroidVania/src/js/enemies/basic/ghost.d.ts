/// <reference types="node" />
import Enemy from "../../base-types/enemy.js";
export default class Ghost extends Enemy {
    playerLoc: any;
    moveSpeed: any;
    movingLeft: boolean;
    animationIntervalId: NodeJS.Timeout;
    deathAnimationId: NodeJS.Timeout | null;
    attack: boolean;
    distToPlayerIntervalId: NodeJS.Timeout;
    constructor(startVals: any);
    ai(): void;
    distToPlayer(): void;
    applyVelocity(): void;
    die(): void;
    deathAnimation(): void;
    animate(): void;
    bump(): void;
    update(): void;
}
