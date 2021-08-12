"use strict";
const KILLINGGAMECHARACTERS = [
    {
        id: "hatharal",
        name: "Hatharal Ward",
        title: "Ultimate Carpenter",
        image: "/dnd/img/characters/npc/killinggame/hatharal-ward-portrait.png",
        race: "Half-elf",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CG",
        threat: "slightly low",
        intelligence: "average",
        personalityTags: [],
        profession: "carpenter",
        description: "A young adult half-elf, who wears rings, which isn’t cool, but it's cool that he doesn’t care if they’re cool and comes from an engineer's guild. He is frightened and earthy, and has found work as a carpenter.",
        status: "Alive",
        dislikes: [
            "poor workmanship",
            "gold-diggers"
        ],
        likes: [
            "woodworking",
            "snacks"
        ],
        loves: [],
        desperation: 0.1,
        killingInstinct: 0.2,
    },
    {
        id: "sindri",
        name: "Sindri \"Thunderbonk\" Raulnor",
        title: "Ultimate Royal Taster",
        image: "/dnd/img/characters/npc/killinggame/sindri-portrait.png",
        race: "Gnome",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Adult",
        alignment: "CN",
        threat: "slightly high",
        intelligence: "very low",
        personalityTags: [],
        profession: "royal taster",
        description: "Sindri has bad hygiene and comes from a strict, religious temple. He is submissive and rigid, and has found work as a royal taster.",
        status: "Alive",
        dislikes: [
            "being judged",
            "ugly people",
            "insects"
        ],
        likes: [
            "sweets",
            "wine",
            "women"
        ],
        loves: [],
        desperation: 1.0,
        killingInstinct: 0.5,
    },
    {
        id: "gribak",
        name: "Gribak",
        title: "Ultimate Animal Tamer",
        image: "/dnd/img/characters/npc/killinggame/gribak-portrait.png",
        race: "Goblin",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "LG",
        threat: "slightly high",
        intelligence: "average",
        personalityTags: [],
        profession: "knight",
        description: "Gribak is not very good at sports and comes from a small village of barbarians. He is instructive and dramatic, and has found work as a knight.",
        status: "Alive",
        dislikes: [
            "vegetables",
            "books without pictures",
            "cold"
        ],
        likes: [
            "animals",
            "bright colors"
        ],
        loves: [
            "frogs"
        ],
        desperation: 0.7,
        killingInstinct: 0.2,
    },
    {
        id: "diggory",
        name: "Diggory Ward",
        title: "Ultimate Host",
        image: "/dnd/img/characters/npc/killinggame/diggory-ward-portrait.png",
        race: "Human",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Adult",
        alignment: "LE",
        threat: "high",
        intelligence: "high",
        personalityTags: [],
        profession: "adventurer",
        description: "An adult human, who knows the location of a huge weapons cache and comes from a bustling underground city. He is playful and impatient, and has found work as an adventurer.",
        status: "Alive",
        dislikes: [
            "dirt",
            "unfashionable things"
        ],
        likes: [
            "books",
            "music",
            "fine dining"
        ],
        loves: [
            "dark teas"
        ],
        desperation: 0.3,
        killingInstinct: 0.3,
    },
    {
        id: "randal",
        name: "Randal Baker",
        title: "Ultimate Fisher",
        image: "/dnd/img/characters/npc/killinggame/randal-portrait.png",
        race: "Human",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Adult",
        alignment: "CE",
        threat: "medium",
        intelligence: "average",
        personalityTags: [],
        profession: "smuggler",
        description: "Randal is a superstitious fisherman and comes from a small island. He usually seems very serious, but occasionally reveals a secret sense of humor.",
        status: "Alive",
        dislikes: [
            "dryness",
            "rules"
        ],
        likes: [
            "fishing",
            "the ocean"
        ],
        loves: [],
        desperation: 0.4,
        killingInstinct: 1.0,
    },
    {
        id: "eliot",
        name: "Eliot Brewer",
        title: "Ultimate Kidnapper",
        image: "/dnd/img/characters/npc/killinggame/eliot-portrait.png",
        race: "Water Genasi",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "NE",
        threat: "slightly high",
        intelligence: "average",
        personalityTags: [],
        profession: "monk",
        description: "Eliot has connections to underworld crime syndicates and comes from a powerful trading city. He comes across as obnoxious and curious.",
        status: "Alive",
        dislikes: [
            "bright light",
            "images in his likeness",
            "fish"
        ],
        likes: [
            "money",
            "rope",
            "information"
        ],
        loves: [],
        desperation: 0.4,
        killingInstinct: 0.2,
    },
    {
        id: "salvini",
        name: "Salvini Devia",
        title: "Ultimate Entrepreneur",
        image: "/dnd/img/characters/npc/killinggame/salvini-portrait.png",
        race: "Ratfolk",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CN",
        threat: "low",
        intelligence: "slightly high",
        personalityTags: [],
        profession: "entrepreneur",
        description: "Salvini has a burning hatred for pirates and comes from the market city of Vatsunir. He is loud and philosophical.",
        status: "Alive",
        dislikes: [
            "frogs",
            "the color red"
        ],
        likes: [
            "cheese",
            "spicy food",
            "valuables"
        ],
        loves: [],
        desperation: 0.9,
        killingInstinct: 0.4,
    },
    {
        id: "rosewood",
        name: "Rosewood",
        title: "Ultimate Botanist",
        image: "/dnd/img/characters/npc/killinggame/rosewood-portrait.png",
        race: "Firbolg",
        subrace: "",
        gender: "Male",
        age: -1,
        relativeAge: "Adult",
        alignment: "N",
        threat: "high",
        intelligence: "average",
        personalityTags: [],
        profession: "druid",
        description: "Rosewood comes from a company of mercenaries and sellswords. He is fatalistic and adventurous, and has found work as a druid.",
        status: "Alive",
        dislikes: [
            "airship travel",
            "loud noises",
            "any food involving poultry or eggs",
        ],
        likes: [
            "plants",
            "animals"
        ],
        loves: [
            "birds"
        ],
        desperation: 0.5,
        killingInstinct: 0.7,
    },
    {
        id: "yrthraethra",
        name: "Yrthraethra Payne",
        title: "Ultimate Armorer",
        image: "/dnd/img/characters/npc/killinggame/yrthraethra-payne-portrait.png",
        race: "Half-Elf",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CN",
        threat: "high",
        intelligence: "high",
        personalityTags: [],
        profession: "armorer",
        description: "Yrthraethra (or 'Rae' for short) is a total gear-head and comes from a city no one else has ever heard of. She is humble and harsh.",
        status: "Alive",
        dislikes: [
            "tea",
            "prolonged quiet",
            "slow music",
            "clothing without pockets",
            "formality"
        ],
        likes: [
            "fashion",
            "technology",
            "snacks",
            "sweets"
        ],
        loves: [
            "coffee"
        ],
        desperation: 0.1,
        killingInstinct: 0.9,
    },
    {
        id: "chenna",
        name: "Chenna Honeymaker",
        title: "Ultimate Bartender",
        image: "/dnd/img/characters/npc/killinggame/chenna-portrait.png",
        race: "Halfling",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Adult",
        alignment: "LG",
        threat: "medium",
        intelligence: "average",
        personalityTags: [],
        profession: "bartender",
        description: "Chenna hates wearing armor face masks and comes from a large military outpost. She is risk-taking and agreeable, and has found work as an innkeeper.",
        status: "Alive",
        dislikes: [
            "bitter flavors",
            "grumpy people",
            "romantic jewelry from anyone she's not dating"
        ],
        likes: [
            "fruit",
            "conversation",
            "sweet beverages",
            "jewelry"
        ],
        loves: [
            "cherries"
        ],
        desperation: 1.0,
        killingInstinct: 0.6,
    },
    {
        id: "nora",
        name: "Nora Shaeremae",
        title: "Ultimate Ventriloquist",
        image: "/dnd/img/characters/npc/killinggame/nora-portrait.png",
        race: "Dwarf",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Adult",
        alignment: "CG",
        threat: "low",
        intelligence: "low",
        personalityTags: [],
        profession: "blacksmith",
        description: "An adult dwarf, who wants to open her own bar and comes from a place only she can pronounce. She is emotional and loving, and has found work as a blacksmith.",
        status: "Alive",
        dislikes: [
            "mirrors",
            "fire"
        ],
        likes: [
            "puppet accessories",
            "jokes"
        ],
        loves: [],
        desperation: 0.8,
        killingInstinct: 0.9,
    },
    {
        id: "nueleth",
        name: "Nueleth Symbaern",
        title: "Ultimate Librarian",
        image: "/dnd/img/characters/npc/killinggame/nueleth-portrait.png",
        race: "Elf",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CN",
        threat: "slightly low",
        intelligence: "average",
        personalityTags: [],
        profession: "philosopher",
        description: "Nueleth is a quiet, bookish person who comes from a peaceful coastal town. She is restless and careless, and has found work as a philosopher.",
        status: "Alive",
        dislikes: [
            "loud noises",
            "large gatherings",
            "disorganization"
        ],
        likes: [
            "books",
            "quiet, comfy nooks"
        ],
        loves: [],
        desperation: 0.9,
        killingInstinct: 0.3,
    },
    {
        id: "aym",
        name: "Aym",
        title: "Ultimate Painter",
        image: "/dnd/img/characters/npc/killinggame/aym-portrait.png",
        race: "Tiefling",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CG",
        threat: "slightly low",
        intelligence: "slightly high",
        personalityTags: [],
        profession: "sailor",
        description: "Aym is completely mute and comes from the forests of the Verdant Isle. She is unpredictable and argumentative, and has found work as a sailor.",
        status: "Alive",
        dislikes: [
            "bullying",
            "low-brow things",
            "mean-spirited things",
            "sour flavors",
            "friendly one-sided conversation"
        ],
        likes: [
            "bright colors",
            "the arts",
            "sweet flavors"
        ],
        loves: [],
        desperation: 0.3,
        killingInstinct: 0.3,
    },
    {
        id: "gaaki",
        name: "Gaaki Clark",
        title: "Ultimate Strongwoman",
        image: "/dnd/img/characters/npc/killinggame/gaaki-clark-portrait.png",
        race: "Half-Orc",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Adult",
        alignment: "LG",
        threat: "very high",
        intelligence: "very low",
        personalityTags: [],
        profession: "mercenary",
        description: "An adult halforc, who has a twin and constantly gets confused for them and comes from an underwater city protected by a magical force field. She is shifty and affable, and has found work as a mercenary.",
        status: "Alive",
        dislikes: [
            "sweet flavors",
            "politics",
            "royalty"
        ],
        likes: [
            "strength",
            "working out",
            "friendly competition",
            "meat"
        ],
        loves: [],
        desperation: 0.5,
        killingInstinct: 0.1,
    },
    {
        id: "forest",
        name: "Bush in the Forest (Forest)",
        title: "Ultimate Acrobat",
        image: "/dnd/img/characters/npc/killinggame/forest-portrait.png",
        race: "Tabaxi",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "CN",
        threat: "medium",
        intelligence: "low",
        personalityTags: [],
        profession: "airship pirate",
        description: "Forest is famous for being one of the most fearsome airship pirate captains to have ever sailed under a black flag. She looks much younger than her reputation suggests, and comes from the remains of a sunken city. She is courageous and self-effacing.",
        status: "Alive",
        dislikes: [
            "water",
            "spicy foods",
            "books"
        ],
        likes: [
            "jewelry",
            "shiny things",
            "tea",
            "sweet flavors"
        ],
        loves: [],
        desperation: 0.9,
        killingInstinct: 0.8,
    },
    {
        id: "queg",
        name: "Queg",
        title: "Ultimate Carnival Entertainer",
        image: "/dnd/img/characters/npc/killinggame/queg-portrait.png",
        race: "Tortle",
        subrace: "",
        gender: "Female",
        age: -1,
        relativeAge: "Young Adult",
        alignment: "LE",
        threat: "medium",
        intelligence: "average",
        personalityTags: [],
        profession: "carnival worker",
        description: "Queg gives the best gifts and comes from a disease ridden city. She is irresponsible and sweet, and has made a name for herself as the ultimate Carnival Entertainer.",
        status: "Alive",
        dislikes: [
            "meat",
            "anything that appears childish"
        ],
        likes: [
            "controlled substances",
            "expensive things",
            "exotic things"
        ],
        loves: [],
        desperation: 1.0,
        killingInstinct: 0.7,
    },
    // {
    // 	id: "pc1",
    // 	name: "Chuck's Character",
    // 	title: "Ultimate Player Character",
    // 	image: "/dnd/img/characters/npc/killinggame/pc.png",
    // 	race: "Human",
    // 	subrace: "",
    // 	gender: "Male",
    // 	age: -1,
    // 	relativeAge: "Young Adult",
    // 	alignment: "N",
    // 	threat: "medium",
    // 	intelligence: "average",
    // 	personalityTags: [],
    // 	profession: "adventurer",
    // 	description: "A player character",
    // 	status: "Alive",
    // 	dislikes: [],
    // 	likes: [],
    // 	loves: [],
    // 	desperation: 1.0,
    // 	killingInstinct: 1.0,
    // },
    // {
    // 	id: "pc2",
    // 	name: "Carrie",
    // 	title: "Ultimate Cannibal",
    // 	image: "/dnd/img/characters/npc/killinggame/pc.png",
    // 	race: "Halfling",
    // 	subrace: "",
    // 	gender: "Female",
    // 	age: -1,
    // 	relativeAge: "Young Adult",
    // 	alignment: "N",
    // 	threat: "medium",
    // 	intelligence: "average",
    // 	personalityTags: [],
    // 	profession: "adventurer",
    // 	description: "A player character",
    // 	status: "Alive",
    // 	dislikes: [],
    // 	likes: [],
    // 	loves: [],
    // 	desperation: 1.0,
    // 	killingInstinct: 1.0,
    // },
    // {
    // 	id: "pc3",
    // 	name: "Kendall's Character",
    // 	title: "Ultimate Player Character",
    // 	image: "/dnd/img/characters/npc/killinggame/pc.png",
    // 	race: "Human",
    // 	subrace: "",
    // 	gender: "Male",
    // 	age: -1,
    // 	relativeAge: "Young Adult",
    // 	alignment: "N",
    // 	threat: "medium",
    // 	intelligence: "average",
    // 	personalityTags: [],
    // 	profession: "adventurer",
    // 	description: "A player character",
    // 	status: "Alive",
    // 	dislikes: [],
    // 	likes: [],
    // 	loves: [],
    // 	desperation: 1.0,
    // 	killingInstinct: 1.0,
    // },
    // {
    // 	id: "pc4",
    // 	name: "Lizette's Character",
    // 	title: "Ultimate Player Character",
    // 	image: "/dnd/img/characters/npc/killinggame/pc.png",
    // 	race: "Human",
    // 	subrace: "",
    // 	gender: "Male",
    // 	age: -1,
    // 	relativeAge: "Young Adult",
    // 	alignment: "N",
    // 	threat: "medium",
    // 	intelligence: "average",
    // 	personalityTags: [],
    // 	profession: "adventurer",
    // 	description: "A player character",
    // 	status: "Alive",
    // 	dislikes: [],
    // 	likes: [],
    // 	loves: [],
    // 	desperation: 1.0,
    // 	killingInstinct: 1.0,
    // },
    // {
    // 	id: "enix",
    // 	name: "Enix Thelukie",
    // 	title: "Ultimate Survivor",
    // 	image: "/dnd/img/characters/npc/killinggame/pc.png",
    // 	race: "Tiefling",
    // 	subrace: "",
    // 	gender: "Male",
    // 	age: -1,
    // 	relativeAge: "Young Adult",
    // 	alignment: "N",
    // 	threat: "medium",
    // 	intelligence: "average",
    // 	personalityTags: [],
    // 	profession: "adventurer",
    // 	description: "A player character",
    // 	status: "Alive",
    // 	dislikes: [],
    // 	likes: [],
    // 	loves: [],
    // 	desperation: 1.0,
    // 	killingInstinct: 1.0,
    // }
];
//# sourceMappingURL=killing-game-characters.js.map