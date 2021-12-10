"use strict";
class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.displayAll = this.displayAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        let activeFiltersArray = [];
        for (let i = 0; i < this.props.filters.length; i++) {
            activeFiltersArray.push([]);
        }
        this.state = {
            activeFilters: activeFiltersArray,
            itemDisplay: this.props.items.map(a => true),
            searchString: ""
        };
    }
    render() {
        return (React.createElement("div", { className: "bg-secondary d-flex flex-column p-2 h-100" + (this.props.className ? (" " + this.props.className) : "") },
            React.createElement("div", { className: "header mb-2" },
                React.createElement("h5", { id: "filterable-panel-label", className: "d-none" }, "Filters"),
                React.createElement(FilterSearch, { search: this.search }),
                this.props.filters.length > 0 && React.createElement("a", { className: "btn btn-primary", "data-bs-toggle": "collapse", href: "#filterable-panel-filters", role: "button", "aria-expanded": "false", "aria-controls": "filterable-panel-filters" }, "Filters")),
            React.createElement("div", { className: "container-fluid collapse flex-grow-0 flex-shrink-0 rounded bg-dark text-light", id: "filterable-panel-filters" }, this.props.filters.map((category, index) => React.createElement(FilterCategoryRow, { category: category, activeValues: this.state.activeFilters[index], index: index, onChange: this.updateFilter, key: index }))),
            React.createElement(FilterableItemList, { items: this.props.items, itemDisplay: this.state.itemDisplay, onChange: this.props.onChange, selectedIndex: this.props.selectedIndex })));
    }
    search(searchString) {
        this.setState({ searchString: searchString }, this.updateDisplay);
    }
    updateDisplay() {
        if (this.state.searchString.length == -1) {
            this.displayAll();
        }
        else {
            let activeFilterValueCount = 0;
            for (let i = 0; i < this.state.activeFilters.length; i++) {
                activeFilterValueCount += this.state.activeFilters[i].length;
            }
            const newDisplay = this.state.itemDisplay.slice(); //copy the array
            for (let i = 0; i < this.props.items.length; i++) //execute the manipulations
             {
                let item = this.props.items[i];
                newDisplay[i] = ((this.state.searchString.length == 0 && activeFilterValueCount == 0) ||
                    (this.state.searchString.length > 0 && fuzzySearch(this.state.searchString, item.text)) ||
                    (this.props.filters.length == 0 &&
                        item.tags.length > 0 &&
                        fuzzySearch(this.state.searchString, item.tags.join(","))));
                if (!newDisplay[i]) {
                    const itemTags = "|" + item.tags.join("|").toLowerCase() + "|";
                    for (let j = 0; j < this.state.activeFilters.length; j++) {
                        for (let k = 0; k < this.state.activeFilters[j].length; k++) {
                            const filterTag = "|" + this.state.activeFilters[j][k].toLowerCase() + "|";
                            if (itemTags.includes(filterTag)) {
                                newDisplay[i] = true;
                                break;
                            }
                        }
                    }
                }
            }
            this.setState({ itemDisplay: newDisplay });
        }
    }
    updateFilter(index, activeValues) {
        const newFiltersState = this.state.activeFilters.slice(); //copy the array
        newFiltersState[index] = activeValues;
        this.setState({ activeFilters: newFiltersState }, this.updateDisplay);
    }
    displayAll() {
        const newDisplay = this.state.itemDisplay.slice(); //copy the array
        for (let i = 0; i < newDisplay.length; i++) { //execute the manipulations
            newDisplay[i] = true;
        }
        this.setState({ itemDisplay: newDisplay });
    }
}
FilterPanel.defaultProps = {
    filters: [],
};
class FilterPanelOffCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.displayAll = this.displayAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        let activeFiltersArray = [];
        for (let i = 0; i < this.props.filters.length; i++) {
            activeFiltersArray.push([]);
        }
        this.state = {
            activeFilters: activeFiltersArray,
            itemDisplay: this.props.items.map(a => true),
            searchString: ""
        };
    }
    render() {
        return (React.createElement("div", { className: "offcanvas offcanvas-start bg-secondary show h-100", id: "filterable-panel", "aria-labelledby": "filterable-panel-label", "data-bs-scroll": "true", "data-bs-backdrop": "false" },
            React.createElement("div", { className: "offcanvas-header" },
                React.createElement("h5", { id: "filterable-panel-label", className: "d-none" }, "Filters"),
                React.createElement(FilterSearch, { search: this.search }),
                this.props.filters.length > 0 && React.createElement("a", { className: "btn btn-primary", "data-bs-toggle": "collapse", href: "#filterable-panel-filters", role: "button", "aria-expanded": "false", "aria-controls": "filterable-panel-filters" }, "Filters"),
                React.createElement("button", { type: "button", className: "btn-close text-reset", "data-bs-dismiss": "offcanvas", "aria-label": "Close" })),
            React.createElement("div", { className: "offcanvas-body overflow-hidden d-flex flex-column p-2" },
                React.createElement("div", { className: "container-fluid collapse flex-grow-0 flex-shrink-0 rounded bg-dark text-light", id: "filterable-panel-filters" }, this.props.filters.map((category, index) => React.createElement(FilterCategoryRow, { category: category, activeValues: this.state.activeFilters[index], index: index, onChange: this.updateFilter, key: index }))),
                React.createElement(FilterableItemList, { items: this.props.items, itemDisplay: this.state.itemDisplay, onChange: this.props.onChange, selectedIndex: this.props.selectedIndex }))));
    }
    search(searchString) {
        this.setState({ searchString: searchString }, this.updateDisplay);
    }
    updateDisplay() {
        if (this.state.searchString.length == -1) {
            this.displayAll();
        }
        else {
            let activeFilterValueCount = 0;
            for (let i = 0; i < this.state.activeFilters.length; i++) {
                activeFilterValueCount += this.state.activeFilters[i].length;
            }
            const newDisplay = this.state.itemDisplay.slice(); //copy the array
            for (let i = 0; i < this.props.items.length; i++) //execute the manipulations
             {
                let item = this.props.items[i];
                newDisplay[i] = ((this.state.searchString.length == 0 && activeFilterValueCount == 0) ||
                    (this.state.searchString.length > 0 && fuzzySearch(this.state.searchString, item.text)) ||
                    (this.props.filters.length == 0 &&
                        item.tags.length > 0 &&
                        fuzzySearch(this.state.searchString, item.tags.join(","))));
                if (!newDisplay[i]) {
                    const itemTags = "|" + item.tags.join("|").toLowerCase() + "|";
                    for (let j = 0; j < this.state.activeFilters.length; j++) {
                        for (let k = 0; k < this.state.activeFilters[j].length; k++) {
                            const filterTag = "|" + this.state.activeFilters[j][k].toLowerCase() + "|";
                            if (itemTags.includes(filterTag)) {
                                newDisplay[i] = true;
                                break;
                            }
                        }
                    }
                }
            }
            this.setState({ itemDisplay: newDisplay });
        }
    }
    updateFilter(index, activeValues) {
        const newFiltersState = this.state.activeFilters.slice(); //copy the array
        newFiltersState[index] = activeValues;
        this.setState({ activeFilters: newFiltersState }, this.updateDisplay);
    }
    displayAll() {
        const newDisplay = this.state.itemDisplay.slice(); //copy the array
        for (let i = 0; i < newDisplay.length; i++) { //execute the manipulations
            newDisplay[i] = true;
        }
        this.setState({ itemDisplay: newDisplay });
    }
}
FilterPanelOffCanvas.defaultProps = {
    filters: [],
};
class FilterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyUp(e) {
        this.props.search(e.target.value);
    }
    render() {
        return (React.createElement("input", { type: "text", name: "search", className: "search", placeholder: "Filter...", onKeyUp: this.handleKeyUp }));
    }
}
class FilterCategoryRow extends React.Component {
    constructor(props) {
        super(props);
        this.toggleValue = (value, adding) => {
            const newValuesState = adding ? this.props.activeValues.slice() : this.props.activeValues.filter(e => e.toLowerCase() !== value.toLowerCase());
            if (adding) {
                newValuesState.push(value.toLowerCase());
            }
            this.props.onChange(this.props.index, newValuesState);
        };
        this.toggleValue = this.toggleValue.bind(this);
    }
    render() {
        return (React.createElement("div", { className: "row my-1" },
            React.createElement("div", { className: "col-auto" },
                this.props.category.name,
                ":"),
            this.props.category.values.map((value, index) => React.createElement(FilterValueToggle, { category: this.props.category.name, multiSelect: this.props.category.multiSelect, filterValue: value, onChange: this.toggleValue, key: index }))));
    }
}
FilterCategoryRow.defaultProps = {
    activeValues: [],
};
class FilterValueToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (e) => {
            this.props.onChange(this.props.filterValue, e.target.checked);
        };
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (React.createElement("span", { className: "col-auto" },
            React.createElement("input", { type: this.props.multiSelect ? "checkbox" : "radio", className: "btn-check", id: this.props.category + "-" + this.props.filterValue + "-btn-check", onChange: this.handleChange }),
            React.createElement("label", { className: "btn btn-sm btn-outline-primary", htmlFor: this.props.category + "-" + this.props.filterValue + "-btn-check" }, this.props.filterValue)));
    }
}
FilterValueToggle.defaultProps = {
    multiSelect: true,
};
class FilterableItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onClick(this.props.index);
    }
    render() {
        return (React.createElement("button", { className: "list-group-item list-group-item-action list-group-item-dark filterable-item" + (this.props.selected ? " active" : ""), "data-tags": this.props.tags.join(","), onClick: e => this.handleClick(e) }, this.props.text));
    }
}
class FilterableItemList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (React.createElement("div", { className: "list-group flex-shrink-1 flex-grow-1 overflow-auto" }, this.props.items.map((item, index) => this.props.itemDisplay[index] &&
            React.createElement(FilterableItem, { index: index, key: index, onClick: this.handleClick, selected: index == this.props.selectedIndex, tags: item.tags, text: item.text }))));
    }
    handleClick(index) {
        this.props.onChange(index);
    }
}
class FilterPanelToggleButton extends React.Component {
    render() {
        return (React.createElement("button", { className: "btn btn-primary d-none d-lg-block navbar-light position-absolute top-0 start-0 m-1", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#filterable-panel", "aria-controls": "filterable-panel" },
            React.createElement("span", { className: "navbar-toggler-icon" })));
    }
}
class FilterPanelToggleButtonMobile extends React.Component {
    render() {
        return (React.createElement("div", { className: "d-block d-lg-none navbar navbar-dark bg-secondary" },
            React.createElement("button", { className: "btn btn-primary navbar-light m-1", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#filterable-panel", "aria-controls": "filterable-panel" },
                React.createElement("span", { className: "navbar-toggler-icon" }))));
    }
}
//# sourceMappingURL=filterable-panel.js.map