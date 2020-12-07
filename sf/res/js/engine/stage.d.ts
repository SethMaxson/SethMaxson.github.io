import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Main } from './engine.js';
import { StageEntityManager } from './stageentitymanager.js';
/**
 * Intended to be sort of like a chunk in Minecraft.
 */
export declare class Stage extends THREE.Object3D {
    Entities: StageEntityManager;
    EntityModels: THREE.Object3D;
    Sound: any[];
    Terrain: THREE.Object3D;
    constructor(main: Main);
    needsUpdate(): void;
    /**
     * Remove this chunk and its contents from memory
     */
    unload(): void;
}
