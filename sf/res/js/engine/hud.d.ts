/// <reference types="jquery" />
import { Reticle } from "./hud/reticle.js";
export declare class HUD {
    html: JQuery<HTMLElement>;
    reticle: Reticle;
    constructor(name?: string);
    $(selector: string): JQuery<HTMLElement>;
}
//# sourceMappingURL=hud.d.ts.map