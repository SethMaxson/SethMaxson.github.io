const WealthPerEncounter = {
	"1/3": 150,
	"1/2": 230,
	"1": 460,
	"2": 775,
	"3": 1100,
	"4": 1400,
	"5": 3100,
	"6": 3900,
	"7": 4600,
	"8": 5400,
	"9": 10000,
	"10": 14700,
	"11": 25000,
	"12": 34000,
	"13": 50000,
	"14": 77000,
	"15": 113000,
	"16": 178000,
	"17": 260000,
	"18": 405000,
	"19": 555000,
	"20": 782000
}

const QuestParts = {
	needs: [
		"a rival to be eliminated",
		"a top-secret blueprint to be stolen",
		"a pesky individual run out of town",
		"a valuable artifact recovered",
		"a pack of monsters eliminated",
		"a pack of monsters eliminated"
	],
	twists: [
		"the employer tries to kill the party",
		"the party was beaten to the punch by rivals"
	],
	types: [
		"Artifact retrieval",
		"Assassination",
		"Procurement of individual",
		"Pest control",
		"Escort",
		"Search and Rescue",
		"Delivery of goods"
	],
	string: {
		kill: {
			person: {},
			monster: {}
		},
		escort: {
			person: {},
			items: {}
		}
	}
}

const Subjects = {}

class Quest {
	constructor() {
		this.name = "";
		this.active = false;
		this.handcrafted = false;
		this.issuer = "";
		this.location = "";
		this.registrationRequired = false;
		this.rank = "";
		this.payment = {
			credits: 0,
			other: []
		},
		this.logo = "";
		this.notes = {
			player: [],
			dm: []
		};
	}
	get json() {

	}
	get madLibs() {
		let p = this.notes.player;
		let d = this.notes.dm;

	}
	get json() {
		var cjson = {
			name: this.name,
			active: this.active,
			handcrafted: this.handcrafted,
			issuer: this.issuer,
			location: this.location,
			registrationRequired: this.registrationRequired,
			rank: this.rank,
			payment: this.payment,
			logo: this.logo,
			notes: this.notes
		};

		return cjson;
	}
}

function generateQuest(systems) {
	let nq = new Quest();
	// nq.name = randomize(QuestParts.types);
	nq.name = getQuestName();
	nq.active = true;
	nq.handcrafted = false;
	nq.issuer = new NPC();
	randomizeNPC(nq.issuer);
	if (systems) {
		let system = randomize(systems);
		nq.location = randomize(system.planets);
	}
	nq.registrationRequired = randomize([false, true]);
	nq.rank = randomize(["D", "C", "B", "A", "S"]);
	nq.payment.credits = getQuestCredits(nq.rank);
	return nq;
}

function getQuestName() {
	let questName = "";
	let propStart = QuestParts.string;
	do {
		var keys = Object.keys(propStart);
		const index = (keys.length * Math.random() << 0);
		questName += keys[index] + " ";
    	propStart = propStart[keys[index]];
	} while (Object.keys(propStart).length > 0);
	return questName;
}

function getQuestCredits(rank) {
	/*
		This is based on the assumption that the quest ranks approximately correspond to character levels as follows:
			D = level 1-2
			C = level 1-5
			B = level 1-8
			A = level 5-10
			S = level 10+
	*/
	var baseCredits = 0;
	var min = 0;
	var max = 0;
	switch (rank) {
		case "C":
			min = WealthPerEncounter["1"];
			max = WealthPerEncounter["5"];
			break;
		case "B":
			min = WealthPerEncounter["1"];
			max = WealthPerEncounter["8"];
			break;
		case "A":
			min = WealthPerEncounter["5"];
			max = WealthPerEncounter["12"];
			break;
		case "S":
			min = WealthPerEncounter["10"];
			max = WealthPerEncounter["20"];
			break;
		default:
			min = WealthPerEncounter["1/3"];
			max = WealthPerEncounter["2"];
			break;
	}
	baseCredits = getRandomHundo(min, max);
	return baseCredits;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomQuart(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil((Math.floor(Math.random() * (max - min + 1)) + min)/25)*25;
}
function getRandomHundo(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil((Math.floor(Math.random() * (max - min + 1)) + min)/100)*100;
}