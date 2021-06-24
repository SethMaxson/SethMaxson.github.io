"use strict";
const SpeciesFluff = [
    {
        name: "Aarakocra",
        tagline: "Guardians of the sky.",
        description: [
            "Aarakocra are a birdlike people gifted with the power of flight. They usually prefer to live in small communities in the wilderness, and have a particular fondness for mountaintop settlements. They are usually good-hearted folk, though cultural differences can cause friction when dealing with other species.",
            "The most famous tribe of Aarakocra make their home at Notriven. Here they worship the goddess of wisdom, Notriv, and watch over the people below."
        ],
        images: {
            background: "/img/locales/mountaintop.jpg",
            standee: "/dnd/img/races/raceEntry/Aarakocra.png"
        },
        tags: ["lagos", "medium"]
    },
    {
        name: "Aasimar",
        tagline: "Children of the gods.",
        description: [
            "On rare occasions, a child is born with the blessing of a god. This can be because the gods have chosen them for a greater destiny, as a gift to their particularly holy and faithful parents, or for reasons that are simply unclear to the reasoning of mortals. They are genetically identical to humans, but are more beautiful and long-lived than their kin. While the child resembles its mortal parents, there is an undeniable aura of light surrounding them.",
            "Aasimar can be born to any race, but most recorded instances were born to humans. Consequently, one is most likely to encounter an aasimar near a large population of humans."
        ],
        images: {
            background: "/img/locales/maxime-castejon-vision-of-olympus-grand.jpg",
            standee: "/dnd/img/races/raceEntry/Aasimar.png"
        },
        tags: ["rare", "medium"]
    },
    {
        name: "Bloodfin",
        tagline: "You're gonna need a bigger boat.",
        description: [
            "The shark-like bloodfin are a relatively new species, indirectly created by the negligent experiments of a mad wizard. They are large, brash, and have a natural inclination to prove themselves the apex predator of any new place they find themselves. Unlike the ocean sharks from which they were mutated, bloodfin are amphibious, and so can live comfortably on land as long as they completely submerge themselves in water for at least one hour each day.",
            "Most bloodfin find the call of the sea too alluring to ignore. While it is not unheard of to meet a bloodfin somewhere inland, most are encountered at sea or in coastal settlements."
        ],
        images: {
            background: "/img/locales/george-johnstone-fijistyley.jpg",
            standee: "/dnd/img/races/raceEntry/Bloodfin.png"
        },
        tags: ["rare", "lagos", "medium"]
    },
    {
        name: "Brokkos",
        tagline: "Straight from the underground.",
        description: [
            "Brokkos were created by the gods to protect a sacred island, and dwell in an underground network of tunnels. Brokkos share a very rigid worldview, and believe that all things can be sorted into three categories; Celu (of the sky), Mare (of the sea), or Tarra (of the earth). Brokkos believe that all Tarra is good, all Mare is evil, and Celu contains some of both.",
            "There are few who claim to have seen a brokkos, and fewer still whose claim is truthful. Brokkos are native to a small, uncharted island called Noseyus."
        ],
        images: {
            background: "/img/locales/joachim-coppens-bsp-smugglers-bay-rock-formation.jpg",
            standee: "/dnd/img/races/raceEntry/brokkos2.png"
        },
        tags: ["rare", "noseyus", "medium"]
    },
    {
        name: "Bugbear",
        tagline: "Masters of the horde.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/efflam-mercier-stone-quarry.jpg",
            standee: "/dnd/img/races/raceEntry/Bugbear.png"
        },
        tags: ["rare", "medium"]
    },
    {
        name: "Bullywug",
        tagline: "Lords of the flies.",
        description: [
            "Bullywugs are a race of toad-like humanoids who dwell primarily in swamps.",
            "Bullywugs can turn up in almost any environment, but are most common in the swamps of Paros."
        ],
        images: {
            background: "/img/locales/swamp.jpg",
            standee: "/dnd/img/races/raceEntry/Bullywug.png"
        },
        tags: ["terrapim", "medium"]
    },
    // {
    // 	name: "Changeling",
    // 	tagline: "Unknowable wanderers.",
    // 	description: [
    // 		"Descriptive text goes here.",
    // 		"Habitat information goes here."
    // 	],
    // 	images: {
    // 		background: "",
    // 		standee: "/dnd/img/races/raceEntry/Changeling.png"
    // 	},
    // 	tags: ["rare","medium"]
    // },
    {
        name: "Dragonborn",
        tagline: "Burninating the peasants.",
        description: [
            "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/efflam-mercier-landscape.jpg",
            standee: "/dnd/img/races/raceEntry/Dragonborn.png"
        },
        tags: ["bravagg", "medium"]
    },
    {
        name: "Dwarf",
        tagline: "Deep diggers.",
        description: [
            "Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs-these common threads unite all dwarves.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/mines.jpg",
            standee: "/dnd/img/races/raceEntry/Dwarf.png"
        },
        tags: ["common", "lagos", "paros", "medium"]
    },
    {
        name: "Elf",
        tagline: "Aloof defenders.",
        description: [
            "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry, and the good things of the world.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/elven_city.jpg",
            standee: "/dnd/img/races/raceEntry/Elf.png"
        },
        tags: ["common", "lagos", "medium"]
    },
    {
        name: "Firbolg",
        tagline: "Forest folk.",
        description: [
            "Firbolg tribes cloister in remote forest strongholds, preferring to spend their days in quiet harmony with the woods. When provoked, firbolgs demonstrate formidable skills with weapons and druidic magic.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/efflam-mercier-woodlands-stream.jpg",
            standee: "/dnd/img/races/raceEntry/Firbolg.png"
        },
        tags: ["rare", "lagos", "medium"]
    },
    {
        name: "Firenewt",
        tagline: "Lava-lubbers.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/firelake.jpg",
            standee: "/dnd/img/races/raceEntry/Firenewt.jpeg"
        },
        tags: ["rare", "lagos", "firelake", "medium"]
    },
    {
        name: "Genasi",
        tagline: "Elemental beings.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/jacob-thompson-elements-edit3.jpg",
            standee: "/dnd/img/races/raceEntry/Genasi.png"
        },
        tags: ["rare", "lagos", "medium"]
    },
    {
        name: "Gnome",
        tagline: "Mad science is best science.",
        description: [
            "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/shawn-lee-744890701978360690.jpg",
            standee: "/dnd/img/races/raceEntry/Gnome.png"
        },
        tags: ["rare", "lagos", "paros", "small"]
    },
    {
        name: "Goblin",
        tagline: "My fiends over you.",
        description: [
            "Goblins are tiny, green humanoids with a penchant for arson. Most civilized races consider goblins frightening or disgusting. For this reason, they are seldom seen in cities.",
            "Goblins are prevalent throughout the entirety of the world, but most prefer to live somewhere with plenty of dark corners in which to hide."
        ],
        images: {
            background: "/img/locales/joachim-coppens-wsp-devils-ridge-shrine-cave.jpg",
            standee: "/dnd/img/races/raceEntry/Goblin.png"
        },
        tags: ["common", "lagos", "paros", "small"]
    },
    {
        name: "Goliath",
        tagline: "Wrath and thunder.",
        description: [
            "At the highest mountain peaks-far above the slopes where trees grow and where the air is thin and the frigid winds howl-dwell the reclusive goliaths. Few folk can claim to have seen a goliath, and fewer still can claim friendship with them. Goliaths wander a bleak realm of rock, wind, and cold. Their bodies look as if they are carved from mountain stone and give them great physical power. Their spirits take after the wandering wind, making them nomads who wander from peak to peak. Their hearts are infused with the cold regard of their frigid realm, leaving each goliath with the responsibility to earn a place in the tribe or die trying.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/jason-scheier-ice-cliffs-concept-panoramic.jpg",
            standee: "/dnd/img/races/raceEntry/Goliath.png"
        },
        tags: ["rare", "lagos", "medium"]
    },
    {
        name: "Grippli",
        tagline: "The good folk.",
        description: [
            "Grippli are simple folk. They look like frogs, live in trees, and mostly keep to themselves. The majority of grippli go their entire lives without ever leaving their home forest, but it is not uncommon for a grippli to decide to broaden their horizons.",
            "Most grippli seldom stray far from the treeline, but grippli adventurers can turn up at any corner of the world."
        ],
        images: {
            background: "/img/locales/redwood_forest.jpg",
            standee: "/dnd/img/races/raceEntry/Grippli.png"
        },
        tags: ["rare", "lagos", "small"]
    },
    {
        name: "Grung",
        tagline: "A rainbow of death.",
        description: [
            "Descriptive text goes here.",
            "Grung prefer to make their homes in jungles and rain forests. They are most common in the jungles on the western side of Paros."
        ],
        images: {
            background: "/img/locales/jason-scheier-01bb.jpg",
            standee: "/dnd/img/races/raceEntry/Grung.png"
        },
        tags: ["rare", "paros", "small"]
    },
    {
        name: "Halfling",
        tagline: "Half the height, twice the heart.",
        description: [
            "Halflings may very well be the closest humanoid approximation of a Golden Retriever. Chipper, optimistic, and loyal to a fault, halflings are delightful traveling companions. While their physical size is well below average, their personalities are often larger than life.",
            "Halflings can turn up nearly anywhere in the world, but are most commonly found in Decapos, Lagos, and Paros.",
            "---Ghostwise---",
            "---Lightfoot---",
            "---Oceanborn---",
            "---Stout---",
        ],
        images: {
            background: "/img/locales/christian-dimitrov-albion-mountains-01.jpg",
            standee: "/dnd/img/races/raceEntry/Halfling.png"
        },
        tags: ["common", "lagos", "paros", "decapos", "small"]
    },
    {
        name: "Half-Elf",
        tagline: "Between two worlds.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/eddie-mendoza-canal-town.jpg",
            standee: "/dnd/img/races/raceEntry/Half-Elf.png"
        },
        tags: ["lagos", "medium"]
    },
    {
        name: "Half-Orc",
        tagline: "",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/eddie-mendoza-witch-s-inn.jpg",
            standee: "/dnd/img/races/raceEntry/Half-Orc.png"
        },
        tags: ["lagos", "medium"]
    },
    {
        name: "Hobgoblin",
        tagline: "Like goblins, but worse.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/rainman-page-7-2.jpg",
            standee: "/dnd/img/races/raceEntry/Hobgoblin.png"
        },
        tags: ["decapos", "medium"]
    },
    {
        name: "Human",
        tagline: "Endless ambition.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/rainman-page-242-pers.jpg",
            standee: "/dnd/img/races/raceEntry/Human.png"
        },
        tags: ["common", "lagos", "paros", "decapos", "medium"]
    },
    {
        name: "Kenku",
        tagline: "Forgemasters.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/george-johnstone-oldslum.jpg",
            standee: "/dnd/img/races/raceEntry/Kenku.png"
        },
        tags: ["common", "medium"]
    },
    {
        name: "Kobold",
        tagline: "Fun-size dragons.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/caverns.jpg",
            standee: "/dnd/img/races/raceEntry/Kobold.png"
        },
        tags: ["common", "small"]
    },
    {
        name: "Lizardfolk",
        tagline: "Weighers of the scales.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/daniel-respaud-jungle-3d-vue-plant-factory-dense-vegetation-plants.jpg",
            standee: "/dnd/img/races/raceEntry/Lizardfolk.png"
        },
        tags: ["common", "medium"]
    },
    // {
    // 	name: "Minotaur",
    // 	tagline: "Brutal mercenaries.",
    // 	description: [
    // 		"Descriptive text goes here.",
    // 		"Habitat information goes here."
    // 	],
    // 	images: {
    // 		background: "",
    // 		standee: ""
    // 	},
    // 	tags: ["rare","medium"]
    // },
    {
        name: "Tabaxi",
        tagline: "Graceful wanderers.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/rainman-page-263-prnd.jpg",
            standee: "/dnd/img/races/raceEntry/Tabaxi.png"
        },
        tags: ["decapos", "medium"]
    },
    {
        name: "Tiefling",
        tagline: "Child of Hel.",
        description: [
            "On rare occasions, a child is born marked by devils. This is usually because someone in their bloodline once made a pact with a devil. Tieflings have horns and infernal tails, and sometimes have unnatural skin colors, such as deep reds or purples. Tieflings have no more pre-disposition towards evil than any other human, but they are generally hated and feared for their demonic appearance.",
            "Tieflings can be born to any race, but most recorded instances were born to humans."
        ],
        images: {
            background: "/img/locales/rainman-page-b2-s.jpg",
            standee: "/dnd/img/races/raceEntry/Tiefling.png"
        },
        tags: ["rare", "lagos", "medium"]
    },
    {
        name: "Tortle",
        tagline: "Curious artisans.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/george-johnstone-seaweedvillagefinal.jpg",
            standee: "/dnd/img/races/raceEntry/Tortle.png"
        },
        tags: ["rare", "lagos", "terrapim", "medium"]
    },
    {
        name: "Triton",
        tagline: "Nobles of the sea.",
        description: [
            "Tritons are amphibious blue humanoids who live in cities under the sea. They speak the common tongue, but do so in an antiquated dialect due to their infrequent contact with surface dwellers. Their culture strongly promotes heroism, so most tritons do battle with large monsters that roam the depths. This has a tendency to make them haughty.",
            "Tritons usually make their homes in large cities on the sea floor. On rare occasions, a triton may choose to live on the surface among other races."
        ],
        images: {
            background: "/img/locales/christian-dimitrov-cultural-dev-artstation2.jpg",
            standee: "/dnd/img/races/raceEntry/Triton.png"
        },
        tags: ["rare", "medium"]
    },
    {
        name: "Warforged",
        tagline: "Heavy metal.",
        description: [
            "Descriptive text goes here.",
            "Habitat information goes here."
        ],
        images: {
            background: "/img/locales/alessandro-paviolo-alessandro-paviolo-carim-artstation02.jpg",
            standee: "/dnd/img/races/raceEntry/Warforged.png"
        },
        tags: ["rare", "decapos", "medium"]
    },
    {
        name: "Yuan-Ti",
        tagline: "Venomous tricksters.",
        description: [
            "Descendants of an evil human civilization. Their ancestors were vile people who regularly practiced human sacrifice in the name of their snake deity. They were cursed for their wicked ways, and their descendants are all born malformed, bearing snakelike qualities. This can be as minor as reptilian eyes or a few scales, or can be as intense as having a snake head or a snake tail instead of legs. Yuan-Ti are almost universally evil.",
            "Yuan-ti normally hail from secret, underground cabals. Those whose disfigurements are small enough to pass as human frequently live above ground seeking to position themselves as rulers or political advisors, so that they might create favorable conditions for their peoples' eventual conquest of the surface."
        ],
        images: {
            background: "/img/locales/mohammx-qureshi-1.jpg",
            standee: "/dnd/img/races/raceEntry/Yuan-Ti.png"
        },
        tags: ["rare", "medium"]
    },
];
//# sourceMappingURL=species-fluff.js.map