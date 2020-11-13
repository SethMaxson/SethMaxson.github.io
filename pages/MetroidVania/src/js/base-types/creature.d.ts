import Entity from "./entity.js";
import { ItemDrop } from '../interfaces/item-drop.js';
export default class Creature extends Entity {
    audio: HTMLAudioElement;
    bumped: boolean;
    collisionDamage: number;
    dead: boolean;
    defense: number;
    health: number;
    iFrames: boolean;
    isEnemy: boolean;
    itemDrops: ItemDrop[];
    name: string;
    recoverTime: number;
    constructor(startVals: any);
    update(): void;
    takeDamage(damageAmount: number): void;
    calculateBounds(): void;
    calcBoundsCollision(otherBox: Entity): void;
    /**
     * Play a sound effect
     * @param file the path to the audio file
     */
    playAudio(file: string): void;
    /**
     * corrects entity's position if they sink into the floor
     * @param amount the number of vertical pixels to adjust
     */
    bump(amount: number): void;
}
