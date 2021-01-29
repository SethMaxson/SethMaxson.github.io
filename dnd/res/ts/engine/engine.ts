import * as THREE from '../../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { FOUR } from '../../../../sf/res/js/four.js';
import { Characters } from '../../../../sf/res/js/characters.js';
import { Sky } from '../../../../sf/res/js/sky.js';
import { HUD } from './hud/hud.js';
import { StageEntityManager } from './stageentitymanager.js';
import { Motion, PersonMotion } from './motion.js';
import { Controls } from './controls/controls.js';
import { PlayerControls } from './controls/playercontrols.js';

export { PlayerControls } from './controls/playercontrols.js';
export var main: Main;

export function Initialize(controlsType?: string)
{
	main = new Main(controlsType);
	return main;
}

/**
* Indicates one entity's disposition towards another.
*/
export enum Attitude
{
	Hostile,
	Unfriendly,
	Indifferent,
	Friendly,
	Helpful
}

/**
* Manages HitPoints objects in the scene.
*/
export class HealthManager
{
	members: HitPoints[] = [];
	update(main: Main)
	{
		this.members.forEach(hp =>
		{
			if (hp.changed == true)
			{
				hp.changed = false;
				let ent = main.Entities.GetByEntityID(hp.entityReference);
				if (ent?.Events.HealthChanged != undefined)
					ent.Events.HealthChanged();

				if (hp.justDied == true)
				{
					hp.justDied = false;
					if (ent?.Events.Died != undefined)
						ent.Events.Died();
				}
			}

		});
	}
}

/**
* This tracks and manages HP for an entity.
*/
export class HitPoints
{
	maxHP: number;
	currentHP: number;
	dead: boolean = false;
	justDied: boolean = false;
	justResurrected: boolean = false;
	entityReference: string;
	changed: boolean = false;
	/**
	* @param id - the ID of the entity whose HP is represented by this object
	* @param max - the maximum HP of the entity
	*/
	constructor(id: string, max: number = 20)
	{
		this.entityReference = id;
		this.maxHP = max;
		this.currentHP = max;
	}
	/**
	 * Harms the entity.
	 * @param damageAmount - the amount of damage taken by the entity.
	*/
	damage(damageAmount: number)
	{
		damageAmount = damageAmount || 1;
		this.currentHP -= damageAmount;
		this.changed = true;
		if (this.currentHP <= 0)
		{
			this.dead = true;
			this.justDied = true;
			this.currentHP = 0;
		}
	}
	/**
	 * Heals the entity.
	 * @param healAmount - the amount by which the entity is healed.
	*/
	heal(healAmount: number)
	{
		healAmount = healAmount || 1;
		this.currentHP += healAmount;
		this.currentHP = Math.min(this.currentHP, this.maxHP);
		this.dead = false;
		this.justDied = false;
		this.changed = true;
	}
}

/**
* This is used to track and manage user input.
*/
export class InputManager
{
	keys: any;
	constructor()
	{
		this.keys = {};
		const keyMap = new Map();

		const addKey = (keyCode: number, name: string) =>
		{
			this.keys[name] = { down: false, justPressed: false };
			keyMap.set(keyCode, name);
		};

		const setKeyFromKeyCode = (keyCode: number, pressed: boolean) =>
		{
			const keyName = keyMap.get(keyCode);
			if (!keyName)
			{
				return;
			}
			this.setKey(keyName, pressed);
		};

		addKey(37, 'left'); // left
		addKey(65, 'left'); // a
		addKey(39, 'right'); // right
		addKey(68, 'right'); // d
		addKey(38, 'up'); // up
		addKey(87, 'up'); // w
		addKey(40, 'down'); // down
		addKey(83, 'down'); // s
		addKey(32, 'jump'); // spacebar
		addKey(84, 'talk'); // t
		addKey(77, 'magic'); // m
		addKey(78, 'gun'); // n
		addKey(81, 'changeView'); // q
		addKey(71, 'gun'); // g
		addKey(97, 'ascend'); // numpad 1
		addKey(98, 'descend'); // numpad 2
		addKey(16, 'sprint'); // shift
		addKey(90, 'a');
		addKey(88, 'b');

		window.addEventListener('keydown', (e) =>
		{
			setKeyFromKeyCode(e.keyCode, true);
		});
		window.addEventListener('keyup', (e) =>
		{
			setKeyFromKeyCode(e.keyCode, false);
		});
	}
	update()
	{
		for (const keyState of Object.values(this.keys) as any)
		{
			if (keyState.justPressed)
			{
				keyState.justPressed = false;
			}
		}
	}
	setKey(keyName: string, pressed: boolean)
	{
		const keyState = this.keys[keyName];
		keyState.justPressed = pressed && !keyState.down;
		keyState.down = pressed;
	};
	getMovementDirection(): THREE.Vector3
	{
		let newDirection = new THREE.Vector3(0, 0, 0);
		newDirection.z = Number(this.keys.up.down) - Number(this.keys.down.down);
		newDirection.x = Number(this.keys.left.down) - Number(this.keys.right.down);
		newDirection.normalize(); // this ensures consistent movements in all directions
		return newDirection;
	}
}

/**
* The settings for the main process for the engine.
*/
export class EngineSettings
{
	hideCompass: boolean = false;
}

/**
* The main process for the engine.
*/
export class Main
{
	Scene: THREE.Scene;
	HUD: HUD;
	FPS: number = 40;
	renderer: THREE.WebGLRenderer;
	HealthManager: HealthManager;
	Entities: EntityManager;
	Interactive: THREE.Object3D[] = [];
	Collidable: THREE.Object3D[] = [];
	Timer: Timer;
	DebugHelper: EngineDebug;
	Camera: THREE.PerspectiveCamera;
	Stages: Stage[] = [];
	MainStage: Stage;
	Controls: Controls;
	Sky: Sky;
	InputManager: InputManager;
	onRenderFcts: Function[] = [];
	Motions: PersonMotion[] = [];
	_effect: OutlineEffect;
	Settings: EngineSettings = new EngineSettings();;
	constructor(controlsType: string = "Human")
	{
		this.HUD = new HUD();
		$("body").append(this.HUD.html);
		this.renderer = FOUR.Renderer(document.getElementById('container') as HTMLElement);
		this.HealthManager = new HealthManager();
		this.Entities = new EntityManager(this);
		this.Timer = new Timer();
		this.MainStage = new Stage(this);
		this.FPS = 60;
		this.Scene = new THREE.Scene();
		this.Scene.add(this.MainStage);
		this.Scene.background = new THREE.Color(0x11aaff);

		this.Camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.1,
			3000
		);
		this.DebugHelper = new EngineDebug(this);
		this.Camera.up.set(0, 1, 0);
		this.Camera.position.set(0, 0.5, 0);
		this.InputManager = new InputManager();
		if (controlsType == "Ship")
		{
			this.Controls = new ShipControls(this.Camera, this);
		}
		else
		{
			this.Controls = new PlayerControls(this.Camera, this);
		}

		let target = this;
		if (controlsType !== "Viewer") {
			this.renderer.domElement.addEventListener('click', function ()
			{
				target.Controls.lock();
			}, false);
		}
		this.Scene.add(this.Controls.getObject());

		//@ts-ignore
		this.Sky = new Sky(this);
		this.Scene.add(this.Sky);

		this._effect = new OutlineEffect(this.renderer, {
			defaultThickness: 0.001,
			defaultColor: [0, 0, 0],
			defaultAlpha: 0.8,
			defaultKeepAlive: true
		});

		// #region InputManagerSetup

		var onKeyUp = function (event: KeyboardEvent)
		{
			switch (event.keyCode)
			{
				case 81: // q
					target.Controls.firstPerson = !target.Controls.firstPerson;
					if (target.Controls.firstPerson == true)
					{
						target.Camera.position.z = 0;
						if (target.Controls.mesh != undefined)
						{
							target.Controls.mesh.visible = false;
						}
					} else
					{
						target.Camera.position.z = target.Controls._zoom;
						if (target.Controls.mesh != undefined)
						{
							target.Controls.mesh.visible = true;
						}
					}
					break;
			}
		};
		var onMouseWheel = function (event: WheelEvent)
		{
			target.Controls.zoom(event.deltaY * 0.005);
			if (!target.Controls.firstPerson)
				target.Camera.position.z = target.Controls._zoom;
		};
		document.addEventListener('keyup', onKeyUp, false);
		document.addEventListener('wheel', onMouseWheel, false);
		//#endregion
	}
	update()
	{
		let target = this;
		if (this.Controls.isLocked === true)
		{
			let delta = this.Timer.delta;
			this.updateGameLogic(delta);

			// let ticks =  Math.round( delta / ( 1 / 120 ) );
			// for ( let i = 0 ; i < ticks ; i++ ) {
			// 	this.updateGameLogic( delta / ticks );
			// };

			this.DebugHelper.update();
			this.HealthManager.update(this);

			this.Sky.update(this.Controls.getObject());
			this.updateCompass();

			this.InputManager.update();
			this.onRenderFcts.forEach(function (onRenderFct)
			{
				onRenderFct(delta, target.Timer.prevTime / 1000)
			});
			this.renderer.render(this.Scene, this.Controls.Camera);
			// this._effect.render( this.Scene, this.Controls.Camera );
		}
		// queues up the next frame
		setTimeout(() => requestAnimationFrame(target.update.bind(target)), 1000 / target.FPS);
		// requestAnimationFrame(target.update.bind(target));
	}
	updateGameLogic(delta: number)
	{
		this.Controls.update(delta);

		let target = this;

		this.Motions.forEach(function (motion)
		{
			motion.update(target, delta);
		});

		this.Entities.members.forEach(function (node)
		{
			node.update(delta);
		});
	}
	hideCompass()
	{
		this.Settings.hideCompass = true;
		$("#compass").hide();
	}
	updateCompass()
	{
		if (!this.Settings.hideCompass) {
			var vector = new THREE.Vector3();
			var spherical = new THREE.Spherical();
			this.Camera.getWorldDirection(vector);
			spherical.setFromVector3(vector);
			$('#compass > svg')[0].style.transform = `rotate(${spherical.theta - Math.PI}rad)`;
		}
	}
}

/**
* A debug helper meant to be attached to an instance of Main.
*/
class EngineDebug
{
	BoxHelpers: THREE.BoxHelper[] = [];
	Engine: Main;
	constructor(engine: Main)
	{
		this.Engine = engine;
	}
	addPerson(person: Characters.Person3D)
	{
		let target = this;
		this.BoxHelpers.push(new THREE.BoxHelper(person, 0xff0000));
		person.traverse(function (node: THREE.Object3D)
		{
			if (node.name == "Target")
			{
				target.BoxHelpers.push(new THREE.BoxHelper(node, 0xffffff));
			}
			// else if (node.name == "Torso") {
			// 	target.BoxHelpers.push(new THREE.BoxHelper(node, 0x0000ff));
			// }
			// else if (node.name == "Skeleton") {
			// 	target.BoxHelpers.push(new THREE.BoxHelper(node, 0x00ff00));
			// }
			// else {
			// 	target.BoxHelpers.push(new THREE.BoxHelper(node, 0x00ff00));
			// }
		})
		this.BoxHelpers.forEach(helper =>
		{
			target.Engine.Scene.add(helper);
		});
	}
	update()
	{
		this.BoxHelpers.forEach(box =>
		{
			box.update();
		});
	}
}

/**
 * Intended to be sort of like a chunk in Minecraft.
 */
export class Stage extends THREE.Object3D
{
	Entities: StageEntityManager;
	EntityModels: THREE.Object3D;
	Sound: any[] = [];
	Terrain: THREE.Object3D;
	constructor(main: Main)
	{
		super();
		this.Entities = new StageEntityManager(main, this);
		this.EntityModels = new THREE.Object3D();
		this.Terrain = new THREE.Object3D();
		this.add(this.Terrain);
		this.add(this.EntityModels);
	}
	needsUpdate()
	{
		let models = this.EntityModels;
		this.Entities.members.forEach(ent =>
		{
			if (models.getObjectByProperty("uuid", ent.ID) == undefined)
			{
				alert("Undefined!");
			}
			else
			{
				alert((models.getObjectByProperty("uuid", ent.ID) as THREE.Object3D).toString());
			};
		});
	}
}

class Timer
{
	prevTime: number;
	constructor()
	{
		this.prevTime = performance.now();
	}
	get delta()
	{
		var time = performance.now();
		var del = Math.min((time - this.prevTime) / 1000, 1 / 20);
		this.prevTime = time;
		return del;
	}
}

export class EntityManager
{
	members: Entity[] = [];
	mainProcess: Main;
	constructor(main: Main)
	{
		this.mainProcess = main;
	}
	GetByModelID(id: string): Entity | undefined
	{
		var result;
		this.members.forEach(ent =>
		{
			if (ent.Model.uuid == id)
			{
				return result = ent;
			}
		});
		return result;
	}
	GetByEntityID(id: string): Entity | undefined
	{
		var result;
		this.members.forEach(ent =>
		{
			if (ent.ID == id)
			{
				return result = ent;
			}
		});
		return result;
	}
	Add(newMember: Entity, collidable: boolean = false)
	{
		this.members.push(newMember);
		this.mainProcess.HealthManager.members.push(newMember.Health);
		this.mainProcess.Motions.push(newMember.Motion);
		// If there is a collision target for this model, add it to the list of interactive things.
		let interactionTarget = newMember.Model.getObjectByName("Target");
		if (interactionTarget != undefined)
		{
			this.mainProcess.Interactive.push(interactionTarget);
			// this.mainProcess.Collidable.push(new THREE.Box3().setFromObject(newMember.Model));
			if (collidable)
				this.mainProcess.Collidable.push(interactionTarget);
		}
	}
	AddMesh(newMember: Characters.Person3D, collidable: boolean = false)
	{
		this.Add(new Entity(newMember), collidable);
	}
}

export class EntityAnimations
{
	Walk: string = "Walk";
	Stand: string = "Stand";
}

/**
 * This class contains objects and methods for a character.
 */
export class Entity
{
	_ID: string;
	Events: EntityEvents;
	Health: HitPoints;
	_Model: Characters.Person3D;
	Motion: PersonMotion;
	PositionOffset: THREE.Vector3;
	Animations: EntityAnimations;
	constructor(model?: Characters.Person3D)
	{
		this._ID = uuidv4();
		this.Health = new HitPoints(this._ID);
		this.Events = new EntityEvents();
		this.Motion = new PersonMotion();
		if (model == undefined)
		{
			this._Model = new Characters.Person3D();
		}
		else
		{
			this._Model = model;
			this.Motion.position.copy(model.position);
			this.Motion.rotation.copy(model.rotation);
		}
		this.PositionOffset = new THREE.Vector3(0, -1, 0);
		this.Animations = new EntityAnimations();
	}
	get Model()
	{
		return this._Model;
	}
	set Model(value: Characters.Person3D)
	{
		this._Model = value;
	}
	get ID(): string
	{
		return this._ID;
	}
	set ID(value: string)
	{
		this._ID = value;
		this.Health.entityReference = value;
		this.Motion.entityReference = value;
	}
	update(delta: number)
	{
		if (this.Motion.canMove === true)
		{
			this._Model.position.copy(this.Motion.position).add(this.PositionOffset);
			this._Model.rotation.copy(this.Motion.rotation);
			this._Model.rotation.y = this.Motion.rotation.y + Math.PI;
			if (this._Model.userData.mixer != undefined)
			{
				this._Model.userData.mixer.update(delta);
			}

			// Animation control test
			if (this._Model.userData.animations)
			{
				if (this.Motion.speed > 0.2)
				{
					this._Model.animation = this.Animations.Walk;
					(this._Model.userData.mixer as THREE.AnimationMixer).timeScale = 2 * this.Motion.speed;
				}
				else
				{
					// this._Model.animation = this.Animations.Stand;
					this._Model.animation = this._Model.userData.animations.Stand;
					(this._Model.userData.mixer as THREE.AnimationMixer).timeScale = 2;
				}
			}
		}
	}

}

export class EntityEvents
{
	Died?: Function;
	HealthChanged?: Function;
	Resurrected?: Function;
	Think?: Function;
}

/**
* Entity State
*/
export class EntityState
{
	isFlying: boolean = false;
	isGliding: boolean = false;
	isClimbing: boolean = false;
	isSlipping: boolean = false;
	isDashing: boolean = false;
	chargingDash: boolean = false;
};

/**
* Entity Permissions/Abilities
*/
export class EntityAbilities
{
	gliding: boolean = false;
	infinityJump: boolean = false;
	dash: boolean = false;
	maxJump: number = 1;
};

export class ShipControls extends Controls
{
	mesh: THREE.Mesh;
	motion: Motion;
	firstPerson: boolean = true;
	interactRaycaster: THREE.Raycaster;
	speed: number = 50;
	constructor(camera: THREE.Camera, main: Main)
	{
		super(camera, main);
		this.mesh = new THREE.Object3D() as THREE.Mesh;
		this.motion = new Motion();

		this.interactRaycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0.1, 5 );
	}

	getCollisions(delta: number) {
		this.motion.update(this.mainProcess, delta);
		this.getObject().position.copy(this.motion.position);
		this.mesh.position.set(this.motion.position.x, this.motion.position.y, this.motion.position.z);
		this.mesh.rotation.y = this.motion.rotation.y;
	}

	getInteractions() {
		var interactIntersections = this.interactRaycaster.intersectObjects(this.mainProcess.Interactive);
		let hud = this.mainProcess.HUD;

		if (interactIntersections.length > 0)
		{
			hud.reticle.target(Attitude.Hostile);
			hud.reticle.label = (interactIntersections[0].object.parent as THREE.Object3D).name;
		}
		else
		{
			hud.reticle.label = "";
			hud.reticle.target(undefined);
		}

		var thing = this.getObject().position;
		$("#debug").html(`
			<div>Location: ${thing.x}, Y: ${thing.y}, Z: ${thing.z}</div>
		`);
	}

	updateRaycasters(delta: number) {
		this.motion.getWorldDirection(new THREE.Vector3()).negate();
		var pos = this.motion.position;
		var interactRay = new THREE.Vector3();
		this.Camera.getWorldDirection(interactRay);
		this.interactRaycaster.ray.set(pos, interactRay);
		let moveDir = this.InputManager.getMovementDirection();
		if (moveDir.x != 0 || moveDir.y != 0 || moveDir.z != 0)
		{
			this.motion.rotation.copy(this.getObject().rotation);
			this.motion.rotation.y += Math.atan2(moveDir.x, moveDir.z);
			this.motion.speed = this.speed;
		}
		else
		{
			this.motion.speed = 0;
		}
		if (this.InputManager.keys.ascend.down)
		{
			this.motion.translateY(10 * delta);
		}
		else if (this.InputManager.keys.descend.down)
		{
			this.motion.translateY(-10 * delta);
		}
	}

	update(delta: number)
	{
		this.updateRaycasters(delta);
		this.getCollisions(delta);
		this.getInteractions();
	}
}

function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export abstract class GameState
{
	abstract update(delta: number): void;
	abstract render(): void;
	abstract onEnter(): void;
	abstract onExit(): void;
}