"use strict";
const LocationGeneratorOptions = [
    {
        label: "City",
        value: "city"
    },
    {
        label: "Shop",
        value: "shop"
    },
    {
        label: "Island",
        value: "island"
    }
];
class LocationGeneratorNav extends React.Component {
    render() {
        return (React.createElement("nav", { className: "navbar navbar-light bg-light bg-gradient border-top border-bottom" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("select", { className: "form-select", onChange: e => this.props.SelectGenerator(e.target.value), value: this.props.SelectedGenerator }, LocationGeneratorOptions.map((option) => React.createElement("option", { value: option.value, key: option.value }, option.label))))))));
    }
}
class LocationGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedGenerator = (value) => {
            this.setState({ selectedGenerator: value });
        };
        this.state = {
            selectedGenerator: "city"
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(LocationGeneratorNav, { SelectedGenerator: this.state.selectedGenerator, SelectGenerator: this.updateSelectedGenerator }),
            React.createElement("div", { className: "container bg-light" },
                (this.state.selectedGenerator == "city") &&
                    React.createElement(CityGenerator, null),
                (this.state.selectedGenerator == "shop") &&
                    React.createElement(ShopGenerator, null),
                (this.state.selectedGenerator == "island") &&
                    React.createElement(IslandGenerator, { tableData: this.props.tableData }))));
    }
}
class IslandGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenerator: "City"
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Reincarnation Expanded"),
            React.createElement("p", { className: "px-2" }, "The version of reincarnate found in the standard Player's Handbook may be enough to sate some adventurers... well, at least the BORING ones that is! This document outlines an alternate version of the spell reincarnate. One that any DM leading a party of powergamers would best avoid using. For all else, enjoy."),
            React.createElement("div", { className: "card rounded bg-white mb-2" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h4", { className: "card-title" }, "The Steps to Reincarnation!"),
                    React.createElement("p", { className: "card-text" },
                        React.createElement("ol", null,
                            React.createElement("li", null, "Roll on the Base Table"),
                            React.createElement("li", null, "Roll on the Sex Table (result has no effect on a character's gender)"),
                            React.createElement("li", null, "Roll on the Successfulness Table and follow instructions from there"),
                            React.createElement("li", null, "Roll on any additional applicable tables"),
                            React.createElement("li", null, "Finish up by rolling on any applicable subrace tables for your race")),
                        React.createElement("h4", null, "Subraces!"),
                        React.createElement("p", null, "An asterisk next to a race indicates that there is a matching subrace table to roll on. For instance, the Elements table would be used to determine what kind of Genasi, elemental, etc. a character ends up as. There are also tables for dragon types, tiefling types, and many more. Find these tables in the Subraces section at the end of the book.")))),
            React.createElement("p", null, "The following section contains tables for randomly generating various subraces such as dragon type, tiefling ancestry, goblinoid kind, elf race, demon or devil type, etc."),
            React.createElement("div", { className: "accordion accordion-flush", id: "subracesAccordion" },
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "headingStandardSubraces" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseStandardSubraces", "aria-expanded": "false", "aria-controls": "collapseStandardSubraces" }, "Standard Subraces")),
                    React.createElement("div", { id: "collapseStandardSubraces", className: "accordion-collapse collapse", "aria-labelledby": "headingStandardSubraces", "data-bs-parent": "#subracesAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("div", { className: "accordion accordion-flush", id: "standardSubracesAccordion" }, this.props.tableData.subraces.standard.map((slimData, index) => React.createElement(RollableTableAccordionContainer, { ParentID: "standardSubracesAccordion", Data: slimData, key: index })))))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "headingExoticSubraces" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseExoticSubraces", "aria-expanded": "false", "aria-controls": "collapseExoticSubraces" }, "Exotic Subraces")),
                    React.createElement("div", { id: "collapseExoticSubraces", className: "accordion-collapse collapse", "aria-labelledby": "headingExoticSubraces", "data-bs-parent": "#subracesAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("div", { className: "accordion accordion-flush", id: "exoticSubracesAccordion" }, this.props.tableData.subraces.exotic.map((slimData, index) => React.createElement(RollableTableAccordionContainer, { ParentID: "exoticSubracesAccordion", Data: slimData, key: index })))))))));
    }
}
class RollableTableAccordionContainer extends React.Component {
    render() {
        const idBase = this.props.Data.title.replace(/[\s\(\)\[\]\{\}\,]/g, '');
        const collapseId = "collapse" + idBase;
        const headerId = "heading" + idBase;
        return (React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header", id: headerId },
                React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#" + collapseId, "aria-expanded": "false", "aria-controls": collapseId }, this.props.Data.title)),
            React.createElement("div", { id: collapseId, className: "accordion-collapse collapse", "aria-labelledby": headerId, "data-bs-parent": "#" + this.props.ParentID },
                React.createElement("div", { className: "accordion-body p-0" },
                    this.props.Data.preface?.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
                    React.createElement(RollableTable, { resultColumnLabel: this.props.ResultColumnLabel, rows: this.props.Data.rows }),
                    this.props.Data.postface?.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index }))))));
    }
}
RollableTableAccordionContainer.defaultProps = {
    ResultColumnLabel: "Result"
};
const LocationGeneratorTables = {
    distortions: {
        elemental: [
            {
                title: "Air",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as an air genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as an air elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to lightning damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes appear to crackle with electricity.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a severe fear of being underground, and has disadvantage on all skill checks and saving throws while underground.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast feather fall at will.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains power over the winds, gifting them with a flying speed equal to their land speed. They also can hover up to a foot in the air and travel this way instead of walking.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has feathers instead of hair and weighs half as much as they appear they should.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in storm sorcery.",
                    },
                ]
            },
            {
                title: "Earth",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as an earth genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as an earth elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to bludgeoning damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes appear to be made of gemstones.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but is abnormally dense and heavy, their base land speed is lowered by 5 ft.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast earth tremor at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but is made of crystal, and has resistance to piercing, slashing, and bludgeoning damage from non-magical weapons.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has skin textured like marble or layers of sandstone.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in stone sorcery.",
                    },
                ]
            },
            {
                title: "Fire",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as a fire genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as a fire elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to fire damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes glow with the flames of an endless furnace.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but becomes vulnerable to cold damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast burning hands at will as a first level spell can cast burning hands at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has hair made of fire and is immune to fire damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has veins that glow like magma.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in phoenix sorcery.",
                    },
                ]
            },
            {
                title: "Water",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as a water genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as a water elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to cold damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes look like deep, endless pools of water.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but must submerge in water once every three days or gain one level of exhaustion as they dry up.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast ice knife at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains webbed toes and fingers, gaining a swimming speed equal to their land speed.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has fish scales and a few vestigal fins.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in sea sorcery.",
                    },
                ]
            },
        ],
        magical: [
            {
                title: "Air",
                rows: [
                    {
                        odds: 2,
                        result: "Twig",
                    },
                ]
            },
        ],
    },
    gender: [
        {
            odds: 50,
            result: "Female",
        },
        {
            odds: 50,
            result: "Male",
        },
    ],
    magicalDistortions: {
        celestial: [
            {
                odds: 10,
                result: "The target is reincarnated as an aasimar*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a set of angelic wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally beautiful and gain 2 charisma.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are marked with the symbol of a god, goddess, or powerful angel.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the Scourge Aasimar's Radiant Consumption ability.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a selection of celestial traits typical to aasimar, such as clear skin, white hair, glowing eyes, feathers instead of hair, or glowing patterns across their skin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the paladin's Divine Sense power.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Celestial language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but can cast cure wounds once per short rest without expending a spell slot.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but can cast zone of truth once per short rest without expending a spell slot.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an angel.",
            },
        ],
        fey: [
            {
                odds: 1,
                result: "The target is reincarnated as a pixie or sprite.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an awakened plant.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an Eladrin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Satyr.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Spriggan.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Doppelganger.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a powerful fey taking an interest in them.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a set of antlers.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a set of butterfly or dragonfly wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the fey ancestry and trance traits.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn Sylvan.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain physical traits resembling those of a type of hag, such as green skin, warts, or slimey skin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they can speak to animals.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they can speak to plants.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a strange and detrimental fey curse determined by the DM.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are made completely out of plant matter and are vulnerable to fire damage and do not need to eat.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but the lower half of their body is that of a deer or stag.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but their eyes are an unusual color and twinkle like stars at twilight.",
            },
            {
                odds: 1,
                result: "The caster grows a set of butterfly or dragonfly wings, but the target is not reincarnated.",
            },
            {
                odds: 1,
                result: "The caster grows a set of antlers, but the target is not reincarnated.",
            },
        ],
        fiend: [
            {
                odds: 10,
                result: "The target is reincarnated as a tiefling*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a half-devil*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a set of devilish wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally beautiful and gain 2 charisma.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally hideous and lose 2 charisma (to a minimum of 1).",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are marked with the symbol of a powerful fiend.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a selection of fiendish traits typical to tieflings, such as horns, golden or red eyes, scales, cloven feet, six fingers, no cast shadow, no reflection, a tail, a forked tongue or smelling of brimstone.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Infernal language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Abyssal language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to fire damage and is vulnerable to radiant damage.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a demon or devil* (player choice).",
            },
        ],
        necrotic: [
            {
                odds: 6,
                result: "The target is reincarnated as a skeletal version of what they rolled on the base table.",
            },
            {
                odds: 5,
                result: "The target is reincarnated as a zombie version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a vampiric version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a ghoulish version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "Roll on the Exotic Races table, the target is brought back as a skeletal version of that race.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a wight version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a revenant version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a powerful undead taking an interest in them.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a level in shadow magic sorcery.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with pure black eyes and grey skin. They have darkvision up to 120 ft.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but is healed by necrotic energy (such as inflict wounds) and harmed by positive energy (such as cure wounds).",
            },
        ],
    },
    otherTables: {
        animals: [
            {
                odds: 1,
                result: "Big Cat",
            },
            {
                odds: 1,
                result: "Bear",
            },
            {
                odds: 1,
                result: "Camel",
            },
            {
                odds: 1,
                result: "Deer/Elk/Stag",
            },
            {
                odds: 1,
                result: "Dog",
            },
            {
                odds: 1,
                result: "Snake",
            },
            {
                odds: 1,
                result: "Lizard",
            },
            {
                odds: 1,
                result: "Crab/Lobster",
            },
            {
                odds: 1,
                result: "Octopus",
            },
            {
                odds: 1,
                result: "Fish",
            },
            {
                odds: 1,
                result: "Frog",
            },
            {
                odds: 1,
                result: "Boar",
            },
            {
                odds: 1,
                result: "Bird",
            },
            {
                odds: 1,
                result: "Goat",
            },
            {
                odds: 1,
                result: "Scorpion/Spider",
            },
            {
                odds: 1,
                result: "Wasp",
            },
            {
                odds: 1,
                result: "Rhino",
            },
            {
                odds: 1,
                result: "Sea Horse",
            },
            {
                odds: 1,
                result: "Wolf",
            },
            {
                odds: 1,
                result: "Horse",
            },
        ],
        lycanthropy: [
            {
                odds: 1,
                result: "Tiger",
            },
            {
                odds: 1,
                result: "Bear",
            },
            {
                odds: 1,
                result: "Wolf",
            },
            {
                odds: 1,
                result: "Boar",
            },
            {
                odds: 1,
                result: "Rat",
            },
            {
                odds: 1,
                result: "Raven",
            },
        ],
    },
    race: [
        {
            odds: 4,
            result: "Aarakocra",
        },
        {
            odds: 4,
            result: "Aasimar*",
        },
        {
            odds: 3,
            result: "Centaur",
        },
        {
            odds: 3,
            result: "Changeling",
        },
        {
            odds: 4,
            result: "Dragonborn*",
        },
        {
            odds: 4,
            result: "Dwarf*",
        },
        {
            odds: 4,
            result: "Elf*",
        },
        {
            odds: 4,
            result: "Firbolg",
        },
        {
            odds: 4,
            result: "Genasi*",
        },
        {
            odds: 2,
            result: "Gith*",
        },
        {
            odds: 4,
            result: "Gnome*",
        },
        {
            odds: 4,
            result: "Goblinoid*",
        },
        {
            odds: 4,
            result: "Goliath",
        },
        {
            odds: 4,
            result: "Halfling*",
        },
        {
            odds: 4,
            result: "Half-Elf*",
        },
        {
            odds: 4,
            result: "Half-Orc",
        },
        {
            odds: 4,
            result: "Human",
        },
        {
            odds: 4,
            result: "Kenku",
        },
        {
            odds: 4,
            result: "Kobold*",
        },
        {
            odds: 4,
            result: "Lizardfolk",
        },
        {
            odds: 2,
            result: "Minotaur",
        },
        {
            odds: 3,
            result: "Orc",
        },
        {
            odds: 4,
            result: "Tabaxi",
        },
        {
            odds: 4,
            result: "Tiefling*",
        },
        {
            odds: 4,
            result: "Tortle",
        },
        {
            odds: 4,
            result: "Triton",
        },
        {
            odds: 3,
            result: "Yuan-Ti Pureblood",
        },
    ],
    subraces: {
        exotic: [
            {
                title: "Blight",
                rows: [
                    {
                        odds: 2,
                        result: "Twig",
                    },
                    {
                        odds: 2,
                        result: "Vine",
                    },
                    {
                        odds: 2,
                        result: "Needle",
                    },
                ]
            },
            {
                title: "Demon Types",
                rows: [
                    {
                        odds: 1,
                        result: "Armanite",
                    },
                    {
                        odds: 1,
                        result: "Babau",
                    },
                    {
                        odds: 1,
                        result: "Barlgura",
                    },
                    {
                        odds: 1,
                        result: "Bulezau",
                    },
                    {
                        odds: 1,
                        result: "Dybbuk",
                    },
                    {
                        odds: 1,
                        result: "Hezrou",
                    },
                    {
                        odds: 1,
                        result: "Marilith",
                    },
                    {
                        odds: 1,
                        result: "Maurezhi",
                    },
                    {
                        odds: 1,
                        result: "Nabassu",
                    },
                    {
                        odds: 1,
                        result: "Shadow Demon",
                    },
                    {
                        odds: 1,
                        result: "Tanarukk",
                    },
                    {
                        odds: 1,
                        result: "Vrock",
                    },
                ]
            },
            {
                title: "Devil Types",
                rows: [
                    {
                        odds: 1,
                        result: "Abishai (roll on kobold subclass table for chromatic type)",
                    },
                    {
                        odds: 1,
                        result: "Barbed Devil",
                    },
                    {
                        odds: 1,
                        result: "Bearded Devil",
                    },
                    {
                        odds: 1,
                        result: "Bone Devil",
                    },
                    {
                        odds: 1,
                        result: "Chain Devil",
                    },
                    {
                        odds: 1,
                        result: "Erinyes",
                    },
                    {
                        odds: 1,
                        result: "Horned Devil",
                    },
                    {
                        odds: 1,
                        result: "Narzugon",
                    },
                    {
                        odds: 1,
                        result: "Orthon",
                    },
                    {
                        odds: 1,
                        result: "Pit Fiend",
                    },
                    {
                        odds: 1,
                        result: "Spined Devil",
                    },
                    {
                        odds: 1,
                        result: "Succubus/Incubus",
                    },
                ]
            },
            {
                title: "Golem",
                rows: [
                    {
                        odds: 1,
                        result: "Bone",
                    },
                    {
                        odds: 1,
                        result: "Clay",
                    },
                    {
                        odds: 1,
                        result: "Flesh",
                    },
                    {
                        odds: 1,
                        result: "Gemstone",
                    },
                    {
                        odds: 1,
                        result: "Glass",
                    },
                    {
                        odds: 1,
                        result: "Metal",
                    },
                    {
                        odds: 1,
                        result: "Stone",
                    },
                    {
                        odds: 1,
                        result: "Wood",
                    },
                ]
            },
            {
                title: "Grung Color",
                rows: [
                    {
                        odds: 1,
                        result: "Blue",
                    },
                    {
                        odds: 1,
                        result: "Gold",
                    },
                    {
                        odds: 1,
                        result: "Green",
                    },
                    {
                        odds: 1,
                        result: "Orange",
                    },
                    {
                        odds: 1,
                        result: "Purple",
                    },
                    {
                        odds: 1,
                        result: "Red",
                    },
                ]
            },
            {
                title: "Hag",
                rows: [
                    {
                        odds: 1,
                        result: "Annis Hag",
                    },
                    {
                        odds: 1,
                        result: "Bheur Hag",
                    },
                    {
                        odds: 1,
                        result: "Green Hag",
                    },
                    {
                        odds: 1,
                        result: "Night Hag",
                    },
                    {
                        odds: 1,
                        result: "Red Hag",
                    },
                    {
                        odds: 1,
                        result: "Sea Hag",
                    },
                ]
            },
            {
                title: "Giant",
                rows: [
                    {
                        odds: 1,
                        result: "Cloud Giant",
                    },
                    {
                        odds: 1,
                        result: "Cyclops",
                    },
                    {
                        odds: 1,
                        result: "Fire Giant",
                    },
                    {
                        odds: 1,
                        result: "Frost Giant",
                    },
                    {
                        odds: 1,
                        result: "Hill Giant",
                    },
                    {
                        odds: 1,
                        result: "Ogre",
                    },
                    {
                        odds: 1,
                        result: "Oni",
                    },
                    {
                        odds: 1,
                        result: "Stone Giant",
                    },
                    {
                        odds: 1,
                        result: "Storm Giant",
                    },
                    {
                        odds: 1,
                        result: "Troll",
                    },
                ]
            },
            {
                title: "Slaad",
                rows: [
                    {
                        odds: 2,
                        result: "Blue Slaad",
                    },
                    {
                        odds: 2,
                        result: "Death Slaad",
                    },
                    {
                        odds: 2,
                        result: "Gray Slaad",
                    },
                    {
                        odds: 2,
                        result: "Green Slaad",
                    },
                    {
                        odds: 2,
                        result: "Red Slaad",
                    },
                ]
            },
            {
                title: "Ooze",
                rows: [
                    {
                        odds: 2,
                        result: "Adult Oblex",
                    },
                    {
                        odds: 2,
                        result: "Black Pudding",
                    },
                    {
                        odds: 2,
                        result: "Gray Ooze",
                    },
                    {
                        odds: 2,
                        result: "Ochre Jelly",
                    },
                    {
                        odds: 2,
                        result: "Slithering Tracker",
                    },
                ]
            },
        ],
        standard: [
            {
                title: "Aasimar",
                rows: [
                    {
                        odds: 2,
                        result: "Fallen",
                    },
                    {
                        odds: 2,
                        result: "Protector",
                    },
                    {
                        odds: 2,
                        result: "Scourge",
                    },
                ]
            },
            {
                title: "Dragon Types",
                rows: [
                    {
                        odds: 1,
                        result: "Black",
                    },
                    {
                        odds: 1,
                        result: "Blue",
                    },
                    {
                        odds: 1,
                        result: "Brass",
                    },
                    {
                        odds: 1,
                        result: "Bronze",
                    },
                    {
                        odds: 1,
                        result: "Copper",
                    },
                    {
                        odds: 1,
                        result: "Gold",
                    },
                    {
                        odds: 1,
                        result: "Green",
                    },
                    {
                        odds: 1,
                        result: "Red",
                    },
                    {
                        odds: 1,
                        result: "Silver",
                    },
                    {
                        odds: 1,
                        result: "White",
                    },
                ]
            },
            {
                title: "Dwarf",
                rows: [
                    {
                        odds: 2,
                        result: "Hill Dwarf",
                    },
                    {
                        odds: 2,
                        result: "Mountain Dwarf",
                    },
                    {
                        odds: 2,
                        result: "Duergar",
                    },
                ]
            },
            {
                title: "Elf, Half-Elf",
                rows: [
                    {
                        odds: 1,
                        result: "High Elf",
                    },
                    {
                        odds: 1,
                        result: "Wood Elf",
                    },
                    {
                        odds: 1,
                        result: "Drow",
                    },
                    {
                        odds: 1,
                        result: "Eladrin",
                    },
                    {
                        odds: 1,
                        result: "Sea Elf",
                    },
                    {
                        odds: 1,
                        result: "Avariel",
                    },
                    {
                        odds: 1,
                        result: "Grugach",
                    },
                    {
                        odds: 1,
                        result: "Shadar-Kai",
                    },
                ]
            },
            {
                title: "Elements (Genasi, Elementals)",
                rows: [
                    {
                        odds: 1,
                        result: "Air",
                    },
                    {
                        odds: 1,
                        result: "Earth",
                    },
                    {
                        odds: 1,
                        result: "Fire",
                    },
                    {
                        odds: 1,
                        result: "Water",
                    },
                ]
            },
            {
                title: "Gith",
                rows: [
                    {
                        odds: 2,
                        result: "Githyanki",
                    },
                    {
                        odds: 2,
                        result: "Githzerai",
                    },
                ]
            },
            {
                title: "Gnome",
                rows: [
                    {
                        odds: 2,
                        result: "Forest Gnome",
                    },
                    {
                        odds: 2,
                        result: "Rock Gnome",
                    },
                    {
                        odds: 2,
                        result: "Deep Gnome (Svirfneblin)",
                    },
                ]
            },
            {
                title: "Goblinoid",
                rows: [
                    {
                        odds: 2,
                        result: "Bugbear",
                    },
                    {
                        odds: 2,
                        result: "Goblin",
                    },
                    {
                        odds: 2,
                        result: "Hobgoblin",
                    },
                ]
            },
            {
                title: "Halfling",
                rows: [
                    {
                        odds: 2,
                        result: "Lightfoot",
                    },
                    {
                        odds: 2,
                        result: "Stout",
                    },
                    {
                        odds: 2,
                        result: "Ghostwise",
                    },
                ]
            },
            {
                title: "Kobold (chromatic dragon colors)",
                rows: [
                    {
                        odds: 2,
                        result: "Black",
                    },
                    {
                        odds: 2,
                        result: "Blue",
                    },
                    {
                        odds: 2,
                        result: "Green",
                    },
                    {
                        odds: 2,
                        result: "Red",
                    },
                    {
                        odds: 2,
                        result: "White",
                    },
                ]
            },
            {
                title: "Tiefling",
                rows: [
                    {
                        odds: 1,
                        result: "Asmodeus",
                    },
                    {
                        odds: 1,
                        result: "Baalzebul",
                    },
                    {
                        odds: 1,
                        result: "Dispater",
                    },
                    {
                        odds: 1,
                        result: "Fierna",
                    },
                    {
                        odds: 1,
                        result: "Glasya",
                    },
                    {
                        odds: 1,
                        result: "Levistus",
                    },
                    {
                        odds: 1,
                        result: "Mammon",
                    },
                    {
                        odds: 1,
                        result: "Abyssal",
                    },
                ]
            },
        ],
    },
    successfulness: [
        {
            odds: 15,
            result: "Success. Take result from Base table.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table once and add results to base race.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table twice and add results to base race.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table thrice and add results to base race.",
        },
        {
            odds: 1,
            result: "Weave Distortion. Roll on the Wild Magic table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
        },
        {
            odds: 1,
            result: "Failure. Roll on the Whoops! table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
        },
    ],
};
ReactDOM.render(React.createElement(LocationGenerator, { tableData: LocationGeneratorTables }), document.getElementById("react-container"));
//# sourceMappingURL=location-generator%20copy.js.map