/**
* This is used to track and manage user input.
*/
export class InputManager {
    constructor(fullScreenOnly = false) {
        //@ts-ignore
        this.keys = {};
        const keyMap = new Map();
        const addKey = (keyCode, name) => {
            this.keys[name] = { down: false, justPressed: false };
            keyMap.set(keyCode, name);
        };
        const setKeyFromKeyCode = (keyCode, pressed) => {
            const keyName = keyMap.get(keyCode);
            if (!keyName) {
                return;
            }
            this.setKey(keyName, pressed);
        };
        const getKeyNameFromKeyCode = (keyCode) => {
            return keyMap.get(keyCode);
        };
        /* Controls should be mappable to common controller layouts. Probably should base on SNES.

            D-Pad: movement

            Select: Map
            Start: Pause/Menu

            L: Cycle Spell/Item left
            R: Cycle Spell/Item right

            A: Talk/Interact?
            B: Attack?
            X: Spell/Item?
            Y: Sprint?
        */
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
        addKey(16, 'sprint'); // shift
        addKey(32, 'jump'); // spacebar
        addKey(71, 'gun'); // g
        addKey(73, 'inventory'); // i
        addKey(74, 'attack'); // j
        addKey(75, 'attack'); // k
        addKey(76, 'attack'); // l
        addKey(77, 'magic'); // m
        addKey(78, 'gun'); // n
        addKey(81, 'changeView'); // q
        addKey(84, 'talk'); // t
        addKey(97, 'ascend'); // numpad 1
        addKey(98, 'descend'); // numpad 2
        //#endregion
        window.addEventListener('keydown', (e) => {
            // console.log(getKeyNameFromKeyCode(e.keyCode) + " pressed!");
            setKeyFromKeyCode(e.keyCode, true);
            if (fullScreenOnly) {
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', (e) => {
            setKeyFromKeyCode(e.keyCode, false);
            if (fullScreenOnly) {
                e.preventDefault();
            }
        });
        window.addEventListener('mousedown', (e) => {
            setKeyFromKeyCode(e.button, true);
        });
        window.addEventListener('mouseup', (e) => {
            setKeyFromKeyCode(e.button, false);
        });
    }
    update() {
        for (const keyState of Object.values(this.keys)) {
            if (keyState.justPressed) {
                keyState.justPressed = false;
            }
        }
    }
    setKey(keyName, pressed) {
        const keyState = this.keys[keyName];
        keyState.justPressed = pressed && !keyState.down;
        keyState.down = pressed;
    }
    ;
    getMovementDirection() {
        let newDirection = { x: 0, y: 0 };
        newDirection.x = Number(this.keys.right.down) - Number(this.keys.left.down);
        newDirection.y = Number(this.keys.down.down) - Number(this.keys.up.down);
        var magnitude = Math.sqrt(newDirection.x * newDirection.x + newDirection.y * newDirection.y); //calculating length
        if (magnitude > 0) {
            newDirection.x = newDirection.x / magnitude; //assigning new value to x (dividing x by length of the vector)
            newDirection.y = newDirection.y / magnitude; //assigning new value to y
        }
        return newDirection;
    }
}
//# sourceMappingURL=input-manager.js.map