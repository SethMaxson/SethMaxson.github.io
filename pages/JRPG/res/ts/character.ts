import { Settings, div, Enums, Vector2 } from "./utility.js";
import { LevelMap, HitBox } from './map.js';
import { SpriteManager } from './engine.js';

var STOP = 0;
var MOVE = 1;
var PROB_MOVE = 0.1;

export class Character{
	animationLength: number;
	name: string;
	/** Position in pixels */
	position: Vector2;
	velocity: Vector2;
	speed: number;
	moving: boolean;
	direction: number;
	hitbox: HitBox;
	movetype: number;
	/** Duration of each frame of sprite animation */
	animcycle: number;
	frame: number;
	frameSize: Vector2;
	renderSize: Vector2;
	message: string;
	offset: Vector2;
	frameOffset: number;
	hidden: boolean;
	image: HTMLImageElement;
	specialFlags: string[];
	constructor(name: string, x: number, y: number, dir: number, moveType: number, message: string, sprite: string = "soldier") {
		this.name = name;
		this.animcycle = 12;
		this.hidden = false;
		this.position = { x: x * Settings.GS, y: y * Settings.GS };
		this.velocity = { x: 0, y: 0 };
		// this.speed = 4;
		// this.animcycle = 6;
		const FPS = 60;
		this.speed = Math.round((Settings.GS * 3) / FPS);
		// this.speed = 2;
		this.specialFlags = [];
		this.moving = false;
		this.direction = dir;
		this.movetype = moveType;
		this.frame = 0;
		this.frameSize = { x: 20, y: 40 };
		this.renderSize = { x: 1, y: 2 };
		this.animationLength = 4;
		this.message = message;
		this.frameOffset = 0;
		this.offset = {
			x: 0,
			y: Settings.GS*1.25
		};
		this.hitbox = new HitBox();
		this.hitbox.position.x = this.position.x;
		this.hitbox.position.y = this.position.y;
		this.hitbox.width = this.renderSize.x * Settings.GS;
		this.hitbox.height = this.renderSize.y * Settings.GS;

		this.image = SpriteManager.getImage("images/" + sprite + ".png");
	}

	update(map: LevelMap) {
		this.frame += 1;

		// continue moving until player fits in the fixed cell
		if (this.moving == true) {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.hitbox.position.x = this.position.x;
			this.hitbox.position.y = this.position.y;
			if (this.position.x % Settings.GS == 0 && this.position.y % Settings.GS == 0) {
				this.moving = false;
			} else {
				return;
			}
		} else if (this.movetype == MOVE && Math.random() < PROB_MOVE) {
			this.direction = Math.floor(Math.random() * 4);  // 0 - 3
			this.moveStart(this.direction, map);
		}
	}

	draw(ctx: CanvasRenderingContext2D, offset: Vector2) {
		if (!this.hidden) {
			// get vertical offset of target frame
			let vOff = this.direction*this.frameSize.y;

			let positionX = this.position.x - offset.x - this.offset.x;
			let positionY = this.position.y - offset.y - this.offset.y;

			let frameNo = 0;
			if (this.moving) {
				// get index of current animation frame, multiply by width of animation frame
				frameNo = (div(this.frame, this.animcycle) % this.animationLength) + this.frameOffset;
				frameNo *=  this.frameSize.x;
			}

			ctx.drawImage(this.image, frameNo, vOff, this.frameSize.x, this.frameSize.y,
						positionX, positionY, this.renderSize.x * Settings.GS, this.renderSize.y * Settings.GS);
		}
	}

	/** Get the current position as a cell/tile */
	get cell(): Vector2
	{
		let cellX = div(this.position.x, Settings.GS);
		let cellY = div(this.position.y, Settings.GS);
		return { x: cellX, y: cellY };
	}

	moveStart(dir: Enums.Directions, map: LevelMap) {
		if (this.direction != dir) this.frame = 0;
		let cell = this.cell;
		if (dir == Enums.Directions.Left) {
			this.direction = Enums.Directions.Left;
			if (map.isMovable(cell.x-1, cell.y)) {
				this.velocity.x = - this.speed;
				this.velocity.y = 0;
				this.moving = true;
			}
		} else if (dir == Enums.Directions.Up) {
			this.direction = Enums.Directions.Up;
			if (map.isMovable(cell.x, cell.y-1)) {
				this.velocity.x = 0;
				this.velocity.y = - this.speed;
				this.moving = true;
			}
		} else if (dir == Enums.Directions.Right) {
			this.direction = Enums.Directions.Right;
			if (map.isMovable(cell.x+1, cell.y)) {
				this.velocity.x = this.speed;
				this.velocity.y = 0;
				this.moving = true;
			}
		} else if (dir == Enums.Directions.Down) {
			this.direction = Enums.Directions.Down;
			if (map.isMovable(cell.x, cell.y+1)) {
				this.velocity.x = 0;
				this.velocity.y = this.speed;
				this.moving = true;
			}
		}
	}
}