const MACAW: IDeckPlan = {
	"name": "The Macaw",
	"width": 240,
	"height": 680,
	"gridSize": 40,
	"decks": [
		{
			"image": "/dnd/img/maps/ships/sloop_deck1.png",
			"locations": [
				{
					"name": "Cargo Hold",
					"description": [
						"This space could contain just about anything, provided it can fit in through the cargo hatch."
					],
					"left": "50%",
					"top": "45%"
				},
				{
					"name": "Crew Quarters",
					"description": [
						"Ten hammocks are arrayed in this area, in two tiers. The crew members sleep here, usually in shifts. In addition there can usually be found a number of sea chests, one per crewman, arranged beneath the hammocks."
					],
					"left": "50%",
					"top": "80%"
				}
			],
			"name": "Lower Deck"
		},
		{
			"crew": [
				{
					"name": "Flog",
					"full": "/dnd/img/maps/icons/generic/goblin_f.png",
					"icon": "/dnd/img/maps/icons/generic/goblin_f_icon.png",
					"left": 2,
					"top": 3
				}
			],
			"image": "/dnd/img/maps/ships/sloop_deck2.png",
			"locations": [
				{
					"name": "Main Deck",
					"description": [
						"The main deck is a broad, open space, although usually it is filled at least in part with ropes, the ship's anchor, a lifeboat and that sort of thing. In between the two masts is the hatch providing access to the cargo hold below."
					],
					"left": "50%",
					"top": "32%"
				},
				{
					"name": "Private Cabin",
					"description": [
						"For important passengers or, at least, those who can pay for it, this cabin boasts a bed and perhaps a table or a storage trunk. It can also be used for a first mate, if appropriate."
					],
					"left": "30%",
					"top": "78%"
				},
				{
					"name": "Private Cabin",
					"description": [
						"This cabin is laid out in the same manner as the other one, above."
					],
					"left": "70%",
					"top": "78%"
				},
				{
					"name": "Captain's Cabin",
					"description": [
						"By far the most elaborate quarters on the vessel is this small room. It has a table with four chairs for holding meetings, along with a bed, a wardrobe, a chest and a barrel of liquor."
					],
					"left": "50%",
					"top": "86%"
				}
			],
			"name": "Main Deck"
		},
		{
			"crew": [
				{
					"name": "Cade",
					"full": "/dnd/img/maps/icons/generic/halfling_m.png",
					"icon": "/dnd/img/maps/icons/generic/halfling_m_icon.png",
					"left": 2,
					"top": 5
				}
			],
			"image": "/dnd/img/maps/ships/sloop_deck3.png",
			"locations": [
				{
					"name": "Sterncastle",
					"description": [
						"The ship's wheel is located on this raised platform at the aft of the vessel; it is generally from here that the captain issues orders while sailing."
					],
					"left": "50%",
					"top": "80%"
				}
			],
			"name": "Sterncastle"
		}
	]
}

interface IBattleMapMenuProps
{
	shipIndex: IShipIndexEntry[];
}
class BattleMapMenu extends React.Component<IBattleMapMenuProps> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	render()
	{
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#brochureOffcanvas" aria-controls="brochureOffcanvas">
						Open Brochure
					</button>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#BattleMapMenuToggler" aria-controls="BattleMapMenuToggler" aria-expanded="false" aria-label="Toggle menu">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="BattleMapMenuToggler">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<select
									className="form-select"
								>
									{this.props.shipIndex.map((ship, index: number) =>
										<option
											value={ship.name}
											key={index}
										>
											{ship.name}
										</option>
									)}
								</select>
							</li>
							{/* <li className="nav-item">
								<a className="nav-link" href="#">Link</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
							</li> */}
						</ul>
						{/* <form className="d-flex">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success" type="submit">Search</button>
						</form> */}
					</div>
				</div>
			</nav>

		);
	}
}

interface IBattleMapTestPageProps
{
	data: IShipIndex;
}
interface IBattleMapTestPageState
{
	currentShip: IDeckPlan;
	mapTokens: IMapToken[];
	shipIndex: { name: string, file: string; }[];
}
class BattleMapTestPage extends React.Component<IBattleMapTestPageProps, IBattleMapTestPageState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	constructor(props: IBattleMapTestPageProps)
	{
		super(props);

		window.airshipGrid = 80;
		this.state = {
			currentShip: MACAW,
			mapTokens: [],
			shipIndex: [
				{
					file: "/dnd/res/data/map/ships/deck-plans/galleon.json",
					name: "Galleon"
				},
				{
					file: "/dnd/res/data/map/ships/deck-plans/sloop.json",
					name: "Sloop"
				},
				{
					file: "/dnd/res/data/map/ships/named-ships/macaw.json",
					name: "The Macaw"
				}
			],
		};
	}
	render()
	{
		return (
			<div className="travel-brochure">
				<BattleMapMenu
					shipIndex={this.state.shipIndex}
				/>
				<div className="content">
					<div className="offcanvas offcanvas-start" tabIndex={-1} id="brochureOffcanvas" aria-labelledby="brochureLabel">
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="brochureLabel">{"Test"}</h5>
							<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
						</div>
						<div className="offcanvas-body">
							<Brochure title={this.state.currentShip.name}>
								{this.state.currentShip.decks.map((deck, index: number) =>
									<div key={index}>
										<h2>{deck.name}</h2>
										<ol>
											{deck.locations.map((loc, index: number) =>
												<li key={index}>
													<b>{loc.name}</b>
													{loc.description.map((paragraph, index: number) =>
														<p key={index}>
															{paragraph}
														</p>
													)}
												</li>
											)}
										</ol>

									</div>
								)}
							</Brochure>
						</div>
					</div>
					<BattleMap
						DeckPlan={this.state.currentShip}
					/>
				</div>
			</div>
		);
	}
	// componentDidMount()
	// {
	// 	$.ajax({
	// 		url: "/dnd/res/data/map/tokens.json"
	// 	}).then((tokens: IMapToken[]) =>
	// 	{
	// 		this.setState({ mapTokens: tokens });
	// 	});
	// }
	loadShip = (ship: IDeckPlan) =>
	{
		window.airshipGrid = ship.gridSize;
		this.setState({ currentShip: ship });
	}
}

interface IShipIndexEntry
{
	file: string;
	name: string;
}
interface IShipIndex
{
	deckPlans: { option: string, value: string }[];
	ships: { option: string, value: string }[];
}
const SHIPDATA2: IShipIndex = {
	deckPlans: [],
	ships: [],
};

ReactDOM.render(
	<BattleMapTestPage data={SHIPDATA2} />,
	document.getElementById("react-container")
);