// const
export const Settings = {
	Width: 640,
	Height: 480,
	GS: 32,
	Scale: 2
}

export module Enums {
	export enum Directions {
		Down = 0,
		Left = 1,
		Right = 2,
		Up = 3
	}
}


export function div(a: number, b: number): number {
    return Math.ceil(a / b - 0.5);
}

export class Vector2
{
	x: number;
	y: number;
	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}
}