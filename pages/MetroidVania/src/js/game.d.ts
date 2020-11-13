/// <reference types="node" />
import Player from "./player.js";
import Camera from "./camera.js";
import { GameObjects } from './interfaces/game-objects.js';
declare class Game {
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;
    currentLevel: string;
    currentLevelNumber: number;
    progressionType: "linear" | "open";
    alwaysNewPlayer: boolean;
    timeSinceLastFrame: number;
    previousTime: number;
    timeSinceLastTick: number;
    previousTickTime: number;
    spawnZombies: boolean;
    zombieSpawnIntervalId: NodeJS.Timeout | null;
    zombieSpawnSpeed: number;
    needsReset: boolean;
    gameState: string;
    levelSize: {
        width: number;
        height: number;
    };
    gameObjects: GameObjects;
    player: Player;
    camera: Camera;
    constructor(canvas: HTMLCanvasElement);
    init(levelName?: string): void;
    step(): void;
    tick(): void;
    resize(): void;
    loadLevel(levelNumber: number): void;
    loadLevelByName(fileName: string): void;
    zombieGenerator(): void;
    zombieSpawning(): void;
}
export default Game;
