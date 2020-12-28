import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { EntityEvents } from './entityevents.js';
import { EntityAnimations } from './entityanimations.js';
import { HitPoints } from '../engine.js';
import { PersonMotion } from '../motion.js';
/**
 * This class contains objects and methods for a character.
 */
export class Entity {
    constructor(model) {
        this._ID = uuidv4();
        this.Health = new HitPoints(this._ID);
        this.Events = new EntityEvents();
        this.Motion = new PersonMotion();
        this._Model = model;
        this.Motion.position.copy(model.position);
        this.Motion.rotation.copy(model.rotation);
        // this.Motion.attachPhysics();
        this.PositionOffset = new THREE.Vector3(0, -1, 0);
        this.Animations = new EntityAnimations();
    }
    get Model() {
        return this._Model;
    }
    set Model(value) {
        this._Model = value;
    }
    get ID() {
        return this._ID;
    }
    set ID(value) {
        this._ID = value;
        this.Health.entityReference = value;
        this.Motion.entityReference = value;
    }
    update(delta) {
        if (this.Motion.canMove === true) {
            if (this.Motion.physicsBody) {
                this._Model.position.copy(this.Motion.position);
                this._Model.position.copy(this.Motion.position).add(this.PositionOffset);
                // this._Model.position.y -= 0.5;
            }
            else {
                this._Model.position.copy(this.Motion.position);
                // this._Model.position.copy(this.Motion.position).add(this.PositionOffset);
            }
            this._Model.rotation.copy(this.Motion.rotation);
            this._Model.rotation.y = this.Motion.rotation.y + Math.PI;
            if (this._Model.userData.mixer != undefined) {
                this._Model.userData.mixer.update(delta);
            }
            // Animation control test
            if (this._Model.userData.animations) {
                if (this.Motion.speed > 0.2) {
                    this._Model.animation = this.Animations.Walk;
                    this._Model.userData.mixer.timeScale = 2 * this.Motion.speed;
                }
                else {
                    // this._Model.animation = this.Animations.Stand;
                    this._Model.animation = this._Model.userData.animations.Stand;
                    this._Model.userData.mixer.timeScale = 2;
                }
            }
        }
    }
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//# sourceMappingURL=entity.js.map