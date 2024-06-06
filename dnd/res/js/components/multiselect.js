"use strict";
class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheck = (value, adding) => {
            const newArray = this.props.Value.slice();
            if (adding) {
                newArray.push(value);
            }
            else {
                const index = newArray.indexOf(value);
                if (index > -1) {
                    newArray.splice(index, 1);
                }
            }
            this.props.OnChange(newArray);
        };
        this.selectAll = () => {
            this.props.OnChange(this.props.Options.map(option => option.value));
        };
        this.toggleExpand = () => {
            this.setState({ expanded: !this.state.expanded });
        };
        this.unselectAll = () => {
            this.props.OnChange([]);
        };
        this.state = {
            expanded: false,
            searchString: "",
        };
    }
    render() {
        let extraFilterButtons = [];
        let headerLabel = this.props.LabelWhenEmpty;
        if (this.props.Value.length > 5) {
            headerLabel = `${this.props.Value.length} selected`;
        }
        else if (this.props.Value.length > 0) {
            let selectedLabels = [];
            for (let i = 0; i < this.props.Options.length; i++) {
                const option = this.props.Options[i];
                if (this.props.Value.includes(option.value)) {
                    selectedLabels.push(option.label);
                }
                headerLabel = selectedLabels.join(", ");
            }
        }
        React.Children.forEach(this.props.children, (child) => {
            if (!React.isValidElement(child)) {
                return;
            }
            else {
                extraFilterButtons.push(child);
            }
        });
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "card-header bg-white position-relative user-select-none" + ((this.props.Value.length > 0) ? "" : " text-muted"), style: { cursor: "pointer", textOverflow: "truncate" }, onClick: this.toggleExpand },
                headerLabel,
                React.createElement("span", { className: "position-absolute top-50 end-0 translate-middle text-black-50" }, this.state.expanded ? "▲" : "▼")),
            this.state.expanded &&
                React.createElement("ul", { className: "list-group list-group-flush user-select-none" },
                    this.props.Search &&
                        React.createElement("li", { className: "list-group-item" },
                            React.createElement("input", { className: "form-control mb-1", placeholder: "Search", type: "text", value: this.state.searchString, onChange: e => this.setState({ searchString: e.target.value }) })),
                    (this.props.SelectAll || this.props.children) &&
                        React.createElement("li", { className: "list-group-item" },
                            (this.props.Value.length != this.props.Options.length) ?
                                (React.createElement("button", { type: "button", className: "btn btn-outline-primary btn-sm", onClick: this.selectAll }, "Select All")) :
                                (React.createElement("button", { type: "button", className: "btn btn-outline-primary btn-sm", onClick: this.unselectAll }, "Unselect All")),
                            extraFilterButtons),
                    this.props.Options.map((option, index) => {
                        if (this.state.searchString.length == 0 || option.label.toLowerCase().includes(this.state.searchString.toLowerCase())) {
                            return (React.createElement("li", { className: "list-group-item list-group-item-action", key: index, onClick: () => this.handleCheck(option.value, !this.props.Value.includes(option.value)) },
                                React.createElement("div", { className: "form-check" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", checked: this.props.Value.includes(option.value), readOnly: true }),
                                    React.createElement("label", { className: "form-check-label" }, option.label))));
                        }
                    }))));
    }
}
MultiSelect.defaultProps = {
    LabelWhenEmpty: "Surprise Me",
    Search: false,
    SelectAll: false,
};
//# sourceMappingURL=multiselect.js.map