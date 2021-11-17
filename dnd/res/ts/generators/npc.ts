enum NPCGenFilterCategory
{
	Age = "age",
	Alignment = "alignment",
	Gender = "gender",
	Intelligence = "intelligence",
	PersonalityTags = "personality tags",
	Profession = "profession",
	Species = "species"
}

enum NPCGenFilterType
{
	Exclude = "exclude",
	Include = "include"
}

enum AgeCategory
{
	Child = 'child',
	YoungAdult = 'young adult',
	Adult = 'adult',
	Old = 'old'
}

interface IFilterableWeightedKeyListEntry
{
	type: NPCGenFilterType;
	category: NPCGenFilterCategory;
	values: any[];
	keys: IWeightedKeyList;
}

interface IFilterableWeightedKeyList
{
	generic: IWeightedKeyList;
	specific: IFilterableWeightedKeyListEntry[];
}

var races: string[] = [];

class NPCDeepGenerator
{
	totaledWeights = {
		Age: -1,
		Race: -1,
		Threat: -1,
	};

	racesWeighted: IWeightedKeyList = {};

	threatLevels: IWeightedKeyList = {
		"very low": 5,
		"low": 6,
		"slightly low": 5,
		"medium": 4,
		"slightly high": 3,
		"high": 2,
		"very high": 1
	};

	intelligenceLevels: IFilterableWeightedKeyList = {
		generic: {
			"very low": 20,
			"low": 40,
			"average": 60,
			"high": 20,
			"very high": 10
		},
		specific: [
			// Cultures more likely to be dumb
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["bugbear", "orc"],
				keys: {
					"very low": 40,
					"low": 60,
					"average": 20,
					"high": 2,
					"very high": 1,
				}
			},
			// Cultures more likely to be smart
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["elf", "gnome", "hobgoblin"],
				keys: {
					"very low": 10,
					"low": 20,
					"average": 60,
					"high": 40,
					"very high": 20,
				}
			},
		]
	};

	professions: IFilterableWeightedKeyList = {
		generic: {
			"Actor": 20,
			"Adventurer": 100,
			"Airship Pilot": 40,
			"Alchemist": 40,
			"Archaeologist": 50,
			"Architect": 40,
			"Armorer": 30,
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
			"Chimney Sweep": 100,
			"Clothier": 100,
			"Cobbler": 100,
			"Comedian": 40,
			"Cook": 100,
			"Courtesan": 60,
			"Counselor": 40,
			"Dancer": 80,
			"Dockworker": 100,
			"Dove Farmer": 50,
			"Engineer": 60,
			"Executioner": 60,
			"Exorcist": 50,
			"Farmer": 100,
			"Farmhand": 100,
			"Fisherman": 100,
			"Gambler": 40,
			"Ghost Hunter": 40,
			"Gladiator": 80,
			"Guard": 100,
			"Guide": 20,
			"Haberdasher": 40,
			"Healer": 60,
			"Herbalist": 60,
			"Hobo": 100,
			"Housekeeper": 100,
			"Hunter": 100,
			"Innkeeper": 100,
			"Janitor": 100,
			"Jester": 50,
			"Jeweler": 80,
			"Judge": 20,
			"Knight": 80,
			"Lady": 2,
			"Lawyer": 50,
			"Librarian": 40,
			"Lord": 2,
			"Lumberjack": 100,
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
			"Planeswalker": 5,
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
			"Shepherd": 80,
			"Snake Farmer": 10,
			"Spy": 10,
			"Squire": 100,
			"Starving Artist": 90,
			"Tailor": 100,
			"Teacher": 50,
			"Town Crier": 50,
			"Therapist": 50,
			"Tour Guide": 5,
			"Train Conductor": 5,
			"Translator": 50,
			"Undertaker": 20,
			"Urchin": 100,
			"Writer": 50
		},
		specific: [
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Alignment,
				values: ["LG", "LN"],
				keys: {
					"Airship Pirate": 80,
					"Con Artist": 30,
					"Pickpocket": 100,
					"Pirate": 50,
					"Smuggler": 100,
					"Thief": 100,
				}
			},
			{
				// Evil alignments only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Alignment,
				values: ["LE", "NE", "CE"],
				keys: {
					"Thug": 100,
				}
			},
			{
				// Smart people only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Intelligence,
				values: ["high", "very high"],
				keys: {
					"Clock Maker": 50,
					"Wizard": 55,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["dwarf"],
				keys: {
					"Armorer": 200,
					"Blacksmith": 500,
					"Miner": 1500,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["halfling"],
				keys: {
					"Barkeep": 200,
					"Farmer": 200,
					"Farmhand": 200,
					"Innkeeper": 200,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["halforc"],
				keys: {
					"Gladiator": 1000,
					"Mercenary": 1500,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["grippli"],
				keys: {
					"Alchemist": 500,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["tabaxi"],
				keys: {
					"Snake Farmer": 100,
				}
			},
		]
	}

	PersonalityTagList: IFilterableWeightedKeyList = {
		generic: {
			//#region mutually exclusive pairs
			"Quiet": 10,
			"Loud": 10,
			"Polite": 10,
			"Rude": 10,
			"Nice": 10,
			"Mean": 10,
			"High Energy": 10,
			"Low Energy": 10,
			"Positive": 10,
			"Negative": 10,
			"Extroverted": 10,
			"Introverted": 10,
			"Proper": 10,
			"Improper": 10,
			"Honest": 10,
			"Dishonest": 10,
			"Confident": 10,
			"Insecure": 10,
			"Left Brain": 10,
			"Right Brain": 10,
			"Calm": 10,
			"High Strung": 10,
			//#endregion

			//#region standalone
			"Material": 10,
			"Serious": 10,
			"Shallow": 10,
			//#endregion
		},
		specific: [
			//#region Handle mutually exclusive personality traits
			//#region Calm/High Strung
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Calm"],
				keys: {
					"High Strung": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["High Strung"],
				keys: {
					"Calm": 0,
				}
			},
			//#endregion
			//#region Confident/Insecure
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Confident"],
				keys: {
					"Insecure": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Insecure"],
				keys: {
					"Confident": 0,
				}
			},
			//#endregion
			//#region Extroverted/Introverted
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Introverted"],
				keys: {
					"Extroverted": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Extroverted"],
				keys: {
					"Introverted": 0,
				}
			},
			//#endregion
			//#region High Energy/Low Energy
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["High Energy"],
				keys: {
					"Low Energy": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Low Energy"],
				keys: {
					"High Energy": 0,
				}
			},
			//#endregion
			//#region Honest/Dishonest
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Honest"],
				keys: {
					"Dishonest": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Dishonest"],
				keys: {
					"Honest": 0,
				}
			},
			//#endregion
			//#region Loud/Quiet
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Loud"],
				keys: {
					"Quiet": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Quiet"],
				keys: {
					"Loud": 0,
				}
			},
			//#endregion
			//#region Left Brain/Right Brain
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Left Brain"],
				keys: {
					"Right Brain": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Right Brain"],
				keys: {
					"Left Brain": 0,
				}
			},
			//#endregion
			//#region Mean/Nice
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Nice"],
				keys: {
					"Mean": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Mean"],
				keys: {
					"Nice": 0,
				}
			},
			//#endregion
			//#region Polite/Rude
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Polite"],
				keys: {
					"Rude": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Rude"],
				keys: {
					"Polite": 0,
				}
			},
			//#endregion
			//#region Positive/Negative
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Positive"],
				keys: {
					"Negative": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Negative"],
				keys: {
					"Positive": 0,
				}
			},
			//#endregion
			//#region Proper/Improper
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Proper"],
				keys: {
					"Improper": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Improper"],
				keys: {
					"Proper": 0,
				}
			},
			//#endregion
			//#endregion
		]
	}

	AgeList: IWeightedKeyList = {
		'child': 0.05,
		'young adult': 0.40,
		'adult': 0.39,
		'old': 0.16
	};

	PersonalityList: IFilterableWeightedKeyList = {
		generic: {
			"A Know-it-all": 10,
			"Accusative": 10,
			"Active": 10,
			"Adventurous": 10,
			"Affable": 10,
			"Aggressive": 10,
			"Aimless": 10,
			"Aloof": 10,
			"Altruistic": 10,
			"Analytical": 10,
			"Angry": 10,
			"Animated": 10,
			"Annoying": 10,
			"Anxious": 10,
			"Apathetic": 10,
			"Apologetic": 10,
			"Apprehensive": 10,
			"Articulate": 10,
			"Attentive": 10,
			"Blustering": 10,
			"Bookish": 10,
			"Bossy": 10,
			"Brash": 10,
			"Brave": 10,
			"Candid": 10,
			"Capricious": 10,
			"Careful": 10,
			"Careless": 10,
			"Casual": 10,
			"Cautious": 10,
			"Cavalier": 10,
			"Charming": 10,
			"Chaste": 10,
			"Childish": 10,
			"Clumsy": 10,
			"Comforting": 10,
			"Communicative": 10,
			"Complacent": 10,
			"Confused": 10,
			"Conservative": 10,
			"Contrary": 10,
			"Conventional": 10,
			"Cooperative": 10,
			"Coy": 10,
			"Curious": 10,
			"Daring": 10,
			"Defensive": 10,
			"Defiant": 10,
			"Deliberate": 10,
			"Deluded": 10,
			"Depraved": 10,
			"Determined": 10,
			"Discreet": 10,
			"Disloyal": 10,
			"Distant": 10,
			"Distracted": 10,
			"Dominating": 10,
			"Dramatic": 10,
			"A Drunkard": 10,
			"Dull": 10,
			"Earthy": 10,
			"Eccentric": 10,
			"Elitist": 10,
			"Emotional": 10,
			"Enigmatic": 10,
			"Enthusiastic": 10,
			"Evangelical": 10,
			"Expressive": 10,
			"Faithful": 10,
			"Fanatical": 10,
			"Fatalistic": 10,
			"Fearless": 10,
			"Feral": 10,
			"Fierce": 10,
			"Flamboyant": 10,
			"Flippant": 10,
			"Foolhardy": 10,
			"Foppish": 10,
			"Forgiving": 10,
			"Frustrated": 10,
			"Graceful": 10,
			"Gracious": 10,
			"Gullible": 10,
			"Idealistic": 10,
			"Idiosyncratic": 10,
			"Imaginative": 10,
			"Imitative": 10,
			"Impatient": 10,
			"Implacable": 10,
			"Impractical": 10,
			"Impulsive": 10,
			"Inattentive": 10,
			"Incoherent": 10,
			"Indifferent": 10,
			"Indiscreet": 10,
			"Individualist": 10,
			"Indomitable": 10,
			"Industrious": 10,
			"Insolent": 10,
			"Instructive": 10,
			"Irreligious": 10,
			"Irresponsible": 10,
			"Irreverent": 10,
			"Loving": 10,
			"Loyal": 10,
			"Madcap": 10,
			"Meddlesome": 10,
			"Melodramatic": 10,
			"Meticulous": 10,
			"Mischievous": 10,
			"Mouthy": 10,
			"Narrow-minded": 10,
			"Neurotic": 10,
			"Noble": 10,
			"Nonchalant": 10,
			"Nurturing": 10,
			"Obedient": 10,
			"Oblivious": 10,
			"Obnoxious": 10,
			"Obsessive": 10,
			"Obtuse": 10,
			"Odd": 10,
			"Overbearing": 10,
			"Paranoid": 10,
			"Passionate": 10,
			"Patient": 10,
			"Peaceful": 10,
			"Pensive": 10,
			"Pessimistic": 10,
			"Philosophical": 10,
			"Phony": 10,
			"Pious": 10,
			"Pleasant": 10,
			"Poised": 10,
			"Pompous": 10,
			"Pondering": 10,
			"Practical": 10,
			"Prejudiced": 10,
			"Pretentious": 10,
			"Preoccupied": 10,
			"Proper": 10,
			"Proud": 10,
			"Prudent": 10,
			"Prudish": 10,
			"Prying": 10,
			"Quirky": 10,
			"Rascally": 10,
			"Realistic": 10,
			"Reckless": 10,
			"Refined": 10,
			"Reserved": 10,
			"Responsible": 10,
			"Restless": 10,
			"Rigid": 10,
			"Risk-taking": 10,
			"Sadistic": 10,
			"Sarcastic": 10,
			"Sassy": 10,
			"Savage": 10,
			"Scolding": 10,
			"Secretive": 10,
			"Self-effacing": 10,
			"Sensible": 10,
			"Sensitive": 10,
			"Sentimental": 10,
			"Shifty": 10,
			"Shrewd": 10,
			"Sincere": 10,
			"Slanderous": 10,
			"Sly": 10,
			"Smug": 10,
			"Snobbish": 10,
			"Sober": 10,
			"Solemn": 10,
			"Solitary": 10,
			"Stern": 10,
			"Stingy": 10,
			"Stoic": 10,
			"Stubborn": 10,
			"Submissive": 10,
			"Sultry": 10,
			"Superstitious": 10,
			"Suspicious": 10,
			"Sympathetic": 10,
			"Tactful": 10,
			"Thorough": 10,
			"Thrifty": 10,
			"Transparent": 10,
			"Treacherous": 10,
			"Tricky": 10,
			"Trusting": 10,
			"Uncommitted": 10,
			"Understanding": 10,
			"Unhinged": 10,
			"Uninhibited": 10,
			"Unpredictable": 10,
			"Vague": 10,
			"Vengeful": 10,
			"Vigilant": 10,
			"Violent": 10,
			"Vivacious": 10,
			"Wasteful": 10,
			"Whiny": 10,
			"Witty": 10
		},
		specific: [
			//#region Handle alignments
			{
				// evil only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Alignment,
				values: ["LE", "NE", "CE"],
				keys: {
					"Malicious": 10,
					"Nefarious": 10,
					"Selfish": 10,
					"Wicked": 10,
				}
			},
			{
				// exclude evil
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Alignment,
				values: ["LE", "NE", "CE"],
				keys: {
					"Conscientious": 10,
				}
			},
			{
				// good only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Alignment,
				values: ["LG", "NG", "CG"],
				keys: {
					"Selfless": 10,
				}
			},
			{
				// exclude good
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Alignment,
				values: ["LG", "NG", "CG"],
				keys: {
					"Cruel": 10,
				}
			},
			{
				// chaotic only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Alignment,
				values: ["CG", "CN", "CE"],
				keys: {
					"Rebellious": 10,
				}
			},
			//#endregion

			//#region Handle age
			{
				// Old only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Age,
				values: ["old"],
				keys: {
					"Senile": 10,
				}
			},
			//#endregion

			//#region handle Personality Tags
			//#region Calm/High Strung
			{
				// Calm only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["High Strung"],
				keys: {
					"Calm": 10,
					"Laid-back": 10,
					"Serene": 10,
				}
			},
			{
				// High Strung only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Calm"],
				keys: {
					"Frightened": 10,
					"Jumpy": 10,
					"Nervous": 10,
				}
			},
			//#endregion
			//#region Confident/Insecure
			{
				// Confident only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Insecure"],
				keys: {
					"Arrogant": 10,
					"Cocky": 10,
					"Confident": 10,
					"Courageous": 10,
				}
			},
			{
				// Insecure only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Confident"],
				keys: {
					"Cowardly": 10,
					"Insecure": 10,
					"Jealous": 10,
					"Scared": 10,
				}
			},
			//#endregion
			//#region Energy Levels
			{
				// High Energy only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Low Energy"],
				keys: {
					"Energetic": 10,
					"Excited": 10,
					"Hyper": 10,
				}
			},
			{
				// Exclude High Energy
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["High Energy"],
				keys: {
					"Weary": 10,
					"Wistful": 10,
				}
			},
			{
				// Low Energy only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Low Energy"],
				keys: {
					"Lazy": 10,
					"Lethargic": 10,
				}
			},
			//#endregion
			//#region Extroverted/Introverted
			{
				// Introverted only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Extroverted"],
				keys: {
					"Introverted": 10,
				}
			},
			{
				// Extroverted only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Introverted"],
				keys: {
					"Extroverted": 10,
					"Outgoing": 10,
					"Sociable": 10,
				}
			},
			//#endregion
			//#region Honest/Dishonest
			{
				// Honest only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Dishonest"],
				keys: {
					"Honest": 10,
				}
			},
			{
				// Dishonest only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Honest"],
				keys: {
					"Deceitful": 10,
					"Lying": 10,
				}
			},
			//#endregion
			//#region Left Brain/Right Brain
			{
				// Left Brain only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Right Brain"],
				keys: {
				}
			},
			{
				// Right Brain only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Left Brain"],
				keys: {
				}
			},
			//#endregion
			//#region Loud/Quiet
			{
				// Exclude Quiet
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Quiet"],
				keys: {
					"Loud": 10,
					"Talkative": 10,
				}
			},
			{
				// Exclude Loud
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Loud"],
				keys: {
					"A {Gendered:person|woman|man} of few words": 10,
					"Quiet": 10,
					"Shy": 10,
					"Timid": 10,
				}
			},
			//#endregion
			//#region Mean/Nice
			{
				// Exclude Mean
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Mean"],
				keys: {
					"Agreeable": 10,
					"Caring": 10,
					"Friendly": 10,
					"Generous": 10,
					"Gentle": 10,
					"Helpful": 10,
					"Kind": 10,
					"Sweet": 10,
				}
			},
			{
				// Exclude Nice
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Nice"],
				keys: {
					"Ageist": 10,
					"Bigoted": 10,
					"Bullying": 10,
					"Callous": 10,
					"Cantankerous": 10,
					"Chauvinistic": 10,
					"Condescending": 10,
					"Cranky": 10,
					"Critical": 10,
					"Grouchy": 10,
					"Harsh": 10,
					"Hateful": 10,
					"Hostile": 10,
					"Insensitive": 10,
					"Irritable": 10,
					"Judgmental": 10,
					"Mean": 10,
					"Merciless": 10,
					"Racist": 10,
					"Sexist": 10,
					"Unfriendly": 10,
				}
			},
			//#endregion
			//#region Polite/Rude
			{
				// Polite only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Rude"],
				keys: {
					"Chivalrous": 10,
					"Courteous": 10,
					"Polite": 10,
					"Respectful": 10,
				}
			},
			{
				// Rude only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Polite"],
				keys: {
					"Argumentative": 10,
					"Disrespectful": 10,
					"Rude": 10,
				}
			},
			//#endregion
			//#region Positive/Negative
			{
				// Exclude Negative
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Negative"],
				keys: {
					"Cheerful": 10,
					"Hopeful": 10,
					"Jolly": 10,
					"Joyous": 10,
					"Merry": 10,
					"Optimistic": 10,
				}
			},
			{
				// Exclude Positive
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Positive"],
				keys: {
					"Bitter": 10,
					"Cynical": 10,
					"Depressed": 10,
					"Gloomy": 10,
					"Melancholy": 10,
					"Morbid": 10,
					"Mournful": 10,
				}
			},
			//#endregion
			//#region Proper/Improper
			{
				// Proper only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Improper"],
				keys: {
					"Humble": 10,
					"Modest": 10,
				}
			},
			{
				// Improper only
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Proper"],
				keys: {
					"A Braggart": 10,
					"Boastful": 10,
					"Flirtatious": 10,
					"Gossipy": 10,
					"Lewd": 10,
					"Lustful": 10,
					"Promiscuous": 10,
					"Sensual": 10,
					"Shameless": 10,
					"Vulgar": 10,
				}
			},
			//#endregion
			{
				// Material only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Material"],
				keys: {
					"Greedy": 10,
				}
			},
			{
				// Shallow only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Shallow"],
				keys: {
					"Shallow": 10,
					"Vain": 10,
					"Vapid": 10,
				}
			},
			//#region Serious
			{
				// Serious only
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Serious"],
				keys: {
					"Humorless": 10,
					"Serious": 10,
				}
			},
			{
				// Exclude Serious
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.PersonalityTags,
				values: ["Serious"],
				keys: {
					"Cheeky": 10,
					"Funny": 10,
					"Humorous": 10,
					"Playful": 10,
					"Whimsical": 10,
					"Wisecracking": 10,
				}
			},
			//#endregion
			//#endregion
		]
	};

	FromList: IFilterableWeightedKeyList = {
		generic: {
			"a backwater village": 20,
			"a beautiful, green valley": 10,
			"a broken home": 20,
			"a bustling market": 10,
			"a bustling underground city": 10,
			"a city no one else has ever heard of": 10,
			"a city ravaged by war": 10,
			"a company of mercenaries and sellswords": 10,
			"a depleted mine": 10,
			"a now barren farmland": 10,
			"a disease ridden city": 10,
			"a disgraced family of scrap collectors": 10,
			"a dusty mountain range": 10,
			"a fallen kingdom in the wilds": 10,
			"a farming village in a lush forest": 10,
			"a flotilla of ships that's always on the move": 10,
			"a forgotten elven monastery": 10,
			"a frozen wasteland": 10,
			"a halfway house": 10,
			"a hidden underground city": 10,
			"a laid back beach town": 10,
			"a large desert metropolis": 10,
			"a large family, with many siblings": 10,
			"a large military outpost": 10,
			"a large secluded dungeon": 10,
			"a military stronghold": 10,
			"a mutinied prison ship": 10,
			"a notorious dungeon": 10,
			"a peaceful coastal town": 10,
			"a peaceful nomadic culture": 10,
			"a place only {GenderPronoun} can pronounce": 5,
			"a powerful trading city": 10,
			"a royal lineage": 10,
			"a run-down bar": 10,
			"a run-down adventurers guild": 10,
			"a secret barracks": 10,
			"a shanty town in a scrapyard": 10,
			"a sheltered upbringing": 10,
			"a slave market": 10,
			"a slave owning city": 10,
			"a sleepy harbour town": 10,
			"a small desert village": 10,
			"a small family transport company": 10,
			"a small farm": 10,
			"a small island": 10,
			"a small oasis village": 10,
			"a small town where nothing ever happened": 10,
			"a small village of barbarians": 10,
			"a street gang in a large city": 10,
			"a strict, religious temple": 10,
			"a thriving port town": 10,
			"a town run by gangs": 10,
			"a travelling theatre company": 10,
			"a tropical paradise": 10,
			"a very religious family": 10,
			"a very tiny village": 10,
			"a vile village in a swamp": 10,
			"an abandoned fortress": 10,
			"an actual castle": 10,
			"an ancient temple run by monks": 10,
			"an aristocratic family": 10,
			"an engineer's guild": 10,
			"an extremist cult": 10,
			"an orphanage": 10,
			"an underwater bubble city": 1,
			"an underwater city protected by a magical force field": 1,
			"beyond the known world": 5,
			"one of the great libraries": 10,
			"the city post office": 10,
			"the city watch": 10,
			"the forests of the Verdant Isle": 10,
			"the frozen wastes of Notre": 10,
			"the local academy": 10,
			"the jungles of Chupajiji": 1,
			"the outskirts of a large city": 10,
			"the remains of a sunken city": 10,
			"the slums of a large city": 10
		},
		specific: [
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["aarakocra"],
				keys: {
					"the peaks of Notriven": 50,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["bullywug"],
				keys: {
					"a vile village in a swamp": 50,
				}
			},
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["firbolg"],
				keys: {
					"a rural construction guild": 10,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["grung"],
				keys: {
					"the jungles of Chupajiji": 50,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["triton"],
				keys: {
					"an underwater bubble city": 10,
					"an underwater city protected by a magical force field": 10,
				}
			},
		]
	};

	WhoList: IFilterableWeightedKeyList = {
		generic: {
			"always carries multiple wallets (in case one is stolen)": 10,
			"always keeps {HisHer} promises": 10,
			"always looks {HisHer} best": 10,
			"always refers to inanimate objects as 'she'": 10,
			"always thinks outside the box": 10,
			"always wears the sweetest kicks": 10,
			"avoids the city guard at all costs": 10,
			"believes dungeon crawling is just breaking and entering": 10,
			"believes lizardfolk control the government": 10,
			"believes plate armour is just a sign of being posh and over privileged": 10,
			"believes {GenderPronoun} is destined for a higher calling": 10,
			"believes {GenderPronoun} can speak to plants": 10,
			"blames all {HisHer} misfortune on ghosts": 10,
			"can pilot any vehicle": 10,
			"can't read": 10,
			"can't stand the sight of blood": 10,
			"can't swim": 10,
			"can't tolerate gluten": 10,
			"constantly has a broken arm, looking for help": 10,
			"covered in maze tattoos": 10,
			"deserted the military": 10,
			"distrusts all authority": 10,
			"distrusts anyone shorter than {HimHer}": 10,
			"distrusts anyone taller than {HimHer}": 10,
			"doesn't believe in magic": 10,
			"doesn't know {HisHer} own strength": 10,
			"doesn't speak a word of common": 10,
			"doesn't understand sarcasm": 10,
			"doesn't understand the concept of politeness": 10,
			"dresses provocatively": 10,
			"fears technology": 10,
			"fights for species equality": 10,
			"finds it hard to relate to others": 10,
			"finds it hard to work as a team": 10,
			"flirts relentlessly": 10,
			"gets nervous when public speaking": 10,
			"gets startled at the slightest raise in someones tone": 10,
			"gives people small, strangely-specific amounts of money for doing the simplest errands": 10,
			"gives the best gifts": 10,
			"gives {HisHer} weapons names": 10,
			"had {HisHer} mind wiped by parties unknown": 10,
			"has a burning hatred for pirates": 10,
			"has a drinking problem": 10,
			"has a gambling problem": 10,
			"has a huge debt to pay back": 10,
			"has a limp": 10,
			"has a lisp": 10,
			"has a price on {HisHer} head": 10,
			"has a quick answer for every question, but is always wrong": 10,
			"has a split personality who is {HisHer} complete opposite, changes personalities when exposed to a specific stimuli,": 10,
			"has a thirst for all knowledge": 10,
			"has a twin and constantly gets confused for them": 10,
			"has a well kept mustache": 10,
			"has accepted death as an inevitability": 10,
			"has an incredible fashion sense": 10,
			"has anger problems": 10,
			"has bad hygiene": 10,
			"has been on the run for several years": 10,
			"has body image issues": 10,
			"has connections to underworld crime syndicates": 10,
			"has many identities in different cities": 10,
			"has no concept of personal space": 10,
			"has nothing left to lose": 10,
			"has stolen someone's identity": 10,
			"has the itch to explore other continents": 10,
			"has the loudest laugh in the room": 10,
			"has to have rice with every meal": 10,
			"has to urinate frequently": 10,
			"hasn't been quite right. Not since the accident": 10,
			"hates being on dry land": 10,
			"hates children": 10,
			"hates crowds": 10,
			"hates fighting": 10,
			"hates to be clean": 10,
			"hates wearing armor face masks": 10,
			"hears voices": 10,
			"is a compulsive liar": 10,
			"is a pacifist": 10,
			"is a retired adventurer": 10,
			"is a total gear-head": 10,
			"is addicted to runic tattoos": 10,
			"is afraid of crossbows": 10,
			"is afraid of heights": 10,
			"is afraid of the dark": 10,
			"is always warm and friendly": 10,
			"is always hungry": 10,
			"is an alcoholic": 10,
			"is an avid conspiracy theorist": 10,
			"is being hunted by a horrible beast": 10,
			"is completely mute": 10,
			"is endlessly amused by magic": 10,
			"is much older than {GenderPronoun} looks": 10,
			"is much younger than {GenderPronoun} looks": 10,
			"is nearly deaf": 10,
			"is not very good at sports": 10,
			"is obsessed with carriages": 10,
			"is obsessed with the local sports team": 10,
			"is obsessed with {HisHer} hair": 10,
			"is responsible for the death of a family member": 10,
			"is running from {HisHer} debt": 10,
			"is scared of airship travel": 10,
			"is secretly a dragon": 5,
			"is secretly a fallen deva": 5,
			"is secretly a hag": 5,
			"is secretly a succubus/incubus": 5,
			"is slightly overweight": 10,
			"is so laid back {GenderPronoun} often comes across as rude and uncaring": 10,
			"is superstitious": 10,
			"is the escaped clone of a wealthy politician": 5,
			"is the first to loot every enemy": 10,
			"is the party's biggest critic": 10,
			"is the party's biggest fan": 10,
			"is tone-deaf, but sings all the time": 10,
			"is tough-as-nails": 10,
			"is uncomfortable around old people (they smell like death)": 10,
			"is uncomfortable in armor": 10,
			"is vegan, and makes sure everyone knows": 10,
			"is very good at running": 10,
			"is writing a novel about {HisHer} heroic adventures": 10,
			"is writing an epic poem about the party's adventure": 10,
			"keeps a diary of all the creatures {GenderPronoun} comes across": 10,
			"keeps getting mistaken for a famous knight": 5,
			"keeps lists about everything": 10,
			"keeps track of {HisHer} kills": 10,
			"knows a guy": 10,
			"knows how to ride most creatures": 10,
			"knows the location of a huge weapons cache": 10,
			"knows {HisHer} way around a workshop": 10,
			"knows what it's like to die": 10,
			"likes to craft personal items rather than buy them": 10,
			"looks down on anyone who is poorer than {GenderPronoun} is": 10,
			"lost the love of {HisHer} life. In a bet.": 10,
			"lost {HisHer} family in a dragon attack": 10,
			"loves to dance": 10,
			"makes inappropriate jokes at the worst times": 10,
			"must read every book {GenderPronoun} comes across": 10,
			"never takes {HisHer} armour off": 10,
			"once started a rebellion": 10,
			"only makes eye contact with people {GenderPronoun} likes": 10,
			"owes a debt collector an airship": 10,
			"really knows how to party": 10,
			"refuses to use a weapon": 10,
			"saw {HisHer} whole family killed by slaad": 10,
			"seems aloof and distant": 10,
			"seems to know everyone": 10,
			"smells like old cheese": 10,
			"smokes too much herb, like all the time": 10,
			"speaks exclusively in rhyme": 5,
			"speaks in monotone": 10,
			"speaks to people as though {GenderPronoun}'s being hunted": 10,
			"speaks to people as though {GenderPronoun}'s hunting them": 10,
			"speaks with a stutter": 10,
			"suffers from claustrophobia": 10,
			"suffers from night terrors": 10,
			"suffers from sneezing attacks": 10,
			"talks about stabbing people entirely too often": 10,
			"talks to {HimHer}self": 10,
			"thinks of {HimHer}self as a private investigator": 10,
			"thinks that {GenderPronoun} is amazing at combat, but is the worst in the party": 10,
			"thinks {GenderPronoun} are a brilliant wizard": 10,
			"thinks {GenderPronoun} are always surrounded by a magical force field": 10,
			"wants everyone to like them": 10,
			"wants to be a dancer": 10,
			"wants to be a famous adventurer": 10,
			"wants to be a princess": 10,
			"wants to be a sky-pirate captain": 10,
			"wants to one day own {HisHer} own airship": 10,
			"wants to open {HisHer} own bar": 10,
			"wants to settle down and have a family": 10,
			"was born the opposite of their current gender": 5,
			"was grown in a vat and has no family": 5,
			"was once a completely different race": 5,
			"was once very wealthy but lost everything": 10,
			"was told by {HisHer} parents {GenderPronoun}'ll never be good enough": 10,
			"wears rings, which isn't cool, but it's cool that {GenderPronoun} doesn't care if they're cool": 10,
			"who donates time to local charities": 10,
			"will always choose to bluff an enemy": 10,
			"will always go for a swim in bodies of water {GenderPronoun} comes across": 10,
			"will always try to bribe officials": 10,
			"will follow {HisHer} friends and allies blindly": 10,
			"will never dance": 10,
			"will only fight with ranged weapons": 10,
			"will throw fireballs first and ask questions later": 10,
			"won't stop believing": 10,
			"would rather be farming than adventuring": 10
		},
		specific: [
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["halfling"],
				keys: {
					"has an irrational fear of halflings": 10
				}
			},
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["dwarf"],
				keys: {
					"doesn't believe in dwarves": 10,
					"is uncomfortable around dwarves": 10,
				}
			},
			{
				// no carnivores
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["bloodfin", "lizardfolk"],
				keys: {
					"is vegetarian": 10,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Species,
				values: ["lizardfolk"],
				keys: {
					"believes lizardfolk control the government": 1,
				}
			},
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["gnome"],
				keys: {
					"is endlessly fascinated by gnome culture": 10,
				}
			},
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["hobgoblin"],
				keys: {
					"is downright racist towards hobgoblins": 10,
				}
			},
			{
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["warforged"],
				keys: {
					"doesn't trust warforged": 10,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Age,
				values: ["old"],
				keys: {
					"is a retired adventurer": 20,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Age,
				values: ["child"],
				keys: {
					"has a well kept mustache": 0,
					"is a retired adventurer": 0,
				}
			},
			{
				type: NPCGenFilterType.Include,
				category: NPCGenFilterCategory.Gender,
				values: ["female"],
				keys: {
					"has a well kept mustache": 0,
				}
			},
			{
				// List the species that can grow facial hair
				type: NPCGenFilterType.Exclude,
				category: NPCGenFilterCategory.Species,
				values: ["dwarf", "halforc", "hobgoblin", "human", "genasi", "gnome"],
				keys: {
					"has a well kept mustache": 0,
				}
			}
		]
	};

	/**
	 * Determines which word is correct for the specified pronoun based on an array of possible values
	 * @param pronoun The pronoun from which to determine the correct word
	 * @param wordForms Possible word forms. The first index is for 'he' or 'she'. The second is for 'they'.
	 */
	conjugate(pronoun: string, wordForms: string[]): string {
		var result = wordForms[0];
		if (pronoun.toLowerCase() == 'they') {
			result = wordForms[1];
		}
		return result;
	}

	getArticle(word: string): string {
		var article;
		if (['a','e','i','o','u'].includes(word.toLowerCase().charAt(0))) {
			article = 'an ' + word;
		}
		else
		{
			article = 'a ' + word;
		}
		return article;
	}

	/**
	 * Sets the age properties for an NPC.
	 * @param npc Target NPC
	 * @param rt The Traits for the NPC's species
	 * @param ageCategory On a scale of 1-4, how old are they?
	 */
	getNPCAge(npc: NPC, rt: IRacialTraitSet, ageCategory?: AgeCategory|AgeCategory[])
	{
		/**Declare variable and set placeholder value. */
		let selectedAgeCategory: AgeCategory = AgeCategory.Old;
		if (ageCategory == undefined)
		{
			selectedAgeCategory = weightedRandom(this.AgeList, this.totaledWeights.Age) as AgeCategory;
		}
		else if (Array.isArray(ageCategory))
		{
			let filteredAges: IWeightedKeyList = {};
			let filteredWeight = 0;
			for (let index = 0; index < ageCategory.length; index++) {
				const element = this.AgeList[ageCategory[index]];
				filteredAges[ageCategory[index]] = element;
				filteredWeight += element;
			}
			selectedAgeCategory = weightedRandom(filteredAges, filteredWeight) as AgeCategory;
		}
		else
		{
			selectedAgeCategory = ageCategory;
		}

		npc.relativeAge = selectedAgeCategory;
		switch (selectedAgeCategory) {
			case AgeCategory.Child:
				// Child
				npc.age = Math.max(rollDie(rt.adultAge), 1);
				break;
			case AgeCategory.YoungAdult:
				// Young Adult
				// adultAge + (maxAge * (random/5))
				npc.age = rt.adultAge + Math.floor(Math.random() * Math.random() * (rt.maxAge / 5));
				break;
			case AgeCategory.Adult:
				// Adult
				npc.age = rt.adultAge + Math.floor((rt.maxAge / 5)) + Math.floor(Math.random() * Math.random() * 2 * (rt.maxAge / 5));
				break;
			case AgeCategory.Old:
				// Old
				npc.age = rt.maxAge - Math.floor(Math.random() * Math.random() * (rt.maxAge / 5));
				break;
		}
	}

	/**How attractive (cute if child) is this NPC on a scale of 1-10? */
	getNPCAttractiveness(npc: NPC): number
	{
		const hotness = rollDie(10);
		switch (npc.relativeAge) {
			case AgeCategory.Child:
			case AgeCategory.YoungAdult:
			case AgeCategory.Adult:
				return hotness;
			case AgeCategory.Old:
				return Math.min(hotness, rollDie(10));
		}
		return hotness;
	}

	getNPCDescription(npc: NPC) {
		var Age = npc.relativeAge || weightedRandom(this.AgeList, this.totaledWeights.Age) as AgeCategory;
		var Race = npc.race || randomize(races);
		var Gender = npc.gender || randomize(['female', 'male']);
		var Profession = npc.profession || this.resolvePlaceholders(npc, filteredWeightedRandom(npc, this.professions));
		var Who = this.resolvePlaceholders(npc, filteredWeightedRandom(npc, this.WhoList));
		var Personality = this.resolvePlaceholders(npc, filteredWeightedRandom(npc, this.PersonalityList)) + ' and ' + this.resolvePlaceholders(npc, filteredWeightedRandom(npc, this.PersonalityList));
		var From = this.resolvePlaceholders(npc, filteredWeightedRandom(npc, this.FromList));
		let pronoun = this.getPronoun(Gender).capitalize();
		var result = `${this.getArticle(Age).capitalize()} ${Race.toLowerCase()}, who ${Who} and comes from ${From}. ${pronoun} ${this.conjugate(pronoun, ["is", "are"])} ${Personality.toLowerCase()}, and ${this.conjugate(pronoun, ["has", "have"])} found work as ${this.getArticle(Profession.toLowerCase())}.`;
		return result;
	}

	getNPCHairColor(npc: NPC): string {
		return HairGenerator.color(npc.race, npc.gender, npc.relativeAge);
	}

	getNPCHeight(npc: NPC): Length
	{
		let ra = this.getNPCRacialAppearance(npc.race);
		let result = new Length(ra.baseHeight);
		result.add(roll(ra.heightModifier) + "");
		return result;
	}

	getNPCOldness(npc: NPC) {
		var rt = getRacialTraits(npc.race);
		var ageMod = (npc.age - rt.adultAge)/(rt.maxAge - rt.adultAge);
		return ageMod;
	}

	getNPCPersonalityTags(npc: NPC)
	{
		let count = rollDie(5, 2); // get a number between 3 and 7
		for (let i = 0; i < count; i++)
		{
			let applicable = getFilteredWeightedKeyList(npc, this.PersonalityTagList);
			npc.personalityTags.forEach(trait => {
				applicable[trait] = 0;
			});
			npc.personalityTags.push(weightedRandom(applicable, getTotalWeight(applicable)));
		}
	}

	getNPCRacialAppearance(race: string) {
		if (RacialAppearance.hasOwnProperty(race)) {
			return RacialAppearance[race] as IRacialAppearanceSet;
		} else {
			return RacialAppearance.misc;
		}
	}

	/**
	 * Is this NPC a 'he', 'she', or 'they'?
	 * @param gender e.g. 'female', 'male', etc.
	 * @param wordForms Possible word forms. Must have 3 entries. The first index is for 'they', the second for 'she', and the third for 'he'.
	 */
	getPronoun(gender: string, wordForms: string[] = ['they', 'she', 'he']): string {
		if (wordForms.length < 3) {
			console.error("if an argument is provided for wordForms, it must contain 3 strings");
		}
		var pronoun = wordForms[0];
		if (gender.toLowerCase() == 'female') {
			pronoun = wordForms[1];
		}
		else if (gender.toLowerCase() == 'male') {
			pronoun = wordForms[2];
		}
		return pronoun;
	}

	resolvePlaceholders(npc: NPC, stringToFix: string): string
	{
		stringToFix = stringToFix.replaceAll("{GenderPronoun}", this.getPronoun(npc.gender))
			.replaceAll("{HisHer}", this.getPronoun(npc.gender, ["their", "her", "his"]))
			.replaceAll("{HimHer}", this.getPronoun(npc.gender, ["them", "her", "him"]));
		if (stringToFix.includes("{Gendered:"))
		{
			let split = stringToFix.split("{Gendered:");
			stringToFix = split[0];
			for (let i = 1; i < split.length; i++) {
				const str = split[i];
				stringToFix += this.getPronoun(npc.gender, str.substring(0, str.indexOf("}")).split("|"));
				stringToFix += str.substring(str.indexOf('}') + 1);
			}
		}
		return stringToFix;
	}

	initializeNPCGen()
	{
		this.totaledWeights.Race = 0;
		for (let i = 0; i < races.length; i++)
		{
			const e = races[i];
			this.racesWeighted[e] = getRacialTraits(e).spawnFrequency;
			this.totaledWeights.Race += getRacialTraits(e).spawnFrequency;
		}
		this.totaledWeights.Age = getTotalWeight(this.AgeList);
		this.totaledWeights.Threat = getTotalWeight(this.threatLevels);
	}

	randomizeNPC(
		npc: NPC,
		race?: string,
		gender?: string,
		age?: AgeCategory | AgeCategory[],
		alignment?: string
	)
	{
		if (this.totaledWeights.Race < 0) {
			this.initializeNPCGen();
		}
		npc.race = race? race : weightedRandom(this.racesWeighted, this.totaledWeights.Race);
		let rt = getRacialTraits(npc.race);
		npc.gender = gender || randomize(rt.genders);
		this.getNPCAge(npc, rt, age);
		npc.name = NameGenerator.full(npc.race, npc.gender, npc.relativeAge);
		npc.alignment = alignment || randomize(rt.alignments);
		npc.threat = weightedRandom(this.threatLevels, this.totaledWeights.Threat);
		npc.intelligence = filteredWeightedRandom(npc, this.intelligenceLevels);
		this.getNPCPersonalityTags(npc);
		npc.profession = filteredWeightedRandom(npc, this.professions);
		npc.description = this.getNPCDescription(npc);
	}
}

/**
 * Returns a random value from an appropriately filtered list of weighted keys.
 * @param npc The NPC to check against the filters
 * @param filterable The filterable weighted key list to use
 */
function filteredWeightedRandom(npc: NPC, filterable: IFilterableWeightedKeyList): string
{
	let applicable = getFilteredWeightedKeyList(npc, filterable);
	return weightedRandom(applicable, getTotalWeight(applicable));
}


/**
 * Returns an appropriately filtered list of weighted keys.
 * @param npc The NPC to check against the filters
 * @param filterable The filterable weighted key list to use
 */
function getFilteredWeightedKeyList(npc: NPC, filterable: IFilterableWeightedKeyList): IWeightedKeyList
{
	let applicable: IWeightedKeyList = {};
	extendWeightedKeyList(applicable, filterable.generic);

	for (let i = 0; i < filterable.specific.length; i++) {
		const e = filterable.specific[i];
		if (isWeightedKeyListEntryApplicable(npc, e)) {
			extendWeightedKeyList(applicable, e.keys);
		}
	}

	return applicable;
}

/**
 * Returns true if the IFilterableWeightedKeyListEntry is applicable, false if not.
 * @param npc The NPC to check against the filter
 * @param kle
 */
function isWeightedKeyListEntryApplicable(npc: NPC, kle: IFilterableWeightedKeyListEntry): boolean
{
	/**true if Include, false if Exclude */
	const booleanToMatch = kle.type == NPCGenFilterType.Include;
	/**Does the NPC fall within the specified filter values? */
	let booleanTestResult = false;

	switch (kle.category) {
		case NPCGenFilterCategory.Age:
			booleanTestResult = kle.values.includes(npc.relativeAge);
			break;
		case NPCGenFilterCategory.Alignment:
			booleanTestResult = kle.values.includes(npc.alignment);
			break;
		case NPCGenFilterCategory.Gender:
			booleanTestResult = kle.values.includes(npc.gender);
			break;
		case NPCGenFilterCategory.Intelligence:
			booleanTestResult = kle.values.includes(npc.intelligence);
			break;
		case NPCGenFilterCategory.PersonalityTags:
			for (let i = 0; i < npc.personalityTags.length; i++) {
				const pt = npc.personalityTags[i];
				if (kle.values.includes(pt)) {
					booleanTestResult = true;
					break;
				}
			}
			break;
		case NPCGenFilterCategory.Profession:
			booleanTestResult = kle.values.join('|').includes('|' + npc.profession + '|');
			break;
		case NPCGenFilterCategory.Species:
			booleanTestResult = kle.values.includes(npc.race);
			break;
	}

	return booleanToMatch == booleanTestResult;
}

/**
 * Selects a probability weighted species from a provided subset of those available.
 * @param availableRaces The list of species from which to choose
 */
function getRandomRaceFromList(availableRaces: string[]): string
{
	let totalWeight = 0;
	let weightedRaces: IWeightedKeyList = {};
	for (let i = 0; i < races.length; i++)
	{
		const e = races[i];
		if (availableRaces.includes(e)) {
			weightedRaces[e] = getRacialTraits(e).spawnFrequency;
			totalWeight += getRacialTraits(e).spawnFrequency;
		}
	}
	return weightedRandom(weightedRaces, totalWeight);
}