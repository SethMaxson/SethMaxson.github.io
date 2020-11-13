import Enemy from "../../base-types/enemy.js";
import {
    npcImgs,
    enemyDeath
} from "../../img-loader.js";
import { globals } from '../../util.js';

export default class Stationary extends Enemy {
	playerLoc: any;
	animationIntervalId: NodeJS.Timeout;
	deathAnimationId: NodeJS.Timeout|null;
	attack: boolean;
	distToPlayerIntervalId: NodeJS.Timeout;
    constructor(startVals: any) {
        super(startVals);
        this.playerLoc = startVals.playerLoc;
        this.size = {
            w: 40,
            h: 80
		};
		this.vel = { x: 0, y: 0 };
		this.pos.y -= this.size.h - globals.tileSize;
        this.spriteOffset = {
            x: 0,
            y: 0,
            w: this.size.w,
            h: this.size.h
        };
        this.color = "red";
		this.sprites = npcImgs.left;

        this.animate = this.animate.bind(this);
        this.deathAnimation = this.deathAnimation.bind(this);

        this.animationIntervalId = setInterval(this.animate, 185);
        this.deathAnimationId = null;

        this.distToPlayer = this.distToPlayer.bind(this);
        this.attack = false;
        this.distToPlayerIntervalId = setInterval(this.distToPlayer, 500);
    }

    ai() {
        if (this.deathAnimationId === null) {
            if (this.health <= 0) {
				this.die();
            }
        }

        if (this.health > 0) {
            if (this.playerLoc.x < this.pos.x) {
                this.sprites = npcImgs.left;
            } else {
                this.sprites = npcImgs.right;
            }
        }
    }

    distToPlayer() {
        let dist = Math.hypot(
            this.playerLoc.x - this.pos.x,
            this.playerLoc.y - this.pos.y
        );

        if (dist < 500) this.attack = true;
        else this.attack = false;
	}

	die()
	{
		this.health = 0;
		this.spriteIdx = 0;
		this.sprites = enemyDeath;
		clearInterval(this.animationIntervalId as NodeJS.Timeout);
		this.vel = { x: 0, y: 0 };
		this.playAudio("src/sfx/enemy dies.wav");
		this.deathAnimationId = setInterval(this.deathAnimation, 100);
	}

    deathAnimation() {
        this.spriteIdx++;
		if (this.sprites)
		{
			if (this.spriteIdx >= this.sprites.length)
			{
				clearInterval(this.deathAnimationId as NodeJS.Timeout);
				clearInterval(this.distToPlayerIntervalId);
				this.dead = true;
			}
		}
    }

    animate() {
		this.spriteIdx++;
		if (this.sprites)
		{
			if (this.spriteIdx >= this.sprites.length) this.spriteIdx = 0;
		}
	}

    applyVelocity() {
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;
	}

	bump() { }

	update() { };
}
