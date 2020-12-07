class ThemeBenefit
{
	level: number;
	name?: string;
	description?: string;
	constructor(lvl: any, name?: string, description?: string) {
		if (typeof lvl === 'object') {
			this.level = lvl.Level;
			this.name = lvl.Name;
			this.description = lvl.Description;
		}
		else {
			this.level = lvl;
			this.name = name;
			this.description = description;
		}
	}
}
function getClasses() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/characterclasses.json", dataType: 'json' });
}
function getRaces() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/races.json", dataType: 'json' });
}
function getThemes() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/themes.json", dataType: 'json' });
}
function getRacialTraits() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/racial-traits.json", dataType: 'json' });
}

class Race implements IRaceData
{
	//@ts-ignore
	ability = new Abilities(0, 0, 0, 0, 0, 0);
	name: string;
	description: string = "";
	ID: string = "";
	hp: number = 0;
	subrace: string = "";
	size: string = "";
	type: string = "";
	features: RacialBenefit[] = [];
	source: string = "";
	subraces: any[] = [];
	page: number = 0;
	constructor(o?: any, subraceName?: string) {
		if (typeof o === 'object') {
			this.name = o.name;
			if (o.ability) {
				let a = o.ability;
				this.ability = new Abilities(a.str, a.dex, a.con, a.int, a.wis, a.cha);
			} else {
				this.ability = new Abilities(o.str, o.dex, o.con, o.int, o.wis, o.cha);
			}
			this.hp = o.hp;
			this.subrace = subraceName || "";
			this.size = o.size;
			this.type = o.type;
			this.source = o.source;
			this.description = o.description;
			this.ID = o.ID;
			this.subraces = o.subraces || [];
			this.page = o.page || 0;
		}
		else {
			this.name = o;
			this.ability = new Abilities(0, 0, 0, 0, 0, 0);
		}
	}

	get languages(): string[] {
		let results: string[] = [];
		let hits: RacialBenefitProperty[] = [];
		for (let i = 0; i < this.features.length; i++) {
			const ft = this.features[i];
			if (ft.hasOwnProperty('properties')) {
				var feats = ft.properties.filter(function (entry) {
					return entry.type === "language";
				});
				if (feats.length > 0) hits = hits.concat(feats);
				// if (ft.properties[0].type == type) {
				// 	results = ft.properties[0].properties;
				// 	break;
				// }
			}
		}
		for (let i = 0; i < hits.length; i++) {
			const e = hits[i];
			results = results.concat((e.properties as string[]));
		}
		return results;
	}

	get skills() {
		const skills = new SkillRanks();
		const mods = this.getRacialBenefits("skillModifier");
		for (let i = 0; i < mods.length; i++) {
			const e = mods[i];
			skills.set(e.name, e.value)	;
		}
		return skills.ranks;
	}

	getRacialBenefits(type: string) {
		let results: RacialBenefitPropertyEffect[] = [];
		let hits: RacialBenefitProperty[] = [];
		for (let i = 0; i < this.features.length; i++) {
			const ft = this.features[i];
			if (ft.hasOwnProperty('properties')) {
				var feats = ft.properties.filter(function (entry) {
					return entry.type === type;
				});
				if (feats.length > 0) hits = hits.concat(feats);
				// if (ft.properties[0].type == type) {
				// 	results = ft.properties[0].properties;
				// 	break;
				// }
			}
		}
		for (let i = 0; i < hits.length; i++) {
			const e = hits[i];
			results = results.concat((e.properties as any));
		}
		return results;
	}

}

interface IAbilities
{
	str?: number;
	dex?: number;
	con?: number;
	int?: number;
	wis?: number;
	cha?: number;
	[key: string]: number|undefined;
}

interface IRaceData {
	name: string;
	ID: string;
	ability: IAbilities;
	hp: number;
	size: any;
	type: string;
	source: string;
	subraces: any[];
	page: number;
	description: string;
	features: any[];
}
class RacialBenefit
{
	name: string = "";
	description: string = "";
	properties: RacialBenefitProperty[] = [];
}
class RacialBenefitProperty
{
	type: string = "";
	properties: RacialBenefitPropertyEffect[] | string[] = [];
}
class RacialBenefitPropertyEffect
{
	name: string = "";
	value: any;
}
class Theme
{
	name: string;
	benefits: ThemeBenefit[];
	ability: Abilities;
	description: string;
	source: string;
	constructor(o?: any) {
		if (typeof o === 'object') {
			this.name = o.name;
			if (o.ability) {
				let a = o.ability;
				this.ability = new Abilities(a.str, a.dex, a.con, a.int, a.wis, a.cha);
			} else {
				this.ability = new Abilities(o.str, o.dex, o.con, o.int, o.wis, o.cha);
			}
			this.description = o.description;
			this.benefits = o.benefits;
			this.source = o.source;
		}
		else {
			this.name = o;
			this.ability = new Abilities(0, 0, 0, 0, 0, 0);
			this.description = "";
			this.benefits = [];
			this.source = "";
		}
	}
	ActiveBenefits(lvl: number): ThemeBenefit[] {
		lvl = lvl || 1;
		var ab = []; // Active Benefits array
		for (let i = 0; i < this.benefits.length; i++) {
			const b = this.benefits[i];
			if (b.level <= lvl) ab.push(b); // Check Benefit level vs Character Level
		}
		return ab;
	}
}
class CharacterClassBonus
{
	ba: string = "";
	fs: string = "";
	rs: string = "";
	ws: string = "";
}
class CharacterClass {
	name: string;
	hpm: number;
	spm: number;
	srpl: number;
	level: number;
	archetype?: any;
	subclass?: any;
	bonus: CharacterClassBonus;
	spellCasting: string;
	source: string;
	proficiencies: string[];
	skills: string[];
	[key: string]: any;
	constructor(o: any) {
		if (typeof o === 'object') {
			this.name = o.name;
			this.hpm = o.hp; // Health Point Multiplier
			this.spm = o.sp; // Stamina Point Multiplier
			this.srpl = o.skillRanks; // Skill Ranks Per Level
			this.level = 1;
			this.archetype = undefined;
			this.subclass = undefined;
			this.bonus = {
				ba: o.bab,
				fs: o.fsb,
				rs: o.rsb,
				ws: o.wsb
			}
			this.spellCasting = o.spellCasting || "none";
			this.features = o.features;
			this.proficiencies = o.proficiencies.armor.concat(o.proficiencies.weapon);
			this.skills = o.skills;
			this.choices = o.choices;
			this.source = o.source;
		}
		else {
			this.name = o;
			this.hpm = 0;
			this.spm = 0;
			this.srpl = 0;
			this.level = 1;
			this.archetype = undefined;
			this.subclass = undefined;
			this.bonus = new CharacterClassBonus();
			this.spellCasting = "none";
			this.features = [];
			this.proficiencies = [];
			this.skills = [];
			this.choices = [];
			this.source = "";
		}
	}
	get bab() {
		const babArray = this.bonus.ba == "partial"? [0,1,2,3,3,4,5,6,6,7,8,9,9,10,11,12,12,13,14,15] : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
		return babArray[this.level-1];
	}
	get fortSaveBonus() {
		return this.getSaveBonus(this.bonus.fs);
	}
	get refSaveBonus() {
		return this.getSaveBonus(this.bonus.rs);
	}
	get willSaveBonus() {
		return this.getSaveBonus(this.bonus.ws);
	}
	getSaveBonus(type: string) {
		const bArray = type == 'full'? [2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12] : [0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6];
		return bArray[this.level-1];
	}
	get spellSlots(){
		var spellSlots = [0,0,0,0,0,0];
		if (this.spellCasting == "full") {
			const spellSlotDictionary = [
				[2,0,0,0,0,0],
				[2,0,0,0,0,0],
				[3,0,0,0,0,0],
				[3,2,0,0,0,0],
				[4,2,0,0,0,0],
				[4,3,0,0,0,0],
				[4,3,2,0,0,0],
				[4,4,2,0,0,0],
				[5,4,3,0,0,0],
				[5,4,3,2,0,0],
				[5,4,4,2,0,0],
				[5,4,4,3,0,0],
				[5,5,4,3,2,0],
				[5,5,4,4,2,0],
				[5,5,5,4,3,0],
				[5,5,5,4,3,2],
				[5,5,5,4,4,2],
				[5,5,5,5,4,3],
				[5,5,5,5,5,4],
				[5,5,5,5,5,5]
			]
			spellSlots = spellSlotDictionary[this.level-1];
		}
		return spellSlots;
	}
	get spellsKnown(){
		var spellsKnown = [0,0,0,0,0,0,0];
		if (this.spellCasting == "full") {
			const spellsKnownDictionary = [
				[4,2,0,0,0,0,0],
				[5,3,0,0,0,0,0],
				[6,4,0,0,0,0,0],
				[6,4,2,0,0,0,0],
				[6,4,3,0,0,0,0],
				[6,4,4,0,0,0,0],
				[6,5,4,2,0,0,0],
				[6,5,4,3,0,0,0],
				[6,5,4,4,0,0,0],
				[6,5,5,4,2,0,0],
				[6,6,5,4,3,0,0],
				[6,6,5,4,4,0,0],
				[6,6,5,5,4,2,0],
				[6,6,6,5,4,3,0],
				[6,6,6,5,4,4,0],
				[6,6,6,5,5,4,2],
				[6,6,6,6,5,4,3],
				[6,6,6,6,5,4,4],
				[6,6,6,6,5,5,4],
				[6,6,6,6,6,5,5]
			]
			spellsKnown = spellsKnownDictionary[this.level];
		}
		return spellsKnown;
	}
}
class CharacterClasses
{
	classes: CharacterClass[] = [];
	get(name: string) {
		var result = null;
		for (let i = 0; i < this.classes.length; i++) {
			const cls = this.classes[i];
			if (cls.name = name) {
				result = cls;
				break;
			}
		}
		return result;
	}
	getSum(name: string) {
		var result = 0;
		for (let i: number = 0; i < this.classes.length; i++) {
			const e = this.classes[i][name] || 0;
			result += e;
		}
		return result;
	}
	get bab() {
		return this.getSum("bab");
	}
	get fortSaveBonus() {
		return this.getSum("fortSaveBonus");
	}
	get refSaveBonus() {
		return this.getSum("refSaveBonus");
	}
	get willSaveBonus() {
		return this.getSum("willSaveBonus");
	}
	contains(name: string): boolean {
		var bool = false;
		for (let i = 0; i < this.classes.length; i++) {
			const e = this.classes[i];
			if (e.name == name) {
				bool = true;
				break;
			}
		}
		return bool;
	}
	push(obj: CharacterClass): void {
		obj = obj || {};
		if (obj.name.length > 0) {
			if (!this.contains(obj.name)) {
				this.classes.push(obj);
			}
		}
	}
	fromLevels(levels: CharacterLevel[]) {
		// to do
		for (let i = 0; i < levels.length; i++) {
			const lvl = levels[i];

		}
	}
	get skills() {
		var results: string[] = [];
		for (let i = 0; i < this.classes.length; i++) {
			const e = this.classes[i];
			results = results.concat(e.skills);
		}
		return results;
	}
	get spellSlots() {
		var results = [0,0,0,0,0,0];
		for (let i = 0; i < this.classes.length; i++) {
			const e = this.classes[i].spellSlots;
			for (let j = 0; j < 6; j++) {
				results[j] += e[j];
			}
		}
		return results;
	}
	get spellsKnown() {
		var results = [0,0,0,0,0,0,0];
		for (let i = 0; i < this.classes.length; i++) {
			const e = this.classes[i].spellsKnown;
			for (let j = 0; j < 7; j++) {
				results[j] += e[j];
			}
		}
		return results;
	}
	get proficiencies() {
		var results: string[] = [];
		for (let i = 0; i < this.classes.length; i++) {
			const e = this.classes[i].proficiencies;
			for (let j = 0; j < e.length; j++) {
				if (!results.includes(e[j])) results.push(e[j]);
			}
		}
		return results;
	}
}

class Abilities implements IAbilities
{
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	[key: string]: any;
	constructor(str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number) {
		this.str = str || 0;
		this.dex = dex || 0;
		this.con = con || 0;
		this.int = int || 0;
		this.wis = wis || 0;
		this.cha = cha || 0;
	}
	addScore(ab: any) {
		this.str += parseInt(ab.str);
		this.dex += parseInt(ab.dex);
		this.con += parseInt(ab.con);
		this.int += parseInt(ab.int);
		this.wis += parseInt(ab.wis);
		this.cha += parseInt(ab.cha);
	}
	getModifiers() {
		var mods = new Abilities(0, 0, 0, 0, 0, 0);
		const abs = ["str", "dex", "con", "int", "wis", "cha"];
		for (let i = 0; i < abs.length; i++) {
			const ab = abs[i];
			mods[ab] = Math.floor((this[ab]-10)/2);
		}
		return mods;
	}
}
class MovementSpeed
{
	burrow: number = 0;
	fly: number = 0;
	land: number = 30;
	swim: number = 0;
}
class Character
{
	alignment: string = "";
	class?: CharacterClass;
	classes: CharacterClasses;
	classID?: string;
	defaultClass?: string;
	deity: string = "";
	description: string = "";
	gender: string = "";
	homeWorld: string = "";
	levels: CharacterLevel[];
	name?: string;
	player: string = "";
	race: Race;
	speed: MovementSpeed;
	spells: string[] = [];
	theme: Theme;
	xp: number;
	[key: string]: any;
	constructor() {
		this.levels = [];
		this.speed = {
			burrow: 0,
			fly: 0,
			land: 30,
			swim: 0
		}
		this.race = new Race();
		this.theme = new Theme();
		this.classes = new CharacterClasses();
		this.defaultClass = undefined;
		this.classID = undefined;
		this.xp = 0;
		this.ability = {
			pointBuy: new Abilities(0, 0, 0, 0, 0, 0)
		}
		// Ability Score Increases
		this.asi = [];
	}
	get level() {
		return this.levels.length;
	}
	get languages() {
		let languages = this.race.languages;
		if (languages.length == 0) languages.push("Common");
		return languages
	}
	skills(stopAt?: number): SkillMap {
		stopAt = stopAt==undefined? 20 : stopAt;
		let skillz: SkillMap = this.skillRanks(stopAt) as SkillMap;
		const classSkills = this.classes.skills;
		skillz.classBonus = Array(21).fill(0);
		skillz.classSkill = Array(21).fill(false);
		for (let i = 0; i < skillz.names.length; i++) {
			if (classSkills.includes(skillz.names[i])) {
				skillz.classSkill[i] = true;
				if (skillz.ranks[i] > 0) skillz.classBonus[i] = 3;
			}
		}
		skillz.misc = this.race.skills;
		return skillz;
	}
	skillRanks(stopAt?: number) {
		stopAt = stopAt==undefined? 20 : stopAt;
		let ranks = new SkillRanks();
		for (let i = 0; i < Math.min(this.levels.length, stopAt); i++) {
			ranks = ranks.add(this.levels[i].skillRanks);
		}
		return ranks;
	}
	getHP(stopAt?: number) {
		stopAt = stopAt==undefined? 20 : stopAt;
		stopAt = Math.min(this.level, stopAt);
		var hp = this.race.hp;
		for (let i = 0; i < stopAt; i++) {
			const className = this.levels[i].class.name;
			var classHP = 0;
			switch (className) {
				case "Envoy":
				case "Mechanic":
				case "Mystic":
				case "Operative":
					classHP = 6;
					break;
				case "Solarian":
				case "Soldier":
					classHP = 7;
					break;
				case "Technomancer":
				case "Witchwarper":
					classHP = 5;
					break;
			}
			hp += classHP;
		}
		return hp;
	}
	getRP(stopAt?: number) {
		stopAt = stopAt==undefined? 20 : stopAt;
		stopAt = Math.min(this.level, stopAt);
		var rp = Math.max(Math.floor(stopAt/2), 1);

		const cn = this.classNames;
		const mods = this.getAbilityModifiers(stopAt);
		var key = 0;
		for (let i = 0; i < cn.length; i++) {
			const className = cn[i];
			var compareKey = 0;
			switch (className) {
				case "Envoy":
				case "Solarian":
					compareKey = mods.cha;
					break;
				case "Mechanic":
				case "Technomancer":
					compareKey = mods.int;
					break;
				case "Mystic":
					compareKey = mods.wis;
					break;
				case "Operative":
					compareKey = mods.dex;
					break;
				case "Soldier":
					compareKey = Math.max(mods.dex, mods.str);
					break;
			}
			key = Math.max(key, compareKey);
		}
		rp += key;
		return rp;
	}
	getSP(stopAt?: number) {
		stopAt = stopAt==undefined? 20 : stopAt;
		stopAt = Math.min(this.level, stopAt);
		const con = Math.max(this.getAbilityModifiers(stopAt).con, 0);
		var sp = 0;
		for (let i = 0; i < stopAt; i++) {
			const className = this.levels[i].class.name;
			sp += con;
			switch (className) {
				case "Envoy":
				case "Mechanic":
				case "Mystic":
				case "Operative":
					sp += 6;
					break;
				case "Solarian":
				case "Soldier":
					sp += 7;
					break;
				case "Technomancer":
				case "Witchwarper":
					sp += 5;
					break;
			}

		}
		return sp;
	}
	benefits(stopAt?: number) {
		stopAt = stopAt || 20
		const feats =[];
		if (this.race.features) {
			for (let index = 0; index < this.race.features.length; index++) {
				const feat = this.race.features[index];
				feats.push(feat);
			}
		}
		const themeBenefits = this.theme.ActiveBenefits(Math.min(this.levels.length, stopAt));
		for (let i = 0; i < themeBenefits.length; i++) {
			feats.push(themeBenefits[i]);
		}
		return feats;
	}
	feats(stopAt?: number) {
		stopAt = stopAt==undefined? 20 : stopAt;
		const feats =[];
		for (let i = 0; i < Math.min(this.levels.length, stopAt); i++) {
			if(this.levels[i].feat != undefined) feats.push(this.levels[i].feat);
		}
		return feats;
	}
	hasFeat(name: string, stopAt?: number) {
		var result = false;
		stopAt = stopAt==undefined? 20 : stopAt;
		if (name.length > 0) {
			for (let i = 0; i < Math.min(this.levels.length, stopAt); i++) {
				if (this.levels[i].feat != undefined)
				{
					if (this.levels[i].feat == name) {
						result = true;
						break;
					}
				}
			}
		}
		return result;

	}
	get maxHP() {
		return this.getHP();
	}
	get hp() {
		return this.getHP();
	}
	get rp() {
		return this.getRP();
	}
	get sp() {
		return this.getSP();
	}
	get proficiencies() {
		let p = this.classes.proficiencies;
		return p;
	}
	get bab(): number {
		let bab = this.classes.bab;
		return bab;
	}
	get fortSaveBonus(): number {
		return this.classes.fortSaveBonus;
	}
	get refSaveBonus(): number {
		return this.classes.refSaveBonus;
	}
	get willSaveBonus(): number {
		return this.classes.willSaveBonus;
	}
	get classNames(): string[] {
		var classes: string[] = [];
		for (let i = 0; i < this.levels.length; i++) {
			if (!classes.includes(this.levels[i].class.name)) classes.push(this.levels[i].class.name);
		}
		return classes;
	}
	classLevel(className: string, stopAt?: number) {
		var lvl = 0;
		stopAt = stopAt==undefined? 20 : stopAt;
		for (let i = 0; i < Math.min(this.levels.length, stopAt); i++) {
			if (this.levels[i].class.name == className) lvl++;
		}
		return lvl;
	}
	getAbilities(stopAt?: number): Abilities {
		stopAt = stopAt==undefined? 20 : stopAt;
		var newScore = new Abilities(10, 10, 10, 10, 10, 10);
		newScore.addScore(this.race.ability);
		newScore.addScore(this.theme.ability);
		newScore.addScore(this.ability.pointBuy);
		for (let i = 0; i < Math.min(this.levels.length, stopAt); i++) {
			const lvl = this.levels[i];
			newScore.addScore(lvl.ability);
		}
		return newScore;
	}
	getAbilityModifiers(stopAt?: number) {
		return this.getAbilities(stopAt).getModifiers();
	}
	get json() {
		var cjson = {
			name: this.name || "",
			gender: this.gender,
			homeWorld: this.homeWorld,
			alignment: this.alignment,
			deity: this.deity,
			player: this.player,
			description: this.description,
			ability: {
				pointBuy: this.ability.pointBuy
			},
			levels: this.levels,
			race: this.race.name,
			theme: this.theme!=undefined? this.theme.name: "",
			defaultClass: this.defaultClass || "",
			spells: this.spells
		};

		return cjson;
	}
	save() {
		saveJSON(this.json, this.name as string);
	}
	loadJson(path: string){
		const target = this;
		return new Promise(
			function (resolve, reject) {
				var charDat = $.ajax({ crossDomain: true, url: "/sf/res/data/characters/character/"+path+".json", dataType: 'json' }),
				r = getRaces(),
				cc = getClasses(),
				t = getThemes(),
				f = getFeats();
				$.when(charDat, r, cc, t, f).done(function(cd, raceDat, classDat, themeDat, featDat){
					cd = cd[0];
					raceDat = raceDat[0];
					classDat = classDat[0];
					themeDat = themeDat[0];
					featDat = featDat[0];
					target.name = cd.name;
					target.gender = cd.gender;
					target.homeWorld = cd.homeWorld;
					target.deity = cd.deity;
					target.player = cd.player;
					target.description = cd.description;
					target.levels = cd.levels;
					target.ability.pointBuy = cd.ability.pointBuy;
					target.race = new Race(raceDat.items.filter(function (entry: IRaceData) {
						return entry.name === cd.race;
					})[0]);
					target.theme = new Theme(themeDat.items.filter(function (entry: Theme) {
						return entry.name === cd.theme;
					})[0]);
					target.class = new CharacterClass(classDat.items.filter(function (entry: CharacterClass) {
						return entry.name === cd.levels[0].class.name;
					})[0]);
					target.classes = new CharacterClasses();
					for (let i = 0; i < target.levels.length; i++) {
						const el = target.levels[i];
						let subClass = el.class.hasOwnProperty("choices")? el.class.choices.filter(function (entry: any) {
							return entry.id === "Subclass";
						}) : [];
						let clsObj = new CharacterClass(classDat.items.filter(function (entry: CharacterClass) {
							return entry.name === el.class.name;
						})[0]);
						if (subClass.length > 0)
							clsObj.subclass = subClass[0];

						target.classes.push(clsObj);
					}
					target.defaultClass = cd.defaultClass;
					target.spells = cd.spells || [];
					resolve();
				})
			}
		);
	}
	get unarmedStrike() {
		const strike = new Attack();
		strike.damage += " + " + this.getAbilityModifiers().str;

		return strike;
	}
	get spellsKnown() {
		return this.classes.spellsKnown;
	}
	get spellSlots() {
		return this.classes.spellSlots;
	}
}
class CharacterLevelClass
{
	name: string = "";
	choices: any = [];
}
class CharacterLevel
{
	class: CharacterLevelClass;
	skillRanks: SkillRanks;
	ability: Abilities;
	feat?: string;
	constructor(className?: string) {
		this.class = {
			name: className || "",
			choices: []
		}
		this.feat = undefined;
		this.skillRanks = new SkillRanks();
		this.ability = new Abilities();
	}
}
class SkillRanks
{
	ranks: number[];
	names: string[];
	constructor() {
		this.ranks = Array<number>(21).fill(0);
		this.names = [
			"Acrobatics",
			"Athletics",
			"Bluff",
			"Computers",
			"Culture",
			"Diplomacy",
			"Disguise",
			"Engineering",
			"Intimidate",
			"Life Science",
			"Medicine",
			"Mysticism",
			"Perception",
			"Physical Science",
			"Piloting",
			"Profession",
			"Profession2",
			"Sense Motive",
			"Sleight of Hand",
			"Stealth",
			"Survival"
		];
	}

	get(name: string) {
		return this.ranks[this.names.indexOf(name)];
	}

	set(name: string, value: number) {
		this.ranks[this.names.indexOf(name)] = value;
	}

	add(obj: SkillRanks) {
		var output = new SkillRanks();
		for (let i = 0; i < 21; i++) {
			output.ranks[i] = this.ranks[i] + obj.ranks[i];
		}
		return output;
	}
}
class SkillMap extends SkillRanks
{
	classBonus: number[] = [];
	classSkill: boolean[] = [];
	misc: number[] = [];
	constructor()
	{
		super();
	}
}
class SkillModifier
{
	name: string;
	value: number;
	constructor(name: string, value: number) {
		this.name = name;
		this.value = value;
	}
}
class Attack {
	weapon: string;
	level: string;
	damage: string;
	critical: string;
	type: string;
	usage: string;
	special: string;
	constructor() {
		this.weapon = "Unarmed Strike";
		this.level = "-";
		this.damage = "1d3";
		this.critical = "";
		this.type = "Basic Melee";
		this.usage = "";
		this.special = "";
	}
}