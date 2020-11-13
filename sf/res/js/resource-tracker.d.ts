import * as THREE from '../../../node_modules/three/src/Three.js';
export declare class ResourceTracker {
    resources: Set<THREE.Object3D | THREE.Mesh | THREE.Geometry | THREE.Material>;
    constructor();
    track(resource: THREE.Object3D | THREE.Object3D[] | THREE.Material | THREE.Material[]): THREE.Object3D | THREE.Material | THREE.Object3D[] | THREE.Material[];
    untrack(resource: any): void;
    dispose(): void;
}
