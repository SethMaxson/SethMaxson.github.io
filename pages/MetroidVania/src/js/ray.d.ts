import IPoint2D from './interfaces/point2d';
export default class Ray {
    start: IPoint2D;
    end: IPoint2D;
    constructor(x?: number, y?: number, length?: number);
}
