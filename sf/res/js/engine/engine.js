import * as THREE from '../../../../node_modules/three/src/Three.js';
import { OutlineEffect } from '../../../../node_modules/three/examples/jsm/effects/OutlineEffect.js';
import { FOUR } from './../four.js';
import { Sky } from './../sky.js';
import { HUD } from './hud/hud.js';
import { Stage } from './stage.js';
import { PlayerControls } from './controls/playercontrols.js';
import { ShipControls } from './controls/shipcontrols.js';
import { Entity } from './entity/entity.js';
import { InputManager } from './inputmanager.js';
export { PlayerControls } from './controls/playercontrols.js';
export { Entity } from './entity/entity.js';
export { Stage } from './stage.js';
export { Inventory, InventorySlot } from './../engine/inventory.js';
export var main;
export function Initialize(controlsType) {
    main = new Main(controlsType);
    return main;
}
/**
* Indicates one entity's disposition towards another.
*/
export var Attitude;
(function (Attitude) {
    Attitude[Attitude["Hostile"] = 0] = "Hostile";
    Attitude[Attitude["Unfriendly"] = 1] = "Unfriendly";
    Attitude[Attitude["Indifferent"] = 2] = "Indifferent";
    Attitude[Attitude["Friendly"] = 3] = "Friendly";
    Attitude[Attitude["Helpful"] = 4] = "Helpful";
})(Attitude || (Attitude = {}));
export var ControlTypes;
(function (ControlTypes) {
    ControlTypes["Human"] = "Human";
    ControlTypes["Ship"] = "Ship";
    ControlTypes["Viewer"] = "Viewer";
})(ControlTypes || (ControlTypes = {}));
/**
* Manages HitPoints objects in the scene.
*/
export class HealthManager {
    constructor() {
        this.members = [];
    }
    update(main) {
        this.members.forEach(hp => {
            if (hp.changed == true) {
                hp.changed = false;
                let ent = main.Entities.GetByEntityID(hp.entityReference);
                if (ent?.Events.HealthChanged != undefined)
                    ent.Events.HealthChanged();
                if (hp.justDied == true) {
                    hp.justDied = false;
                    if (ent?.Events.Died != undefined)
                        ent.Events.Died();
                }
            }
        });
    }
    clear() {
        this.members = [];
    }
}
/**
* This tracks and manages HP for an entity.
*/
export class HitPoints {
    /**
    * @param id - the ID of the entity whose HP is represented by this object
    * @param max - the maximum HP of the entity
    */
    constructor(id, max = 20) {
        this.dead = false;
        this.justDied = false;
        this.justResurrected = false;
        this.changed = false;
        this.entityReference = id;
        this.maxHP = max;
        this.currentHP = max;
    }
    /**
     * Harms the entity.
     * @param damageAmount - the amount of damage taken by the entity.
    */
    damage(damageAmount) {
        let initialHP = this.currentHP;
        damageAmount = damageAmount || 1;
        this.currentHP -= damageAmount;
        this.changed = true;
        if (this.currentHP <= 0 && initialHP > 0) {
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
        this.changed = true;
    }
}
/**
* The settings for the main process for the engine.
*/
export class EngineSettings {
    constructor() {
        this.hideCompass = false;
    }
}
/**
* The main process for the engine.
*/
export class Main {
    constructor(controlsType = ControlTypes.Human) {
        this.FPS = 40;
        this.Interactive = [];
        this.Collidable = [];
        this.Stages = [];
        this.onRenderFcts = [];
        this.Motions = [];
        this._paused = false;
        this.Settings = new EngineSettings();
        this.HUD = new HUD();
        $("body").append(this.HUD.html);
        this._viewerElement = document.getElementById('container');
        this.renderer = FOUR.Renderer(this._viewerElement);
        this._pauseBlocker = $(`<div id="pause-blocker" style="position:absolute; top:0; left:0; z-index:9; height:100%; width:100%; display: none; background:black;">

				<div id="instructions" style="width:100%; height:100%; text-align: center; -webkit-box-align: center; -moz-box-align: center; box-align: center; color:white;">
					<span style="font-size:40px">-PAUSED-</span>
					<br>
					(W,A,S,D = Move, SPACE = Jump, MOUSE = Look, CLICK = Shoot)
				</div>

			</div>
		`)[0];
        this._viewerElement.appendChild(this._pauseBlocker);
        this.HealthManager = new HealthManager();
        this.Entities = new EntityManager(this);
        this.Timer = new Timer();
        this.InputManager = new InputManager();
        this.FPS = 60;
        this._effect = new OutlineEffect(this.renderer, {
            defaultThickness: 0.001,
            defaultColor: [0, 0, 0],
            defaultAlpha: 0.8,
            defaultKeepAlive: true
        });
        this.DebugHelper = new EngineDebug(this);
        let target = this;
        //#region cannonJS test
        this.world = new CANNON.World();
        // this.world.gravity.set(0, -9.82, 0); // m/s²
        this.world.gravity.set(0, -20, 0); // m/s² in this engine, 1 refers to five feet, not 1 meter
        this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
        this.world.defaultContactMaterial.contactEquationRelaxation = 4;
        this.world.default_dt = 1;
        this.world.defaultContactMaterial.restitution = 0;
        // this.world.broadphase = new CANNON.GridBroadphase(new CANNON.Vec3(-100, -100, -100), new CANNON.Vec3(100, 100, 100), 10, 10, 10);
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.broadphase.useBoundingBoxes = true;
        var fixedTimeStep = 1.0 / 60.0; // seconds
        var maxSubSteps = 3;
        var lastTime;
        (function simloop(time = 0) {
            requestAnimationFrame(simloop);
            if (!target._paused) {
                if (lastTime !== undefined) {
                    var dt = (time - lastTime) / 1000;
                    target.world.step(fixedTimeStep, dt, maxSubSteps);
                }
                lastTime = time;
            }
        })();
        //#endregion
        this.start();
        // #region InputManagerSetup
        if (controlsType !== ControlTypes.Viewer) {
            this.renderer.domElement.addEventListener('click', function () {
                target.Controls.lock();
            }, false);
        }
        var onMouseWheel = function (event) {
            target.Controls.zoom(event.deltaY * 0.005);
        };
        document.addEventListener('wheel', onMouseWheel, false);
        //#endregion
    }
    /** The core update method for the game loop. */
    update() {
        let target = this;
        if (this.Controls.isLocked === true) {
            // want to move this here, but jump doesn't work when that happens
            // this.processInput();
            let delta = this.Timer.delta;
            this.updateGameLogic(delta);
            // jumping works properly when this is active
            this.processInput();
            this.render();
        }
        // queues up the next frame
        setTimeout(() => requestAnimationFrame(target.update.bind(target)), 1000 / target.FPS);
        // requestAnimationFrame(target.update.bind(target));
    }
    processInput() {
        if (this.InputManager.keys.changeView.justPressed) {
            this.Controls.toggleView();
        }
        this.InputManager.update();
    }
    /** Render to the screen */
    render() {
        this.HUD.update(this);
        this.renderer.render(this.Scene, this.Controls.Camera);
        // this._effect.render( this.Scene, this.Controls.Camera );
    }
    updateGameLogic(delta) {
        this.Controls.update(delta);
        if (this.InputManager.keys.pause.justPressed) {
            !this._paused ? this.pause() : this.unpause();
        }
        if (!this._paused) {
            let target = this;
            this.Motions.forEach(function (motion) {
                motion.update(target, delta);
            });
            this.Entities.members.forEach(function (node) {
                node.update(delta);
            });
            this.DebugHelper.update();
            this.HealthManager.update(this);
            this.Sky.update(this.Controls.getObject());
            this.onRenderFcts.forEach(function (onRenderFct) {
                onRenderFct(delta, target.Timer.prevTime / 1000);
            });
        }
    }
    /**
     * Starts (or restarts) this engine instance
     * @param controlsType
     */
    start(controlsType = ControlTypes.Human) {
        this.Interactive = [];
        this.Collidable = [];
        this.onRenderFcts = [];
        this.Motions = [];
        this.DebugHelper.clear();
        this.MainStage = new Stage(this);
        this.Scene = new THREE.Scene();
        this.Scene.add(this.MainStage);
        this.Scene.background = new THREE.Color(0x11aaff);
        this.Camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
        this.Camera.up.set(0, 1, 0);
        this.Camera.position.set(0, 0.5, 0);
        if (controlsType == ControlTypes.Ship) {
            this.Controls = new ShipControls(this.Camera, this);
        }
        else {
            this.Controls = new PlayerControls(this.Camera, this);
            this.Controls.motion.attachPhysics();
        }
        this.Scene.add(this.Controls.getObject());
        this.Sky = new Sky(this);
        this.Scene.add(this.Sky);
    }
    pause() {
        this._paused = true;
        this._pauseBlocker.style.display = "block";
    }
    unpause() {
        this._paused = false;
        this._pauseBlocker.style.display = "none";
    }
}
/** A debug helper meant to be attached to an instance of Main. */
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
    /**
     * Empties the collection and removes any tracked items from the current scene.
     */
    clear() {
        let target = this;
        this.BoxHelpers.forEach(helper => {
            target.Engine.Scene.remove(helper);
        });
        this.BoxHelpers = [];
    }
}
/** Used to measure the elapsed time in-engine. */
class Timer {
    constructor() {
        this.prevTime = performance.now();
    }
    /** The time elapsed since last measurement. */
    get delta() {
        var time = performance.now();
        var del = Math.min((time - this.prevTime) / 1000, 1 / 20);
        this.prevTime = time;
        return del;
    }
}
export class EntityManager {
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
            if (collidable)
                this.mainProcess.Collidable.push(interactionTarget);
        }
    }
    AddMesh(newMember, collidable = false) {
        this.Add(new Entity(newMember), collidable);
    }
}
export class GameState {
}
//# sourceMappingURL=engine.js.map