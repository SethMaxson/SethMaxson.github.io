import IDoor from './interfaces/level-data/door.js';
import Entity from './base-types/entity.js';
export default class Door extends Entity implements IDoor {
    otherSide: {
        map: string;
        x: number;
        y: number;
        retainX: boolean;
        retainY: boolean;
        facing: string;
        onGround: boolean;
    };
    constructor(args: any, map?: string, x?: number, y?: number, retainX?: boolean, retainY?: boolean, facing?: string, onGround?: boolean);
}
