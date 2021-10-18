type TravelDirection = "down" | "left" | "right" | "up";

function isOfTypeTravelDirection(keyInput: string): keyInput is TravelDirection
{
	return ["down", "left", "right", "up"].includes(keyInput);
}

function isOfTypeShip (ship: IDeckPlan | IShip): ship is IShip {
	return ship.hasOwnProperty("deckPlan");
}

const GALLEON: IDeckPlan = {
	name: "Galleon",
	width: 2160,
	height: 564,
	gridSize: 80,
	decks: [
		{
			image: "/dnd/img/maps/ships/galleon_deck1.png",
			locations: [
				{
					name: "Lower Deck",
					description: [
						"All of the masts except the bonaventure mast have their steps here, and the pipe leading up to the bilge pumps can also be found runs through the floor here to reach the bilge. Other than that, this area functions in the same manner as the orlop deck, with one exception. Given that it is hard to keep this deck dry, it's not likely that people are quartered here."
					],
					left: "67%",
					top: "50%"
				}
			],
			name: "Lower Deck",
		},
		{
			image: "/dnd/img/maps/ships/galleon_deck2.png",
			locations: [
				{
					name: "Orlop Deck",
					description: [
						"This deck, along with the one below it, provide most of the space for cargo and supplies aboard the ship. As such, both can be divided as necessary by erecting temporary bulkheads. For example, one section might hold the ship's water barrels, while another is filled with spare timber, rope and canvas. There could also be a sealed rooms for holding treasure or weapons. Finally, extra space for passengers, especially soldiers, can be set up here."
					],
					left: "67%",
					top: "50%"
				}
			],
			name: "Orlop Deck",
		},
		{
			image: "/dnd/img/maps/ships/galleon_deck3.png",
			locations: [
				{
					name: "Gun Deck",
					description: [
						"Underneath the main deck is this level. It is most often filled with cannon, with gunports cut in the sides. At least six cannon can fit on a side, with perhaps a couple more facing aft as chase guns. Depending on the needs of the crew, their could be some hammocks strung up in the middle of the deck to provided more sleeping space."
					],
					left: "67%",
					top: "50%"
				},
				{
					name: "Bilge Pump",
					description: [
						"In the middle of the gun deck stands this structure, one that is both loved and hated by sailors. While it can often mean the difference between surviving and returning to life on land, or finding one's death in the cold embrace of the sea, it can also make for brutal labor when the hull is badly damaged. One pipe leads down from here to the lower deck, while another juts out through the ship's starboard side."
					],
					left: "41%",
					top: "50%"
				}
			],
			name: "Gun Deck",
		},
		{
			image: "/dnd/img/maps/ships/galleon_deck4.png",
			locations: [
				{
					name: "Main Deck",
					description: [
						"This broad area is flanked forward by the forecastle, and aft by the quarterdeck. The mainmast juts upward from it, while the cargo hatch and stairways provide access to lower levels. Some vessels carry six cannon on this deck, three to each side."
					],
					left: "44%",
					top: "50%"
				},
				{
					name: "Passenger Cabins",
					description: [
						"Six small cabins in this area can provide sleeping space for a variety of passenger, or even for lesser officers aboard a ship."
					],
					left: "33%",
					top: "50%"
				},
				{
					name: "Great Cabin (Captain)",
					description: [
						"This large cabin provides space for the captain, along with room enough for hosting meals and meetings. A typical arrangement of furnishings could include a bed, writing desk and wardrobe, along with a table and chairs."
					],
					left: "11%",
					top: "68%"
				},
				{
					name: "Crew Quarters",
					description: [
						"Despite this area's relatively small size, it can easily hold a dozen hammocks or more. Given that crew members tend to share this sleeping space when they are not on duty, this allows a large number of sailors to be quartered here."
					],
					left: "82%",
					top: "50%"
				},
				{
					name: "Beak",
					description: [
						"This open area in front of the forecastle is used for little more than storage."
					],
					left: "88%",
					top: "58%"
				}
			],
			name: "Main Deck",
		},
		{
			image: "/dnd/img/maps/ships/galleon_deck5.png",
			locations: [
				{
					name: "Forecastle",
					description: [
						"The raised platform here is common on merchant and military vessels, but pirates often remove it to provide more open space for combat. As a result, members of a pirate crew are forced to sleep on the open deck or to string up a hammock somewhere below decks. The foremast protrudes through here."
					],
					left: "74%",
					top: "50%"
				},
				{
					name: "Quarterdeck",
					description: [
						"A short set of stairs leads from the main deck up to here, and another leads from here up to the poop deck. The mizzenmast rises up through this area."
					],
					left: "35%",
					top: "50%"
				},
				{
					name: "Sailing Master's Cabin",
					description: [
						"The person in charge of plotting the ship's course is quartered here, with a view better than that of anyone other than the lookouts in the rigging overhead. This cabin is outfitted much like the captain's cabin, albeit without the table and chairs for hosting."
					],
					left: "10%",
					top: "62%"
				},
			],
			name: "Upper Deck",
		},
		{
			image: "/dnd/img/maps/ships/galleon_deck6.png",
			locations: [
				{
					name: "Poop Deck",
					description: [
						"At the very aft of the ship is this raised deck, from which the bonaventure mast rises. In the back of this area is the transom, on which the ship's name is usually painted; one or more bright lanterns are often mounted here, too, to provide illumination for crew members working during the night."
					],
					left: "8%",
					top: "50%"
				},
			],
			name: "Poop Deck",
		},
	]
}

interface IShipViewerMenuProps
{
	shipIndex: IShipIndexEntry[];
	changeShip: { (shipFile: string): void };
}
class ShipViewerMenu extends React.Component<IShipViewerMenuProps> {
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
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#shipViewerMenuToggler" aria-controls="shipViewerMenuToggler" aria-expanded="false" aria-label="Toggle menu">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="shipViewerMenuToggler">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<select
									className="form-select"
									onChange={
										(e: React.ChangeEvent<HTMLSelectElement>) =>
										{
											const newShip = e.target.value
											if (newShip != undefined && newShip.length > 0) {
												this.props.changeShip(newShip);
											}
										}
									}
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

interface IShipViewerPageProps
{
	data: IShipIndex;
}
interface IShipViewerPageState
{
	currentShip: IDeckPlan;
	mapTokens: IMapToken[];
	shipIndex: { name: string, file: string; }[];
}
class ShipViewerPage extends React.Component<IShipViewerPageProps, IShipViewerPageState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	constructor(props: IShipViewerPageProps)
	{
		super(props);

		window.airshipGrid = 80;
		this.state = {
			currentShip: GALLEON,
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
				<ShipViewerMenu
					changeShip={this.changeShip}
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
					<DeckPlanViewer
						deckPlan={this.state.currentShip}
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
	changeShip = (shipName: string) =>
	{
		const fileName = this.state.shipIndex.filter(ship => ship.name == shipName)[0].file;
		$.ajax({
			url: fileName,
		}).then((ship: IDeckPlan|IShip) =>
		{
			if (isOfTypeShip(ship))
			{
				$.ajax({
					url: ship.deckPlan
				}).then((deckPlan: IDeckPlan) =>
				{
					const extendedShip = Object.assign({}, deckPlan);
					extendedShip.name = ship.name;

					ship.decks = ship.decks? ship.decks : [];
					for (let i = 0; i < ship.decks.length; i++) {
						const element = ship.decks[i];
						let extendedDeck = extendedShip.decks.filter(deck => deck.name == element.name)[0];
						extendedDeck.crew = element.crew;
					}
					this.loadShip(extendedShip);
				});
			}
			else
			{
				this.loadShip(ship as IDeckPlan);
			}
		});
	}
	loadShip = (ship: IDeckPlan) =>
	{
		window.airshipGrid = ship.gridSize;
		this.setState({ currentShip: ship });
	}
}

// interface IKillingGameRegulationViewerProps
// {
// 	regulations: string[];
// }
// class KillingGameRegulationViewer extends React.Component<IKillingGameRegulationViewerProps> {
// 	render()
// 	{
// 		return (
// 			<div className="bg-dark h-100 overflow-auto p-0">
// 				<ol className="list-group list-group-numbered m-0">
// 					{this.props.regulations.map((rule, index: number) =>
// 						<li
// 							className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0"
// 							dangerouslySetInnerHTML={{ __html: rule }}
// 							key={index}
// 						/>
// 					)}
// 				</ol>
// 			</div>
// 		);
// 	}
// }

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
const SHIPDATA: IShipIndex = {
	deckPlans: [],
	ships: [],
};

ReactDOM.render(
	<ShipViewerPage data={SHIPDATA} />,
	document.getElementById("react-container")
);