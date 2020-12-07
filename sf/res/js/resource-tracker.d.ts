import * as THREE from '../../../node_modules/three/src/Three.js';
export declare class ResourceTracker {
    resources: Set<THREE.Object3D | THREE.Mesh | THREE.Geometry | THREE.Material | THREE.Texture>;
    constructor();
    track(resource: THREE.Object3D | THREE.Object3D[] | THREE.Material | THREE.Material[] | THREE.Geometry | THREE.Geometry[] | THREE.Texture | THREE.Texture[]): THREE.Object3D | THREE.Material | THREE.Texture | THREE.Object3D[] | THREE.Geometry | THREE.Material[] | THREE.Texture[] | THREE.Geometry[];
    untrack(resource: any): void;
    dispose(): void;
}
