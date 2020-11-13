import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Main, PlayerControls } from './engine.js';
import { Entity } from './entity/entity.js';
import { EntityAbilities } from './entity/entityabilities.js';
import { Characters } from '../../../../sf/res/js/characters.js';


const motionRaycastLengths = {
	front: 0.6,
	rear: 0.6,
	side: 0.6,
	bottom: 1
}

export class MotionCollisions
{
	front: THREE.Intersection[] = [];
	rear: THREE.Intersection[] = [];
	left: THREE.Intersection[] = [];
	right: THREE.Intersection[] = [];
	top: THREE.Intersection[] = [];
	bottom: THREE.Intersection[] = [];
}

export class MotionRays
{
	front: THREE.Raycaster;
	rear: THREE.Raycaster;
	left: THREE.Raycaster;
	right: THREE.Raycaster;
	top: THREE.Raycaster;
	bottom: THREE.Raycaster;
	_debugFront: THREE.ArrowHelper;
	_debugRear: THREE.ArrowHelper;
	_debugLeft: THREE.ArrowHelper;
	_debugRight: THREE.ArrowHelper;
	_debugTop: THREE.ArrowHelper;
	_debugBottom: THREE.ArrowHelper;
	_initDone = false;
	constructor()
	{
		this.rear = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, motionRaycastLengths.rear);
		this.front = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, motionRaycastLengths.front);
		this.left = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, motionRaycastLengths.side);
		this.right = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, motionRaycastLengths.side);
		this.top = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10);
		this.bottom = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0))

		this._debugFront = new THREE.ArrowHelper(this.front.ray.direction, this.front.ray.origin, 1, 0xffff00);
		this._debugRear = new THREE.ArrowHelper(this.rear.ray.direction, this.rear.ray.origin, 1, 0xff0000);
		this._debugLeft = new THREE.ArrowHelper(this.left.ray.direction, this.left.ray.origin, 1, 0xff00ff);
		this._debugRight = new THREE.ArrowHelper(this.right.ray.direction, this.right.ray.origin, 1, 0x00ffff);
		this._debugTop = new THREE.ArrowHelper(this.top.ray.direction, this.top.ray.origin, 1, 0x00ff00);
		this._debugBottom = new THREE.ArrowHelper(this.bottom.ray.direction, this.bottom.ray.origin, 1, 0x0000ff);
	}
	update(main: Main, position: THREE.Vector3, direction: THREE.Vector3): void
	{
		this.bottom.ray.origin.copy(position);
		// this.bottom.ray.origin.y += rayCasterOffset;
		this.top.ray.origin.copy(position);
		this.rear.ray.set(position, direction);
		this.front.ray.set(position, direction.negate());
		this.left.ray.set(position, direction.applyMatrix4(new THREE.Matrix4().makeRotationY((Math.PI / 2))));
		this.right.ray.set(position, direction.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI)));


		// main.Scene.remove(this._debugFront);
		// // main.Scene.remove(this._debugRear);
		// // main.Scene.remove(this._debugLeft);
		// // main.Scene.remove(this._debugRight);
		// main.Scene.remove(this._debugTop);
		// main.Scene.remove(this._debugBottom);
		this._debugFront = new THREE.ArrowHelper(this.front.ray.direction, this.front.ray.origin, motionRaycastLengths.front, 0xff0000);
		this._debugRear = new THREE.ArrowHelper(this.rear.ray.direction, this.rear.ray.origin, motionRaycastLengths.rear, 0xffff00);
		this._debugLeft = new THREE.ArrowHelper(this.left.ray.direction, this.left.ray.origin, motionRaycastLengths.side, 0xff00ff);
		this._debugRight = new THREE.ArrowHelper(this.right.ray.direction, this.right.ray.origin, motionRaycastLengths.side, 0x00ffff);
		this._debugTop = new THREE.ArrowHelper(this.top.ray.direction, this.top.ray.origin, 1, 0x00ff00);
		this._debugBottom = new THREE.ArrowHelper(this.bottom.ray.direction, this.bottom.ray.origin, 1, 0x0000ff);
		// main.Scene.add(this._debugFront);
		// // main.Scene.add(this._debugRear);
		// // main.Scene.add(this._debugLeft);
		// // main.Scene.add(this._debugRight);
		// main.Scene.add(this._debugTop);
		// main.Scene.add(this._debugBottom);
	}

	getCollisions(objects: THREE.Object3D[]): MotionCollisions
	{
		let cols = new MotionCollisions();
		cols.front = this.front.intersectObjects(objects);
		cols.rear = this.rear.intersectObjects(objects);
		cols.left = this.left.intersectObjects(objects);
		cols.right = this.right.intersectObjects(objects);
		cols.bottom = this.bottom.intersectObjects(objects);
		return cols;
	}
}

export class Motion extends THREE.Object3D
{
	collisions: MotionCollisions;
	_rays: MotionRays;
	speed: number = 0;
	_prevPosition: THREE.Vector3;
	collideWall: boolean = true;
	constructor(x: number = 0, y: number = 0, z: number = 0)
	{
		super();
		this.position.set(x, y, z);
		this._prevPosition = new THREE.Vector3(x, y, z);
		this._rays = new MotionRays();
		this.collisions = new MotionCollisions();
	}
	update(main: Main, delta: number)
	{
		var dir = new THREE.Vector3();
		this.getWorldDirection(dir);
		this._prevPosition.copy(this.position);
		this._rays.update(main, this.position, dir);
		this.collisions = this._rays.getCollisions(main.Collidable);
		if (this.collideWall)
		{
			if (this.collisions.left.length > 0 && this.collisions.right.length > 0)
			{
				this.translateX((this.collisions.right[0].distance - this.collisions.left[0].distance) / 2);
			}
			else if (this.collisions.right.length > 0)
			{
				this.translateX(this.collisions.right[0].distance - motionRaycastLengths.side);
			}
			else if (this.collisions.left.length > 0)
			{
				this.translateX(motionRaycastLengths.side - this.collisions.left[0].distance);
			}
		}
		if (
			!this.collideWall ||
			this.collisions.front.length == 0 ||
			(this.collisions.front.length > 0 && this.collisions.front[0].distance > this.speed)
		)
		{
			this.translateZ(-this.speed * delta);
		}

	}
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
			ApplyGravity(this, delta);

			super.update(main, delta);

			if (jumped) this.jump();

			FloorCollision(this, delta, false);

			// Adjust velocity based on collisions
			if (this.collisions.front.length > 0)
			{
				this.velocity.z = Math.max(0, this.velocity.z);
				this.speed = Math.max(0, this.speed);
			}
			if (this.collisions.rear.length > 0)
			{
				this.velocity.z = Math.min(0, this.velocity.z);
				this.speed = Math.max(0, this.speed);
			}
			if (this.collisions.left.length > 0) this.velocity.x = Math.max(0, this.velocity.x);
			if (this.collisions.right.length > 0) this.velocity.x = Math.min(0, this.velocity.x);

			this.translateX(this.velocity.x * delta);
			this.translateZ(this.velocity.z * delta);
		}
	}
	walk(direction: THREE.Vector3 = this.direction, speed: number = this.speed)
	{
		direction.y = 0;
		if (Math.abs(direction.z) + Math.abs(direction.x) > 0.2)
		{
			direction.normalize();
			this.rotation.y = Math.atan2(direction.x, direction.z);
			this.speed = this.state.isSprinting? speed * 2 : speed;
		}
	}
	jump()
	{
		if (this.state.isAirborne) this.jumpCounter = Math.max(this.jumpCounter, 1);
		if (this.jumpCounter < this.abilities.maxJump)
		{
			// If this entity is already airborne, only air jumps are allowed.
			// if (this.airborne === false)
			// {
				// this.velocity.y = 0.3 * this.baseSpeed;
				this.velocity.y = 15;
				this.jumpCounter++;
			// }
			this.state.isAirborne = true;
		}
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

/**
* Keep this to break down for strafing
*/
class PlayerMotionDeprecated extends Motion
{
	airborne = false;
	canMove = true;
	baseSpeed = 50;
	direction = new THREE.Vector3();
	velocity = new THREE.Vector3(0, 0, 0);
	height: number = 1;
	horizontalSpeed: number = 0;
	constructor()
	{
		super();
	}
	update(main: Main, delta: number, controls?: PlayerControls, firstPerson: boolean = false)
	{
		let newDirection = new THREE.Vector3();

		if (this.canMove && controls != undefined)
		{

			this.rotation.copy(controls.getObject().rotation);
			super.update(main, delta);

			const moveForward = main.InputManager.keys.up.down;
			const moveBackward = main.InputManager.keys.down.down;
			const moveLeft = main.InputManager.keys.left.down;
			const moveRight = main.InputManager.keys.right.down;
			const jumped = main.InputManager.keys.jump.justPressed;
			if (jumped)
			{
				this.jump();
			}

			var hits = this.collisions.bottom;
			this.airborne = true;
			// are we above, or at most knee deep in, the platform?
			if ((hits.length > 0))
			{
				const rayCasterOffset = 2;
				var actualHeight = hits[0].distance - this.height * 2 - rayCasterOffset;
				// var actualHeight = hits[ 0 ].distance;
				// collision: stick to the surface if landing on it
				if ((this.velocity.y <= 0) && (actualHeight < this.height))
				{
					this.position.y -= actualHeight;
					this.position.y = Math.round(this.position.y * 100) / 100;
					this.velocity.y = 0;
					this.airborne = false;
					if (jumped === true)
					{
						this.velocity.y = 0.2 * this.baseSpeed;
					}
				}
			}
			if (this.airborne === true)
			{
				this.velocity.y -= 6 * delta * 100; // 100.0 = mass
				this.velocity.y = Math.max(this.velocity.y, -128832); // prevent from accelerating past terminal velocity
			}

			this.velocity.x -= this.velocity.x * 10.0 * delta;
			this.velocity.z -= this.velocity.z * 10.0 * delta;

			newDirection.y = 0;
			newDirection.z = Number(moveForward) - Number(moveBackward);
			newDirection.x = Number(moveLeft) - Number(moveRight);
			newDirection.normalize(); // this ensures consistent movements in all directions


			// Calculate acceleration and new velocity
			if (moveForward || moveBackward) this.velocity.z -= newDirection.z * this.baseSpeed * delta;
			if (moveLeft || moveRight) this.velocity.x -= newDirection.x * this.baseSpeed * delta;
			this.velocity.z = Math.round(this.velocity.z * 1000) / 1000
			this.velocity.x = Math.round(this.velocity.x * 1000) / 1000


			// #region Rotation test
			if (firstPerson)
			{
				this.direction.copy(controls.getObject().rotation.toVector3().normalize());
			}
			else if (this.horizontalSpeed > 0.2)
			{
				this.direction.y = Math.atan2(newDirection.x, newDirection.z);
			}
			//#endregion


			// Adjust velocity based on collisions
			if (this.collisions.rear.length > 0) this.velocity.z = Math.max(0, this.velocity.z);
			if (this.collisions.front.length > 0) this.velocity.z = Math.min(0, this.velocity.z);
			if (this.collisions.right.length > 0) this.velocity.x = Math.max(0, this.velocity.x);
			if (this.collisions.left.length > 0) this.velocity.x = Math.min(0, this.velocity.x);

			this.horizontalSpeed = Math.abs(this.velocity.x) + Math.abs(this.velocity.z);

			this.translateX(this.velocity.x * delta);
			this.translateY(this.velocity.y * delta);
			this.translateZ(this.velocity.z * delta);

			controls.getObject().position.copy(this.position);
		}
	}
	jump()
	{
		if (this.airborne === false) this.velocity.y = 0.2 * this.baseSpeed;
		this.airborne = true;
	}
}

function round(value: number, factor: number = 100)
{
	return Math.round(value * factor)/factor;
}

function FloorCollision(motion: PersonMotion|PlayerMotion, delta: number, jumped: boolean = false)
{
	var hits = motion.collisions.bottom;
	motion.state.isAirborne = true;

	// are we above, or at most knee deep in, the platform?
	if ((hits.length > 0))
	{
		var actualHeight = round(hits[0].distance, 1000000);

		// collision: stick to the surface if landing on it
		if ((motion.velocity.y <= 0))
		{
			motion.position.y -= round((actualHeight - motionRaycastLengths.bottom), 1000000);
			motion.position.y = round(motion.position.y, 1000000);
			motion.velocity.y = 0;
			motion.state.isAirborne = false;
			motion.jumpCounter = 0;
		}
	}
	motion.translateY(motion.velocity.y * delta);
	motion.position.y = round(motion.position.y, 1000000);
}

function ApplyGravity(motion: PlayerMotion|PersonMotion, delta: number, mass: number = 100)
{
	// acceleration due to gravity
	const adg = 1.96; // 9.80665 meters per second
	// terminal velocity
	const tv = 39 // 195 km/h according to https://en.wikipedia.org/wiki/Terminal_velocity#Examples
	// motion.velocity.y -= adg * mass;
	motion.velocity.y -= adg * delta * 20;
	motion.velocity.y = round(Math.max(motion.velocity.y, -tv), 1000000); // prevent from accelerating past terminal velocity

	motion._rays.bottom.far = Math.max((-motion.velocity.y * delta) + motionRaycastLengths.bottom, 0.1);
}