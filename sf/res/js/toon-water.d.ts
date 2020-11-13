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
