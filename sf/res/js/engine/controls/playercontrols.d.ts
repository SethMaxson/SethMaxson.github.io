import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { Main } from "./../engine.js";
import { PlayerMotion } from './../motion.js';
import { Characters } from '../../../../../sf/res/js/characters.js';
import { CellCoordinates, Controls } from './controls.js';
export declare class PlayerControls extends Controls {
    cellChanged: boolean;
    lastCell: CellCoordinates;
    mesh: Characters.Person3D;
    motion: PlayerMotion;
    height: number;
    firstPerson: boolean;
    aimRaycaster: THREE.Raycaster;
    constructor(camera: THREE.Camera, main: Main);
    getCollisions(delta: number): void;
    getInteractions(): void;
    update(delta: number): void;
}
