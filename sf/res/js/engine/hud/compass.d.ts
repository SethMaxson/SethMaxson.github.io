/// <reference types="jquery" />
import { Main } from '../engine';
export declare class Compass {
    element: JQuery<HTMLElement>;
    constructor();
    update(main: Main): void;
    hide(): void;
}
