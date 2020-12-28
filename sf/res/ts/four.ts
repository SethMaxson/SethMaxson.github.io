import * as THREE from '../../../node_modules/three/src/Three.js';
import { Engine } from './engine.js';

export module FOUR
{
	// var main = Engine.main;
	export var Gradient = new THREE.Texture();

	export function Texture(url: string, flipY: boolean = false): THREE.Texture {
		var texture =  new THREE.TextureLoader().load(url);
		texture.minFilter = THREE.NearestFilter;
		texture.magFilter = THREE.NearestFilter;
		// texture.minFilter = THREE.LinearFilter;
		// texture.magFilter = THREE.LinearFilter;
		texture.anisotropy = Engine.main.renderer.capabilities.getMaxAnisotropy();
		texture.encoding = THREE.sRGBEncoding;
		texture.flipY = flipY;
		return texture;
	}

	export function Material(parameters: any): THREE.MeshToonMaterial {
		// Phong
		// return new THREE.MeshPhongMaterial(parameters);
		// Toon
		parameters.gradientMap = FOUR.Gradient;
		let material = new THREE.MeshToonMaterial(parameters);
		material.dithering = true;
		return material;
	}

	export function Color(param: any): THREE.Color
	{
		return new THREE.Color(param).convertSRGBToLinear();
	}

	export function Renderer(containerElement: HTMLElement)
	{
		let rend = new THREE.WebGLRenderer( { antialias: true } );
		rend.setPixelRatio( window.devicePixelRatio );
		rend.sortObjects = true;
		rend.shadowMap.enabled = true;
		// @ts-ignore
		rend.shadowMap.shadowSide = THREE.CullFaceFrontBack;
		// renderer.shadowMap.type = THREE.BasicShadowMap;
		rend.shadowMap.type = THREE.PCFSoftShadowMap;
		containerElement.appendChild(rend.domElement);
		rend.setSize(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
		rend.gammaFactor = 2.2;
		// rend.physicallyCorrectLights = true;
		rend.physicallyCorrectLights = false;
		rend.toneMapping = THREE.Uncharted2ToneMapping;
		rend.outputEncoding = THREE.sRGBEncoding;
		return rend;
	}
	export function getColorNumber(color: number|string): number
	{
		var result;
		if (typeof color == "string") {
			result = parseInt(color.substring(1), 16);
		}
		else
		{
			result = color;
		}
		return result;
	}
}