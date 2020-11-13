import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Hair } from '../../js/characters/Hair.js';
import { PersonPhysicalFeature } from '../../js/characters/PersonPhysicalFeature.js';
export declare class Person {
    race: string;
    texture?: string | string[];
    gender: string;
    hair: Hair[];
    hairstyle?: Hair[];
    haircolor?: number;
    beardstyle?: string;
    skincolor: string | number;
    themecolor: THREE.Color;
    type?: string;
    name: string;
    scale: THREE.Vector3;
    headScale: THREE.Vector3;
    armScale: THREE.Vector3;
    torsoScale: THREE.Vector3;
    legScale: THREE.Vector3;
    ladychest: number;
    weight: number;
    pants: number;
    caboose: number;
    ears?: PersonPhysicalFeature;
    tail?: PersonPhysicalFeature;
    constructor(name?: string, race?: string, textureURL?: string | string[], gender?: string, hairstyle?: Hair[], haircolor?: string | number, beardstyle?: string, skincolor?: string | number, weight?: number, themecolor?: number | string, type?: string, ladychest?: number);
}
