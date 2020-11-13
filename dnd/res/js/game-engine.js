import * as THREE from '../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { FOUR } from '../../../sf/res/js/four.js';
import { Characters } from '../../../sf/res/js/characters.js';
import { PointerLockControls } from '../../../sf/res/js/PointerControls.js';
import { Dialog } from '../../../sf/res/js/dialog.js';
import { Sky } from '../../../sf/res/js/sky.js';
export var main;
const motionRaycastLengths = {
    front: 0.6,
    rear: 0.6,
    left: 0.6,
    right: 0.6,
    bottom: 1
};
export var Engine;
(function (Engine) {
    const rayCasterOffset = 2;
    function Initialize(controlsType) {
        main = new Engine.Main(controlsType);
        return main;
    }
    Engine.Initialize = Initialize;
    class Component {
        constructor(gameObject) {
            this.gameObject = gameObject;
        }
        update() {
        }
    }
    class SafeArray {
        constructor() {
            this.array = [];
            this.addQueue = [];
            this.removeQueue = new Set();
        }
        get isEmpty() {
            return this.addQueue.length + this.array.length > 0;
        }
        add(element) {
            this.addQueue.push(element);
        }
        remove(element) {
            this.removeQueue.add(element);
        }
        forEach(fn) {
            this._addQueued();
            this._removeQueued();
            for (const element of this.array) {
                if (this.removeQueue.has(element)) {
                    continue;
                }
                fn(element);
            }
            this._removeQueued();
        }
        _addQueued() {
            if (this.addQueue.length) {
                this.array.splice(this.array.length, 0, ...this.addQueue);
                this.addQueue = [];
            }
        }
        _removeQueued() {
            if (this.removeQueue.size) {
                this.array = this.array.filter(element => !this.removeQueue.has(element));
                this.removeQueue.clear();
            }
        }
    }
    class GameObjectManager {
        constructor() {
            this.gameObjects = new SafeArray();
        }
        createGameObject(parent, name) {
            // @ts-ignore
            const gameObject = new GameObject(parent, name);
            this.gameObjects.add(gameObject);
            return gameObject;
        }
        removeGameObject(gameObject) {
            this.gameObjects.remove(gameObject);
        }
        update() {
            // @ts-ignore
            this.gameObjects.forEach(gameObject => gameObject.update());
        }
    }
    class HUD {
        constructor(name = "Player") {
            this.html = $(`
				<div class="hud-wrapper">
					<div id="hud">
						<div class="characterInfo">
							<div class="charLabel">
								${name}
							</div>
							<div style="width:100%" class="hp">
								<div class="bar" style="width:75%;"></div>
								<div class="text">15/20</div>
							</div>
							<progress id="health" value="100" max="100"></progress>
						</div>
					</div>

					<div id="compass" style="position: absolute; top: 50px; right:50px; background-color:rgba(255, 255, 255, 0.8); border-radius:50%; border:1px solid black;">
						<svg version="1.1" id="compass" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="130" height="130" viewBox="0 0 200 200" xml:space="preserve">
							<g transform="translate(19 -19)">
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M162.312,118.21l-24.773,4.063   c-0.41,7.021-2.08,13.585-4.961,19.679c-2.871,6.094-6.787,11.466-11.581,16.075c-4.717,4.609-10.233,8.359-16.542,11.173   c-6.239,2.891-12.87,4.443-19.988,4.922l-2.881,23.341l-3.906-23.341c-7.509-0.479-14.471-2.031-20.779-4.922   c-6.318-2.813-11.757-6.642-16.386-11.251c-4.638-4.678-8.388-10.147-11.269-16.31c-2.792-6.172-4.472-12.735-4.873-19.835   L0,118.21l24.373-3.115c0.4-7.032,2.08-13.595,4.873-19.679c2.881-6.085,6.63-11.476,11.347-16.085   c4.717-4.61,10.234-8.282,16.542-11.085c6.318-2.725,13.192-4.375,20.545-4.766l3.906-23.966l3.125,23.741   c7.108,0.469,13.749,2.109,19.979,4.912c6.23,2.813,11.747,6.631,16.464,11.241c4.716,4.688,8.554,10.078,11.425,16.163   c2.881,6.162,4.551,12.646,4.961,19.522L162.312,118.21L162.312,118.21z M62.007,73.627c-6.22,3.126-11.581,6.798-15.976,11.017   c-4.482,4.219-8.065,9.141-10.868,14.825L58.901,109l0.879-1.406L46.832,84.409L71.84,96.666l0.566-0.234L62.007,73.627   L62.007,73.627z M58.901,129.372l-0.4-1.016l-23.495,9.142c5.351,12.021,13.974,20.763,25.809,25.997l10.556-22.56l-1.045-0.391   l-23.495,12.169L58.901,129.372L58.901,129.372z M126.992,100.104c-5.204-11.554-13.427-19.991-24.783-25.461l-11.024,22.18   l1.191,0.859l23.338-13.272l-12.47,24.044c0.254,0.234,0.488,0.469,0.645,0.781c0.078,0.234,0.322,0.625,0.566,1.016   L126.992,100.104L126.992,100.104z M90.94,140.779c-0.156,0.078-0.557,0.156-1.191,0.156l11.415,22.56   c11.123-5.156,19.511-13.429,25.184-24.747l-22.693-9.767l-0.645,0.781l12.704,22.951L90.94,140.779L90.94,140.779z M91.34,118.366   c0-2.725-0.879-4.913-2.793-6.71c-1.835-1.719-4.159-2.656-6.962-2.656c-2.871,0-5.341,0.938-7.343,2.656   c-2.08,1.797-3.037,3.985-3.037,6.71c0,2.891,0.957,5.313,3.037,7.412c2.002,2.109,4.472,3.203,7.343,3.203   c2.803,0,5.127-1.094,6.962-3.203C90.461,123.679,91.34,121.257,91.34,118.366L91.34,118.366z M101.574,74.018   c-2.479-0.928-5.038-1.719-7.675-2.412c-2.637-0.625-5.352-1.172-8.153-1.416l3.759,26.008c0,0.313,0.244,0.469,0.801,0.469   L101.574,74.018L101.574,74.018z M57.701,126.716l-26.854-4.053c0.557,5.303,1.914,10.147,4.16,14.601l23.25-9.298L57.701,126.716   L57.701,126.716z M76.791,167.792l-4.15-26.466l-0.645-0.391l-10.624,22.95c1.68,1.094,4.003,1.953,6.875,2.578   C71.206,167.089,73.998,167.479,76.791,167.792L76.791,167.792z M35.007,100.104c-2.402,5.693-3.759,10.381-4.16,14.21l27.41-3.673   l0.244-0.625L35.007,100.104L35.007,100.104z M88.87,141.795l-3.524,25.997c2.479-0.313,5.038-0.703,7.597-1.328   s5.029-1.484,7.353-2.578l-10.79-22.56C89.504,141.639,89.26,141.795,88.87,141.795L88.87,141.795z M130.498,123.444l-26.043,3.896   l-0.166,0.781l22.059,9.767c1.113-2.422,1.992-4.844,2.559-7.188C129.541,128.278,130.107,125.856,130.498,123.444L130.498,123.444   z M76.791,70.189c-2.793,0.244-5.195,0.635-7.343,1.104c-2.158,0.469-4.395,1.162-6.796,1.943l10.233,22.961L76.791,70.189   L76.791,70.189z M130.498,114.313c-0.322-2.579-0.635-4.923-1.123-7.032c-0.469-2.109-1.191-4.297-1.992-6.563l-22.459,9.922   L130.498,114.313L130.498,114.313z M131.298,98.229c-2.471-6.095-6.151-11.554-11.024-16.319   c-4.795-4.844-10.155-8.751-15.985-11.72l-1.279,2.666c11.825,6.241,20.458,15.069,26.053,26.613L131.298,98.229L131.298,98.229z    M61.216,71.439l-1.279-1.865c-6.64,2.412-12.392,6.084-17.264,10.851C37.8,85.269,34.05,90.972,31.248,97.682l2.714,1.006   C39.079,86.206,48.189,77.144,61.216,71.439L61.216,71.439z M128.183,139.529c-6.474,12.179-15.35,20.685-26.609,25.372l1.27,2.5   c12.704-6.016,22.06-14.834,28.055-26.622L128.183,139.529L128.183,139.529z M58.745,167.167l1.426-2.422   c-5.986-2.422-11.259-5.859-15.897-10.303c-4.717-4.376-8.154-9.679-10.556-15.929l-2.714,0.781   C36.677,152.177,45.953,161.464,58.745,167.167L58.745,167.167z M81.996,107.203c1.279,0.234,2.549,0.703,3.838,1.25   c1.348,0.469,2.313,1.094,3.036,1.797l5.029-4.922c-1.992-1.719-3.828-2.891-5.674-3.516c-1.757-0.625-3.837-1.016-6.229-1.094   V107.203L81.996,107.203z M80.794,100.719c-4.472,0.234-8.388,2.031-11.913,5.469l4.794,4.063c1.279-1.094,2.402-1.797,3.369-2.109   c0.957-0.391,2.148-0.703,3.75-0.938V100.719L80.794,100.719z M99.739,117.985c-0.322-2.344-0.811-4.376-1.523-6.173   c-0.635-1.875-1.836-3.75-3.516-5.625l-4.951,4.453c2.158,2.188,3.271,4.61,3.271,7.345H99.739L99.739,117.985z M99.739,119.382   H93.02c-0.234,1.641-0.479,2.891-0.723,3.896c-0.156,0.947-0.879,1.963-1.992,3.047l4.15,4.453   C97.415,127.966,99.172,124.147,99.739,119.382L99.739,119.382z M63.296,119.382c0.156,2.188,0.635,4.297,1.435,6.318   c0.879,2.031,2.07,3.828,3.76,5.469l4.15-4.453c-1.123-1.084-1.835-2.266-2.314-3.584c-0.4-1.25-0.566-2.5-0.566-3.75H63.296   L63.296,119.382z M81.996,136.248c2.393,0,4.385-0.391,6.151-1.172c1.758-0.859,3.594-2.031,5.518-3.516l-4.16-4.454   c-1.123,0.703-2.079,1.328-2.792,1.875c-0.801,0.469-2.324,1.016-4.717,1.406V136.248L81.996,136.248z M80.794,130.388   c-3.115,0-5.429-1.016-7.119-3.047l-4.384,4.454c1.67,1.328,3.427,2.422,5.195,3.281c1.836,0.781,3.906,1.172,6.308,1.172V130.388   L80.794,130.388z M69.76,117.985c0-2.734,0.957-5.157,2.88-7.345l-4.56-3.828c-1.436,1.719-2.471,3.438-3.35,5.156   c-0.8,1.719-1.279,3.673-1.435,6.017H69.76L69.76,117.985z M135.458,122.663l-3.125,0.615c-0.078,2.666-0.557,5.313-1.191,7.813   c-0.723,2.501-1.602,5.079-2.725,7.813l2.48,1.25C133.701,134.451,135.214,128.591,135.458,122.663L135.458,122.663z    M84.955,66.137l0.391,2.422c2.88,0.156,5.751,0.625,8.632,1.406c2.871,0.859,5.674,1.709,8.397,2.646l1.279-2.646   c-3.037-0.938-6.151-1.797-9.276-2.5C91.262,66.693,88.147,66.293,84.955,66.137L84.955,66.137z M76.791,169.043   c-5.273-0.548-10.625-1.954-15.976-4.142l-1.035,2.5c4.717,2.579,10.546,4.063,17.421,4.454L76.791,169.043L76.791,169.043z    M85.345,169.043l-0.635,2.813c3.202-0.156,6.151-0.547,8.876-1.328c2.705-0.781,5.43-1.72,8.222-2.97l-0.645-2.422   C96.135,167.479,90.862,168.729,85.345,169.043L85.345,169.043z M135.458,114.704c-0.088-2.657-0.557-5.313-1.201-7.892   c-0.723-2.578-1.592-5.234-2.715-7.959l-2.08,1.25c0.713,2.256,1.279,4.678,1.836,7.178c0.566,2.5,0.957,4.922,1.035,7.267   L135.458,114.704L135.458,114.704z M33.483,137.498c-1.601-3.281-2.636-5.859-2.949-7.735c-0.41-1.875-0.732-4.287-0.967-7.1   l-3.115-0.625c0.244,2.969,0.8,5.771,1.513,8.428c0.801,2.657,1.758,5.392,2.881,8.282L33.483,137.498L33.483,137.498z    M26.453,114.704l3.115-0.156c0.234-3.126,0.723-5.86,1.357-8.282c0.635-2.344,1.514-4.609,2.558-6.797l-2.48-1.24   C28.767,103.531,27.253,109,26.453,114.704L26.453,114.704z M77.201,66.137c-2.715,0.156-5.518,0.391-8.232,0.781   c-2.637,0.469-5.439,1.172-8.154,2.266l0.801,2.031c2.393-0.703,4.794-1.25,7.353-1.797c2.626-0.547,5.273-0.938,8.076-1.016   L77.201,66.137z"/>
								<text transform="matrix(1 0 0 1 72 40)" fill="#de0000" font-family="Arial" font-size="24">N</text>
							</g>
						</svg>
					</div>

					<div id="spells" style="position:absolute; bottom:0; left:0; z-index:9; background:none; width:100%;">
						<select id="spell-name" style="width:10%; background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
							<option value="polymorph">Polymorph</option>
						</select>
						<span id="spell-parameters" style="display:inline-block; width:80%;">
							<select index="1" style=" background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
								<option value="f">F</option>
								<option value="m">M</option>
							</select>
						</span>
						<button id="spell-cast" style="width:8%; background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
							Cast!
						</button>
					</div>
					<div class="reticle">
						<div class="target-label"></div>
						&#160;
					</div>
				</div>
			`);
            this.reticle = new Reticle(this);
        }
        $(selector) {
            return this.html.find(selector);
        }
    }
    Engine.HUD = HUD;
    class Reticle {
        constructor(parent) {
            this._target = "";
            this.parent = parent;
        }
        get element() {
            return this.parent.$(".reticle");
        }
        get label() {
            return this.parent.$(".target-label").html();
        }
        set label(value) {
            if (this._target != value) {
                this._target = value;
                this.parent.$(".target-label").html(value);
            }
        }
        target(disposition) {
            if (disposition == undefined) {
                this.element[0].style.borderColor = "rgba(255,255,255, 0.4)"; // Reset to default
            }
            else {
                // TODO: Add handling for non-hostiles
                this.element[0].style.borderColor = "rgba(200,50,50,0.9)"; // Hostile
            }
        }
    }
    Engine.Reticle = Reticle;
    class HealthBar {
        constructor(hp) {
            this.html = `
				<div class="hp">
					<div class="bar" style="width:${100 * hp.currentHP / hp.maxHP}%;"></div>
					<div class="text">${hp.currentHP}/${hp.maxHP}</div>
				</div>
			`;
        }
    }
    Engine.HealthBar = HealthBar;
    /**
    * Indicates one entity's disposition towards another.
    */
    let Attitude;
    (function (Attitude) {
        Attitude[Attitude["Hostile"] = 0] = "Hostile";
        Attitude[Attitude["Unfriendly"] = 1] = "Unfriendly";
        Attitude[Attitude["Indifferent"] = 2] = "Indifferent";
        Attitude[Attitude["Friendly"] = 3] = "Friendly";
        Attitude[Attitude["Helpful"] = 4] = "Helpful";
    })(Attitude = Engine.Attitude || (Engine.Attitude = {}));
    /**
    * Manages HitPoints objects in the scene.
    */
    class HealthManager {
        constructor() {
            this.members = [];
        }
        update(main) {
            this.members.forEach(hp => {
                if (hp.justDied == true) {
                    hp.justDied = false;
                    let ent = main.Entities.GetByEntityID(hp.entityReference);
                    if (ent?.Events.Died != undefined)
                        ent.Events.Died();
                }
            });
        }
    }
    Engine.HealthManager = HealthManager;
    /**
    * This tracks and manages HP for an entity.
    */
    class HitPoints {
        /**
        * @param id - the ID of the entity whose HP is represented by this object
        * @param max - the maximum HP of the entity
        */
        constructor(id, max = 20) {
            this.dead = false;
            this.justDied = false;
            this.justResurrected = false;
            this.entityReference = id;
            this.maxHP = max;
            this.currentHP = max;
        }
        /**
         * Harms the entity.
         * @param damageAmount - the amount of damage taken by the entity.
        */
        damage(damageAmount) {
            damageAmount = damageAmount || 1;
            this.currentHP -= damageAmount;
            if (this.currentHP <= 0) {
                this.dead = true;
                this.justDied = true;
                this.currentHP = 0;
            }
        }
        /**
         * Heals the entity.
         * @param healAmount - the amount by which the entity is healed.
        */
        heal(healAmount) {
            healAmount = healAmount || 1;
            this.currentHP += healAmount;
            this.currentHP = Math.min(this.currentHP, this.maxHP);
            this.dead = false;
            this.justDied = false;
        }
    }
    Engine.HitPoints = HitPoints;
    /**
    * This is used to track and manage user input.
    */
    class InputManager {
        constructor() {
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
            window.addEventListener('keydown', (e) => {
                setKeyFromKeyCode(e.keyCode, true);
            });
            window.addEventListener('keyup', (e) => {
                setKeyFromKeyCode(e.keyCode, false);
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
            let newDirection = new THREE.Vector3(0, 0, 0);
            newDirection.z = Number(this.keys.up.down) - Number(this.keys.down.down);
            newDirection.x = Number(this.keys.left.down) - Number(this.keys.right.down);
            newDirection.normalize(); // this ensures consistent movements in all directions
            return newDirection;
        }
    }
    Engine.InputManager = InputManager;
    /**
    * The main process for the engine.
    */
    class Main {
        constructor(controlsType = "Human") {
            this.FPS = 40;
            this.Interactive = [];
            this.Collidable = [];
            this.Stages = [];
            this.onRenderFcts = [];
            this.Motions = [];
            this.HUD = new HUD();
            $("body").append(this.HUD.html);
            this.renderer = FOUR.Renderer();
            this.HealthManager = new HealthManager();
            this.Entities = new EntityManager(this);
            this.Timer = new Timer();
            this.MainStage = new Stage(this);
            this.FPS = 40;
            this.Scene = new THREE.Scene();
            this.Scene.add(this.MainStage);
            this.Scene.background = new THREE.Color(0x11aaff);
            this.Light = new THREE.HemisphereLight(0xffffff, 0x555, 1);
            this.Light.position.set(0, 50, 0);
            // this.Scene.add(this.Light);
            this.Camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
            this.DebugHelper = new EngineDebug(this);
            this.Camera.up.set(0, 1, 0);
            this.Camera.position.x = 0;
            this.Camera.position.y = 0.5;
            this.Camera.position.z = 0;
            this.InputManager = new InputManager();
            if (controlsType == "Ship") {
                this.Controls = new ShipControls(this.Camera, this);
            }
            else {
                this.Controls = new PlayerControls(this.Camera, this);
            }
            let target = this;
            this.renderer.domElement.addEventListener('click', function () {
                target.Controls.lock();
            }, false);
            this.Scene.add(this.Controls.getObject());
            this.Sky = new Sky(this);
            this.Scene.add(this.Sky);
            this._effect = new OutlineEffect(this.renderer, {
                defaultThickness: 0.001,
                defaultColor: [0, 0, 0],
                defaultAlpha: 0.8,
                defaultKeepAlive: true
            });
            // #region InputManagerSetup
            var onKeyUp = function (event) {
                switch (event.keyCode) {
                    case 81: // q
                        target.Controls.firstPerson = !target.Controls.firstPerson;
                        if (target.Controls.firstPerson == true) {
                            target.Camera.position.z = 0;
                            if (target.Controls.mesh != undefined) {
                                target.Controls.mesh.visible = false;
                            }
                        }
                        else {
                            target.Camera.position.z = target.Controls._zoom;
                            if (target.Controls.mesh != undefined) {
                                target.Controls.mesh.visible = true;
                            }
                        }
                        break;
                }
            };
            var onMouseWheel = function (event) {
                target.Controls.zoom(event.deltaY * 0.005);
                if (!target.Controls.firstPerson)
                    target.Camera.position.z = target.Controls._zoom;
            };
            document.addEventListener('keyup', onKeyUp, false);
            document.addEventListener('wheel', onMouseWheel, false);
            //#endregion
        }
        update() {
            let target = this;
            if (this.Controls.isLocked === true) {
                let delta = this.Timer.delta;
                this.Controls.update(delta);
                let target = this;
                this.Motions.forEach(function (motion) {
                    motion.update(target, delta);
                });
                //#region update Entities
                this.Entities.members.forEach(function (node) {
                    node.update(delta);
                    // if (node.Motion.canMove === true)
                    // {
                    // 	node.Model.position.copy(node.Motion.position);
                    // 	node.Model.rotation.copy(node.Motion.rotation);
                    // 	if (node.Model.userData.mixer != undefined) {
                    // 		node.Model.userData.mixer.update(delta);
                    // 	}
                    // }
                });
                //#endregion
                // let ticks =  Math.round( delta / ( 1 / 120 ) );
                // for ( let i = 0 ; i < ticks ; i++ ) {
                // 	this.updateGameLogic( delta / ticks );
                // };
                this.DebugHelper.update();
                this.HealthManager.update(this);
                this.Sky.update(this.Controls.getObject());
                this.updateCompass();
                this.InputManager.update();
                this.onRenderFcts.forEach(function (onRenderFct) {
                    onRenderFct(delta, target.Timer.prevTime / 1000);
                });
                this.renderer.render(this.Scene, this.Controls.Camera);
                // this._effect.render( this.Scene, this.Controls.Camera );
            }
            // queues up the next frame
            setTimeout(() => requestAnimationFrame(target.update.bind(target)), 1000 / target.FPS);
        }
        updateGameLogic(delta) {
            this.Controls.update(delta);
            let target = this;
            this.Motions.forEach(function (motion) {
                motion.update(target, delta);
            });
        }
        getSky() {
            // var material  = new THREE.MeshLambertMaterial();
            // material.map   = new THREE.TextureLoader().load('/sf/img/textures/galaxy_starfield.png');
            // material.emissiveIntensity = 0.5;
            // material.emissiveMap = material.map;
            // material.color = new THREE.Color(0xeeeeee);
            // material.side = THREE.BackSide;
            // // create the mesh based on geometry and material
            // this.Sky  = new THREE.Mesh(
            // 	new THREE.SphereGeometry(200, 32, 32),
            // 	material
            // );
            // var moon = new Moon(0x330055);
            // this.Sky.add(moon);
            // moon.light.target = this.Controls.getObject();
        }
        updateCompass() {
            var vector = new THREE.Vector3();
            var spherical = new THREE.Spherical();
            this.Camera.getWorldDirection(vector);
            spherical.setFromVector3(vector);
            $('#compass > svg')[0].style.transform = `rotate(${spherical.theta - Math.PI}rad)`;
        }
    }
    Engine.Main = Main;
    /**
    * A debug helper meant to be attached to an instance of Main.
    */
    class EngineDebug {
        constructor(engine) {
            this.BoxHelpers = [];
            this.Engine = engine;
        }
        addPerson(person) {
            let target = this;
            this.BoxHelpers.push(new THREE.BoxHelper(person, 0xff0000));
            person.traverse(function (node) {
                if (node.name == "Target") {
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
            });
            this.BoxHelpers.forEach(helper => {
                target.Engine.Scene.add(helper);
            });
        }
        update() {
            this.BoxHelpers.forEach(box => {
                box.update();
            });
        }
    }
    /**
     * Intended to be sort of like a chunk in Minecraft.
     */
    class Stage extends THREE.Object3D {
        constructor(main) {
            super();
            this.Sound = [];
            this.Entities = new StageEntityManager(main, this);
            this.EntityModels = new THREE.Object3D();
            this.Terrain = new THREE.Object3D();
            this.add(this.Terrain);
            this.add(this.EntityModels);
        }
        needsUpdate() {
            let models = this.EntityModels;
            this.Entities.members.forEach(ent => {
                if (models.getObjectByProperty("uuid", ent.ID) == undefined) {
                    alert("Undefined!");
                }
                else {
                    alert(models.getObjectByProperty("uuid", ent.ID).toString());
                }
                ;
            });
        }
    }
    Engine.Stage = Stage;
    class StageEntityManager {
        constructor(main, parent) {
            this.members = [];
            this.mainProcess = main;
            this.parent = parent;
        }
        GetByModelID(id) {
            var result;
            this.members.forEach(ent => {
                if (ent.Model.uuid == id) {
                    return result = ent;
                }
            });
            return result;
        }
        GetByEntityID(id) {
            var result;
            this.members.forEach(ent => {
                if (ent.ID == id) {
                    return result = ent;
                }
            });
            return result;
        }
        Add(newMember, collidable = false) {
            this.members.push(newMember);
            this.mainProcess.Entities.Add(newMember, collidable);
            this.parent.EntityModels.add(newMember.Model);
        }
        AddMesh(newMember, collidable = false) {
            this.Add(new Entity(newMember), collidable);
        }
    }
    Engine.StageEntityManager = StageEntityManager;
    class Timer {
        constructor() {
            this.prevTime = performance.now();
        }
        get delta() {
            var time = performance.now();
            var del = Math.min((time - this.prevTime) / 1000, 1 / 20);
            this.prevTime = time;
            return del;
        }
    }
    class EntityManager {
        constructor(main) {
            this.members = [];
            this.mainProcess = main;
        }
        GetByModelID(id) {
            var result;
            this.members.forEach(ent => {
                if (ent.Model.uuid == id) {
                    return result = ent;
                }
            });
            return result;
        }
        GetByEntityID(id) {
            var result;
            this.members.forEach(ent => {
                if (ent.ID == id) {
                    return result = ent;
                }
            });
            return result;
        }
        Add(newMember, collidable = false) {
            this.members.push(newMember);
            this.mainProcess.HealthManager.members.push(newMember.Health);
            this.mainProcess.Motions.push(newMember.Motion);
            // If there is a collision target for this model, add it to the list of interactive things.
            let interactionTarget = newMember.Model.getObjectByName("Target");
            if (interactionTarget != undefined) {
                this.mainProcess.Interactive.push(interactionTarget);
                // this.mainProcess.Collidable.push(new THREE.Box3().setFromObject(newMember.Model));
                if (collidable)
                    this.mainProcess.Collidable.push(interactionTarget);
            }
        }
        AddMesh(newMember, collidable = false) {
            this.Add(new Entity(newMember), collidable);
        }
    }
    Engine.EntityManager = EntityManager;
    class Entity {
        constructor(model) {
            this._ID = uuidv4();
            this.Health = new HitPoints(this._ID);
            this.Events = new EntityEvents();
            this.Motion = new PersonMotion();
            if (model == undefined) {
                this._Model = new Characters.Person3D();
            }
            else {
                this._Model = model;
                this.Motion.position.copy(model.position);
                this.Motion.rotation.copy(model.rotation);
            }
            this.PositionOffset = new THREE.Vector3(0, -1, 0);
        }
        get Model() {
            return this._Model;
        }
        set Model(value) {
            this._Model = value;
        }
        get ID() {
            return this._ID;
        }
        set ID(value) {
            this._ID = value;
            this.Health.entityReference = value;
            this.Motion.entityReference = value;
        }
        update(delta) {
            if (this.Motion.canMove === true) {
                this._Model.position.copy(this.Motion.position).add(this.PositionOffset);
                this._Model.rotation.copy(this.Motion.rotation);
                this._Model.rotation.y = this.Motion.rotation.y + Math.PI;
                if (this._Model.userData.mixer != undefined) {
                    this._Model.userData.mixer.update(delta);
                }
            }
        }
    }
    Engine.Entity = Entity;
    class EntityEvents {
    }
    Engine.EntityEvents = EntityEvents;
    /**
    * Entity State
    */
    class EntityState {
        constructor() {
            this.isFlying = false;
            this.isGliding = false;
            this.isClimbing = false;
            this.isSlipping = false;
            this.isDashing = false;
            this.chargingDash = false;
        }
    }
    Engine.EntityState = EntityState;
    ;
    /**
    * Entity Permissions/Abilities
    */
    class EntityAbilities {
        constructor() {
            this.gliding = false;
            this.infinityJump = false;
            this.dash = false;
            this.maxJump = 1;
        }
    }
    Engine.EntityAbilities = EntityAbilities;
    ;
    class MotionCollisions {
        constructor() {
            this.front = [];
            this.rear = [];
            this.left = [];
            this.right = [];
            this.top = [];
            this.bottom = [];
        }
    }
    Engine.MotionCollisions = MotionCollisions;
    class MotionRays {
        constructor() {
            this._initDone = false;
            this.rear = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, motionRaycastLengths.rear);
            this.front = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, motionRaycastLengths.front);
            this.left = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, motionRaycastLengths.left);
            this.right = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, motionRaycastLengths.right);
            this.top = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10);
            this.bottom = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0));
            this._debugFront = new THREE.ArrowHelper(this.front.ray.direction, this.front.ray.origin, 1, 0xffff00);
            this._debugRear = new THREE.ArrowHelper(this.rear.ray.direction, this.rear.ray.origin, 1, 0xff0000);
            this._debugLeft = new THREE.ArrowHelper(this.left.ray.direction, this.left.ray.origin, 1, 0xff00ff);
            this._debugRight = new THREE.ArrowHelper(this.right.ray.direction, this.right.ray.origin, 1, 0x00ffff);
            this._debugTop = new THREE.ArrowHelper(this.top.ray.direction, this.top.ray.origin, 1, 0x00ff00);
            this._debugBottom = new THREE.ArrowHelper(this.bottom.ray.direction, this.bottom.ray.origin, 1, 0x0000ff);
        }
        update(main, position, direction) {
            this.bottom.ray.origin.copy(position);
            // this.bottom.ray.origin.y += rayCasterOffset;
            this.top.ray.origin.copy(position);
            this.rear.ray.set(position, direction);
            this.front.ray.set(position, direction.negate());
            this.left.ray.set(position, direction.applyMatrix4(new THREE.Matrix4().makeRotationY((Math.PI / 2))));
            this.right.ray.set(position, direction.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI)));
            main.Scene.remove(this._debugFront);
            // main.Scene.remove(this._debugRear);
            // main.Scene.remove(this._debugLeft);
            // main.Scene.remove(this._debugRight);
            main.Scene.remove(this._debugTop);
            main.Scene.remove(this._debugBottom);
            this._debugFront = new THREE.ArrowHelper(this.front.ray.direction, this.front.ray.origin, motionRaycastLengths.front, 0xff0000);
            this._debugRear = new THREE.ArrowHelper(this.rear.ray.direction, this.rear.ray.origin, motionRaycastLengths.rear, 0xffff00);
            this._debugLeft = new THREE.ArrowHelper(this.left.ray.direction, this.left.ray.origin, motionRaycastLengths.left, 0xff00ff);
            this._debugRight = new THREE.ArrowHelper(this.right.ray.direction, this.right.ray.origin, motionRaycastLengths.right, 0x00ffff);
            this._debugTop = new THREE.ArrowHelper(this.top.ray.direction, this.top.ray.origin, 1, 0x00ff00);
            this._debugBottom = new THREE.ArrowHelper(this.bottom.ray.direction, this.bottom.ray.origin, 1, 0x0000ff);
            main.Scene.add(this._debugFront);
            // main.Scene.add(this._debugRear);
            // main.Scene.add(this._debugLeft);
            // main.Scene.add(this._debugRight);
            main.Scene.add(this._debugTop);
            main.Scene.add(this._debugBottom);
        }
        getCollisions(objects) {
            let cols = new MotionCollisions();
            cols.front = this.front.intersectObjects(objects);
            cols.rear = this.rear.intersectObjects(objects);
            cols.left = this.left.intersectObjects(objects);
            cols.right = this.right.intersectObjects(objects);
            cols.bottom = this.bottom.intersectObjects(objects);
            return cols;
        }
    }
    Engine.MotionRays = MotionRays;
    class Motion extends THREE.Object3D {
        constructor(x = 0, y = 0, z = 0) {
            super();
            this.speed = 0;
            this.collideWall = true;
            this.position.set(x, y, z);
            this._prevPosition = new THREE.Vector3(x, y, z);
            this._rays = new MotionRays();
            this.collisions = new MotionCollisions();
        }
        update(main, delta) {
            var dir = new THREE.Vector3();
            this.getWorldDirection(dir);
            this._prevPosition.copy(this.position);
            this._rays.update(main, this.position, dir);
            this.collisions = this._rays.getCollisions(main.Collidable);
            if (!this.collideWall ||
                this.collisions.front.length == 0 ||
                (this.collisions.front.length > 0 && this.collisions.front[0].distance > this.speed)) {
                this.translateZ(-this.speed * delta);
            }
            if (this.collideWall) {
                if (this.collisions.left.length > 0 && this.collisions.right.length > 0) {
                    this.translateX((this.collisions.left[0].distance - this.collisions.right[0].distance) / 2);
                }
                else if (this.collisions.right.length > 0) {
                    this.translateX(this.collisions.right[0].distance - motionRaycastLengths.right);
                }
                else if (this.collisions.left.length > 0) {
                    this.translateX(motionRaycastLengths.left - this.collisions.left[0].distance);
                }
            }
        }
    }
    Engine.Motion = Motion;
    class PersonMotion extends Motion {
        constructor(x = 0, y = 0, z = 0) {
            super(x, y, z);
            this.airborne = false;
            this.canMove = true;
            this.sprinting = true;
            this.baseSpeed = 50;
            this.direction = new THREE.Vector3();
            this.velocity = new THREE.Vector3(0, 0, 0);
            this.entityReference = "";
            this.jumpCounter = 0;
        }
        fromPerson(person) {
            this.position.copy(person.position);
        }
        face(person) {
            this.rotation.y = Math.atan2(person.Model.position.x - this.position.x, person.Model.position.z - this.position.z) + Math.PI;
        }
        update(main, delta) {
            if (this.canMove) {
                //#region gravity test
                this.velocity.y -= (6 / main.FPS) * delta * 100; // 100.0 = mass
                this.velocity.y = Math.max(this.velocity.y, -128832 / main.FPS); // prevent from accelerating past terminal velocity
                this._rays.bottom.far = Math.max(-this.velocity.y + motionRaycastLengths.bottom, 0.1);
                //#endregion
                super.update(main, delta);
                // const moveForward = main.InputManager.keys.up.down;
                // const moveBackward = main.InputManager.keys.down.down;
                // const moveLeft = main.InputManager.keys.left.down;
                // const moveRight = main.InputManager.keys.right.down;
                // const jumped = main.InputManager.keys.jump.justPressed;
                FloorCollision(this, delta, false, "NPC");
                // Adjust velocity based on collisions
                if (this.collisions.front.length > 0)
                    this.velocity.z = Math.max(0, this.velocity.z);
                if (this.collisions.rear.length > 0)
                    this.velocity.z = Math.min(0, this.velocity.z);
                if (this.collisions.left.length > 0)
                    this.velocity.x = Math.max(0, this.velocity.x);
                if (this.collisions.right.length > 0)
                    this.velocity.x = Math.min(0, this.velocity.x);
                this.translateX(this.velocity.x * delta);
                this.translateZ(this.velocity.z * delta);
            }
        }
    }
    Engine.PersonMotion = PersonMotion;
    /**
    * Keep this to break down for strafing
    */
    class PlayerMotionDeprecated extends Motion {
        constructor() {
            super();
            this.airborne = false;
            this.canMove = true;
            this.sprinting = true;
            this.baseSpeed = 50;
            this.direction = new THREE.Vector3();
            this.velocity = new THREE.Vector3(0, 0, 0);
            this.height = 1;
            this.horizontalSpeed = 0;
        }
        update(main, delta, controls, firstPerson = false) {
            let newDirection = new THREE.Vector3();
            if (this.canMove && controls != undefined) {
                this.rotation.copy(controls.getObject().rotation);
                super.update(main, delta);
                const moveForward = main.InputManager.keys.up.down;
                const moveBackward = main.InputManager.keys.down.down;
                const moveLeft = main.InputManager.keys.left.down;
                const moveRight = main.InputManager.keys.right.down;
                const jumped = main.InputManager.keys.jump.justPressed;
                if (jumped) {
                    this.jump();
                }
                var hits = this.collisions.bottom;
                this.airborne = true;
                // are we above, or at most knee deep in, the platform?
                if ((hits.length > 0)) {
                    var actualHeight = hits[0].distance - this.height * 2 - rayCasterOffset;
                    // var actualHeight = hits[ 0 ].distance;
                    // collision: stick to the surface if landing on it
                    if ((this.velocity.y <= 0) && (actualHeight < this.height)) {
                        this.position.y -= actualHeight;
                        this.position.y = Math.round(this.position.y * 100) / 100;
                        this.velocity.y = 0;
                        this.airborne = false;
                        if (jumped === true) {
                            this.velocity.y = 0.2 * this.baseSpeed;
                        }
                    }
                }
                if (this.airborne === true) {
                    this.velocity.y -= (6 / main.FPS) * delta * 100; // 100.0 = mass
                    this.velocity.y = Math.max(this.velocity.y, -128832 / main.FPS); // prevent from accelerating past terminal velocity
                }
                this.velocity.x -= this.velocity.x * 10.0 * delta;
                this.velocity.z -= this.velocity.z * 10.0 * delta;
                newDirection.y = 0;
                newDirection.z = Number(moveForward) - Number(moveBackward);
                newDirection.x = Number(moveLeft) - Number(moveRight);
                newDirection.normalize(); // this ensures consistent movements in all directions
                // Calculate acceleration and new velocity
                var accelerationModifier = (this.sprinting == true) ? 2 : 1;
                if (moveForward || moveBackward)
                    this.velocity.z -= newDirection.z * this.baseSpeed * delta * accelerationModifier;
                if (moveLeft || moveRight)
                    this.velocity.x -= newDirection.x * this.baseSpeed * delta * accelerationModifier;
                this.velocity.z = Math.round(this.velocity.z * 1000) / 1000;
                this.velocity.x = Math.round(this.velocity.x * 1000) / 1000;
                // #region Rotation test
                if (firstPerson) {
                    this.direction.copy(controls.getObject().rotation.toVector3().normalize());
                }
                else if (this.horizontalSpeed > 0.2) {
                    this.direction.y = Math.atan2(newDirection.x, newDirection.z);
                }
                //#endregion
                // Adjust velocity based on collisions
                if (this.collisions.rear.length > 0)
                    this.velocity.z = Math.max(0, this.velocity.z);
                if (this.collisions.front.length > 0)
                    this.velocity.z = Math.min(0, this.velocity.z);
                if (this.collisions.right.length > 0)
                    this.velocity.x = Math.max(0, this.velocity.x);
                if (this.collisions.left.length > 0)
                    this.velocity.x = Math.min(0, this.velocity.x);
                this.horizontalSpeed = Math.abs(this.velocity.x) + Math.abs(this.velocity.z);
                this.translateX(this.velocity.x * delta);
                this.translateY(this.velocity.y * delta);
                this.translateZ(this.velocity.z * delta);
                controls.getObject().position.copy(this.position);
            }
        }
        jump() {
            if (this.airborne === false)
                this.velocity.y = 0.2 * this.baseSpeed;
            this.airborne = true;
        }
    }
    function round(value, factor = 100) {
        return Math.round(value * factor) / factor;
    }
    function FloorCollision(motion, delta, jumped = false, name = "Player") {
        var hits = motion.collisions.bottom;
        motion.airborne = true;
        // are we above, or at most knee deep in, the platform?
        if ((hits.length > 0)) {
            var actualHeight = round(hits[0].distance, 1000000);
            // collision: stick to the surface if landing on it
            if ((motion.velocity.y <= 0)) {
                // if (name == "Player") {
                // 	console.log(name + ": bottom ray far: " + motion._rays.bottom.far);
                // 	console.log(name + ": Collision Distance: " + actualHeight + ", Initial position.y: " + motion.position.y);
                // 	console.log(name + ": Estimated collision Y: " + (motion.position.y + actualHeight));
                // }
                motion.position.y -= round((actualHeight - motionRaycastLengths.bottom), 1000000);
                motion.position.y = round(motion.position.y, 1000000);
                // console.log(name + ": Final position.y: " + motion.position.y);
                motion.velocity.y = 0;
                motion.airborne = false;
                motion.jumpCounter = 0;
            }
        }
        motion.translateY(motion.velocity.y * delta);
        motion.position.y = round(motion.position.y, 1000000);
    }
    function ApplyGravity(motion, delta, mass = 100) {
        // acceleration due to gravity
        const adg = 1.96; // 9.80665 meters per second
        // terminal velocity
        const tv = 39; // 195 km/h according to https://en.wikipedia.org/wiki/Terminal_velocity#Examples
        // motion.velocity.y -= adg * mass;
        motion.velocity.y -= adg;
        motion.velocity.y = round(Math.max(motion.velocity.y, -tv), 1000000); // prevent from accelerating past terminal velocity
    }
    /**
    * Default object for land-based player physics
    */
    class PlayerMotion extends Motion {
        constructor() {
            super();
            this.airborne = false;
            this.canMove = true;
            this.sprinting = true;
            this.baseSpeed = 50;
            this.direction = new THREE.Vector3();
            this.velocity = new THREE.Vector3(0, 0, 0);
            this.horizontalSpeed = 0;
            this.jumpCounter = 0;
            this.abilities = new EntityAbilities();
            this.abilities.maxJump = 3;
        }
        update(main, delta, controls, firstPerson = false) {
            let newDirection = new THREE.Vector3();
            if (this.canMove && controls != undefined) {
                const moveForward = main.InputManager.keys.up.down;
                const moveBackward = main.InputManager.keys.down.down;
                const moveLeft = main.InputManager.keys.left.down;
                const moveRight = main.InputManager.keys.right.down;
                newDirection.y = 0;
                newDirection.z = Number(moveForward) - Number(moveBackward);
                newDirection.x = Number(moveLeft) - Number(moveRight);
                newDirection.normalize(); // this ensures consistent movements in all directions
                let dir = new THREE.Vector3();
                controls.Camera.getWorldDirection(dir).negate();
                this.speed = 0;
                newDirection.y = 0;
                if (Math.abs(newDirection.z) + Math.abs(newDirection.x) > 0.2) {
                    //#region Mario64 style test
                    dir.y = 0;
                    let desired_rot = Math.atan2(newDirection.x, newDirection.z) + Math.atan2(dir.x, dir.z);
                    let desired_dir = new THREE.Vector3(Math.sin(desired_rot), 0, Math.cos(desired_rot)).normalize();
                    let new_ratio = 30 / main.FPS;
                    let old_ratio = 1.0 - new_ratio;
                    let new_dir = (this.direction.multiplyScalar(old_ratio)).add(desired_dir.multiplyScalar(new_ratio));
                    this.direction.copy(new_dir.normalize());
                    this.rotation.y = Math.atan2(this.direction.x, this.direction.z);
                    //#endregion
                    // this.rotation.y = Math.atan2(newDirection.x, newDirection.z) + Math.atan2(dir.x, dir.z);
                    this.speed = main.InputManager.keys.sprint.down ? 20 : 10;
                }
                //#region gravity test
                // this.velocity.y -= (6/main.FPS) * delta * 100; // 100.0 = mass
                // this.velocity.y = Math.max(this.velocity.y, -128832 / main.FPS); // prevent from accelerating past terminal velocity
                ApplyGravity(this, delta);
                this._rays.bottom.far = Math.max((-this.velocity.y * delta) + motionRaycastLengths.bottom, 0.1);
                //#endregion
                super.update(main, delta);
                const jumped = main.InputManager.keys.jump.justPressed;
                if (jumped) {
                    this.jump();
                }
                FloorCollision(this, delta, jumped, "Player");
                this.velocity.x -= this.velocity.x * 10.0 * delta;
                this.velocity.z -= this.velocity.z * 10.0 * delta;
                // Calculate acceleration and new velocity
                var accelerationModifier = (this.sprinting == true) ? 2 : 1;
                if (moveForward || moveBackward || moveLeft || moveRight)
                    this.velocity.z -= this.baseSpeed * delta * accelerationModifier;
                this.velocity.z = Math.round(this.velocity.z * 1000) / 1000;
                this.velocity.x = 0;
                // Adjust velocity based on collisions
                if (this.collisions.rear.length > 0)
                    this.velocity.z = Math.max(0, this.velocity.z);
                if (this.collisions.front.length > 0)
                    this.velocity.z = Math.min(0, this.velocity.z);
                // if (this.collisions.right.length > 0) this.velocity.x = Math.max( 0, this.velocity.x );
                // if (this.collisions.left.length > 0) this.velocity.x = Math.min(0, this.velocity.x);
                this.horizontalSpeed = Math.abs(this.velocity.x) + Math.abs(this.velocity.z);
                // this.translateX( this.velocity.x * delta );
                // this.translateZ( this.velocity.z * delta );
                controls.getObject().position.copy(this.position);
            }
        }
        jump() {
            if (this.airborne)
                this.jumpCounter = Math.max(this.jumpCounter, 1);
            if (this.jumpCounter < this.abilities.maxJump) {
                // If this entity is already airborne, only air jumps are allowed.
                // if (this.airborne === false)
                // {
                this.velocity.y = 0.3 * this.baseSpeed;
                this.jumpCounter++;
                // }
                this.airborne = true;
            }
        }
    }
    Engine.PlayerMotion = PlayerMotion;
    class Controls {
        constructor(camera, main) {
            this.firstPerson = true;
            this._zoom = 5;
            this._zoomMax = 10;
            this._zoomMin = 0.2;
            this.Camera = camera;
            this.PointerControls = new PointerLockControls(this.Camera, main.renderer.domElement);
            this.mainProcess = main;
            this.InputManager = main.InputManager;
        }
        getObject() {
            return this.PointerControls.getObject();
        }
        lock() {
            this.PointerControls.lock();
        }
        get isLocked() {
            return this.PointerControls.isLocked;
        }
        zoom(mod) {
            this._zoom += mod;
            this._zoom = Math.max(Math.min(this._zoom, this._zoomMax), this._zoomMin);
        }
    }
    Engine.Controls = Controls;
    class ShipControls extends Controls {
        constructor(camera, main) {
            super(camera, main);
            this.firstPerson = true;
            this.speed = 50;
            this.mesh = new THREE.Object3D();
            this.motion = new Motion();
            this.interactRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0.1, 5);
        }
        getCollisions(delta) {
            this.motion.update(this.mainProcess, delta);
            this.getObject().position.copy(this.motion.position);
            this.mesh.position.set(this.motion.position.x, this.motion.position.y, this.motion.position.z);
            this.mesh.rotation.y = this.motion.rotation.y;
        }
        getInteractions() {
            var interactIntersections = this.interactRaycaster.intersectObjects(this.mainProcess.Interactive);
            let hud = this.mainProcess.HUD;
            if (interactIntersections.length > 0) {
                hud.reticle.target(Attitude.Hostile);
                hud.reticle.label = interactIntersections[0].object.parent.name;
            }
            else {
                hud.reticle.label = "";
                hud.reticle.target(undefined);
            }
            var thing = this.getObject().position;
            $("#debug").html(`
				<div>Location: ${thing.x}, Y: ${thing.y}, Z: ${thing.z}</div>
			`);
        }
        updateRaycasters(delta) {
            this.motion.getWorldDirection(new THREE.Vector3()).negate();
            var pos = this.motion.position;
            var interactRay = new THREE.Vector3();
            this.Camera.getWorldDirection(interactRay);
            this.interactRaycaster.ray.set(pos, interactRay);
            let moveDir = this.InputManager.getMovementDirection();
            if (moveDir.x != 0 || moveDir.y != 0 || moveDir.z != 0) {
                this.motion.rotation.copy(this.getObject().rotation);
                this.motion.rotation.y += Math.atan2(moveDir.x, moveDir.z);
                this.motion.speed = this.speed;
            }
            else {
                this.motion.speed = 0;
            }
            if (this.InputManager.keys.ascend.down) {
                this.motion.translateY(10 * delta);
            }
            else if (this.InputManager.keys.descend.down) {
                this.motion.translateY(-10 * delta);
            }
        }
        update(delta) {
            this.updateRaycasters(delta);
            this.getCollisions(delta);
            this.getInteractions();
        }
    }
    Engine.ShipControls = ShipControls;
    class PlayerControls extends Controls {
        constructor(camera, main) {
            super(camera, main);
            this.height = 0.50;
            this.firstPerson = true;
            this.mesh = new Characters.Person3D();
            this.motion = new PlayerMotion();
            this.aimRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0.1, 50);
        }
        getCollisions(delta) {
            this.motion.update(this.mainProcess, delta, this, this.firstPerson);
            if (this.motion.canMove === true) {
                if (!this.firstPerson) {
                    if (this.motion.horizontalSpeed > 0.2) {
                        this.mesh.animation = "Walk";
                        this.mesh.userData.mixer.timeScale = 2 * this.motion.horizontalSpeed;
                    }
                    else {
                        this.mesh.animation = "Stand";
                        if (this.motion.horizontalSpeed < 0.1) {
                            this.motion.velocity.x = 0;
                            this.motion.velocity.z = 0;
                        }
                        this.mesh.userData.mixer.timeScale = 2;
                    }
                }
            }
        }
        getInteractions() {
            var aimIntersections = this.aimRaycaster.intersectObjects(this.mainProcess.Interactive);
            let hud = this.mainProcess.HUD;
            if (aimIntersections.length > 0) {
                let ent = this.mainProcess.Entities.GetByModelID(aimIntersections[0].object.parent?.uuid);
                if (ent != undefined) {
                    hud.reticle.target(Attitude.Hostile);
                    if (this.InputManager.keys.talk.down == true) {
                        this.InputManager.keys.talk.down = false;
                        if (aimIntersections[0].distance <= 5) {
                            let self = this;
                            this.motion.canMove = false;
                            speak(Dialog.getDialog(ent.Model.name), 0, function () {
                                self.motion.canMove = true;
                            }, ent);
                        }
                    }
                    else if (this.InputManager.keys.magic.down == true) {
                        this.InputManager.keys.magic.down = false;
                        ent.Model.gender = $("#spell-parameters select[index=1]").val();
                        ent.Model.setHair(randomize(["Loose_Pony", "Floppy", "Warhawk", "Pixie_Cut"]), ent.Model.userData.hairColor || 0x000000);
                    }
                    else if (this.InputManager.keys.gun.down == true) {
                        this.InputManager.keys.gun.down = false;
                        ent.Health.damage(10);
                    }
                    if (aimIntersections[0].distance <= 5) {
                        let hp = ent.Health;
                        let targetName = ent.Model.name;
                        hud.reticle.label = hp != undefined ? `${targetName} ${hp.currentHP}/${hp.maxHP}` : targetName;
                    }
                    else {
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
				<div>Current Draw call count: ${main.renderer.info.render.calls}</div>
			`);
        }
        updateRaycasters() {
            // this.motion.getWorldDirection(new THREE.Vector3()).negate();
            var aimRay = new THREE.Vector3();
            this.Camera.getWorldDirection(aimRay);
            this.aimRaycaster.ray.set(this.motion.position, aimRay);
            this.aimRaycaster.ray.origin.y += this.height;
        }
        update(delta) {
            this.updateRaycasters();
            this.getCollisions(delta);
            this.getInteractions();
        }
    }
    Engine.PlayerControls = PlayerControls;
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})(Engine || (Engine = {}));
//# sourceMappingURL=game-engine.js.map