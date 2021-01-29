var races: string[] = [];
var racesWeighted: IWeightedKeyList = {};
var spawnFrequencySum: number = -1;
const totaledWeights = {
	Adjectives: -1,
	Age: -1,
	From: -1,
	Personality: -1,
	Profession: -1,
	Race: -1,
	Threat: -1,
	Who: -1
}

const adjectives = [
	"shifty",
	"paranoid",
	"bubbly",
	"friendly",
	"loud",
	"obnoxious",
	"nosey",
	"creepy",
	"ill-tempered",
	"easily-distracted",
	"absent-minded",
	"political",
	"condescending",
	"panicky",
	"wise",
	"stupid",
	"monotone",
	"forgettable",
	"ugly",
	"shy",
	"quiet",
	"depressing",
	"uplifting",
	"wholesome",
	"intimidating",
	"disarming",
	"charming",
	"annoying"
];

const threatLevels: IWeightedKeyList = {
	"very low": 5,
	"low": 6,
	"slightly low": 5,
	"medium": 4,
	"slightly high": 3,
	"high": 2,
	"very high": 1
};

var professions: IWeightedKeyList = {
	"Actor": 20,
	"Adventurer": 100,
	"Airship Pilot": 40,
	"Alchemist": 40,
	"Archaeologist": 50,
	"Architect": 40,
	"Artist": 30,
	"Assassin": 15,
	"Banker": 50,
	"Bard": 100,
	"Barkeep": 100,
	"Blacksmith": 100,
	"Bounty Hunter": 100,
	"Builder": 100,
	"Butler": 30,
	"Carpenter": 100,
	"Cartographer": 50,
	"Chef": 50,
	"Cobbler": 100,
	"Comedian": 40,
	"Con Artist": 30,
	"Cook": 100,
	"Courtesan": 60,
	"Counselor": 40,
	"Dancer": 80,
	"Dockworker": 100,
	"Engineer": 60,
	"Executioner": 60,
	"Exorcist": 50,
	"Farmer": 100,
	"Gambler": 40,
	"Ghost Hunter": 40,
	"Gladiator": 80,
	"Guard": 100,
	"Guide": 20,
	"Healer": 60,
	"Herbalist": 60,
	"Hobo": 100,
	"Housekeeper": 100,
	"Hunter": 100,
	"Innkeeper": 100,
	"Janitor": 100,
	"Jester": 50,
	"Knight": 100,
	"Lady": 2,
	"Lawyer": 50,
	"Librarian": 40,
	"Lord": 2,
	"Mason": 100,
	"Masseuse": 50,
	"Mechanic": 50,
	"Mercenary": 100,
	"Merchant": 100,
	"Miner": 100,
	"Monk": 50,
	"Monster Hunter": 70,
	"Orator": 10,
	"Philosopher": 30,
	"Pickpocket": 100,
	"Planeswalker": 5,
	"Pirate": 100,
	"Plumber": 80,
	"Poet": 50,
	"Politician": 20,
	"Priest": 80,
	"Royal Taster": 50,
	"Sage": 10,
	"Sailor": 100,
	"Scholar": 30,
	"Scribe": 15,
	"Seer": 20,
	"Smuggler": 100,
	"Spy": 10,
	"Squire": 100,
	"Starving Artist": 90,
	"Teacher": 50,
	"Town Crier": 50,
	"Therapist": 50,
	"Thief": 100,
	"Thug": 100,
	"Tour Guide": 5,
	"Train Conductor": 5,
	"Translator": 50,
	"Urchin": 100,
	"Wizard": 55,
	"Writer": 50
};


var AgeRanks = {
	// These should total to exactly 1.0
	1: 0.05,
	2: 0.40,
	3: 0.39,
	4: 0.16
};

var AgeList =[
	'child',
	'young adult',
	'adult',
	'old'
];

// Updated for D&D
var PersonalityList = [
	"Accusative",
	"Active",
	"Adventurous",
	"Affable",
	"Aggressive",
	"Agist",
	"Agreeable",
	"Aimless",
	"Aloof",
	"Altruistic",
	"Analytical",
	"Angry",
	"Animated",
	"Annoying",
	"Anxious",
	"Apathetic",
	"Apologetic",
	"Apprehensive",
	"Argumentative",
	"Arrogant",
	"Articulate",
	"Attentive",
	"Bigoted",
	"Bitter",
	"Blustering",
	"Boastful",
	"Bookish",
	"Bossy",
	"A Braggart",
	"Brash",
	"Brave",
	"Bullying",
	"Callous",
	"Calm",
	"Candid",
	"Cantankerous",
	"Capricious",
	"Careful",
	"Careless",
	"Caring",
	"Casual",
	"Catty",
	"Cautious",
	"Cavalier",
	"Charming",
	"Chaste",
	"Chauvinistic",
	"Cheeky",
	"Cheerful",
	"Childish",
	"Chivalrous",
	"Clueless",
	"Clumsy",
	"Cocky",
	"Comforting",
	"Communicative",
	"Complacent",
	"Condescending",
	"Confident",
	"Conformist",
	"Confused",
	"Conscientious",
	"Conservative",
	"Contentious",
	"Contrary",
	"Contumely",
	"Conventional",
	"Cooperative",
	"Courageous",
	"Courteous",
	"Cowardly",
	"Coy",
	"Curious",
	"Crabby",
	"Cranky",
	"Critical",
	"Cruel",
	"Cultured",
	"Curious",
	"Cynical",
	"Daring",
	"Deceitful",
	"Deceptive",
	"Defensive",
	"Defiant",
	"Deliberate",
	"Deluded",
	"Depraved",
	"Depressed",
	"Discreet",
	"Dishonest",
	"Disingenuous",
	"Disloyal",
	"Disrespectful",
	"Distant",
	"Distracted",
	"Distraught",
	"Docile",
	"Doleful",
	"Dominating",
	"Dramatic",
	"A Drunkard",
	"Dull",
	"Earthy",
	"Eccentric",
	"Elitist",
	"Emotional",
	"Energetic",
	"Enigmatic",
	"Enthusiastic",
	"Excited",
	"Expressive",
	"Extroverted",
	"Faithful",
	"Fanatical",
	"Fastidious",
	"Fatalistic",
	"Fearful",
	"Fearless",
	"Feral",
	"Fierce",
	"Feisty",
	"Flamboyant",
	"Flippant",
	"Flirtatious",
	"Foolhardy",
	"Foppish",
	"Forgiving",
	"Friendly",
	"Frightened",
	"Frivolous",
	"Frustrated",
	"Funny",
	"Furtive",
	"Generous",
	"Genial",
	"Gentle",
	"Gloomy",
	"Goofy",
	"Gossipy",
	"Graceful",
	"Gracious",
	"Grave",
	"Gregarious",
	"Grouchy",
	"Groveling",
	"Gruff",
	"Gullible",
	"Happy",
	"Harsh",
	"Hateful",
	"Helpful",
	"Honest",
	"Hopeful",
	"Hostile",
	"Humble",
	"Humorless",
	"Humorous",
	"Hyper",
	"Idealistic",
	"Idiosyncratic",
	"Imaginative",
	"Imitative",
	"Impatient",
	"Impetuous",
	"Implacable",
	"Impractical",
	"Impulsive",
	"Inattentive",
	"Incoherent",
	"Indifferent",
	"Indiscreet",
	"Individualist",
	"Indolent",
	"Indomitable",
	"Industrious",
	"Inexorable",
	"Inexpressive",
	"Inquisitive",
	"Insecure",
	"Insensitive",
	"Instructive",
	"Intolerant",
	"Intransigent",
	"Introverted",
	"Irreligious",
	"Irresponsible",
	"Irreverent",
	"Irritable",
	"Jealous",
	"Jocular",
	"Joking",
	"Jolly",
	"Joyous",
	"Judgmental",
	"Jumpy",
	"Kind",
	"A Know-it-all",
	"Languid",
	"Lazy",
	"Lethargic",
	"Lewd",
	"Lying",
	"Likable",
	"Lippy",
	"Listless",
	"Loquacious",
	"Loving",
	"Loud",
	"Loyal",
	"Lustful",
	"Madcap",
	"Magnanimous",
	"Malicious",
	"Mean",
	"Meddlesome",
	"Melancholy",
	"Melodramatic",
	"Merciless",
	"Merry",
	"Meticulous",
	"Mischievous",
	"A Miscreant",
	"Miserable",
	"Modest",
	"Moody",
	"Mopey",
	"Moralistic",
	"Morbid",
	"Morose",
	"Mournful",
	"Mousy",
	"Mouthy",
	"Mysterious",
	"Naive",
	"Narrow-minded",
	"Needy",
	"Nefarious",
	"Nervous",
	"Nettlesome",
	"Neurotic",
	"Noble",
	"Nonchalant",
	"Nurturing",
	"Obdurate",
	"Obedient",
	"Oblivious",
	"Obnoxious",
	"Obsequious",
	"Obsessive",
	"Obstinate",
	"Obtuse",
	"Odd",
	"Ornery",
	"Optimistic",
	"Organized",
	"Ostentatious",
	"Outgoing",
	"Overbearing",
	"Paranoid",
	"Passionate",
	"Pathological",
	"Patient",
	"Peaceful",
	"Pensive",
	"Pertinacious",
	"Pessimistic",
	"Philosophical",
	"Phony",
	"Pious",
	"Playful",
	"Pleasant",
	"Poised",
	"Polite",
	"Pompous",
	"Pondering",
	"Pontificating",
	"Practical",
	"Prejudiced",
	"Pretentious",
	"Preoccupied",
	"Promiscuous",
	"Proper",
	"Proselytizing",
	"Proud",
	"Prudent",
	"Prudish",
	"Prying",
	"Quiet",
	"Quirky",
	"Racist",
	"Rascally",
	"Rash",
	"Realistic",
	"Rebellious",
	"Reckless",
	"Refined",
	"Repellent",
	"Reserved",
	"Respectful",
	"Responsible",
	"Restless",
	"Reticent",
	"Reverent",
	"Rigid",
	"Risk-taking",
	"Rude",
	"Sadistic",
	"Sarcastic",
	"Sardonic",
	"Sassy",
	"Savage",
	"Scared",
	"Scolding",
	"Secretive",
	"Self-effacing",
	"Selfish",
	"Selfless",
	"Senile",
	"Sensible",
	"Sensitive",
	"Sensual",
	"Sentimental",
	"Serene",
	"Serious",
	"Servile",
	"Sexist",
	"Sexual",
	"Shallow",
	"Shameful",
	"Shameless",
	"Shifty",
	"Shrewd",
	"Shy",
	"Sincere",
	"Slanderous",
	"Sly",
	"Smug",
	"Snobbish",
	"Sober",
	"Sociable",
	"Solemn",
	"Solicitous",
	"Solitary",
	"Solitary",
	"Sophisticated",
	"Spendthrift",
	"Spiteful",
	"Stern",
	"Stingy",
	"Stoic",
	"Stubborn",
	"Submissive",
	"Sultry",
	"Superstitious",
	"Surly",
	"Suspicious",
	"Sybarite",
	"Sycophantic",
	"Sympathetic",
	"Taciturn",
	"Tactful",
	"Tawdry",
	"Teetotaler",
	"Temperamental",
	"Tempestuous",
	"Thorough",
	"Thrifty",
	"Timid",
	"Tolerant",
	"Transparent",
	"Treacherous",
	"Tricky",
	"Troublemaker",
	"Trusting",
	"Truthful",
	"Uncommitted",
	"Understanding",
	"Unfriendly",
	"Unhinged",
	"Uninhibited",
	"Unpredictable",
	"Unruly",
	"Unsupportive",
	"Vague",
	"Vain",
	"Vapid",
	"Vengeful",
	"Vigilant",
	"Violent",
	"Vivacious",
	"Vulgar",
	"Wanton",
	"Wasteful",
	"Weary",
	"Whimsical",
	"Whiny",
	"Wicked",
	"Wisecracking",
	"Wistful",
	"Witty",
	"Zealous"
];
// Updated for D&D
var FromList = [
	"a backwater village",
	"a backwater village",
	"a beautiful, green valley",
	"a broken home",
	"a broken home",
	"a bustling market",
	"a bustling underground city",
	"a city no one else has ever heard of",
	"a city ravaged by war",
	"a company of mercenaries and sellswords",
	"a complex bureaucratic society",
	"a depleted mine",
	"a now barren farmland",
	"a disease ridden city",
	"a disgraced family of scrap collectors",
	"a dusty mountain range",
	"a fallen kingdom in the wilds",
	"a farming village in a lush forest",
	"a flotilla of ships that's always on the move",
	"a forgotten elven monastery",
	"a frozen wasteland",
	"a halfway house",
	"a hidden underground city",
	"a laid back beach town",
	"a large desert metropolis",
	"a large family, with many siblings",
	"a large military outpost",
	"a large secluded dungeon",
	"a military stronghold",
	"a mutanied prison ship",
	"a notorious dungeon",
	"a peaceful coastal town",
	"a peaceful nomadic culture",
	"a powerful trading city",
	"a refugee city outside a walled garden",
	"a royal lineage",
	"a run down bar",
	"a rundown adventurers guild",
	"a rural construction guild",
	"a secret barracks",
	"a shanty town in a scrapyard",
	"a sheltered upbringing",
	"a slave market",
	"a slave owning city",
	"a sleepy harbour town",
	"a small desert village",
	"a small family transport company",
	"a small farm",
	"a small island",
	"a small oasis village",
	"a small town where nothing ever happened",
	"a small village of barbarians",
	"a street gang in a large city",
	"a strict, religious temple",
	"a thriving port town",
	"a town run by gangs",
	"a travelling theatre company",
	"a tropical paradise",
	"a very religious family",
	"a very tiny village",
	"a vile village in a swamp",
	"an abandoned fortress",
	"an actual castle",
	"an affluent upbringing",
	"an ancient temple run by monks",
	"an aristocratic family",
	"an engineer's guild",
	"an extremist cult",
	"an orphanage",
	"an underwater bubble city",
	"an underwater city protected by a magical force field",
	"beyond the known world",
	"one of the great libraries",
	"the city post office",
	"the city watch",
	"the forests of the Verdant Isle",
	"the frozen wastes of Notre",
	"the inner slums of a large city",
	"the inside of an asylum",
	"the jungles of Chupajiji",
	"the local academy",
	"the outskirts of a large city",
	"the remains of a sunken city",
	"the slums of a large city"
];
// Updated for D&D
var WhoList = [
	"always carries multiple wallets",
	"always keeps their promises",
	"always looks their best",
	"always refers to inanimate objects as 'she'",
	"always thinks outside the box",
	"always wears the sweetest kicks",
	"avoids the city guard at all costs",
	"believes in life after love",
	"believes lizardfolk control the government",
	"believes they are destined for a higher calling",
	"believes they can speak to plants",
	"blames all their misfortune on ghosts",
	"can pilot any vehicle",
	"can't read",
	"can't stand the sight of blood",
	"can't swim",
	"can't tolerate gluten",
	"constantly has a broken arm, looking for help",
	"covered in maze tattoos",
	"deserted the military",
	"distrusts all authority",
	"distrusts anyone shorter than them",
	"distrusts anyone taller than them",
	"doesn't believe in dwarves",
	"doesn't believe in magic",
	"doesn't know their own strength",
	"doesn't speak a word of common",
	"doesn't trust warforged",
	"doesn't understand sarcasm",
	"doesn't understand the concept of politeness",
	"dresses provocatively",
	"fights for species equality",
	"finds it hard to relate to others",
	"finds it hard to work as a team",
	"flirts relentlessly",
	"gets nervous when public speaking",
	"gets startled at the slightest raise in someones tone",
	"gives people small amounts of money, in strange amounts, for doing the simplest errands",
	"gives their weapons names",
	"had their mind wiped by parties unknown",
	"has a burning hatred for pirates",
	"has a drinking problem",
	"has a gambling problem",
	"has a huge debt to pay back",
	"has a limp",
	"has a lisp",
	"has a price on their head",
	"has a quick answer for every question, but is always wrong",
	"has a thirst for all knowledge",
	"has a twin and constantly gets confused for them",
	"has a well kept mustache",
	"has accepted death as an inevitability",
	"has an incredible fashion sense",
	"has an irrational fear of halflings",
	"has anger problems",
	"has bad hygiene",
	"has been on the run for several years",
	"has body image issues",
	"has connections to underworld crime syndicates",
	"has many identities in different cities",
	"has no concept of personal space",
	"has nothing left to lose",
	"has stolen someones identity",
	"has the itch to explore other continents",
	"has the loudest laugh in the room",
	"has to have rice with every meal",
	"has to urinate frequently",
	"hasn't been quite right. Not since the accident",
	"hates being on dry land",
	"hates children",
	"hates crowds",
	"hates fighting",
	"hates wearing armor face masks",
	"hears voices",
	"is a compulsive liar",
	"is a pacifist",
	"is a total gear-head",
	"is addicted to runic tattoos",
	"is afraid of crossbows",
	"is afraid of heights",
	"is afraid of the dark",
	"is always warm and friendly",
	"is always hungry",
	"is an alcoholic",
	"is being hunted by a horrible beast",
	"is completely mute",
	"is downright racist towards hobgoblins",
	"is endlessly amused by magic",
	"is endlessly fascinated by gnome culture",
	"is much older than they look",
	"is much younger than they look",
	"is nearly deaf",
	"is not very good at sports",
	"is obsessed with carriages",
	"is obsessed with the local sports team",
	"is obsessed with their hair",
	"is responsible for the death of a family member",
	"is running from their debt",
	"is scared of airship travel",
	"is secretly a dragon",
	"is secretly a fallen deva",
	"is secretly a hag",
	"is secretly a succubus/incubus",
	"is slightly overweight",
	"is so laid back they often come across as rude and uncaring",
	"is superstitious",
	"is the escaped clone of a wealthy politician",
	"is the first to loot every enemy",
	"is the party's biggest critic",
	"is the party's biggest fan",
	"is tone-deaf, but sings all the time",
	"is tough-as-nails",
	"is uncomfortable around dwarves",
	"is uncomfortable in armor",
	"is vegan, and makes sure everyone knows",
	"is vegetarian",
	"is very good at running",
	"is writing a novel about their heroic adventures",
	"keeps a diary of all the creatures they come across",
	"keeps getting mistaken for a famous icon",
	"keeps lists about everything",
	"keeps track of their kills",
	"knows a guy",
	"knows how to ride most creatures",
	"knows the location of a huge weapons cache",
	"knows their way around a workshop",
	"knows what its like to die",
	"likes to craft personal items rather than buy them",
	"looks down on anyone who is poorer than they are",
	"lost the love of their life. In a bet.",
	"lost their family in a dragon attack",
	"loves to dance",
	"makes inappropriate jokes at the worst times",
	"must read every book they come across",
	"never takes their armour off",
	"once started a rebellion",
	"only makes eye contact with people they like",
	"owes a debt collector an airship",
	"really knows how to party",
	"refuses to use a weapon",
	"saw their whole family killed by slaad",
	"seems aloof and distant",
	"smells like old cheese",
	"smokes too much herb, like all the time",
	"speaks exclusively in rhyme",
	"speaks in monotone",
	"speaks to people as though hes being hunted",
	"speaks to people as though hes hunting them",
	"speaks with a stutter",
	"suffers from claustrophobia",
	"suffers from night terrors",
	"suffers from sneezing attacks",
	"talks about stabbing people entirely too often",
	"talks to themself",
	"thinks of themselves as a private investigator",
	"thinks that they are amazing at combat, but are the worst in the party",
	"thinks they are a brilliant wizard",
	"thinks they are always surrounded by a force field",
	"wants everyone to like them",
	"wants to be a dancer",
	"wants to be a famous adventurer",
	"wants to be a princess",
	"wants to be a sky-pirate captain",
	"wants to one day own their own airship",
	"wants to open their own bar",
	"wants to settle down and have a family",
	"was born the opposite of their current gender",
	"was grown in a vat and has no family",
	"was once a completely different race",
	"was once very wealthy but lost everything",
	"was told by their parents they'll never be good enough",
	"wears rings, which isn’t cool, but its cool that they don’t care if they’re cool",
	"who donates time to local charities",
	"will always choose to bluff an enemy",
	"will always go for a swim in bodies of water they come across",
	"will always try to bribe officials",
	"will follow their party members blindly",
	"will never dance",
	"will only fight with ranged weapons",
	"will throw fireballs first and ask questions later",
	"won't stop believing",
	"would rather be farming than adventuring"
];

function getArticle(word: string): string {
	var article;
	if (['a','e','i','o','u'].includes(word.toLowerCase().charAt(0))) {
	  article = 'an ' + word;
	} else {
	  article = 'a ' + word;
	}
	return article;
}
/* /Based on sfrpgtools characterGen.v2.1.js */

/**
 * Is this NPC a 'he', 'she', or 'they'?
 * @param gender e.g. 'female', 'male', etc.
 */
function getPronoun(gender: string): string {
	var pronoun = 'they';
	if (gender.toLowerCase() == 'female') {
		pronoun = 'she';
	}
	else if (gender.toLowerCase() == 'male') {
		pronoun = 'he';
	}
	return pronoun;
}

/**
 * Determines which word is correct for the specified pronoun based on an array of possible values
 * @param pronoun The pronoun from which to determine the correct word
 * @param wordForms Possible word forms. The first index is for 'he' or 'she'. The second is for 'they'.
 */
function conjugate(pronoun: string, wordForms: string[]): string {
	var result = wordForms[0];
	if (pronoun.toLowerCase() == 'they') {
		result = wordForms[1];
	}
	return result;
}

function getNPCOldness(npc: NPC) {
	var rt = getRacialTraits(npc.race);
	var ageMod = (npc.age - rt.adultAge)/(rt.maxAge - rt.adultAge);
	return ageMod;
}

function randomizeNPC(npc: NPC, name?: string, race?: string, gender?: string, age?: number | string, alignment?: string)
{
	if (totaledWeights.Race < 0) {
		initializeNPCGen();
	}
	// npc.race = race || races[Math.floor(Math.random() * races.length)];
	npc.race = race? race : weightedRandom(racesWeighted, totaledWeights.Race);
	let rt = getRacialTraits(npc.race);
	npc.gender = gender || randomize(rt.genders);
	getNPCAge(npc, rt, age as number);
	npc.name = name || NameGenerator.full(npc.race, npc.gender, npc.relativeAge);
	npc.alignment = alignment || randomize(rt.alignments);
	npc.threat = weightedRandom(threatLevels, totaledWeights.Threat);
	npc.profession = weightedRandom(professions, totaledWeights.Profession);
	npc.description = getNPCDescription(npc.race, npc.relativeAge, npc.profession, npc.gender);
}

/**
 * Sets the age properties for an NPC.
 * @param npc Target NPC
 * @param rt The Traits for the NPC's species
 * @param ageCategory On a scale of 1-4, how old are they?
 */
function getNPCAge(npc: NPC, rt: RacialTraitSet, ageCategory?: number|string)
{
	if (ageCategory == undefined || ageCategory == 0)
	{
		ageCategory = weightedRandom(AgeRanks);
	}
	switch (parseInt(ageCategory as string)) {
		case 1:
			// Child
			npc.age = Math.max(rollDie(rt.adultAge), 1);
			npc.relativeAge = AgeList[0];
			break;
		case 2:
			// Young Adult
			// adultAge + (maxAge * (random/5))
			npc.age = rt.adultAge + Math.floor(Math.random() * Math.random() * (rt.maxAge / 5));
			npc.relativeAge = AgeList[1];
			break;
		case 3:
			// Adult
			npc.age = rt.adultAge + Math.floor((rt.maxAge / 5)) + Math.floor(Math.random() * Math.random() * 2 * (rt.maxAge / 5));
			npc.relativeAge = AgeList[2];
			break;
		case 4:
			// Old
			npc.age = rt.maxAge - Math.floor(Math.random() * Math.random() * (rt.maxAge / 5));
			npc.relativeAge = AgeList[3];
			break;
	}
}

function getNPCDescription(race?: string, age?: string, profession?: string, gender?: string) {
	var Age = age || randomize(AgeList);
	var Race = race || randomize(races);
	var Gender = gender || randomize(['female', 'male']);
	var Profession = profession || weightedRandom(professions, totaledWeights.Profession);
	var Who = randomize(WhoList);
	var Personality = randomize(PersonalityList) + ' and ' + randomize(PersonalityList);
	var From = randomize(FromList);
	// var result = getArticle(Age).capitalize() + " " + Race.toLowerCase() + ", who " + Who + " and comes from " + From + ". They are " + Personality.toLowerCase() + ", and have found work as " + getArticle(Profession.toLowerCase()) + ".";
	let pronoun = getPronoun(Gender).capitalize();
	var result = `${getArticle(Age).capitalize()} ${Race.toLowerCase()}, who ${Who} and comes from ${From}. ${pronoun} ${conjugate(pronoun, ["is", "are"])} ${Personality.toLowerCase()}, and ${conjugate(pronoun, ["has", "have"])} found work as ${getArticle(Profession.toLowerCase())}.`;
	return result;
}

function initializeNPCGen()
{
	spawnFrequencySum = 0;
	totaledWeights.Race = 0;
	for (let i = 0; i < races.length; i++)
	{
		const e = races[i];
		racesWeighted[e] = getRacialTraits(e).spawnFrequency;
		spawnFrequencySum += getRacialTraits(e).spawnFrequency;
		totaledWeights.Race += getRacialTraits(e).spawnFrequency;
		// if (RacialTraits.hasOwnProperty(e))
		// {
		// 	spawnFrequencySum += getNPCRacialTraits(e).spawnFrequency;
		// }
	}
	totaledWeights.Threat = getTotalWeight(threatLevels);
	totaledWeights.Profession = getTotalWeight(professions);
}

//#region Tests
function testRaceMapping()
{
	for (let i = 0; i < races.length; i++)
	{
		const e = races[i];
		if (!RacialTraits.hasOwnProperty(e))
		{
			console.log(`ID "${e}" was not found in racialtraits.js`);
		}
	}
}
//#endregion