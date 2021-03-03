import * as THREE from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from '../../../node_modules/three/examples/jsm/utils/SkeletonUtils.js';
import { FOUR } from './four.js';

declare var races: string[];
declare function randomize(array: any): string;
declare var chance: Function;
declare var arrayAppend: Function;
declare var NPC: any;
export module Characters
{
	const genders = "fm";
	const useMorphTargets = true;
	$(document).ready(function(){
		new THREE.TextureLoader().load("/res/models/Advanced/gradient.png", function (texture)
		{
			FOUR.Gradient = texture;
			FOUR.Gradient.minFilter = THREE.LinearFilter;
			FOUR.Gradient.magFilter = THREE.LinearFilter;
			FOUR.Gradient.flipY = false;
		});
	});
	// Mesh variables
	var baseMeshes: {
		Human: Person3D,
		Hair: THREE.Object3D,
		Torso: THREE.Object3D,
		Item: THREE.Object3D
	} = {
		Human: new THREE.Object3D() as Person3D,
		Hair: new THREE.Object3D(),
		Torso: new THREE.Object3D(),
		Item: new THREE.Object3D()
	}
	var pcData: PCData[];

	// List Variables
	export var hairOptions: string[] = [];

	export class Hair
	{
		color: string;
		style: string;
		texture?: string;
		constructor(style: string, color: number | string = 0x2f2f2f, texture?: string)
		{
			this.color = typeof color == "number" ? "#" + color.toString(16) : color;
			this.style = style;
			this.texture = texture;
		}
	}

	export class EquipmentModel
	{
		style: string = "";
		color: string|number = 0x000000;
		relative: boolean = false;
	}

	export class PersonPhysicalFeature
	{
		style: string;
		size: THREE.Vector3;
		color: number;
		relative: boolean;
		constructor(style: string, size: number|THREE.Vector3, color: number|string, relative?: boolean)
		{
			this.style = style;
			if (typeof size === typeof THREE.Vector3) {
				this.size = size as THREE.Vector3;
			}
			else
			{
				this.size = new THREE.Vector3(size as number, size as number, size as number);
			}
			this.color = getColorNumber(color);
			if (relative != undefined) {
				this.relative = relative;
			} else
			{
				this.relative = true;
			}
		}
	}

	export class Person {
		race: string;
		texture?: string|string[];
		gender: string;
		hair: Hair[] = [];
		hairstyle?: Hair[];
		haircolor?: number;
		beardstyle?: string;
		skincolor: string|number;
		themecolor: THREE.Color;
		type?: string;
		name: string;
		scale: THREE.Vector3;
		headScale: THREE.Vector3;
		armScale: THREE.Vector3;
		torsoScale: THREE.Vector3;
		legScale: THREE.Vector3;
		ladychest: number = 0;
		weight: number = 0;
		pants: number = 0;
		caboose: number = 0;
		ears?:PersonPhysicalFeature;
		tail?:PersonPhysicalFeature;
		constructor(name?: string, race?: string, textureURL?: string|string[], gender?: string, hairstyle?: Hair[], haircolor?: string|number, beardstyle?: string, skincolor?:string|number, weight?:number, themecolor:number|string = 0x999999, type?:string, ladychest?: number) {
			this.race = race || races[Math.floor(Math.random() * races.length)];
			this.texture = textureURL;
			this.gender = gender || genders.charAt(Math.floor(Math.random() * 2));
			this.hairstyle = hairstyle;
			this.beardstyle = beardstyle;
			if (skincolor != undefined)
				this.skincolor = skincolor;
			this.themecolor = FOUR.Color(themecolor);
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
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_aarakocra_f.png";
						this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0.3;
						this.caboose = 0.1;
					}
					haircolor = haircolor || 0xefefe0;
					this.skincolor = skincolor || 0xffffe7;
					this.weight = weight || 0.3;
					break;
				case "aasimar":
					haircolor = haircolor || 0xfbe7b2;
					this.skincolor = skincolor || 0x1abc9c;
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_aasimar_m.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Basic_Short", "Flat_Spiked", "Spiky_2"]),
							haircolor as number
						)];
						this.scale = new THREE.Vector3(1, 1, 1);
						this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.pants = this.pants || 1;
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_aasimar_f.png";
						// this.hairstyle = hairstyle || randomize(["Elven_Braid", "Long_Formal", ["Spiky_2", "Spiky_Tail"], "Spiky_Pony"]);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Elven_Braid", "Long_Formal", "Spiky_Pony"]),
							haircolor as number
						)];
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
					} else {
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
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_bugbear_f.png";
					}
					this.hairstyle = hairstyle || [new Hair("Warhawk", 0x996e52)];
					this.skincolor = skincolor || 0xd27d46;
					haircolor = haircolor || 0x996e52;
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
					haircolor = haircolor || 0x694c39;
					if (this.gender == "m") {
						this.hairstyle = hairstyle || [new Hair(
							randomize([null, "Super_Short"]),
							haircolor as number
						)];
						this.beardstyle = beardstyle || "Dwarf_Beard";
						this.texture = textureURL || "/res/models/Advanced/skin_dwarf_m.png";
						this.ladychest = ladychest || 0;
					} else {
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Elven_Braid", "Farmers_Daughter", "Long_Curly"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_dwarf_f.png";
						this.ladychest = ladychest || 0.4;
						this.caboose = 1;
					}
					this.weight = weight || 0.4;
					this.scale = new THREE.Vector3(1, 0.75, 1);
					this.headScale = new THREE.Vector3(1, 1.33, 1);
					this.armScale = new THREE.Vector3(0.9, 1.1, 0.9);
					this.torsoScale = new THREE.Vector3(1, 1, 1);
					this.legScale = new THREE.Vector3(1, 1, 1);
					break;
				case "drow":
					haircolor = haircolor || 0xefefff;
					this.skincolor = skincolor || 0x4c668a;
					if (this.gender == "m") {
						// this.texture = textureURL || "/res/models/Advanced/skin_drow_m.png";
						this.texture = textureURL || "/res/models/Advanced/skin_drow_m2.png";
						this.hairstyle = hairstyle || [new Hair("Floppy", haircolor as number)];
						this.scale = new THREE.Vector3(1, 1.05, 1);
						this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_drow_f2.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Bob", "Elven_Braid", "Long_Pony", "Pixie_Cut"]),
							haircolor as number
						)];
						this.scale = new THREE.Vector3(0.9, 1, 0.9);
						this.headScale = new THREE.Vector3(1, 0.9, 1);
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
					// haircolor = haircolor || 0xfbe7b2;
					haircolor = haircolor || randomize([0xfbe7b2, 0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
					this.skincolor = skincolor || 0xffe0b1;
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_elf_m.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Basic_Short", "Floppy"]),
							haircolor as number
						)];
						this.scale = new THREE.Vector3(1, 1.05, 1);
						this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_elf_f.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Elven_Braid", "Floppy_Pony", "Long_Formal"]),
							haircolor as number
						)];
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
					haircolor = haircolor || 0x222222;
					this.skincolor = skincolor || 0x926cc5;
					this.scale = new THREE.Vector3(1.2, 1.2, 1.2);
					this.headScale = new THREE.Vector3(1, 1, 1);
					this.armScale = new THREE.Vector3(1, 1, 1);
					this.torsoScale = new THREE.Vector3(1, 1, 1);
					this.legScale = new THREE.Vector3(1, 1, 1);
					this.weight = weight || 0.3;
					if (this.gender == "m") {
						this.scale = new THREE.Vector3(1.2, 1.2, 1.2);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Basic_Short", "Floppy", "Short_SidePart"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_firbolg_m.png";
						this.caboose = 0;
						this.ladychest = ladychest || 0;
					} else {
						this.scale = new THREE.Vector3(1.15, 1.15, 1.15);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Floppy_Pony", "Floppy", "Pixie_Cut"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_firbolg_f.png";
						this.caboose = 1;
						this.ladychest = ladychest || 0.7;
					}
					this.weight = weight || 0.6;
					break;
				case "gnome":
					if (this.gender == "m") {
						haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4, 0xffedee, 0x3370d0, 0xffaaaa, 0x00ed77]);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Afro", "Basic_Short", "Floppy", "Short_SidePart", "Spiky"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_gnome_m.png";
						this.caboose = 0;
						this.ladychest = ladychest || 0;
					} else {
						haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4, 0xffedee, 0x3370d0, 0xffaaaa, 0x00ed77, 0xc000c4, 0x00c0c4]);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Bob", "Floppy_Pony", "Floppy", "Long_Pony", "Pixie_Cut"]),
							haircolor as number
						)];
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
					} else {
						this.hairstyle = hairstyle || [new Hair("Short_Messy")];
						this.ladychest = ladychest || 0.3;
						this.caboose = 0.3;
					}
					this.texture = textureURL || "/res/models/Advanced/skin_goblin.png";
					haircolor = haircolor || 0x111111;
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
					haircolor = haircolor || 0x01a368;
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
					haircolor = haircolor || 0x1560bd;
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
					haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
					this.scale = new THREE.Vector3(0.45, 0.45, 0.45);
					this.headScale = new THREE.Vector3(1.4, 1.4, 1.4);
					this.armScale = new THREE.Vector3(1, 1, 1);
					this.torsoScale = new THREE.Vector3(1, 1, 1);
					this.legScale = new THREE.Vector3(1, 1, 1);
					this.weight = weight || 0.3;
					if (this.gender == "m") {
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Basic_Short", "Floppy", "Short_SidePart"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_halfling_m.png";
						this.caboose = 0;
						this.ladychest = ladychest || 0;
					} else {
						// this.hairstyle = hairstyle || randomize(["Farmers_Daughter", "Floppy_Pony", ["Floppy", "Spiky_Tail"], "Granny_Bun", "Pixie_Cut"]);
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Farmers_Daughter", "Floppy_Pony", "Granny_Bun", "Pixie_Cut"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_halfling_f.png";
						this.caboose = 1;
						this.ladychest = ladychest || 0.7;
					}
					break;
				case "halforc":
					haircolor = haircolor || 0x111111;
					this.skincolor = skincolor || 0x1abc9c;
					this.weight = weight || 0.5;
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_halforc_m.png";
						this.scale = new THREE.Vector3(1.04, 1.04, 1.04);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.hairstyle = hairstyle || [new Hair("Warhawk", haircolor as number)];
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_halforc_f.png";
						this.scale = new THREE.Vector3(1, 1, 1);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.hairstyle = hairstyle || [new Hair("Short_Messy", haircolor as number)];
						this.caboose = 1;
						this.ladychest = ladychest || 1;
					}
					break;
				case "kenku":
					haircolor = haircolor || 0x111111;
					this.skincolor = skincolor || 0x111111;
					if (this.gender == "m") {
						this.hairstyle = hairstyle || undefined;
						this.texture = textureURL || "/res/models/Advanced/skin_kenku_m.png";
						this.scale = new THREE.Vector3(1, 1, 1);
						this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
					} else {
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
					haircolor = haircolor || randomize([0xfbe7b2, 0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe7574a, 0xe4c080, 0xf1d8a4]);
					this.skincolor = skincolor || 0xffe0b1;
					this.tail = new PersonPhysicalFeature("WolfTail", 1, haircolor);
					this.ears = new PersonPhysicalFeature("Cat_Ears", 1, haircolor);
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_elf_m.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Basic_Short", "Floppy"]),
							haircolor as number
						)];
						this.scale = new THREE.Vector3(1, 1.05, 1);
						this.headScale = new THREE.Vector3(0.9, 0.85, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_elf_f.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Elven_Braid", "Floppy_Pony", "Long_Formal"]),
							haircolor as number
						)];
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
						this.hairstyle = hairstyle || [new Hair("Warhawk", haircolor as number)];
						this.scale = new THREE.Vector3(1.5, 1.5, 1.5);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_orc_f.png";
						this.hairstyle = hairstyle || [new Hair("Short_Messy", haircolor as number)];
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
					haircolor = haircolor || randomize([0xe6be8a, 0xd69d53, 0xd78d2e, 0xFFF5E1]);
					this.skincolor = skincolor || 0xe6be8a;
					this.weight = weight || 0.1;
					this.ears = new PersonPhysicalFeature("Cat_Ears", 1, this.skincolor);
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_tabaxi.png";
						this.hairstyle = hairstyle || [new Hair("Warhawk", haircolor as number)];
						this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.headScale = new THREE.Vector3(1.1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.texture = textureURL || "/res/models/Advanced/skin_tabaxi.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Pixie_Cut", "Warhawk"]),
							haircolor as number
						)];
						this.scale = new THREE.Vector3(0.85, 0.85, 0.85);
						this.headScale = new THREE.Vector3(1.1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.caboose = 0.2;
						this.ladychest = ladychest || 0.2;
					}
					break;
				case "tiefling":
					this.skincolor = skincolor || 0xca3435;
					if (this.gender == "m") {
						this.texture = textureURL || "/res/models/Advanced/skin_tiefling_m.png";
						haircolor = haircolor || randomize([0x0100003, 0x5f1919]);
						this.hairstyle = hairstyle || [new Hair("Flat_Spiked", haircolor as number)];
						this.scale = new THREE.Vector3(1, 1, 1);
						this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						haircolor = haircolor || randomize([0x0100003, 0x5f1919, 0x360e36]);
						this.texture = textureURL || "/res/models/Advanced/skin_tiefling_f.png";
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Long_Pony", "Pixie_Cut"]),
							haircolor as number
						)];
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
					haircolor = haircolor || 0x00755e;
					this.hairstyle = hairstyle || [new Hair(
						randomize(["Dreads", undefined]),
						haircolor as number
					)];
					this.texture = textureURL || "/res/models/Advanced/skin_tortle_m.png";
					this.scale = new THREE.Vector3(1, 1, 1);
					this.headScale = new THREE.Vector3(1, 1, 1);
					this.armScale = new THREE.Vector3(1, 1, 1);
					this.torsoScale = new THREE.Vector3(1, 1, 1);
					this.legScale = new THREE.Vector3(1, 1, 1);
					this.ladychest = ladychest || 0;
					this.skincolor = skincolor || 0x009dc4;
					this.weight = weight || 0.1;
					break;
				case "triton":
					haircolor = haircolor || 0x00755e;
					if (this.gender == "m") {
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Dreads", "Long_Curly"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_triton_m.png";
						this.scale = new THREE.Vector3(0.95, 0.95, 0.95);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Dreads", "Long_Curly"]),
							haircolor as number
						)];
						this.texture = textureURL || "/res/models/Advanced/skin_triton_f.png";
						this.scale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.headScale = new THREE.Vector3(1, 1, 1);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.caboose = 1.4;
						this.ladychest = ladychest || 0.5;
					}
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
					haircolor = haircolor || randomize([0xc6b088, 0xd4946b, 0x0100003, 0x694c39, 0x412e23, 0xe4c080, 0xf1d8a4]);

					if (this.gender == "m") {
						this.hairstyle = hairstyle || [new Hair("Flat_Spiked", haircolor as number)];
						this.texture = textureURL || randomize(["/res/models/Advanced/skin_human_m.png", "/res/models/Advanced/skin_human_m.png"]);
						this.scale = new THREE.Vector3(1, 1, 1);
						this.headScale = new THREE.Vector3(0.9, 0.9, 0.9);
						this.armScale = new THREE.Vector3(1, 1, 1);
						this.torsoScale = new THREE.Vector3(1, 1, 1);
						this.legScale = new THREE.Vector3(1, 1, 1);
						this.ladychest = ladychest || 0;
					} else {
						this.hairstyle = hairstyle || [new Hair(
							randomize(["Floppy_Pony", "Granny_Bun", "Pixie_Cut"]),
							haircolor as number
						)];
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
			if (haircolor != undefined) {
				this.haircolor = getColorNumber(haircolor)
			}
		}
	}

	export interface PCData
	{
		id: string;
		name: string;
		race: string;
		type: string;
		texture: string;
		gender: string;
		hairstyle: Hair[];
		haircolor: string;
		beard: string;
		skincolor: string;
		righthand: number;
		lefthand: number;
		back: number;
		weight: number;
		donk: number;
		fronk: number;
		themecolor: string;
	}

	export class Gear
	{
		righthand: number = 0;
		lefthand: number = 0;
		back: number = 0;
		constructor(rightHand: number = 0, leftHand: number = 0, back: number = 0, race?: string)
		{
			this.righthand = rightHand;
			this.lefthand = leftHand;
			this.back = back;

			switch (race)
			{
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

	export class Person3D extends THREE.Mesh
	{
		animations: THREE.AnimationClip[] = [];
		personId: string = "";
		_equipment: Person3DEquipment | undefined;
		_hatHolder: THREE.Bone | undefined;
		_animation: string = "";
		constructor(geometry?: THREE.Geometry | THREE.BufferGeometry | undefined, material?: THREE.Material | THREE.Material[] | undefined)
		{
			super(geometry, material);
		}
		get animation() {
			return this._animation;
		}
		set animation(clipName)
		{
			if (this.userData.mixer && this._animation != clipName) {
				this._animation = clipName;
				this.userData.mixer.stopAllAction();
				var clip = THREE.AnimationClip.findByName( this.animations, clipName );
				this.userData.mixer.clipAction( clip ).play();
			}
		}
		get gender(): string
		{
			return this.userData.gender;
		}
		set gender(newGender: string)
		{
			if (this.userData.gender != newGender && (newGender == 'm' || newGender == 'f')) {
				var charBase = new Person(this.name, this.userData.race, this.userData.texture, newGender, this.userData.hairStyle, this.userData.hairColor, this.userData.beard, undefined, this.userData.weight, this.userData.themecolor, this.userData.type);
				updateHumanoid(this, charBase);
			}
		}
		toggleGender() {
			var gender = this.userData.gender == 'f' ? 'm' : 'f';
			this.gender = gender;
		}
		setHair(hairStyle: string, hairColor?: number|string) {
			hairStyle = hairStyle || this.userData.hairStyle || randomize(["Floppy_Pony", "Floppy", "Warhawk", "Pixie_Cut"]);
			hairColor = hairColor || this.userData.hairColor || randomize([0xff0000, 0xffffff, 0x00ff00, 0x0000ff, 0xff00ff]);
			removeFromBone(this, "hatHolder", "hair");

			this.userData.hairStyle = [new Hair(hairStyle, hairColor)];
			var hair = getHair(1, this.userData.hairStyle[0]);
			hair.name = "hair"
			this.userData.hairColor = hairColor;

			var hatrack = this.hatHolder;

			hatrack.add(hair);
		}

		setRace(race: string) {
			race = race || randomize(races);
			var charBase = new Person(this.name, race, undefined, this.userData.gender, this.userData.hairStyle, this.userData.hairColor, this.userData.beard, undefined, this.userData.weight, this.userData.themecolor, this.userData.type);
			updateHumanoid(this, charBase);
		}
		setMorphTargets(personInfo: Person)
		{
			let node = this.mesh;
			if (useMorphTargets && node.morphTargetInfluences && node.morphTargetDictionary) {
				node.morphTargetInfluences[node.morphTargetDictionary.LadyChest] = personInfo.ladychest;
				node.morphTargetInfluences[node.morphTargetDictionary.Weight] = personInfo.weight;
				node.morphTargetInfluences[node.morphTargetDictionary.Caboose] = personInfo.caboose;
				node.morphTargetInfluences[node.morphTargetDictionary.Waist] = Math.min(personInfo.caboose * 0.7, 1);
				node.morphTargetInfluences[node.morphTargetDictionary.Pants] = personInfo.pants;
				node.morphTargetInfluences[node.morphTargetDictionary.Chin_Height] = 1;
				if (personInfo.race == 'aarakocra' || personInfo.race == 'tortle') {
					node.morphTargetInfluences[node.morphTargetDictionary.BirdHead] = 1;
				} else {
					node.morphTargetInfluences[node.morphTargetDictionary.BirdHead] = 0;
				}

				if (personInfo.race == 'bloodfin' || personInfo.race == 'grippli' || personInfo.race == 'grung' || personInfo.race == 'kenku') {
					node.morphTargetInfluences[node.morphTargetDictionary.Headless] = 1;
				} else {
					node.morphTargetInfluences[node.morphTargetDictionary.Headless] = 0;
				}
			}
		}
		get mesh(): THREE.Mesh
		{
			return this.getObjectByName("Torso") as THREE.Mesh;
		}
		get hatHolder(): THREE.Bone
		{
			if (this._hatHolder == undefined)
			{
				this._hatHolder = this.getObjectByName("hatHolder") as THREE.Bone;
			}
			return this._hatHolder;
		}
		get texture(): string|string[]
		{
			return this.userData.texture;
		}
		set texture(textureURL: string|string[])
		{
			if (this.texture != textureURL)
			{
				this.userData.texture = textureURL
				let materia = this.mesh.material as THREE.MeshPhongMaterial;
				if (textureURL.constructor === Array) {
					materia.map = FOUR.Texture(textureURL[0]);
						// bumpMap: FOUR.Texture(textureURL[1]),
						// specularMap: FOUR.Texture(textureURL[2]),
				}
				else {
					materia.map = FOUR.Texture(textureURL as string);
				}
				materia.needsUpdate = true;
			}
		}
		get equipment(): Person3DEquipment
		{
			if (this._equipment == undefined)
			{
				this._equipment = new Person3DEquipment(this);
			}
			return this._equipment;
		}
	}

	export class Person3DEquipment
	{
		parent: Person3D;
		constructor(parent: Person3D)
		{
			this.parent = parent;
		}
		get rightHand(): THREE.Mesh|undefined
		{
			let result = (this.parent.getObjectByName("wristr") as THREE.Object3D).getObjectByName("rightItem");
			if (result != undefined) {
				return result as THREE.Mesh;
			}
			return undefined;
		}
		set rightHand(item: THREE.Mesh|undefined)
		{
			cleanBone(this.parent, "wristr");
			if (item != undefined)
			{
				item.name = "rightItem";
				item.rotation.z = Math.PI;
				(this.parent.getObjectByName("wristr") as THREE.Object3D).add(item);
			}
		}
	}

	export class MiniatureBase extends THREE.Mesh
	{
		constructor(x:number = 0, y: number = 0, z: number = 0)
		{
			super(
				new THREE.CylinderGeometry(0.5, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
					color: 0x777777,
					emissive: 0x000000,
					side: THREE.DoubleSide,
					shininess: 30,
				})
			);
			this.position.set(
				Math.floor(x) + 0.5,
				y,
				Math.floor(z) + 0.5
			);
			this.castShadow = true;
			this.receiveShadow = true;
			this.userData.draggable = true;
		}
	}

	const equipment: EquipmentModel[] = [
		{style:'Sword',color:"/res/models/Advanced/sword.png",relative:true},
		{style:'ShieldFancy',color:0x999999,relative:true},
		{style:'Kite_Shield',color:0x112244,relative:true},
		{style:'Staff',color:0xbaa099,relative:true},
		{style:'Trident',color:0x206688,relative:true},
		{style:'Dagger',color:0x668820,relative:false},
		{style:'Mace',color:0x775520,relative:true},
		{style:'Bow',color:0xbaa099,relative:true},
		{style:'Book',color:0xde02de,relative:true},
		{style:'LaserSword',color:"/res/models/Advanced/sword.png",relative:true},
		{style:'Blaster',color:"/res/models/Advanced/paralyzer.png",relative:true},
	];

	const backEquipment: EquipmentModel[] = [
		{style:'Shell',color:0x272918,relative:true},
		{style:'BirdWings_1',color:0xffffff,relative:true},
		{style:'Cape',color:0xdd1133,relative:true},
		{style:'Cape',color:0x6194d3,relative:true},
		{style:'angu_22',color:0xffffff,relative:true}
	];

	function getColorNumber(color: number|string): number
	{
		var result;
		if (typeof color == "string") {
			result = parseInt(color.substring(1), 16);
		}
		else
		{
			result = color;
		}
		return result;
	}

	export function getPC(name: string, x: number = 0, y: number = 0, z: number = 0): Person3D | undefined {
		var pc = pcData.filter(function (item)
		{
			return item.id == name;
		})[0];

		if (pc != undefined) {
			// if (typeof pc.haircolor === "string" && pc.haircolor.startsWith("#")) pc.haircolor = new THREE.Color(pc.haircolor);
			// if (typeof pc.skincolor === "string" && pc.skincolor.startsWith("#")) pc.skincolor = new THREE.Color(pc.skincolor);
			// if (typeof pc.themecolor === "string" && pc.themecolor.startsWith("#")) pc.themecolor = new THREE.Color(pc.themecolor);

			var charBase = new Person(pc.name, pc.race, pc.texture, pc.gender, pc.hairstyle, pc.haircolor, pc.beard, pc.skincolor, pc.weight, pc.themecolor, pc.type);
			if (pc.donk !== undefined) charBase.caboose = pc.donk;
			if (pc.fronk !== undefined) charBase.ladychest = pc.fronk;
			var char = getHumanoid(x, y, z, charBase, new Gear(pc.righthand, pc.lefthand, pc.back));
			return char;
		}
	}

	export function getParty(target: THREE.Object3D, x: number = 0, y: number = 0, z: number = 0){
		const partyMembers = [ "Bud", "Jasper", "Falimur", "Namfoodle", "Redji", "Seabern", "Shamous", "Thunder", "Zenrya"];
		// var target = new THREE.Object3D();
		for (let i = 0; i < partyMembers.length; i++) {
			const e = partyMembers[i];
			let newPC = getPC(e, x + (i % 3), y, z - Math.floor(i / 3));
			if (newPC != undefined) {
				target.add(newPC);
			}
		}
	}

	export function getRandom(x: number = 0, y: number = 0, z: number = 0, race?: string, gender?: string) {
		var charBase = new Person(undefined, race, undefined, gender);
		var char = getHumanoid(x, y, z, charBase, new Gear(undefined, undefined, undefined, charBase.race));
		return char as Person3D;
	}

	export function getHair(size:number|THREE.Vector3, style: Hair|Hair[]): THREE.Mesh {
		var hat = new THREE.Object3D() as THREE.Mesh;
		//#region locate and clone meshes
		if (style.constructor === Array)
		{
			(style as Hair[]).forEach(e => {
				if (e != undefined)
					hat.add(getHair(size, e));
			});
		}
		else if (typeof style === "object")
		{
			let stylo = style as Hair;
			if (stylo.style != undefined) {
				let targetMesh = baseMeshes.Hair.getObjectByName(stylo.style);
				if (targetMesh != undefined) {
					hat = targetMesh.clone() as THREE.Mesh;
					if (stylo.texture != undefined) {
						(hat as THREE.Mesh).material = FOUR.Material({
							color: 0xffffff,
							emissive: 0x000000,
							side: THREE.FrontSide,
							specular: 0x666666,
							shininess: 5,
							map: FOUR.Texture(stylo.texture),
							transparent: true,
							alphaTest:0.5,
						});
					} else if ((hat.material as THREE.MeshPhongMaterial).map != null) {
						if (typeof stylo.color === "string" && stylo.color.startsWith("#"))
						{
							hat.material = (hat.material as THREE.Material).clone();
							(hat.material as THREE.MeshPhongMaterial).color.set(FOUR.Color(stylo.color));
							// (hat.material as THREE.MeshPhongMaterial).color.setHex(0x191919);
							// (hat.material as THREE.MeshPhongMaterial).color.setStyle(stylo.color);
						}
					} else {
						(hat as THREE.Mesh).material = FOUR.Material({
							color: FOUR.Color(stylo.color),
							emissive: 0x000000,
							side: THREE.DoubleSide,
							// specular: 0x666666,
							shininess: 5
						});
					}
				}
			};
			hat.receiveShadow = true;
			((hat as THREE.Mesh).material as THREE.Material).needsUpdate = true;
		}
		//#endregion

		if (typeof size === typeof new THREE.Vector3()) {
			hat.scale.copy(size as THREE.Vector3);
		}
		else
		{
			hat.scale.set(size as number, size as number, size as number);
		}
		return hat;
	}

	export function getItem(index: number|string, scale: THREE.Vector3 = new THREE.Vector3(1,1,1)): THREE.Mesh {
		index = index || 0;
		var item = new THREE.Object3D() as THREE.Mesh;
		if (index != 0)
		{
			var style: string;
			if (typeof index === "string")
			{
				style = index;
				for (let i = 0; i < equipment.length; i++)
				{
					const el = equipment[i];
					if (el.style == index)
					{
						index = i + 1;
						break;
					};
				}
			}

			var equipmentItem = equipment[(index as number) - 1]
			style = equipmentItem.style;

			if (style !== null)
			{
				var color = equipmentItem.color;
				var relative = equipmentItem.relative;

				let baseItem = baseMeshes.Item.getObjectByName(style);
				if (baseItem != undefined)
				{
					item = baseItem.clone() as THREE.Mesh;
					if (item.material == undefined) {
						if (typeof color === "string")
						{
							item.material = FOUR.Material({
								map: FOUR.Texture(color),
								color: 0xffffff,
								emissive: 0x000000,
								side: THREE.DoubleSide,
								shininess: 30,
								specular: 0xeeeeee,
							});
						}
						else
						{
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
					if (relative == false)
					{
						item.scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z);
					}
				}
			}
		}
		return item;
	}

	export function getTorso(item: PersonPhysicalFeature): THREE.Mesh {
		var torso = new THREE.Mesh();

		var matchingItem = baseMeshes.Torso.getObjectByName(item.style);
		if (matchingItem != undefined) {
			torso = matchingItem.clone() as THREE.Mesh;
			torso.traverse(function (node0: THREE.Object3D)
			{
				if (node0.hasOwnProperty("material"))
				{
					let node = node0 as THREE.Mesh;
					if (node.material != undefined) {
						node.material = new THREE.MeshPhongMaterial({
							color: FOUR.Color(item.color),
							emissive: 0x000000,
							side: THREE.DoubleSide,
							shininess: 30,
						});
						if (node.name = "angu_22") {
							(node.material as THREE.MeshBasicMaterial).map = FOUR.Texture("/res/models/Advanced/angu_22.png");
							node.material.transparent = true;
						} else  if (node.name = "angu_13") {
							(node.material as THREE.MeshBasicMaterial).map = FOUR.Texture("/res/models/Advanced/angu_13.png");
							node.material.transparent = true;
						}
						node.receiveShadow = true;
						node.material.needsUpdate = true;
					}
				}
			} );

			if (item.relative == false)
			{
				let scale = item.size;
				torso.scale.set(1/scale.x, 1/scale.y, 1/scale.z);
			}
		}

		return torso;
	}

	export function getHumanoid(x: number, y: number, z: number, personInfo: Person, gear?: Gear): Person3D|undefined {
		if (personInfo !=undefined) {
			var boundGeom = new THREE.BoxBufferGeometry(0.5, 1.6, 0.35);
			boundGeom.translate(0, 0.8, 0);
			var interactionTarget = new THREE.Mesh(boundGeom, new THREE.MeshBasicMaterial({
				visible: false,
			}));
			interactionTarget.name="Target";

			var person = SkeletonUtils.clone(baseMeshes.Human) as Person3D;
			person.add(interactionTarget);
			person.userData.mixer = new THREE.AnimationMixer(person);
			person.userData.animations = {
				Stand: "Stand",
				Walk: "Walk"
			};
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
			(person.getObjectByName("Torso") as THREE.Mesh).material = material;
			(person.getObjectByName("Torso") as THREE.Mesh).receiveShadow = true;
			(person.getObjectByName("EyeLids") as THREE.Mesh).material = material;

			person = updateHumanoid(person, personInfo, gear);

			var clip;
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
			// person.userData.mixer.clipAction(clip).play();
			(person.userData.mixer as THREE.AnimationMixer).timeScale = 2;

			person.position.x = Math.floor(x) + 0.5;
			person.position.y = person.userData.showBase? y + 0.025 : y;
			person.position.z = Math.floor(z) + 0.5;
			return person;
		}
	}

	export function PersonLoader(callback: Function, hideBase: boolean = false) {
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
		manager.onLoad = function ( ) {
			baseMeshes.Hair = hat;
			baseMeshes.Item = bagOfHolding;
			baseMeshes.Torso = torso;


			person.userData.draggable = true;
			person.userData.showBase = !hideBase;
			person.traverse( function ( node ) {
				if ( node.type == "Mesh" ) {
					node.castShadow = true;
					node.receiveShadow = true;
				};
			});
			baseMeshes.Human = person;

			//#region set default values for torso
			let torsoMesh = person.getObjectByName("Torso") as THREE.Mesh;
			torsoMesh.castShadow = true;
			torsoMesh.receiveShadow = true;
			torsoMesh.receiveShadow = false;
			torsoMesh.frustumCulled = false;
			let eyelids = person.getObjectByName("EyeLids") as THREE.Mesh;
			eyelids.castShadow = true;
			eyelids.receiveShadow = true;
			eyelids.receiveShadow = false;
			eyelids.frustumCulled = false;
			let hairgroup = new THREE.Object3D();
			hairgroup.name = "hair";
			(person.getObjectByName("hatHolder") as THREE.Bone).add(hairgroup);
			//#endregion

			callback();
		};

		if (hideBase == false)
		{
			person = new Person3D(
				new THREE.CylinderGeometry(0.45, 0.5, 0.025, 6),
				FOUR.Material({
					color: 0xffffff,
					bumpScale: 0.005,
					alphaTest:0.5,
					morphTargets: true,
					skinning: true,
					name: 'texture',
					shadowSide: THREE.FrontSide
				})
			);
		}

		var loader = new GLTFLoader(manager);

		//#region Load person mesh
		loader.load( '/res/models/advancedCharacter.glb',
			function ( gltf ) {
				var skeleton = gltf.scene.getObjectByName("Skeleton") as THREE.Object3D;
				person.add(skeleton);
				person.userData.mixer = new THREE.AnimationMixer(skeleton);
				person.animations = gltf.animations;
				person.animations.forEach((clip: THREE.AnimationClip) => {
					// Filters out the unwanted scale tracks that are automatically inserted by the exporter.
					clip.tracks = clip.tracks.filter(function(track: THREE.KeyframeTrack) {
						return !(track.name.substring(track.name.length-6) == ".scale");
					});
				});
			}, undefined, function ( error: ErrorEvent ) {
				console.error( error );
			}
		);
		//#endregion

		//#region Load Hair/Hats
		loader.load( '/res/models/badHair.glb', function ( gltf ) {
			gltf.scene.traverse(function(node){
				hat.add(node.clone());
				if ( (node as THREE.Mesh).material) hairOptions.push(node.name);
			})
		}, undefined, function ( error: ErrorEvent ) {
			console.error( error );
		});
		//#endregion

		//#region Load items/weapons
		loader.load( '/res/models/Items.glb', function ( gltf ) {
			gltf.scene.traverse(function(node){
				bagOfHolding.add(node.clone());
			})
		}, undefined, function ( error: ErrorEvent ) {
			console.error( error );
		});
		//#endregion

		//#region Load Torso accessories
		loader.load( '/res/models/TorsoStuff.gltf', function ( gltf ) {
			gltf.scene.traverse(function(node){
				torso.add(node.clone());
			})
		}, undefined, function ( error: ErrorEvent ) {
			console.error( error );
		});
		//#endregion
	}

	export function updateHumanoid(person: Person3D, personInfo: Person, gear: Gear = new Gear(0, 0, 0)): Person3D {
		person.name = personInfo.name;
		person.userData.scale = {
			size: personInfo.scale,
			head: personInfo.headScale,
			arm: personInfo.armScale,
			torso: personInfo.torsoScale,
			leg: personInfo.legScale
		};

		if (personInfo.texture != undefined)
		{
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


		if (personInfo.tail != undefined)
		{
			let item = getTorso(personInfo.tail);
			item.name = "Tail";
			(person.getObjectByName("spinelower") as THREE.Object3D).add(item);
		}
		if (gear.righthand != 0)
		{
			person.equipment.rightHand = getItem(gear.righthand, personInfo.scale);
			// let item = getItem(gear.righthand, scale);
			// item.name = "rightItem";
			// item.rotation.z = Math.PI;
			// (person.getObjectByName("wristr") as THREE.Object3D).add(item);
		}
		// Add gear to Left Hand
		if (gear.lefthand != 0) {
			(person.getObjectByName("wristl") as THREE.Object3D).add(
				getItem(gear.lefthand, personInfo.scale)
			);
		};
		// Add ears to head
		if (personInfo.ears != undefined) {
			(person.getObjectByName("hatHolder") as THREE.Object3D).add(
				getHair(personInfo.ears.size, new Hair(personInfo.ears.style, personInfo.ears.color))
			);
		};

		//#region Head stuff
		let headNode = person.getObjectByName("hatHolder") as THREE.Object3D;
		let head: THREE.Mesh;
		if (personInfo.race !== "aarakocra" && personInfo.race !== "bloodfin" && personInfo.race !== "grung" && personInfo.race !== "kenku" && personInfo.race !== "tortle") {
			if (personInfo.hairstyle !=undefined) {
				var hair = getHair(1, personInfo.hairstyle);
				hair.name = "hair";
				headNode.add(hair);
			}
			if (personInfo.beardstyle !=undefined) {
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
				(head.material as THREE.MeshStandardMaterial).map = ((person.getObjectByName("Torso") as THREE.Mesh).material as THREE.MeshPhongMaterial).map;
				(head.material as THREE.MeshStandardMaterial).bumpMap = FOUR.Texture("/res/models/Advanced/skin_grung_bump.png");
				(head.material as THREE.MeshStandardMaterial).bumpScale = 0.1;
				(head.material as THREE.MeshStandardMaterial).needsUpdate = true;
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
		var spineNode = person.getObjectByName("spineupper") as THREE.Mesh;
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
		return person as Person3D;
	}

	export function removeFromBone(parent: Person3D, boneName: string, objectName: string) {
		try {
			const bone = parent.getObjectByName(boneName);
			if (bone != undefined) {
				const object = bone.getObjectByName(objectName);
				if (object != undefined)
					bone.remove(object);
			}
		} catch (error) {
			console.warn("Error finding object within bone." )
		}
	}

	export function cleanBone(parent: Person3D, boneName: string) {
		try {
			const bone = parent.getObjectByName(boneName);
			if (bone != undefined) {
				for (var i = bone.children.length - 1; i >= 0; i--) {
					if (bone.children[i].type == "Mesh" || bone.children[i].type == "Object3D") bone.remove(bone.children[i]);
				}
			}
		} catch (error) {
			console.warn("An oops happened while cleaning this bone." )
		}
	}

	export function getSprite(x: number, y: number, z: number, texture: string, size?: number, name?: string) {
		texture = texture || "/img/characters/monsters/zombies.png";
		size = size || 1;
		name = name || "???";
		var spriteMap = FOUR.Texture(texture);

		var sprite = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshPhongMaterial({map: spriteMap, transparent: true, side: THREE.DoubleSide, color:0xffffff,}));
		sprite.position.set(0, size/2, 0);

		var base = new MiniatureBase(x, y, z);

		base.add(sprite);
		return base;
	}

	export function getZombies(x: number, y: number, z: number, count: number = 1) {
		var sprite = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), new THREE.MeshPhongMaterial({
			map: FOUR.Texture("/img/characters/monsters/zombies.png"),
			transparent: true,
			side: THREE.DoubleSide,
			color:0xffffff
		}));
		// sprite.position.set(0, size/2, 0);
		sprite.position.set(0, 1, 0);
		var sprite2 = sprite.clone();
		sprite2.rotation.y = Math.PI/2;

		var base = new THREE.Mesh(
			new THREE.CylinderGeometry(2.95, 3, 0.025, 12), new THREE.MeshPhongMaterial({
				color: 0x777777,
				emissive: 0x000000,
				side: THREE.DoubleSide,
				shininess: 30,
			})
		);
		base.position.set(
			Math.floor(x) - 3,
			y,
			Math.floor(z) - 3
		);
		base.castShadow = true;
		base.receiveShadow = true;
		base.userData.draggable = true;

		base.add(sprite);
		base.add(sprite2);
		return base;
	}

	export function getName(race: string, gender: string, age: number = 0) {
		const newnpc = new NPC(undefined, race, gender, age);
		return newnpc.name;
	}

	export function getModron(x: number = 0, y: number = 0, z: number = 0) {
		var person = new THREE.Mesh(
			new THREE.CylinderGeometry(0.45, 0.5, 0.025, 6), new THREE.MeshPhongMaterial({
				color: 0x999999,
				emissive: 0x000000,
				side: THREE.DoubleSide,
				shininess: 30,
			})
		);

		var manager = new THREE.LoadingManager();
		manager.onLoad = function ( ) {
			person.userData.draggable = true;
		};

		var loader = new GLTFLoader(manager);


		loader.load( '/res/models/modron.gltf',
			function ( gltf ) {
					person.add(gltf.scene);
			}, undefined, function ( error: ErrorEvent ) {
				console.error( error );
			}
		);

		person.position.x = Math.floor(x) + 0.5;
		person.position.y = y;
		person.position.z = Math.floor(z) + 0.5;
		person.name = "Gearbox";

		return person;
	}

	export function getBear(x: number = 0, y: number = 0, z: number = 0) {
		return loadModel(x, y, z, '/res/models/bear.glb', "Ursa");
	}

	export function getLizard(x: number = 0, y: number = 0, z: number = 0) {
		return loadModel(x, y, z, '/res/models/lizard.glb', "J");
	}

	export function getYamask(x: number = 0, y: number = 0, z: number = 0) {
		return loadModel(x, y, z, '/res/models/yamask.glb');
	}

	function loadModel(x: number = 0, y: number = 0, z: number = 0, model: string, name: string = "thing") {
		var person = new THREE.Object3D();

		var manager = new THREE.LoadingManager();
		manager.onLoad = function ( ) {
			person.userData.draggable = true;
		};

		var loader = new GLTFLoader(manager);


		loader.load( model,
			function ( gltf ) {
					person.add(gltf.scene);
			}, undefined, function ( error: ErrorEvent ) {
				console.error( error );
			}
		);

		person.position.x = Math.floor(x) + 0.5;
		person.position.y = y;
		person.position.z = Math.floor(z) + 0.5;
		person.name = name;

		return person;
	}
};