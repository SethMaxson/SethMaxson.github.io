"use strict";
class RegionCensusViewer extends ModalWindow {
    constructor(container) {
        super(container);
    }
    close() {
        this.reactRef?.hide();
        this.element.hide();
    }
    displayCity(city) {
        let me = this;
        super.mountReact(React.createElement(CityBlurbDeprecated, { JsonObject: city, ref: (component) => { me.reactRef = component; } }));
        super.open();
    }
}
class RegionCensusContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayRegion = this.displayRegion.bind(this);
        this.home = this.home.bind(this);
        this.state = {
            currentRegion: undefined
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { className: "btn btn-primary mb-3", onClick: this.home }, "Home"),
            this.state.currentRegion && React.createElement(RegionCensus, { JsonObject: this.state.currentRegion }),
            React.createElement(RegionCensusNavigation, { regions: this.state.currentRegion ? this.state.currentRegion.subregions : this.props.regionCensus, displayRegion: this.displayRegion })));
    }
    displayRegion(region) {
        this.setState({ currentRegion: region });
    }
    home() {
        this.displayRegion(undefined);
    }
}
class RegionCensus extends React.Component {
    render() {
        return (React.createElement("div", { className: "mb-2" },
            React.createElement("h1", null, this.props.JsonObject.name),
            React.createElement("ul", null, this.props.JsonObject.inhabitants.map((inhabitant, index) => React.createElement("li", { key: index },
                inhabitant.name,
                " (",
                inhabitant.percentage,
                "%)")))));
    }
}
class RegionCensusNavigation extends React.Component {
    navigate(region) {
        this.props.displayRegion(region);
    }
    render() {
        if (this.props.regions) {
            return (React.createElement("div", { className: "mb-2" },
                React.createElement("h3", null, "Subregions"),
                React.createElement("div", { className: "list-group" }, this.props.regions.map((region, index) => React.createElement("button", { className: "list-group-item list-group-item-action list-group-item-light", onClick: (e) => this.navigate(region), key: index }, region.name)))));
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=census-data-viewer.js.map