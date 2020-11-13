import Enemy from "../../base-types/enemy.js";
import {
    zombieRiseLeft,
    zombieRiseRight,
    zombieLeft,
    zombieRight,
    enemyDeath
} from "../../img-loader.js";

export default class ZombieSmart extends Enemy {
	moveSpeed: number;
	movingLeft: boolean;
	animationIntervalId: NodeJS.Timeout|null;
	deathAnimationId: NodeJS.Timeout|null;
	spawnId: NodeJS.Timeout;
    constructor(startVals: any) {
		super(startVals);
        this.moveSpeed = startVals.moveSpeed || 0;
        this.size = {
            w: 60,
            h: 100
        };
        this.spriteOffset = {
            x: -30,
            y: -30,
            w: 110,
            h: 130
        };
        this.color = "white";

        if (startVals.movingLeft === undefined) {
            this.movingLeft = true;
        } else {
            this.movingLeft = startVals.movingLeft;
        }

        if (this.movingLeft) {
            this.sprites = zombieRiseLeft;
        } else {
            this.sprites = zombieRiseRight;
        }

        this.spawnAnimation = this.spawnAnimation.bind(this);
        this.animate = this.animate.bind(this);
        this.deathAnimation = this.deathAnimation.bind(this);

        this.animationIntervalId = null;
        this.deathAnimationId = null;
        this.spawnId = setInterval(this.spawnAnimation, 400);
    }

    ai() {
        if (this.deathAnimationId === null) {
			if (this.health > 0) {
				if (this.boundaryCollision.left && this.movingLeft) {
					this.movingLeft = false;
					this.sprites = zombieRight;
				}
				else if (this.boundaryCollision.right && !this.movingLeft) {
					this.movingLeft = true;
					this.sprites = zombieLeft;
				}
				if (this.movingLeft) {
					this.vel.x = -this.moveSpeed;
				} else {
					this.vel.x = this.moveSpeed;
				}
			}
			else // health 0 or less
			{
				this.health = 0;
				this.sprites = enemyDeath;
				this.spriteIdx = 0;
				clearInterval(this.animationIntervalId as NodeJS.Timeout);
				clearInterval(this.spawnId);
				this.vel = {
					x: 0,
					y: 0
				};
				this.playAudio("src/sfx/enemy dies.wav");
				this.deathAnimationId = setInterval(this.deathAnimation, 100);
			}
        }
		Object.keys(this.boundaryCollision).forEach(k =>
		{
			//@ts-ignore
			this.boundaryCollision[k] = false;
		});
    }

    spawnAnimation() {
        this.spriteIdx++;
		if (this.sprites)
		{
			if (this.spriteIdx >= this.sprites.length)
			{
				clearInterval(this.spawnId);
				this.spriteIdx = 0;
				if (this.movingLeft)
				{
					this.sprites = zombieLeft;
				} else
				{
					this.sprites = zombieRight;
				}
				this.moveSpeed = 1;
				this.animationIntervalId = setInterval(this.animate, 250);
			}
		}
    }

    deathAnimation() {
		this.spriteIdx++;
		if (this.sprites) {
			if (this.spriteIdx >= this.sprites.length) {
				clearInterval(this.deathAnimationId as NodeJS.Timeout);
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
}