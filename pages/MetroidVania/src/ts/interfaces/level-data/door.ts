export default interface IDoor
{
	otherSide: {
		map: string;
		x: number;
		y: number;
		retainX: boolean;
		retainY: boolean;
		facing: string;
		onGround: boolean;
	};
}