class RegionCensusViewer extends ModalWindow
{
	constructor(container: string)
	{
		super(container);
	}
	close()
	{
		this.reactRef?.hide();
		this.element.hide();
	}
	displayCity(city: ICity)
	{
		let me = this;
		super.mountReact(<CityBlurbDeprecated JsonObject={city} ref={(component) => { me.reactRef = component }} />);
		super.open();
	}
}



interface IRegionCensusContainerProps
{
	regionCensus: IRegionCensus[];
}
interface IRegionCensusContainerState
{
	currentRegion: IRegionCensus|undefined;
}
class RegionCensusContainer extends React.Component<IRegionCensusContainerProps, IRegionCensusContainerState> {
	constructor(props: IRegionCensusContainerProps)
	{
		super(props);
		this.displayRegion = this.displayRegion.bind(this);
		this.home = this.home.bind(this);

		this.state = {
			currentRegion: undefined
		};
	}
	render()
	{
		return (
			<div>
				<button className="btn btn-primary mb-3" onClick={this.home}>Home</button>
				{this.state.currentRegion && <RegionCensus JsonObject={this.state.currentRegion} />}
				<RegionCensusNavigation regions={this.state.currentRegion ? this.state.currentRegion.subregions : this.props.regionCensus} displayRegion={this.displayRegion} />
			</div>
		)
	}
	displayRegion(region: IRegionCensus | undefined)
	{
		this.setState({ currentRegion: region });
	}
	home()
	{
		this.displayRegion(undefined);
	}
}

interface IRegionCensusProps
{
	JsonObject: IRegionCensus;
}
class RegionCensus extends React.Component<IRegionCensusProps> {
	render()
	{
		return (
			<div className="mb-2">
				<h1>{this.props.JsonObject.name}</h1>
				<ul>
					{this.props.JsonObject.inhabitants.map((inhabitant, index: number) =>
						<li key={index}>{inhabitant.name} ({inhabitant.percentage}%)</li>
					)}
				</ul>
			</div>
		)
	}
}

interface IRegionCensusNavigationProps
{
	regions: IRegionCensus[] | undefined;
	displayRegion: { (region: IRegionCensus | undefined): void };
}
class RegionCensusNavigation extends React.Component<IRegionCensusNavigationProps> {
	navigate(region: IRegionCensus)
	{
		this.props.displayRegion(region);
	}
	render()
	{
		if (this.props.regions) {
			return (
				<div className="mb-2">
					<h3>Subregions</h3>
					<div className="list-group">
						{this.props.regions.map((region, index: number) =>
							<button
								className="list-group-item list-group-item-action list-group-item-light"
								onClick={(e) => this.navigate(region)}
								key={index}
							>
								{region.name}
							</button>
						)}
					</div>
				</div>
			)
		}
		else
		{
			return null;
		}
	}
}