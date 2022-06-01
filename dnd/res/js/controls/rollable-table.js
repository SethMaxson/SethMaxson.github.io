"use strict";
/**A table where each row describes a possible outcome and the associated odds in terms of dice result. The header of the dice result column can be clicked to automatically roll. */
class RollableTable extends React.Component {
    constructor() {
        super(...arguments);
        this.roll = () => {
            var result;
            var totalWeight = 0;
            for (let i = 0; i < this.props.rows.length; i++) {
                totalWeight += this.props.rows[i].odds || 1;
            }
            var rand = Math.ceil(Math.random() * totalWeight);
            var currentWeight = 0;
            for (let i = 0; i <= this.props.rows.length; i++) {
                const row = this.props.rows[i];
                currentWeight += row.odds || 1;
                if (rand <= currentWeight) {
                    result = row.result;
                    break;
                }
            }
            alert(rand + ".\n" + result);
            return result;
        };
    }
    render() {
        let die = 0;
        let lastRollCutoff = 1;
        for (let i = 0; i < this.props.rows.length; i++) {
            die += this.props.rows[i].odds || 1;
        }
        return (React.createElement("table", { className: "table table-dark table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null,
                        React.createElement("button", { type: "button", className: "btn btn-link btm-sm m-0 p-0", onClick: this.roll },
                            "1d",
                            die)),
                    React.createElement("th", null, this.props.resultColumnLabel),
                    this.props.useCategories && React.createElement("th", null, "Category"),
                    this.props.useTags && React.createElement("th", null, this.props.tagsColumnLabel))),
            React.createElement("tbody", null, this.props.rows.map((row, index) => {
                let oddsRange = (row.odds && row.odds > 1) ? (lastRollCutoff + "-" + (lastRollCutoff + row.odds - 1)) : lastRollCutoff;
                lastRollCutoff += row.odds || 1;
                return (React.createElement("tr", { key: index },
                    React.createElement("td", null, oddsRange),
                    React.createElement("td", null, row.result),
                    this.props.useCategories && React.createElement("td", null, row.tags && row.tags.join(", ")),
                    this.props.useTags && React.createElement("td", null, row.tags && row.tags.join(", "))));
            }))));
    }
}
RollableTable.defaultProps = {
    resultColumnLabel: "Result",
    tagsColumnLabel: "Tags",
    useCategories: false,
    useTags: false
};
//# sourceMappingURL=rollable-table.js.map