export declare const Settings: {
    Width: number;
    Height: number;
    GS: number;
    Scale: number;
};
export declare module Enums {
    enum Directions {
        Down = 0,
        Left = 1,
        Right = 2,
        Up = 3
    }
}
export declare function div(a: number, b: number): number;
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
