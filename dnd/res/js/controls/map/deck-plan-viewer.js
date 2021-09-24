"use strict";
class DeckPlanViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDeck: props.deckPlan.decks.length,
            displayLocations: false,
            displayMenu: false,
        };
    }
    render() {
        return (React.createElement("div", { id: "map-body", className: "map-body", style: { overflow: 'hidden', height: '100%', width: "100%" } },
            React.createElement("div", { className: "map-controls", style: { zIndex: 2, paddingLeft: '80px' } },
                "- ",
                React.createElement("input", { type: "range", min: 10, max: 200, defaultValue: 50, className: "slider", id: "map-zoom" }),
                " +",
                React.createElement("input", { type: "number", name: "previous-zoom", id: "previous-zoom", defaultValue: "0.50", style: { display: 'none' } })),
            this.props.displayWaves && React.createElement("div", { className: "waves" }, "\u00A0"),
            this.props.displayClouds && React.createElement("div", { className: "clouds" }, "\u00A0"),
            React.createElement("div", { id: "map-container", className: "map-container map deck-plan", style: {
                    width: (this.props.deckPlan.width + 'px'),
                    height: (this.props.deckPlan.height + 'px'),
                    textAlign: 'center',
                    transformOrigin: 'center center',
                    imageRendering: 'pixelated'
                } },
                !this.state.displayMenu &&
                    React.createElement("button", { className: "btn btn-light btn-lg control-toggle-button fs-2", onClick: () => { this.setState({ displayMenu: true }); } }, "Menu"),
                this.state.displayMenu &&
                    React.createElement("div", { className: "control-bar text-light fs-2" },
                        React.createElement("label", { htmlFor: "current-deck", className: "form-label" }, "Current Deck:"),
                        React.createElement("div", { className: "input-group mb-3 fs-2" },
                            React.createElement("input", { type: "number", className: "form-control fs-2", id: "current-deck", step: 1, min: 1, max: this.props.deckPlan.decks.length, style: { minWidth: "30px", width: "10%", flex: "0 0 auto", textAlign: "right" }, value: this.state.currentDeck, onChange: (e) => {
                                    this.setState({ currentDeck: e.target.valueAsNumber });
                                } }),
                            React.createElement("span", { className: "input-group-text fs-2" },
                                "/",
                                this.props.deckPlan.decks.length,
                                " - ",
                                this.props.deckPlan.decks[this.state.currentDeck - 1].name)),
                        React.createElement("div", { className: "form-check form-switch" },
                            React.createElement("input", { className: "form-check-input", type: "checkbox", id: "flexSwitchCheckDefault", checked: this.state.displayLocations, onChange: (e) => {
                                    this.setState({ displayLocations: e.target.checked });
                                } }),
                            React.createElement("label", { className: "form-check-label text-light", htmlFor: "flexSwitchCheckDefault" }, "Display Notable Locations")),
                        React.createElement("button", { className: "btn btn-danger btn-lg close-button fs-2", onClick: () => { this.setState({ displayMenu: false }); } }, "X")),
                this.props.displayGrid &&
                    React.createElement("div", { className: "grid" }, "\u00A0"),
                React.createElement("div", { className: "map-object-layers", id: "Decks", style: { width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px' } }, this.props.deckPlan.decks.map((deck, index) => (index < this.state.currentDeck) && React.createElement(Deck, { displayLocations: this.state.displayLocations, object: deck, key: index }))))));
    }
}
DeckPlanViewer.defaultProps = {
    displayClouds: true,
    displayGrid: false,
    displayWaves: true,
};
class Deck extends React.Component {
    render() {
        return (React.createElement("div", { id: this.props.object.name, style: { backgroundImage: ('url(' + this.props.object.image + ')') } }, this.props.displayLocations && this.props.object.locations.map((loc, index) => React.createElement(DeckLocation, { object: loc, key: index }))));
    }
}
Deck.defaultProps = {
    displayLocations: true,
};
class DeckLocation extends React.Component {
    render() {
        return (React.createElement("a", { href: "#", className: "smith city deck-location", style: { top: this.props.object.top, left: this.props.object.left } },
            "I",
            React.createElement("span", { className: "city-preview" },
                React.createElement("h1", null, this.props.object.name),
                this.props.object.description.map((paragraph, index) => React.createElement("p", { key: index }, paragraph)))));
    }
}
//# sourceMappingURL=deck-plan-viewer.js.map