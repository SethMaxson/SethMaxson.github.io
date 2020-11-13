"use strict";
var Colors = {
    white: 0xd8d0d1,
    grey: 0xcccccc,
    darkGrey: 0x7c7c7c,
    lightGreen: 0x8eafa6,
    yellow: 0xffd342,
    brown: 0x715337,
    lightBrown: 0x725f4c,
    red: 0xdf3636,
    blue: 0x307ddd,
    orange: 0xDB7525,
    green: 0x28b736,
    brass: 0xbca345,
};
var verShader = `
#define SCALE 100.0

varying vec2 vUv;

uniform float uTime;

float calculateSurface(float x, float z) {
    float y = 0.0;
    y += sin(x * 2.8 / SCALE + uTime * 1.5);
    y += sin(z * 2.45 / SCALE + uTime * 1.7);
    return y;
}

void main() {
    vUv = uv;
    vec3 pos = position;

    float strength = 0.5;
    pos.y += strength * calculateSurface(pos.x, pos.z);
    pos.y -= strength * calculateSurface(0.0, 0.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.1);

}
`;
var fragShader = `
#define SCALE 100.0

varying vec2 vUv;

uniform sampler2D uMap;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

void main() {

    vec2 uv = vUv * SCALE + vec2(uTime * -0.05);

    uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
    uv.x += 0.12 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2)) / 3.0;
    uv.y += 0.12 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;

    vec4 tex1 = texture2D(uMap, uv * 1.0);
    vec4 tex2 = texture2D(uMap, uv * 1.5 + vec2(0.2));

    vec3 blue = uColor;

    gl_FragColor = vec4(blue + vec3(tex1.a * 0.4 - tex2.a * 0.02), 1.0);
    gl_FragColor.a = 0.8;

    #ifdef USE_FOG
          #ifdef USE_LOGDEPTHBUF_EXT
              float depth = gl_FragDepthEXT / gl_FragCoord.w;
          #else
              float depth = gl_FragCoord.z / gl_FragCoord.w;
          #endif
          float fogFactor = smoothstep( fogNear, fogFar, depth );
          gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
     #endif
}
`;
class Sea {
    constructor(main) {
        this.mesh = new THREE.Object3D();
        var geomWaves = new THREE.PlaneBufferGeometry(2000, 2000, 500, 500);
        geomWaves.rotateX(-Math.PI / 2);
        this.uniforms = {
            uMap: { type: 't', value: null },
            uTime: { type: 'f', value: 0 },
            // uColor: { type: 'f', value: new THREE.Color('#307ddd') },
            uColor: { type: 'f', value: new THREE.Color('#005fe3') },
            fogColor: { type: "c", value: main.Scene.fog.color },
            fogNear: { type: "f", value: main.Scene.fog.near },
            fogFar: { type: "f", value: main.Scene.fog.far }
        };
        var shader = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: verShader,
            fragmentShader: fragShader,
            side: THREE.DoubleSide,
            fog: true,
            transparent: false,
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('/img/textures/water-shader.png', function (texture) {
            shader.uniforms.uMap.value = texture;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });
        this.mesh = new THREE.Mesh(geomWaves, shader);
        var geomSeaBed = new THREE.PlaneBufferGeometry(2000, 2000, 5, 5);
        geomSeaBed.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        var matWaves = new THREE.MeshPhongMaterial({
            color: 0x307ddd
        });
        var seaBed = new THREE.Mesh(geomSeaBed, matWaves);
        seaBed.position.set(0, -10, 0);
        seaBed.castShadow = false;
        seaBed.receiveShadow = true;
        this.mesh.add(seaBed);
        this.mesh.castShadow = false;
        this.mesh.receiveShadow = true;
    }
}
//# sourceMappingURL=toon-water.js.map