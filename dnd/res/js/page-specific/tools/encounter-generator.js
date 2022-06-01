"use strict";
/** TODO: Finish */
class RandomEncounterGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTags: [],
        };
    }
    render() {
        return (React.createElement("div", { className: "container bg-light" },
            React.createElement("h1", null, "Random Encounters"),
            React.createElement("p", { className: "px-2" }, "Rolling random encounters is complicated. Hopefully this tool will make it less so."),
            React.createElement(RollableTable, { rows: this.props.tableData, useCategories: true, useTags: true })));
    }
}
const RandomEncounterGeneratorTables = [
    {
        odds: 1,
        result: "The party's ship is boarded by 1d4 assassins and attacked. ",
        categories: ["Airship Travel"],
        tags: ["Airship Travel"],
    },
    {
        odds: 1,
        result: "Mixed Success. Roll on the Mutation table once and add results to base race.",
    },
    {
        odds: 1,
        result: "Mixed Success. Roll on the Mutation table twice and add results to base race.",
    },
    {
        odds: 1,
        result: "Mixed Success. Roll on the Mutation table thrice and add results to base race.",
    },
    {
        odds: 1,
        result: "Weave Distortion. Roll on the Wild Magic table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
    },
    {
        odds: 1,
        result: "Failure. Roll on the Whoops! table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
    },
];
ReactDOM.render(React.createElement(RandomEncounterGenerator, { tableData: RandomEncounterGeneratorTables }), document.getElementById("app-container"));
//# sourceMappingURL=encounter-generator.js.map