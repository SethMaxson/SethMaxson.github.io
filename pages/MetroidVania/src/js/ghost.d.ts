/// <reference types="node" />
import Enemy from "./enemy.js";
declare class Ghost extends Enemy {
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
    deathAnimation(): void;
    animate(): void;
    bump(): void;
    update(): void;
}
export default Ghost;
