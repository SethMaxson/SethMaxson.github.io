"use strict";
function getSky(camera) {
    var depth = 1500;
    if (camera !== undefined) {
        depth = camera.far * 0.95;
    }
    var skyGeo = new THREE.SphereBufferGeometry(depth, 25, 2);
    var material = new THREE.MeshLambertMaterial({ color: 0x7ec0ee, emissive: 0x7ec0ee });
    material.side = THREE.BackSide;
    var sky = new THREE.Mesh(skyGeo, material);
    var sun = getSun(0xfffffa, 0.9);
    // @ts-ignore
    getSun.name = 'sun';
    sky.add(sun);
    var sunX = Math.min(700, depth * 0.7) * -1;
    sun.position.set(sunX, 150, 100);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = Math.min(1000, depth);
    // sun.shadow.camera.left = -500;
    // sun.shadow.camera.bottom = -500;
    // sun.shadow.camera.right = 500;
    // sun.shadow.camera.top = 500;
    sun.shadow.bias = 0.0001;
    return sky;
}
function getSun(color, intensity) {
    var light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.shadow.mapSize.x = 2048;
    light.shadow.mapSize.y = 2048;
    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 8, 8), new THREE.MeshBasicMaterial({ color: color }));
    light.add(sphere);
    return light;
}
class Moon extends THREE.Mesh {
    constructor(color = 0x6600aa, intensity = 0.5) {
        super(new THREE.PlaneBufferGeometry(25, 25, 1, 1), new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            emissive: color,
            transparent: true,
            map: new THREE.TextureLoader().load("/img/textures/moon.png"),
            side: THREE.DoubleSide
        }));
        this.rotation.x = Math.PI / 2;
        this.rotation.y = Math.PI / 8;
        this.position.set(-10, 100, 3);
        this.light = new THREE.DirectionalLight(0xffffff, intensity);
        this.light.castShadow = true;
        //Set up shadow properties for the light
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.light.shadow.camera.right = 16;
        this.light.shadow.camera.left = -16;
        this.light.shadow.camera.top = 16;
        this.light.shadow.camera.bottom = -16;
        super.add(this.light);
    }
}
//# sourceMappingURL=environment.js.map