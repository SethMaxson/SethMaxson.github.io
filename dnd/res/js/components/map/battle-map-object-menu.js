"use strict";
class BattleMapObjectMenu extends React.Component {
    render() {
        return (React.createElement("div", { className: "control-bar text-light fs-2" },
            React.createElement("label", { htmlFor: "current-deck", className: "form-label" }, "Current Deck:"),
            React.createElement("div", { className: "input-group mb-3 fs-2" },
                React.createElement("input", { type: "number", className: "form-control fs-2", id: "current-deck", step: 1, min: 1, max: this.props.FloorPlan.decks.length, style: { minWidth: "30px", width: "10%", flex: "0 0 auto", textAlign: "right" }, value: this.props.CurrentLayer, onChange: (e) => {
                        this.props.SetCurrentLayer(e.target.valueAsNumber);
                    } }),
                React.createElement("span", { className: "input-group-text fs-2" },
                    "/",
                    this.props.FloorPlan.decks.length,
                    " - ",
                    this.props.FloorPlan.decks[this.props.CurrentLayer - 1].name)),
            React.createElement("div", { className: "form-check form-switch" },
                React.createElement("input", { className: "form-check-input", type: "checkbox", id: "flexSwitchCheckDefault", checked: this.props.DisplayLocations, onChange: (e) => {
                        this.props.SetDisplayNotableLocations(e.target.checked);
                    } }),
                React.createElement("label", { className: "form-check-label text-light", htmlFor: "flexSwitchCheckDefault" }, "Display Notable Locations")),
            React.createElement("button", { className: "btn btn-danger btn-lg close-button fs-2", onClick: this.props.CloseMenu }, "X")));
    }
}
//# sourceMappingURL=battle-map-object-menu.js.map