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
declare class DesertIsland {
    mesh: THREE.Mesh;
    constructor();
}
declare class Beacon {
    mesh: THREE.Mesh;
    constructor();
}
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
declare var seaGullArray: SeaGull[];
declare var seaGullIslandArray: any[];
declare var sea: any, boat: any, desertIsland: any, beacon: any, seaGull: any;
