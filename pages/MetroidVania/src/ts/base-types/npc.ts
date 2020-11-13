import Entity from "./entity.js";
import Creature from './creature.js';
import { npcImgs } from '../img-loader.js';
import { globals } from '../util.js';
import DialogPrinter from '../ui/dialog-printer.js';

export default class NPC extends Creature {
	playerLoc: any;
	animationIntervalId: NodeJS.Timeout;
	deathAnimationId: NodeJS.Timeout|null;
	distToPlayerIntervalId: NodeJS.Timeout;
	boundaryCollision: { bottom: boolean; left: boolean; right: boolean; };
	boundaries: { bottom: { x: number; y: number; }; left: { x: number; y: number; }; right: { x: number; y: number; }; };
	inRange: boolean;
	deathAnimation: any;
    constructor(startVals: any) {
        super(startVals);
        this.playerLoc = startVals.playerLoc;
        this.collisionDamage = 1;
        this.defense = 0;
        this.health = 1;
        this.recoverTime = 500;
        this.boundaryCollision = {
            bottom: false,
            left: false,
            right: false
		};
		this.boundaries = { bottom: { x: 0, y: 0 }, left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
        this.calculateBounds();
		this.type = "npc";

		this.ai = this.ai.bind(this);

        this.distToPlayer = this.distToPlayer.bind(this);
        this.inRange = false;
		this.isInteractive = true;

        this.distToPlayerIntervalId = setInterval(this.distToPlayer, 500);
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

        this.animationIntervalId = setInterval(this.animate, 185);
        this.deathAnimationId = null;
    }

	ai() { }

	interact(instigator: Creature)
	{
		console.log(`${this.name}: S'up?`);
	}

	talk(instigator: Creature, dialogPrinter: DialogPrinter)
	{
		dialogPrinter.script = [`${this.name}: S'up?`];
		dialogPrinter.open();
	}

    update() {
        // stop enemy when they hit the ground
        if (this.boundaryCollision.bottom && this.vel.y > 0) {
            this.vel.y = 0;
        }
        this.boundaryCollision.bottom = false;
    }

    calculateBounds() {
        this.boundaries = {
            bottom: { x: this.pos.x + (this.size.w * 0.5), y: this.pos.y + this.size.h },
            left: { x: this.pos.x, y: this.pos.y + (this.size.h * 0.5) },
            right: { x: this.pos.x + this.size.w, y: this.pos.y + (this.size.h * 0.5) }
        };
    }

    distToPlayer() {
        let dist = Math.hypot(
            this.playerLoc.x - this.pos.x,
            this.playerLoc.y - this.pos.y
        );

        // if (dist < 500) this.inRange = true;
        // else this.inRange = false;
	}

	render(ctx: CanvasRenderingContext2D)
	{
		if (this.inRange) {
			ctx.drawImage(npcImgs.alert.image, this.pos.x, this.pos.y - npcImgs.alert.frameSize.y);
		}
		super.render(ctx);
	}

    calcBoundsCollision(otherBox: Entity) {
        if (!otherBox.isEnemy) {
			// bottom collision detection
			if ((this.boundaries.bottom.x >= otherBox.pos.x) && (this.boundaries.bottom.x <= (otherBox.pos.x + otherBox.size.w)) &&
				(this.boundaries.bottom.y >= otherBox.pos.y) && (this.boundaries.bottom.y <= (otherBox.pos.y + otherBox.size.h))) {

				this.boundaryCollision.bottom = true;

				if (!this.bumped) {
					let offset = this.boundaries.bottom.y - otherBox.pos.y;
					this.bump(offset);
				}
			}
			if (!this.boundaryCollision.bottom) {
				this.bumped = false;
			}

			// left collision detection
			if ((this.boundaries.left.x >= otherBox.pos.x) && (this.boundaries.left.x <= (otherBox.pos.x + otherBox.size.w)) &&
				(this.boundaries.left.y >= otherBox.pos.y) && (this.boundaries.left.y <= (otherBox.pos.y + otherBox.size.h))) {
				this.boundaryCollision.left = true;
			}

			// right collision detection
			if ((this.boundaries.right.x >= otherBox.pos.x) && (this.boundaries.right.x <= (otherBox.pos.x + otherBox.size.w)) &&
				(this.boundaries.right.y >= otherBox.pos.y) && (this.boundaries.right.y <= (otherBox.pos.y + otherBox.size.h))) {
				this.boundaryCollision.right = true;
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
}