/// <reference types="jquery" />
import * as THREE from '../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { Characters } from '../../../sf/res/js/characters.js';
import { PointerLockControls } from '../../../sf/res/js/PointerControls.js';
import { Sky } from '../../../sf/res/js/sky.js';
export declare var main: Engine.Main;
export declare namespace Engine {
    export function Initialize(controlsType?: string): Main;
    export class HUD {
        html: JQuery<HTMLElement>;
        reticle: Reticle;
        constructor(name?: string);
        $(selector: string): JQuery<HTMLElement>;
    }
    export class Reticle {
        parent: HUD;
        _target: string;
        constructor(parent: HUD);
        get element(): JQuery<HTMLElement>;
        get label(): string;
        set label(value: string);
        target(disposition?: Attitude): void;
    }
    export class HealthBar {
        html: string;
        constructor(hp: HitPoints);
    }
    /**
    * Indicates one entity's disposition towards another.
    */
    export enum Attitude {
        Hostile = 0,
        Unfriendly = 1,
        Indifferent = 2,
        Friendly = 3,
        Helpful = 4
    }
    /**
    * Manages HitPoints objects in the scene.
    */
    export class HealthManager {
        members: HitPoints[];
        update(main: Main): void;
    }
    /**
    * This tracks and manages HP for an entity.
    */
    export class HitPoints {
        maxHP: number;
        currentHP: number;
        dead: boolean;
        justDied: boolean;
        justResurrected: boolean;
        entityReference: string;
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
    export class InputManager {
        keys: any;
        constructor();
        update(): void;
        setKey(keyName: string, pressed: boolean): void;
        getMovementDirection(): THREE.Vector3;
    }
    /**
    * The main process for the engine.
    */
    export class Main {
        Scene: THREE.Scene;
        HUD: HUD;
        Light: THREE.HemisphereLight;
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
        constructor(controlsType?: string);
        update(): void;
        updateGameLogic(delta: number): void;
        getSky(): void;
        updateCompass(): void;
    }
    /**
    * A debug helper meant to be attached to an instance of Main.
    */
    class EngineDebug {
        BoxHelpers: THREE.BoxHelper[];
        Engine: Engine.Main;
        constructor(engine: Main);
        addPerson(person: Characters.Person3D): void;
        update(): void;
    }
    /**
     * Intended to be sort of like a chunk in Minecraft.
     */
    export class Stage extends THREE.Object3D {
        Entities: StageEntityManager;
        EntityModels: THREE.Object3D;
        Sound: any[];
        Terrain: THREE.Object3D;
        constructor(main: Main);
        needsUpdate(): void;
    }
    export class StageEntityManager {
        members: Entity[];
        parent: Stage;
        mainProcess: Main;
        constructor(main: Main, parent: Stage);
        GetByModelID(id: string): Entity | undefined;
        GetByEntityID(id: string): Entity | undefined;
        Add(newMember: Entity, collidable?: boolean): void;
        AddMesh(newMember: Characters.Person3D, collidable?: boolean): void;
    }
    class Timer {
        prevTime: number;
        constructor();
        get delta(): number;
    }
    export class EntityManager {
        members: Entity[];
        mainProcess: Main;
        constructor(main: Main);
        GetByModelID(id: string): Entity | undefined;
        GetByEntityID(id: string): Entity | undefined;
        Add(newMember: Entity, collidable?: boolean): void;
        AddMesh(newMember: Characters.Person3D, collidable?: boolean): void;
    }
    export class Entity {
        _ID: string;
        Events: EntityEvents;
        Health: HitPoints;
        _Model: Characters.Person3D;
        Motion: PersonMotion;
        PositionOffset: THREE.Vector3;
        constructor(model?: Characters.Person3D);
        get Model(): Characters.Person3D;
        set Model(value: Characters.Person3D);
        get ID(): string;
        set ID(value: string);
        update(delta: number): void;
    }
    export class EntityEvents {
        Died?: Function;
        Resurrected?: Function;
        Think?: Function;
    }
    /**
    * Entity State
    */
    export class EntityState {
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
    export class EntityAbilities {
        gliding: boolean;
        infinityJump: boolean;
        dash: boolean;
        maxJump: number;
    }
    export class MotionCollisions {
        front: THREE.Intersection[];
        rear: THREE.Intersection[];
        left: THREE.Intersection[];
        right: THREE.Intersection[];
        top: THREE.Intersection[];
        bottom: THREE.Intersection[];
    }
    export class MotionRays {
        front: THREE.Raycaster;
        rear: THREE.Raycaster;
        left: THREE.Raycaster;
        right: THREE.Raycaster;
        top: THREE.Raycaster;
        bottom: THREE.Raycaster;
        _debugFront: THREE.ArrowHelper;
        _debugRear: THREE.ArrowHelper;
        _debugLeft: THREE.ArrowHelper;
        _debugRight: THREE.ArrowHelper;
        _debugTop: THREE.ArrowHelper;
        _debugBottom: THREE.ArrowHelper;
        _initDone: boolean;
        constructor();
        update(main: Main, position: THREE.Vector3, direction: THREE.Vector3): void;
        getCollisions(objects: THREE.Object3D[]): MotionCollisions;
    }
    export class Motion extends THREE.Object3D {
        collisions: MotionCollisions;
        _rays: MotionRays;
        speed: number;
        _prevPosition: THREE.Vector3;
        collideWall: boolean;
        constructor(x?: number, y?: number, z?: number);
        update(main: Main, delta: number): void;
    }
    export class PersonMotion extends Motion {
        airborne: boolean;
        canMove: boolean;
        sprinting: boolean;
        baseSpeed: number;
        direction: THREE.Vector3;
        velocity: THREE.Vector3;
        entityReference: string;
        jumpCounter: number;
        constructor(x?: number, y?: number, z?: number);
        fromPerson(person: Characters.Person3D): void;
        face(person: Entity): void;
        update(main: Main, delta: number): void;
    }
    /**
    * Default object for land-based player physics
    */
    export class PlayerMotion extends Motion {
        airborne: boolean;
        canMove: boolean;
        sprinting: boolean;
        baseSpeed: number;
        direction: THREE.Vector3;
        velocity: THREE.Vector3;
        horizontalSpeed: number;
        abilities: EntityAbilities;
        jumpCounter: number;
        constructor();
        update(main: Main, delta: number, controls?: PlayerControls, firstPerson?: boolean): void;
        jump(): void;
    }
    export abstract class Controls {
        firstPerson: boolean;
        _zoom: number;
        _zoomMax: number;
        _zoomMin: number;
        Camera: THREE.Camera;
        mainProcess: Main;
        InputManager: InputManager;
        PointerControls: PointerLockControls;
        abstract motion: Motion | PlayerMotion;
        abstract mesh: THREE.Mesh | Characters.Person3D;
        constructor(camera: THREE.Camera, main: Main);
        getObject(): THREE.Object3D;
        lock(): void;
        get isLocked(): boolean;
        zoom(mod: number): void;
        abstract update(delta: number): void;
    }
    export class ShipControls extends Controls {
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
    export class PlayerControls extends Controls {
        mesh: Characters.Person3D;
        motion: PlayerMotion;
        height: number;
        firstPerson: boolean;
        aimRaycaster: THREE.Raycaster;
        constructor(camera: THREE.Camera, main: Main);
        getCollisions(delta: number): void;
        getInteractions(): void;
        updateRaycasters(): void;
        update(delta: number): void;
    }
    export {};
}
//# sourceMappingURL=game-engine.d.ts.map