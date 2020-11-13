import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { Attitude } from "./../engine.js";
import { Motion } from './../motion.js';
import { Controls } from './controls.js';
export class ShipControls extends Controls {
    constructor(camera, main) {
        super(camera, main);
        this.firstPerson = true;
        this.lastCell = { x: 0, y: 0 };
        this.speed = 50;
        this.mesh = new THREE.Object3D();
        this.motion = new Motion();
        this.interactRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0.1, 5);
    }
    getCollisions(delta) {
        this.motion.update(this.mainProcess, delta);
        this.getObject().position.copy(this.motion.position);
        this.mesh.position.set(this.motion.position.x, this.motion.position.y, this.motion.position.z);
        this.mesh.rotation.y = this.motion.rotation.y;
    }
    getInteractions() {
        var interactIntersections = this.interactRaycaster.intersectObjects(this.mainProcess.Interactive);
        let hud = this.mainProcess.HUD;
        if (interactIntersections.length > 0) {
            hud.reticle.target(Attitude.Hostile);
            hud.reticle.label = interactIntersections[0].object.parent.name;
        }
        else {
            hud.reticle.label = "";
            hud.reticle.target(undefined);
        }
        var thing = this.getObject().position;
        $("#debug").html(`
			<div>Location: ${thing.x}, Y: ${thing.y}, Z: ${thing.z}</div>
		`);
    }
    updateRaycasters(delta) {
        this.motion.getWorldDirection(new THREE.Vector3()).negate();
        var pos = this.motion.position;
        var interactRay = new THREE.Vector3();
        this.Camera.getWorldDirection(interactRay);
        this.interactRaycaster.ray.set(pos, interactRay);
        let moveDir = this.InputManager.getMovementDirection();
        if (moveDir.x != 0 || moveDir.y != 0 || moveDir.z != 0) {
            this.motion.rotation.copy(this.getObject().rotation);
            this.motion.rotation.y += Math.atan2(moveDir.x, moveDir.z);
            this.motion.speed = this.speed;
        }
        else {
            this.motion.speed = 0;
        }
        if (this.InputManager.keys.ascend.down) {
            this.motion.translateY(10 * delta);
        }
        else if (this.InputManager.keys.descend.down) {
            this.motion.translateY(-10 * delta);
        }
    }
    update(delta) {
        this.updateRaycasters(delta);
        this.getCollisions(delta);
        this.getInteractions();
    }
}
//# sourceMappingURL=shipcontrols.js.map