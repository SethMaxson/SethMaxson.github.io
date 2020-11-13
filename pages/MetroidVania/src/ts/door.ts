import IDoor from './interfaces/level-data/door.js';
import Entity from './base-types/entity.js';

export default class Door extends Entity implements IDoor
{
	otherSide: { map: string; x: number; y: number; retainX: boolean; retainY: boolean; facing: string; onGround: boolean; };
	constructor(args: any, map: string = "level01", x: number = 0, y: number = 0, retainX: boolean = false, retainY: boolean = false, facing: string = "right", onGround: boolean = false)
	{
		super(args);
		this.type = "door";
		this.otherSide = {
			map: map,
			x: x,
			y: y,
			retainX: retainX,
			retainY: retainY,
			facing: facing,
			onGround: onGround
		}
	}
}