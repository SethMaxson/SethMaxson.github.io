import { Eraser } from './eraser.js';
import { Pencil } from './pencil.js';
import { CollisionPencil } from './collision-pencil.js';
import { Zoom } from './zoom.js';
import { Reference } from './reference.js';
import { LevelMap } from '../map.js';
export declare class Toolbox {
    collisionPencil: CollisionPencil;
    eraser: Eraser;
    pencil: Pencil;
    reference: Reference;
    zoom: Zoom;
    constructor();
    loadMap(map: LevelMap): void;
    addEventListeners(): void;
}
