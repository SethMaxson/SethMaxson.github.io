"use strict";
class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.displayAll = this.displayAll.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            itemDisplay: this.props.items.map(a => true),
        };
    }
    render() {
        return (React.createElement("div", { className: "filter-panel" },
            React.createElement(FilterSearch, { search: this.search }),
            this.props.items.map((item, index) => this.state.itemDisplay[index] &&
                React.createElement(FilterableItem, { index: index, key: index, onClick: this.handleClick, selected: index == this.props.selectedIndex, tags: item.tags, text: item.text }))));
    }
    search(searchString) {
        if (searchString.length == 0) {
            this.displayAll();
        }
        else {
            const newDisplay = this.state.itemDisplay.slice(); //copy the array
            for (let i = 0; i < this.props.items.length; i++) //execute the manipulations
             {
                let item = this.props.items[i];
                newDisplay[i] = (fuzzySearch(searchString, item.text) ||
                    (item.tags.length > 0 &&
                        fuzzySearch(searchString, item.tags.join(","))));
            }
            this.setState({ itemDisplay: newDisplay });
        }
    }
    displayAll() {
        const newDisplay = this.state.itemDisplay.slice(); //copy the array
        for (let i = 0; i < newDisplay.length; i++) { //execute the manipulations
            newDisplay[i] = true;
        }
        this.setState({ itemDisplay: newDisplay });
    }
    handleClick(index) {
        this.props.onChange(index);
    }
}
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
class FilterableItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onClick(this.props.index);
    }
    render() {
        return (React.createElement("div", { className: "filterable-item" + (this.props.selected ? " selected" : ""), "data-tags": this.props.tags.join(","), onClick: e => this.handleClick(e) }, this.props.text));
    }
}
//# sourceMappingURL=filterable-panel.js.map