import * as THREE from '../../../node_modules/three/src/Three.js';
import { PersonPhysicalFeature } from './characters/PersonPhysicalFeature.js';
import { Hair } from './characters/Hair.js';
import { Person } from './characters/Person.js';
export declare module CharactersModular {
    var hairOptions: string[];
    var bodyPartOptions: {
        arms: string[];
        hands: string[];
        legs: string[];
        torso: string[];
        head: string[];
    };
    class EquipmentModel {
        style: string;
        color: string | number;
        relative: boolean;
    }
    interface PCData {
        id: string;
        name: string;
        race: string;
        type: string;
        texture: string;
        gender: string;
        hairstyle: Hair[];
        haircolor: string;
        beard: string;
        skincolor: string;
        righthand: number;
        lefthand: number;
        back: number;
        weight: number;
        donk: number;
        fronk: number;
        themecolor: string;
    }
    class Gear {
        righthand: number;
        lefthand: number;
        back: number;
        constructor(rightHand?: number, leftHand?: number, back?: number, race?: string);
    }
    class Person3D extends THREE.Mesh {
        animations: THREE.AnimationClip[];
        personId: string;
        _equipment: Person3DEquipment | undefined;
        _hatHolder: THREE.Bone | undefined;
        _animation: string;
        constructor(geometry?: THREE.Geometry | THREE.BufferGeometry | undefined, material?: THREE.Material | THREE.Material[] | undefined);
        get animation(): string;
        set animation(clipName: string);
        get gender(): string;
        set gender(newGender: string);
        toggleGender(): void;
        setHair(hairStyle: string, hairColor?: number | string): void;
        setRace(race: string): void;
        setMorphTargets(personInfo: Person): void;
        get mesh(): THREE.Mesh;
        get hatHolder(): THREE.Bone;
        get texture(): string | string[];
        set texture(textureURL: string | string[]);
        get equipment(): Person3DEquipment;
        updateMorphTarget(key: string, value: number): void;
    }
    class Person3DEquipment {
        parent: Person3D;
        constructor(parent: Person3D);
        get rightHand(): THREE.Mesh | undefined;
        set rightHand(item: THREE.Mesh | undefined);
    }
    class MiniatureBase extends THREE.Mesh {
        constructor(x?: number, y?: number, z?: number);
    }
    function getPC(name: string, x?: number, y?: number, z?: number): Person3D | undefined;
    function getParty(target: THREE.Object3D, x?: number, y?: number, z?: number): void;
    function getRandom(x?: number, y?: number, z?: number, race?: string, gender?: string): Person3D;
    function getHair(size: number | THREE.Vector3, style: Hair | Hair[]): THREE.Mesh;
    function getItem(index: number | string, scale?: THREE.Vector3): THREE.Mesh;
    function getTorso(item: PersonPhysicalFeature): THREE.Mesh;
    function getHumanoid(x: number, y: number, z: number, personInfo: Person, gear?: Gear): Person3D | undefined;
    function changePart(person: Person3D, category: string, newPart: string): Person3D | undefined;
    function PersonLoader(callback: Function, hideBase?: boolean): void;
    function updateHumanoid(person: Person3D, personInfo: Person, gear?: Gear): Person3D;
    function removeFromBone(parent: Person3D, boneName: string, objectName: string): void;
    function cleanBone(parent: Person3D, boneName: string): void;
    function getSprite(x: number, y: number, z: number, texture: string, size?: number, name?: string): MiniatureBase;
    function getZombies(x: number, y: number, z: number, count?: number): THREE.Mesh;
    function getName(race: string, gender: string, age?: number): string;
    function getModron(x?: number, y?: number, z?: number): THREE.Mesh;
    function getBear(x?: number, y?: number, z?: number): THREE.Object3D;
    function getLizard(x?: number, y?: number, z?: number): THREE.Object3D;
    function getYamask(x?: number, y?: number, z?: number): THREE.Object3D;
}
