/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare class HUD {
    html: JQuery<HTMLElement>;
    constructor(name?: string);
    $(selector: string): JQuery<HTMLElement>;
}
