type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
type KillingGameMenuActiveTab = "character" | "evidence" | "map" | "rules" | "shop" | "trial";
type KillingGameGender = "Male" | "Female";
type KillingGameStatus = "Alive" | "Dead" | "Missing" | "Unknown";

function isOfTypeTab (keyInput: string): keyInput is KillingGameMenuActiveTab {
	return ["character", "evidence", "map", "rules", "shop", "trial"].includes(keyInput);
  }

interface IKillingGameCharacter extends INPC
{
	/**Should be 0-1 */
	desperation: number;
	dmNotes?: string[];
	dislikes: string[];
	gender: KillingGameGender;
	image: string;
	/**Should be 0-1 */
	killingInstinct: number;
	likes: string[];
	loves: string[];
	status: KillingGameStatus;
	title: string;
}


interface IKillingGameViewerProps
{
	data: IKillingGameIndex;
}
interface IKillingGameViewerState
{
	dioramaShownAtLoad: boolean;
	displayType: KillingGameMenuDisplay;
	selectedCharacter: IKillingGameCharacter;
	selectedDiorama: IDioramaProps;
}
class KillingGameViewer extends React.Component<IKillingGameViewerProps, IKillingGameViewerState> {
	constructor(props: IKillingGameViewerProps)
	{
		super(props);
		this.viewCharacter = this.viewCharacter.bind(this);
		this.viewDiorama = this.viewDiorama.bind(this);
		this.viewMenu = this.viewMenu.bind(this);
		let view = GetURLParameter("view");
		let characterName = GetURLParameter("name");
		let matches: IKillingGameCharacter[] = [];
		if (characterName) {
			matches = matches.concat(this.props.data.characters.filter(el => el.name.toLowerCase() == characterName?.toLowerCase()));
		}
		let selectedDiorama = this.props.data.misc[0];
		let selectedCharacter = matches.length > 0 ? matches[0] : this.props.data.characters[0];

		this.state = {
			dioramaShownAtLoad: matches.length > 0,
			displayType: view == "character" ? "Character" : "Menu",
			selectedCharacter: selectedCharacter,
			selectedDiorama: selectedDiorama
		};
	}
	render()
	{
		return (
			<div className="h-100 w-100">
				{this.state.displayType == "Menu" && <KillingGameViewerNav data={this.props.data} displayCharacter={this.viewCharacter} showEvidenceTab={false} showTrialTab={false} />}
				{this.state.displayType == "Character" && <KillingGameCharacterPage character={this.state.selectedCharacter} close={this.viewMenu} />}
			</div>

		);
	}
	viewCharacter(character: IKillingGameCharacter)
	{
		this.setState({ selectedCharacter: character, displayType: "Character" });
	}
	viewDiorama(diorama: IDioramaProps)
	{
		this.setState({ selectedDiorama: diorama, displayType: "Diorama" });
	}
	viewMenu()
	{
		this.setState({ displayType: "Menu" });
	}

}


interface IKillingGameViewerNavProps
{
	data: IKillingGameIndex;
	displayCharacter: { (character: IKillingGameCharacter): void };
	showEvidenceTab: boolean;
	showTrialTab: boolean;
}
interface IKillingGameViewerNavState
{
	activeTab: KillingGameMenuActiveTab;
}
class KillingGameViewerNav extends React.Component<IKillingGameViewerNavProps, IKillingGameViewerNavState> {
	constructor(props: IKillingGameViewerNavProps)
	{
		super(props);
		this.changeTab = this.changeTab.bind(this);

		let tab = GetURLParameter("tab")?.toLowerCase();

		this.state = {
			activeTab: (tab && isOfTypeTab(tab))? tab : "character"
		};
	}
	render()
	{
		return (
			<div className="container killing-game-nav h-100 px-0">
				<div className="d-flex h-100 w-100 flex-column">
					<ul className="nav nav-tabs bg-dark" role="tablist">
						<li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "character" ? " active" : "")} id="characters-tab" data-bs-toggle="tab" data-bs-target="#characters" type="button" role="tab" aria-controls="characters" aria-selected="true" onClick={() => this.changeTab("character")}>Candidates</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "map"? " active" : "")} id="map-tab" data-bs-toggle="tab" data-bs-target="#map" type="button" role="tab" aria-controls="map" aria-selected="false" onClick={() => this.changeTab("map")}>Map</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "rules"? " active" : "")} id="rules-tab" data-bs-toggle="tab" data-bs-target="#rules" type="button" role="tab" aria-controls="rules" aria-selected="false" onClick={() => this.changeTab("rules")}>Rules</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "shop"? " active" : "")} id="shop-tab" data-bs-toggle="tab" data-bs-target="#shop" type="button" role="tab" aria-controls="shop" aria-selected="false" onClick={() => this.changeTab("shop")}>Shop</button>
						</li>
						{this.props.showTrialTab && <li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "trial"? " active" : "")} id="trial-tab" data-bs-toggle="tab" data-bs-target="#trial" type="button" role="tab" aria-controls="shop" aria-selected="false" onClick={() => this.changeTab("trial")}>Trial</button>
						</li>}
						{this.props.showEvidenceTab && <li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "evidence"? " active" : "")} id="file-tab" data-bs-toggle="tab" data-bs-target="#file" type="button" role="tab" aria-controls="file" aria-selected="false" onClick={() => this.changeTab("evidence")}>File</button>
						</li>}
					</ul>

					<div className="tab-content row flex-grow-1 flex-shrink-1 flex-column align-items-stretch overflow-hidden">
						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "character" ? " active" : "")} id="characters" role="tabpanel" aria-labelledby="characters-tab">
							<div className="list-group h-100 overflow-auto">
								{this.props.data.characters.sort((a, b) => a.name > b.name && 1 || -1).map((character, index: number) =>
									<CharacterLink character={character} key={index} onClick={this.props.displayCharacter} />
								)}
							</div>
						</div>

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "map" ? " active" : "")} id="map" role="tabpanel" aria-labelledby="map-tab">
							<LayeredMap layers={this.props.data.mapLayers} displayStack={false} />
						</div>

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "rules" ? " active" : "")} id="rules" role="tabpanel" aria-labelledby="rules-tab">
							<div className="bg-dark h-100 overflow-auto p-0">
								<ol className="list-group list-group-numbered m-0">
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										All candidates will live within the area they are trapped in. There is no limit as to the length of their stay.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										"Nighttime" is from 10 pm to 7 am. Some areas are off-limits at night, so please exercise caution.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										Sleeping anywhere other than the dormitory will be seen as sleeping in class and punished accordingly.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										With minimal restrictions, you are free to explore Ascendant Aspirations Academy at your discretion.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										Violence against the headmaster is strictly prohibited, as is destruction of floating orbs.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										An anointed who kills another candidate will graduate, but only if they can convince the other candidates that they are not the anointed. If the anointed succeeds, the anointed can leave, and all other living candidates will be killed in the anointed's place. If the anointed is proven guilty, the anointed alone will be rightfully executed.
									</li>
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										After three or more people discover a dead body, a “body discovery announcement” shall be made to inform everyone of the death.
									</li>
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											Once a murder takes place, a class trial will begin shortly thereafter. Participation is mandatory for all surviving students.
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											If the guilty party is exposed during the class trial, they alone will be executed.
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											If the guilty party is not exposed, they alone will graduate, and all remaining students will be executed.
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											Lending your e-Handbook to another student is strictly prohibited.
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											The guilty party may only kill a maximum of two people during any single "Killing Game."
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
											Attempting to break into locked rooms is strictly prohibited.
									</li> */}
									{/* <li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">Rule</li> */}
									<li className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0">
										Additional regulations may be added if necessary.
									</li>
								</ol>
							</div>
						</div>

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "shop" ? " active" : "")} id="shop" role="tabpanel" aria-labelledby="shop-tab">
							<GiftMachine gifts={GIFTS} />
						</div>

						{this.props.showTrialTab && <div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "trial" ? " active" : "")} id="trial" role="tabpanel" aria-labelledby="trial-tab">
							<KillingGameVoteResults image={KILLINGGAMEDATA.characters[0].image} percentage={85} />
						</div>}

						{this.props.showEvidenceTab && <div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "evidence" ? " active" : "")} id="file" role="tabpanel" aria-labelledby="file-tab">

						</div>}
					</div>
				</div>
			</div>

		);
	}
	changeTab(tab: KillingGameMenuActiveTab)
	{
		this.setState({ activeTab: tab });
	}
}

interface IKillingGameCharacterPageProps
{
	character: IKillingGameCharacter;
	close: { (): void };
	/** Should be between 1 and 6 */
	friendshipLevel: number;
}
class KillingGameCharacterPage extends React.Component<IKillingGameCharacterPageProps> {
	public static defaultProps = {
		friendshipLevel: 1
    };
	render()
	{
		return (
			<div className="container h-100 w-100 overflow-hidden p-0">
				<div className="h-100 w-100 d-flex flex-column align-items-stretch overflow-hidden">

					<div className="row m-0 pt-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><a href="#" onClick={this.props.close}>Home</a></li>
								<li className="breadcrumb-item active" aria-current="page">{this.props.character.name}</li>
							</ol>
						</nav>
					</div>
					<div className="row bg-dark flex-grow-1 m-0 overflow-auto">
						{/* <div className="col-4 col-sm-2">
							<nav id="navbar-example3" className="navbar navbar-light bg-light flex-column align-items-stretch p-2 m-2 rounded">
								<a className="navbar-brand" href="#">Navbar</a>
								<nav className="nav nav-pills flex-column">
									<a className="nav-link" href="#item-1">Summary</a>
									<nav className="nav nav-pills flex-column">
										<a className="nav-link ms-3 my-1" href="#item-1-1">Description</a>
										<a className="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
									</nav>
									<a className="nav-link" href="#item-2">Item 2</a>
									<a className="nav-link" href="#item-3">Interests</a>
									<nav className="nav nav-pills flex-column">
										<a className="nav-link ms-3 my-1" href="#item-3-1">Likes</a>
										<a className="nav-link ms-3 my-1" href="#item-3-2">Loves</a>
										<a className="nav-link ms-3 my-1" href="#item-3-3">Dislikes</a>
									</nav>
								</nav>
							</nav>
						</div> */}

						<div className="col-auto overflow-auto bg-dark text-light">
							<div className="row">
								{/* <div className="col-auto" data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0"> */}
								<div className="col order-2 order-md-1" data-bs-target="#navbar-example3" data-bs-offset="0">
									<h3 id="item-1" className="d-none d-lg-block">{this.props.character.name} | <i>{this.props.character.title}</i></h3>
									<h5 id="item-1-1">Description</h5>
									<p>{this.props.character.description}</p>
									<h4 id="item-3">Interests</h4>
									<h5 id="item-3-1">Likes</h5>
									<p>{(this.props.friendshipLevel > 1? this.props.character.likes : this.props.character.likes.concat(this.props.character.loves)).join(", ")}</p>
									{/* {this.props.character.likes.sort().map((like, index: number) =>
										<p>{like}</p>
									)} */}
									{this.props.friendshipLevel > 1 && <div>
										<h5 id="item-3-2">Loves</h5>
										<p>{this.props.character.loves.join(", ")}</p>
									</div>}
									<h5 id="item-3-3">Dislikes</h5>
									<p>{this.props.character.dislikes.join(", ")}</p>
								</div>
								<div className="col-auto col-md-3 order-1 order-md-2 py-2">
									<div className="card bg-secondary">
										<img className="card-img-top img-fluid bg-secondary bg-gradient border border-1 border-dark rounded" src={this.props.character.image} alt={this.props.character.name} />
										<div className="card-body">
											<h5 className="card-title">{this.props.character.name}</h5>
											<p className="card-text">
												<h6><i>{this.props.character.title}</i></h6>
												Age: {this.props.character.relativeAge}<br />
												Gender: {this.props.character.gender}<br />
												Species: {this.props.character.race}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

interface IKillingGameVoteResultsProps
{
	image: string;
	percentage: number;
}
class KillingGameVoteResults extends React.Component<IKillingGameVoteResultsProps> {
	render()
	{
		return (
			<div className="h-100 w-100 overflow-hidden p-0 overflow-auto">
				<div className="row justify-content-md-center py-2">
					<div className="col-auto col-md-3">
						<div className="card">
							<img className="card-img-top img-fluid" src={this.props.image} />
						</div>
					</div>
					<div className="col-auto col-md-3 d-none d-lg-block">
						<div className="card">
							<img className="card-img-top img-fluid" src={this.props.image} />
						</div>
					</div>
					<div className="col-auto col-md-3 d-none d-lg-block">
						<div className="card">
							<img className="card-img-top img-fluid" src={this.props.image} />
						</div>
					</div>
				</div>
				<div className="row bg-dark text-center text-light">
					<h3>{this.props.percentage}%</h3>
				</div>
			</div>
		);
	}
}

interface ICharacterLinkProps
{
	character: IKillingGameCharacter;
	onClick: { (character: IKillingGameCharacter): void };
}
class CharacterLink extends React.Component<ICharacterLinkProps> {
	render()
	{
		let statusColor = this.props.character.status == "Alive" ? " bg-success" : this.props.character.status == "Dead" ? "bg-danger" : "bg-secondary";
		let genderColor = this.props.character.gender == "Female" ? " text-danger" : "text-primary";
		return (
			<button className="list-group-item list-group-item-action list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0" onClick={(ev) => this.props.onClick(this.props.character)}>
				{this.props.character.name}
				<span className={"mx-1 " + genderColor} style={{ fontFamily: "Arial" }}>{this.props.character.gender == "Female"? "♀" : "♂"}</span>
				<span className={"badge position-absolute top-50 end-0 translate-middle-y me-1 rounded-pill " + statusColor}>{this.props.character.status}</span>
			</button>
		);
	}
}

interface IKillingGameIndex
{
	characters: IKillingGameCharacter[];
	mapLayers: IMapLayer[];
	misc: IDioramaProps[];
}
const KILLINGGAMEDATA: IKillingGameIndex = {
	characters: KILLINGGAMECHARACTERS,
	mapLayers: AscendantAspirationsAcademy,
	misc: [
		{
			title: "Temple of the Forest",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		}
	]
};

ReactDOM.render(
	<KillingGameViewer data={KILLINGGAMEDATA} />,
	document.getElementById("killing-game-panel")
);