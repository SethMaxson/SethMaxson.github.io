import Entity from "./entity.js";
import Player from '../player.js';
import { globals } from '../util.js';

export default class PowerUp extends Entity {
	constructor(startVals: any, tileSize: number = globals.tileSize)
	{

		startVals.size = { w: tileSize, h: tileSize };
		startVals.spriteOffset = {
			x: 0,
			y: 0,
			w: tileSize,
			h: tileSize
		};
		startVals.vel = { x: 0, y: 0 };
		startVals.color = 'rgb(20, 200, 20)';
        super(startVals);
    }

    use(player: Player) { }
}