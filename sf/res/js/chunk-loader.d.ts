/// <reference types="jquery" />
import * as THREE from '../../../node_modules/three/src/Three.js';
import { Engine } from '../../../sf/res/js/engine.js';
import { Stage } from '../js/engine/stage.js';
/**
* Interface for the JSON structure of a chunk
*/
interface chunkMapJSON {
    size: {
        width: number;
        height: number;
    };
    chunks: string[][];
}
export declare const chunkScale = 10;
export declare const viewRadius = 2;
export declare class ChunkLoader {
    private personLoaderReady;
    promise: JQuery.Promise<any>;
    engineInstance: Engine.Main;
    constructor(main: Engine.Main);
    /**
    * load an entity model/scene
    */
    getPerson(name: string, x: number, y: number, z: number, refrainFromAddingToMainStage?: boolean): void | Engine.Entity;
    /**
    * load a terrain model/scene
    */
    loadTerrain(position: THREE.Vector3, file: string, callback?: {
        (board: THREE.Object3D): void;
    }): THREE.Object3D;
    /**
    * load a chunk from JSON
    */
    loadChunk(file: string, position?: THREE.Vector3): Engine.Stage;
    /**
    * Normalize loaded materials for consistent rendering
    */
    private prepMaterial;
}
export declare class ChunkManager {
    chunkLoader: ChunkLoader;
    chunkMap?: chunkMapJSON;
    private chunkDictionary;
    constructor(loader: ChunkLoader, file: string, cellX?: number, cellY?: number);
    loadChunk(x: number, y: number): void;
    unloadChunk(x: number, y: number): void;
    findChunk(x: number, y: number): Stage | undefined;
    update(x: number, y: number): void;
}
export {};
