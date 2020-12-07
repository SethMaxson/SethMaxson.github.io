import * as THREE from '../../../../node_modules/three/src/Three.js';
import { FOUR } from './../four.js';
export class PersonPhysicalFeature {
    constructor(style, size, color, relative) {
        this.style = style;
        if (typeof size === typeof THREE.Vector3) {
            this.size = size;
        }
        else {
            this.size = new THREE.Vector3(size, size, size);
        }
        this.color = FOUR.getColorNumber(color);
        if (relative != undefined) {
            this.relative = relative;
        }
        else {
            this.relative = true;
        }
    }
}
//# sourceMappingURL=PersonPhysicalFeature.js.map