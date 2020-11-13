import { globals } from "../util.js";
import IPoint2D from "../interfaces/point2d.js"
import { Sprite } from '../img-loader.js';

const nullImg = new Image();

interface SpriteOffset
{
	x: number;
	y: number;
	w: number;
	h: number;
}

interface EntitySize
{
	w: number;
	h: number;
}
interface EntityConstructorArguments
{
	size?: EntitySize;
	pos?: IPoint2D;
	vel?: IPoint2D;
	color?: string;
	sprites?: CanvasImageSource[]|Sprite;
	spriteOffset?: SpriteOffset;
	tile?: boolean;
}

class Entity {
	size: EntitySize;
	pos: IPoint2D;
	vel: IPoint2D;
	color: string;
	sprites: CanvasImageSource[]|Sprite|null;
	spriteOffset: SpriteOffset;
	spriteIdx: number;
	nullImg: HTMLImageElement;
	tile: boolean;
	type: string;
	isEnemy?: boolean;
	isInteractive?: boolean;
	constructor(args: EntityConstructorArguments)
	{
		args = args || {};
		if (args.size) {
			this.size = args.size;
		} else if (args.spriteOffset) {
			this.size = { w: args.spriteOffset.w, h: args.spriteOffset.h };
		} else
		{
			this.size = { w: 100, h: 100 };
		}
		this.tile = args.tile || false;
		this.pos = args.pos || { x: 0, y: 0 };
		this.vel = args.vel || { x: 0, y: 0 };
		this.color = args.color || "limegreen";
		this.sprites = args.sprites || null;
		this.spriteOffset = args.spriteOffset || { x: 0, y: 0, w: 0, h: 0 };
		this.type = "block";
		this.spriteIdx = 0;
		this.nullImg = nullImg;
		this.render = this.render.bind(this);
	}

	render(ctx: CanvasRenderingContext2D) {
		if (this.sprites === null)
		{
			ctx.fillStyle = this.color;
			//   ctx.fillRect(
			//     Math.floor(this.pos.x),
			//     Math.floor(this.pos.y),
			//     Math.round(this.size.w),
			//     Math.round(this.size.h)
			//   );
			ctx.fillRect(
				this.pos.x,
				this.pos.y,
				this.size.w,
				this.size.h
			);
		}
		else if (Array.isArray(this.sprites))
		{
			/* v for debug v */
			// ctx.fillStyle = this.color;
			// ctx.fillRect(
			//   this.pos.x,
			//   this.pos.y,
			//   this.size.w,
			//   this.size.h
			// );
			/* ^ for debug ^ */
			if (this.sprites[this.spriteIdx])
			{
				ctx.drawImage(
					this.sprites[this.spriteIdx],
					this.pos.x + this.spriteOffset.x,
					this.pos.y + this.spriteOffset.y,
					this.spriteOffset.w,
					this.spriteOffset.h
				);
			}
		}
		else
		{
			ctx.drawImage(
				this.sprites.image,
				this.sprites.frameSize.x * (this.sprites.animationOffset.x + this.spriteIdx),
				this.sprites.frameSize.y * this.sprites.animationOffset.y,
				this.sprites.frameSize.x,
				this.sprites.frameSize.y,
				this.pos.x + this.spriteOffset.x,
				this.pos.y + this.spriteOffset.y,
				this.spriteOffset.w,
				this.spriteOffset.h
			);
		}
	}

	applyVelocity(deltaT: number) {
		const timeAdj = 0.01;
		this.pos.y += (this.vel.y * (deltaT * timeAdj));
		this.pos.x += this.vel.x;

		this.vel.y += (globals.gravity * (deltaT * timeAdj));
		if (this.vel.y > globals.maxVelocity) this.vel.y = globals.maxVelocity;
	}

	input() { }

	update() { }

	interact(instigator: Entity) { }
}

export default Entity;
