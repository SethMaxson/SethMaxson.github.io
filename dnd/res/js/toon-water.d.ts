declare var ThreeBSP: any;
declare var Colors: {
    white: number;
    grey: number;
    darkGrey: number;
    lightGreen: number;
    yellow: number;
    brown: number;
    lightBrown: number;
    red: number;
    blue: number;
    orange: number;
    green: number;
    brass: number;
};
declare var verShader: string;
declare var fragShader: string;
declare class Sea {
    mesh: THREE.Mesh;
    uniforms: any;
    constructor(main: any);
}
declare function initSkybox(): void;
declare function DesertIsland(): void;
declare var Beacon: () => void;
declare var swayBeacon: () => void;
declare class SeaGull {
    mesh: THREE.Mesh;
    tail: THREE.Mesh;
    wingLeftOuter: THREE.Mesh;
    wingLeftInner: THREE.Mesh;
    wingRightOuter: THREE.Mesh;
    wingRightInner: THREE.Mesh;
    head: THREE.Mesh;
    constructor();
}
declare var flapWings: () => void;
declare class Boat {
    mesh: THREE.Mesh;
    group: THREE.Group;
    propellor: THREE.Group;
    engineBlock: THREE.Group;
    constructor();
    swayBoat(): void;
}
declare var beaconArray: any[];
declare var seaGullArray: any[];
declare var seaGullIslandArray: any[];
declare var sea: any, boat: any, desertIsland: any, beacon: any, seaGull: any;
declare function createSea(): void;
declare function createBoat(): void;
declare function createBeacon(x: number, y: number, z: number): void;
declare function createIsland(x: number, y: number, z: number): void;
declare function createSeaGull(x: number, y: number, z: number, s: number): void;
declare function finishedLoading(): void;
declare function init(): void;
declare function loop(e: any): void;
declare function animation(): void;
