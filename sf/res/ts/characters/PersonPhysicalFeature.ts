import * as THREE from '../../../../node_modules/three/src/Three.js';
import { FOUR } from './../four.js';
export class PersonPhysicalFeature
{
	style: string;
	size: THREE.Vector3;
	color: number;
	relative: boolean;
	constructor(style: string, size: number|THREE.Vector3, color: number|string, relative?: boolean)
	{
		this.style = style;
		if (typeof size === typeof THREE.Vector3) {
			this.size = size as THREE.Vector3;
		}
		else
		{
			this.size = new THREE.Vector3(size as number, size as number, size as number);
		}
		this.color = FOUR.getColorNumber(color);
		if (relative != undefined) {
			this.relative = relative;
		} else
		{
			this.relative = true;
		}
	}
}