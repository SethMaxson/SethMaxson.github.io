/// <reference types="jquery" />
declare class HUD {
    html: JQuery<HTMLElement>;
    constructor(name?: string);
    $(selector: string): JQuery<HTMLElement>;
}
