import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { EntityEvents } from './entityevents.js';
import { EntityAnimations } from './entityanimations.js';
import { HitPoints } from '../engine.js';
import { PersonMotion } from '../motion.js';
import { Characters } from './../../characters.js';
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
    constructor(model: Characters.Person3D);
    get Model(): Characters.Person3D;
    set Model(value: Characters.Person3D);
    get ID(): string;
    set ID(value: string);
    update(delta: number): void;
}
