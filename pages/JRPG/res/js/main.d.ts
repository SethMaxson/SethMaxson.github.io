import { LevelMap, DoorNode } from './map.js';
import { Player } from './player.js';
import { Engine } from './engine.js';
export declare var MainProcess: Main;
export declare class Main extends Engine {
    map: LevelMap;
    player: Player;
    constructor();
    resize(clearDraw?: boolean): void;
    loadMap(fileName?: string): void;
    changeMap(door: DoorNode): void;
}
