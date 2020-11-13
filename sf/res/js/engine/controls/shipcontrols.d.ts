import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { Main } from "./../engine.js";
import { Motion } from './../motion.js';
import { CellCoordinates, Controls } from './controls.js';
export declare class ShipControls extends Controls {
    firstPerson: boolean;
    interactRaycaster: THREE.Raycaster;
    lastCell: CellCoordinates;
    mesh: THREE.Mesh;
    motion: Motion;
    speed: number;
    constructor(camera: THREE.Camera, main: Main);
    getCollisions(delta: number): void;
    getInteractions(): void;
    updateRaycasters(delta: number): void;
    update(delta: number): void;
}
