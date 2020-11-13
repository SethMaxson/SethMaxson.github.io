import { Character } from './character.js';
import { Settings, div, Enums, Vector2 } from './utility.js';
import { LevelMap, HitBox } from './map.js';
import { Controller } from './engine.js';
import { Sprite, SpriteAnimation } from './sprite.js';

// Player is a subclass of Character
export class PlayerGridBased extends Character
{
	weapon: Sprite;
	constructor(name: string, x: number, y: number, dir: number) {
		super(name, x, y, dir, 0, "", "Dude_SpriteSheet");
		this.frameSize.x = 20;
		this.frameSize.y = 40;
		this.animationLength = 4;
		this.frameOffset = 1;
		this.renderSize.y = 2;
		this.weapon = new Sprite();
	}

	update(map: LevelMap) {
		this.frame += 1;

		// continue moving until player fits in the fixed cell
		if (this.moving == true) {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			let modX = (this.direction == Enums.Directions.Left || this.direction == Enums.Directions.Right)? (this.direction == Enums.Directions.Right ? Settings.GS : - Settings.GS) : 0;
			let modY = (this.direction == Enums.Directions.Up || this.direction == Enums.Directions.Down)? (this.direction == Enums.Directions.Down ? Settings.GS : - Settings.GS) : 0;
			this.weapon.position.x = this.position.x + modX;
			this.weapon.position.y = this.position.y + modY;
			if (this.position.x % Settings.GS == 0 && this.position.y % Settings.GS == 0) {
				this.moving = false;
			} else {
				return;
			}
		}


		if (Controller.keys.left?.down)
		{
			this.weapon.rotation = 270;
			// this.weapon.offset.x = (1 - this.weapon.renderWidth/2) * Settings.GS;
			// this.weapon.offset.y = 0;
			this.moveStart(Enums.Directions.Left, map);
		} else if (Controller.keys.up?.down) {
			this.weapon.rotation = 0;
			// this.weapon.offset.x = 0;
			// this.weapon.offset.y = -Settings.GS;
			this.moveStart(Enums.Directions.Up, map);
		} else if (Controller.keys.right?.down) {
			this.weapon.rotation = 90;
			// this.weapon.offset.x = -(1 + this.weapon.renderWidth) * Settings.GS;
			// this.weapon.offset.y = 0;
			this.moveStart(Enums.Directions.Right, map);
		} else if (Controller.keys.down?.down) {
			this.weapon.rotation = 180;
			// this.weapon.offset.x = 0;
			// this.weapon.offset.y = Settings.GS;
			this.moveStart(Enums.Directions.Down, map);
		}

		// let direction = this.direction;
		// let weaponRotation = 0;
		// let weaponPositionMod = { x: 0, y: 0 };
		// let startMove = false;
		// if (Controller.keys.left?.down)
		// {
		// 	startMove = true;
		// 	direction = Enums.Directions.Left;
		// 	weaponRotation = 270;
		// 	weaponPositionMod.x = -Settings.GS;
		// 	// this.weapon.position.x -= Settings.GS;
		// } else if (Controller.keys.up?.down) {
		// 	startMove = true;
		// 	direction = Enums.Directions.Up;
		// 	weaponRotation = 0;
		// } else if (Controller.keys.right?.down) {
		// 	startMove = true;
		// 	direction = Enums.Directions.Right;
		// 	weaponRotation = 90;
		// } else if (Controller.keys.down?.down)
		// {
		// 	startMove = true;
		// 	direction = Enums.Directions.Down;
		// 	weaponRotation = 180;
		// 	weaponPositionMod.x = Settings.GS;
		// }
		// if (startMove) {
		// 	this.weapon.rotation = weaponRotation;
		// 	this.weapon.position.x += weaponPositionMod.x;
		// 	this.weapon.position.y += weaponPositionMod.y;
		// 	this.moveStart(direction, map);
		// }
	}

	draw(ctx: CanvasRenderingContext2D, offset: Vector2)
	{
		super.draw(ctx, offset);
		this.weapon.update();
		this.weapon.draw(ctx, offset);
	}
}

export class Player extends Character
{
	weapon: Sprite;
	feetHitBox: HitBox;
	boundaryCollision: { top: boolean, right: boolean, left: boolean, bottom: boolean };
	bumped: { x: boolean, y: boolean };
	constructor(name: string, x: number, y: number, dir: number, sprite: string = "Dude_SpriteSheet") {
		super(name, x, y, dir, 0, "", sprite);
		this.frameSize.x = 20;
		this.frameSize.y = 40;
		this.animationLength = 4;
		this.frameOffset = 1;
		this.renderSize.y = 2;
		this.weapon = new Sprite();
		this.specialFlags.push("Player");
		this.boundaryCollision = { top: false, right: false, left: false, bottom: false };
		this.bumped = { x: false, y: false };
		let boxSize = Math.round(Settings.GS * 0.7);
		let offset = (Settings.GS - boxSize)/2;
		this.feetHitBox = new HitBox(x * Settings.GS + offset, y * Settings.GS + offset, boxSize, boxSize, offset, offset);
	}

	update(map: LevelMap) {
		this.frame += 1;

		// original sorta working version
		// // continue moving until player fits in the fixed cell
		// // if (this.moving == true) {
		// 	this.position.x += this.velocity.x;
		// 	this.position.y += this.velocity.y;
		// 	this.hitbox.position.x = this.position.x;
		// 	this.hitbox.position.y = this.position.y;
		// 	this.feetHitBox.position.x = this.position.x + this.feetHitBox.offset.x;
		// 	this.feetHitBox.position.y = this.position.y + this.feetHitBox.offset.y;
		// // }
		// /original

		// test by moving only the hitboxes before the move actually happens
		this.hitbox.position.x = this.position.x;
		this.hitbox.position.y = this.position.y;
		this.feetHitBox.position.x = this.position.x + this.feetHitBox.offset.x;
		this.feetHitBox.position.y = this.position.y + this.feetHitBox.offset.y;
		// /test

		let modX = (this.direction == Enums.Directions.Left || this.direction == Enums.Directions.Right)? (this.direction == Enums.Directions.Right ? Settings.GS : - Settings.GS) : 0;
		let modY = (this.direction == Enums.Directions.Up || this.direction == Enums.Directions.Down)? (this.direction == Enums.Directions.Down ? Settings.GS : - Settings.GS) : 0;
		this.weapon.position.x = this.position.x + modX;
		this.weapon.position.y = this.position.y + modY;
		if (Controller.keys.attack.justPressed)
		{
			this.weapon.frame = 0;
			this.weapon.animation = new SpriteAnimation(0, 0, 7, 1, 0);
			this.weapon.animation.recalculate();
		}
		this.move(map);

		// test by moving only the actual object only if the hitboxes are allowed to move
		if (this.moving == true) {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.hitbox.position.x = this.position.x;
			this.hitbox.position.y = this.position.y;
			this.feetHitBox.position.x = this.position.x + this.feetHitBox.offset.x;
			this.feetHitBox.position.y = this.position.y + this.feetHitBox.offset.y;
		}
		// /test
	}

	draw(ctx: CanvasRenderingContext2D, offset: Vector2)
	{
		super.draw(ctx, offset);
		this.weapon.update();
		this.weapon.draw(ctx, offset);
	}

	move(map: LevelMap) {
		let cell = this.cell;
		let dir = this.direction;
		let movementVector = Controller.getMovementDirection();
		let wasMoving = this.moving;
		let adjustedSpeed = Controller.keys.sprint.down ? this.speed * 2 : this.speed;

		if (Math.abs(movementVector.x) > Math.abs(movementVector.y)) {
			if (movementVector.x < 0)
			{
				this.weapon.rotation = 270;
				// this.weapon.offset.x = (1 - this.weapon.renderWidth/2) * Settings.GS;
				// this.weapon.offset.y = 0;
				dir = Enums.Directions.Left;
			}
			else if (movementVector.x > 0)
			{
				this.weapon.rotation = 90;
				// this.weapon.offset.x = -(1 + this.weapon.renderWidth) * Settings.GS;
				// this.weapon.offset.y = 0;
				dir = Enums.Directions.Right;
			}
		}
		else
		{
			if (movementVector.y < 0)
			{
				this.weapon.rotation = 0;
				// this.weapon.offset.x = 0;
				// this.weapon.offset.y = -Settings.GS;
				dir = Enums.Directions.Up;
			}
			else if (movementVector.y > 0)
			{
				this.weapon.rotation = 180;
				// this.weapon.offset.x = 0;
				// this.weapon.offset.y = Settings.GS;
				dir = Enums.Directions.Down;
			}
		}


		// let cellX = div(this.position.x, Settings.GS);
		// let cellY = div(this.position.y, Settings.GS);
		// return { x: cellX, y: cellY };

		if ((movementVector.x < 0 && !this.boundaryCollision.left) ||
			(movementVector.x > 0 && !this.boundaryCollision.right))

		// if ((movementVector.x < 0 && map.isMovable(cell.x - 1, cell.y)) ||
		// 	(movementVector.x > 0 && map.isMovable(cell.x + 1, cell.y)))
		{
			this.velocity.x = movementVector.x > 0? Math.ceil(movementVector.x * adjustedSpeed) : Math.floor(movementVector.x * adjustedSpeed);
		}
		else
		{
			this.velocity.x = 0;
		}

		if ((movementVector.y < 0 && !this.boundaryCollision.top) ||
			(movementVector.y > 0 && !this.boundaryCollision.bottom))

		// if ((movementVector.y < 0 && map.isMovable(cell.x, cell.y - 1)) ||
		// 	(movementVector.y > 0 && map.isMovable(cell.x, cell.y + 1)))
		{
			this.velocity.y = movementVector.y > 0? Math.ceil(movementVector.y * adjustedSpeed) : Math.floor(movementVector.y * adjustedSpeed);

		}
		else
		{
			this.velocity.y = 0;
		}

		if (this.velocity.x != 0 || this.velocity.y != 0) {
			this.moving = true;
		}
		else
		{
			this.moving = false;
		}

		if (this.direction != dir || this.moving != wasMoving)
		{
			this.frame = 0;
			this.direction = dir;
		}
	}

	resetBounds()
	{
		// reset collision for player
		Object.keys(this.boundaryCollision).forEach(k =>
		{
			//@ts-ignore
			this.boundaryCollision[k] = false;
		});
		this.bumped.x = false;
		this.bumped.y = false;
	}

	calcBoundsCollision(otherBox: HitBox, map: LevelMap)
	{
		let hitbox = this.feetHitBox;
		let bottom = hitbox.position.y + hitbox.height;
		let right = hitbox.position.x + hitbox.width;
		let overlap = { top: 0, right: 0, bottom: 0, left: 0 };

		// check for collisions on the top edge
		if ((hitbox.position.y > otherBox.position.y) && (hitbox.position.y <= (otherBox.position.y + otherBox.height))) {
			if (((hitbox.position.x >= otherBox.position.x) && (hitbox.position.x < (otherBox.position.x + otherBox.width))) ||
				((right > otherBox.position.x) && (right <= (otherBox.position.x + otherBox.width)))) {
				this.boundaryCollision.top = true;
				overlap.top = otherBox.position.y + otherBox.height - hitbox.position.y;
			}
		}


		// check for collisions on the right edge
		if ((hitbox.position.x + hitbox.width >= otherBox.position.x) && (hitbox.position.x + hitbox.width <= (otherBox.position.x + otherBox.width)))
		{
			if (((hitbox.position.y > otherBox.position.y) && (hitbox.position.y < (otherBox.position.y + otherBox.height))) ||// is the top y coordinate of this hitbox contained within the other?
			((bottom > otherBox.position.y) && (bottom <= (otherBox.position.y + otherBox.height)))) // is the bottom y coordinate of this hitbox contained within the other?
			{
				this.boundaryCollision.right = true;
				overlap.right = right - otherBox.position.x;
				// map.drawCollisions.push(otherBox);
			}
		}

		// check for collisions on the bottom edge
		if ((bottom >= otherBox.position.y) && (bottom <= (otherBox.position.y + otherBox.height))) {
			if (((hitbox.position.x >= otherBox.position.x) && (hitbox.position.x < (otherBox.position.x + otherBox.width))) ||
				((right > otherBox.position.x) && (right <= (otherBox.position.x + otherBox.width))))
			{
				this.boundaryCollision.bottom = true;
				overlap.bottom = bottom - otherBox.position.y;
				// map.drawCollisions.push(otherBox);
			}
		}

		// check for collisions on the left edge
		if ((hitbox.position.x >= otherBox.position.x) && (hitbox.position.x <= (otherBox.position.x + otherBox.width)))
		{
			if (((hitbox.position.y >= otherBox.position.y) && (hitbox.position.y < (otherBox.position.y + otherBox.height))) ||
				((bottom > otherBox.position.y) && (bottom <= (otherBox.position.y + otherBox.height))))
			{
				this.boundaryCollision.left = true;
				overlap.left = otherBox.position.x + otherBox.width - hitbox.position.x;
				// map.drawCollisions.push(otherBox);
			}
		}

		if (!this.bumped.y) {
			if (overlap.top < Math.max(overlap.left, overlap.right) && overlap.bottom == 0)
			{
				this.bumped.y = true;
				this.position.y += overlap.top;
			}
			else if (overlap.bottom < Math.max(overlap.left, overlap.right) && overlap.top == 0)
			{
				this.bumped.y = true;
				this.position.y -= overlap.bottom;
			}
		}

		if (!this.bumped.x) {
			if (overlap.left < Math.max(overlap.top, overlap.bottom) && overlap.right == 0)
			{
				this.bumped.x = true;
				this.position.x += overlap.left;
			}
			else if (overlap.right < Math.max(overlap.top, overlap.bottom) && overlap.left == 0)
			{
				this.bumped.x = true;
				this.position.x -= overlap.right;
			}
		}
	}
}

function logit(hitbox: HitBox, otherBox: HitBox)
{

	console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
	console.log(`this.hitbox: left: ${hitbox.position.x}, right: ${hitbox.position.x + hitbox.width}, top: ${hitbox.position.y}, bottom: ${hitbox.position.y + hitbox.height}`);
	console.log(`that.hitbox: left: ${otherBox.position.x}, right: ${otherBox.position.x + otherBox.width}, top: ${otherBox.position.y}, bottom: ${otherBox.position.y + otherBox.height}`);
}