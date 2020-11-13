function getWeapons() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/items/weapons.json", dataType: 'json' });
}

const WeaponTypes = [
	"Advanced Melee",
	"Basic Melee",
	"Heavy",
	"Longarms",
	"Sniper",
	"Small Arms",
	"Special"
]
class Weapon {
	constructor(obj) {
		obj = obj || {};
		this.name = obj.name || "";
		this.level = obj.level || 0;
		this.price = obj.price || 0;
		this.handsRequired = obj.handsRequired || 1;
		this.type = obj.type || "Basic Melee";
		this.category = obj.category || "Uncategorized";
		this.damage = obj.damage || "1d6";
		this.damageType = obj.damageType || "B";
		this.range = obj.range || "-";
		this.criticalType = obj.criticalType ||  "-";
		this.criticalDamage = obj.criticalDamage || "-";
		this.capacity = obj.capacity || "-";
		this.usage = obj.usage ||  "-";
		this.ammoType = obj.ammoType || "-";
		this.bulk = obj.bulk ||  "L";
		this.special = obj.special || "";
		this.source = obj.source || "";
	}
}

class WeaponManager{
	constructor(items) {
		this.all = items || [];
		this.filtered = items || [];
		this.levels = [];
		this.types = [];
	}
	filter(lvl, types) {
		this.levels = lvl || this.levels;
		this.types = types || this.types;
		this.filtered = [];
		for (let index = 0; index < this.all.length; index++) {
			let shouldRender = true;
			const item = this.all[index];
			if (this.levels.length > 0) {
				if (!this.levels.includes(item.level)) shouldRender = false;
			}
			if (this.types.length > 0) {
				if (!this.types.includes(item.type)) shouldRender = false;
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
	resetFilters() {
		this.levels = [];
		this.types = [];
	}
	parse() {
		// Converts raw JSON to objects
		const items = this.all;
		this.all = [];
		let target = this;
		items.forEach(item => {
			target.all.push(new Weapon(item));
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
		saveJSON(this.all, "weapons");
	}
}