"use strict";
class KillingGameViewer extends React.Component {
    constructor(props) {
        super(props);
        this.viewCharacter = this.viewCharacter.bind(this);
        this.viewDiorama = this.viewDiorama.bind(this);
        this.viewMenu = this.viewMenu.bind(this);
        let view = GetURLParameter("view");
        let characterName = GetURLParameter("name");
        let matches = [];
        if (characterName) {
            matches = matches.concat(this.props.data.characters.filter(el => el.name.toLowerCase() == characterName?.toLowerCase()));
        }
        let selectedDiorama = this.props.data.misc[0];
        let selectedCharacter = matches.length > 0 ? matches[0] : this.props.data.characters[0];
        this.state = {
            dioramaShownAtLoad: matches.length > 0,
            displayType: view == "character" ? "Character" : "Menu",
            selectedCharacter: selectedCharacter,
            selectedDiorama: selectedDiorama
        };
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100" },
            this.state.displayType == "Menu" && React.createElement(KillingGameViewerNav, { data: this.props.data, displayCharacter: this.viewCharacter }),
            this.state.displayType == "Character" && React.createElement(KillingGameCharacterPage, { character: this.state.selectedCharacter, close: this.viewMenu })));
    }
    viewCharacter(character) {
        this.setState({ selectedCharacter: character, displayType: "Character" });
    }
    viewDiorama(diorama) {
        this.setState({ selectedDiorama: diorama, displayType: "Diorama" });
    }
    viewMenu() {
        this.setState({ displayType: "Menu" });
    }
}
class KillingGameViewerNav extends React.Component {
    render() {
        return (React.createElement("div", { className: "container killing-game-nav h-100 px-0" },
            React.createElement("div", { className: "d-flex h-100 w-100 flex-column" },
                React.createElement("ul", { className: "nav nav-tabs bg-dark", role: "tablist" },
                    React.createElement("li", { className: "nav-item", role: "presentation" },
                        React.createElement("button", { className: "nav-link active", id: "characters-tab", "data-bs-toggle": "tab", "data-bs-target": "#characters", type: "button", role: "tab", "aria-controls": "characters", "aria-selected": "true" }, "Candidates")),
                    React.createElement("li", { className: "nav-item", role: "presentation" },
                        React.createElement("button", { className: "nav-link", id: "map-tab", "data-bs-toggle": "tab", "data-bs-target": "#map", type: "button", role: "tab", "aria-controls": "map", "aria-selected": "false" }, "Map")),
                    React.createElement("li", { className: "nav-item", role: "presentation" },
                        React.createElement("button", { className: "nav-link", id: "rules-tab", "data-bs-toggle": "tab", "data-bs-target": "#rules", type: "button", role: "tab", "aria-controls": "rules", "aria-selected": "false" }, "Rules")),
                    React.createElement("li", { className: "nav-item", role: "presentation" },
                        React.createElement("button", { className: "nav-link", id: "prizes-tab", "data-bs-toggle": "tab", "data-bs-target": "#prizes", type: "button", role: "tab", "aria-controls": "prizes", "aria-selected": "false" }, "Prizes"))),
                React.createElement("div", { className: "tab-content row flex-grow-1 flex-shrink-1 flex-column align-items-stretch overflow-hidden" },
                    React.createElement("div", { className: "tab-pane active h-100 overflow-hidden", id: "characters", role: "tabpanel", "aria-labelledby": "characters-tab" },
                        React.createElement("div", { className: "list-group h-100 overflow-auto" }, this.props.data.characters.sort((a, b) => a.name > b.name && 1 || -1).map((character, index) => React.createElement(CharacterLink, { character: character, key: index, onClick: this.props.displayCharacter })))),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden", id: "map", role: "tabpanel", "aria-labelledby": "map-tab" },
                        React.createElement(LayeredMap, { layers: this.props.data.mapLayers, displayStack: false })),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden", id: "rules", role: "tabpanel", "aria-labelledby": "rules-tab" },
                        React.createElement("div", { className: "bg-dark h-100 overflow-auto p-0" },
                            React.createElement("ol", { className: "list-group list-group-numbered m-0" },
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "All candidates will live within the area they are trapped in. There is no limit as to the length of their stay."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "\"Nighttime\" is from 10 pm to 7 am. Some areas are off-limits at night, so please exercise caution."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "Sleeping anywhere other than the dormitory will be seen as sleeping in class and punished accordingly."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "With minimal restrictions, you are free to explore Ascendant Aspirations Academy at your discretion."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "Violence against the headmaster is strictly prohibited, as is destruction of floating orbs."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "An anointed who kills another candidate will graduate, but only if they can convince the other candidates that they are not the anointed. If the anointed succeeds, the anointed can leave, and all other living candidates will be killed in the anointed's place. If the anointed is proven guilty, the anointed alone will be rightfully executed."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "After three or more people discover a dead body, a \u201Cbody discovery announcement\u201D shall be made to inform everyone of the death."),
                                React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" }, "Additional regulations may be added if necessary.")))),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden", id: "prizes", role: "tabpanel", "aria-labelledby": "prizes-tab" },
                        React.createElement(GiftMachine, { gifts: GIFTS }))))));
    }
}
class KillingGameCharacterPage extends React.Component {
    render() {
        return (React.createElement("div", { className: "container h-100 w-100 overflow-hidden p-0" },
            React.createElement("div", { className: "h-100 w-100 d-flex flex-column align-items-stretch overflow-hidden" },
                React.createElement("div", { className: "row m-0 pt-3" },
                    React.createElement("nav", { "aria-label": "breadcrumb" },
                        React.createElement("ol", { className: "breadcrumb" },
                            React.createElement("li", { className: "breadcrumb-item" },
                                React.createElement("a", { href: "#", onClick: this.props.close }, "Home")),
                            React.createElement("li", { className: "breadcrumb-item active", "aria-current": "page" }, this.props.character.name)))),
                React.createElement("div", { className: "row bg-dark flex-grow-1 m-0 overflow-auto" },
                    React.createElement("div", { className: "col-auto overflow-auto bg-white" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col order-2 order-md-1", "data-bs-target": "#navbar-example3", "data-bs-offset": "0" },
                                React.createElement("h3", { id: "item-1" },
                                    this.props.character.name,
                                    " | ",
                                    React.createElement("i", null, this.props.character.title)),
                                React.createElement("h5", { id: "item-1-1" }, "Description"),
                                React.createElement("p", null, this.props.character.description),
                                React.createElement("h4", { id: "item-3" }, "Interests"),
                                React.createElement("h5", { id: "item-3-1" }, "Likes"),
                                React.createElement("p", null, this.props.character.likes.join(", ")),
                                React.createElement("h5", { id: "item-3-2" }, "Dislikes"),
                                React.createElement("p", null, this.props.character.dislikes.join(", "))),
                            React.createElement("div", { className: "col-auto col-md-3 order-1 order-md-2 py-2" },
                                React.createElement("div", { className: "card" },
                                    React.createElement("img", { className: "card-img-top img-fluid bg-secondary bg-gradient", src: this.props.character.image, alt: this.props.character.name }),
                                    React.createElement("div", { className: "card-body" },
                                        React.createElement("h5", { className: "card-title" }, this.props.character.name),
                                        React.createElement("p", { className: "card-text" },
                                            "Age: ",
                                            this.props.character.relativeAge,
                                            React.createElement("br", null),
                                            "Species: ",
                                            this.props.character.race))))))))));
    }
}
class KillingGameVoteResults extends React.Component {
    render() {
        return (React.createElement("div", { className: "h-100 w-100 overflow-hidden p-0 overflow-auto" },
            React.createElement("div", { className: "row justify-content-md-center py-2" },
                React.createElement("div", { className: "col-auto col-md-3" },
                    React.createElement("div", { className: "card" },
                        React.createElement("img", { className: "card-img-top img-fluid", src: this.props.image }))),
                React.createElement("div", { className: "col-auto col-md-3 d-none d-lg-block" },
                    React.createElement("div", { className: "card" },
                        React.createElement("img", { className: "card-img-top img-fluid", src: this.props.image }))),
                React.createElement("div", { className: "col-auto col-md-3 d-none d-lg-block" },
                    React.createElement("div", { className: "card" },
                        React.createElement("img", { className: "card-img-top img-fluid", src: this.props.image })))),
            React.createElement("div", { className: "row bg-dark text-center text-light" },
                React.createElement("h3", null,
                    this.props.percentage,
                    "%"))));
    }
}
class CharacterLink extends React.Component {
    render() {
        let statusColor = this.props.character.status == "Alive" ? " bg-success" : this.props.character.status == "Dead" ? " bg-danger" : "bg-secondary";
        let genderColor = this.props.character.gender == "Female" ? " text-danger" : "text-primary";
        return (React.createElement("button", { className: "list-group-item list-group-item-action list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0", onClick: (ev) => this.props.onClick(this.props.character) },
            this.props.character.name,
            React.createElement("span", { className: "mx-1 " + genderColor }, this.props.character.gender == "Female" ? "♀" : "♂"),
            React.createElement("span", { className: "badge position-absolute top-50 end-0 translate-middle-y me-1 rounded-pill " + statusColor }, this.props.character.status)));
    }
}
const AscendantAspirationsAcademy = [
    {
        image: "/dnd/img/maps/adventures/killinggame/floor1.png",
        objects: [
            {
                name: "Gribak's Room",
                popoverText: "Gribak's Room",
                position: {
                    x: 658,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Nueleth's Room",
                popoverText: "Nueleth Symbaern's Room",
                position: {
                    x: 682,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Randal's Room",
                popoverText: "Randal Baker's Room",
                position: {
                    x: 707,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Lizette's Character's Room",
                popoverText: "Lizette's Character's Room",
                position: {
                    x: 731,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Empty Room",
                popoverText: "This locked room appears to be uninhabited. Evidently the school simply had one more room than they needed.",
                locked: true,
                position: {
                    x: 755,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Hatharal's Room",
                popoverText: "Hatharal Ward's Room",
                position: {
                    x: 779,
                    y: 118
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Dom's Character's Room",
                popoverText: "Dom's Character's Room",
                position: {
                    x: 658,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Rosewood's Room",
                popoverText: "Rosewood's Room",
                position: {
                    x: 682,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Mark's Character's Room",
                popoverText: "Mark's Character's Room",
                position: {
                    x: 707,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Nora's Room",
                popoverText: "Nora Shaeremae's Room",
                position: {
                    x: 731,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Forest's Room",
                popoverText: "Bush in the Forest's Room",
                position: {
                    x: 755,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Chenna's Room",
                popoverText: "Chenna Honeymaker's Room",
                position: {
                    x: 779,
                    y: 158
                },
                size: {
                    width: 19,
                    height: 35
                }
            },
            {
                name: "Salvini's Room",
                popoverText: "Salvini Devia's Room",
                position: {
                    x: 658,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Chuck's Character's Room",
                popoverText: "Chuck's Character's Room",
                position: {
                    x: 682,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Aym's Room",
                popoverText: "Aym's Room",
                position: {
                    x: 707,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Eliot's Room",
                popoverText: "Eliot Brewer's Room",
                position: {
                    x: 731,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Kendall's Character's Room",
                popoverText: "Kendall's Character's Room",
                position: {
                    x: 755,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Queg's Room",
                popoverText: "Queg's Room",
                position: {
                    x: 779,
                    y: 214
                },
                size: {
                    width: 19,
                    height: 36
                }
            },
            {
                name: "Sindri's Room",
                popoverText: "Sindri's Room",
                position: {
                    x: 819,
                    y: 118
                },
                size: {
                    width: 36,
                    height: 19
                }
            },
            {
                name: "Yrthraethra's Room",
                popoverText: "Yrthraethra Payne's Room",
                position: {
                    x: 819,
                    y: 142
                },
                size: {
                    width: 36,
                    height: 19
                }
            },
            {
                name: "Diggory's Room",
                popoverText: "Diggory Ward's Room",
                position: {
                    x: 819,
                    y: 166
                },
                size: {
                    width: 36,
                    height: 19
                }
            },
            {
                name: "Gaaki's Room",
                popoverText: "Gaaki's Room",
                position: {
                    x: 819,
                    y: 190
                },
                size: {
                    width: 36,
                    height: 19
                }
            },
            {
                name: "Incinerator",
                popoverText: "Incinerator",
                position: {
                    x: 674,
                    y: 69
                },
                size: {
                    width: 92,
                    height: 27
                }
            },
            {
                name: "Cafeteria",
                popoverText: "Cafeteria",
                position: {
                    x: 521,
                    y: 239
                },
                size: {
                    width: 59,
                    height: 59
                }
            },
            {
                name: "Kitchen",
                popoverText: "Kitchen",
                position: {
                    x: 585,
                    y: 239
                },
                size: {
                    width: 20,
                    height: 27
                }
            },
            {
                name: "Storage",
                popoverText: "Storage",
                position: {
                    x: 610,
                    y: 247
                },
                size: {
                    width: 27,
                    height: 51
                }
            },
            {
                name: "Baths",
                popoverText: "Baths",
                position: {
                    x: 529,
                    y: 85
                },
                size: {
                    width: 43,
                    height: 60
                }
            },
            {
                name: "Changing Room",
                popoverText: "Changing Room",
                position: {
                    x: 577,
                    y: 85
                },
                size: {
                    width: 28,
                    height: 60
                }
            },
            {
                name: "Sauna",
                popoverText: "Sauna",
                position: {
                    x: 547,
                    y: 57
                },
                size: {
                    width: 25,
                    height: 23
                }
            },
            {
                name: "Laundry",
                popoverText: "Laundry",
                position: {
                    x: 618,
                    y: 134
                },
                size: {
                    width: 19,
                    height: 27
                }
            },
        ]
    },
    {
        image: "/dnd/img/maps/adventures/killinggame/floor2.png",
        objects: []
    },
    {
        image: "/dnd/img/maps/adventures/killinggame/floor3.png",
        objects: []
    },
    {
        image: "/dnd/img/maps/adventures/killinggame/floor4.png",
        objects: []
    },
    {
        image: "/dnd/img/maps/adventures/killinggame/floor5.png",
        objects: []
    }
];
const KILLINGGAMEDATA = {
    characters: [
        {
            id: "hatharal",
            name: "Hatharal Ward",
            title: "Ultimate Carpenter",
            image: "/dnd/img/characters/npc/killinggame/hatharal-ward.png",
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
            description: "A young adult halfelf, who wears rings, which isn’t cool, but it's cool that they don’t care if they’re cool and comes from an engineer's guild. He is frightened and earthy, and has found work as a mercenary.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.1,
            killingInstinct: 0.2,
        },
        {
            id: "sindri",
            name: "Sindri \"Thunderbonk\" Raulnor",
            title: "Ultimate Royal Taster",
            image: "/dnd/img/characters/npc/killinggame/sindri.png",
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
            description: "An adult gnome, who has bad hygiene and comes from a strict, religious temple. He is submissive and rigid, and has found work as a royal taster.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 1.0,
            killingInstinct: 0.5,
        },
        {
            id: "gribak",
            name: "Gribak",
            title: "Ultimate Animal Tamer",
            image: "/dnd/img/characters/npc/killinggame/gribak.png",
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
            description: "A young adult goblin, who is not very good at sports and comes from a small village of barbarians. He is instructive and dramatic, and has found work as a knight.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.7,
            killingInstinct: 0.2,
        },
        {
            id: "diggory",
            name: "Diggory Ward",
            title: "Ultimate Host",
            image: "/dnd/img/characters/npc/killinggame/diggory-ward.png",
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
            dislikes: [],
            likes: [],
            desperation: 0.3,
            killingInstinct: 0.3,
        },
        {
            id: "randal",
            name: "Randal Baker",
            title: "Ultimate Fisher",
            image: "/dnd/img/characters/npc/killinggame/randal.png",
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
            description: "An adult human, who is superstitious and comes from a small island. He is solemn and disloyal, and has found work as a smuggler.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.4,
            killingInstinct: 1.0,
        },
        {
            id: "eliot",
            name: "Eliot Brewer",
            title: "Ultimate Kidnapper",
            image: "/dnd/img/characters/npc/killinggame/eliot.png",
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
            description: "A young adult genasi, who has connections to underworld crime syndicates and comes from a powerful trading city. He is obnoxious and curious, and has found work as a monk.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.4,
            killingInstinct: 0.2,
        },
        {
            id: "salvini",
            name: "Salvini Devia",
            title: "Ultimate Entrepreneur",
            image: "/dnd/img/characters/npc/killinggame/salvini.png",
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
            description: "A young adult ratfolk, who has a burning hatred for pirates and comes from a laid back beach town. He is loud and philosophical, and has found work as a farmhand.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.9,
            killingInstinct: 0.4,
        },
        {
            id: "rosewood",
            name: "Rosewood",
            title: "Ultimate Botanist",
            image: "/dnd/img/characters/npc/killinggame/rosewood.png",
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
            description: "An adult firbolg, who is scared of airship travel and comes from a company of mercenaries and sellswords. He is fatalistic and adventurous, and has found work as a druid.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.5,
            killingInstinct: 0.7,
        },
        {
            id: "yrthraethra",
            name: "Yrthraethra Payne",
            title: "Ultimate Armorer",
            image: "/dnd/img/characters/npc/killinggame/yrthraethra-payne.png",
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
            description: "A young adult halfelf, who is a total gear-head and comes from a city no one else has ever heard of. She is humble and harsh, and has found work as an innkeeper.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.1,
            killingInstinct: 0.9,
        },
        {
            id: "chenna",
            name: "Chenna Honeymaker",
            title: "Ultimate Bartender",
            image: "/dnd/img/characters/npc/killinggame/chenna.png",
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
            description: "An adult halfling, who hates wearing armor face masks and comes from a large military outpost. She is risk-taking and agreeable, and has found work as a courtesan.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 1.0,
            killingInstinct: 0.6,
        },
        {
            id: "nora",
            name: "Nora Shaeremae",
            title: "Ultimate Ventriloquist",
            image: "/dnd/img/characters/npc/killinggame/nora.png",
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
            dislikes: [],
            likes: [],
            desperation: 0.8,
            killingInstinct: 0.9,
        },
        {
            id: "nueleth",
            name: "Nueleth Symbaern",
            title: "Ultimate Librarian",
            image: "/dnd/img/characters/npc/killinggame/nueleth.png",
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
            description: "A young adult elf, who has a split personality who is her complete opposite, changes personalities when exposed to a specific stimuli, and comes from a peaceful coastal town. She is restless and careless, and has found work as a philosopher.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.9,
            killingInstinct: 0.3,
        },
        {
            id: "aym",
            name: "Aym",
            title: "Ultimate Painter",
            image: "/dnd/img/characters/npc/killinggame/aym.png",
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
            description: "An adult tiefling, who is completely mute and comes from the forests of the Verdant Isle. She is unpredictable and argumentative, and has found work as a sailor.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.3,
            killingInstinct: 0.3,
        },
        {
            id: "gaaki",
            name: "Gaaki Clark",
            title: "Ultimate Strongwoman",
            image: "/dnd/img/characters/npc/killinggame/gaaki-clark.png",
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
            dislikes: [],
            likes: [],
            desperation: 0.5,
            killingInstinct: 0.1,
        },
        {
            id: "forest",
            name: "Bush in the Forest (Forest)",
            title: "Ultimate Acrobat",
            image: "/dnd/img/characters/npc/killinggame/forest.png",
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
            description: "A young adult tabaxi, who speaks to people as though she's being hunted and comes from the remains of a sunken city. She is courageous and self-effacing, and has found work as an airship pirate.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 0.9,
            killingInstinct: 0.8,
        },
        {
            id: "queg",
            name: "Queg",
            title: "Ultimate Carnival Worker",
            image: "/dnd/img/characters/npc/killinggame/queg.png",
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
            description: "A young adult tortle, who gives the best gifts and comes from a disease ridden city. She is irresponsible and sweet, and has found work as a smuggler.",
            status: "Alive",
            dislikes: [],
            likes: [],
            desperation: 1.0,
            killingInstinct: 0.7,
        }
    ],
    mapLayers: AscendantAspirationsAcademy,
    misc: [
        {
            title: "Temple of the Forest",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        }
    ]
};
ReactDOM.render(React.createElement(KillingGameViewer, { data: KILLINGGAMEDATA }), document.getElementById("killing-game-panel"));
//# sourceMappingURL=killing-game.js.map