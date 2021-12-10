"use strict";
const AirshipCollectionHelpers = {
    SortAirshipsByProperty(AirshipCollection, sortProperty = "name", desc = false) {
        if (AirshipCollection[0].hasOwnProperty(sortProperty)) {
            const property = sortProperty;
            if (desc) {
                // Descending
                AirshipCollection.sort((a, b) => {
                    if (a[property] == b[property]) {
                        return 0;
                    }
                    return (a[property] > b[property]) ? -1 : 1;
                });
            }
            else {
                AirshipCollection.sort((a, b) => {
                    if (a[property] == b[property]) {
                        return 0;
                    }
                    return (a[property] > b[property]) ? 1 : -1;
                });
            }
        }
        return AirshipCollection;
    }
};
class AirshipGeneratorControl extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    // AirshipGenerator: AirshipDeepGenerator;
    constructor(props) {
        super(props);
        // componentDidMount()
        // {
        // 	const self = this;
        // 	$.ajax({
        // 		crossDomain: true,
        // 		url: "/dnd/res/data/races.json",
        // 		dataType: 'json'
        // 	}).done(function (returnedData: IRace[])
        // 	{
        // 		returnedData.sort(compareRaceJsonObjects);
        // 		self.setState({ species: returnedData });
        // 	});
        // }
        // ClearRandomAirships = () =>
        // {
        // 	const newRandomAirships = this.CloneAirshipManager(this.state.randomAirships);
        // 	newRandomAirships.all = [];
        // 	newRandomAirships.filtered = [];
        // 	this.setState({
        // 		randomAirships: newRandomAirships
        // 	});
        // }
        // /** Creates a deep clone version of the specified AirshipManager, for use in updating state. */
        // CloneAirshipManager = (AirshipManager: AirshipManager): AirshipManager =>
        // {
        // 	const newManager = Object.assign({}, AirshipManager);
        // 	// return JSON.parse(JSON.stringify(AirshipManager));
        // 	newManager.all = JSON.parse(JSON.stringify(AirshipManager.all));
        // 	newManager.filtered = JSON.parse(JSON.stringify(AirshipManager.filtered));
        // 	return newManager;
        // }
        this.DeleteAirship = (id, isRandomCollection) => {
            // let AirshipCollection = this.CloneAirshipManager(isRandomCollection ? this.state.randomAirships : this.state.loadedAirships);
            // this.RemoveAirshipFromManager(AirshipCollection, id);
            // if (isRandomCollection) {
            // 	this.setState({ randomAirships: AirshipCollection });
            // }
            // else
            // {
            // 	this.setState({ loadedAirships: AirshipCollection });
            // }
        };
        this.state = {
            loadedAirships: [],
            randomAirships: [],
            sortLoaded: "unsorted",
            sortRandom: "unsorted",
            species: [],
        };
        // this.AirshipGenerator = new AirshipDeepGenerator();
    }
    render() {
        return (React.createElement("div", { className: "container bg-secondary", style: { padding: 0 } },
            React.createElement("div", { className: "container bg-body" },
                React.createElement(AirshipStatBlock, { Airship: TEST_AIRSHIP }))));
    }
}
class AirshipGeneratorSettings extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    constructor(props) {
        super(props);
        this.generateAirships = () => {
            this.props.GenerateAirships(this.races, this.state.gender.length == 1 ? this.state.gender[0] : undefined, this.ages, this.state.alignments, this.state.numberToGenerate);
        };
        this.restoreDefaultSettings = () => {
            this.setState({
                ages: [],
                alignments: [],
                gender: ["female", "male"],
                numberToGenerate: 20,
                race: [],
                restrictRacesByAlignment: false
            });
        };
        this.updateNumberToGenerate = (e) => {
            this.setState({ numberToGenerate: e.target.valueAsNumber });
        };
        this.state = {
            ages: [],
            alignments: [],
            gender: ["female", "male"],
            numberToGenerate: 20,
            race: [],
            restrictRacesByAlignment: false,
        };
    }
    render() {
        return (React.createElement("div", { className: "generator-settings noprint bg-light rounded p-2 border border-1 mb-3" }));
    }
    get ages() {
        return this.state.ages.length > 0 ? this.state.ages : undefined;
    }
    get races() {
        let race = undefined;
        // get species setting
        if (this.state.race.length == 1) {
            race = this.state.race[0];
        }
        else if (this.state.race.length > 1) {
            race = this.state.race;
        }
        // get alignment setting
        if (this.state.alignments.length > 0 && this.state.restrictRacesByAlignment) {
            race = getRaceByAlignment(this.state.alignments);
        }
        return race;
    }
}
class AirshipCollectionDisplay extends React.Component {
    constructor() {
        super(...arguments);
        this.Delete = (id) => {
            this.props.DeleteAirship(id, this.props.IsRandomCollection);
        };
    }
    render() {
        const Airships = this.props.SortProperty == "unsorted" ? this.props.AirshipCollection : AirshipCollectionHelpers.SortAirshipsByProperty(this.props.AirshipCollection.slice(), this.props.SortProperty);
        return (React.createElement("div", { className: "table-responsive" },
            React.createElement("table", { className: "table table-light table-striped table-bordered" },
                React.createElement("thead", null,
                    React.createElement("tr", { className: "header-row table-dark" },
                        React.createElement("th", { className: "summary" }, "Summary"),
                        React.createElement("th", { className: "description" }, "Description"),
                        React.createElement("th", { className: "token" }, "Token"),
                        React.createElement("th", { className: "controls d-print-none" }, "Controls"))),
                React.createElement("tbody", null, Airships.map((Airship, index) => React.createElement(AirshipRow, { Delete: this.Delete, Airship: Airship, key: index }))))));
    }
}
class AirshipRow extends React.Component {
    render() {
        return (React.createElement("tr", { className: "Airship-row" }));
    }
}
class AirshipStatBlock extends React.Component {
    render() {
        const airship = this.props.Airship;
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "card-body" },
                React.createElement("h5", { className: "card-title" }, airship.name),
                React.createElement("h6", { className: "card-subtitle mb-2 text-muted fst-italic" }, `${airship.size} ${airship.vehicleType} (${airship.dimensions[0]} by ${airship.dimensions[1]})`),
                React.createElement("div", { className: "card-text lh-sm" },
                    React.createElement(StatBlockProperty, { Label: "Creature Capacity", Value: airship.capCrew + " crew, " + airship.capPassenger + " passengers" }),
                    React.createElement(StatBlockProperty, { Label: "Cargo Capacity", Value: airship.capCargo + " tons" }),
                    React.createElement(StatBlockProperty, { Label: "Travel Pace", Value: `${airship.pace} miles per hour (${airship.pace * 24} miles per day)` }),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "STR"),
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "DEX"),
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "CON"),
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "INT"),
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "WIS"),
                        React.createElement("div", { className: "col-2 text-center fw-bold" }, "CHA")),
                    React.createElement("div", { className: "row bg-secondary" },
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.str),
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.dex),
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.con),
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.int),
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.wis),
                        React.createElement("div", { className: "col-2 text-center text-light" }, airship.cha)),
                    React.createElement("div", null,
                        React.createElement("b", null, "Damage Immunities "),
                        airship.immune.join(", ")),
                    React.createElement("div", null,
                        React.createElement("b", null, "Condition Immunities "),
                        airship.conditionImmune.join(", "))),
                React.createElement("div", { className: "card-text ship-actions" },
                    React.createElement(StatBlockHeader, null, "Actions"),
                    airship.action.map((action, index) => {
                        return action.hasOwnProperty("type") ?
                            React.createElement("div", { key: index }, action.items.map((item, index) => React.createElement(StatBlockProperty, { Label: item.name, Value: item.entry, key: index })))
                            :
                                React.createElement("div", { key: index }, action.toString());
                    })),
                React.createElement("div", { className: "card-text ship-hull" },
                    React.createElement(StatBlockHeader, null, "Hull"),
                    React.createElement(StatBlockProperty, { Label: "Armor Class", Value: airship.hull.ac }),
                    React.createElement(StatBlockProperty, { Label: "Hit Points", Value: airship.hull.hp + " (damage threshold " + airship.hull.dt + ")" })),
                React.createElement("div", { className: "card-text ship-control" }, airship.control.map((control, index) => React.createElement("div", { key: index },
                    React.createElement(StatBlockHeader, null, "Control: " + control.name),
                    React.createElement(StatBlockProperty, { Label: "Armor Class", Value: control.ac }),
                    React.createElement(StatBlockProperty, { Label: "Hit Points", Value: control.hp }),
                    control.entries.map((entry, index) => React.createElement("div", { key: index }, entry))))),
                React.createElement("div", { className: "card-text ship-movement" }, airship.movement.map((movement, index) => React.createElement("div", { key: index },
                    React.createElement(StatBlockHeader, null, "Movement: " + movement.name),
                    movement.speed.map((speed, index) => React.createElement("div", { key: index },
                        React.createElement("b", null,
                            "Speed (" + speed.mode + ")",
                            " "),
                        speed.entries.join(" ")))))),
                React.createElement("div", { className: "card-text ship-weapons" }, airship.weapon.map((weapon, index) => React.createElement("div", { key: index },
                    React.createElement(StatBlockHeader, null, "Weapon: " + weapon.name + (weapon.count ? ` (${weapon.count})` : "")),
                    weapon.entries.map((entry, index) => React.createElement("div", { key: index }, entry))))))));
    }
}
const TEST_AIRSHIP = {
    "name": "Warship",
    "source": "GoS",
    "page": 194,
    "vehicleType": "SHIP",
    "size": "G",
    "dimensions": [
        "100 ft.",
        "20 ft."
    ],
    "terrain": [
        "sea"
    ],
    "capCrew": 40,
    "capPassenger": 60,
    "capCargo": 200,
    "pace": 4,
    "str": 20,
    "dex": 4,
    "con": 20,
    "int": 0,
    "wis": 0,
    "cha": 0,
    "immune": [
        "poison",
        "psychic"
    ],
    "conditionImmune": [
        "blinded",
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "incapacitated",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "stunned",
        "unconscious"
    ],
    "hull": {
        "ac": 15,
        "hp": 500,
        "dt": 20
    },
    "control": [
        {
            "name": "Helm",
            "ac": 18,
            "hp": 50,
            "entries": [
                "Move up to the speed of one of its movement components, with one 90-degree turn. If the helm is destroyed, the warship can't turn."
            ]
        }
    ],
    "movement": [
        {
            "name": "Oars",
            "ac": 12,
            "hp": 100,
            "hpNote": "-5 ft. speed per 25 damage taken",
            "speed": [
                {
                    "mode": "water",
                    "entries": [
                        "20 ft. (requires at least 20 crew)"
                    ]
                }
            ]
        },
        {
            "name": "Sails",
            "ac": 12,
            "hp": 100,
            "hpNote": "-10 ft. speed per 25 damage taken",
            "speed": [
                {
                    "mode": "water",
                    "entries": [
                        "35 ft.; 15 ft. while sailing into the wind; 50 ft. while sailing with the wind."
                    ]
                }
            ]
        }
    ],
    "weapon": [
        {
            "name": "Ballistas",
            "count": 2,
            "ac": 15,
            "hp": 50,
            "entries": [
                "{@atk rw} {@hit 6} to hit, range 120/480 ft., one target. {@h}16 ({@damage 3d10}) piercing damage."
            ]
        },
        {
            "name": "Mangonels",
            "count": 2,
            "ac": 15,
            "hp": 100,
            "entries": [
                "{@atk rw} {@hit 5} to hit, range 200/800 ft. (can't hit targets within 60 ft. of it), one target. {@h}27 ({@damage 5d10}) bludgeoning damage."
            ]
        },
        {
            "name": "Naval Ram",
            "ac": 20,
            "hp": 100,
            "dt": 10,
            "entries": [
                "The warship has advantage on all saving throws relating to crashing when it crashes into a creature or object. Any damage it takes from the crash is applied to the naval ram rather than to the ship. These benefits don't apply if another vessel crashes into the warship."
            ]
        }
    ],
    "actionThresholds": {
        "0": 0,
        "1": 3,
        "2": 10,
        "3": 20
    },
    "action": [
        "On its turn, the warship can take 3 actions, choosing from the options below. It can take only 2 actions if it has fewer than twenty crew and only 1 action if it has fewer than ten. It can't take these actions if it has fewer than three crew.",
        {
            "type": "list",
            "style": "list-hang-notitle",
            "items": [
                {
                    "type": "item",
                    "name": "Fire Ballistas.",
                    "entry": "The warship can fire its {@object ballista||ballistas} (DMG, ch. 8)."
                },
                {
                    "type": "item",
                    "name": "Fire Mangonels.",
                    "entry": "The warship can fire its {@object mangonel||mangonels} (DMG, ch. 8)."
                },
                {
                    "type": "item",
                    "name": "Move.",
                    "entry": "The warship can use its helm to move with its oars or sails. As part of this move, it can use its naval ram."
                }
            ]
        }
    ],
    "hasFluff": true,
    "hasFluffImages": true
};
ReactDOM.render(React.createElement(AirshipGeneratorControl, null), document.getElementById("react-container"));
//# sourceMappingURL=airship-generator.js.map