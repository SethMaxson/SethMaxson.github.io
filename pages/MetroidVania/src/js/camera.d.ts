import Player from './player.js';
import { GameObjects } from './interfaces/game-objects.js';
import { Size } from './interfaces/size.js';
declare class Camera {
    thePlayer: Player;
    gameObjects: GameObjects;
    canvasCtx: CanvasRenderingContext2D;
    camBounds: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    camLimits: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    displayDebugInfo: boolean;
    faded: boolean;
    offsetX: number;
    offsetY: number;
    oldPosY: number;
    victoryScreen: boolean;
    levelSize: Size;
    private fadingIn;
    private fadingOut;
    private fadeLevel;
    constructor(player: Player, gameObjects: GameObjects, canvasCtx: CanvasRenderingContext2D, levelSize: Size);
    loadLevel(player: Player, gameObjects: GameObjects, canvasCtx: CanvasRenderingContext2D, levelSize: Size): void;
    recalculate(): void;
    update(): void;
    render(): void;
    fadeIn(): void;
    fadeOut(): void;
}
export default Camera;
