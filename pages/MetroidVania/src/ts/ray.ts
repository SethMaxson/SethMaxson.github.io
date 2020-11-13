import IPoint2D from './interfaces/point2d';

export default class Ray
{
	start: IPoint2D;
	end: IPoint2D;
	constructor(x: number = 1, y: number = 0, length: number = 1)
	{
		this.start = { x: 1, y: 0 };
		this.end = {x: 1, y: 0};
	}
}