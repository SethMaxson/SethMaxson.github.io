import * as THREE from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from '../../../node_modules/three/examples/jsm/utils/SkeletonUtils.js';
import { FOUR } from './four.js';
import { PersonPhysicalFeature } from './characters/PersonPhysicalFeature.js';
import { Hair } from './characters/Hair.js';
import { Person } from './characters/Person.js';
export var CharactersModular;
(function (CharactersModular) {
    const useMorphTargets = true;
    $(document).ready(function () {
        new THREE.TextureLoader().load("/res/models/Advanced/gradient.png", function (texture) {
            FOUR.Gradient = texture;
            FOUR.Gradient.minFilter = THREE.LinearFilter;
            FOUR.Gradient.magFilter = THREE.LinearFilter;
            FOUR.Gradient.flipY = false;
        });
    });
    // Mesh variables
    var baseMeshes = {
        Human: new THREE.Object3D(),
        Hair: new THREE.Object3D(),
        Torso: new THREE.Object3D(),
        Item: new THREE.Object3D()
    };
    var pcData;
    // List Variables
    CharactersModular.hairOptions = [];
    CharactersModular.bodyPartOptions = {
        arms: [],
        hands: [],
        legs: [],
        torso: [],
        head: []
    };
    class EquipmentModel {
        constructor() {
            this.style = "";
            this.color = 0x000000;
            this.relative = false;
        }
    }
    CharactersModular.EquipmentModel = EquipmentModel;
    class Gear {
        constructor(rightHand = 0, leftHand = 0, back = 0, race) {
            this.righthand = 0;
            this.lefthand = 0;
            this.back = 0;
            this.righthand = rightHand;
            this.lefthand = leftHand;
            this.back = back;
            switch (race) {
                case "aarakocra":
                    this.righthand = this.righthand || 0;
                    this.lefthand = this.lefthand || 3;
                    this.back = this.back || 5;
                    break;
                case "elf":
                    this.righthand = this.righthand || 8;
                    this.lefthand = this.lefthand || 0;
                    this.back = this.back || 0;
                    break;
                default:
                    this.righthand = this.righthand || 0;
                    this.lefthand = this.lefthand || 0;
                    this.back = this.back || 0;
                    break;
            }
            this.righthand = this.righthand || 0;
            this.lefthand = this.lefthand || 0;
            this.back = this.back || 0;
        }
    }
    CharactersModular.Gear = Gear;
    class Person3D extends THREE.Mesh {
        constructor(geometry, material) {
            super(geometry, material);
            this.animations = [];
            this.personId = "";
            this._animation = "";
        }
        get animation() {
            return this._animation;
        }
        set animation(clipName) {
            if (this.userData.mixer && this._animation != clipName) {
                this._animation = clipName;
                this.userData.mixer.stopAllAction();
                var clip = THREE.AnimationClip.findByName(this.animations, clipName);
                this.userData.mixer.clipAction(clip).play();
            }
        }
        get gender() {
            return this.userData.gender;
        }
        set gender(newGender) {
            if (this.userData.gender != newGender && (newGender == 'm' || newGender == 'f')) {
                var charBase = new Person(this.name, this.userData.race, this.userData.texture, newGender, this.userData.hairStyle, this.userData.hairColor, this.userData.beard, undefined, this.userData.weight, this.userData.themecolor, this.userData.type);
                updateHumanoid(this, charBase);
            }
        }
        toggleGender() {
            var gender = this.userData.gender == 'f' ? 'm' : 'f';
            this.gender = gender;
        }
        setHair(hairStyle, hairColor) {
            hairStyle = hairStyle || this.userData.hairStyle || randomize(["Floppy_Pony", "Floppy", "Warhawk", "Pixie_Cut"]);
            hairColor = hairColor || this.userData.hairColor || randomize([0xff0000, 0xffffff, 0x00ff00, 0x0000ff, 0xff00ff]);
            removeFromBone(this, "hatHolder", "hair");
            this.userData.hairStyle = [new Hair(hairStyle, hairColor)];
            var hair = getHair(1, this.userData.hairStyle[0]);
            hair.name = "hair";
            this.userData.hairColor = hairColor;
            var hatrack = this.hatHolder;
            hatrack.add(hair);
        }
        setRace(race) {
            race = race || randomize(races);
            var charBase = new Person(this.name, race, undefined, this.userData.gender, this.userData.hairStyle, this.userData.hairColor, this.userData.beard, undefined, this.userData.weight, this.userData.themecolor, this.userData.type);
            updateHumanoid(this, charBase);
        }
        setMorphTargets(personInfo) {
            let node = this.mesh;
            if (useMorphTargets && node.morphTargetInfluences && node.morphTargetDictionary) {
                this.updateMorphTarget("LadyChest", personInfo.ladychest);
                this.updateMorphTarget("Weight", personInfo.weight);
                this.updateMorphTarget("Caboose", personInfo.caboose);
                this.updateMorphTarget("Waist", Math.min(personInfo.caboose * 0.7, 1));
                this.updateMorphTarget("Pants", personInfo.pants);
                this.updateMorphTarget("Chin_Height", 1);
                // node.morphTargetInfluences[node.morphTargetDictionary.LadyChest] = personInfo.ladychest;
                // node.morphTargetInfluences[node.morphTargetDictionary.Weight] = personInfo.weight;
                // node.morphTargetInfluences[node.morphTargetDictionary.Caboose] = personInfo.caboose;
                // node.morphTargetInfluences[node.morphTargetDictionary.Waist] = Math.min(personInfo.caboose * 0.7, 1);
                // node.morphTargetInfluences[node.morphTargetDictionary.Pants] = personInfo.pants;
                // node.morphTargetInfluences[node.morphTargetDictionary.Chin_Height] = 1;
                if (personInfo.race == 'aarakocra' || personInfo.race == 'tortle') {
                    node.morphTargetInfluences[node.morphTargetDictionary.BirdHead] = 1;
                }
                else {
                    node.morphTargetInfluences[node.morphTargetDictionary.BirdHead] = 0;
                }
                if (personInfo.race == 'bloodfin' || personInfo.race == 'grippli' || personInfo.race == 'grung' || personInfo.race == 'kenku') {
                    node.morphTargetInfluences[node.morphTargetDictionary.Headless] = 1;
                }
                else {
                    node.morphTargetInfluences[node.morphTargetDictionary.Headless] = 0;
                }
            }
        }
        get mesh() {
            return this.getObjectByName("Torso");
        }
        get hatHolder() {
            if (this._hatHolder == undefined) {
                this._hatHolder = this.getObjectByName("hatHolder");
            }
            return this._hatHolder;
        }
        get texture() {
            return this.userData.texture;
        }
        set texture(textureURL) {
            if (this.texture != textureURL) {
                this.userData.texture = textureURL;
                let materia = this.mesh.material;
                if (textureURL.constructor === Array) {
                    materia.map = FOUR.Texture(textureURL[0]);
                    // bumpMap: FOUR.Texture(textureURL[1]),
                    // specularMap: FOUR.Texture(textureURL[2]),
                }
                else {
                    materia.map = FOUR.Texture(textureURL);
                }
                materia.needsUpdate = true;
            }
        }
        get equipment() {
            if (this._equipment == undefined) {
                this._equipment = new Person3DEquipment(this);
            }
            return this._equipment;
        }
        updateMorphTarget(key, value) {
            let skeletonContainer = this.getObjectByName("Skeleton");
            skeletonContainer.traverse(function (node0) {
                let node = node0;
                if (node.type == "SkinnedMesh") {
                    let mtd = node.morphTargetDictionary;
                    let mti = node.morphTargetInfluences;
                    if (mtd && mti) {
                        if (mtd.hasOwnProperty(key)) {
                            mti[mtd[key]] = value;
                        }
                    }
                }
                ;
            });
        }
    }
    CharactersModular.Person3D = Person3D;
    class Person3DEquipment {
        constructor(parent) {
            this.parent = parent;
        }
        get rightHand() {
            let result = this.parent.getObjectByName("wristr").getObjectByName("rightItem");
            if (result != undefined) {
                return result;
            }
            return undefined;
        }
        set rightHand(item) {
            cleanBone(this.parent, "wristr");
            if (item != undefined) {
                item.name = "rightItem";
                item.rotation.z = Math.PI;
                this.parent.getObjectByName("wristr").add(item);
            }
        }
    }
    CharactersModular.Person3DEquipment = Person3DEquipment;
    class MiniatureBase extends THREE.Mesh {
        constructor(x = 0, y = 0, z = 0) {
            super(new THREE.CylinderGeometry(0.5, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
                color: 0x777777,
                emissive: 0x000000,
                side: THREE.DoubleSide,
                shininess: 30,
            }));
            this.position.set(Math.floor(x) + 0.5, y, Math.floor(z) + 0.5);
            this.castShadow = true;
            this.receiveShadow = true;
            this.userData.draggable = true;
        }
    }
    CharactersModular.MiniatureBase = MiniatureBase;
    const equipment = [
        { style: 'Sword', color: "/res/models/Advanced/sword.png", relative: true },
        { style: 'ShieldFancy', color: 0x999999, relative: true },
        { style: 'Kite_Shield', color: 0x112244, relative: true },
        { style: 'Staff', color: 0xbaa099, relative: true },
        { style: 'Trident', color: 0x206688, relative: true },
        { style: 'Dagger', color: 0x668820, relative: false },
        { style: 'Mace', color: 0x775520, relative: true },
        { style: 'Bow', color: 0xbaa099, relative: true },
        { style: 'Book', color: 0xde02de, relative: true },
        { style: 'LaserSword', color: "/res/models/Advanced/sword.png", relative: true },
        { style: 'Blaster', color: "/res/models/Advanced/paralyzer.png", relative: true },
    ];
    const backEquipment = [
        { style: 'Shell', color: 0x272918, relative: true },
        { style: 'BirdWings_1', color: 0xffffff, relative: true },
        { style: 'Cape', color: 0xdd1133, relative: true },
        { style: 'Cape', color: 0x6194d3, relative: true },
        { style: 'angu_22', color: 0xffffff, relative: true }
    ];
    function getPC(name, x = 0, y = 0, z = 0) {
        var pc = pcData.filter(function (item) {
            return item.id == name;
        })[0];
        if (pc != undefined) {
            // if (typeof pc.haircolor === "string" && pc.haircolor.startsWith("#")) pc.haircolor = new THREE.Color(pc.haircolor);
            // if (typeof pc.skincolor === "string" && pc.skincolor.startsWith("#")) pc.skincolor = new THREE.Color(pc.skincolor);
            // if (typeof pc.themecolor === "string" && pc.themecolor.startsWith("#")) pc.themecolor = new THREE.Color(pc.themecolor);
            var charBase = new Person(pc.name, pc.race, pc.texture, pc.gender, pc.hairstyle, pc.haircolor, pc.beard, pc.skincolor, pc.weight, pc.themecolor, pc.type);
            charBase.personId = pc.id;
            if (pc.donk !== undefined)
                charBase.caboose = pc.donk;
            if (pc.fronk !== undefined)
                charBase.ladychest = pc.fronk;
            var char = getHumanoid(x, y, z, charBase, new Gear(pc.righthand, pc.lefthand, pc.back));
            return char;
        }
    }
    CharactersModular.getPC = getPC;
    function getParty(target, x = 0, y = 0, z = 0) {
        const partyMembers = ["Bud", "Jasper", "Falimur", "Namfoodle", "Redji", "Seabern", "Shamous", "Thunder", "Zenrya"];
        // var target = new THREE.Object3D();
        for (let i = 0; i < partyMembers.length; i++) {
            const e = partyMembers[i];
            let newPC = getPC(e, x + (i % 3), y, z - Math.floor(i / 3));
            if (newPC != undefined) {
                target.add(newPC);
            }
        }
    }
    CharactersModular.getParty = getParty;
    function getRandom(x = 0, y = 0, z = 0, race, gender) {
        var charBase = new Person(undefined, race, undefined, gender);
        var char = getHumanoid(x, y, z, charBase, new Gear(undefined, undefined, undefined, charBase.race));
        return char;
    }
    CharactersModular.getRandom = getRandom;
    function getHair(size, style) {
        var hat = new THREE.Object3D();
        //#region locate and clone meshes
        if (style.constructor === Array) {
            style.forEach(e => {
                if (e != undefined)
                    hat.add(getHair(size, e));
            });
        }
        else if (typeof style === "object") {
            let stylo = style;
            if (stylo.style != undefined) {
                let targetMesh = baseMeshes.Hair.getObjectByName(stylo.style);
                if (targetMesh != undefined) {
                    hat = targetMesh.clone();
                    if (stylo.texture != undefined) {
                        hat.material = FOUR.Material({
                            color: 0xffffff,
                            emissive: 0x000000,
                            side: THREE.FrontSide,
                            specular: 0x666666,
                            shininess: 5,
                            map: FOUR.Texture(stylo.texture),
                            transparent: true,
                            alphaTest: 0.5,
                        });
                    }
                    else if (hat.material.map != null && hat.material.hasOwnProperty("clone")) {
                        let mat = hat.material;
                        if ((typeof stylo.color === "string" && stylo.color.startsWith("#")) || typeof stylo.color === "number") {
                            hat.material = mat.clone();
                            hat.material.color = FOUR.Color(stylo.color);
                        }
                    }
                    else {
                        hat.material = FOUR.Material({
                            color: FOUR.Color(stylo.color),
                            emissive: 0x000000,
                            side: THREE.DoubleSide,
                            // specular: 0x666666,
                            shininess: 5
                        });
                    }
                }
            }
            ;
            hat.receiveShadow = true;
            hat.material.needsUpdate = true;
        }
        //#endregion
        if (typeof size === typeof new THREE.Vector3()) {
            hat.scale.copy(size);
        }
        else {
            hat.scale.set(size, size, size);
        }
        return hat;
    }
    CharactersModular.getHair = getHair;
    function getItem(index, scale = new THREE.Vector3(1, 1, 1)) {
        index = index || 0;
        var item = new THREE.Object3D();
        if (index != 0) {
            var style;
            if (typeof index === "string") {
                style = index;
                for (let i = 0; i < equipment.length; i++) {
                    const el = equipment[i];
                    if (el.style == index) {
                        index = i + 1;
                        break;
                    }
                    ;
                }
            }
            var equipmentItem = equipment[index - 1];
            style = equipmentItem.style;
            if (style !== null) {
                var color = equipmentItem.color;
                var relative = equipmentItem.relative;
                let baseItem = baseMeshes.Item.getObjectByName(style);
                if (baseItem != undefined) {
                    item = baseItem.clone();
                    if (item.material == undefined) {
                        if (typeof color === "string") {
                            item.material = FOUR.Material({
                                map: FOUR.Texture(color),
                                color: 0xffffff,
                                emissive: 0x000000,
                                side: THREE.DoubleSide,
                                shininess: 30,
                                specular: 0xeeeeee,
                            });
                        }
                        else {
                            item.material = FOUR.Material({
                                color: color,
                                emissive: 0x000000,
                                side: THREE.DoubleSide,
                                shininess: 30,
                                specular: 0xeeeeee
                            });
                        }
                        item.material.needsUpdate = true;
                    }
                    item.receiveShadow = true;
                    if (relative == false) {
                        item.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
                    }
                }
            }
        }
        return item;
    }
    CharactersModular.getItem = getItem;
    function getTorso(item) {
        var torso = new THREE.Mesh();
        var matchingItem = baseMeshes.Torso.getObjectByName(item.style);
        if (matchingItem != undefined) {
            torso = matchingItem.clone();
            torso.traverse(function (node0) {
                if (node0.hasOwnProperty("material")) {
                    let node = node0;
                    if (node.material != undefined) {
                        node.material = new THREE.MeshPhongMaterial({
                            color: FOUR.Color(item.color),
                            emissive: 0x000000,
                            side: THREE.DoubleSide,
                            shininess: 30,
                        });
                        if (node.name = "angu_22") {
                            node.material.map = FOUR.Texture("/res/models/Advanced/angu_22.png");
                            node.material.transparent = true;
                        }
                        else if (node.name = "angu_13") {
                            node.material.map = FOUR.Texture("/res/models/Advanced/angu_13.png");
                            node.material.transparent = true;
                        }
                        node.receiveShadow = true;
                        node.material.needsUpdate = true;
                    }
                }
            });
            if (item.relative == false) {
                let scale = item.size;
                torso.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
            }
        }
        return torso;
    }
    CharactersModular.getTorso = getTorso;
    function getHumanoid(x, y, z, personInfo, gear) {
        if (personInfo != undefined) {
            var boundGeom = new THREE.BoxBufferGeometry(0.5, 1.6, 0.35);
            boundGeom.translate(0, 0.8, 0);
            var interactionTarget = new THREE.Mesh(boundGeom, new THREE.MeshBasicMaterial({
                visible: false,
            }));
            interactionTarget.name = "Target";
            var person = SkeletonUtils.clone(baseMeshes.Human);
            person.add(interactionTarget);
            person.userData.mixer = new THREE.AnimationMixer(person);
            person.userData.animations = {
                Stand: "Stand",
                Walk: "Walk"
            };
            let skeletonContainer = person.getObjectByName("Skeleton");
            let skeleton = person.getObjectByName("Torso").skeleton;
            let bindMatrix = person.getObjectByName("Torso").bindMatrix;
            let meshesToKill = [];
            let meshesToAdd = ["EyeLids", "Torso", "Hands_Base", "Head_Base", "Arms_Base"];
            skeletonContainer.traverse(function (skellyNode) {
                // console.log("Node name:" + skellyNode.name + ", Type: " + skellyNode.type);
                if (skellyNode.type == "SkinnedMesh") {
                    meshesToKill.push(skellyNode);
                }
                ;
            });
            meshesToKill.forEach(skellyNode => {
                skellyNode.parent?.remove(skellyNode);
                skellyNode.geometry.dispose();
                if (Array.isArray(skellyNode.material)) {
                    skellyNode.material.forEach(mat => {
                        mat.dispose();
                    });
                }
                else {
                    skellyNode.material.dispose();
                }
            });
            meshesToAdd.forEach(meshName => {
                let node = baseMeshes.Human.getObjectByName(meshName);
                if (node) {
                    let clonedNode = node.clone();
                    skeletonContainer.add(clonedNode);
                    clonedNode.bind(skeleton, bindMatrix);
                }
            });
            person.animations = baseMeshes.Human.animations;
            let material = FOUR.Material({
                color: 0xffffff,
                emissive: 0x000000,
                bumpScale: 0.005,
                alphaTest: 0.5,
                morphTargets: true,
                skinning: true,
                name: 'texture',
                shadowSide: THREE.FrontSide,
                side: THREE.FrontSide,
                transparent: true,
                shininess: 5
            });
            person.receiveShadow = true;
            meshesToAdd.forEach(meshName => {
                let node = person.getObjectByName(meshName);
                if (node && node.type == "SkinnedMesh") {
                    node.material = material;
                    node.receiveShadow = true;
                    node.castShadow = true;
                    node.frustumCulled = false;
                }
            });
            person = updateHumanoid(person, personInfo, gear);
            switch (personInfo.type) {
                case 'rogue':
                    person.userData.animations.Stand = "Edge";
                    break;
                case 'fighter':
                    person.userData.animations.Stand = "Battle";
                    break;
                case 'cleric':
                    person.userData.animations.Stand = "Stand";
                    break;
                case 'mage':
                    person.userData.animations.Stand = "ManicMage";
                    break;
                case 'feral':
                    person.userData.animations.Stand = "LadyChest";
                    break;
                case 'druid':
                    person.userData.animations.Stand = "Stand";
                    break;
                default:
                    person.userData.animations.Stand = "Stand";
                    break;
            }
            person.userData.mixer.timeScale = 2;
            person.position.x = Math.floor(x) + 0.5;
            person.position.y = person.userData.showBase ? y + 0.025 : y;
            person.position.z = Math.floor(z) + 0.5;
            return person;
        }
    }
    CharactersModular.getHumanoid = getHumanoid;
    function changePart(person, category, newPart) {
        if (person != undefined) {
            let skeletonContainer = person.getObjectByName("Skeleton");
            let skeleton;
            let bindMatrix;
            let material;
            let meshesToKill = [];
            category += "_";
            skeletonContainer.traverse(function (skellyNode) {
                if (skellyNode.type == "SkinnedMesh") {
                    if (!(skeleton && bindMatrix && material)) {
                        skeleton = skellyNode.skeleton;
                        bindMatrix = skellyNode.bindMatrix;
                    }
                    if (skellyNode.name.startsWith(category)) {
                        if (!material) {
                            material = skellyNode.material.clone();
                        }
                        meshesToKill.push(skellyNode);
                    }
                }
                ;
            });
            meshesToKill.forEach(skellyNode => {
                skellyNode.parent?.remove(skellyNode);
                skellyNode.geometry.dispose();
                if (Array.isArray(skellyNode.material)) {
                    skellyNode.material.forEach(mat => {
                        mat.dispose();
                    });
                }
                else {
                    if (meshesToKill.length == 1) {
                        material = skellyNode.material;
                    }
                    else {
                        skellyNode.material.dispose();
                    }
                }
            });
            let node = baseMeshes.Human.getObjectByName(newPart);
            if (node) {
                let clonedNode = node.clone();
                skeletonContainer.add(clonedNode);
                //@ts-ignore
                clonedNode.bind(skeleton, bindMatrix);
                //@ts-ignore
                clonedNode.material = material;
                clonedNode.material.needsUpdate = true;
                clonedNode.receiveShadow = true;
                clonedNode.castShadow = true;
                clonedNode.frustumCulled = false;
            }
            return person;
        }
    }
    CharactersModular.changePart = changePart;
    function PersonLoader(callback, hideBase = false) {
        hideBase = hideBase || false;
        $.ajax({
            crossDomain: true,
            url: "/sf/res/data/characters.json",
            dataType: 'html',
            error: function (xmlHttpReq, status, err) {
                var something = xmlHttpReq;
            },
            success: function (returnedData) {
                pcData = JSON.parse(returnedData).Items;
            }
        });
        var person = new Person3D();
        var hat = new THREE.Object3D();
        var bagOfHolding = new THREE.Object3D();
        var torso = new THREE.Object3D();
        var manager = new THREE.LoadingManager();
        manager.onLoad = function () {
            baseMeshes.Hair = hat;
            baseMeshes.Item = bagOfHolding;
            baseMeshes.Torso = torso;
            person.userData.draggable = true;
            person.userData.showBase = !hideBase;
            person.traverse(function (node) {
                if (node.type == "Mesh") {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
                ;
            });
            baseMeshes.Human = person;
            //#region set default values for torso
            let meshes = ["EyeLids", "Torso", "Hands", "Head", "Arms_Base"];
            meshes.forEach(meshName => {
                let node = person.getObjectByName(meshName);
                if (node) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.frustumCulled = false;
                }
            });
            let hairgroup = new THREE.Object3D();
            hairgroup.name = "hair";
            person.getObjectByName("hatHolder").add(hairgroup);
            //#endregion
            callback();
        };
        if (hideBase == false) {
            person = new Person3D(new THREE.CylinderGeometry(0.45, 0.5, 0.025, 6), FOUR.Material({
                color: 0xffffff,
                bumpScale: 0.005,
                alphaTest: 0.5,
                morphTargets: true,
                skinning: true,
                name: 'texture',
                shadowSide: THREE.DoubleSide
            }));
        }
        var loader = new GLTFLoader(manager);
        //#region Load person mesh
        loader.load('/res/models/character-modular.glb', function (gltf) {
            var skeleton = gltf.scene.getObjectByName("Skeleton");
            let normalTemplate = skeleton.getObjectByName("Joined");
            if (normalTemplate) {
                skeleton.remove(normalTemplate);
                normalTemplate.parent?.remove(normalTemplate);
            }
            skeleton.traverse(function (node) {
                if (node.type == "SkinnedMesh") {
                    if (node.name.startsWith("Arms")) {
                        CharactersModular.bodyPartOptions.arms.push(node.name);
                    }
                    if (node.name.startsWith("Head")) {
                        CharactersModular.bodyPartOptions.head.push(node.name);
                    }
                }
                ;
            });
            CharactersModular.bodyPartOptions.arms.sort();
            CharactersModular.bodyPartOptions.head.sort();
            person.add(skeleton);
            person.userData.mixer = new THREE.AnimationMixer(skeleton);
            person.animations = gltf.animations;
            person.animations.forEach((clip) => {
                // Filters out the unwanted scale tracks that are automatically inserted by the exporter.
                clip.tracks = clip.tracks.filter(function (track) {
                    return !(track.name.substring(track.name.length - 6) == ".scale");
                });
            });
        }, undefined, function (error) {
            console.error(error);
        });
        //#endregion
        //#region Load Hair/Hats
        loader.load('/res/models/badHair.glb', function (gltf) {
            gltf.scene.traverse(function (node) {
                hat.add(node.clone());
                if (node.material)
                    CharactersModular.hairOptions.push(node.name);
            });
        }, undefined, function (error) {
            console.error(error);
        });
        //#endregion
        //#region Load items/weapons
        loader.load('/res/models/Items.glb', function (gltf) {
            gltf.scene.traverse(function (node) {
                bagOfHolding.add(node.clone());
            });
        }, undefined, function (error) {
            console.error(error);
        });
        //#endregion
        //#region Load Torso accessories
        loader.load('/res/models/TorsoStuff.gltf', function (gltf) {
            gltf.scene.traverse(function (node) {
                torso.add(node.clone());
            });
        }, undefined, function (error) {
            console.error(error);
        });
        //#endregion
    }
    CharactersModular.PersonLoader = PersonLoader;
    function updateHumanoid(person, personInfo, gear = new Gear(0, 0, 0)) {
        person.name = personInfo.name;
        person.personId = personInfo.personId;
        person.userData.scale = {
            size: personInfo.scale,
            head: personInfo.headScale,
            arm: personInfo.armScale,
            torso: personInfo.torsoScale,
            leg: personInfo.legScale
        };
        if (personInfo.texture != undefined) {
            person.texture = personInfo.texture;
        }
        person.setMorphTargets(personInfo);
        // removeFromBone(person, "Skeleton_spinelower", "Tail");
        // removeFromBone(person, "Skeleton_wristr", "rightItem");
        cleanBone(person, "wristr");
        cleanBone(person, "wristl");
        cleanBone(person, "spineupper");
        cleanBone(person, "spinelower");
        cleanBone(person, "hatHolder");
        // removeFromBone(person, "hatHolder", "hair");
        if (personInfo.tail != undefined) {
            let item = getTorso(personInfo.tail);
            item.name = "Tail";
            person.getObjectByName("spinelower").add(item);
        }
        if (gear.righthand != 0) {
            person.equipment.rightHand = getItem(gear.righthand, personInfo.scale);
            // let item = getItem(gear.righthand, scale);
            // item.name = "rightItem";
            // item.rotation.z = Math.PI;
            // (person.getObjectByName("wristr") as THREE.Object3D).add(item);
        }
        // Add gear to Left Hand
        if (gear.lefthand != 0) {
            person.getObjectByName("wristl").add(getItem(gear.lefthand, personInfo.scale));
        }
        ;
        // Add ears to head
        if (personInfo.ears != undefined) {
            person.getObjectByName("hatHolder").add(getHair(personInfo.ears.size, new Hair(personInfo.ears.style, personInfo.ears.color)));
        }
        ;
        //#region Head stuff
        let headNode = person.getObjectByName("hatHolder");
        let head;
        if (personInfo.race !== "aarakocra" && personInfo.race !== "bloodfin" && personInfo.race !== "grung" && personInfo.race !== "kenku" && personInfo.race !== "tortle") {
            if (personInfo.hairstyle != undefined) {
                var hair = getHair(1, personInfo.hairstyle);
                hair.name = "hair";
                headNode.add(hair);
            }
            if (personInfo.beardstyle != undefined) {
                var beard = getHair(1, new Hair(personInfo.beardstyle, personInfo.haircolor));
                beard.name = "beard";
                headNode.add(beard);
            }
        }
        switch (personInfo.race) {
            case 'bloodfin':
                head = getHair(1, new Hair("Head_Shark", personInfo.skincolor));
                head.name = "HeadMesh";
                headNode.add(head);
                break;
            case 'grippli':
            case 'grung':
            case 'kenku':
                head = getHair(1, new Hair("Frog_Head", 0xffffff));
                head.name = "HeadMesh";
                head.material.map = person.getObjectByName("Torso").material.map;
                head.material.bumpMap = FOUR.Texture("/res/models/Advanced/skin_grung_bump.png");
                head.material.bumpScale = 0.1;
                head.material.needsUpdate = true;
                headNode.add(head);
                break;
            case 'aarakocra':
                var beak = getHair(1, new Hair("Beak", 0xffcc33));
                beak.name = "beak";
                headNode.add(beak);
                break;
            case 'tiefling':
                var horns = getHair(1, new Hair("Tiefling_Horns", 0x443326));
                horns.name = "horns";
                headNode.add(horns);
                break;
            default:
                break;
        }
        //#endregion
        //#region Bone: spineupper
        var spineNode = person.getObjectByName("spineupper");
        switch (personInfo.race) {
            case 'tortle':
                var torso = getTorso(new PersonPhysicalFeature("Shell", 1, 0x272918));
                torso.name = "Shell";
                spineNode.add(torso);
                break;
            case 'aarakocra':
                var torso = getTorso(new PersonPhysicalFeature("BirdWings_1", 1, 0x272918));
                torso.name = "Wings";
                spineNode.add(torso);
                break;
            default:
                break;
        }
        if (gear.back != 0 && gear.back != undefined) {
            var item = getTorso(new PersonPhysicalFeature(backEquipment[gear.back].style, personInfo.scale, backEquipment[gear.back].color, backEquipment[gear.back].relative));
            item.name = "backItem";
            spineNode.add(item);
        }
        //#endregion
        //#region Perform scaling
        person.getObjectByName("skull")?.scale.copy(personInfo.headScale);
        person.getObjectByName("upperArml")?.scale.copy(personInfo.armScale);
        person.getObjectByName("Root")?.scale.set(personInfo.scale.x, personInfo.scale.z, personInfo.scale.y);
        person.getObjectByName("Target")?.scale.set(personInfo.scale.x, personInfo.scale.z, personInfo.scale.y);
        //#endregion
        //#region Update userData node
        person.userData.hairStyle = personInfo.hairstyle;
        person.userData.beardstyle = personInfo.beardstyle;
        person.userData.hairColor = personInfo.haircolor;
        person.userData.skinColor = personInfo.skincolor;
        person.userData.race = personInfo.race;
        person.userData.gender = personInfo.gender;
        //#endregion
        return person;
    }
    CharactersModular.updateHumanoid = updateHumanoid;
    function removeFromBone(parent, boneName, objectName) {
        try {
            const bone = parent.getObjectByName(boneName);
            if (bone != undefined) {
                const object = bone.getObjectByName(objectName);
                if (object != undefined)
                    bone.remove(object);
            }
        }
        catch (error) {
            console.warn("Error finding object within bone.");
        }
    }
    CharactersModular.removeFromBone = removeFromBone;
    function cleanBone(parent, boneName) {
        try {
            const bone = parent.getObjectByName(boneName);
            if (bone != undefined) {
                for (var i = bone.children.length - 1; i >= 0; i--) {
                    if (bone.children[i].type == "Mesh" || bone.children[i].type == "Object3D")
                        bone.remove(bone.children[i]);
                }
            }
        }
        catch (error) {
            console.warn("An oops happened while cleaning this bone.");
        }
    }
    CharactersModular.cleanBone = cleanBone;
    function getSprite(x, y, z, texture, size, name) {
        texture = texture || "/img/characters/npc/Smith.png";
        size = size || 1;
        name = name || "???";
        var spriteMap = FOUR.Texture(texture);
        var sprite = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshPhongMaterial({ map: spriteMap, transparent: true, side: THREE.DoubleSide, color: 0xffffff, }));
        sprite.position.set(0, size / 2, 0);
        var base = new MiniatureBase(x, y, z);
        base.add(sprite);
        return base;
    }
    CharactersModular.getSprite = getSprite;
    function getZombies(x, y, z, count = 1) {
        var sprite = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), new THREE.MeshPhongMaterial({
            map: FOUR.Texture("/img/characters/monsters/zombies.png"),
            transparent: true,
            side: THREE.DoubleSide,
            color: 0xffffff
        }));
        // sprite.position.set(0, size/2, 0);
        sprite.position.set(0, 1, 0);
        var sprite2 = sprite.clone();
        sprite2.rotation.y = Math.PI / 2;
        var base = new THREE.Mesh(new THREE.CylinderGeometry(2.95, 3, 0.025, 12), new THREE.MeshPhongMaterial({
            color: 0x777777,
            emissive: 0x000000,
            side: THREE.DoubleSide,
            shininess: 30,
        }));
        base.position.set(Math.floor(x) - 3, y, Math.floor(z) - 3);
        base.castShadow = true;
        base.receiveShadow = true;
        base.userData.draggable = true;
        base.add(sprite);
        base.add(sprite2);
        return base;
    }
    CharactersModular.getZombies = getZombies;
    function getName(race, gender, age = 0) {
        const newnpc = new NPC(undefined, race, gender, age);
        return newnpc.name;
    }
    CharactersModular.getName = getName;
    function getModron(x = 0, y = 0, z = 0) {
        var person = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
            color: 0x999999,
            emissive: 0x000000,
            side: THREE.DoubleSide,
            shininess: 30,
        }));
        var manager = new THREE.LoadingManager();
        manager.onLoad = function () {
            person.userData.draggable = true;
        };
        var loader = new GLTFLoader(manager);
        loader.load('/res/models/modron.gltf', function (gltf) {
            person.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
        person.position.x = Math.floor(x) + 0.5;
        person.position.y = y;
        person.position.z = Math.floor(z) + 0.5;
        person.name = "Gearbox";
        return person;
    }
    CharactersModular.getModron = getModron;
    function getBear(x = 0, y = 0, z = 0) {
        return loadModel(x, y, z, '/res/models/bear.glb', "Ursa");
    }
    CharactersModular.getBear = getBear;
    function getLizard(x = 0, y = 0, z = 0) {
        return loadModel(x, y, z, '/res/models/lizard.glb', "J");
    }
    CharactersModular.getLizard = getLizard;
    function getYamask(x = 0, y = 0, z = 0) {
        return loadModel(x, y, z, '/res/models/yamask.glb');
    }
    CharactersModular.getYamask = getYamask;
    function loadModel(x = 0, y = 0, z = 0, model, name = "thing") {
        var person = new THREE.Object3D();
        var manager = new THREE.LoadingManager();
        manager.onLoad = function () {
            person.userData.draggable = true;
        };
        var loader = new GLTFLoader(manager);
        loader.load(model, function (gltf) {
            person.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
        person.position.x = Math.floor(x) + 0.5;
        person.position.y = y;
        person.position.z = Math.floor(z) + 0.5;
        person.name = name;
        return person;
    }
})(CharactersModular || (CharactersModular = {}));
;
//# sourceMappingURL=characters-modular.js.map