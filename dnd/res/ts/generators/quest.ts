interface IQuestPayment
{
	credits: number,
	other: []
}
class Quest
{
	name: string;
	active: boolean;
	handcrafted: boolean;
	issuer: INPC;
	location: string;
	registrationRequired: boolean;
	rank: string;
	payment: IQuestPayment;
	logo: string;
	notes: INotes;
	constructor()
	{
		this.name = "";
		this.active = false;
		this.handcrafted = false;
		this.issuer = new NPC();
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
	get madLibs()
	{
		let p = this.notes.player;
		let d = this.notes.dm;

		return "";
	}
	get json()
	{
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

const QuestGenerator = {
	generateQuest: function(systems: { planets: string[] }[])
	{
		let nq = new Quest();
		// nq.name = randomize(QuestParts.types);
		nq.name = QuestGenerator.getQuestName();
		nq.active = true;
		nq.handcrafted = false;
		nq.issuer = new NPC();
		QuestGenerator.NpcGenerator.randomizeNPC(nq.issuer);
		if (systems)
		{
			let system = randomize(systems);
			nq.location = randomize(system.planets);
		}
		nq.registrationRequired = randomize([false, true]);
		nq.rank = randomize(["D", "C", "B", "A", "S"]);
		nq.payment.credits = QuestGenerator.getQuestCredits(nq.rank);
		return nq;
	},

	getQuestCredits: function (rank: string)
	{
		/*
			This is based on the assumption that the quest ranks approximately correspond to character levels as follows:
				D = level 1-2
				C = level 1-5
				B = level 1-8
				A = level 5-11
				S = level 10+
		*/
		var baseCredits = 0;
		var min = 0;
		var max = 0;
		switch (rank)
		{
			case "D":
				min = QuestGenerator.WealthPerEncounter["1/2"];
				max = QuestGenerator.WealthPerEncounter["2"];
				break;
			case "C":
				min = QuestGenerator.WealthPerEncounter["1"];
				max = QuestGenerator.WealthPerEncounter["5"];
				break;
			case "B":
				min = QuestGenerator.WealthPerEncounter["1"];
				max = QuestGenerator.WealthPerEncounter["8"];
				break;
			case "A":
				min = QuestGenerator.WealthPerEncounter["5"];
				max = QuestGenerator.WealthPerEncounter["11"];
				break;
			case "S":
				min = QuestGenerator.WealthPerEncounter["10"];
				max = QuestGenerator.WealthPerEncounter["20"];
				break;
			default:
				min = QuestGenerator.WealthPerEncounter["1/8"];
				max = QuestGenerator.WealthPerEncounter["1/2"];
				break;
		}
		baseCredits = getRandomHundo(min, max);
		return baseCredits;
	},

	getQuestName: function()
	{
		let questName = "";
		let propStart: any = QuestGenerator.QuestParts.string;
		do
		{
			const keys = Object.keys(propStart) as (keyof typeof propStart)[];
			const index = (keys.length * Math.random() << 0);
			questName += (keys[index] as string) + " ";
			propStart = propStart[keys[index]];
		} while (Object.keys(propStart).length > 0);
		return questName;
	},

	NpcGenerator: new NPCDeepGenerator(),

	QuestParts: {
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
			escort: {
				person: {},
				items: {}
			},
			kill: {
				person: {},
				monster: {}
			},
		}
	},

	/** The amount of copper per encounter based on CR. */
	WealthPerEncounter: {
		"1/8": 15,
		"1/4": 150,
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
	},
}






function getRandomQuart(min: number, max: number)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.ceil((Math.floor(Math.random() * (max - min + 1)) + min) / 25) * 25;
}
function getRandomHundo(min: number, max: number)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.ceil((Math.floor(Math.random() * (max - min + 1)) + min) / 100) * 100;
}