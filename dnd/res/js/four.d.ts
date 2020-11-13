import * as THREE from '../../../node_modules/three/src/Three.js';
export declare module FOUR {
    var Gradient: THREE.Texture;
    function Texture(url: string): THREE.Texture;
    function Material(parameters: any): THREE.MeshToonMaterial;
    function Color(param: any): THREE.Color;
    function Renderer(): THREE.WebGLRenderer;
}
