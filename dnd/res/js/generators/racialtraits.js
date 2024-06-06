"use strict";
const RacialTraits = {
    "misc": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 70,
        spawnFrequency: 20,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "aarakocra": {
        genders: ["female", "male"],
        adultAge: 3,
        maxAge: 30,
        spawnFrequency: 30,
        data: {
            alignments: ["LG", "NG", "CG"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: ["animal", "wings"]
        }
    },
    "aasimar": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 120,
        spawnFrequency: 25,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "bear": {
        genders: ["female", "male"],
        adultAge: 7,
        maxAge: 80,
        spawnFrequency: 10,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: ["animal", "fur"]
        }
    },
    "bloodfin": {
        genders: ["female", "male"],
        adultAge: 4,
        maxAge: 40,
        spawnFrequency: 10,
        data: {
            alignments: ["LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "brokkos": {
        genders: ["female", "male"],
        adultAge: 7,
        maxAge: 80,
        spawnFrequency: 5,
        data: {
            alignments: ["LN", "N"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: ["animal", "fur"]
        }
    },
    "burrowfolk": {
        genders: ["female", "male"],
        adultAge: 16,
        maxAge: 80,
        spawnFrequency: 10,
        data: {
            alignments: ["LN", "N"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: ["animal", "fur"]
        }
    },
    "bugbear": {
        genders: ["female", "male"],
        adultAge: 16,
        maxAge: 80,
        spawnFrequency: 20,
        data: {
            alignments: ["NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "dragonborn": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 360,
        spawnFrequency: 30,
        data: {
            alignments: ["LG", "NG", "CG", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "drow": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 750,
        spawnFrequency: 30,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "dwarf": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 360,
        spawnFrequency: 50,
        data: {
            alignments: ["LG", "LN", "LE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "elf": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 750,
        spawnFrequency: 50,
        data: {
            alignments: ["CG", "CN", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "firbolg": {
        genders: ["female", "male"],
        adultAge: 30,
        maxAge: 500,
        spawnFrequency: 30,
        data: {
            alignments: ["NG", "N"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "firenewt": {
        genders: ["female", "male"],
        adultAge: 3,
        maxAge: 50,
        spawnFrequency: 10,
        data: {
            alignments: ["LE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "genasi": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 120,
        spawnFrequency: 20,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "gnome": {
        genders: ["female", "male"],
        adultAge: 40,
        maxAge: 500,
        spawnFrequency: 40,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "goblin": {
        genders: ["female", "male"],
        adultAge: 8,
        maxAge: 60,
        spawnFrequency: 40,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "goliath": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 90,
        spawnFrequency: 30,
        data: {
            alignments: ["LG", "LN", "LE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "grippli": {
        genders: ["female", "male"],
        adultAge: 30,
        maxAge: 180,
        spawnFrequency: 20,
        data: {
            alignments: ["NG", "N"],
            size: ["Small"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "grung": {
        genders: ["female", "male"],
        adultAge: 1,
        maxAge: 50,
        spawnFrequency: 10,
        data: {
            alignments: ["LE"],
            size: ["Small"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "halfling": {
        genders: ["female", "male"],
        adultAge: 20,
        maxAge: 150,
        spawnFrequency: 60,
        data: {
            alignments: ["LG", "NG"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "halfelf": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 190,
        spawnFrequency: 50,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "halforc": {
        genders: ["female", "male"],
        adultAge: 14,
        maxAge: 75,
        spawnFrequency: 40,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "hobgoblin": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 90,
        spawnFrequency: 40,
        data: {
            alignments: ["LE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "human": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 90,
        spawnFrequency: 100,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "lizardfolk": {
        genders: ["female", "male"],
        adultAge: 14,
        maxAge: 60,
        spawnFrequency: 20,
        data: {
            alignments: ["N"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "kenku": {
        genders: ["female", "male"],
        adultAge: 12,
        maxAge: 60,
        spawnFrequency: 20,
        data: {
            alignments: ["CN"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "kitsune": {
        genders: ["female", "male"],
        adultAge: 15,
        maxAge: 900,
        spawnFrequency: 1,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Medium"],
            rpgSystem: ["5e", "PF2e"],
            tags: []
        }
    },
    "kobold": {
        genders: ["female", "male"],
        adultAge: 6,
        maxAge: 120,
        spawnFrequency: 20,
        data: {
            alignments: ["LN", "LE"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "kuotoa": {
        genders: ["female", "male"],
        adultAge: 2,
        maxAge: 20,
        spawnFrequency: 10,
        data: {
            alignments: ["NE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "orc": {
        genders: ["female", "male"],
        adultAge: 12,
        maxAge: 50,
        spawnFrequency: 20,
        data: {
            alignments: ["CE"],
            size: ["Medium"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "modron": {
        genders: ["N/A"],
        adultAge: 0,
        maxAge: 9999,
        spawnFrequency: 2,
        data: {
            alignments: ["LN"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "ratfolk": {
        genders: ["female", "male"],
        adultAge: 10,
        maxAge: 60,
        spawnFrequency: 40,
        data: {
            alignments: ["LN", "N", "CN"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    },
    "tabaxi": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 90,
        spawnFrequency: 40,
        data: {
            alignments: ["CG", "CN"],
            size: ["Medium"],
            rpgSystem: ["5e", "PF2e"],
            tags: ["animal"]
        }
    },
    "tiefling": {
        genders: ["female", "male"],
        adultAge: 18,
        maxAge: 110,
        spawnFrequency: 25,
        data: {
            alignments: ["CG", "CN", "CE"],
            size: ["Medium"],
            rpgSystem: ["5e", "PF2e"],
            tags: []
        }
    },
    "tortle": {
        genders: ["female", "male"],
        adultAge: 15,
        maxAge: 50,
        spawnFrequency: 30,
        data: {
            alignments: ["LG", "LN", "LE"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: ["animal"]
        }
    },
    "triton": {
        genders: ["female", "male"],
        adultAge: 15,
        maxAge: 200,
        spawnFrequency: 20,
        data: {
            alignments: ["LG", "NG", "LN"],
            size: ["Medium"],
            rpgSystem: ["5e"],
            tags: []
        }
    },
    "wilkoss": {
        genders: ["female", "male"],
        adultAge: 12,
        maxAge: 50,
        spawnFrequency: 10,
        data: {
            alignments: ["LG", "NG", "CG", "LN", "N", "CN", "LE", "NE", "CE"],
            size: ["Small"],
            rpgSystem: ["all"],
            tags: []
        }
    }
};
/**
 * Returns the racial traits object for the specified species.
 * Returns the default racial traits object if no entry is found for the specified species ID.
 * @param race The ID of the target species
 */
function getRacialTraits(race) {
    if (RacialTraits.hasOwnProperty(race)) {
        return RacialTraits[race];
    }
    else {
        return RacialTraits.misc;
    }
}
/**
 * Returns a list of speciesIDs for all the species that are known to appear in at least one of the specified alignments.
 * @param alignments A list of alignments with which the returned species should be compatible.
 */
function getRaceByAlignment(alignments) {
    let results = [];
    Object.keys(RacialTraits).forEach(function (species) {
        let rt = RacialTraits[species];
        for (let i = 0; i < alignments.length; i++) {
            if (rt?.data.alignments.includes(alignments[i])) {
                results.push(species);
                break;
            }
        }
    });
    return results;
}
//# sourceMappingURL=racialtraits.js.map