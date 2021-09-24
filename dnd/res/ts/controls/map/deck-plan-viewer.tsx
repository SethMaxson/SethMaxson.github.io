interface IDeckPlanViewerProps
{
	deckPlan: IDeckPlan;
	displayClouds: boolean;
	displayGrid: boolean;
	displayWaves: boolean;
}
interface IDeckPlanViewerState
{
	currentDeck: number;
	displayLocations: boolean;
	displayMenu: boolean;
}
class DeckPlanViewer extends React.Component<IDeckPlanViewerProps, IDeckPlanViewerState> {
	public static defaultProps = {
		displayClouds: true,
		displayGrid: false,
		displayWaves: true,
	};
	constructor(props: IDeckPlanViewerProps)
	{
		super(props);

		this.state = {
			currentDeck: props.deckPlan.decks.length,
			displayLocations: false,
			displayMenu: false,
		};
	}
	public render()
	{
		return (
			<div id="map-body" className="map-body" style={{ overflow: 'hidden', height: '100%', width: "100%" }}>
				<div className="map-controls" style={{ zIndex: 2, paddingLeft: '80px' }}>
					- <input type="range" min={10} max={200} defaultValue={50} className="slider" id="map-zoom" /> +
					<input type="number" name="previous-zoom" id="previous-zoom" defaultValue="0.50" style={{ display: 'none' }} />
				</div>
				{this.props.displayWaves && <div className="waves">&nbsp;</div>}
				{this.props.displayClouds && <div className="clouds">&nbsp;</div>}
				<div
					id="map-container"
					className="map-container map deck-plan"
					style={{
						width: (this.props.deckPlan.width + 'px'),
						height: (this.props.deckPlan.height + 'px'),
						textAlign: 'center',
						transformOrigin: 'center center',
						imageRendering: 'pixelated'
					}}>
					{
						!this.state.displayMenu &&
						<button className="btn btn-light btn-lg control-toggle-button fs-2" onClick={() => { this.setState({ displayMenu: true }) }}>
							Menu
						</button>
					}
					{
						this.state.displayMenu &&
						<div className="control-bar text-light fs-2">
							<label htmlFor="current-deck" className="form-label">Current Deck:</label>
							<div className="input-group mb-3 fs-2">
								<input
									type="number"
									className="form-control fs-2"
									id="current-deck"
									step={1}
									min={1}
									max={this.props.deckPlan.decks.length}
									style={{ minWidth: "30px", width: "10%", flex: "0 0 auto", textAlign: "right" }}
									value={this.state.currentDeck}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									{
										this.setState({ currentDeck: e.target.valueAsNumber });
									}}
								/>
								<span className="input-group-text fs-2">/{this.props.deckPlan.decks.length} - {this.props.deckPlan.decks[this.state.currentDeck-1].name}</span>
							</div>
							<div className="form-check form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									id="flexSwitchCheckDefault"
									checked={this.state.displayLocations}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									{
										this.setState({ displayLocations: e.target.checked });
									}}
								/>
								<label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Display Notable Locations</label>
							</div>
							<button className="btn btn-danger btn-lg close-button fs-2" onClick={() => { this.setState({ displayMenu: false }) }}>
								X
							</button>
						</div>
					}
					{
						this.props.displayGrid &&
						<div className="grid">
							&#160;
						</div>
					}
					<div className="map-object-layers" id="Decks" style={{ width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px' }}>
						{this.props.deckPlan.decks.map((deck, index: number) =>
							(index < this.state.currentDeck) && <Deck
								displayLocations={this.state.displayLocations}
								object={deck}
								key={index}
							/>
						)}
					</div>
				</div>
			</div>

		);
	}
}

interface IDeckProps
{
	displayLocations: boolean;
	object: IDeck;
}
class Deck extends React.Component<IDeckProps> {
	public static defaultProps = {
		displayLocations: true,
	};
	public render()
	{
		return (
			<div id={this.props.object.name} style={{ backgroundImage: ('url(' + this.props.object.image + ')') }}>
				{this.props.displayLocations && this.props.object.locations.map((loc, index: number) =>
					<DeckLocation object={loc} key={index} />
				)}
			</div>
		);
	}
}

interface IDeckLocationProps
{
	object: IDeckLocation;
}
class DeckLocation extends React.Component<IDeckLocationProps> {
	public render()
	{
		return (
			<a href="#" className="smith city deck-location" style={{top: this.props.object.top, left: this.props.object.left}}>
			{/* <a href="#" className="smith city deck-location d-none d-lg-block" style={{top: this.props.object.top, left: this.props.object.left}}> */}
				I
				<span className="city-preview">
					<h1>{this.props.object.name}</h1>
					{this.props.object.description.map((paragraph, index: number) =>
						<p key={index}>
							{paragraph}
						</p>
					)}
				</span>
			</a>

		);
	}
}