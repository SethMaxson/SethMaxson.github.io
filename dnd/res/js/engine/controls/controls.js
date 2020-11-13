import { PointerLockControls } from '../../../../../sf/res/js/PointerControls.js';
export class Controls {
    constructor(camera, main) {
        this.firstPerson = true;
        this._zoom = 5;
        this._zoomMax = 10;
        this._zoomMin = 0.2;
        this.Camera = camera;
        this.PointerControls = new PointerLockControls(this.Camera, main.renderer.domElement);
        this.mainProcess = main;
        this.InputManager = main.InputManager;
    }
    getObject() {
        return this.PointerControls.getObject();
    }
    lock() {
        this.PointerControls.lock();
    }
    get isLocked() {
        return this.PointerControls.isLocked;
    }
    zoom(mod) {
        this._zoom += mod;
        this._zoom = Math.max(Math.min(this._zoom, this._zoomMax), this._zoomMin);
    }
}
//# sourceMappingURL=controls.js.map