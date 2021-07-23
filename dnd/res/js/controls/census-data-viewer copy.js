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
        super.mountReact(React.createElement(CityBlurb, { JsonObject: city, ref: (component) => { me.reactRef = component; } }));
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
            React.createElement("button", { onClick: this.home }, "Home"),
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
        return (React.createElement("div", null,
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
            return (React.createElement("div", null,
                React.createElement("h3", null, "Subregions"),
                React.createElement("ul", null, this.props.regions.map((region, index) => React.createElement("li", { key: index },
                    React.createElement("button", { onClick: (e) => this.navigate(region) }, region.name))))));
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=census-data-viewer%20copy.js.map