import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Main, PlayerControls } from './engine.js';
import { Entity } from './entity/entity.js';
import { EntityAbilities } from './entity/entityabilities.js';
import { Characters } from './../characters.js';

export class Motion extends THREE.Object3D
{
	speed: number = 0;
	physicsBody?: CANNON.Body;
	constructor(x: number = 0, y: number = 0, z: number = 0)
	{
		super();
		this.position.set(x, y, z);
	}
	update(main: Main, delta: number) { }
}

export class PersonMotionState
{
	isAirborne: boolean = false;
	isFlying: boolean = false;
	isGliding: boolean = false;
	isClimbing: boolean = false;
	isSlipping: boolean = false;
	isSprinting: boolean = false;
	isSwimming: boolean = false;
};

export class PersonMotion extends Motion
{
	state: PersonMotionState;
	canMove = true;
	baseSpeed = 6;
	direction = new THREE.Vector3();
	velocity = new THREE.Vector3(0, 0, 0);
	abilities: EntityAbilities;
	entityReference: string = "";
	jumpCounter: number = 0;
	constructor(x: number = 0, y: number = 0, z: number = 0)
	{
		super(x, y, z);
		this.state = new PersonMotionState();
		this.abilities = new EntityAbilities();
		this.abilities.maxJump = 1;
	}
	fromPerson(person: Characters.Person3D)
	{
		this.position.copy(person.position);
	}
	face(person: Entity)
	{
		this.rotation.y = Math.atan2(person.Model.position.x - this.position.x, person.Model.position.z - this.position.z) + Math.PI;

	}
	update(main: Main, delta: number, jumped: boolean = false)
	{
		if (this.canMove)
		{
			super.update(main, delta);

			if (jumped) this.jump();

			if (this.physicsBody) {
				this.physicsBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),Math.atan2(this.direction.x, this.direction.z));
				this.physicsBody.velocity.x = -this.direction.x * this.speed;
				this.physicsBody.velocity.z = -this.direction.z * this.speed;
				this.position.set(this.physicsBody.position.x, this.physicsBody.position.y, this.physicsBody.position.z);
				//@ts-ignore
				this.quaternion.copy(this.physicsBody.quaternion);
			}
		}
	}
	walk(direction: THREE.Vector3 = this.direction, speed: number = this.speed)
	{
		direction.y = 0;
		if (Math.abs(direction.z) + Math.abs(direction.x) > 0.2)
		{
			direction.normalize();
			this.speed = this.state.isSprinting ? speed * 2 : speed;
		}
	}
	jump()
	{
		if (this.physicsBody) {
			if (this.state.isAirborne) this.jumpCounter = Math.max(this.jumpCounter, 1);
			if (this.jumpCounter < this.abilities.maxJump)
			{
				// If this entity is already airborne, only air jumps are allowed.
				// if (this.airborne === false)
				// {
					this.physicsBody.velocity.y = 15;
					this.jumpCounter++;
				// }
				this.state.isAirborne = true;
			}
		}
	}
	attachPhysics()
	{
		// Create a sphere
		var radius = 1; // m
		let sphereShape = new CANNON.Sphere(radius);
		this.physicsBody = new CANNON.Body({
			mass: 5, // kg
		});
		this.physicsBody.addShape(sphereShape, new CANNON.Vec3(0, 0, 0));
		// this.sphere.addShape(sphereShape, new CANNON.Vec3(0, 1, 0));
		// this.sphere.addShape(sphereShape, new CANNON.Vec3(0, -1, 0));
		this.physicsBody.position = new CANNON.Vec3(0, 10, -85); // m
		this.physicsBody.linearDamping = 0.4;
		this.physicsBody.fixedRotation = true;

		let target = this;
		var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
		var upAxis = new CANNON.Vec3(0, 1, 0);
		this.physicsBody.addEventListener("collide", function (e: CANNON.ICollisionEvent){
			var contact = e.contact;

			// contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
			// We do not yet know which one is which! Let's check.
			if(contact.bi.id == target.physicsBody?.id)  // bi is the player body, flip the contact normal
				contact.ni.negate(contactNormal);
			else
				contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

			// If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
			if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
				target.jumpCounter = 0;
		});
	}
}

/**
* Default object for land-based player physics
*/
export class PlayerMotion extends PersonMotion
{
	constructor() {
		super();
		this.abilities.maxJump = 6;
	}
	update( main: Main, delta: number, firstPerson:boolean = false, controls?: PlayerControls ) {
		let newDirection = new THREE.Vector3();

		if (this.canMove && controls != undefined)
		{
			newDirection.y = 0;
			newDirection.z = Number( main.InputManager.keys.up.down ) - Number( main.InputManager.keys.down.down );
			newDirection.x = Number( main.InputManager.keys.left.down ) - Number( main.InputManager.keys.right.down );
			newDirection.normalize(); // this ensures consistent movements in all directions
			let dir = new THREE.Vector3();
			controls.Camera.getWorldDirection(dir).negate();

			this.speed = 0;

			newDirection.y = 0;
			if (Math.abs(newDirection.z) + Math.abs(newDirection.x) > 0)
			{
				//#region Mario64 style test
				dir.y = 0;
				let desired_rot = Math.atan2(newDirection.x, newDirection.z) + Math.atan2(dir.x, dir.z);
				let desired_dir = new THREE.Vector3(Math.sin(desired_rot), 0, Math.cos(desired_rot)).normalize();
				let new_ratio = 30 * delta;

				let old_ratio = 1.0 - new_ratio

				let new_dir = (this.direction.multiplyScalar(old_ratio)).add(desired_dir.multiplyScalar(new_ratio));

				this.direction.copy(new_dir.normalize());
				this.state.isSprinting = main.InputManager.keys.sprint.down;
				this.walk(this.direction, this.baseSpeed);
				//#endregion
			}

			super.update(main, delta, main.InputManager.keys.jump.justPressed);
		}
	}
}

function round(value: number, factor: number = 100)
{
	return Math.round(value * factor)/factor;
}