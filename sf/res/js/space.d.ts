import * as THREE from 'three';
export declare module SPACE {
    class Planet extends THREE.Mesh {
        constructor(name: string, texture: string, diameter?: number);
    }
    class PlanetRing extends THREE.Mesh {
        constructor(innerRadius?: number, outerRadius?: number, lookAt?: THREE.Vector3);
    }
}
