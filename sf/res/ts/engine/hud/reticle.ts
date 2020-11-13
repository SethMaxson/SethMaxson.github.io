import { HUD } from "./hud.js";
import { Attitude } from "./../engine.js";

export class Reticle
{
	parent: HUD;
	_target: string = "";
	constructor(parent: HUD)
	{
		this.parent = parent;
	}
	get element(): JQuery<HTMLElement>
	{
		return this.parent.$(".reticle");
	}
	get label(): string
	{
		return this.parent.$(".target-label").html();
	}
	set label(value)
	{
		if (this._target != value)
		{
			this._target = value;
			this.parent.$(".target-label").html(value);
		}
	}
	target(disposition?: Attitude)
	{
		if (disposition == undefined)
		{
			this.element[0].style.borderColor = "rgba(255,255,255, 0.4)"; // Reset to default
		}
		else
		{
			// TODO: Add handling for non-hostiles
			this.element[0].style.borderColor = "rgba(200,50,50,0.9)"; // Hostile
		}

	}
}