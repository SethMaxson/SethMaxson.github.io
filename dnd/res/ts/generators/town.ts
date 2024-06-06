type CitySizes = "empty" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
type CityPointOfInterestType = "bar" | "place" | "shop" | "worship";
interface ISettlementData
{
	alignment: Alignment;
	commerce: string;
	defense: string;
	government: string;
	/** The level of the settlement (only used in PF). */
	level: number;
	/** The max rarity of items that can be found in the settlement (only used in 5e). */
	maxItemRarity: ItemRarity;
	name: string;
	organizations: string;
	pointsOfInterest: ISettlementPointOfInterestData[];
	population: number;
	populationPercentages: string;
	primaryCulture: keyof typeof racesWeighted;
	qualities: string[];
	size: CitySizes;
	type: string;
}
interface ISettlementPointOfInterestData
{
	description: string;
	name: string;
	subtype?: string;
	type: CityPointOfInterestType;
}
class SettlementPointOfInterestData implements ISettlementPointOfInterestData
{
	description: string = "";
	name: string = "";
	subtype?: string | undefined;
	type: CityPointOfInterestType = "place";
}

const townTotaledWeights = {
	governmentTypes: -1,
	Race: -1
}

//#region Generator Data
const governmentTypes: IWeightedKeyList = {
	"Autocracy": 8,
	"Bureaucracy": 5,
	"Confederacy": 6,
	"Democracy": 3,
	"Dictatorship": 5,
	"Feudalism": 15,
	"Gerontocracy": 2,
	"Hierarchy": 9,
	"Magocracy": 3,
	"Matriarchy": 2,
	"Militocracy": 6,
	"Monarchy": 10,
	"Oligarchy": 4,
	"Patriarchy": 2,
	"Meritocracy": 3,
	"Plutocracy": 2,
	"Republic": 7,
	"Satrapy": 2,
	"Kleptocracy": 1,
	"Theocracy": 5
};

var races: string[] = [];
var racesWeighted: IWeightedKeyList = {};

const qualities = {
  "Academic" : "It is often easier to do research in this settlement, which is home to a large school, research facility, or great repository of knowledge.",
  "Bureaucratic" : "The settlement is a nightmarish, confusing, and frustrating maze of red tape and official paperwork.",
  "Cultured": "The settlement is well known for being a place where artistry thrives, such as a community of actors and musicians.",
  "Devout": "The settlement is devoted to a deity (which must be of the same alignment as the community) or follows a religious creed.",
  "Financial Center": "This settlement is home to large banks, trading houses, currency exchanges and other powerful financial and mercantile organizations.",
  "Insular": "The settlement is isolated, perhaps physically. Its citizens are fiercely loyal to one another, often making it difficult to learn secrets about them.",
  "Notorious": "The settlement has a reputation (deserved or not) for being a den of iniquity. It is usually easier to procure illegal goods and services.",
  "Polluted": "The settlement's magical or high-tech industry has filled the ground and sky with disgusting pollution.",
  "Tech": {
    "Technologically Advanced": "The settlement produces and uses a level of technology that isn't widely seen elsewhere.",
    "Technologically Average": "The level of technology used by the settlement is similar to that found in the majority of other settlements.",
    "Technologically Underdeveloped": "The technology used by the settlement is less advanced than that found elsewhere.",
  },
  "In Recession": "The settlement is experiencing an economic downturn, usually resulting in higher unemployment rates.",
  "Profiteering": "The businesses of this settlement engage in unethical practices in order to make profits.",
  "Secret Location": "The settlement is concealed or hidden in some way, or its precise location is a closely guarded secret.",
  "Modular": "The compartmentalized nature of this settlement's construction allows for relatively easy and quick additions, renovations, and even physical rearrangement. It can also be used to physically separate parts of the city for quarantine or security purposes",
  "Surrounded by the Past": "The citizens of the settlement live among the vestiges of their distant ancestors, though they can't usually take full advantage of such relics.",
  "Remote": "Reaching this settlement is very difficult, often requiring secret knowledge or very specialized skills.",
};

// partially updated for D&D
const cityBySize: {
	empty: IWeightedKeyList,
	micro: IWeightedKeyList,
	tiny: IWeightedKeyList,
	small: IWeightedKeyList,
	medium: IWeightedKeyList,
	large: IWeightedKeyList,
	huge: IWeightedKeyList,
} = {
	empty: {
		"abandoned township": 10,
		"ghost town": 10,
		"lost city": 10,
		"ruined city": 10,
	},
	micro: {
		"camp site": 10,
		"farm": 10,
		"lone tavern": 10,
	},
	tiny: {
		"barracks": 10,
		"cave dwelling": 10,
		"dungeon": 10,
		"fishing village": 10,
		"hamlet": 10,
		"outpost": 10,
		"research station": 1,
		"village": 10,
	},
	small: {
		"barracks": 10,
		"castle town": 10,
		"cave system": 10,
		"community": 10,
		"dungeon": 10,
		"farming community": 10,
		"fishing village": 10,
		"flotilla": 10,
		"labour camp": 10,
		"military base": 10,
		"mining town": 10,
		"outpost": 10,
		"resort": 1,
		"town": 10,
		"township": 10,
		"trading post": 10,
		"tunnel system": 10,
	},
	medium: {
		"barracks": 10,
		"castle town": 10,
		"cave system": 10,
		"colony": 10,
		"community": 10,
		"floating city": 2,
		"flotilla": 10,
		"holy city": 10,
		"large town": 10,
		"mining colony": 10,
		"occupied city": 10,
		"port city": 10,
		"resort": 10,
		"township": 10,
		"trading post": 10,
		"treetop city": 10,
		"tunnel system": 10,
		"underground city": 10,
		"underwater city": 10,
	},
	large: {
		"city": 10,
		"city state": 10,
		"colony": 10,
		"holy city": 10,
		"large city": 10,
		"metropolis": 10,
		"mining colony": 10,
		"occupied city": 10,
		"port city": 10,
		"trading post": 10,
		"treetop city": 10,
		"underground city": 10,
		"underwater city": 10,
	},
	huge: {
		"city": 10,
		"city state": 10,
		"colony": 10,
		"holy city": 10,
		"large city": 10,
		"metropolis": 10,
		"mining colony": 10,
		"occupied city": 10,
		"port city": 10,
		"trading post": 10,
		"treetop city": 10,
		"underground city": 10,
		"underwater city": 10,
	}
};

// Updated for D&D
const wateringHole = {
	prefixes: [
		"Angry",
		"Arcane",
		"Blackened",
		"Blind",
		"Bloody",
		"Blushing",
		"Carved",
		"Celestial",
		"Charming",
		"Crimson",
		"Dancing",
		"Dark",
		"Deaf",
		"Demonic",
		"Dire",
		"Dirty",
		"Divine",
		"Draconic",
		"Dragon's",
		"Drunken",
		"Fighting",
		"Filthy",
		"Flaming",
		"Flying",
		"Forged",
		"Forgotten",
		"Fractured",
		"Frightened",
		"Giddy",
		"Golden",
		"Green",
		"Happy",
		"Heavenly",
		"Hidden",
		"Holy",
		"Hungry",
		"Invisible",
		"Iron",
		"Jolly",
		"Joyful",
		"Jumping",
		"Keen",
		"Laughing",
		"Lawful",
		"Lawless",
		"Lonely",
		"Lost",
		"Lucky",
		"Metal",
		"Miniature",
		"Monstrous",
		"Mossy",
		"Musty",
		"Old",
		"Platinum",
		"Polished",
		"Prancing",
		"Prone",
		"Purple",
		"Radiant",
		"Raging",
		"Rusty",
		"Shining",
		"Silent",
		"Singing",
		"Sleeping",
		"Steel",
		"Stellar",
		"Sultry",
		"Sweet",
		"Tiny",
		"Toothless",
		"Tranquil",
		"Twisted",
		"Unholy",
		"Unlucky",
		"Unsoiled",
		"Violent",
		"White",
		"Wicked",
		"Winged",
		"Winking",
		"Wise",
		"Wounded",
		"Yawning",
	],
	suffixes: [
		"Angel",
		"Anvil",
		"Armor",
		"Beacon",
		"Blade",
		"Cargo",
		"Chain",
		"Circle",
		"Cloak",
		"Clover",
		"Comet",
		"Crowbar",
		"Crown",
		"Devil",
		"Door",
		"Dove",
		"Dragon",
		"Drow",
		"Dwarf",
		"Elemental",
		"Gnome",
		"Goat",
		"Goblin",
		"Griffon",
		"Hag",
		"Halfling",
		"Hammer",
		"Helmet",
		"Hoard",
		"Jelly",
		"Jewel",
		"King",
		"Lantern",
		"Lemon",
		"Lich",
		"Melon",
		"Moon",
		"Mystic",
		"Nail",
		"Ooze",
		"Orb",
		"Pitcher",
		"Plate",
		"Pony",
		"Portal",
		"Queen",
		"Respite",
		"Rest",
		"Ring",
		"Robe",
		"Rope",
		"Sack",
		"Sanctum",
		"Shadow",
		"Shield",
		"Ship",
		"Slumber",
		"Star",
		"Stone",
		"Sword",
		"Tackle",
		"Tail",
		"Titan",
		"Trap",
		"Tree",
		"Triangle",
		"Unicorn",
		"Vortex",
		"Whistle",
		"Wizard"
	],
	establishment: [
		"bar",
		"cantina",
		"live music venue",
		"nightclub",
		"pirate bar",
		"pub",
		"speakeasy",
		"tavern",
	],
	flavour: [
		"doesn’t serve cocktails. Their beer selection is slim, and limited to to cheap swill",
		"has a surprisingly fine selection of whiskeys, although the connoisseur will realize it’s the same whiskey just replaced in fancier bottles and with premium price tags",
		"has the best live shows in town",
		"invites patrons to take the stage and sing, a practice which they call karaoke. It",
		"is the seediest place around",
		"was once run by criminals, now run as a legitimate business; yet the patrons of the place are still shady outlaws",
	]
};

// Updated for D&D
const placeofWorship = {
	flavour: [
		"is seldom used anymore, the population has moved away from this deity",
		"is always full, people pay their respects at all times of the day",
		"is frequented by travellers, some coming from different worlds to pay their respects here",
		"is bustling, the annual pilgrimage has begun",
		"seems empty, no one has been here in a long time",
		"has a huge statue of SX as its centrepiece",
		"has its walls adorned by SX",
		"is met by a large set of doors decorated with SX",
		"has been destroyed by a long forgotten crusade",
		"provides divine services if you have enough gold",
		"displays a rich tapestry of SX",
		"has a statue of SX in the middle of the building",
		"many paintings in the entry show SX"
	],
	names: [
		"The church of DX",
		"The divine abbey of DX",
		"A small temple devoted to DX",
		"A large temple devoted to DX",
		"A secret following of DX",
		"A sanctuary for the followers of DX",
		"A shrine for the worship of DX",
		"A huge cathedral dedicated to DX"
	]
};

// partially updated for D&D
const stores = {
	"Magical Items Store": {
		equipment:["Magic Items","Hybrid Items","Spell Ampoules","Spell Gems"],
		flavour: [
			"has arcane trinkets and equipment for sale",
			"is filled with curios that look very old",
			"has very tall dusty shelves filled with strange items",
			"has the latest and greatest magic infused items",
			"is open about their magic use policies"
		],
		names: [
			"Wizards of the Coast",
			"The Mysticism Check",
			"Spell Slots Galore",
			"Level 7 Magic",
			"Reliable Arcane Goods"
		]
	},
	"Melee Weapon Store": {
		equipment:["Basic Melee Weapons","Advanced Melee Weapons"],
		flavour: [
			"has just the basics, all you need for smashing slimes",
			"has restricted and military-grade equipment, but only sells to licensed individuals",
			"has restricted and military-grade equipment, and will sell to anyone for the right price",
			"holds regular open days to try out new weapons"
		],
		names: [
			"Bloodbath & Beyond",
			"Blade & Bust",
			"Close Combat Pawnshop",
			"The Hunters Mark",
			"Melee and More",
			"The Pointy End",
		]
	},
	"Armor Store": {
		equipment:["Light Armor","Heavy Armor"],
		flavour: [
			"has every kind of body plating",
			"specializes in heavy armor",
			"specializes in light armor",
		],
		names: [
			"The Armorer",
			"Palace Plating",
			"Aegis Protections",
			"The Shield & Safeguard",
		]
	},
	"Armory": {
		equipment:["Light Armor","Heavy Armor","Ammunition","Special Ammunition","Small Arms","Longarms","Heavy Weapons","Sniper Weapons","Special Weapons","Grenades","Basic Melee Weapons","Advanced Melee Weapons"],
		flavour: [
			"carries all manner of items needed for combat",
			"stocks all manner of combat items, from armor to ammunition",
			"is a huge store with shelves full of stock",
			"is a store that specializes in all forms of combat items",
		],
		names: [
			"Gnome Depot"
		]
	},
}

const placesOfInterest = {
	"Airship Dock": {
		flavour: [
			"is a large flat area of land with many waiting airships",
			"it just a flat space of land, you'll have to walk the rest of the way",
		]
	},
	"Bathhouse": {
		flavour: [
			"scraps old ships for gold",
			"is where derelict ships go to rot; a veritable graveyard of vessels sit out back",
		]
	},
	"College": {
		flavour: [
			"is popular among middle aged people who have decided to take up magic",
			"will only accept applications from those who pass a secret test",
		]
	},
	"Government Building": {
		flavour: [
			"where the laws are made",
			"is constantly flooded with protestors",
			"is constantly under threat from local militia",
			"is open every hour of every day",
			"has guards patrolling every entrance"
		]
	},
	"Hospital": {
		flavour: [
			"is full of patients from a recent alchemical terror attack",
			"is a psychiatric hospital",
			"has only one practicing doctor, so it could takes days to get care"
		]
	},
	"Vehicle Rental": {
		flavour: [
			"hires out airships",
			"only hires to elves, as they are the most careful",
			"has a vehicle available with cannons attached",
			"has insurance that costs 5 times as much as the rental",
			"will not hire to halflings. Not after last time"
		]
	},
	"Shipyard": {
		flavour: [
			"scraps old ships for gold",
			"is where derelict ships go to rot; a veritable graveyard of vessels sit out back",
		]
	},
}

// Updated for D&D
const buildingFlavour = [
	"can not be found on the map",
	"creaks with the slightest gust of wind",
	"has a bard on staff playing music far too loudly",
	"has a construct that greets people upon entry",
	"has a fine decor",
	"has a large ornate brass knocker on the front door",
	"has a small airship landing pad on the roof",
	"has an odd, lingering, odor",
	"has an unusual smell",
	"has extremely well-armed guards",
	"has only one entrance and exit",
	"has pristine white halls",
	"has tinted windows",
	"has very little security",
	"has very unpleasant climate control",
	"is a front for criminal activity",
	"is beautifully adorned with intricate carvings",
	"is brightly lit from the inside",
	"is brightly lit",
	"is closed during the day",
	"is constructed from crystal",
	"is covered in both aged and current missing persons posters",
	"is covered in bright glyphs",
	"is covered in fast growing vines",
	"is covered in graffiti",
	"is covered in layers of aging paint",
	"is dark and dirty",
	"is decrepit and rundown",
	"is family owned",
	"is in an area plagued by violence",
	"is members only",
	"is obscured by large illusory magic ads",
	"is on a street taken over by skooma addicts",
	"is painted entirely red",
	"is rumored to be haunted",
	"is soon to be demolished",
	"is very dim and dark inside",
	"is well known in the community as a dangerous place",
	"looks like it has been fire damaged",
	"looks newly renovated",
	"requires weapons to be left at the door",
	"seems to be well guarded",
	"seems unusually busy",
	"seems very quiet",
	"smells like cookies on the inside",
	"smells of old cheese",
	"the main entrance is closed, you need to go around the back",
	"the owner looks like they are armed",
	"your alignment is magically checked on entry",
]

// Updated for D&D
const settlementFlavour = [
  "boasts they have the best ice cream parlor",
  "doesn’t show up in any maps or records",
  "has a bandit problem",
  "is a front for a drug manufacturer.",
  "is blanketed with dense haze",
  "is festooned with “Danger” signs",
  "is harder to find each time you visit",
  "is home to an abstract religion.",
  "is infested by flying pests",
  "is inhabited solely by refugees",
  "is overrun with rampant corruption ",
  "is ruled by a maniacal arms dealer.",
  "is run by a magical council.",
  "smells like oranges.",
  "was thought lost to the ages",
  "wouldn’t win any awards for cleanliness",
]

const cityNameParts = {
	fullNames: [
		"Aegis",
		"Atlas",
		"Beacon",
		"Beggar's End",
		"City of Dawn",
		"Curiosity",
		"Eternity",
		"Exposure",
		"Forsaken",
		"Fortuna",
		"Genesis",
		"Harmony",
		"Havoc",
		"Hope",
		"Infinity",
		"Memento",
		"Miracle",
		"Misery",
		"Olympus",
		"Paradise",
		"Promise",
		"Seclusion",
		"Serenity",
		"Solitude",
		"Terminus",
		"Tranquility",
		"Vestige",
	],
	nameStarts: [
		"Aban",
		"Aeon",
		"Air",
		"Ale",
		"Angel",
		"Ark",
		"Ash",
		"Atmos",
		"Aura",
		"Awe",
		"Back",
		"Bane",
		"Bear",
		"Beast",
		"Birds",
		"Black",
		"Bliss",
		"Blue",
		"Boom",
		"Border",
		"Break",
		"Cat",
		"Chrono",
		"Cloud",
		"Cosmo",
		"Crash",
		"Cruel",
		"Crumble",
		"Dark",
		"Dawn",
		"Dead",
		"Demon",
		"Dire",
		"Dirt",
		"Ditch",
		"Dog",
		"Doom",
		"Dread",
		"Dream",
		"Drought",
		"Dwarf",
		"Earth",
		"Elf",
		"Ember",
		"End",
		"Ender",
		"Enigma",
		"Ever",
		"Fable",
		"Fire",
		"Fools",
		"Glimmer",
		"Glitter",
		"Glory",
		"Gray",
		"Green",
		"Happy",
		"Hope",
		"Ill",
		"Kill",
		"Light",
		"Lore",
		"Lost",
		"Luna",
		"Mag",
		"Mem",
		"Metal",
		"Miracle",
		"Moon",
		"Nether",
		"Nova",
		"Outland",
		"Pioneer",
		"Prism",
		"Purple",
		"Quiet",
		"Rain",
		"Red",
		"Relic",
		"Rose",
		"Scout",
		"Scout",
		"Settler",
		"Shere",
		"Snow",
		"Somer",
		"Space",
		"Terra",
		"Void",
		"Voyage",
		"Water",
		"White",
		"Wind",
		"Wolf",
		"Yellow",
		"Zero",
	],
	nameEnds: [
		" City",
		" End",
		" Falls",
		" Falls",
		" Fork",
		" Gate",
		" Gate",
		" Point",
		" Rise",
		"'s End",
		"'s Landing",
		"age",
		"arm",
		"bed",
		"bend",
		"blight",
		"bound",
		"bourne",
		"burg",
		"bury",
		"caster",
		"chapel",
		"cliff",
		"dale",
		"dawn",
		"fall",
		"feld",
		"field",
		"fire",
		"ford",
		"ham",
		"haunt",
		"hope",
		"lone",
		"melt",
		"mere",
		"moor",
		"moor",
		"more",
		"rast",
		"ridge",
		"rise",
		"sby",
		"set",
		"shire",
		"shore",
		"side",
		"sley",
		"sley",
		"spire",
		"ton",
		"ton",
		"town",
		"ville",
		"wall",
		"water",
		"waters",
		"winter",
	]
};

const numOfShops = {
	"empty": 0,
	"micro": 0,
	"tiny": 1,
	"small": 2,
	"medium": 3,
	"large": 5,
	"huge": 10
};
//#endregion

/**
 * Returns the number of citizens for a given city.
 * @param size The size of the target city
 */
function getPopulation(size: CitySizes): number {
	var pop = 0;
	switch (size) {
		case "empty":
			pop = 0;
			break;
		case "micro":
			pop = getRandomInt(2, 20); // 2 - 20
			break;
		case "tiny":
			pop = getRandomInt(20, 200); // 20 - 200
			break;
		case "small":
			pop = getRandomInt(200, 1000); // 200 - 1,000
			pop = Math.round(pop/10)*10;
			break;
		case "medium":
			pop = getRandomInt(1000, 6000); // 1,000 - 6,000
			pop = Math.round(pop/100)*100;
			break;
		case "large":
			pop = getRandomInt(6000, 25000); // 6,000 - 25,000
			pop = Math.round(pop/100)*100;
			break;
		case "huge":
			pop = getRandomInt(25000, 50000); // 25,000 - 50,000
			pop = Math.round(pop/100)*100;
			break;
	}
	return pop;//add commas as necessary
}

/**
 * Generates a random city/town name.
 */
function getCityName(town: ISettlementData): string
{
	if ("|lone tavern|".includes("|" + town.type + "|")) {
		return getTavernName();
	}
	else
	{
		let rollResult = rollDie(3);
		var panelTitle = rollResult == 1? randomize(cityNameParts.fullNames) : randomize(cityNameParts.nameStarts) + randomize(cityNameParts.nameEnds);
		panelTitle = panelTitle.replace('tt', 't').replace('ss', 's');
		return panelTitle;
	}
}

function getTavernName(): string {
	return `The ${randomize(wateringHole.prefixes)} ${randomize(wateringHole.suffixes)}`;
}

function genWateringHole() {
	const place = new SettlementPointOfInterestData();
	place.type = "bar";
	place.name = getTavernName();
	place.description = `This ${randomize(wateringHole.establishment)} ${randomize(wateringHole.flavour).toLowerCase()} and ${randomize(buildingFlavour).toLowerCase()}`;
	return place;
}

function genPlaceOfWorship(alignment: string)
{
	const listOfDeities: { [key: string]: IDeity } = {};
	const weightedListOfDeities: IWeightedKeyList = {};
	Object.keys(Deities.PrimePantheon).forEach(function (v)
	{
		if (Deities.PrimePantheon[v].Alignment == alignment) {
			weightedListOfDeities[v] = 1;
		}
	});
	Object.keys(Deities.Demigods).forEach(function (v)
	{
		if (Deities.Demigods[v].Alignment == alignment) {
			weightedListOfDeities[v] = 0.3;
		}
	});

	$.extend(true, listOfDeities, Deities.PrimePantheon);
	$.extend(true, listOfDeities, Deities.Demigods);
	var chosenDeity: (keyof typeof listOfDeities) = weightedRandom(weightedListOfDeities) as keyof typeof listOfDeities;
	var deityName = randomize([`${listOfDeities[chosenDeity].Title} (${chosenDeity})`, chosenDeity]);

	const place = new SettlementPointOfInterestData();
	place.type = "worship";
	place.name = randomize(placeofWorship.names).replace('DX', deityName);
	place.description = "This place of worship " + randomize(placeofWorship.flavour).replace('SX', listOfDeities[chosenDeity].Symbol).toLowerCase();
	return place;
}

function genStore() {
	const place = new SettlementPointOfInterestData();
	place.type = "shop";
	const placeType: (keyof typeof stores) = randomize(Object.keys(stores)) as keyof typeof stores;
	place.name = randomize(stores[placeType].names);
	place.description = `This ${placeType.toLowerCase()} ${randomize(stores[placeType].flavour).toLowerCase()} and ${randomize(buildingFlavour).toLowerCase()}`;
	return place;
}

function genPlaceOfInterest()
{
	const place = new SettlementPointOfInterestData();
	const placeType: (keyof typeof placesOfInterest) = randomize(Object.keys(placesOfInterest)) as keyof typeof placesOfInterest;
	place.type = "place";
	place.name = placeType;
	place.description = `This ${placeType.toLowerCase()} ${randomize(placesOfInterest[placeType].flavour).toLowerCase()} and ${randomize(buildingFlavour).toLowerCase()}`;
	return place;
}

function sortNumber(a: number, b: number) {
    return b - a;
}

//removes the selected element from selected array
function removeElement(array: any[],element: any) {

  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;

}

function popPercentages(population: number, primarySpecies: string)
{
	let result = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//add commas as necessary
	if (population <= 0)
	{
		return result;
	}
	else if (population <= 20)
	{
		result += " (100% " + primarySpecies + ")";
		return result;
	}
	else
	{
		//split 100 into random sum parts
		var parts = 1;
		var maxparts = randomize([2, 3, 4, 5, 6]);
		var n = 100;
		var randomSumParts = [];
		while (n > 0)
		{
			parts += 1;
			var s = Math.round(Math.random() * (n - 1)) + 1;
			randomSumParts.push(s);
			n -= s;
			if (parts == maxparts && n > 0)
			{
				randomSumParts.push(n);
				n = 0;
			}
		}
		//sort array
		randomSumParts.sort(sortNumber);
		var otherPart = randomize(randomSumParts);
		randomSumParts = removeElement(randomSumParts, otherPart);
		randomSumParts.push(otherPart);

		//add string parts
		var possibleRaces: IWeightedKeyList = {};
		extendWeightedKeyList(possibleRaces, racesWeighted);
		// we already know the primary species lives here, so we'll remove it from consideration
		possibleRaces[primarySpecies] = 0;
		result += " (";
		for (var j = 0; j < randomSumParts.length - 1; j++)
		{
			// make sure the primary species is assigned to the highest population group
			var selectrace = j == 0 ? primarySpecies : weightedRandom(possibleRaces, getTotalWeight(possibleRaces));
			possibleRaces[selectrace] = 0;
			result += randomSumParts[j].toString() + '% ' + selectrace + ', ';
		}
		result += randomSumParts[randomSumParts.length - 1].toString() + '% other)';
		return result;
	}
}

function generateCity(
	citySize: CitySizes = randomize(["empty", "micro", "tiny", "small", "medium", "large", "huge"]),
	itemRarity: ItemRarity = randomize(["None","Common","Uncommon","Rare","Very Rare","Legendary","Artifact"])
): ISettlementData
{
	if (townTotaledWeights.governmentTypes < 0) {
		initializeTownGen();
	}

	const town: ISettlementData = {
		alignment: "N",
		commerce: "",
		defense: "",
		government: "",
		level: 0,
		maxItemRarity: itemRarity,
		name: "",
		organizations: "",
		pointsOfInterest: [],
		population: 0,
		populationPercentages: "",
		primaryCulture: "human",
		qualities: [],
		size: citySize,
		type: ""
	};

	town.type = weightedRandom(cityBySize[town.size]);

	//qualities
	var qualNum = rollDie(3);
	var qualKeys = Object.keys(qualities);

	for(var i = 0; i < qualNum; i++) {
		var newQual = randomize(qualKeys);
		if (newQual == "Tech") {
			newQual = randomize(Object.keys(qualities.Tech));
		}
		if (!town.qualities.includes(newQual)){
			town.qualities.push(newQual);
		}
	}

	//population
	town.primaryCulture = weightedRandom(racesWeighted, getTotalWeight(racesWeighted));
	town.population = getPopulation(town.size);
	town.populationPercentages = popPercentages(town.population, town.primaryCulture);

	//alignment
	town.alignment = randomize(getRacialTraits(town.primaryCulture).data.alignments);

	//government
	town.government = weightedRandom(governmentTypes, townTotaledWeights.governmentTypes);

	//name
	town.name = getCityName(town);

	//points of interest
	var worshipDone = false;
	for (var i = 0; i < numOfShops[town.size]; i++){
		//only one place of worship
		var oneTwoThree = randomize(["bar", "shop", "place"].concat(worshipDone ? [] : ["worship"]));
		switch(oneTwoThree) {
			case "bar":
				town.pointsOfInterest.push(genWateringHole());
				break;
			case "worship":
				town.pointsOfInterest.push(genPlaceOfWorship(town.alignment));
				worshipDone = true
				break;
			case "shop":
				town.pointsOfInterest.push(genStore());
				break;
			case "place":
				town.pointsOfInterest.push(genPlaceOfInterest());
				break;
		}
	}

	return town;
}

$(document).ready(function ()
{
	function getRaces() {
		return $.ajax({ crossDomain: true, url: "/dnd/res/data/races.json", dataType: 'json' });
	}

	getRaces().done(function (returnedData) {
		for (let i = 0; i < returnedData.length; i++) {
			const e = returnedData[i];
			if (e.hasOwnProperty("ID")) {
				races.push(e.ID);
			} else {
				races.push(e.name);
			}
		}
		initializeTownGen();
	});
});

function initializeTownGen()
{
	townTotaledWeights.Race = 0;
	for (let i = 0; i < races.length; i++)
	{
		const e = races[i];
		racesWeighted[e] = getRacialTraits(e).spawnFrequency;
		townTotaledWeights.Race += getRacialTraits(e).spawnFrequency;
	}
	townTotaledWeights.governmentTypes = getTotalWeight(governmentTypes);
}