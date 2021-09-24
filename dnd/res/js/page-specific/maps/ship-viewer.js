"use strict";
function isOfTypeTravelDirection(keyInput) {
    return ["down", "left", "right", "up"].includes(keyInput);
}
const GALLEON = {
    name: "Galleon",
    width: 2160,
    height: 564,
    decks: [
        {
            image: "/dnd/img/maps/ships/galleon_deck1.png",
            locations: [
                {
                    name: "Lower Deck",
                    description: [
                        "All of the masts except the bonaventure mast have their steps here, and the pipe leading up to the bilge pumps can also be found runs through the floor here to reach the bilge. Other than that, this area functions in the same manner as the orlop deck, with one exception. Given that it is hard to keep this deck dry, it's not likely that people are quartered here."
                    ],
                    left: "67%",
                    top: "50%"
                }
            ],
            name: "Lower Deck",
        },
        {
            image: "/dnd/img/maps/ships/galleon_deck2.png",
            locations: [
                {
                    name: "Orlop Deck",
                    description: [
                        "This deck, along with the one below it, provide most of the space for cargo and supplies aboard the ship. As such, both can be divided as necessary by erecting temporary bulkheads. For example, one section might hold the ship's water barrels, while another is filled with spare timber, rope and canvas. There could also be a sealed rooms for holding treasure or weapons. Finally, extra space for passengers, especially soldiers, can be set up here."
                    ],
                    left: "67%",
                    top: "50%"
                }
            ],
            name: "Orlop Deck",
        },
        {
            image: "/dnd/img/maps/ships/galleon_deck3.png",
            locations: [
                {
                    name: "Gun Deck",
                    description: [
                        "Underneath the main deck is this level. It is most often filled with cannon, with gunports cut in the sides. At least six cannon can fit on a side, with perhaps a couple more facing aft as chase guns. Depending on the needs of the crew, their could be some hammocks strung up in the middle of the deck to provided more sleeping space."
                    ],
                    left: "67%",
                    top: "50%"
                },
                {
                    name: "Bilge Pump",
                    description: [
                        "In the middle of the gun deck stands this structure, one that is both loved and hated by sailors. While it can often mean the difference between surviving and returning to life on land, or finding one's death in the cold embrace of the sea, it can also make for brutal labor when the hull is badly damaged. One pipe leads down from here to the lower deck, while another juts out through the ship's starboard side."
                    ],
                    left: "41%",
                    top: "50%"
                }
            ],
            name: "Gun Deck",
        },
        {
            image: "/dnd/img/maps/ships/galleon_deck4.png",
            locations: [
                {
                    name: "Main Deck",
                    description: [
                        "This broad area is flanked forward by the forecastle, and aft by the quarterdeck. The mainmast juts upward from it, while the cargo hatch and stairways provide access to lower levels. Some vessels carry six cannon on this deck, three to each side."
                    ],
                    left: "44%",
                    top: "50%"
                },
                {
                    name: "Passenger Cabins",
                    description: [
                        "Six small cabins in this area can provide sleeping space for a variety of passenger, or even for lesser officers aboard a ship."
                    ],
                    left: "33%",
                    top: "50%"
                },
                {
                    name: "Great Cabin (Captain)",
                    description: [
                        "This large cabin provides space for the captain, along with room enough for hosting meals and meetings. A typical arrangement of furnishings could include a bed, writing desk and wardrobe, along with a table and chairs."
                    ],
                    left: "11%",
                    top: "68%"
                },
                {
                    name: "Crew Quarters",
                    description: [
                        "Despite this area's relatively small size, it can easily hold a dozen hammocks or more. Given that crew members tend to share this sleeping space when they are not on duty, this allows a large number of sailors to be quartered here."
                    ],
                    left: "82%",
                    top: "50%"
                },
                {
                    name: "Beak",
                    description: [
                        "This open area in front of the forecastle is used for little more than storage."
                    ],
                    left: "88%",
                    top: "58%"
                }
            ],
            name: "Main Deck",
        },
        {
            image: "/dnd/img/maps/ships/galleon_deck5.png",
            locations: [
                {
                    name: "Forecastle",
                    description: [
                        "The raised platform here is common on merchant and military vessels, but pirates often remove it to provide more open space for combat. As a result, members of a pirate crew are forced to sleep on the open deck or to string up a hammock somewhere below decks. The foremast protrudes through here."
                    ],
                    left: "74%",
                    top: "50%"
                },
                {
                    name: "Quarterdeck",
                    description: [
                        "A short set of stairs leads from the main deck up to here, and another leads from here up to the poop deck. The mizzenmast rises up through this area."
                    ],
                    left: "35%",
                    top: "50%"
                },
                {
                    name: "Sailing Master's Cabin",
                    description: [
                        "The person in charge of plotting the ship's course is quartered here, with a view better than that of anyone other than the lookouts in the rigging overhead. This cabin is outfitted much like the captain's cabin, albeit without the table and chairs for hosting."
                    ],
                    left: "10%",
                    top: "62%"
                },
            ],
            name: "Upper Deck",
        },
        {
            image: "/dnd/img/maps/ships/galleon_deck6.png",
            locations: [
                {
                    name: "Poop Deck",
                    description: [
                        "At the very aft of the ship is this raised deck, from which the bonaventure mast rises. In the back of this area is the transom, on which the ship's name is usually painted; one or more bright lanterns are often mounted here, too, to provide illumination for crew members working during the night."
                    ],
                    left: "8%",
                    top: "50%"
                },
            ],
            name: "Poop Deck",
        },
    ]
};
class ShipViewerMenu extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    render() {
        return (React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("button", { className: "btn btn-primary", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#brochureOffcanvas", "aria-controls": "brochureOffcanvas" }, "Open Brochure"),
                React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#shipViewerMenuToggler", "aria-controls": "shipViewerMenuToggler", "aria-expanded": "false", "aria-label": "Toggle menu" },
                    React.createElement("span", { className: "navbar-toggler-icon" })),
                React.createElement("div", { className: "collapse navbar-collapse", id: "shipViewerMenuToggler" },
                    React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link active", "aria-current": "page", href: "#" }, "Home")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link", href: "#" }, "Link")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link disabled", href: "#", tabIndex: -1, "aria-disabled": "true" }, "Disabled"))),
                    React.createElement("form", { className: "d-flex" },
                        React.createElement("input", { className: "form-control me-2", type: "search", placeholder: "Search", "aria-label": "Search" }),
                        React.createElement("button", { className: "btn btn-outline-success", type: "submit" }, "Search"))))));
    }
}
class ShipViewerPage extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    constructor(props) {
        super(props);
        this.state = {
            currentShip: GALLEON,
        };
    }
    render() {
        return (React.createElement("div", { className: "travel-brochure" },
            React.createElement(ShipViewerMenu, { data: this.props.data }),
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
                React.createElement(DeckPlanViewer, { deckPlan: this.state.currentShip }))));
    }
}
const SHIPDATA = {
    deckPlans: [],
    ships: [],
};
ReactDOM.render(React.createElement(ShipViewerPage, { data: SHIPDATA }), document.getElementById("react-container"));
//# sourceMappingURL=ship-viewer.js.map