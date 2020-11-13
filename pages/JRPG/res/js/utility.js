// const
export const Settings = {
    Width: 640,
    Height: 480,
    GS: 32,
    Scale: 2
};
export var Enums;
(function (Enums) {
    let Directions;
    (function (Directions) {
        Directions[Directions["Down"] = 0] = "Down";
        Directions[Directions["Left"] = 1] = "Left";
        Directions[Directions["Right"] = 2] = "Right";
        Directions[Directions["Up"] = 3] = "Up";
    })(Directions = Enums.Directions || (Enums.Directions = {}));
})(Enums || (Enums = {}));
export function div(a, b) {
    return Math.ceil(a / b - 0.5);
}
export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=utility.js.map