class PlanetData {
	constructor(obj) {
		obj = obj || {};
		this.name = obj.name || "???";
		this.space = obj.space || randomize(["Near", "Vast"]);
		this.orbit = obj.orbit || 0;
		this.diameter = obj.diameter || 1;
		this.mass = obj.mass || 1;
		this.gravity = obj.gravity || 1;
		this.year = obj.year || "???";
		this.day = obj.day || "???";
		this.atmosphere = obj.atmosphere || "Thin";
		this.inhabitants = obj.inhabitants || ["???"];
		this.titles = obj.titles || [];
		this.type = obj.type || "Planet";
		this.source= obj.source || "";
	}
}
class PlanetFluff {
	constructor() {
		this.images = {
			body: "unknown.png",
			background: "unknown.jpg"
		}
		this.entries = [
			{
				type: "",
				entries: []
			}
		];
	}
}