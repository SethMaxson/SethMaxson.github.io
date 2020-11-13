/**
 * @author zz85 / https://github.com/zz85
 *
 * Based on "A Practical Analytic Model for Daylight"
 * aka The Preetham Model, the de facto standard analytic skydome model
 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
 *
 * First implemented by Simon Wallner
 * http://www.simonwallner.at/projects/atmospheric-scattering
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
*/
import { DirectionalLight, HemisphereLight, Mesh, Object3D, Vector3 } from '../../../node_modules/three/src/Three.js';
import { Engine } from '../js/engine.js';
export declare class Sky extends Object3D {
    sun: Sun;
    hemiLight: HemisphereLight;
    dome: Mesh;
    time: Time;
    _radius: number;
    constructor(main: Engine.Main);
    update(position: Object3D, time?: Time): void;
    updateSun(): void;
}
export declare class Sun {
    light: DirectionalLight;
    mesh: Mesh;
    constructor(radius: number);
    get position(): Vector3;
    set position(value: Vector3);
}
export declare class Time {
    _hour: number;
    _minute: number;
    constructor(hour?: number, minute?: number);
}
