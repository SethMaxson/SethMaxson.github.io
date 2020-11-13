import Entity from "./entity.js";
import Creature from './creature.js';

export default class Enemy extends Creature {
	boundaryCollision: { bottom: boolean; left: boolean; right: boolean; };
	boundaries: { bottom: { x: number; y: number; }; left: { x: number; y: number; }; right: { x: number; y: number; }; };
    constructor(startVals: any) {
        super(startVals);
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
		this.type = "enemy";
		this.isEnemy = true;

		this.ai = this.ai.bind(this);
    }

    ai() { }

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
}