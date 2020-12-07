/// <reference types="jquery" />
import { Reticle } from "./reticle.js";
import { Entity } from "./../entity/entity.js";
import { HitPoints, Main } from "./../engine.js";
import { Compass } from './compass.js';
export declare class HUD {
    html: JQuery<HTMLElement>;
    reticle: Reticle;
    healthBar: HealthBar;
    compass: Compass;
    constructor(name?: string);
    $(selector: string): JQuery<HTMLElement>;
    setEntity(ent: Entity): void;
    showTooltip(text: string, duration?: number): void;
    hideTooltip(): void;
    update(main: Main): void;
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
