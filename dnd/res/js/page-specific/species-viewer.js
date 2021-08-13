"use strict";
const SPECIESFILTERS = [
    {
        andOr: "or",
        multiSelect: true,
        name: "Size",
        values: [
            "Small",
            "Medium",
            "Large"
        ]
    }
];
class SpeciesName extends React.Component {
    render() {
        if (this.props.tagline.length > 0) {
            return (React.createElement("div", { className: "name" },
                this.props.name,
                "\u00A0|\u00A0 ",
                React.createElement("span", { className: "tagline" }, this.props.tagline)));
        }
        else {
            return (React.createElement("div", { className: "name" }, this.props.name));
        }
    }
}
class SpeciesStandee extends React.Component {
    render() {
        return (React.createElement("img", { className: "standee", src: this.props.image, alt: "standee" }));
    }
}
class SpeciesView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { id: "species-viewer-panel", className: "race h-100 overflow-auto flex-shrink-2 flex-grow-1" },
            React.createElement("div", { className: "name" }, this.props.JsonObject.name),
            React.createElement("div", { className: "properties" }, this.props.JsonObject.tagline),
            React.createElement("div", { className: "description" }, this.props.JsonObject.description.map((paragraph, index) => {
                let descText = paragraph.trim();
                if (descText.startsWith("---") && descText.endsWith("---")) {
                    return React.createElement("h3", { key: index }, descText.split("---")[1]);
                }
                else {
                    return React.createElement(ParagraphFromRawHTML, { text: descText, key: index });
                }
            })),
            (this.props.JsonObject.images.standee && this.props.JsonObject.images.standee.length > 0) && React.createElement(SpeciesStandee, { image: this.props.JsonObject.images.standee })));
    }
}
class SpeciesViewer extends React.Component {
    constructor(props) {
        super(props);
        this.changeSpecies = this.changeSpecies.bind(this);
        let SpeciesName = GetURLParameter("name");
        let matchingSpecies = [];
        if (SpeciesName) {
            matchingSpecies = this.props.Species.filter(el => el.name.toLowerCase() == SpeciesName?.toLowerCase());
        }
        let selectedSpecies = matchingSpecies.length > 0 ? matchingSpecies[0] : this.props.Species[0];
        this.state = {
            selectedSpecies: selectedSpecies,
            selectedIndex: 0
        };
    }
    render() {
        let filterableItems = this.props.Species.map(a => { return { text: a.name, tags: a.tags || [] }; });
        return (React.createElement("div", { className: "bg-dark bg-gradient p-0 h-100 overflow-hidden" },
            React.createElement(FilterPanel, { filters: SPECIESFILTERS, items: filterableItems, selectedIndex: this.state.selectedIndex, onChange: this.changeSpecies }),
            React.createElement(FilterPanelToggleButton, null),
            React.createElement("div", { className: "container-fluid bg-dark p-0 h-100 overflow-hidden", style: {
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: (this.state.selectedSpecies.images.background.length > 0 ? "url('" + this.state.selectedSpecies.images.background + "')" : "none"),
                } },
                React.createElement("div", { className: "col-12 col-lg-6 mx-auto h-100 d-flex flex-column overflow-hidden" },
                    React.createElement(FilterPanelToggleButtonMobile, null),
                    React.createElement(SpeciesView, { JsonObject: this.state.selectedSpecies })))));
    }
    changeSpecies(index) {
        this.setState({ selectedSpecies: this.props.Species[index], selectedIndex: index });
    }
}
ReactDOM.render(React.createElement(SpeciesViewer, { Species: SpeciesFluff.sort((a, b) => a.name > b.name && 1 || -1) }), document.getElementById("viewer-panel"));
//# sourceMappingURL=species-viewer.js.map