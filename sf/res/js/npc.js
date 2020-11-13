function getNPCs() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/npcs.json", dataType: 'json' });
}


class NPC {
	constructor(obj) {
		obj = obj || {};
		this.id = obj.id || undefined;
		this.name = obj.name || undefined;
		this.image = obj.image || undefined;
		this.race = obj.race || undefined;
		this.subrace = obj.subrace || undefined;
		this.gender = obj.gender || undefined;
		this.age = obj.age || undefined;
		this.relativeAge = obj.relativeAge || undefined;
		this.alignment = obj.alignment || undefined;
		this.threat = obj.threat || undefined;
		this.profession = obj.profession || undefined;
		this.description = obj.description || undefined;
		this.status = obj.status || "living";
	}
}

class NPCManager{
	constructor(items) {
		this.all = items || [];
		this.filtered = items || [];
		this.levels = [];
		this.classes = [];
		this.schools = [];
	}
	filter(lvl, classes, schools) {
		this.levels = lvl || this.levels;
		this.classes = classes || this.classes;
		this.schools = schools || this.schools;
		this.filtered = [];
		for (let index = 0; index < this.all.length; index++) {
			let shouldRender = true;
			const item = this.all[index];
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
				this.filtered.push(item);
			}
		}
		return this.filtered;
	}
	get(name) {
		var result = undefined;
		if (typeof name == "string") {
			result = this.all.filter(function(entry) {
				return entry.name == name;
			})[0];
		}
		return result;
	}
	getPreview(name){
		return getSpellPreview(this.get(name));
	}
	resetFilters() {
		this.levels = [];
		this.classes = [];
		this.schools = [];
	}
	parse() {
		// Converts raw JSON to objects
		const items = this.all;
		this.all = [];
		let target = this;
		items.forEach(item => {
			target.all.push(new NPC(item));
		});
	}
	sort(property, desc) {
		property = property || "name";
		desc = desc || false;
		if (this.all[0].hasOwnProperty(property)) {
			if (desc) {
				// Descending
				this.all.sort((a, b) => (a[property] > b[property]) ? -1 : 1)
				this.filtered.sort((a, b) => (a[property] > b[property]) ? -1 : 1)
			} else {
				this.all.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
				this.filtered.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
			}
		}
	}
	get json() {
		return JSON.stringify(this.all);
	}
	save() {
		saveJSON(this.all, "npcs");
	}
	add(npc) {
		// if the item doesn't have an ID, generate one
		if (npc.id == undefined) {
			var hits = this.all.filter(function(entry) {
				return entry.id == npc.name;
			});
			if (hits.length == 0) {
				npc.id = npc.name;
			}
			else {
				let counter = 0;
				let matchFound = false;
				let newID;
				do {
					newID = (npc.name + counter);
					hits = this.all.filter(function(entry) {
						return entry.id == newID;
					});
					if (hits.length == 0) matchFound = true;
				} while (matchFound == false);
				npc.id = newID;
			}
		}
		this.all.push(npc);
		this.filter();
	}
}

function getSpellPreview(item) {
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