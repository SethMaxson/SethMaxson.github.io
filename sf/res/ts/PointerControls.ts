/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
import
	{
		Camera,
		EventDispatcher,
		Object3D
	} from '../../../node_modules/three/src/Three.js';

export class PointerLockControls extends EventDispatcher
{

	isLocked: boolean = false;
	domElement: HTMLElement;
	pitchObject: Object3D;
	yawObject: Object3D;
	PI_2: number = Math.PI / 2;
	constructor(camera: Camera, domElement?: HTMLElement)
	{
		super();

		this.domElement = domElement || document.body;

		camera.rotation.set(0, 0, 0);

		this.pitchObject = new Object3D();
		this.pitchObject.add(camera);

		this.yawObject = new Object3D();
		this.yawObject.position.y = 10;
		this.yawObject.add(this.pitchObject);

		this.connect();
	}

	onMouseMove(target: PointerLockControls)
	{
		return function curried_func(event: MouseEvent)
		{
			if (target.isLocked === false) return;
			// @ts-ignore
			var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			// @ts-ignore
			var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			target.yawObject.rotation.y -= movementX * 0.002;
			target.pitchObject.rotation.x -= movementY * 0.002;

			target.pitchObject.rotation.x = Math.max(- target.PI_2, Math.min(target.PI_2, target.pitchObject.rotation.x));
		}
	}

	onPointerlockChange(target: PointerLockControls)
	{
		return function curried_func(this: Document, event: Event)
		{
			if (document.pointerLockElement === target.domElement)
			{
				target.dispatchEvent({ type: 'lock' });
				target.isLocked = true;
			} else
			{
				target.dispatchEvent({ type: 'unlock' });
				target.isLocked = false;
			}
		}
	}

	onPointerlockError()
	{
		console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
	}

	connect(): void
	{
		document.addEventListener('mousemove', this.onMouseMove(this), false);
		document.addEventListener('pointerlockchange', this.onPointerlockChange(this), false);
		document.addEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	disconnect(): void
	{
		document.removeEventListener('mousemove', this.onMouseMove(this), false);
		document.removeEventListener('pointerlockchange', this.onPointerlockChange(this), false);
		document.removeEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	dispose(): void
	{
		this.disconnect();
	};

	getObject(): Object3D
	{
		return this.yawObject;
	};

	lock(): void
	{
		this.domElement.requestPointerLock();
	};

	unlock(): void
	{
		document.exitPointerLock();
	};
}