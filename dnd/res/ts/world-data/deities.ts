interface IDeity
{
	Description: string;
	Title: string;
	Symbol: string;
	Alignment: Alignment;
}

interface IDeadDeity extends IDeity
{
	Station: "Prime" | "Demigod";
	DeathYear?: number;
}

const Deities: {
	PrimePantheon: {
		[key: string]: IDeity
	},
	Demigods: {
		[key: string]: IDeity
	},
	Deadgods: {
		[key: string]: IDeadDeity
	},
} = {
	PrimePantheon: {
		"Spaxis": {
			Description: "God of chaos",
			Title: "the Mad God",
			Symbol: "jagged lines with no discernable pattern",
			Alignment: "CN"
		},
		"Larazi": {
			Description: "Goddess of law",
			Title: "Goddess of law",
			Symbol: "a scale above an open book",
			Alignment: "LN"
		},
		"Vidan": {
			Description: "God of life",
			Title: "God of life",
			Symbol: "a large tree",
			Alignment: "CG"
		},
		"Immordan": {
			Description: "God of death",
			Title: "God of death",
			Symbol: "the eyes and nose of a human skull",
			Alignment: "NE"
		},
		"Tordanei": {
			Description: "Goddess of storms",
			Title: "Goddess of storms",
			Symbol: "a war hammer in the shape of the letter T",
			Alignment: "CG"
		},
		"Notriv": {
			Description: "Goddess of wisdom",
			Title: "Goddess of wisdom",
			Symbol: "an open eye",
			Alignment: "NG"
		},
		"Lonic": {
			Description: "God of heroism",
			Title: "Lord of the Champion",
			Symbol: "a shield with blue and white heraldry",
			Alignment: "LG"
		},
		"Fouvil": {
			Description: "God of evil",
			Title: "Lord of the Vile",
			Symbol: "a set of horns with a devilish tail",
			Alignment: "CE"
		},
		"Rachi": {
			Description: "Goddess of Creation",
			Title: "Mother of Invention",
			Symbol: "the spark of creation",
			Alignment: "CN"
		},
		"Graisum": {
			Description: "Goddess of the Harvest",
			Title: "Goddess of the Harvest",
			Symbol: "stalks of grain in a field",
			Alignment: "N"
		},
		"Chromus": {
			Description: "God of Time",
			Title: "God of Time",
			Symbol: "a clock that is perfectly symmetrical on both axis",
			Alignment: "N"
		},
		"Mortadus": {
			Description: "God of War",
			Title: "God of War",
			Symbol: "crossed broadswords",
			Alignment: "LE"
		},
	},
	Demigods: {
		"Aviiha": {
			Description: "",
			Title: "Soul Pirate",
			Symbol: "",
			Alignment: "CE"
		},
		"Benterton": {
			Description: "",
			Title: "Bad Day Buddy",
			Symbol: "",
			Alignment: "NG"
		},
		"Bud": {
			Description: "",
			Title: "Lord God King Brrawd",
			Symbol: "",
			Alignment: "CG"
		},
		"Captain Chad": {
			Description: "",
			Title: "Pirate Idol",
			Symbol: "",
			Alignment: "CE"
		},
		"Doujien": {
			Description: "",
			Title: "Sultan of Smiles",
			Symbol: "",
			Alignment: "CG"
		},
		"Enamela": {
			Description: "",
			Title: "Tooth Collector",
			Symbol: "",
			Alignment: "CN"
		},
		"Fielum": {
			Description: "",
			Title: "Creature Categorizer",
			Symbol: "",
			Alignment: "LN"
		},
		"Ghoyzhu": {
			Description: "",
			Title: "Fiery Anger",
			Symbol: "",
			Alignment: "NE"
		},
		"Gillywung": {
			Description: "",
			Title: "Frog All-Mother",
			Symbol: "",
			Alignment: "N"
		},
		"Irwodile": {
			Description: "",
			Title: "Reptile Representative",
			Symbol: "",
			Alignment: "CG"
		},
		"Jackael": {
			Description: "",
			Title: "Electrifying Moves",
			Symbol: "",
			Alignment: "CN"
		},
		"Klause": {
			Description: "",
			Title: "Jolly Fat Man",
			Symbol: "",
			Alignment: "LG"
		},
		"Kragene": {
			Description: "",
			Title: "Commerce Commander",
			Symbol: "",
			Alignment: "LN"
		},
		"Lago": {
			Description: "",
			Title: "Hider of Eggs",
			Symbol: "",
			Alignment: "NG"
		},
		"Leosut": {
			Description: "",
			Title: "Plane Jane",
			Symbol: "",
			Alignment: "LN"
		},
		"Liaxon": {
			Description: "",
			Title: "Purveyor of Untruth",
			Symbol: "",
			Alignment: "NE"
		},
		"Limerick": {
			Description: "",
			Title: "Immortal Prankster",
			Symbol: "",
			Alignment: "CN"
		},
		"Makolo": {
			Description: "",
			Title: "Prince of Naptime",
			Symbol: "",
			Alignment: "N"
		},
		"Mosoc": {
			Description: "",
			Title: "Ballad Boi",
			Symbol: "",
			Alignment: "LG"
		},
		"Nilbog": {
			Description: "",
			Title: "Chaos Imp",
			Symbol: "",
			Alignment: "CE"
		},
		"Ociphe": {
			Description: "",
			Title: "Matron of Mistakes",
			Symbol: "",
			Alignment: "CN"
		},
		"Praisidio": {
			Description: "",
			Title: "Death Delayer",
			Symbol: "",
			Alignment: "LE"
		},
		"Pteros": {
			Description: "",
			Title: "Dragon Ancestor",
			Symbol: "",
			Alignment: "N"
		},
		"Rinald": {
			Description: "",
			Title: "Mercenary Master",
			Symbol: "",
			Alignment: "CN"
		},
		"Robyll Cypress": {
			Description: "",
			Title: "Maker of Monsters",
			Symbol: "",
			Alignment: "NE"
		},
		"Santiago": {
			Description: "",
			Title: "The Unavoidable",
			Symbol: "",
			Alignment: "CE"
		},
		"Stefanson": {
			Description: "",
			Title: "Villain Tutor",
			Symbol: "",
			Alignment: "LE"
		},
		"Thobos": {
			Description: "",
			Title: "Squirrel Supreme",
			Symbol: "",
			Alignment: "LN"
		},
		"Telov": {
			Description: "",
			Title: "Keeper of History",
			Symbol: "",
			Alignment: "LN"
		},
		"Veland": {
			Description: "",
			Title: "Gob of Goblins",
			Symbol: "",
			Alignment: "N"
		},
	},
	Deadgods: {

	}
}