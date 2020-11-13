function getSettlements() {
	return $.ajax({ crossDomain: true, url: "/sf/res/data/map/settlements.json", dataType: 'json' });
}

class Settlement{
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.alignment = obj.alignment;
		this.type = obj.type;
		this.population = obj.population;
		this.government = obj.government;
		this.qualities = obj.qualities || [];
		this.maxItemLevel = obj.maxItemLevel || 0;
		this.locations = obj.locations || [];
	}
}

class SettlementManager{
	constructor(items) {
		this.allItems = items || [];
		this.filteredItems = items || [];
		this.levels = [];
		this.classes = [];
		this.schools = [];
	}
	filter(lvl, classes, schools) {
		this.levels = lvl || this.levels;
		this.classes = classes || this.classes;
		this.schools = schools || this.schools;
		this.filteredItems = [];
		for (let index = 0; index < this.allItems.length; index++) {
			let shouldRender = true;
			const item = this.allItems[index];
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
				this.filteredItems.push(item);
			}
		}
		return this.filteredItems;
	}
	get(name) {
		var result = undefined;
		if (typeof name == "string") {
			result = this.allItems.filter(function(entry) {
				return entry.name == name;
			})[0];
		}
		return result;
	}
	getPreview(name){
		return getSettlementPreview(this.get(name));
	}
	resetFilters() {
		this.planets = [];
		this.classes = [];
		this.schools = [];
	}
	parse() {
		// Converts raw JSON to Spell objects
		const items = this.allItems;
		this.allItems = [];
		let target = this;
		items.forEach(s => {
			target.allItems.push(new Settlement(s));
		});
	}
	sort(property) {
		property = property || "name";
		if (this.allItems[0].hasOwnProperty(property)) {
			this.allItems.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
			this.filteredItems.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
		}
	}
	get json() {
		return JSON.stringify(this.allItems);
	}
	save() {
		saveJSON(this.allItems, "settlements");
	}
}

function getSettlementPreview(item) {
	var location = "";
	item.locations.forEach(loc => {
		location += "<p><b>" + loc.name + "</b><br/>" + loc.description + "</p>";
	});
	return $(`
		<div class="header">
			${item.name}
		</div>
		<div class="content">
			<div>${item.alignment} ${item.type}</div>
			<div><b>Population</b> ${item.population}</div>
			<div><b>Government</b> ${item.government}</div>
			<div><b>Qualities</b> ${item.qualities.join(", ")}</div>
			<div><b>Maximum Item Level</b> ${item.maxItemLevel}</div>
			<div>
				${location}
			</div>
		</div>
	`);
}