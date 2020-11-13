import { Settings, div, Enums, Vector2 } from "./utility.js";
import { LevelMap } from './map.js';
import { SpriteManager } from './engine.js';


var once = 0;

export class Sprite {
	/** Position in pixels */
	position: Vector2;
	rotation: number;
	/** Duration of each frame of sprite animation */
	animcycle: number;
	frame: number;
	frameWidth: number;
	frameHeight: number;
	renderSize: Vector2;
	offset: Vector2;
	image: HTMLImageElement;
	animation: SpriteAnimation;
	constructor(x: number = 0, y: number = 0, sprite: string = "weapons") {
		this.position = { x: x * Settings.GS, y: y * Settings.GS };
		this.animcycle = 2;
		this.frame = 0;
		this.frameWidth = 32;
		this.frameHeight = 32;
		this.renderSize = { x: 1, y: 1 };
		this.offset = {
			x: -16,
			y: 0
		};
		this.rotation = 0;
		// this.animation = new SpriteAnimation(0, 0, 6, 1);
		this.animation = new SpriteAnimation(0, 0, 1, 1, 0);
		this.animation.recalculate();

		// this.image = new Image();
		// this.image.src = "images/" + sprite + ".png";
		this.image = SpriteManager.getImage("images/" + sprite + ".png");
	}

	update() {
		this.frame += 1;
	}

	draw(ctx: CanvasRenderingContext2D, offset: Vector2) {
		let frameNo = (div(this.frame, this.animcycle) % this.animation.length);
		if ((this.frame / this.animcycle) == this.animation.length && this.animation.repeat > 0)
		{
			// animation loop complete. Decrement number of times to repeat.
			this.animation.repeat -= 1;
			this.frame = 0;
		}
		else if ((this.frame / this.animcycle) >= this.animation.length && this.animation.repeat == 0) {
			// end of animation loops reached. Do something.
			return;
		}

		let hOff = 0;
		let vOff = 0;

		let positionX = this.position.x - offset.x - this.offset.x;
		let positionY = this.position.y - offset.y - this.offset.y;

		if (this.animation.direction == AnimationDirections.Horizontal) {
			hOff = this.animation.startFrame.x + frameNo;
			vOff = this.animation.startFrame.y;
		}
		else
		{
			hOff = this.animation.startFrame.x;
			vOff = this.animation.startFrame.y + frameNo;
		}

		vOff *=  this.frameHeight;
		hOff *=  this.frameWidth;

		if (once > 0) {
			once--;
			console.log("this.position.x: " + this.position.x);
			console.log("this.position.y: " + this.position.y);
			console.log("this.frame: " + this.frame);
			console.log("this.animcycle: " + this.animcycle);
			console.log("this.animation.length: " + this.animation.length);
			console.log("frameNo: " + frameNo);
			console.log(this.image, hOff, vOff, this.frameWidth, this.frameHeight,
				positionX, positionY, this.renderSize.x * Settings.GS, this.renderSize.y * Settings.GS);
		}
		ctx.save();
		ctx.translate(positionX,positionY);
		ctx.fillStyle = "#ff0000"
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.translate(-(this.renderSize.x * Settings.GS)/2,-(this.renderSize.y * Settings.GS)/2);
		ctx.fillRect(0, 0, this.renderSize.x * Settings.GS, this.renderSize.y * Settings.GS);
		ctx.drawImage(this.image, hOff, vOff, this.frameWidth, this.frameHeight,
			0, 0, this.renderSize.x * Settings.GS, this.renderSize.y * Settings.GS);
		// ctx.drawImage(this.image, hOff, vOff, this.frameWidth, this.frameHeight,
		// 	positionX, positionY, this.renderSize.x * Settings.GS, this.renderSize.y * Settings.GS);
		// ctx.rotate(-this.rotation * Math.PI / 180);
		ctx.restore();
	}

	/** Get the current position as a cell/tile */
	get cell(): Vector2
	{
		let cellX = div(this.position.x, Settings.GS);
		let cellY = div(this.position.y, Settings.GS);
		return { x: cellX, y: cellY };
	}
}

export class SpriteAnimation
{
	startFrame: Vector2;
	endFrame: Vector2;
	length: number;
	direction: AnimationDirections;
	repeat: number;
	constructor(startX: number = 0, startY: number = 0, lengthX: number = 1, lengthY: number = 1, repeat: number = -1)
	{
		this.startFrame = { x: startX, y: startY };
		this.endFrame = { x: startX + lengthX - 1, y: startY + lengthY - 1 };
		this.length = 1;
		this.direction = AnimationDirections.Horizontal;
		this.repeat = repeat;
	}
	recalculate()
	{
		getAnimationLengthAndDirection(this);
	}
}

function getAnimationLengthAndDirection(animation: SpriteAnimation): { length: number, direction: AnimationDirections }
{
	let length = 1;
	let direction = AnimationDirections.Horizontal;
	let difX = (animation.endFrame.x - animation.startFrame.x) + 1;
	let difY = (animation.endFrame.y - animation.startFrame.y) + 1;
	if (difX > 1) {
		length = difX;
	}
	else if (difY > 1)
	{
		length = difY;
		direction = AnimationDirections.Vertical;
	}
	animation.length = length;
	animation.direction = direction;
	return { length: length, direction: direction };
}

enum AnimationDirections
{
	Horizontal = 0,
	Vertical = 1
}