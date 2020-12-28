import * as THREE from '../../../node_modules/three/src/Three.js';
export declare module FOUR {
    var Gradient: THREE.Texture;
    function Texture(url: string, flipY?: boolean): THREE.Texture;
    function Material(parameters: any): THREE.MeshToonMaterial;
    function Color(param: any): THREE.Color;
    function Renderer(containerElement: HTMLElement): THREE.WebGLRenderer;
    function getColorNumber(color: number | string): number;
}
