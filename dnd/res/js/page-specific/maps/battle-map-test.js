"use strict";
const MACAW = {
    "name": "The Macaw",
    "width": 240,
    "height": 680,
    "gridSize": 40,
    "decks": [
        {
            "image": "/dnd/img/maps/ships/sloop_deck1.png",
            "locations": [
                {
                    "name": "Cargo Hold",
                    "description": [
                        "This space could contain just about anything, provided it can fit in through the cargo hatch."
                    ],
                    "left": "50%",
                    "top": "45%"
                },
                {
                    "name": "Crew Quarters",
                    "description": [
                        "Ten hammocks are arrayed in this area, in two tiers. The crew members sleep here, usually in shifts. In addition there can usually be found a number of sea chests, one per crewman, arranged beneath the hammocks."
                    ],
                    "left": "50%",
                    "top": "80%"
                }
            ],
            "name": "Lower Deck"
        },
        {
            "crew": [
                {
                    "name": "Flog",
                    "full": "/dnd/img/maps/icons/generic/goblin_f.png",
                    "icon": "/dnd/img/maps/icons/generic/goblin_f_icon.png",
                    "left": 2,
                    "top": 3
                }
            ],
            "image": "/dnd/img/maps/ships/sloop_deck2.png",
            "locations": [
                {
                    "name": "Main Deck",
                    "description": [
                        "The main deck is a broad, open space, although usually it is filled at least in part with ropes, the ship's anchor, a lifeboat and that sort of thing. In between the two masts is the hatch providing access to the cargo hold below."
                    ],
                    "left": "50%",
                    "top": "32%"
                },
                {
                    "name": "Private Cabin",
                    "description": [
                        "For important passengers or, at least, those who can pay for it, this cabin boasts a bed and perhaps a table or a storage trunk. It can also be used for a first mate, if appropriate."
                    ],
                    "left": "30%",
                    "top": "78%"
                },
                {
                    "name": "Private Cabin",
                    "description": [
                        "This cabin is laid out in the same manner as the other one, above."
                    ],
                    "left": "70%",
                    "top": "78%"
                },
                {
                    "name": "Captain's Cabin",
                    "description": [
                        "By far the most elaborate quarters on the vessel is this small room. It has a table with four chairs for holding meetings, along with a bed, a wardrobe, a chest and a barrel of liquor."
                    ],
                    "left": "50%",
                    "top": "86%"
                }
            ],
            "name": "Main Deck"
        },
        {
            "crew": [
                {
                    "name": "Cade",
                    "full": "/dnd/img/maps/icons/generic/halfling_m.png",
                    "icon": "/dnd/img/maps/icons/generic/halfling_m_icon.png",
                    "left": 2,
                    "top": 5
                }
            ],
            "image": "/dnd/img/maps/ships/sloop_deck3.png",
            "locations": [
                {
                    "name": "Sterncastle",
                    "description": [
                        "The ship's wheel is located on this raised platform at the aft of the vessel; it is generally from here that the captain issues orders while sailing."
                    ],
                    "left": "50%",
                    "top": "80%"
                }
            ],
            "name": "Sterncastle"
        }
    ]
};
class BattleMapMenu extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    render() {
        return (React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("button", { className: "btn btn-primary", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#brochureOffcanvas", "aria-controls": "brochureOffcanvas" }, "Open Brochure"),
                React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#BattleMapMenuToggler", "aria-controls": "BattleMapMenuToggler", "aria-expanded": "false", "aria-label": "Toggle menu" },
                    React.createElement("span", { className: "navbar-toggler-icon" })),
                React.createElement("div", { className: "collapse navbar-collapse", id: "BattleMapMenuToggler" },
                    React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("select", { className: "form-select" }, this.props.shipIndex.map((ship, index) => React.createElement("option", { value: ship.name, key: index }, ship.name)))))))));
    }
}
class BattleMapTestPage extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    constructor(props) {
        super(props);
        // componentDidMount()
        // {
        // 	$.ajax({
        // 		url: "/dnd/res/data/map/tokens.json"
        // 	}).then((tokens: IMapToken[]) =>
        // 	{
        // 		this.setState({ mapTokens: tokens });
        // 	});
        // }
        this.loadShip = (ship) => {
            window.airshipGrid = ship.gridSize;
            this.setState({ currentShip: ship });
        };
        window.airshipGrid = 80;
        this.state = {
            currentShip: MACAW,
            mapTokens: [],
            shipIndex: [
                {
                    file: "/dnd/res/data/map/ships/deck-plans/galleon.json",
                    name: "Galleon"
                },
                {
                    file: "/dnd/res/data/map/ships/deck-plans/sloop.json",
                    name: "Sloop"
                },
                {
                    file: "/dnd/res/data/map/ships/named-ships/macaw.json",
                    name: "The Macaw"
                }
            ],
        };
    }
    render() {
        return (React.createElement("div", { className: "travel-brochure" },
            React.createElement(BattleMapMenu, { shipIndex: this.state.shipIndex }),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "offcanvas offcanvas-start", tabIndex: -1, id: "brochureOffcanvas", "aria-labelledby": "brochureLabel" },
                    React.createElement("div", { className: "offcanvas-header" },
                        React.createElement("h5", { className: "offcanvas-title", id: "brochureLabel" }, "Test"),
                        React.createElement("button", { type: "button", className: "btn-close text-reset", "data-bs-dismiss": "offcanvas", "aria-label": "Close" })),
                    React.createElement("div", { className: "offcanvas-body" },
                        React.createElement(Brochure, { title: this.state.currentShip.name }, this.state.currentShip.decks.map((deck, index) => React.createElement("div", { key: index },
                            React.createElement("h2", null, deck.name),
                            React.createElement("ol", null, deck.locations.map((loc, index) => React.createElement("li", { key: index },
                                React.createElement("b", null, loc.name),
                                loc.description.map((paragraph, index) => React.createElement("p", { key: index }, paragraph)))))))))),
                React.createElement(BattleMap, { DeckPlan: this.state.currentShip }))));
    }
}
const SHIPDATA2 = {
    deckPlans: [],
    ships: [],
};
ReactDOM.render(React.createElement(BattleMapTestPage, { data: SHIPDATA2 }), document.getElementById("react-container"));
//# sourceMappingURL=battle-map-test.js.map