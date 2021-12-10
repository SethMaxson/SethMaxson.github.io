"use strict";
class StatBlockHeader extends React.Component {
    render() {
        return (React.createElement("h6", { className: "border-bottom border-info text-info mt-3" }, this.props.children));
    }
}
class StatBlockProperty extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("b", null, this.props.Label + " "),
            this.props.Value));
    }
}
//# sourceMappingURL=stat-block.js.map