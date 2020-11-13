import { EventDispatcher, Vector3, Logger } from 'yuka';
import { WEAPON_TYPES_BLASTER, WEAPON_TYPES_SHOTGUN, WEAPON_TYPES_ASSAULT_RIFLE } from '../core/Constants.js';
import { CONFIG } from '../core/Config.js';

const PI05 = Math.PI / 2;
const direction = new Vector3();
const velocity = new Vector3();

const STEP1 = 'step1';
const STEP2 = 'step2';

let currentSign = 1;
let elapsed = 0;

const euler = { x: 0, y: 0, z: 0 };

/**
* Holds the implementation of the First-Person Controls.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class FirstPersonControls extends EventDispatcher {

	/**
	* Constructs a new first person controls.
	*
	* @param {Player} owner - A refernce to the player object.
	*/
	constructor( owner = null ) {

		super();

		this.owner = owner;

		this.active = true;

		this.movementX = 0; // mouse left/right
		this.movementY = 0; // mouse up/down

		this.lookingSpeed = CONFIG.CONTROLS.LOOKING_SPEED;
		this.brakingPower = CONFIG.CONTROLS.BRAKING_POWER;
		this.headMovement = CONFIG.CONTROLS.HEAD_MOVEMENT;
		this.weaponMovement = CONFIG.CONTROLS.WEAPON_MOVEMENT;

		this.input = {
			forward: false,
			backward: false,
			right: false,
			left: false,
			mouseDown: false
		};

		this.sounds = new Map();

		this._mouseDownHandler = onMouseDown.bind( this );
		this._mouseUpHandler = onMouseUp.bind( this );
		this._mouseMoveHandler = onMouseMove.bind( this );
		this._pointerlockChangeHandler = onPointerlockChange.bind( this );
		this._pointerlockErrorHandler = onPointerlockError.bind( this );
		this._keyDownHandler = onKeyDown.bind( this );
		this._keyUpHandler = onKeyUp.bind( this );

	}

	/**
	* Connects the event listeners and activates the controls.
	*
	* @return {FirstPersonControls} A reference to this instance.
	*/
	connect() {

		document.addEventListener( 'mousedown', this._mouseDownHandler, false );
		document.addEventListener( 'mouseup', this._mouseUpHandler, false );
		document.addEventListener( 'mousemove', this._mouseMoveHandler, false );
		document.addEventListener( 'pointerlockchange', this._pointerlockChangeHandler, false );
		document.addEventListener( 'pointerlockerror', this._pointerlockErrorHandler, false );
		document.addEventListener( 'keydown', this._keyDownHandler, false );
		document.addEventListener( 'keyup', this._keyUpHandler, false );

		document.body.requestPointerLock();

		return this;

	}

	/**
	* Disconnects the event listeners and deactivates the controls.
	*
	* @return {FirstPersonControls} A reference to this instance.
	*/
	disconnect() {

		document.removeEventListener( 'mousedown', this._mouseDownHandler, false );
		document.removeEventListener( 'mouseup', this._mouseUpHandler, false );
		document.removeEventListener( 'mousemove', this._mouseMoveHandler, false );
		document.removeEventListener( 'pointerlockchange', this._pointerlockChangeHandler, false );
		document.removeEventListener( 'pointerlockerror', this._pointerlockErrorHandler, false );
		document.removeEventListener( 'keydown', this._keyDownHandler, false );
		document.removeEventListener( 'keyup', this._keyUpHandler, false );

		return this;

	}

	/**
	* Ensures the controls reflect the current orientation of the owner. This method is
	* always used if the player's orientation is set manually. In this case, it's necessary
	* to adjust internal variables.
	*
	* @return {FirstPersonControls} A reference to this instance.
	*/
	sync() {

		this.owner.rotation.toEuler( euler );
		this.movementX = euler.y; // yaw

		this.owner.head.rotation.toEuler( euler );
		this.movementY = euler.x; // pitch

		return this;

	}

	/**
	* Resets the controls (e.g. after a respawn).
	*
	* @param {Number} delta - The time delta.
	* @return {FirstPersonControls} A reference to this instance.
	*/
	reset() {

		this.active = true;

		this.movementX = 0;
		this.movementY = 0;

		this.input.forward = false;
		this.input.backward = false;
		this.input.right = false;
		this.input.left = false;
		this.input.mouseDown = false;

		currentSign = 1;
		elapsed = 0;
		velocity.set( 0, 0, 0 );

	}

	/**
	* Update method of this controls. Computes the current velocity and head bobbing
	* of the owner (player).
	*
	* @param {Number} delta - The time delta.
	* @return {FirstPersonControls} A reference to this instance.
	*/
	update( delta ) {

		if ( this.active ) {

			this._updateVelocity( delta );

			const speed = this.owner.getSpeed();
			elapsed += delta * speed;

			// elapsed is used by the following two methods. it is scaled with the speed
			// to modulate the head bobbing and weapon movement

			this._updateHead();
			this._updateWeapon();

			// if the mouse is pressed and an automatic weapon like the assault rifle is equiped
			// support automatic fire

			if ( this.input.mouseDown && this.owner.isAutomaticWeaponUsed() ) {

				this.owner.shoot();

			}

		}

		return this;

	}

	/**
	* Computes the current velocity of the owner (player).
	*
	* @param {Number} delta - The time delta.
	* @return {FirstPersonControls} A reference to this instance.
	*/
	_updateVelocity( delta ) {

		const input = this.input;
		const owner = this.owner;

		velocity.x -= velocity.x * this.brakingPower * delta;
		velocity.z -= velocity.z * this.brakingPower * delta;

		direction.z = Number( input.forward ) - Number( input.backward );
		direction.x = Number( input.left ) - Number( input.right );
		direction.normalize();

		if ( input.forward || input.backward ) velocity.z -= direction.z * CONFIG.CONTROLS.ACCELERATION * delta;
		if ( input.left || input.right ) velocity.x -= direction.x * CONFIG.CONTROLS.ACCELERATION * delta;

		owner.velocity.copy( velocity ).applyRotation( owner.rotation );

		return this;

	}

	/**
	* Computes the head bobbing of the owner (player).
	*
	* @return {FirstPersonControls} A reference to this instance.
	*/
	_updateHead() {

		const owner = this.owner;
		const head = owner.head;

		// some simple head bobbing

		const motion = Math.sin( elapsed * this.headMovement );

		head.position.y = Math.abs( motion ) * 0.06;
		head.position.x = motion * 0.08;

		//

		head.position.y += owner.height;

		//

		const sign = Math.sign( Math.cos( elapsed * this.headMovement ) );

		if ( sign < currentSign ) {

			currentSign = sign;

			const audio = this.owner.audios.get( STEP1 );
			audio.play();

		}

		if ( sign > currentSign ) {

			currentSign = sign;

			const audio = this.owner.audios.get( STEP2 );
			audio.play();

		}

		return this;

	}

	/**
	* Computes the movement of the current armed weapon.
	*
	* @return {FirstPersonControls} A reference to this instance.
	*/
	_updateWeapon() {

		const owner = this.owner;
		const weaponContainer = owner.weaponContainer;

		const motion = Math.sin( elapsed * this.weaponMovement );

		weaponContainer.position.x = motion * 0.005;
		weaponContainer.position.y = Math.abs( motion ) * 0.002;

		return this;

	}

}

// event listeners

function onMouseDown( event ) {

	if ( this.active && event.which === 1 ) {

		this.input.mouseDown = true;
		this.owner.shoot();

	}

}

function onMouseUp( event ) {

	if ( this.active && event.which === 1 ) {

		this.input.mouseDown = false;

	}

}

function onMouseMove( event ) {

	if ( this.active ) {

		this.movementX -= event.movementX * 0.001 * this.lookingSpeed;
		this.movementY -= event.movementY * 0.001 * this.lookingSpeed;

		this.movementY = Math.max( - PI05, Math.min( PI05, this.movementY ) );

		this.owner.rotation.fromEuler( 0, this.movementX, 0 ); // yaw
		this.owner.head.rotation.fromEuler( this.movementY, 0, 0 ); // pitch

	}

}

function onPointerlockChange() {

	if ( document.pointerLockElement === document.body ) {

		this.dispatchEvent( { type: 'lock' } );

	} else {

		this.disconnect();

		this.dispatchEvent( { type: 'unlock' } );

	}

}

function onPointerlockError() {

	Logger.warn( 'Dive.FirstPersonControls: Unable to use Pointer Lock API.' );

}

function onKeyDown( event ) {

	if ( this.active ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				this.input.forward = true;
				break;

			case 37: // left
			case 65: // a
				this.input.left = true;
				break;

			case 40: // down
			case 83: // s
				this.input.backward = true;
				break;

			case 39: // right
			case 68: // d
				this.input.right = true;
				break;

			case 82: // r
				this.owner.reload();
				break;

			case 49: // 1
				this.owner.changeWeapon( WEAPON_TYPES_BLASTER );
				break;

			case 50: // 2
				if ( this.owner.hasWeapon( WEAPON_TYPES_SHOTGUN ) ) {

					this.owner.changeWeapon( WEAPON_TYPES_SHOTGUN );

				}
				break;

			case 51: // 3
				if ( this.owner.hasWeapon( WEAPON_TYPES_ASSAULT_RIFLE ) ) {

					this.owner.changeWeapon( WEAPON_TYPES_ASSAULT_RIFLE );

				}
				break;

		}

	}

}

function onKeyUp( event ) {

	if ( this.active ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				this.input.forward = false;
				break;

			case 37: // left
			case 65: // a
				this.input.left = false;
				break;

			case 40: // down
			case 83: // s
				this.input.backward = false;
				break;

			case 39: // right
			case 68: // d
				this.input.right = false;
				break;

		}

	}

}

export { FirstPersonControls };
