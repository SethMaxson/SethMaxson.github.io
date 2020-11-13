/** @module */
export declare module THREEx {
    /**
    * Update renderer and camera when the window is resized
    *
    * @param {Object} renderer the renderer to update
    * @param {Object} camera the camera to update
    * @param {Function} dimension callback for renderer size
    */
    class WindowResize {
        constructor(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, dimension?: Function);
    }
}
