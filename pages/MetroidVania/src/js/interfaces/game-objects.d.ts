import Entity from '../base-types/entity';
import Player from '../player';
import IPoint2D from './point2d';
import Enemy from '../base-types/enemy';
import PowerUp from '../base-types/powerup';
import DialogPrinter from '../ui/dialog-printer';
export interface GameObjects {
    blockers: Entity[];
    collisions: {
        static: Entity[];
        dynamic: Entity[];
    };
    dialogPrinter: DialogPrinter;
    enemies: Enemy[];
    killVolumes: Entity[];
    player: Player[];
    playerAttack: Entity[];
    playerSpawn: IPoint2D;
    powerUps: PowerUp[];
    victoryTiles: Entity[];
    zombieVolumes: Entity[];
}
