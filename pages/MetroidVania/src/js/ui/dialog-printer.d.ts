/// <reference types="node" />
import { Size } from '../interfaces/size.js';
import IPoint2D from "../interfaces/point2d.js";
export default class DialogPrinter {
    private currentDialogComplete;
    fontSize: number;
    private index;
    private isClosing;
    private isOpening;
    isOpen: boolean;
    opacity: number;
    closeAnimationId: NodeJS.Timeout | null;
    openAnimationId: NodeJS.Timeout | null;
    position: IPoint2D;
    size: Size;
    script: string[];
    constructor(speed?: number);
    render(ctx: CanvasRenderingContext2D): void;
    open(): void;
    close(): void;
    private openAnimation;
    private closeAnimation;
}
