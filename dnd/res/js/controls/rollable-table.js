"use strict";
/**A table where each row describes a possible outcome and the associated odds in terms of dice result. The header of the dice result column can be clicked to automatically roll. */
class RollableTable extends React.Component {
    constructor(props) {
        super(props);
        this.roll = this.roll.bind(this);
    }
    render() {
        let die = 0;
        let lastRollCutoff = 1;
        for (let i = 0; i < this.props.rows.length; i++) {
            die += this.props.rows[i].odds;
        }
        return (React.createElement("table", { className: "table table-dark table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { onClick: this.roll },
                        "1d",
                        die),
                    React.createElement("th", null, this.props.resultColumnLabel))),
            React.createElement("tbody", null, this.props.rows.map((row, index) => {
                let oddsRange = row.odds > 1 ? (lastRollCutoff + "-" + (lastRollCutoff + row.odds - 1)) : lastRollCutoff;
                lastRollCutoff += row.odds;
                return (React.createElement("tr", { key: index },
                    React.createElement("td", null, oddsRange),
                    React.createElement("td", null, row.result)));
            }))));
    }
    roll() {
        var result;
        var totalWeight = 0;
        for (let i = 0; i < this.props.rows.length; i++) {
            totalWeight += this.props.rows[i].odds;
        }
        var rand = Math.ceil(Math.random() * totalWeight);
        var currentWeight = 0;
        for (let i = 0; i <= this.props.rows.length; i++) {
            const row = this.props.rows[i];
            currentWeight += row.odds;
            if (rand <= currentWeight) {
                result = row.result;
                break;
            }
        }
        alert(rand + ".\n" + result);
        return result;
    }
}
RollableTable.defaultProps = {
    resultColumnLabel: "Result"
};
//# sourceMappingURL=rollable-table.js.map