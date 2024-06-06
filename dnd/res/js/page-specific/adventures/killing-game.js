"use strict";
function isOfTypeTab(keyInput) {
    return ["character", "evidence", "map", "rules", "shop", "trial"].includes(keyInput);
}
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
            selectedDiorama: selectedDiorama,
            showStatic: false
        };
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100" },
            this.state.showStatic && React.createElement("div", { className: "static" }),
            this.state.displayType == "Menu" && React.createElement(KillingGameViewerNav, { data: this.props.data, displayCharacter: this.viewCharacter, showEvidenceTab: false, showTrialTab: false }),
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
    constructor(props) {
        super(props);
        this.changeTab = this.changeTab.bind(this);
        let tab = GetURLParameter("tab")?.toLowerCase();
        this.state = {
            activeTab: (tab && isOfTypeTab(tab)) ? tab : "characters"
        };
    }
    render() {
        return (React.createElement("div", { className: "container killing-game-nav h-100 px-0" },
            React.createElement("div", { className: "d-flex h-100 w-100 flex-column" },
                React.createElement("ul", { className: "nav nav-tabs bg-dark", role: "tablist" },
                    React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "Candidates", id: "characters" }),
                    React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "Map", id: "map" }),
                    React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "Rules", id: "rules" }),
                    React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "Shop", id: "shop" }),
                    this.props.showTrialTab && React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "Trial", id: "trial" }),
                    this.props.showEvidenceTab && React.createElement(KillingGameViewerNavTab, { activeTab: this.state.activeTab, changeTab: this.changeTab, displayName: "File", id: "evidence" })),
                React.createElement("div", { className: "tab-content row flex-grow-1 flex-shrink-1 flex-column align-items-stretch overflow-hidden bg-dark" },
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "characters" ? " active" : ""), id: "characters", role: "tabpanel", "aria-labelledby": "characters-tab" },
                        React.createElement(KillingGameCharacterIndex, { characters: this.props.data.characters, displayCharacter: this.props.displayCharacter })),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "map" ? " active" : ""), id: "map", role: "tabpanel", "aria-labelledby": "map-tab" },
                        React.createElement(LayeredMap, { layers: this.props.data.mapLayers, displayStack: false })),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "rules" ? " active" : ""), id: "rules", role: "tabpanel", "aria-labelledby": "rules-tab" },
                        React.createElement(KillingGameRegulationViewer, { regulations: this.props.data.regulations })),
                    React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "shop" ? " active" : ""), id: "shop", role: "tabpanel", "aria-labelledby": "shop-tab" },
                        React.createElement(GiftMachine, { gifts: GIFTS })),
                    this.props.showTrialTab && React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "trial" ? " active" : ""), id: "trial", role: "tabpanel", "aria-labelledby": "trial-tab" },
                        React.createElement(KillingGameVoteResults, { image: KILLINGGAMEDATA.characters[0].image, percentage: 85 })),
                    this.props.showEvidenceTab && React.createElement("div", { className: "tab-pane h-100 overflow-hidden" + (this.state.activeTab == "evidence" ? " active" : ""), id: "file", role: "tabpanel", "aria-labelledby": "file-tab" })))));
    }
    changeTab(tab) {
        this.setState({ activeTab: tab });
    }
}
const KillingGameFriendshipTitles = [
    "Strangers",
    "Acquaintances",
    "Casual Friends",
    "Friends",
    "Close Friends",
    "Very Close Friends",
    "BFFs"
];
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
                    React.createElement("div", { className: "col-auto overflow-auto bg-dark text-light" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col order-2 order-md-1", "data-bs-target": "#navbar-example3", "data-bs-offset": "0" },
                                React.createElement("h3", { id: "item-1", className: "d-none d-lg-block" },
                                    this.props.character.name,
                                    " | ",
                                    React.createElement("i", null, this.props.character.title)),
                                React.createElement("h5", { id: "item-1-1" }, "Description"),
                                React.createElement("p", null, this.props.character.description),
                                React.createElement("h4", { id: "item-3" }, "Interests"),
                                React.createElement("h5", { id: "item-3-1" }, "Likes"),
                                React.createElement("p", null, (this.props.friendshipLevel > 1 ? this.props.character.likes : this.props.character.likes.concat(this.props.character.loves)).join(", ")),
                                this.props.friendshipLevel > 1 && React.createElement("div", null,
                                    React.createElement("h5", { id: "item-3-2" }, "Loves"),
                                    React.createElement("p", null, this.props.character.loves.join(", "))),
                                React.createElement("h5", { id: "item-3-3" }, "Dislikes"),
                                React.createElement("p", null, this.props.character.dislikes.join(", "))),
                            React.createElement("div", { className: "col-auto col-md-3 order-1 order-md-2 py-2" },
                                React.createElement("div", { className: "card bg-secondary" },
                                    React.createElement("img", { className: "card-img-top img-fluid bg-secondary bg-gradient border border-1 border-dark rounded", src: this.props.character.image, alt: this.props.character.name }),
                                    React.createElement("div", { className: "card-body" },
                                        React.createElement("h5", { className: "card-title" }, this.props.character.name),
                                        React.createElement("p", { className: "card-text" },
                                            React.createElement("h6", null,
                                                React.createElement("i", null, this.props.character.title)),
                                            "Age: ",
                                            this.props.character.relativeAge,
                                            React.createElement("br", null),
                                            "Gender: ",
                                            this.props.character.gender,
                                            React.createElement("br", null),
                                            "Species: ",
                                            this.props.character.race))))))))));
    }
}
KillingGameCharacterPage.defaultProps = {
    friendshipLevel: Sc.LocalStorage.isGM ? 6 : 1
};
class KillingGameCharacterIndex extends React.Component {
    render() {
        return (React.createElement("div", { className: "list-group h-100 overflow-auto" }, this.props.characters.sort((a, b) => a.status > b.status && 1 || -1).sort((a, b) => a.name > b.name && a.status == b.status && 1 || a.status == b.status && -1 || 0).map((character, index) => React.createElement(CharacterLink, { character: character, key: index, onClick: this.props.displayCharacter }))));
    }
}
class KillingGameRegulationViewer extends React.Component {
    render() {
        return (React.createElement("div", { className: "bg-dark h-100 overflow-auto p-0" },
            React.createElement("ol", { className: "list-group list-group-numbered m-0" }, this.props.regulations.map((rule, index) => React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0", dangerouslySetInnerHTML: { __html: rule }, key: index })))));
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
class KillingGameViewerNavTab extends React.Component {
    render() {
        return (React.createElement("li", { className: "nav-item", role: "presentation" },
            React.createElement("button", { className: "nav-link" + (this.props.activeTab == this.props.id ? " active" : ""), id: this.props.id + "-tab", "data-bs-toggle": "tab", "data-bs-target": "#" + this.props.id, type: "button", role: "tab", "aria-controls": this.props.id, "aria-selected": "false", onClick: () => this.props.changeTab(this.props.id) }, this.props.displayName)));
    }
}
class CharacterLink extends React.Component {
    render() {
        let statusColor = this.props.character.status == "Alive" ? " bg-success" : this.props.character.status == "Dead" ? "bg-danger" : "bg-secondary";
        let genderColor = this.props.character.gender == "Female" ? " text-danger" : "text-primary";
        return (React.createElement("button", { className: "list-group-item list-group-item-action list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0", onClick: (ev) => this.props.onClick(this.props.character) },
            this.props.character.name,
            React.createElement("span", { className: "mx-1 " + genderColor, style: { fontFamily: "Arial, Helvatica, sans-serif" } }, this.props.character.gender == "Female" ? "♀" : "♂"),
            React.createElement("span", { className: "badge position-absolute top-50 end-0 translate-middle-y me-1 rounded-pill " + statusColor }, this.props.character.status)));
    }
}
const KILLINGGAMEDATA = {
    characters: KILLINGGAMECHARACTERS,
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
    ],
    regulations: [
        "All candidates will remain within <i>Ascendant Aspirations Academy</i> until such time as they are released by the headmaster.",
        "\"Nighttime\" is from 10 pm to 7 am. Some areas are off-limits at night, so please exercise caution.",
        "Sleeping anywhere other than the inn will be seen as sleeping in class and punished accordingly.",
        "With minimal restrictions, you are free to explore <i>Ascendant Aspirations Academy</i> at your discretion.",
        "Violence against the headmaster is strictly prohibited, as is destruction of floating orbs.",
        "An anointed who kills another candidate will graduate, but only if they can convince the other candidates that they are not the anointed. If the anointed succeeds, the anointed can leave, and all other living candidates will be killed in the anointed's place. If the anointed is proven guilty, the anointed alone will be rightfully executed.",
        "Candidates shall not remove training weapons from the <i>Combat Training Area</i>.",
        "Candidates shall not remove bows or crossbows from the <i>Archery Range</i>.",
        "After three or more people discover a dead body, a “body discovery announcement” shall be made to inform everyone of the death.",
        // "Once a murder takes place, a class trial will begin shortly thereafter. Participation is mandatory for all surviving candidates.",
        // "If the guilty party is exposed during the class trial, they alone will be executed.",
        // "If the guilty party is not exposed, they alone will graduate, and all remaining candidates will be executed.",
        // "Lending your e-Handbook to another candidate is strictly prohibited.",
        "Each candidate may only kill a maximum of two people during any single \"Killing Game.\"",
        // "Attempting to break into locked rooms is strictly prohibited.",
        "Additional regulations may be added if necessary."
    ]
};
ReactDOM.render(React.createElement(KillingGameViewer, { data: KILLINGGAMEDATA }), document.getElementById("killing-game-panel"));
//# sourceMappingURL=killing-game.js.map