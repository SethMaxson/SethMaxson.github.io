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
	isEnemy: boolean = false;
	itemDrops: ItemDrop[];
	name: string;
	recoverTime: number;
    constructor(startVals: any) {
        super(startVals);
		this.audio = new Audio();
        this.bumped = false;
        this.collisionDamage = 1;
        this.dead = false;
        this.defense = 0;
        this.health = 1;
		this.iFrames = false;
		this.itemDrops = [];
		this.name = "Name";
        this.recoverTime = 500;
		this.type = "creature";
    }

    update() { }

    takeDamage(damageAmount: number) {
        if (this.iFrames) return;

        this.iFrames = true;
		// this.health -= damageAmount;
		this.health -= Math.max(damageAmount - this.defense, 1);
        this.bumped = false;

        setTimeout(() => this.iFrames = false, this.recoverTime);
    }

    calculateBounds() { }

    calcBoundsCollision(otherBox: Entity) { }

	/**
	 * Play a sound effect
	 * @param file the path to the audio file
	 */
	playAudio(file: string)
	{
		if (file.length > 0)
		{
			let sourcesMatch = this.audio.src.indexOf(file) != -1;
			if (!sourcesMatch || this.audio.paused)
			{
				if (!sourcesMatch) {
					this.audio.src = file;
					this.audio.load();
				}
				this.audio.play();
			}
		}
	}

    /**
	 * corrects entity's position if they sink into the floor
	 * @param amount the number of vertical pixels to adjust
	 */
    bump(amount: number) {
        this.pos.y -= amount;
        this.bumped = true;
    }
}