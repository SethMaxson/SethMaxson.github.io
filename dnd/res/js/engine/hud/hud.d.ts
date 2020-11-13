/// <reference types="jquery" />
import { Reticle } from "./reticle.js";
import { Entity, HitPoints } from "./../engine.js";
export declare class HUD {
    html: JQuery<HTMLElement>;
    reticle: Reticle;
    healthBar: HealthBar;
    constructor(name?: string);
    $(selector: string): JQuery<HTMLElement>;
    setEntity(ent: Entity): void;
    showTooltip(text: string, duration?: number): void;
    hideTooltip(): void;
    get name(): string;
    set name(value: string);
    get showSpellMenu(): boolean;
    set showSpellMenu(value: boolean);
}
export declare class HealthBar {
    element: JQuery<HTMLElement>;
    constructor(hp?: HitPoints);
    update(hp: HitPoints): void;
}
