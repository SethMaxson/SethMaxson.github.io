class Monster {
	constructor(obj) {
		obj = obj || {};
		this.name = obj.name || "";
		this.cr = obj.cr || "";
		this.combatType = obj.combatType || "";
		this.description = obj.description || "";
		this.alignment = obj.alignment || "";
		this.size = obj.size || "";
		this.type = obj.type || "";
		this.subtype = obj.subtype || "";
		this.environment = obj.environment || "";
		this.climate = obj.climate || "";
		this.planet = obj.planet || "";
		this.organization = obj.organization || "";
		this.source = obj.source || "";
		this.page = obj.page || 0;
	}
}