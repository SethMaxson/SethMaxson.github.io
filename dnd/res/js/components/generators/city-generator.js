"use strict";
;
class CityGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.clear = () => {
            this.setState({ cities: [] });
        };
        this.deleteCity = (index) => {
            let newCityArray = this.state.cities.slice();
            newCityArray.splice(index, 1);
            this.setState({ cities: newCityArray });
        };
        this.generateCity = () => {
            const citySize = this.state.citySize.length > 0 ? randomize(this.state.citySize) : undefined;
            const itemRarity = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
            const newCityArray = this.state.cities.slice();
            newCityArray.push({
                city: generateCity(citySize, itemRarity),
                editing: false,
                expanded: true
            });
            this.setState({ cities: newCityArray });
        };
        this.getMutableCityArray = () => {
            return this.state.cities.slice();
        };
        this.getMutableCity = (mutableArray, index) => {
            return JSON.parse(JSON.stringify(mutableArray[index]));
        };
        this.saveCityAndEndEditing = (city, index) => {
            const newArray = this.getMutableCityArray();
            const newCity = this.getMutableCity(newArray, index);
            newCity.city = JSON.parse(JSON.stringify(city));
            newCity.editing = false;
            newArray[index] = newCity;
            this.setState({ cities: newArray });
        };
        this.toggleCityEditing = (index) => {
            const newArray = this.getMutableCityArray();
            const newCity = this.getMutableCity(newArray, index);
            newCity.editing = !newCity.editing;
            newArray[index] = newCity;
            this.setState({ cities: newArray });
        };
        this.toggleCityExpanded = (index) => {
            const newArray = this.getMutableCityArray();
            const newCity = this.getMutableCity(newArray, index);
            newCity.expanded = !newCity.expanded;
            newArray[index] = newCity;
            this.setState({ cities: newArray });
        };
        this.state = {
            cities: [],
            citySize: [],
            maxItemLevel: -1,
            maxItemRarity: "null",
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "City Generator"),
            React.createElement("p", { className: "px-2" }, "Generate settlements for D&D to help fill your world."),
            React.createElement("div", { className: "controls" },
                React.createElement("div", { className: "mb-3 row" },
                    React.createElement("label", { className: "col-sm-1 col-form-label" }, "City Size:"),
                    React.createElement("div", { className: "col-sm-11" },
                        React.createElement(MultiSelect, { LabelWhenEmpty: "Any size", OnChange: (value) => this.setState({ citySize: value }), Options: [
                                {
                                    value: "empty",
                                    label: "Empty (0)"
                                },
                                {
                                    value: "micro",
                                    label: "Micro (2 - 20)"
                                },
                                {
                                    value: "tiny",
                                    label: "Tiny (Village) (20 - 200)"
                                },
                                {
                                    value: "small",
                                    label: "Small (Village) (200 - 1,000)"
                                },
                                {
                                    value: "medium",
                                    label: "Medium (Town) (1,000 - 6,000)"
                                },
                                {
                                    value: "large",
                                    label: "Large (City) (6,000 - 25,000)"
                                },
                                {
                                    value: "huge",
                                    label: "Huge (Metropolis) (25,000 - 50,000)"
                                }
                            ], Search: true, SelectAll: true, Value: this.state.citySize }))),
                React.createElement("div", { className: "mb-3 row" },
                    React.createElement("label", { className: "col-sm-1 col-form-label" },
                        "Max Item ",
                        Sc.Terminology.Item.Level,
                        ":"),
                    React.createElement("div", { className: "col-sm-11" },
                        React.createElement("select", { className: "form-select", onChange: e => this.setState({ maxItemRarity: e.target.value }), value: this.state.maxItemRarity },
                            React.createElement("option", { value: "null" },
                                "Any max item ",
                                Sc.Terminology.Item.Level.toLocaleLowerCase()),
                            React.createElement("option", { disabled: true }, "--------------"),
                            React.createElement("option", { value: "None" }, "None"),
                            React.createElement("option", { value: "Common" }, "Common"),
                            React.createElement("option", { value: "Uncommon" }, "Uncommon"),
                            React.createElement("option", { value: "Rare" }, "Rare"),
                            React.createElement("option", { value: "Very Rare" }, "Very Rare"),
                            React.createElement("option", { value: "Legendary" }, "Legendary"),
                            React.createElement("option", { value: "Artifact" }, "Artifact")))),
                React.createElement("button", { type: "button", onClick: this.generateCity, className: "btn btn-primary m-1" }, "Generate"),
                React.createElement("button", { type: "button", onClick: this.clear, className: "btn btn-danger m-1" }, "Clear")),
            React.createElement("div", { className: "output-area" }, this.state.cities.map((city, index) => React.createElement(CityDataDisplay, { City: city.city, Editing: city.editing, Expanded: city.expanded, Delete: () => this.deleteCity(index), ToggleEditing: () => this.toggleCityEditing(index), ToggleExpand: () => this.toggleCityExpanded(index), UpdateCity: (city) => this.saveCityAndEndEditing(city, index), key: index })))));
    }
}
class CityDataDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            // Prevent the browser from reloading the page
            e.preventDefault();
            // Read the form data
            const form = e.target;
            const formData = new FormData(form);
            // Get a mutable copy of the city data object
            const mutableCity = JSON.parse(JSON.stringify(this.props.City));
            // Update the properties of the city
            mutableCity.name = formData.get("name")?.toString() || mutableCity.name;
            // Update the city in the parent container
            this.props.UpdateCity(mutableCity);
        };
        this.state = {
            modifiedCity: JSON.parse(JSON.stringify(props.City))
        };
    }
    render() {
        return (React.createElement(React.Fragment, null, this.props.Editing ?
            React.createElement(React.Fragment, null,
                React.createElement("form", { className: "card", onSubmit: this.handleSubmit },
                    React.createElement("div", { className: "accordion-button card-header position-relative user-select-none" + (this.props.Expanded ? "" : " collapsed"), style: { cursor: "pointer", textOverflow: "truncate" }, onClick: this.props.ToggleExpand }, this.props.Expanded ?
                        this.props.City.name
                        :
                            React.createElement(React.Fragment, null,
                                this.props.City.name,
                                React.createElement("span", { className: "fs-6 text text-muted ms-2 fst-italic" }, this.props.City.alignment + " " + this.props.City.type))),
                    this.props.Expanded &&
                        React.createElement("div", { className: "card-body" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "d-inline" },
                                    React.createElement("input", { name: "name", type: "text", defaultValue: this.props.City.name })),
                                React.createElement("button", { type: "submit", className: "btn btn-secondary m-1" }, "Save"),
                                React.createElement("button", { type: "reset", className: "btn btn-secondary m-1" }, "Reset"),
                                React.createElement("button", { type: "button", onClick: this.props.ToggleEditing, className: "btn btn-danger m-1" }, "Cancel")),
                            React.createElement("h4", null, this.props.City.alignment + " " + this.props.City.type),
                            React.createElement(CityAttribute, { Label: "Population", Value: this.props.City.populationPercentages }),
                            React.createElement(CityAttribute, { Label: "Government", Value: this.props.City.government }),
                            React.createElement(CityAttribute, { Label: "Defense", Value: this.props.City.defense }),
                            React.createElement(CityAttribute, { Label: "Commerce", Value: this.props.City.commerce }),
                            React.createElement(CityAttribute, { Label: "Organizations", Value: this.props.City.organizations }),
                            React.createElement("br", null),
                            React.createElement(CityAttribute, { Label: "Qualities", SeparatorCharacter: ":", Value: this.props.City.qualities.join(', ').toLowerCase() }),
                            React.createElement(CityAttribute, { Label: "Maximum Item Level", SeparatorCharacter: ":", Value: this.props.City.maxItemRarity }),
                            (this.props.City.pointsOfInterest.length > 0) &&
                                React.createElement(React.Fragment, null,
                                    React.createElement("h4", { className: "mt-5" }, "Points of Interest"),
                                    this.props.City.pointsOfInterest.map((poi, index) => React.createElement(CityPointOfInterest, { POI: poi, key: index }))),
                            React.createElement("button", { type: "button", onClick: this.props.Delete, className: "btn btn-danger m-1" }, "Remove"))))
            :
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "card" },
                        React.createElement("div", { className: "accordion-button card-header position-relative user-select-none" + (this.props.Expanded ? "" : " collapsed"), style: { cursor: "pointer", textOverflow: "truncate" }, onClick: this.props.ToggleExpand }, this.props.Expanded ?
                            this.props.City.name
                            :
                                React.createElement(React.Fragment, null,
                                    this.props.City.name,
                                    React.createElement("span", { className: "fs-6 text text-muted ms-2 fst-italic" }, this.props.City.alignment + " " + this.props.City.type))),
                        this.props.Expanded &&
                            React.createElement("div", { className: "card-body" },
                                React.createElement("div", null,
                                    React.createElement("h1", { className: "d-inline" }, this.props.City.name),
                                    React.createElement("button", { type: "button", onClick: this.props.ToggleEditing, className: "btn btn-secondary m-1" }, "Edit")),
                                React.createElement("h4", null, this.props.City.alignment + " " + this.props.City.type),
                                React.createElement(CityAttribute, { Label: "Population", Value: this.props.City.populationPercentages }),
                                React.createElement(CityAttribute, { Label: "Government", Value: this.props.City.government }),
                                React.createElement(CityAttribute, { Label: "Defense", Value: this.props.City.defense }),
                                React.createElement(CityAttribute, { Label: "Commerce", Value: this.props.City.commerce }),
                                React.createElement(CityAttribute, { Label: "Organizations", Value: this.props.City.organizations }),
                                React.createElement("br", null),
                                React.createElement(CityAttribute, { Label: "Qualities", SeparatorCharacter: ":", Value: this.props.City.qualities.join(', ').toLowerCase() }),
                                React.createElement(CityAttribute, { Label: "Maximum Item Level", SeparatorCharacter: ":", Value: this.props.City.maxItemRarity }),
                                (this.props.City.pointsOfInterest.length > 0) &&
                                    React.createElement(React.Fragment, null,
                                        React.createElement("h4", { className: "mt-5" }, "Points of Interest"),
                                        this.props.City.pointsOfInterest.map((poi, index) => React.createElement(CityPointOfInterest, { POI: poi, key: index }))),
                                React.createElement("button", { type: "button", onClick: this.props.Delete, className: "btn btn-danger m-1" }, "Remove"))))));
    }
}
class CityAttribute extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("span", { className: "fw-bold fst-italic" },
                this.props.Label + this.props.SeparatorCharacter,
                " "),
            " ",
            this.props.Value));
    }
}
CityAttribute.defaultProps = {
    SeparatorCharacter: "."
};
class CityPointOfInterest extends React.Component {
    render() {
        return (React.createElement("p", null,
            React.createElement("div", { className: "fw-bold" }, this.props.POI.name),
            this.props.POI.description));
    }
}
//# sourceMappingURL=city-generator.js.map