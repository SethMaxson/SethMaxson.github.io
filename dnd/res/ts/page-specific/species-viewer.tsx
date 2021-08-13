const SPECIESFILTERS: IFilterCategory[] = [
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

interface ISpeciesNameProps
{
	name: string;
	tagline: string;
}
class SpeciesName extends React.Component<ISpeciesNameProps> {
	render()
	{
		if (this.props.tagline.length > 0)
		{
			return (
				<div className="name">{this.props.name}
					&#160;|&#160; <span className="tagline">{this.props.tagline}</span>
				</div>
			);
		}
		else
		{
			return (
				<div className="name">{this.props.name}</div>
			);
		}
	}
}

interface ISpeciesStandeeProps
{
	image: string;
}
class SpeciesStandee extends React.Component<ISpeciesStandeeProps> {
	render()
	{
		return (
			<img className="standee" src={this.props.image} alt="standee" />
		);
	}
}

interface ISpeciesViewProps
{
	JsonObject: ISpeciesFluff;
}
interface ISpeciesViewState { }

class SpeciesView extends React.Component<ISpeciesViewProps, ISpeciesViewState> {
	constructor(props: ISpeciesViewProps) {
		super(props);
	}

	render()
	{
		return (
			<div id="species-viewer-panel" className="race h-100 overflow-auto flex-shrink-2 flex-grow-1">
				<div className="name">{this.props.JsonObject.name}</div>
				<div className="properties">{this.props.JsonObject.tagline}</div>
				{/* <p className="ps-1 text-secondary"><i>{this.props.JsonObject.tagline}</i></p> */}
				<div className="description">
					{this.props.JsonObject.description.map((paragraph, index: number) =>
						{
							let descText = paragraph.trim();
							if (descText.startsWith("---") && descText.endsWith("---"))
							{
								return <h3 key={index}>{descText.split("---")[1]}</h3>
							}
							else
							{
								return <ParagraphFromRawHTML text={descText} key={index} />
							}
						}
					)}
				</div>
				{(this.props.JsonObject.images.standee && this.props.JsonObject.images.standee.length > 0) && <SpeciesStandee image={this.props.JsonObject.images.standee} />}
			</div>
		)
	}
}


interface ISpeciesViewerProps
{
	Species: ISpeciesFluff[];
}
interface ISpeciesViewerState
{
	selectedSpecies: ISpeciesFluff;
	selectedIndex: number;
}
class SpeciesViewer extends React.Component<ISpeciesViewerProps, ISpeciesViewerState> {
	constructor(props: ISpeciesViewerProps)
	{
		super(props);
		this.changeSpecies = this.changeSpecies.bind(this);
		let SpeciesName = GetURLParameter("name");
		let matchingSpecies: ISpeciesFluff[] = [];
		if (SpeciesName) {
			matchingSpecies = this.props.Species.filter(el => el.name.toLowerCase() == SpeciesName?.toLowerCase());
		}
		let selectedSpecies = matchingSpecies.length > 0? matchingSpecies[0] : this.props.Species[0]

		this.state = {
			selectedSpecies: selectedSpecies,
			selectedIndex: 0
		};
	}
	render()
	{
		let filterableItems: IFilterableItemObject[] = this.props.Species.map(a => { return { text: a.name, tags: a.tags || [] } });
		return (
			<div className="bg-dark bg-gradient p-0 h-100 overflow-hidden">
				<FilterPanel
					filters={SPECIESFILTERS}
					items={filterableItems}
					selectedIndex={this.state.selectedIndex}
					onChange={this.changeSpecies}
				/>
				<FilterPanelToggleButton />
				<div className="container-fluid bg-dark p-0 h-100 overflow-hidden" style={{
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundImage: (this.state.selectedSpecies.images.background.length > 0 ? "url('" + this.state.selectedSpecies.images.background + "')" : "none"),
				}}>
					<div className="col-12 col-lg-6 mx-auto h-100 d-flex flex-column overflow-hidden">
						<FilterPanelToggleButtonMobile />
						<SpeciesView JsonObject={this.state.selectedSpecies} />
					</div>
				</div>
			</div>

		);
	}
	changeSpecies(index: number)
	{
		this.setState({ selectedSpecies: this.props.Species[index], selectedIndex: index});
	}
}

ReactDOM.render(
	<SpeciesViewer Species={SpeciesFluff.sort((a, b) => a.name > b.name && 1 || -1)} />,
	document.getElementById("viewer-panel")
);