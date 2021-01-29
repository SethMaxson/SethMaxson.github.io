function getSpells()
{
	return $.ajax({ crossDomain: true, url: "/sf/res/data/spells.json", dataType: 'json' });
}

class Spell{
	name:string="";
	level:number=0;
	castTime:string="";
	classes:string[]=[];
	components:string="";
	shortDescription:string="";
	description:string="";
	descriptor:string="";
	duration:string="";
	range:string="";
	saveInfo:string="";
	school:string="";
	spellRes:string="";
	targetArea:string="";
	source:string="";
	page: number|string;
	[key: string]: any;
	constructor(obj: any) {
		obj = obj || {};
		this.name = obj.name;
		this.level = obj.level;
		this.castTime = obj.castTime;
		this.classes = obj.classes || [];
		this.components = obj.components;
		this.shortDescription = obj.shortDescription;
		this.description = obj.description;
		this.descriptor = obj.descriptor;
		this.duration = obj.duration;
		this.range = obj.range;
		this.saveInfo = obj.saveInfo;
		this.school = obj.school;
		this.spellRes = obj.spellRes;
		this.targetArea = obj.targetArea;
		this.source = obj.source;
		this.page = obj.page;
	}
}

class SpellManager
{
	levels: number[] = [];
	classes: string[] = [];
	schools: string[] = [];
	allSpells: Spell[];
	filteredSpells: Spell[];
	constructor(spells: Spell[]) {
		this.allSpells = spells || [];
		this.filteredSpells = spells || [];
	}
	filter(lvl: number[], classes: string[], schools: string[]) {
		this.levels = lvl || this.levels;
		this.classes = classes || this.classes;
		this.schools = schools || this.schools;
		this.filteredSpells = [];
		for (let index = 0; index < this.allSpells.length; index++) {
			let shouldRender = true;
			const item = this.allSpells[index];
			if (this.levels.length > 0) {
				if (!this.levels.includes(item.level)) shouldRender = false;
			}
			if (this.classes.length > 0) {
				let hits = this.classes.filter(function(n) {
					return item.classes.indexOf(n) !== -1;
				});
				if (hits.length == 0) shouldRender = false;
			}
			if (this.schools.length > 0) {
				if (!this.schools.includes(item.school)) shouldRender = false;
			}
			if (shouldRender) {
				this.filteredSpells.push(item);
			}
		}
		return this.filteredSpells;
	}
	get(name: string): Spell|undefined {
		var result = undefined;
		if (typeof name == "string") {
			result = this.allSpells.filter(function(entry) {
				return entry.name == name;
			})[0];
		}
		return result;
	}
	getPreview(name: string){
		return getSpellPreview(this.get(name) as Spell);
	}
	resetFilters() {
		this.levels = [];
		this.classes = [];
		this.schools = [];
	}
	parse() {
		// Converts raw JSON to Spell objects
		const spells = this.allSpells;
		this.allSpells = [];
		let target = this;
		spells.forEach(spell => {
			// target.allSpells.push(new Spell(spell));
			spell.classes = spell.classes || [];
			if (spell.hasOwnProperty("witchwarper")) {
				spell.classes.push("Witchwarper");
				spell.level = spell.witchwarper;
				delete spell['witchwarper'];
			}
			if (spell.hasOwnProperty("technomancer")) {
				spell.classes.push("Technomancer");
				spell.level = spell.technomancer;
				delete spell['technomancer'];
			}
			if (spell.hasOwnProperty("mystic")) {
				spell.classes.push("Mystic");
				spell.level = spell.mystic;
				delete spell['mystic'];
			}
			target.allSpells.push(new Spell(spell));
		});
	}
	sort(property: string = "name") {
		if (this.allSpells[0].hasOwnProperty(property)) {
			this.allSpells.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
			this.filteredSpells.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
		}
	}
	get json() {
		return JSON.stringify(this.allSpells);
	}
	save() {
		// saveJSON(this.json, "spells");
		saveJSON(this.allSpells, "spells");
	}
}

function getSpellPreview(item: Spell) {
	return $(`
		<div class="header">
			${item.name}
			<span style="float:right">Lvl. ${item.level}</span>
		</div>
		<div class="content">
			<div><b>School</b> ${item.school}</div>
			<div><b>Casting Time</b> ${item.castTime}</div>
			<div><b>Range</b> ${item.range}</div>
			<div><b>Targets</b> ${item.targetArea}</div>
			<div><b>Duration</b> ${item.duration}</div>
			<div>
				<b>Saving Throw</b> ${item.saveInfo};
				<b>Spell Resistance</b> ${item.spellRes}
			</div>
			<div>
				${item.description}
			</div>
		</div>
	`);
}