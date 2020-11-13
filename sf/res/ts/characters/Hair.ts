export class Hair
{
	color: string;
	style: string;
	texture?: string;
	constructor(style: string, color: number | string = 0x2f2f2f, texture?: string)
	{
		this.color = typeof color == "number" ? "#" + color.toString(16) : color;
		this.style = style;
		this.texture = texture;
	}
}