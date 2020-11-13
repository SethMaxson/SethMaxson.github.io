import * as THREE from '../../../node_modules/three/src/Three.js';
const FOUR = {
    Gradient: new THREE.Texture(),
    Texture: function (url) {
        var texture = new THREE.TextureLoader().load(url);
        // texture.minFilter = THREE.NearestFilter;
        // texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = main.renderer.capabilities.getMaxAnisotropy();
        texture.encoding = THREE.sRGBEncoding;
        texture.flipY = false;
        return texture;
    },
    Material: function (parameters) {
        // Phong
        // return new THREE.MeshPhongMaterial(parameters);
        // Toon
        parameters.gradientMap = module.exports.Gradient;
        return new THREE.MeshToonMaterial(parameters);
    },
    Color: function (param) {
        return new THREE.Color(param).convertSRGBToLinear();
    }
};
export { FOUR };
//# sourceMappingURL=four.js.map