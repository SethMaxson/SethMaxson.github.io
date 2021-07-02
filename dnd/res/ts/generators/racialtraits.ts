interface IRacialTraitSet
{
	genders: string[],
	adultAge: number,
	maxAge: number,
	alignments: string[],
	spawnFrequency: number
}

const RacialTraits: {misc: IRacialTraitSet, [key: string]: IRacialTraitSet|undefined} = {
	"misc": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 70,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 20
	},
	"aarakocra": {
		genders: ["female", "male"],
		adultAge: 3,
		maxAge: 30,
		alignments: ["LG", "NG", "CG"],
		spawnFrequency: 30
	},
	"aasimar": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 120,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 25
	},
	"bear": {
		genders: ["female", "male"],
		adultAge: 7,
		maxAge: 80,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 10
	},
	"bloodfin": {
		genders: ["female", "male"],
		adultAge: 4,
		maxAge: 40,
		alignments: ["LE", "NE", "CE"],
		spawnFrequency: 10
	},
	"brokkos": {
		genders: ["female", "male"],
		adultAge: 7,
		maxAge: 80,
		alignments: ["LN", "N"],
		spawnFrequency: 5
	},
	"burrowfolk": {
		genders: ["female", "male"],
		adultAge: 16,
		maxAge: 80,
		alignments: ["LN", "N"],
		spawnFrequency: 10
	},
	"bugbear": {
		genders: ["female", "male"],
		adultAge: 16,
		maxAge: 80,
		alignments: ["NE", "CE"],
		spawnFrequency: 20
	},
	"dragonborn": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 360,
		alignments: ["LG", "NG", "CG", "LE", "NE", "CE"],
		spawnFrequency: 30
	},
	"drow": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 750,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 30
	},
	"dwarf": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 360,
		alignments: ["LG", "LN", "LE"],
		spawnFrequency: 50
	},
	"elf": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 750,
		alignments: ["CG", "CN", "CE"],
		spawnFrequency: 50
	},
	"firbolg": {
		genders: ["female", "male"],
		adultAge: 30,
		maxAge: 500,
		alignments: ["NG", "N"],
		spawnFrequency: 30
	},
	"firenewt": {
		genders: ["female", "male"],
		adultAge: 3,
		maxAge: 50,
		alignments: ["LE"],
		spawnFrequency: 10
	},
	"genasi": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 120,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 20
	},
	"gnome": {
		genders: ["female", "male"],
		adultAge: 40,
		maxAge: 500,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 40
	},
	"goblin": {
		genders: ["female", "male"],
		adultAge: 8,
		maxAge: 60,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 40
	},
	"goliath": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 90,
		alignments: ["LG", "LN", "LE"],
		spawnFrequency: 30
	},
	"grippli": {
		genders: ["female", "male"],
		adultAge: 30,
		maxAge: 180,
		alignments: ["NG", "N"],
		spawnFrequency: 20
	},
	"grung": {
		genders: ["female", "male"],
		adultAge: 1,
		maxAge: 50,
		alignments: ["LE"],
		spawnFrequency: 10
	},
	"halfling": {
		genders: ["female", "male"],
		adultAge: 20,
		maxAge: 150,
		alignments: ["LG", "NG"],
		spawnFrequency: 60
	},
	"halfelf": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 190,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 50
	},
	"halforc": {
		genders: ["female", "male"],
		adultAge: 14,
		maxAge: 75,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 40
	},
	"hobgoblin": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 90,
		alignments: ["LE"],
		spawnFrequency: 40
	},
	"human": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 90,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 100
	},
	"lizardfolk": {
		genders: ["female", "male"],
		adultAge: 14,
		maxAge: 60,
		alignments: ["N"],
		spawnFrequency: 20
	},
	"kenku": {
		genders: ["female", "male"],
		adultAge: 12,
		maxAge: 60,
		alignments: ["CN"],
		spawnFrequency: 20
	},
	"kitsune": {
		genders: ["female", "male"],
		adultAge: 15,
		maxAge: 900,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 1
	},
	"kobold": {
		genders: ["female", "male"],
		adultAge: 6,
		maxAge: 120,
		alignments: ["LN", "LE"],
		spawnFrequency: 20
	},
	"kuotoa": {
		genders: ["female", "male"],
		adultAge: 2,
		maxAge: 20,
		alignments: ["NE"],
		spawnFrequency: 10
	},
	"orc": {
		genders: ["female", "male"],
		adultAge: 12,
		maxAge: 50,
		alignments: ["CE"],
		spawnFrequency: 20
	},
	"modron": {
		genders: ["N/A"],
		adultAge: 0,
		maxAge: 9999,
		alignments: ["LN"],
		spawnFrequency: 2
	},
	"ratfolk": {
		genders: ["female", "male"],
		adultAge: 10,
		maxAge: 60,
		alignments: ["LN", "N", "CN"],
		spawnFrequency: 40
	},
	"tabaxi": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 90,
		alignments: ["CG", "CN"],
		spawnFrequency: 40
	},
	"tiefling": {
		genders: ["female", "male"],
		adultAge: 18,
		maxAge: 110,
		alignments: ["CG", "CN", "CE"],
		spawnFrequency: 25
	},
	"tortle": {
		genders: ["female", "male"],
		adultAge: 15,
		maxAge: 50,
		alignments: ["LG", "LN", "LE"],
		spawnFrequency: 30
	},
	"triton": {
		genders: ["female", "male"],
		adultAge: 15,
		maxAge: 200,
		alignments: ["LG", "NG", "LN"],
		spawnFrequency: 20
	},
	"wilkoss": {
		genders: ["female", "male"],
		adultAge: 12,
		maxAge: 50,
		alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
		spawnFrequency: 10
	}
}

function getRacialTraits(race: string): IRacialTraitSet
{
	if (RacialTraits.hasOwnProperty(race)) {
		return RacialTraits[race] as IRacialTraitSet;
	} else {
		return RacialTraits.misc;
	}
}

/**
 * Returns a list of speciesIDs for all the species that are known to appear in at least one of the specified alignments.
 * @param alignments A list of alignments with which the return species should be compatible.
 */
function getRaceByAlignment(alignments: Alignment[]): string[]
{
	let results: string[] = [];
	Object.keys(RacialTraits).forEach(function (species)
	{
		let rt = RacialTraits[species];
		for (let i = 0; i < alignments.length; i++) {
			if (rt?.alignments.includes(alignments[i]))
			{
				results.push(species);
				break;
			}
		}
	});

	return results;
}