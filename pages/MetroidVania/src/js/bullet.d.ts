import Ray from './ray.js';
import IVector2D from './interfaces/vector2d.js';
export default class Bullet {
    vector: IVector2D;
    ray: Ray;
    constructor(speed?: number);
    update(elapsedTime: number): void;
}
