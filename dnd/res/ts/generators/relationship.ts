enum RelationshipTypes
{
	"Acquaintance",
	"Aunt/Uncle",
	"Cousin",
	"Parent/Child",
	"Enemy",
	"Friend",
	"Grandparent/Grandchild",
	"Sibling",
	"Significant Other",
	"Spouse",
	"Stranger"
}

interface IRelationshipNode
{
	characters: [string, string];
	relationshipType: keyof typeof RelationshipTypes;
}

function getRelationships() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/relationships.json", dataType: 'json' });
}

class RelationshipManager {
	all: IRelationshipNode[];
	filtered: IRelationshipNode[];
	npcIDs: string[];
	relationshipTypes: (keyof typeof RelationshipTypes)[];
	private _saved_npcIDs: string[];
	private _saved_relationshipTypes: (keyof typeof RelationshipTypes)[];
	constructor(items: IRelationshipNode[] = []) {
		this.all = items;
		this.filtered = items;
		this.npcIDs = [];
		this.relationshipTypes = [];
		this._saved_npcIDs = [];
		this._saved_relationshipTypes = [];
	}
	load()
	{
		let target = this;
		getRelationships().done(function (items: IRelationshipNode[])
		{
			target.all = items;
			target.filter();
		})
	}
	filter(npcIDs?: string[], relationshipTypes?: (keyof typeof RelationshipTypes)[]) {
		this.npcIDs = npcIDs || this.npcIDs;
		this.relationshipTypes = relationshipTypes || this.relationshipTypes;
		this.filtered = [];
		for (let index = 0; index < this.all.length; index++) {
			let shouldRender = true;
			const item = this.all[index];
			if (this.relationshipTypes.length > 0) {
				if (!this.relationshipTypes.includes(item.relationshipType)) shouldRender = false;
			}
			if (this.npcIDs.length > 0) {
				if (!this.npcIDs.some(r=> item.characters.indexOf(r) >= 0)) shouldRender = false;
			}
			if (shouldRender) {
				this.filtered.push(item);
			}
		}
		return this.filtered;
	}
	saveState()
	{
		this._saved_npcIDs = this.npcIDs.map((x) => x);
		this._saved_relationshipTypes = this.relationshipTypes.map((x) => x);
	}
	restoreState()
	{
		this.npcIDs = this._saved_npcIDs.map((x) => x);
		this.relationshipTypes = this._saved_relationshipTypes.map((x) => x);
		this.filter();
	}
	get(characterID1: string, characterID2: string, createIfNotFound: boolean = false): IRelationshipNode|undefined {
		var result: IRelationshipNode|undefined = undefined;
		if (typeof characterID1 == "string" && typeof characterID2 == "string") {
			result = this.all.filter(function(entry) {
				return entry.characters.includes(characterID1) && entry.characters.includes(characterID2);
			})[0];
			if (!result && createIfNotFound) {
				result = {
					characters: [ characterID1, characterID2 ] as [string, string],
					relationshipType: "Stranger"
				};
				this.all.push(result);
				this.filtered.push(result);
			}
		}
		return result;
	}
	resetFilters() {
		this.npcIDs = [];
		this.relationshipTypes = [];
	}
	sort(property: keyof IRelationshipNode, desc: boolean = false) {
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
	save()
	{
		//@ts-ignore
		saveJSON(this.all, "relationships");
	}
	add(relationShip: IRelationshipNode) {
		this.all.push(relationShip);
		this.filter();
	}
}

class RelationshipLogic
{
	static checkIfNPCIsSingle(relationshipManager: RelationshipManager, npc: NPC): boolean
	{
		let isSingle = true;
		relationshipManager.saveState();
		if (relationshipManager.filter([npc.id], ["Significant Other", "Spouse"]).length > 0)
		{
			isSingle = false;
		}
		relationshipManager.restoreState();
		return isSingle;
	}
	static getAllowedRelationshipTypes(relationshipManager: RelationshipManager, character1: NPC, character2: NPC): string[]
	{
		let excludedOptions: string[] = [];
		let allowedOptions: string[] = [];

		// Relationship type cannot be romantic if either character is a child, or if either character is not single
		if (character1.relativeAge == "child" || character2.relativeAge == "child"
			|| !RelationshipLogic.checkIfNPCIsSingle(relationshipManager, character1)
			|| !RelationshipLogic.checkIfNPCIsSingle(relationshipManager, character2)
			)
		{
			excludedOptions.push(RelationshipTypes[RelationshipTypes["Significant Other"]]);
			excludedOptions.push(RelationshipTypes[RelationshipTypes["Spouse"]]);
		}

		for (let item in RelationshipTypes) {
			if (isNaN(Number(item))) {
				if (!excludedOptions.includes(item)) {
					allowedOptions.push(item);
				}
			}
		}
		return allowedOptions;
	}
	static generateRelationship(relationshipManager: RelationshipManager, character1: NPC, character2: NPC): RelationshipTypes
	{
		let options = RelationshipLogic.getAllowedRelationshipTypes(relationshipManager, character1, character2);
		return randomize(options);
	}
}