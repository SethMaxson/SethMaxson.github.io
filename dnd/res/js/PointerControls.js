/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
import { EventDispatcher, Object3D } from '../../../node_modules/three/src/Three.js';
export class PointerLockControls extends EventDispatcher {
    constructor(camera, domElement) {
        super();
        this.isLocked = false;
        this.PI_2 = Math.PI / 2;
        var scope = this;
        this.domElement = domElement || document.body;
        this.isLocked = false;
        camera.rotation.set(0, 0, 0);
        this.pitchObject = new Object3D();
        this.pitchObject.add(camera);
        this.yawObject = new Object3D();
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);
        // Start Test
        // var boundGeom = new THREE.BoxBufferGeometry(0.5, 0.5, 0.35);
        // var yawVisualizer = new THREE.Mesh(boundGeom, new THREE.MeshBasicMaterial({color:0xff0000}));
        // yawObject.add(yawVisualizer);
        // End Test
        function onMouseMove(event) {
            if (scope.isLocked === false)
                return;
            // @ts-ignore
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            // @ts-ignore
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            scope.yawObject.rotation.y -= movementX * 0.002;
            scope.pitchObject.rotation.x -= movementY * 0.002;
            scope.pitchObject.rotation.x = Math.max(-scope.PI_2, Math.min(scope.PI_2, scope.pitchObject.rotation.x));
        }
        function onPointerlockChange() {
            if (document.pointerLockElement === scope.domElement) {
                scope.dispatchEvent({ type: 'lock' });
                scope.isLocked = true;
            }
            else {
                scope.dispatchEvent({ type: 'unlock' });
                scope.isLocked = false;
            }
        }
        function onPointerlockError() {
            console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
        }
        this.connect = function () {
            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('pointerlockchange', onPointerlockChange, false);
            document.addEventListener('pointerlockerror', onPointerlockError, false);
        };
        this.disconnect = function () {
            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('pointerlockchange', onPointerlockChange, false);
            document.removeEventListener('pointerlockerror', onPointerlockError, false);
        };
        this.dispose = function () {
            this.disconnect();
        };
        this.connect();
    }
    onMouseMove(event) {
        if (this.isLocked === false)
            return;
        // @ts-ignore
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        // @ts-ignore
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        this.yawObject.rotation.y -= movementX * 0.002;
        this.pitchObject.rotation.x -= movementY * 0.002;
        this.pitchObject.rotation.x = Math.max(-this.PI_2, Math.min(this.PI_2, this.pitchObject.rotation.x));
    }
    onPointerlockChange() {
        if (document.pointerLockElement === this.domElement) {
            this.dispatchEvent({ type: 'lock' });
            this.isLocked = true;
        }
        else {
            this.dispatchEvent({ type: 'unlock' });
            this.isLocked = false;
        }
    }
    onPointerlockError() {
        console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    }
    connect() {
        document.addEventListener('mousemove', this.onMouseMove, false);
        document.addEventListener('pointerlockchange', this.onPointerlockChange, false);
        document.addEventListener('pointerlockerror', this.onPointerlockError, false);
    }
    ;
    disconnect() {
        document.removeEventListener('mousemove', this.onMouseMove, false);
        document.removeEventListener('pointerlockchange', this.onPointerlockChange, false);
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
}
//# sourceMappingURL=PointerControls.js.map