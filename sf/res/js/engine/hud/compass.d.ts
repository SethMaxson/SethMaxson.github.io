/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { Main } from '../engine';
export declare class Compass {
    element: JQuery<HTMLElement>;
    constructor();
    update(main: Main): void;
    hide(): void;
}
