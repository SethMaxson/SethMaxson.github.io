declare function getSky(camera: THREE.PerspectiveCamera): THREE.Mesh;
declare function getSun(color: number, intensity: number): THREE.DirectionalLight;
declare class Moon extends THREE.Mesh {
    light: THREE.DirectionalLight;
    constructor(color?: number, intensity?: number);
}
