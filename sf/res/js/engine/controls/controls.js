import { EventDispatcher, Object3D } from './../../../../../node_modules/three/src/Three.js';
import { chunkScale } from "./../../chunk-loader.js";
export class Controls extends EventDispatcher {
    constructor(camera, main) {
        super();
        this.firstPerson = true;
        this._zoom = 5;
        this._zoomMax = 10;
        this._zoomMin = 0.2;
        this.isLocked = false;
        this.PI_2 = Math.PI / 2;
        this.Camera = camera;
        this.domElement = main.renderer.domElement || document.body;
        camera.rotation.set(0, 0, 0);
        this.pitchObject = new Object3D();
        this.pitchObject.add(camera);
        this.yawObject = new Object3D();
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);
        this.connect();
        this.mainProcess = main;
        this.InputManager = main.InputManager;
    }
    zoom(mod) {
        this._zoom += mod;
        this._zoom = Math.max(Math.min(this._zoom, this._zoomMax), this._zoomMin);
        if (!this.firstPerson)
            this.Camera.position.z = this._zoom;
    }
    cell() {
        var thing = this.motion.position;
        var cell = {
            x: Math.floor(thing.x / chunkScale),
            y: Math.floor(thing.z / chunkScale)
        };
        return cell;
    }
    onMouseMove(target) {
        return function curried_func(event) {
            if (target.isLocked === false)
                return;
            // @ts-ignore
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            // @ts-ignore
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            target.yawObject.rotation.y -= movementX * 0.002;
            target.pitchObject.rotation.x -= movementY * 0.002;
            target.pitchObject.rotation.x = Math.max(-target.PI_2, Math.min(target.PI_2, target.pitchObject.rotation.x));
        };
    }
    onPointerlockChange(target) {
        return function curried_func(event) {
            if (document.pointerLockElement === target.domElement) {
                target.dispatchEvent({ type: 'lock' });
                target.isLocked = true;
            }
            else {
                target.dispatchEvent({ type: 'unlock' });
                target.isLocked = false;
            }
        };
    }
    onPointerlockError() {
        console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    }
    connect() {
        document.addEventListener('mousemove', this.onMouseMove(this), false);
        document.addEventListener('pointerlockchange', this.onPointerlockChange(this), false);
        document.addEventListener('pointerlockerror', this.onPointerlockError, false);
    }
    ;
    disconnect() {
        document.removeEventListener('mousemove', this.onMouseMove(this), false);
        document.removeEventListener('pointerlockchange', this.onPointerlockChange(this), false);
        document.removeEventListener('pointerlockerror', this.onPointerlockError, false);
    }
    ;
    dispose() {
        this.disconnect();
    }
    ;
    getObject() {
        return this.yawObject;
    }
    ;
    lock() {
        this.domElement.requestPointerLock();
    }
    ;
    unlock() {
        document.exitPointerLock();
    }
    ;
    /** Toggles between first and third person views */
    toggleView() {
        this.firstPerson = !this.firstPerson;
        if (this.firstPerson == true) {
            this.Camera.position.z = 0;
            if (this.mesh != undefined) {
                this.mesh.visible = false;
            }
        }
        else {
            this.Camera.position.z = this._zoom;
            if (this.mesh != undefined) {
                this.mesh.visible = true;
                this.motion.rotation.y = this.getObject().rotation.y;
            }
        }
    }
}
//# sourceMappingURL=controls.js.map