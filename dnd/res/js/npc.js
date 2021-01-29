"use strict";
function getNPCs() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/npcs.json", dataType: 'json' });
}
class NPC {
    constructor(obj = {}) {
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
        this.intelligence = obj.intelligence || undefined;
        this.personalityTags = obj.personalityTags || [];
        this.profession = obj.profession || undefined;
        this.description = obj.description || undefined;
        this.status = obj.status || "living";
    }
}
class NPCManager {
    constructor(items = []) {
        this.all = items;
        this.filtered = items;
        this.races = [];
        this.genders = [];
        this.alignments = [];
        this.relativeAges = [];
    }
    filter(races, genders, alignments) {
        this.races = races || this.races;
        this.genders = genders || this.genders;
        this.alignments = alignments || this.alignments;
        this.filtered = [];
        for (let index = 0; index < this.all.length; index++) {
            let shouldRender = true;
            const item = this.all[index];
            if (this.races.length > 0) {
                if (!this.races.includes(item.race))
                    shouldRender = false;
            }
            if (this.genders.length > 0) {
                if (!this.genders.includes(item.gender))
                    shouldRender = false;
            }
            if (this.alignments.length > 0) {
                if (!this.alignments.includes(item.alignment))
                    shouldRender = false;
            }
            if (this.relativeAges.length > 0) {
                if (!this.relativeAges.includes(item.relativeAge))
                    shouldRender = false;
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
            result = this.all.filter(function (entry) {
                return entry.name == name;
            })[0];
        }
        return result;
    }
    getByID(id) {
        var result = undefined;
        if (typeof id == "string") {
            result = this.all.filter(function (entry) {
                return entry.id == id;
            })[0];
        }
        return result;
    }
    getPreview(name) {
        return getNPCPreview(this.get(name));
    }
    resetFilters() {
        this.races = [];
        this.genders = [];
        this.alignments = [];
        this.relativeAges = [];
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
    sort(property = "name", desc = false) {
        if (this.all[0].hasOwnProperty(property)) {
            if (desc) {
                // Descending
                this.all.sort((a, b) => (a[property] > b[property]) ? -1 : 1);
                this.filtered.sort((a, b) => (a[property] > b[property]) ? -1 : 1);
            }
            else {
                this.all.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
                this.filtered.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
            }
        }
    }
    get json() {
        return JSON.stringify(this.all);
    }
    save() {
        //@ts-ignore
        saveJSON(this.all, "npcs");
    }
    add(npc) {
        // if the item doesn't have an ID, generate one
        if (npc.id == undefined) {
            var hits = this.all.filter(function (entry) {
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
                    hits = this.all.filter(function (entry) {
                        return entry.id == newID;
                    });
                    if (hits.length == 0)
                        matchFound = true;
                } while (matchFound == false);
                npc.id = newID;
            }
        }
        this.all.push(npc);
        this.filter();
    }
}
function getNPCPreview(item) {
    if (item) {
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
    else {
        return $("");
    }
}
function getNPCImage(npc) {
    return npc.image ? npc.image : `/dnd/img/races/snes/${npc.race}_${npc.gender}.png`;
}
//# sourceMappingURL=npc.js.map