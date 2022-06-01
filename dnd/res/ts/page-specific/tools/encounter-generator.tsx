interface IRandomEncounterGeneratorProps
{
	tableData: IRollableTableRowData[];
}
interface IRandomEncounterGeneratorState
{
	filterTags: string[];
}
/** TODO: Finish */
class RandomEncounterGenerator extends React.Component<IRandomEncounterGeneratorProps, IRandomEncounterGeneratorState> {
	constructor(props: IRandomEncounterGeneratorProps)
	{
		super(props);

		this.state = {
			filterTags: [],
		};
	}
	render()
	{
		return (
			<div className="container bg-light">
				<h1>
					Random Encounters
				</h1>
				<p className="px-2">
					Rolling random encounters is complicated. Hopefully this tool will make it less so.
				</p>
				<RollableTable
					rows={this.props.tableData}
					useCategories={true}
					useTags={true}
				/>
			</div>
		);
	}
}

const RandomEncounterGeneratorTables: IRollableTableRowData[] = [
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

ReactDOM.render(
	<RandomEncounterGenerator tableData={RandomEncounterGeneratorTables} />,
	document.getElementById("app-container")
);