import * as THREE from '../../../../node_modules/three/src/Three.js';
export declare class PersonPhysicalFeature {
    style: string;
    size: THREE.Vector3;
    color: number;
    relative: boolean;
    constructor(style: string, size: number | THREE.Vector3, color: number | string, relative?: boolean);
}
