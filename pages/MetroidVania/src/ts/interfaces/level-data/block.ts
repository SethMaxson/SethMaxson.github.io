import { Size } from '../size';
import IPoint2D from '../point2d';

export default interface IBlock
{
	key: string;
	size: Size;
	color: string;
	sprite: string;
	spriteOffset: IPoint2D;
}