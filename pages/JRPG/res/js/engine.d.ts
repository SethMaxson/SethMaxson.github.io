import { LevelMap } from './map.js';
import { InputManager } from './input-manager.js';
import { ImageManager } from './image-manager.js';
export declare var MainProcess: Engine;
export declare var Controller: InputManager;
export declare var SpriteManager: ImageManager;
export interface MainContexts {
    background: CanvasRenderingContext2D;
    foreground: CanvasRenderingContext2D;
    ui: CanvasRenderingContext2D;
}
export declare class Engine {
    updateUI: boolean;
    contexts: MainContexts;
    LoopInterval: number;
    FramesPerSecond: number;
    safeZone: number;
    map: LevelMap;
    constructor(mapName?: string, fullScreenOnly?: boolean);
    resize(clearDraw?: boolean): void;
    loadMap(fileName?: string): void;
}
