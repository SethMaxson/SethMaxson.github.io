import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Main, PlayerControls } from './engine.js';
import { Entity } from './entity/entity.js';
import { EntityAbilities } from './entity/entityabilities.js';
import { Characters } from './../characters.js';
export declare class MotionCollisions {
    front: THREE.Intersection[];
    rear: THREE.Intersection[];
    left: THREE.Intersection[];
    right: THREE.Intersection[];
    top: THREE.Intersection[];
    bottom: THREE.Intersection[];
}
export declare class MotionRays {
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
export declare class Motion extends THREE.Object3D {
    collisions: MotionCollisions;
    _rays: MotionRays;
    speed: number;
    _prevPosition: THREE.Vector3;
    collideWall: boolean;
    constructor(x?: number, y?: number, z?: number);
    update(main: Main, delta: number): void;
}
export declare class PersonMotionState {
    isAirborne: boolean;
    isFlying: boolean;
    isGliding: boolean;
    isClimbing: boolean;
    isSlipping: boolean;
    isSprinting: boolean;
    isSwimming: boolean;
}
export declare class PersonMotion extends Motion {
    state: PersonMotionState;
    canMove: boolean;
    baseSpeed: number;
    direction: THREE.Vector3;
    velocity: THREE.Vector3;
    abilities: EntityAbilities;
    entityReference: string;
    jumpCounter: number;
    constructor(x?: number, y?: number, z?: number);
    fromPerson(person: Characters.Person3D): void;
    face(person: Entity): void;
    update(main: Main, delta: number, jumped?: boolean): void;
    walk(direction?: THREE.Vector3, speed?: number): void;
    jump(): void;
}
/**
* Default object for land-based player physics
*/
export declare class PlayerMotion extends PersonMotion {
    constructor();
    update(main: Main, delta: number, firstPerson?: boolean, controls?: PlayerControls): void;
}
