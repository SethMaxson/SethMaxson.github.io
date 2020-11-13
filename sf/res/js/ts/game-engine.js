"use strict";
var main;
$(document).ready(function () {
    main = new Main();
});
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
        addKey(81, 'changeView'); // q
        addKey(71, 'gun'); // g
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
}
class Main {
    constructor() {
        this.Light = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 3.4);
        this.FPS = 40;
        this.Light = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 3.4);
        this.FPS = 40;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.sortObjects = true;
        this.renderer.shadowMap.enabled = true;
        // @ts-ignore
        this.renderer.shadowMap.shadowSide = THREE.CullFaceFrontBack;
        // renderer.shadowMap.type = THREE.BasicShadowMap;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('container').appendChild(this.renderer.domElement);
        this.renderer.setSize(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
        this.renderer.gammaFactor = 2.2;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.toneMapping = THREE.Uncharted2ToneMapping;
    }
}
class HitPoints {
    constructor(max = 20) {
        this.dead = false;
        this.maxHP = max;
        this.currentHP = max;
    }
    damage(damageAmount) {
        damageAmount = damageAmount || 1;
        this.currentHP -= damageAmount;
        if (this.currentHP <= 0) {
            this.dead = true;
            this.currentHP = 0;
        }
    }
    heal(healAmount) {
        healAmount = healAmount || 1;
        this.currentHP += healAmount;
        this.currentHP = Math.min(this.currentHP, this.maxHP);
        this.dead = false;
    }
}
class CharacterModel {
    constructor() {
        this.model = {};
        this._animation = "";
    }
    get animation() {
        return this._animation;
    }
    set animation(clipName) {
        if (this._animation != clipName) {
            this._animation = clipName;
            this.model.userData.mixer.stopAllAction();
            var clip = THREE.AnimationClip.findByName(this.model.animations, clipName);
            this.model.userData.mixer.clipAction(clip).play();
        }
    }
    set texture(textureURL) {
        textureURL = textureURL || "/res/models/Advanced/skin_adventurerAlt.png";
        var texture = new THREE.TextureLoader().load(textureURL);
        texture.flipY = false;
        this.model.traverse(function (node0) {
            var node = node0;
            if (node.material && node.name == "Torso") {
                // @ts-ignore
                node.material = FOUR.Material({
                    map: texture,
                    shininess: 0,
                    morphTargets: true,
                    skinning: true
                });
                node.castShadow = true;
                node.receiveShadow = true;
                // @ts-ignore
                node.material.needsUpdate = true;
            }
        });
    }
}
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
class Motion extends THREE.Object3D {
    constructor() {
        super();
        this.airborne = false;
        this.canMove = true;
        this.sprinting = true;
        this.baseSpeed = 50;
        this.direction = new THREE.Vector3();
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.height = 1;
        this._rays = {
            front: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 1),
            rear: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 1),
            left: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 1),
            right: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 1),
            top: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10),
            bottom: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0))
        };
        this._rays = {
            front: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 1),
            rear: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 1),
            left: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 1),
            right: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 1),
            top: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10),
            bottom: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0))
        };
        this.collisions = new MotionCollisions();
    }
    update(camera, controls, objects, delta, fps) {
        var dir = new THREE.Vector3();
        this.getWorldDirection(dir).negate();
        var pos = this.position;
        this.rotation.copy(controls.getObject().rotation);
        this._rays.bottom.ray.origin.copy(pos);
        this._rays.front.ray.set(pos, dir);
        this._rays.rear.ray.set(pos, dir.negate());
        this._rays.left.ray.set(pos, dir.applyMatrix4(new THREE.Matrix4().makeRotationY(-(Math.PI / 2))));
        this._rays.right.ray.set(pos, dir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI)));
        this.collisions.front = this._rays.front.intersectObjects(objects);
        this.collisions.rear = this._rays.rear.intersectObjects(objects);
        this.collisions.left = this._rays.left.intersectObjects(objects);
        this.collisions.right = this._rays.right.intersectObjects(objects);
        this.collisions.bottom = this._rays.bottom.intersectObjects(objects);
        if (this.canMove) {
            const moveForward = inputManager.keys.up.down;
            const moveBackward = inputManager.keys.down.down;
            const moveLeft = inputManager.keys.left.down;
            const moveRight = inputManager.keys.right.down;
            const jumped = inputManager.keys.jump.justPressed;
            if (jumped) {
                this.jump();
            }
            var hits = this.collisions.bottom;
            this.airborne = true;
            // are we above, or at most knee deep in, the platform?
            if ((hits.length > 0)) {
                var actualHeight = hits[0].distance - this.height * 2;
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
                this.velocity.y -= (6 / fps) * delta * 100; // 100.0 = mass
                this.velocity.y = Math.max(this.velocity.y, -128832 / fps); // prevent from accelerating past terminal velocity
            }
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.direction.z = Number(moveForward) - Number(moveBackward);
            this.direction.x = Number(moveLeft) - Number(moveRight);
            this.direction.normalize(); // this ensures consistent movements in all directions
            // Calculate acceleration and new velocity
            var accelerationModifier = (this.sprinting == true) ? 2 : 1;
            if (moveForward || moveBackward)
                this.velocity.z -= this.direction.z * this.baseSpeed * delta * accelerationModifier;
            if (moveLeft || moveRight)
                this.velocity.x -= this.direction.x * this.baseSpeed * delta * accelerationModifier;
            this.velocity.z = Math.round(this.velocity.z * 1000) / 1000;
            this.velocity.x = Math.round(this.velocity.x * 1000) / 1000;
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
            this.translateY(this.velocity.y * delta);
            this.translateZ(this.velocity.z * delta);
            controls.getObject().position.set(this.position.x, this.position.y, this.position.z);
        }
    }
    jump() {
        if (this.airborne === false)
            this.velocity.y = 0.2 * this.baseSpeed;
        this.airborne = true;
    }
}
class PlayerControls {
    constructor() {
        this.motion = new Motion();
        this.height = 0.50;
        this.firstPerson = true;
        this._zoom = 5;
        this.characterModel = new CharacterModel();
        this.motion = new Motion();
        this.motion.height = this.height;
        this.interactRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0.1, 5);
        this.aimRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0.1, 50);
    }
    getCollisions(camera, controls, objects, delta, fps) {
        this.motion.update(camera, controls, objects, delta, fps);
        if (this.motion.canMove === true) {
            this.characterModel.model.position.set(this.motion.position.x, this.motion.position.y - 1, this.motion.position.z);
            if (this.firstPerson) {
                this.characterModel.model.rotation.y = this.motion.rotation.y + Math.PI;
            }
            else if (Math.abs(this.motion.velocity.x) + Math.abs(this.motion.velocity.z) > 0.2) {
                this.characterModel.model.rotation.y = Math.atan2(this.motion.velocity.x, this.motion.velocity.z) + this.motion.rotation.y;
                this.characterModel.animation = "Walk";
            }
            else {
                this.characterModel.animation = "Stand";
                if (Math.abs(this.motion.velocity.x) + Math.abs(this.motion.velocity.z) < 0.1) {
                    this.motion.velocity.x = 0;
                    this.motion.velocity.z = 0;
                }
            }
        }
    }
    getInteractions(camera, controls, interactive) {
        this.updateRaycasters(camera);
        var interactIntersections = this.interactRaycaster.intersectObjects(interactive);
        var aimIntersections = this.aimRaycaster.intersectObjects(interactive);
        if (aimIntersections.length > 0) {
            $("#reticle").addClass("enemy");
            if (inputManager.keys.talk.down == true) {
                inputManager.keys.talk.down = false;
                if (interactIntersections.length > 0) {
                    var self = this;
                    this.motion.canMove = false;
                    // @ts-ignore
                    speak(getDialog(interactIntersections[0].object.parent.name), 0, function () {
                        self.motion.canMove = true;
                    });
                    // setGender(interactIntersections[0].object.parent, "f");
                }
            }
            else if (inputManager.keys.magic.down == true) {
                inputManager.keys.talk.down = false;
                // @ts-ignore
                setGender(aimIntersections[0].object.parent, $("#spell-parameters select[index=1]").val());
            }
            if (interactIntersections.length > 0) {
                // @ts-ignore
                $("#target-label").text(interactIntersections[0].object.parent.name);
                // var vector = new THREE.Vector3();
                // vector.setFromMatrixPosition( this.motion.matrixWorld );
                // vector.y +=0.2;
                // var skull = interactIntersections[0].object.parent.getObjectByName("Skeleton_skull");
                // if (skull.position.angleTo(skull.worldToLocal(vector)) < Math.PI/2) {
                // 	skull.lookAt(vector);
                // }
            }
            else {
                $("#target-label").text("");
                // $(".charLabel").text("Current Draw call count: " + renderer.info.render.calls);
            }
        }
        else {
            $("#target-label").text("");
            $("#reticle").removeAttr("class");
        }
        var thing = controls.getObject().position;
        var thing2 = this.motion.position;
        $("#debug").html(`
			<div>Controls X: ${thing.x}, Y: ${thing.y}, Z: ${thing.z}</div>
			<div>Motion X: ${thing2.x}, Y: ${thing2.y}, Z: ${thing2.z}</div>
		`);
    }
    updateRaycasters(camera) {
        var dir = new THREE.Vector3();
        this.motion.getWorldDirection(dir).negate();
        var pos = this.motion.position;
        var interactRay = new THREE.Vector3();
        camera.getWorldDirection(interactRay);
        this.interactRaycaster.ray.set(pos, interactRay);
        this.aimRaycaster.ray.set(pos, interactRay);
        this.interactRaycaster.ray.origin.y += this.height;
        this.aimRaycaster.ray.origin.y += this.height;
    }
    zoom(mod) {
        this._zoom += mod;
        this._zoom = Math.max(Math.min(this._zoom, 10), 0.2);
    }
}
//# sourceMappingURL=game-engine.js.map