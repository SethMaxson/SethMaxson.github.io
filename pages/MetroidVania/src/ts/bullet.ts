import Ray from './ray.js';
import IVector2D from './interfaces/vector2d.js';

export default class Bullet
{
	vector: IVector2D;
	ray: Ray;
	constructor(speed: number = 1)
	{
		this.ray = new Ray();
		this.vector = {
			direction: {
				x: 0,
				y: 0
			},
			magnitude: speed
		};
	}
	update(elapsedTime: number)
	{
		this.ray.start.x = this.ray.end.x;
		this.ray.start.y = this.ray.end.y;
		this.ray.end.x += this.vector.direction.x * this.vector.magnitude * elapsedTime;
		this.ray.end.y += this.vector.direction.y * this.vector.magnitude * elapsedTime;
	}
}