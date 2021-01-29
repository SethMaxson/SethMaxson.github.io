/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { HUD } from "./hud.js";
import { Attitude } from "./../engine.js";
export declare class Reticle {
    parent: HUD;
    _target: string;
    constructor(parent: HUD);
    get element(): JQuery<HTMLElement>;
    get label(): string;
    set label(value: string);
    target(disposition?: Attitude): void;
}
