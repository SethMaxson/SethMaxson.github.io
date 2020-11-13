import Entity from "./entity.js";
import Player from './player.js';
export default class PowerUp extends Entity {
    constructor(startVals: any, tileSize?: number);
    use(player: Player): void;
}
