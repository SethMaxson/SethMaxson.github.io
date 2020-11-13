import * as THREE from '../../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { Characters } from '../../../../sf/res/js/characters.js';
import { Sky } from '../../../../sf/res/js/sky.js';
import { HUD } from './hud/hud.js';
import { StageEntityManager } from './stageentitymanager.js';
import { Motion, PersonMotion } from './motion.js';
import { Controls } from './controls/controls.js';
export { PlayerControls } from './controls/playercontrols.js';
export declare var main: Main;
export declare function Initialize(controlsType?: string): Main;
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
/**
* Manages HitPoints objects in the scene.
*/
export declare class HealthManager {
    members: HitPoints[];
    update(main: Main): void;
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
* This is used to track and manage user input.
*/
export declare class InputManager {
    keys: any;
    constructor();
    update(): void;
    setKey(keyName: string, pressed: boolean): void;
    getMovementDirection(): THREE.Vector3;
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
    constructor(controlsType?: string);
    update(): void;
    updateGameLogic(delta: number): void;
    hideCompass(): void;
    updateCompass(): void;
}
/**
* A debug helper meant to be attached to an instance of Main.
*/
declare class EngineDebug {
    BoxHelpers: THREE.BoxHelper[];
    Engine: Main;
    constructor(engine: Main);
    addPerson(person: Characters.Person3D): void;
    update(): void;
}
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
}
declare class Timer {
    prevTime: number;
    constructor();
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
export declare class EntityAnimations {
    Walk: string;
    Stand: string;
}
/**
 * This class contains objects and methods for a character.
 */
export declare class Entity {
    _ID: string;
    Events: EntityEvents;
    Health: HitPoints;
    _Model: Characters.Person3D;
    Motion: PersonMotion;
    PositionOffset: THREE.Vector3;
    Animations: EntityAnimations;
    constructor(model?: Characters.Person3D);
    get Model(): Characters.Person3D;
    set Model(value: Characters.Person3D);
    get ID(): string;
    set ID(value: string);
    update(delta: number): void;
}
export declare class EntityEvents {
    Died?: Function;
    HealthChanged?: Function;
    Resurrected?: Function;
    Think?: Function;
}
/**
* Entity State
*/
export declare class EntityState {
    isFlying: boolean;
    isGliding: boolean;
    isClimbing: boolean;
    isSlipping: boolean;
    isDashing: boolean;
    chargingDash: boolean;
}
/**
* Entity Permissions/Abilities
*/
export declare class EntityAbilities {
    gliding: boolean;
    infinityJump: boolean;
    dash: boolean;
    maxJump: number;
}
export declare class ShipControls extends Controls {
    mesh: THREE.Mesh;
    motion: Motion;
    firstPerson: boolean;
    interactRaycaster: THREE.Raycaster;
    speed: number;
    constructor(camera: THREE.Camera, main: Main);
    getCollisions(delta: number): void;
    getInteractions(): void;
    updateRaycasters(delta: number): void;
    update(delta: number): void;
}
export declare abstract class GameState {
    abstract update(delta: number): void;
    abstract render(): void;
    abstract onEnter(): void;
    abstract onExit(): void;
}
