type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
type KillingGameMenuActiveTab = "characters" | "evidence" | "map" | "rules" | "shop" | "trial";
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
	showStatic: boolean;
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
			selectedDiorama: selectedDiorama,
			showStatic: false
		};
	}
	render()
	{
		return (
			<div className="h-100 w-100">
				{this.state.showStatic && <div className="static"></div>}
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
			activeTab: (tab && isOfTypeTab(tab))? tab : "characters"
		};
	}
	render()
	{
		return (
			<div className="container killing-game-nav h-100 px-0">
				<div className="d-flex h-100 w-100 flex-column">
					<ul className="nav nav-tabs bg-dark" role="tablist">
						<KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="Candidates" id="characters" />
						<KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="Map" id="map" />
						<KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="Rules" id="rules" />
						<KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="Shop" id="shop" />
						{this.props.showTrialTab && <KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="Trial" id="trial" />}
						{this.props.showEvidenceTab && <KillingGameViewerNavTab activeTab={this.state.activeTab} changeTab={this.changeTab} displayName="File" id="evidence" />}
						{/* {(storage.userName == "" || storage.userName == undefined) && <li className="me-0 ms-auto">
							<LoginButton redirectUrl="/dnd/pages/adventures/killing-game.html" />
						</li>} */}
					</ul>

					<div className="tab-content row flex-grow-1 flex-shrink-1 flex-column align-items-stretch overflow-hidden bg-dark">
						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "characters" ? " active" : "")} id="characters" role="tabpanel" aria-labelledby="characters-tab">
							<KillingGameCharacterIndex characters={this.props.data.characters} displayCharacter={this.props.displayCharacter} />
						</div>

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "map" ? " active" : "")} id="map" role="tabpanel" aria-labelledby="map-tab">
							<LayeredMap layers={this.props.data.mapLayers} displayStack={false} />
						</div>

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "rules" ? " active" : "")} id="rules" role="tabpanel" aria-labelledby="rules-tab">
							<KillingGameRegulationViewer regulations={this.props.data.regulations} />
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


const KillingGameFriendshipTitles = [
	"Strangers",
	"Acquaintances",
	"Casual Friends",
	"Friends",
	"Close Friends",
	"Very Close Friends",
	"BFFs"
];
interface IKillingGameCharacterPageProps
{
	character: IKillingGameCharacter;
	close: { (): void };
	/** Should be between 1 and 6 */
	friendshipLevel: number;
}
class KillingGameCharacterPage extends React.Component<IKillingGameCharacterPageProps> {
	public static defaultProps = {
		friendshipLevel: Sc.LocalStorage.isGM? 6 : 1
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
						<div className="col-auto overflow-auto bg-dark text-light">
							<div className="row">
								<div className="col order-2 order-md-1" data-bs-target="#navbar-example3" data-bs-offset="0">
									<h3 id="item-1" className="d-none d-lg-block">{this.props.character.name} | <i>{this.props.character.title}</i></h3>
									<h5 id="item-1-1">Description</h5>
									<p>{this.props.character.description}</p>
									<h4 id="item-3">Interests</h4>
									<h5 id="item-3-1">Likes</h5>
									<p>{(this.props.friendshipLevel > 1? this.props.character.likes : this.props.character.likes.concat(this.props.character.loves)).join(", ")}</p>
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



interface IKillingGameCharacterIndexProps
{
	characters: IKillingGameCharacter[];
	displayCharacter: { (character: IKillingGameCharacter): void };
}
class KillingGameCharacterIndex extends React.Component<IKillingGameCharacterIndexProps> {
	render()
	{
		return (
			<div className="list-group h-100 overflow-auto">
				{this.props.characters.sort((a, b) => a.status > b.status && 1 || -1).sort((a, b) => a.name > b.name && a.status == b.status && 1 || a.status == b.status && -1 || 0).map((character, index: number) =>
					<CharacterLink character={character} key={index} onClick={this.props.displayCharacter} />
				)}
			</div>
		);
	}
}

interface IKillingGameRegulationViewerProps
{
	regulations: string[];
}
class KillingGameRegulationViewer extends React.Component<IKillingGameRegulationViewerProps> {
	render()
	{
		return (
			<div className="bg-dark h-100 overflow-auto p-0">
				<ol className="list-group list-group-numbered m-0">
					{this.props.regulations.map((rule, index: number) =>
						<li
							className="list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0"
							dangerouslySetInnerHTML={{ __html: rule }}
							key={index}
						/>
					)}
				</ol>
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

interface IKillingGameViewerNavTabProps
{
	activeTab: KillingGameMenuActiveTab;
	changeTab: { (tab: KillingGameMenuActiveTab): void }
	displayName: string;
	id: KillingGameMenuActiveTab;
}
class KillingGameViewerNavTab extends React.Component<IKillingGameViewerNavTabProps> {
	render()
	{
		return (
			<li className="nav-item" role="presentation">
				<button className={"nav-link" + (this.props.activeTab == this.props.id ? " active" : "")} id={this.props.id + "-tab"} data-bs-toggle="tab" data-bs-target={"#" + this.props.id} type="button" role="tab" aria-controls={this.props.id} aria-selected="false" onClick={() => this.props.changeTab(this.props.id)}>{this.props.displayName}</button>
			</li>
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
				<span className={"mx-1 " + genderColor} style={{ fontFamily: "Arial, Helvatica, sans-serif" }}>{this.props.character.gender == "Female"? "♀" : "♂"}</span>
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
	regulations: string[];
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
	],
	regulations: [
		"All candidates will remain within <i>Ascendant Aspirations Academy</i> until such time as they are released by the headmaster.",
		"\"Nighttime\" is from 10 pm to 7 am. Some areas are off-limits at night, so please exercise caution.",
		"Sleeping anywhere other than the inn will be seen as sleeping in class and punished accordingly.",
		"With minimal restrictions, you are free to explore <i>Ascendant Aspirations Academy</i> at your discretion.",
		"Violence against the headmaster is strictly prohibited, as is destruction of floating orbs.",
		"An anointed who kills another candidate will graduate, but only if they can convince the other candidates that they are not the anointed. If the anointed succeeds, the anointed can leave, and all other living candidates will be killed in the anointed's place. If the anointed is proven guilty, the anointed alone will be rightfully executed.",
		"Candidates shall not remove training weapons from the <i>Combat Training Area</i>.",
		"Candidates shall not remove bows or crossbows from the <i>Archery Range</i>.",
		"After three or more people discover a dead body, a “body discovery announcement” shall be made to inform everyone of the death.",
		// "Once a murder takes place, a class trial will begin shortly thereafter. Participation is mandatory for all surviving candidates.",
		// "If the guilty party is exposed during the class trial, they alone will be executed.",
		// "If the guilty party is not exposed, they alone will graduate, and all remaining candidates will be executed.",
		// "Lending your e-Handbook to another candidate is strictly prohibited.",
		"Each candidate may only kill a maximum of two people during any single \"Killing Game.\"",
		// "Attempting to break into locked rooms is strictly prohibited.",
		"Additional regulations may be added if necessary."
	]
};

ReactDOM.render(
	<KillingGameViewer data={KILLINGGAMEDATA} />,
	document.getElementById("killing-game-panel")
);