"use strict";
const RacialAppearance = {
    "misc": {
        baseHeight: "4' 8\"",
        heightModifier: "2d10",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "aarakocra": {
        baseHeight: "4' 10\"",
        heightModifier: "1d4",
        baseWeight: 80,
        weightModifier: "1d6",
        statureRatio: 1.08
    },
    "aasimar": {
        baseHeight: "4' 8\"",
        heightModifier: "2d10",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "bear": {
        // just copied from Orc
        baseHeight: "5' 4\"",
        heightModifier: "2d8",
        baseWeight: 175,
        weightModifier: "2d6",
        statureRatio: 1
    },
    "bloodfin": {
        // just copied from Orc
        baseHeight: "5' 4\"",
        heightModifier: "2d8",
        baseWeight: 175,
        weightModifier: "2d6",
        statureRatio: 1
    },
    "brokkos": {
        // just copied from Dwarf
        baseHeight: "3' 8\"",
        heightModifier: "2d4",
        baseWeight: 115,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "burrowfolk": {
        // just copied from Gnome
        baseHeight: "2' 11\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "bugbear": {
        baseHeight: "6' 0\"",
        heightModifier: "2d12",
        baseWeight: 200,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "dragonborn": {
        baseHeight: "5' 6\"",
        heightModifier: "2d8",
        baseWeight: 175,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "drow": {
        baseHeight: "4' 5\"",
        heightModifier: "2d6",
        baseWeight: 75,
        weightModifier: "1d6",
        statureRatio: 1.08
    },
    "dwarf": {
        baseHeight: "3' 8\"",
        heightModifier: "2d4",
        baseWeight: 115,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "elf": {
        // taken from High Elf
        baseHeight: "4' 6\"",
        heightModifier: "2d10",
        baseWeight: 90,
        weightModifier: "1d4",
        statureRatio: 1.08
    },
    "firbolg": {
        baseHeight: "6' 2\"",
        heightModifier: "2d12",
        baseWeight: 175,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "firenewt": {
        // just copied from Kenku
        baseHeight: "4' 4\"",
        heightModifier: "2d8",
        baseWeight: 50,
        weightModifier: "1d6",
        statureRatio: 1
    },
    "genasi": {
        // just copied from Human
        baseHeight: "4' 8\"",
        heightModifier: "2d10",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "gnome": {
        baseHeight: "2' 11\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "goblin": {
        baseHeight: "3' 5\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "grippli": {
        // just copied from Gnome
        baseHeight: "2' 11\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "grung": {
        // just copied from Gnome
        baseHeight: "2' 11\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "halfling": {
        baseHeight: "2' 7\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "halfelf": {
        baseHeight: "4' 9\"",
        heightModifier: "2d8",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "halforc": {
        baseHeight: "4' 10\"",
        heightModifier: "2d10",
        baseWeight: 140,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "hobgoblin": {
        baseHeight: "4' 8\"",
        heightModifier: "2d10",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "human": {
        baseHeight: "4' 8\"",
        heightModifier: "2d10",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "lizardfolk": {
        baseHeight: "4' 9\"",
        heightModifier: "2d10",
        baseWeight: 120,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "kenku": {
        baseHeight: "4' 4\"",
        heightModifier: "2d8",
        baseWeight: 50,
        weightModifier: "1d6",
        statureRatio: 1.08
    },
    "kitsune": {
        // just copied from Elf
        baseHeight: "4' 6\"",
        heightModifier: "2d10",
        baseWeight: 90,
        weightModifier: "1d4",
        statureRatio: 1.08
    },
    "kobold": {
        baseHeight: "2' 1\"",
        heightModifier: "2d4",
        baseWeight: 25,
        weightModifier: "1d1",
        statureRatio: 1.08
    },
    "kuotoa": {
        // just copied from Dwarf
        baseHeight: "3' 8\"",
        heightModifier: "2d4",
        baseWeight: 115,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "orc": {
        baseHeight: "5' 4\"",
        heightModifier: "2d8",
        baseWeight: 175,
        weightModifier: "2d6",
        statureRatio: 1.08
    },
    "modron": {
        baseHeight: "4' 8\"",
        heightModifier: "0d0",
        baseWeight: 128,
        weightModifier: "0d0",
        statureRatio: 1
    },
    "tabaxi": {
        baseHeight: "4' 10\"",
        heightModifier: "2d10",
        baseWeight: 90,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "tiefling": {
        baseHeight: "4' 9\"",
        heightModifier: "2d8",
        baseWeight: 110,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "tortle": {
        baseHeight: "4' 10\"",
        heightModifier: "2d8",
        baseWeight: 400,
        weightModifier: "2d10",
        statureRatio: 1.08
    },
    "triton": {
        baseHeight: "4' 6\"",
        heightModifier: "2d10",
        baseWeight: 90,
        weightModifier: "2d4",
        statureRatio: 1.08
    },
    "wilkoss": {
        // just copied from Gnome
        baseHeight: "2' 11\"",
        heightModifier: "2d4",
        baseWeight: 35,
        weightModifier: "1d1",
        statureRatio: 1
    }
};
//# sourceMappingURL=racialappearance.js.map