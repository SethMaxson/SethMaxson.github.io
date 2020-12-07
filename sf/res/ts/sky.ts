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

import {
	BackSide,
	Color,
	DirectionalLight,
	DirectionalLightHelper,
	Fog,
	HemisphereLight,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	ShaderMaterial,
	SphereBufferGeometry,
	Vector3,
	FrontSide,
	DoubleSide,
	Vector
} from '../../../node_modules/three/src/Three.js';
import { Engine } from './engine.js';
import { Direction } from 'readline';
import { Dir } from 'fs';

export class Sky extends Object3D
{
	sun: Sun;
	hemiLight: HemisphereLight;
	dome: Mesh;
	time: Time;
	_radius: number;
	// helper: DirectionalLightHelper;
	constructor(main: Engine.Main)
	{
		let radius = 1000;

		var vertexShader = `
			varying vec3 vWorldPosition;

			void main() {

				vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
				vWorldPosition = worldPosition.xyz;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
		`;
		var fragmentShader = `
			uniform vec3 topColor;
			uniform vec3 bottomColor;
			uniform float offset;
			uniform float exponent;

			varying vec3 vWorldPosition;

			void main() {

				float h = normalize( vWorldPosition + offset ).y;
				gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

			}
		`;
		var uniforms = {
			// // "topColor": { value: new Color( 0x0077ff ) },
			// // "bottomColor": { value: new Color( 0xffffff ) },
			// // "offset": { value: 33 },
			// // "exponent": { value: 0.6 }
			// "topColor": { value: new Color( 0x4b74ff ) },
			// "bottomColor": { value: new Color( 0xa3f2ef ) },
			"topColor": { value: new Color( 0x4b74ff ) },
			"bottomColor": { value: new Color( 0xa3f2ef ) },
			// "bottomColor": { value: new Color( 0x5b84ff ) },
			// // "bottomColor": { value: new Color( 0x91c0fe ) },
			"offset": { value: 2000 },
			"exponent": { value: 0.2 }
		};

		var skyGeo = new SphereBufferGeometry( radius, 32, 15 );
		var skyMat = new ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: BackSide
		} );

		// super(skyGeo, skyMat);
		super();

		this.dome = new Mesh(skyGeo, skyMat);
		this.add(this.dome);


		this.hemiLight = new HemisphereLight( 0xffffff, 0xddd, 1 );
		this.hemiLight.position.set(0, 50, 0);

		// uniforms[ "topColor" ].value.copy( this.hemiLight.color );
		main.Scene.add( this.hemiLight );

		// Add Sun Helper
		this.sun = new Sun(0.025 * radius);
		this.add(this.sun.mesh);
		this.add(this.sun.light);
		// this.helper = new DirectionalLightHelper(this.sun.light, 1000, 0xff0000);
		// main.Scene.add( this.helper );
		this._radius = radius;


		main.Scene.fog = new Fog (0x4ca7e6, radius * 0.8, radius * 1.25);
		main.Scene.fog.color.copy(uniforms["bottomColor"].value);
		this.time = new Time(14);
		this.updateSun();
	};
	update(position: Object3D, time?: Time): void
	{
		this.position.copy(position.position);
		this.sun.light.target.copy(position);
		// this.helper.update();
	}
	updateSun()
	{
		let x = -Math.sin(2 * Math.PI * ((this.time._hour - 12) / 24));
		let y = Math.cos(2 * Math.PI * ((this.time._hour - 12) / 24));
		this.sun.position = new Vector3(x * this._radius * 0.8, y * this._radius * 0.8, 0);
	}
};

export class Sun
{
	light: DirectionalLight;
	mesh: Mesh;
	constructor(radius: number)
	{
		// let verts = 16;
		let verts = 32;
		this.mesh = new Mesh(
			new SphereBufferGeometry( radius, verts, verts/2 ),
			new MeshBasicMaterial( { color: 0xfffff6, side: FrontSide } )
		);
		this.mesh.add(new Mesh(
			new SphereBufferGeometry( radius*1.2, verts, verts/2 ),
			new MeshBasicMaterial( { color: 0xf3c900, side: BackSide, transparent: true, opacity:0.4 } )
		));

		//#region set light
		let dirLight = new DirectionalLight( 0xffffff, 0.6 );
		// dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( 0.0001, 0.0001, 0.0001 );

		dirLight.castShadow = true;

		dirLight.shadow.mapSize.width = 1024;
		dirLight.shadow.mapSize.height = 1024;

		var d = 25;

		dirLight.shadow.camera.left = - d;
		dirLight.shadow.camera.right = d;
		dirLight.shadow.camera.top = d;
		dirLight.shadow.camera.bottom = - d;

		dirLight.shadow.camera.far = 3500;
		dirLight.shadow.bias = - 0.0001;

		this.light = dirLight;
		//#endregion
	}
	get position(): Vector3
	{
		return this.mesh.position;
	}
	set position(value: Vector3)
	{
		this.mesh.position.copy(value);
		this.light.position.copy(value);
	}
}

export class Time
{
	_hour: number;
	_minute: number;
	constructor(hour: number = 0, minute: number = 0)
	{
		this._hour = hour;
		this._minute = hour;
	}
}