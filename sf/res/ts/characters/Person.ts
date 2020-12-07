import * as THREE from '../../../../node_modules/three/src/Three.js';
import { Hair } from './Hair.js';
import { FOUR } from './../four.js';
import { PersonPhysicalFeature } from './../characters/PersonPhysicalFeature.js';
import { CharactersModular } from './../characters-modular.js';

declare var races: string[];
declare function randomize(array: any): string;
declare var chance: Function;
declare var arrayAppend: Function;

const genders = "fm";
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
	personId: string = "";
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
		this.name = name || CharactersModular.getName(this.race, this.gender);

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
			this.haircolor = FOUR.getColorNumber(haircolor);
		}
	}
}