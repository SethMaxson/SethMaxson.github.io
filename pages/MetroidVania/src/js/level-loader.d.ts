import Entity from "./base-types/entity.js";
import Ghost from "./enemies/basic/ghost.js";
import Goomba from './enemies/basic/goomba.js';
import Stationary from './enemies/basic/stationary.js';
import NPC from './base-types/npc.js';
export declare const levels: LevelDataEntry[];
interface LevelDataEntry {
    file: string;
    data: null | string;
}
export declare const parseLevel: (levDat: LevelDataEntry) => {
    playerSpawn: {
        x: number;
        y: number;
    };
    tiles: {
        static: Entity[];
        dynamic: Entity[];
    };
    killVolumes: Entity[];
    enemies: (Ghost | Goomba | Stationary | NPC)[];
    zombieVolumes: Entity[];
    victoryTiles: Entity[];
    powerUps: import("./base-types/powerup.js").default[];
    size: {
        width: number;
        height: number;
    };
};
export {};
