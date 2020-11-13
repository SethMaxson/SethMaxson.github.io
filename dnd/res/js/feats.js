"use strict";
function getFeats() {
    return $.ajax({ crossDomain: true, url: "/sf/res/data/feats.json", dataType: 'json' });
}
class Feat {
    constructor(obj) {
        obj = obj || {};
        this.name = obj.name;
        this.combatFeat = obj.combatFeat || false;
        this.prerequisites = obj.prerequisites;
        this.shortDescription = obj.shortDescription;
        this.description = obj.description;
        this.source = obj.source;
        this.page = obj.page;
    }
}
class FeatPrerequisites {
    constructor() {
        this.description = "";
        this.mappings = [];
    }
}
class FeatPrerequisiteMapping {
    constructor() {
        this.type = "";
        this.subType = "";
    }
}
class FeatManager {
    constructor(items) {
        this.allItems = items || [];
        this.filteredItems = items || [];
    }
    init() {
        var dfd = jQuery.Deferred();
        let target = this;
        getFeats().done(function (returnedData) {
            target.filteredItems = target.allItems = returnedData.items;
            target.parse();
            target.sort();
            dfd.resolve("Feats loaded");
        });
        return dfd.promise();
    }
    filter(character) {
        this.character = character || this.character;
        this.filteredItems = [];
        let char = this.character;
        if (char) {
            for (let index = 0; index < this.allItems.length; index++) {
                let e = this.allItems[index];
                var featQualifies = true;
                if ((typeof e.prerequisites === 'object' && e.prerequisites !== null)) {
                    for (let blindex = 0; blindex < e.prerequisites.mappings.length; blindex++) {
                        const prereq = e.prerequisites.mappings[blindex];
                        switch (prereq.type) {
                            case "ability-score":
                                if (char.getAbilities()[prereq.subType.toLowerCase()] < prereq.value)
                                    featQualifies = false;
                                break;
                            case "base-attack-bonus":
                                if (char.bab < prereq.value)
                                    featQualifies = false;
                                break;
                            case "character-level":
                                if (char.level < prereq.value)
                                    featQualifies = false;
                                break;
                            case "feat":
                                if (!char.hasFeat(prereq.value))
                                    featQualifies = false;
                                break;
                            case "prof":
                                if (prereq.subType == "not") {
                                    if (char.proficiencies.includes(prereq.value))
                                        featQualifies = false;
                                }
                                else {
                                    if (!char.proficiencies.includes(prereq.value))
                                        featQualifies = false;
                                }
                                break;
                            case "skill-rank":
                                if (char.skillRanks().get(prereq.subType) < prereq.value)
                                    featQualifies = false;
                                break;
                        }
                    }
                }
                if (featQualifies) {
                    this.filteredItems.push(e);
                }
            }
        }
        return this.filteredItems;
    }
    get(name) {
        var result = undefined;
        if (typeof name == "string") {
            result = this.allItems.filter(function (entry) {
                return entry.name == name;
            })[0];
        }
        return result;
    }
    getPreview(name) {
        return getFeatPreview(this.get(name));
    }
    resetFilters() {
        this.character = undefined;
    }
    parse() {
        // Converts raw JSON to objects
        const items = this.allItems;
        this.allItems = [];
        let target = this;
        items.forEach(item => {
            target.allItems.push(new Feat(item));
        });
    }
    sort(property = "name") {
        if (this.allItems[0].hasOwnProperty(property)) {
            this.allItems.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
            this.filteredItems.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
        }
    }
    get json() {
        return JSON.stringify(this.allItems);
    }
    save() {
        saveJSON(this.allItems, "feats");
    }
}
function getFeatPreview(item) {
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
//# sourceMappingURL=feats.js.map