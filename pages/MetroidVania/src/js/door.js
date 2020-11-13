import Entity from './base-types/entity.js';
export default class Door extends Entity {
    constructor(args, map = "level01", x = 0, y = 0, retainX = false, retainY = false, facing = "right", onGround = false) {
        super(args);
        this.type = "door";
        this.otherSide = {
            map: map,
            x: x,
            y: y,
            retainX: retainX,
            retainY: retainY,
            facing: facing,
            onGround: onGround
        };
    }
}
//# sourceMappingURL=door.js.map