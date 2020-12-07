import * as THREE from '../../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { Characters } from './../characters.js';
import { Sky } from './../sky.js';
import { HUD } from './hud/hud.js';
import { Stage } from './stage.js';
import { PersonMotion } from './motion.js';
import { Controls } from './controls/controls.js';
import { Entity } from './entity/entity.js';
import { InputManager } from './inputmanager.js';
export { PlayerControls } from './controls/playercontrols.js';
export { Entity } from './entity/entity.js';
export { Stage } from './stage.js';
export { Inventory, InventorySlot, Item } from './../engine/inventory.js';
export declare var main: Main;
export declare function Initialize(controlsType?: ControlTypes): Main;
/**
* Indicates one entity's disposition towards another.
*/
export declare enum Attitude {
    Hostile = 0,
    Unfriendly = 1,
    Indifferent = 2,
    Friendly = 3,
    Helpful = 4
}
export declare enum ControlTypes {
    Human = "Human",
    Ship = "Ship",
    Viewer = "Viewer"
}
/**
* Manages HitPoints objects in the scene.
*/
export declare class HealthManager {
    members: HitPoints[];
    update(main: Main): void;
    clear(): void;
}
/**
* This tracks and manages HP for an entity.
*/
export declare class HitPoints {
    maxHP: number;
    currentHP: number;
    dead: boolean;
    justDied: boolean;
    justResurrected: boolean;
    entityReference: string;
    changed: boolean;
    /**
    * @param id - the ID of the entity whose HP is represented by this object
    * @param max - the maximum HP of the entity
    */
    constructor(id: string, max?: number);
    /**
     * Harms the entity.
     * @param damageAmount - the amount of damage taken by the entity.
    */
    damage(damageAmount: number): void;
    /**
     * Heals the entity.
     * @param healAmount - the amount by which the entity is healed.
    */
    heal(healAmount: number): void;
}
/**
* The settings for the main process for the engine.
*/
export declare class EngineSettings {
    hideCompass: boolean;
}
/**
* The main process for the engine.
*/
export declare class Main {
    Scene: THREE.Scene;
    HUD: HUD;
    FPS: number;
    renderer: THREE.WebGLRenderer;
    /**Not sure what purpose this serves. Can probably remove it. */
    HealthManager: HealthManager;
    Entities: EntityManager;
    Interactive: THREE.Object3D[];
    Collidable: THREE.Object3D[];
    Timer: Timer;
    DebugHelper: EngineDebug;
    Camera: THREE.PerspectiveCamera;
    Stages: Stage[];
    MainStage: Stage;
    Controls: Controls;
    Sky: Sky;
    InputManager: InputManager;
    onRenderFcts: Function[];
    Motions: PersonMotion[];
    _effect: OutlineEffect;
    Settings: EngineSettings;
    constructor(controlsType?: ControlTypes);
    /**
     * Toggles between first and third person views
     */
    toggleView(): void;
    /**
     * The core update method for the game loop.
     */
    update(): void;
    private processInput;
    /** Render to the screen */
    private render;
    updateGameLogic(delta: number): void;
    /**
     * Starts (or restarts) this engine instance
     * @param controlsType
     */
    start(controlsType?: ControlTypes): void;
}
/** A debug helper meant to be attached to an instance of Main. */
declare class EngineDebug {
    BoxHelpers: THREE.BoxHelper[];
    Engine: Main;
    constructor(engine: Main);
    addPerson(person: Characters.Person3D): void;
    update(): void;
    /**
     * Empties the collection and removes any tracked items from the current scene.
     */
    clear(): void;
}
/** Used to measure the elapsed time in-engine. */
declare class Timer {
    /** The timestamp at which the last measurement ocurred. */
    prevTime: number;
    constructor();
    /** The time elapsed since last measurement. */
    get delta(): number;
}
export declare class EntityManager {
    members: Entity[];
    mainProcess: Main;
    constructor(main: Main);
    GetByModelID(id: string): Entity | undefined;
    GetByEntityID(id: string): Entity | undefined;
    Add(newMember: Entity, collidable?: boolean): void;
    AddMesh(newMember: Characters.Person3D, collidable?: boolean): void;
}
export declare abstract class GameState {
    abstract update(delta: number): void;
    abstract render(): void;
    abstract onEnter(): void;
    abstract onExit(): void;
}
