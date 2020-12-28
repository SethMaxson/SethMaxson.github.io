import * as THREE from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from '../../../node_modules/three/examples/jsm/utils/SkeletonUtils.js';
import { FOUR } from '../js/four.js';
const genders = "fm";
const useMorphTargets = true;
$(document).ready(function () {
    var gradient = new THREE.TextureLoader().load("/res/models/Advanced/gradient.png");
    gradient.minFilter = THREE.NearestFilter;
    gradient.magFilter = THREE.NearestFilter;
    gradient.flipY = false;
    FOUR.Gradient = gradient;
});
// Mesh variables
var baseMeshes = {
    Human: new THREE.Object3D(),
    Hair: new THREE.Object3D(),
    Torso: new THREE.Object3D(),
    Font: new THREE.Font(undefined),
    Item: new THREE.Object3D()
};
var pcData;
// List Variables
var hairOptions = [];
class EquipmentModel {
    constructor() {
        this.style = "";
        this.color = 0x000000;
        this.relative = false;
    }
}
class PersonPhysicalFeature {
    constructor(style, size, color) {
        this.style = style;
        if (typeof size === typeof THREE.Vector3) {
            this.size = size;
        }
        else {
            this.size = new THREE.Vector3(size, size, size);
        }
        this.color = FOUR.Color(color);
    }
}
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
        return item.name == name;
    })[0];
    if (pc != undefined) {
        // if (typeof pc.haircolor === "string" && pc.haircolor.startsWith("#")) pc.haircolor = new THREE.Color(pc.haircolor);
        // if (typeof pc.skincolor === "string" && pc.skincolor.startsWith("#")) pc.skincolor = new THREE.Color(pc.skincolor);
        // if (typeof pc.themecolor === "string" && pc.themecolor.startsWith("#")) pc.themecolor = new THREE.Color(pc.themecolor);
        var charBase = new Person(pc.name, pc.race, pc.texture, pc.gender, pc.hairstyle, pc.haircolor, pc.beard, pc.skincolor, pc.weight, pc.themecolor, pc.type);
        if (pc.donk !== undefined)
            charBase.caboose = pc.donk;
        if (pc.fronk !== undefined)
            charBase.ladychest = pc.fronk;
        var char = getHumanoid(x, y, z, charBase, new Gear(pc.righthand, pc.lefthand, pc.back));
        return char;
    }
}
function getNPC(name, x = 0, y = 0, z = 0) {
    const NPCs = [
        {
            name: "Althea",
            race: "elf",
            type: "bard",
            texture: "/res/models/Advanced/skin_elf_f.png",
            gender: "f",
            hairstyle: "Pixie_Cut",
            haircolor: 0x694c39,
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 0,
            weight: undefined,
            themecolor: 0xffd7b1
        },
        {
            name: "Perrin",
            race: "halfling",
            type: "bard",
            texture: "/res/models/Advanced/skin_perrin.png",
            gender: "m",
            hairstyle: "Short_SidePart",
            haircolor: 0x852a05,
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 0,
            weight: 1.1,
            themecolor: 0x207755
        },
        {
            name: "Smith",
            race: "grippli",
            type: "bard",
            texture: "/res/models/Advanced/skin_smith.png",
            gender: "m",
            hairstyle: undefined,
            haircolor: undefined,
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 4,
            weight: 1.1,
            themecolor: 0x6194d3
        },
        {
            name: "Ribbert",
            race: "grippli",
            type: "bard",
            texture: ["/res/models/Advanced/skin_grippli_m.png", "/res/models/Advanced/skin_grippli_m_bump.png"],
            gender: "m",
            hairstyle: undefined,
            haircolor: undefined,
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 0,
            weight: 0.9,
            themecolor: 0x6194d3
        },
        {
            name: "Helja",
            race: "dwarf",
            type: "blacksmith",
            texture: "/res/models/Advanced/skin_dwarf_f3.png",
            gender: "f",
            hairstyle: "Spiky_Pony",
            haircolor: 0x000033,
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 0,
            weight: 0.1,
            themecolor: 0x6194d3
        },
        {
            name: "Adrik",
            race: "dwarf",
            type: "blacksmith",
            texture: "/res/models/Advanced/skin_smith.png",
            gender: "m",
            hairstyle: ["Floppy", "Glasses_02"],
            haircolor: [0x300202, 0x222222],
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 4,
            weight: 1.1,
            themecolor: 0x6194d3
        },
        {
            name: "Thorina",
            race: "dwarf",
            type: "blacksmith",
            texture: "/res/models/Advanced/skin_dwarf_f2.png",
            gender: "f",
            hairstyle: ["Farmers_Daughter", "Glasses"],
            haircolor: [0xb06500, 0x222222],
            beard: undefined,
            skincolor: undefined,
            righthand: 0,
            lefthand: 0,
            back: 0,
            weight: 0.9,
            themecolor: 0x6194d3
        }
    ];
    var npc;
    if (typeof name === "string") {
        for (let i = 0; i < NPCs.length; i++) {
            const el = NPCs[i];
            if (el.name == name) {
                npc = el;
                break;
            }
            ;
        }
    }
    else {
        npc = NPCs[name];
    }
    if (npc != undefined) {
        var charBase = new Person(npc.name, npc.race, npc.texture, npc.gender, npc.hairstyle, npc.haircolor, npc.beard, npc.skincolor, npc.weight, npc.themecolor, npc.type);
        var char = getHumanoid(x, y, z, charBase, new Gear(npc.righthand, npc.lefthand, npc.back));
        return char;
    }
}
function getParty(target, x = 0, y = 0, z = 0) {
    const partyMembers = ["Bud", "Jasper", "Falumer", "Namfoodle", "Redji", "Seabern", "Shamous", "Thunder", "Zenrya"];
    // var target = new THREE.Object3D();
    for (let i = 0; i < partyMembers.length; i++) {
        const e = partyMembers[i];
        let newPC = getPC(e, x + (i % 3), y, z - Math.floor(i / 3));
        if (newPC != undefined) {
            target.add(newPC);
        }
    }
}
function getRandom(x = 0, y = 0, z = 0, race, gender) {
    var charBase = new Person(undefined, race, undefined, gender);
    var char = getHumanoid(x, y, z, charBase, new Gear(undefined, undefined, undefined, charBase.race));
    return char;
}
function getHair(size, style, color) {
    var hat = new THREE.Object3D();
    if (style != undefined && style !== null && baseMeshes.Hair != undefined) {
        if (style.constructor === Array) {
            for (let i = 0; i < style.length; i++) {
                const tColor = color[i] || color || 0x2f2f2f;
                const e = style[i];
                if (e != undefined) {
                    let targetThing = baseMeshes.Hair.getObjectByName(e);
                    if (targetThing != undefined) {
                        let doo = targetThing.clone();
                        if (doo.material.map != null) {
                            if (typeof tColor === "string" && tColor.startsWith("#")) {
                                doo.material.color = FOUR.Color(tColor);
                            }
                        }
                        else {
                            if (typeof tColor === "string" && tColor.startsWith("#")) {
                                doo.material = FOUR.Material({
                                    color: FOUR.Color(tColor),
                                    emissive: 0x000000,
                                    side: THREE.FrontSide,
                                    specular: 0x666666,
                                    shininess: 50,
                                    shadowSide: THREE.DoubleSide
                                });
                            }
                            else if (typeof tColor === 'string') {
                                doo.material = FOUR.Material({
                                    color: 0xffffff,
                                    emissive: 0x000000,
                                    side: THREE.FrontSide,
                                    specular: 0x666666,
                                    shininess: 5,
                                    map: FOUR.Texture(tColor),
                                    transparent: true,
                                    alphaTest: 0.5,
                                });
                            }
                            else {
                                doo.material = FOUR.Material({
                                    color: tColor,
                                    emissive: 0x000000,
                                    side: THREE.DoubleSide,
                                    specular: 0x666666,
                                    shininess: 5,
                                });
                            }
                        }
                        doo.receiveShadow = true;
                        doo.material.needsUpdate = true;
                        hat.add(doo);
                    }
                }
            }
        }
        else {
            if (typeof style === 'object') {
                const e = style.style;
                if (e != undefined) {
                    let targetMesh = baseMeshes.Hair.getObjectByName(e);
                    if (targetMesh != undefined) {
                        hat = targetMesh.clone();
                        hat.material = FOUR.Material({
                            color: 0xffffff,
                            emissive: 0x000000,
                            side: THREE.FrontSide,
                            specular: 0x666666,
                            shininess: 5,
                            map: FOUR.Texture(style.texture),
                            transparent: true,
                            alphaTest: 0.5,
                        });
                    }
                }
                ;
            }
            else {
                color = color || 0x2f2f2f;
                let targetMesh = baseMeshes.Hair.getObjectByName(style);
                if (targetMesh != undefined) {
                    hat = targetMesh.clone();
                    if (typeof color === 'string' && !color.startsWith("0x")) {
                        hat.material = FOUR.Material({
                            color: 0xffffff,
                            emissive: 0x000000,
                            side: THREE.FrontSide,
                            specular: 0x666666,
                            shininess: 5,
                            map: FOUR.Texture(color),
                            transparent: true,
                            alphaTest: 0.5,
                        });
                    }
                    else if (typeof color == typeof new THREE.Color()) {
                        hat.material = FOUR.Material({
                            color: color,
                            emissive: 0x000000,
                            side: THREE.DoubleSide,
                            // specular: 0x666666,
                            shininess: 30
                        });
                    }
                    else {
                        hat.material = FOUR.Material({
                            color: FOUR.Color(color),
                            emissive: 0x000000,
                            side: THREE.DoubleSide,
                            // specular: 0x666666,
                            shininess: 30
                        });
                    }
                }
            }
            hat.receiveShadow = true;
            hat.material.needsUpdate = true;
        }
    }
    if (typeof size === typeof new THREE.Vector3()) {
        hat.scale.set(size.x, size.y, size.z);
    }
    else {
        hat.scale.set(size, size, size);
    }
    return hat;
}
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
function getTorso(index, size, color) {
    var torso = new THREE.Object3D();
    color = color || FOUR.Color(0x2f2f2f);
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
        var equipmentItem = backEquipment[index - 1];
        style = equipmentItem.style;
        if (typeof style !== null) {
            color = FOUR.Color(equipmentItem.color);
            var relative = equipmentItem.relative;
            var scale = new THREE.Vector3(1, 1, 1);
            if (typeof size === typeof THREE.Vector3) {
                scale = size;
            }
            var matchingItem = baseMeshes.Torso.getObjectByName(style);
            if (matchingItem != undefined) {
                torso = matchingItem.clone();
                torso.traverse(function (node0) {
                    if (node0.hasOwnProperty("material")) {
                        let node = node0;
                        if (node.material != undefined) {
                            node.material = new THREE.MeshPhongMaterial({
                                color: color,
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
                if (relative == false) {
                    torso.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
                }
            }
        }
    }
    return torso;
}
class Person {
    constructor(name, race, textureURL, gender, hairstyle, haircolor, beardstyle, skincolor, weight, themecolor = 0x999999, type, ladychest) {
        this.themecolor = 0x999999;
        this.ladychest = 0;
        this.weight = 0;
        this.pants = 0;
        this.caboose = 0;
        this.race = race || races[Math.floor(Math.random() * races.length)];
        this.texture = textureURL;
        this.gender = gender || genders.charAt(Math.floor(Math.random() * 2));
        this.hairstyle = hairstyle;
        this.haircolor = haircolor;
        this.beardstyle = beardstyle;
        if (skincolor != undefined)
            this.skincolor = skincolor;
        this.themecolor = themecolor;
        this.type = type || undefined;
        this.name = name || getName(this.race, this.gender);
        switch (this.race) {
            case "aarakocra":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_aarakocra_m.png";
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_aarakocra_f.png";
                    this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0.3;
                    this.caboose = 0.1;
                }
                this.haircolor = haircolor || 0xefefe0;
                this.skincolor = skincolor || 0xffffe7;
                this.weight = weight || 0.3;
                break;
            case "aasimar":
                this.haircolor = haircolor || 0xfbe7b2;
                this.skincolor = skincolor || 0x1abc9c;
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_aasimar_m.png";
                    this.hairstyle = hairstyle || randomize(["Basic_Short", "Flat_Spiked", "Spiky_2"]);
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.pants = this.pants || 1;
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_aasimar_f.png";
                    this.hairstyle = hairstyle || randomize(["Elven_Braid", "Long_Formal", ["Spiky_2", "Spiky_Tail"], "Spiky_Pony"]);
                    this.scale = new THREE.Vector3(0.95, 0.95, 0.95);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 1;
                    this.caboose = 1;
                }
                this.weight = weight || 0.1;
                break;
            case "bloodfin":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_bloodfin.png";
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_bloodfin.png";
                }
                this.scale = new THREE.Vector3(1.3, 1.2, 1.3);
                this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                this.armScale = new THREE.Vector3(1.2, 1.5, 1.2);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.skincolor = skincolor || 0x8186a1;
                this.weight = weight || 0.7;
                this.ladychest = ladychest || 0;
                break;
            case "bugbear":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_bugbear_m.png";
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_bugbear_f.png";
                }
                this.hairstyle = hairstyle || "Warhawk";
                this.skincolor = skincolor || 0xd27d46;
                this.haircolor = haircolor || 0x996e52;
                this.scale = new THREE.Vector3(1.1, 1.1, 1.1);
                this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                this.armScale = new THREE.Vector3(1.2, 1.5, 1.2);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.2;
                this.ladychest = ladychest || 0;
                this.ears = new PersonPhysicalFeature("Bugbear_Ears", 1, this.skincolor);
                break;
            case "dwarf":
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || randomize([null, "Super_Short"]);
                    this.beardstyle = beardstyle || "Dwarf_Beard";
                    this.texture = textureURL || "/res/models/Advanced/skin_dwarf_m.png";
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.hairstyle = hairstyle || randomize(["Elven_Braid", "Farmers_Daughter", "Long_Curly"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_dwarf_f.png";
                    this.ladychest = ladychest || 0.4;
                    this.caboose = 1;
                }
                this.weight = weight || 0.4;
                this.haircolor = haircolor || 0x694c39;
                this.scale = new THREE.Vector3(1, 0.75, 1);
                this.headScale = new THREE.Vector3(1, 1.33, 1);
                this.armScale = new THREE.Vector3(0.9, 1.1, 0.9);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                break;
            case "drow":
                this.haircolor = haircolor || 0xefefff;
                this.skincolor = skincolor || 0x4c668a;
                if (this.gender == "m") {
                    // this.texture = textureURL || "/res/models/Advanced/skin_drow_m.png";
                    this.texture = textureURL || "/res/models/Advanced/skin_drow_m2.png";
                    this.hairstyle = hairstyle || "Floppy";
                    this.scale = new THREE.Vector3(1, 1.05, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    // this.texture = textureURL || "/res/models/Advanced/skin_zora.png";
                    this.texture = textureURL || "/res/models/Advanced/skin_drow_f2.png";
                    this.hairstyle = hairstyle || "Elven_Braid";
                    this.hairstyle = hairstyle || randomize(["Bob", "Elven_Braid", "Long_Pony", "Pixie_Cut"]);
                    this.scale = new THREE.Vector3(0.9, 1, 0.9);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0.5;
                    this.caboose = 1;
                }
                this.weight = weight || 0;
                this.ears = new PersonPhysicalFeature("Elf_Ears", 1, this.skincolor);
                break;
            case "elf":
                // this.haircolor = haircolor || 0xfbe7b2;
                this.haircolor = haircolor || randomize([0xfbe7b2, 0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
                this.skincolor = skincolor || 0xffe0b1;
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_elf_m.png";
                    this.hairstyle = hairstyle || randomize(["Basic_Short", "Floppy"]);
                    this.scale = new THREE.Vector3(1, 1.05, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_elf_f.png";
                    this.hairstyle = hairstyle || randomize(["Elven_Braid", "Floppy_Pony", "Long_Formal"]);
                    this.scale = new THREE.Vector3(0.90, 1, 0.95);
                    this.headScale = new THREE.Vector3(1, 0.9, 1);
                    // this.scale = new THREE.Vector3(0.85, 1, 0.855)
                    // this.headScale = new THREE.Vector3(0.9, 0.8, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 1;
                    this.caboose = 1;
                }
                this.ears = new PersonPhysicalFeature("Elf_Ears", 1, this.skincolor);
                this.weight = weight || 0;
                break;
            case "firbolg":
                this.haircolor = haircolor || 0x222222;
                this.skincolor = skincolor || 0x926cc5;
                this.scale = new THREE.Vector3(1.2, 1.2, 1.2);
                this.headScale = new THREE.Vector3(1, 1, 1);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.3;
                if (this.gender == "m") {
                    this.scale = new THREE.Vector3(1.2, 1.2, 1.2);
                    this.hairstyle = hairstyle || randomize(["Basic_Short", "Floppy", "Short_SidePart"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_firbolg_m.png";
                    this.caboose = 0;
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.scale = new THREE.Vector3(1.15, 1.15, 1.15);
                    this.hairstyle = hairstyle || randomize(["Floppy_Pony", "Floppy", "Pixie_Cut"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_firbolg_f.png";
                    this.caboose = 1;
                    this.ladychest = ladychest || 0.7;
                }
                this.weight = weight || 0.6;
                break;
            case "gnome":
                if (this.gender == "m") {
                    this.haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4, 0xffedee, 0x3370d0, 0xffaaaa, 0x00ed77]);
                    this.hairstyle = hairstyle || randomize(["Afro", "Basic_Short", "Floppy", "Short_SidePart", "Spiky"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_gnome_m.png";
                    this.caboose = 0;
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4, 0xffedee, 0x3370d0, 0xffaaaa, 0x00ed77, 0xc000c4, 0x00c0c4]);
                    this.hairstyle = hairstyle || randomize(["Bob", "Floppy_Pony", "Floppy", "Long_Pony", "Pixie_Cut"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_gnome_f.png";
                    this.caboose = 1;
                    this.ladychest = ladychest || 0.7;
                }
                this.scale = new THREE.Vector3(0.4, 0.4, 0.4);
                this.headScale = new THREE.Vector3(1.5, 1.5, 1.5);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.1;
                if (chance(20)) {
                    this.hairstyle = arrayAppend(this.hairstyle, "Glasses_02");
                    this.haircolor = arrayAppend(this.haircolor, 0x222222);
                }
                break;
            case "goblin":
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || undefined;
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.hairstyle = hairstyle || "Short_Messy";
                    this.ladychest = ladychest || 0.3;
                    this.caboose = 0.3;
                }
                this.texture = textureURL || "/res/models/Advanced/skin_goblin.png";
                this.haircolor = haircolor || 0x111111;
                this.skincolor = skincolor || 0x4ca338;
                this.scale = new THREE.Vector3(0.55, 0.55, 0.55);
                this.headScale = new THREE.Vector3(1.9, 1.5, 1.5);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.2;
                this.type = this.type || randomize(["default", "rogue"]);
                this.ears = new PersonPhysicalFeature("Goblin_Ears", 1, this.skincolor);
                break;
            case "grippli":
                this.hairstyle = hairstyle || undefined;
                this.texture = textureURL || "/res/models/Advanced/skin_grippli_m.png";
                this.haircolor = haircolor || 0x01a368;
                this.skincolor = skincolor || 0x01a368;
                this.scale = new THREE.Vector3(0.45, 0.45, 0.45);
                this.headScale = new THREE.Vector3(1.3, 1.3, 1.3);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.3;
                this.ladychest = ladychest || 0;
                break;
            case "grung":
                this.hairstyle = hairstyle || undefined;
                this.texture = textureURL || "/res/models/Advanced/skin_grung_red.png";
                this.haircolor = haircolor || 0x1560bd;
                this.skincolor = skincolor || 0x1560bd;
                this.scale = new THREE.Vector3(0.45, 0.45, 0.45);
                this.headScale = new THREE.Vector3(1.3, 1.3, 1.3);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.2;
                this.ladychest = ladychest || 0;
                break;
            case "halfling":
                this.haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
                this.scale = new THREE.Vector3(0.45, 0.45, 0.45);
                this.headScale = new THREE.Vector3(1.4, 1.4, 1.4);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.3;
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || randomize(["Basic_Short", "Floppy", "Short_SidePart"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_halfling_m.png";
                    this.caboose = 0;
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.hairstyle = hairstyle || randomize(["Farmers_Daughter", "Floppy_Pony", ["Floppy", "Spiky_Tail"], "Granny_Bun", "Pixie_Cut"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_halfling_f.png";
                    this.caboose = 1;
                    this.ladychest = ladychest || 0.7;
                }
                break;
            case "halforc":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_halforc_m.png";
                    this.scale = new THREE.Vector3(1.04, 1.04, 1.04);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.hairstyle = hairstyle || "Warhawk";
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_halforc_f.png";
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.hairstyle = hairstyle || "Short_Messy";
                    this.caboose = 1;
                    this.ladychest = ladychest || 1;
                }
                this.haircolor = haircolor || 0x111111;
                this.skincolor = skincolor || 0x1abc9c;
                this.weight = weight || 0.5;
                break;
            case "kenku":
                this.haircolor = haircolor || 0x111111;
                this.skincolor = skincolor || 0x111111;
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || undefined;
                    this.texture = textureURL || "/res/models/Advanced/skin_kenku_m.png";
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                }
                else {
                    this.hairstyle = hairstyle || undefined;
                    this.texture = textureURL || "/res/models/Advanced/skin_kenku_f.png";
                    this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                }
                this.ladychest = ladychest || 0;
                this.weight = weight || 0;
                break;
            case "kitsune":
                this.haircolor = haircolor || randomize([0xfbe7b2, 0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
                this.skincolor = skincolor || 0xffe0b1;
                this.tail = new PersonPhysicalFeature("WolfTail", 1, this.haircolor);
                this.ears = new PersonPhysicalFeature("Cat_Ears", 1, this.haircolor);
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_elf_m.png";
                    this.hairstyle = hairstyle || randomize(["Basic_Short", "Floppy"]);
                    this.scale = new THREE.Vector3(1, 1.05, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_elf_f.png";
                    this.hairstyle = hairstyle || randomize(["Elven_Braid", "Floppy_Pony", "Long_Formal"]);
                    this.scale = new THREE.Vector3(0.90, 1, 0.95);
                    this.headScale = new THREE.Vector3(1, 0.9, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 1;
                    this.caboose = 1;
                }
                this.weight = weight || 0;
                break;
            case "orc":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_orc_m.png";
                    this.hairstyle = hairstyle || "Warhawk";
                    this.scale = new THREE.Vector3(1.5, 1.5, 1.5);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_orc_f.png";
                    this.hairstyle = hairstyle || "Short_Messy";
                    this.scale = new THREE.Vector3(1.4, 1.4, 1.4);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.caboose = 0.2;
                    this.ladychest = ladychest || 0.2;
                }
                this.weight = weight || 0.8;
                this.pants = this.pants || 0;
                break;
            case "tabaxi":
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_tabaxi.png";
                    this.hairstyle = hairstyle || "Warhawk";
                    this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.headScale = new THREE.Vector3(1.1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_tabaxi.png";
                    this.hairstyle = hairstyle || randomize(["Pixie_Cut", "Warhawk"]);
                    this.scale = new THREE.Vector3(0.85, 0.85, 0.85);
                    this.headScale = new THREE.Vector3(1.1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.caboose = 0.2;
                    this.ladychest = ladychest || 0.2;
                }
                this.haircolor = haircolor || randomize([0xe6be8a, 0xd69d53, 0xd78d2e, 0xFFF5E1]);
                this.skincolor = skincolor || 0xe6be8a;
                this.weight = weight || 0.1;
                this.ears = new PersonPhysicalFeature("Cat_Ears", 1, this.skincolor);
                break;
            case "tiefling":
                this.skincolor = skincolor || 0xca3435;
                if (this.gender == "m") {
                    this.texture = textureURL || "/res/models/Advanced/skin_tiefling_m.png";
                    this.haircolor = haircolor || randomize([0x0100003, 0x5f1919]);
                    this.hairstyle = hairstyle || "Flat_Spiked";
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.texture = textureURL || "/res/models/Advanced/skin_tiefling_f.png";
                    this.hairstyle = hairstyle || randomize(["Long_Pony", "Pixie_Cut"]);
                    this.haircolor = haircolor || randomize([0x0100003, 0x5f1919, 0x360e36]);
                    this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.caboose = 1.2;
                    this.ladychest = ladychest || 1.2;
                }
                this.weight = weight || 0.1;
                break;
            case "tortle":
                this.hairstyle = hairstyle || randomize(["Dreads", undefined]);
                this.texture = textureURL || "/res/models/Advanced/skin_tortle_m.png";
                this.scale = new THREE.Vector3(1, 1, 1);
                this.headScale = new THREE.Vector3(1, 1, 1);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.ladychest = ladychest || 0;
                this.haircolor = haircolor || 0x00755e;
                this.skincolor = skincolor || 0x009dc4;
                this.weight = weight || 0.1;
                break;
            case "triton":
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || randomize(["Dreads", "Long_Curly"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_triton_m.png";
                    this.scale = new THREE.Vector3(0.95, 0.95, 0.95);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.hairstyle = hairstyle || randomize(["Dreads", "Long_Curly"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_triton_f.png";
                    this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.caboose = 1.4;
                    this.ladychest = ladychest || 0.5;
                }
                this.haircolor = haircolor || 0x00755e;
                this.skincolor = skincolor || 0x009dc4;
                this.weight = weight || 0.1;
                break;
            case "yuanti":
                this.texture = textureURL || "/res/models/Advanced/skin_goblin.png";
                this.scale = new THREE.Vector3(0.9, 1, 1);
                this.headScale = new THREE.Vector3(1, 0.9, 0.9);
                this.armScale = new THREE.Vector3(1, 1, 1);
                this.torsoScale = new THREE.Vector3(1, 1, 1);
                this.legScale = new THREE.Vector3(1, 1, 1);
                this.weight = weight || 0.1;
                this.ladychest = ladychest || 0;
                break;
            default:
                this.haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe4c080, 0xf1d8a4]);
                if (this.gender == "m") {
                    this.hairstyle = hairstyle || "Flat_Spiked";
                    this.texture = textureURL || randomize(["/res/models/Advanced/skin_human_m.png", "/res/models/Advanced/skin_human_m.png"]);
                    this.scale = new THREE.Vector3(1, 1, 1);
                    this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 0;
                }
                else {
                    this.hairstyle = hairstyle || randomize(["Floppy_Pony", ["Floppy", "Spiky_Tail"], "Granny_Bun", "Pixie_Cut"]);
                    this.texture = textureURL || "/res/models/Advanced/skin_human_f.png";
                    // this.hairstyle = [this.hairstyle, "Glasses_02"];
                    // this.haircolor = [this.haircolor, 0x222222];
                    this.scale = new THREE.Vector3(0.92, 0.92, 0.92);
                    this.headScale = new THREE.Vector3(1, 1, 1);
                    this.armScale = new THREE.Vector3(1, 1, 1);
                    this.torsoScale = new THREE.Vector3(1, 1, 1);
                    this.legScale = new THREE.Vector3(1, 1, 1);
                    this.ladychest = ladychest || 1;
                    this.caboose = 1;
                }
                this.weight = weight || 0.1;
                break;
        }
        this.ears = this.ears || undefined;
        this.tail = this.tail || undefined;
        this.caboose = this.caboose || 0;
        this.pants = this.pants || 0.5;
        this.type = this.type || "default";
        // @ts-ignore
        this.skincolor = this.skincolor || 0x000000;
    }
}
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
function getHumanoid(x, y, z, personInfo, gear) {
    if (personInfo != undefined) {
        var boundGeom = new THREE.BoxBufferGeometry(0.7, 2, 0.35);
        boundGeom.translate(0, 1, 0);
        var interactionTarget = new THREE.Mesh(boundGeom, new THREE.MeshBasicMaterial({
            visible: false,
        }));
        interactionTarget.name = "Target";
        var person = SkeletonUtils.clone(baseMeshes.Human);
        person.add(interactionTarget);
        person.userData.mixer = new THREE.AnimationMixer(person);
        person.animations = baseMeshes.Human.animations;
        person = updateHumanoid(person, personInfo, gear);
        var clip;
        switch (personInfo.type) {
            case 'rogue':
                clip = THREE.AnimationClip.findByName(person.animations, 'Edge');
                break;
            case 'fighter':
                clip = THREE.AnimationClip.findByName(person.animations, 'Battle');
                break;
            case 'cleric':
                clip = THREE.AnimationClip.findByName(person.animations, 'Stand');
                break;
            case 'mage':
                clip = THREE.AnimationClip.findByName(person.animations, 'ManicMage');
                break;
            case 'feral':
                clip = THREE.AnimationClip.findByName(person.animations, 'LadyChest');
                break;
            // case 'druid':
            // 	THREE.AnimationClip.findByName( person.animations, 'Stand' );
            // 	break;
            default:
                clip = THREE.AnimationClip.findByName(person.animations, 'Stand');
                break;
        }
        person.userData.mixer.clipAction(clip).play();
        person.position.x = Math.floor(x) + 0.5;
        person.position.y = person.userData.showBase ? y + 0.025 : y;
        person.position.z = Math.floor(z) + 0.5;
        var text = writeText(personInfo.name, personInfo.scale);
        person.add(text);
        return person;
    }
}
class PCData {
    constructor() {
        this.name = "";
        this.race = "";
        this.type = "";
        this.texture = "";
        this.gender = "";
        this.hairstyle = [];
        this.haircolor = [];
        this.beard = [];
        this.righthand = 0;
        this.lefthand = 0;
        this.back = 0;
        this.weight = 0;
        this.donk = 0;
        this.fronk = 0;
        this.themecolor = "";
    }
}
function PersonLoader(callback, hideBase = false) {
    hideBase = hideBase || false;
    $.ajax({
        crossDomain: true,
        url: "/res/data/characters.json",
        dataType: 'html',
        error: function (xmlHttpReq, status, err) {
            var something = xmlHttpReq;
        },
        success: function (returnedData) {
            pcData = JSON.parse(returnedData).Items;
        }
    });
    // var person = new THREE.Object3D() as THREE.Mesh;
    var person = new THREE.Object3D();
    if (hideBase == false) {
        person = new Person3D(new THREE.CylinderGeometry(0.45, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
            // color: personInfo.themecolor,
            color: 0x999999,
            emissive: 0x000000,
            side: THREE.FrontSide,
            shininess: 30,
        }));
    }
    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
        person.userData.draggable = true;
        person.userData.showBase = !hideBase;
        baseMeshes.Human = person;
        HairLoader(callback);
    };
    var loader = new GLTFLoader(manager);
    loader.load('/res/models/advancedCharacter.glb', function (gltf) {
        var skeleton = gltf.scene.getObjectByName("Skeleton");
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
}
class Person3D extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material);
        this.animations = [];
    }
}
function HairLoader(callback) {
    var hat = new THREE.Object3D();
    var bagOfHolding = new THREE.Object3D();
    var torso = new THREE.Object3D();
    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
        baseMeshes.Hair = hat;
        baseMeshes.Item = bagOfHolding;
        baseMeshes.Torso = torso;
        callback();
    };
    var loader = new GLTFLoader(manager);
    // Load Hair/Hats
    loader.load('/res/models/badHair.glb', function (gltf) {
        gltf.scene.traverse(function (node) {
            hat.add(node.clone());
            if (node.material)
                hairOptions.push(node.name);
        });
    }, undefined, function (error) {
        console.error(error);
    });
    // Load items/weapons
    loader.load('/res/models/Items.glb', function (gltf) {
        gltf.scene.traverse(function (node) {
            bagOfHolding.add(node.clone());
        });
    }, undefined, function (error) {
        console.error(error);
    });
    // Load Torso accessories
    loader.load('/res/models/TorsoStuff.gltf', function (gltf) {
        gltf.scene.traverse(function (node) {
            torso.add(node.clone());
        });
    }, undefined, function (error) {
        console.error(error);
    });
    // Load Font
    var floader = new THREE.FontLoader();
    floader.load('/res/fonts/droid_sans_regular.typeface.json', function (font) {
        baseMeshes.Font = font;
    });
}
function updateHumanoid(person, personInfo, gear = new Gear(0, 0, 0)) {
    var scale, headScale, armScale, torsoScale, legScale;
    person.name = personInfo.name;
    person.userData.hairStyle = personInfo.hairstyle;
    person.userData.beardstyle = personInfo.beardstyle;
    person.userData.hairColor = personInfo.haircolor;
    person.userData.skinColor = personInfo.skincolor;
    person.userData.race = personInfo.race;
    person.userData.gender = personInfo.gender;
    person.userData.texture = personInfo.texture;
    person.userData.scale = {
        size: personInfo.scale,
        head: personInfo.headScale,
        arm: personInfo.armScale,
        torso: personInfo.torsoScale,
        leg: personInfo.legScale
    };
    scale = personInfo.scale;
    headScale = personInfo.headScale;
    armScale = personInfo.armScale;
    torsoScale = personInfo.torsoScale;
    legScale = personInfo.legScale;
    var material;
    if (personInfo.texture != undefined) {
        if (personInfo.texture.constructor === Array) {
            material = FOUR.Material({
                color: 0xffffff,
                map: FOUR.Texture(personInfo.texture[0]),
                bumpMap: FOUR.Texture(personInfo.texture[1]),
                specularMap: FOUR.Texture(personInfo.texture[2]),
                specular: 0xeeeeee,
                bumpScale: 0.005,
                shininess: 30,
                alphaTest: 0.5,
                morphTargets: true,
                skinning: true,
                name: 'texture',
                shadowSide: THREE.FrontSide,
            });
        }
        else {
            material = FOUR.Material({
                map: FOUR.Texture(personInfo.texture),
                // shininess: 30,
                // specular:0x666666,
                color: 0xffffff,
                alphaTest: 0.5,
                morphTargets: true,
                skinning: true,
                name: 'texture',
            });
        }
    }
    // removeFromBone(person, "Skeleton_spinelower", "Tail");
    // removeFromBone(person, "Skeleton_wristr", "rightItem");
    cleanBone(person, "wristr");
    cleanBone(person, "wristl");
    cleanBone(person, "spineupper");
    cleanBone(person, "spinelower");
    cleanBone(person, "hatHolder");
    if (personInfo.tail != undefined) {
        let item = getTorso(personInfo.tail.style, personInfo.tail.size, personInfo.tail.color);
        item.name = "Tail";
        person.getObjectByName("spinelower").add(item);
    }
    if (gear.righthand != 0) {
        let item = getItem(gear.righthand, scale);
        item.name = "rightItem";
        item.rotation.z = Math.PI;
        person.getObjectByName("wristr").add(item);
    }
    // Add gear to Left Hand
    if (gear.lefthand != 0) {
        person.getObjectByName("wristl").add(getItem(gear.lefthand, scale));
    }
    ;
    // Add ears to head
    if (personInfo.ears != undefined) {
        person.getObjectByName("hatHolder").add(getHair(personInfo.ears.size, personInfo.ears.style, personInfo.ears.color));
    }
    ;
    person.traverse(function (node0) {
        let node = node0;
        node.castShadow = true;
        node.receiveShadow = true;
        //@ts-ignore
        if (node.material && (node.material.isMeshStandardMaterial || node.material.name == 'texture') && (node.name == "Torso" || node.name == "EyeLids")) {
            node.material = material;
            node.material.transparent = true;
            node.material.needsUpdate = true;
            node.castShadow = true;
            node.receiveShadow = true;
            node.receiveShadow = false;
            node.frustumCulled = false;
        }
        if (node.name == 'skull') {
            node.scale.set(headScale.x, headScale.y, headScale.z);
        }
        else if (node.name == 'upperArml') {
            node.scale.set(armScale.x, armScale.y, armScale.z);
        }
        else if (node.name == 'spineupper') {
            switch (personInfo.race) {
                case 'tortle':
                    var torso = getTorso("Shell", 1, FOUR.Color(0x272918));
                    torso.name = "Shell";
                    node.add(torso);
                    break;
                case 'aarakocra':
                    var torso = getTorso("BirdWings_2", 1, FOUR.Color(0xeeeeee));
                    torso.name = "Wings";
                    node.add(torso);
                    break;
                default:
                    break;
            }
            if (gear.back != 0 && gear.back != undefined) {
                var item = getTorso(gear.back, scale);
                item.name = "backItem";
                node.add(item);
            }
        }
        else if (node.name == 'hatHolder') {
            let head;
            if (personInfo.race !== "aarakocra" && personInfo.race !== "bloodfin" && personInfo.race !== "grung" && personInfo.race !== "kenku" && personInfo.race !== "tortle") {
                if (personInfo.hairstyle != undefined) {
                    var hair = getHair(1, personInfo.hairstyle, personInfo.haircolor);
                    hair.name = "hair";
                    node.add(hair);
                }
                if (personInfo.beardstyle != undefined) {
                    var beard = getHair(1, personInfo.beardstyle, personInfo.haircolor);
                    beard.name = "beard";
                    node.add(beard);
                }
            }
            switch (personInfo.race) {
                case 'bloodfin':
                    head = getHair(1, "Head_Shark", personInfo.skincolor);
                    head.name = "HeadMesh";
                    node.add(head);
                    break;
                case 'grippli':
                case 'grung':
                case 'kenku':
                    head = getHair(1, "Frog_Head", 0xffffff);
                    head.name = "HeadMesh";
                    head.material.map = material.map;
                    head.material.bumpMap = FOUR.Texture("/res/models/Advanced/skin_grung_bump.png");
                    head.material.bumpScale = 0.1;
                    head.material.needsUpdate = true;
                    node.add(head);
                    break;
                case 'aarakocra':
                    var beak = getHair(1, "Beak", 0xffcc33);
                    beak.name = "beak";
                    node.add(beak);
                    break;
                case 'tiefling':
                    var horns = getHair(1, "Tiefling_Horns", 0x443326);
                    horns.name = "horns";
                    node.add(horns);
                    break;
                default:
                    break;
            }
        }
        else if (node.name == 'Torso') {
            /** */
            //This is only temporarily commented out. Will be readded once the new model is done
            if (useMorphTargets && node.morphTargetInfluences && node.morphTargetDictionary) {
                node.morphTargetInfluences[node.morphTargetDictionary.LadyChest] = personInfo.ladychest;
                node.morphTargetInfluences[node.morphTargetDictionary.Weight] = personInfo.weight;
                node.morphTargetInfluences[node.morphTargetDictionary.Caboose] = personInfo.caboose;
                node.morphTargetInfluences[node.morphTargetDictionary.Waist] = Math.min(personInfo.caboose * 0.7, 1);
                node.morphTargetInfluences[node.morphTargetDictionary.Pants] = personInfo.pants;
                node.morphTargetInfluences[node.morphTargetDictionary.Chin_Height] = 1;
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
            /* */
        }
        else if (node.name == 'Root') {
            // var oldScale = node.scale;
            // node.position.y = (node.position.y/oldScale.y);
            // node.position.z = (node.position.z/oldScale.z);
            node.scale.set(scale.x, scale.z, scale.y);
            // node.position.y = node.position.y * scale.y;
            // node.position.z = node.position.z * scale.z;
        }
    });
    return person;
}
function applyScale(person, personInfo) {
    personInfo = personInfo || {};
    var scale, headScale, armScale, torsoScale, legScale;
    scale = personInfo.scale || person.userData.scale.size;
    headScale = personInfo.headScale || person.userData.scale.head;
    armScale = personInfo.armScale || person.userData.scale.arm;
    torsoScale = personInfo.torsoScale || person.userData.scale.torso;
    legScale = personInfo.legScale || person.userData.scale.leg;
    person.traverse(function (node) {
        if (node.name == 'skull') {
            node.scale.set(headScale.x, headScale.y, headScale.z);
        }
        else if (node.name == 'upperArml') {
            node.scale.set(armScale.x, armScale.y, armScale.z);
        }
        else if (node.name == 'upperArmr') {
            node.scale.set(armScale.x, armScale.y, armScale.z);
        }
        else if (node.name == 'Root') {
            node.scale.set(scale.x, scale.z, scale.y);
        }
    });
    return person;
}
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
function cleanBone(parent, boneName) {
    try {
        const bone = parent.getObjectByName(boneName);
        if (bone != undefined) {
            for (var i = bone.children.length - 1; i >= 0; i--) {
                if (bone.children[i].type == "Mesh")
                    bone.remove(bone.children[i]);
            }
        }
    }
    catch (error) {
        console.warn("An oops happened while cleaning this bone.");
    }
}
function writeText(text, scale) {
    scale = scale || new THREE.Vector3(1, 1, 1);
    var pivot = new THREE.Object3D();
    var geometry = new THREE.TextGeometry(text, {
        font: baseMeshes.Font,
        size: 3,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelSegments: 1
    });
    var textObj = new THREE.Mesh(geometry, [new THREE.MeshToonMaterial({ color: 0x000000, emissive: 0xffffff, visible: true, }), new THREE.MeshToonMaterial({ color: 0x000000, emissive: 0x000000, visible: true, })]);
    pivot.name = "CharacterName";
    pivot.scale.x = 0.1;
    pivot.scale.y = 0.1;
    pivot.scale.z = 0.1;
    pivot.userData.scaleX = 0.1;
    pivot.userData.scaleY = 0.1;
    pivot.userData.scaleZ = 0.1;
    pivot.visible = false;
    textObj.name = "InnerPivot";
    var box = new THREE.Box3().setFromObject(textObj);
    textObj.position.set(-box.getSize(new THREE.Vector3(0, 0, 0)).x / 2, 0, -box.getSize(new THREE.Vector3(0, 0, 0)).z / 2);
    pivot.position.set(0, 2 * scale.y, 0);
    pivot.add(textObj);
    return pivot;
}
// var Person3D = function() {
//     // Run the Mesh constructor with the given arguments
// 	THREE.Mesh.apply(this, arguments);
// 	this.type = "Person3D";
// };
// // Make MyObject3D have the same methods as Mesh
// Person3D.prototype = Object.assign(Object.create(THREE.Mesh.prototype));
// // Make sure the right constructor gets called
// Person3D.prototype.constructor = Person3D;
// Person3D.prototype.setHair = function(event, hairStyle, hairColor) {
// 	var me = this;
// 	me.traverse(function(thing) {
// 		if (thing.name = "Head1") {
// 			var hair = getHair(1, "Warhawk", 0xffffff);
// 			thing.add(hair);
// 		}
// 	});
// };
function setHair(target, hairStyle, hairColor) {
    hairStyle = hairStyle || target.userData.hairStyle || randomize(["Floppy_Pony", "Floppy", "Warhawk", "Pixie_Cut"]);
    hairColor = hairColor || target.userData.hairColor || randomize([0xff0000, 0xffffff, 0x00ff00, 0x0000ff, 0xff00ff]);
    removeFromBone(target, "hatHolder", "hair");
    var hair = getHair(1, hairStyle, hairColor);
    hair.name = "hair";
    target.userData.hairStyle = hairStyle;
    target.userData.hairColor = hairColor;
    target.getObjectByName("hatHolder").add(hair);
}
function setTexture(target, textureURL = "/res/models/Advanced/skin_adventurerAlt.png") {
    target.traverse(function (node0) {
        let node = node0;
        if (node.material && node.name == "Torso") {
            node.material = FOUR.Material({
                map: FOUR.Texture(textureURL),
                shininess: 0,
                morphTargets: true,
                skinning: true,
            });
            node.castShadow = true;
            node.receiveShadow = true;
            node.material.needsUpdate = true;
        }
    });
}
function setRace(target, race) {
    race = race || randomize(races);
    var charBase = new Person(target.name, race, undefined, target.userData.gender, target.userData.hairStyle, target.userData.hairColor, target.userData.beard, undefined, target.userData.weight, target.userData.themecolor, target.userData.type);
    updateHumanoid(target, charBase);
}
function setGender(target, newGender) {
    var gender = target.userData.gender == 'f' ? 'm' : 'f';
    newGender = newGender || gender;
    var charBase = new Person(target.name, target.userData.race, target.userData.texture, newGender, target.userData.hairStyle, target.userData.hairColor, target.userData.beard, undefined, target.userData.weight, target.userData.themecolor, target.userData.type);
    updateHumanoid(target, charBase);
}
function changeRace(target, race) {
    setRace(target, race);
}
function changeGender(target, newGender) {
    setGender(target, newGender);
}
function getSprite(x, y, z, texture, size, name) {
    texture = texture || "/img/characters/npc/Smith.png";
    size = size || 1;
    name = name || "???";
    var spriteMap = FOUR.Texture(texture);
    var sprite = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshPhongMaterial({ map: spriteMap, transparent: true, side: THREE.DoubleSide, color: 0xffffff, }));
    sprite.position.set(0, size / 2, 0);
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
        color: 0x777777,
        emissive: 0x000000,
        side: THREE.DoubleSide,
        shininess: 30,
    }));
    base.position.set(Math.floor(x) + 0.5, y, Math.floor(z) + 0.5);
    base.castShadow = true;
    base.receiveShadow = true;
    base.userData.draggable = true;
    var text = writeText(name, new THREE.Vector3(size, size, size));
    base.add(text);
    base.add(sprite);
    return base;
}
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
    var text = writeText('Undead Horde # ' + count);
    text.position.set(0, 4, 0);
    base.add(text);
    base.add(sprite);
    base.add(sprite2);
    return base;
}
function getName(race, gender, age = 0) {
    const newnpc = new NPC(undefined, race, gender, age);
    return newnpc.name;
}
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
    var text = writeText("Gearbox", new THREE.Vector3(1, 1, 1));
    person.add(text);
    return person;
}
function getBear(x = 0, y = 0, z = 0) {
    var person = new THREE.Object3D();
    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
        person.userData.draggable = true;
    };
    var loader = new GLTFLoader(manager);
    loader.load('/res/models/bear.glb', function (gltf) {
        person.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
    person.position.x = Math.floor(x) + 0.5;
    person.position.y = y;
    person.position.z = Math.floor(z) + 0.5;
    person.name = "Ursa";
    var text = writeText("Ursa", new THREE.Vector3(1, 1, 1));
    person.add(text);
    return person;
}
function getLizard(x = 0, y = 0, z = 0) {
    var person = new THREE.Object3D();
    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
        person.userData.draggable = true;
    };
    var loader = new GLTFLoader(manager);
    loader.load('/res/models/lizard.glb', function (gltf) {
        person.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
    person.position.x = Math.floor(x) + 0.5;
    person.position.y = y;
    person.position.z = Math.floor(z) + 0.5;
    person.name = "j";
    var text = writeText("j", new THREE.Vector3(1, 1, 1));
    person.add(text);
    return person;
}
function getYamask(x = 0, y = 0, z = 0) {
    var person = new THREE.Object3D();
    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
        person.userData.draggable = true;
    };
    var loader = new GLTFLoader(manager);
    loader.load('/res/models/yamask.glb', function (gltf) {
        person.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
    person.position.x = Math.floor(x) + 0.5;
    person.position.y = y;
    person.position.z = Math.floor(z) + 0.5;
    person.name = "j";
    var text = writeText("j", new THREE.Vector3(1, 1, 1));
    person.add(text);
    return person;
}
export { PersonLoader, Person3D, Person, PersonPhysicalFeature, FOUR, getPC, getRandom, getBear, getLizard, getYamask };
//# sourceMappingURL=characters.js.map