import * as THREE from '../../../../../node_modules/three/src/Three.js';
import { Main, InputManager, Attitude } from "./../engine.js";
import { Motion, PersonMotion, PlayerMotion } from './../motion.js';
import { PointerLockControls } from '../../../../../sf/res/js/PointerControls.js';
import { Characters } from '../../../../../sf/res/js/characters.js';
import { Controls } from './controls.js';
import { Dialog } from '../../../../../sf/res/js/dialog.js';
import { Entity } from "./../engine.js";

declare function randomize(Array: any): any;
declare function speak(speaker: string | Dialog.Dialog[], speech: number | string, callback ?: Function, character ?: Entity): void;

export class PlayerControls extends Controls
{
	mesh: Characters.Person3D;
	motion: PlayerMotion;
	height: number = 0.50;
	firstPerson: boolean = true;
	aimRaycaster: THREE.Raycaster;
	constructor(camera: THREE.Camera, main: Main)
	{
		super(camera, main);
		this.mesh = new Characters.Person3D();
		this.motion = new PlayerMotion();

		this.aimRaycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0.1, 50 );
	}

	getCollisions(delta: number)
	{
		//#region update Raycasters
		var aimRay = new THREE.Vector3();
		this.Camera.getWorldDirection(aimRay);
		this.aimRaycaster.ray.set(this.motion.position, aimRay);
		this.aimRaycaster.ray.origin.y += this.height;
		//#endregion

		this.motion.update(this.mainProcess, delta, this.firstPerson, this);
		this.getObject().position.copy(this.motion.position);
	}

	getInteractions() {
		var aimIntersections = this.aimRaycaster.intersectObjects(this.mainProcess.Interactive);
		let hud = this.mainProcess.HUD;

		if (aimIntersections.length > 0)
		{
			let ent = this.mainProcess.Entities.GetByModelID(aimIntersections[0].object.parent?.uuid as string);
			if (ent != undefined)
			{
				hud.reticle.target(Attitude.Hostile);
				if (this.InputManager.keys.magic.down == true) {
					this.InputManager.keys.magic.down = false;
					ent.Model.gender = $("#spell-parameters select[index=1]").val() as string;
					ent.Model.setHair(randomize(["Loose_Pony", "Floppy", "Warhawk", "Pixie_Cut"]), ent.Model.userData.hairColor || 0x000000);
				} else if (this.InputManager.keys.gun.down == true)
				{
					this.InputManager.keys.gun.down = false;
					ent.Health.damage(10);
				}
				if (aimIntersections[0].distance <= 5)
				{
					let hp = ent.Health;
					let targetName = ent.Model.name;
					hud.showTooltip("Press \"t\" to talk.");

					hud.reticle.label = hp != undefined ? `${targetName} ${hp.currentHP}/${hp.maxHP}` : targetName;

					if (this.InputManager.keys.talk.down == true) {
						this.InputManager.keys.talk.down = false;
						this.motion.canMove = false;
						speak(Dialog.getDialog(ent.Model.name),
							0,
							() => {
								this.motion.canMove = true;
							},
							ent
						);
					}
				}
				else
				{
					hud.reticle.label = "";
				}
			}
		}
		else {
			hud.reticle.label = "";
			hud.reticle.target(undefined);
		}
		var thing = this.motion.position;
		$("#debug").html(`
			<div>Location: ${thing.x}, Y: ${thing.y}, Z: ${thing.z}</div>
			<div>Current Draw call count: ${this.mainProcess.renderer.info.render.calls}</div>
		`);
	}

	update(delta: number)
	{
		this.getCollisions(delta);
		this.getInteractions();
	}
}