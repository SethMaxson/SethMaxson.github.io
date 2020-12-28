import * as THREE from '../../../../node_modules/three/src/Three.js';
/**
* This is used to track and manage user input.
*/
export class InputManager
{
	keys: {
		/**Left mouse button */
		click: IInputKey;
		/**Right mouse button */
		rightClick: IInputKey;
		talk: IInputKey;
		magic: IInputKey;
		jump: IInputKey;
		changeView: IInputKey;
		sprint: IInputKey;
		ascend: IInputKey;
		descend: IInputKey;
		pause: IInputKey;
		inventory: IInputKey;
		left: IInputKey;
		right: IInputKey;
		up: IInputKey;
		down: IInputKey;
		gun: IInputKey;
		[key: string]: IInputKey;
	};
	constructor()
	{
		//@ts-ignore
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

		//#region key mappings
		//#region directional mappings
		addKey(37, 'left'); // left
		addKey(65, 'left'); // a
		addKey(39, 'right'); // right
		addKey(68, 'right'); // d
		addKey(38, 'up'); // up
		addKey(87, 'up'); // w
		addKey(40, 'down'); // down
		addKey(83, 'down'); // s
		//#endregion

		addKey(0, 'click'); // left click
		addKey(1, 'click'); // left click
		addKey(2, 'rightClick'); // right click

		addKey(0, 'talk'); // left click
		addKey(1, 'talk'); // left click
		addKey(2, 'magic'); // right click

		addKey(80, 'pause'); // p
		addKey(16, 'pause'); // escape
		addKey(32, 'jump'); // spacebar
		addKey(84, 'talk'); // t
		addKey(77, 'magic'); // m
		addKey(78, 'gun'); // n
		addKey(73, 'inventory'); // i
		addKey(81, 'changeView'); // q
		addKey(71, 'gun'); // g
		addKey(97, 'ascend'); // numpad 1
		addKey(98, 'descend'); // numpad 2
		addKey(16, 'sprint'); // shift
		addKey(90, 'a');
		addKey(88, 'b');
		//#endregion

		window.addEventListener('keydown', (e) =>
		{
			setKeyFromKeyCode(e.keyCode, true);
		});
		window.addEventListener('keyup', (e) =>
		{
			setKeyFromKeyCode(e.keyCode, false);
		});
		window.addEventListener('mousedown', (e) =>
		{
			setKeyFromKeyCode(e.button, true);
		});
		window.addEventListener('mouseup', (e) =>
		{
			setKeyFromKeyCode(e.button, false);
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

interface IInputKey
{
	down: boolean;
	justPressed: boolean;
}