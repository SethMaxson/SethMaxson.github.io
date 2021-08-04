type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
type KillingGameMenuActiveTab = "character" | "evidence" | "map" | "rules" | "prizes" | "trial";
type KillingGameGender = "Male" | "Female";
type KillingGameStatus = "Alive" | "Dead" | "Missing" | "Unknown";

function isOfTypeTab (keyInput: string): keyInput is KillingGameMenuActiveTab {
	return ["character", "evidence", "map", "rules", "prizes", "trial"].includes(keyInput);
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
							<button className={"nav-link" + (this.state.activeTab == "prizes"? " active" : "")} id="prizes-tab" data-bs-toggle="tab" data-bs-target="#prizes" type="button" role="tab" aria-controls="prizes" aria-selected="false" onClick={() => this.changeTab("prizes")}>Prizes</button>
						</li>
						{this.props.showTrialTab && <li className="nav-item" role="presentation">
							<button className={"nav-link" + (this.state.activeTab == "trial"? " active" : "")} id="trial-tab" data-bs-toggle="tab" data-bs-target="#trial" type="button" role="tab" aria-controls="prizes" aria-selected="false" onClick={() => this.changeTab("trial")}>Trial</button>
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

						<div className={"tab-pane h-100 overflow-hidden" + (this.state.activeTab == "prizes" ? " active" : "")} id="prizes" role="tabpanel" aria-labelledby="prizes-tab">
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
}
class KillingGameCharacterPage extends React.Component<IKillingGameCharacterPageProps> {
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
										<a className="nav-link ms-3 my-1" href="#item-3-2">Dislikes</a>
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
									<p>{this.props.character.likes.join(", ")}</p>
									{/* {this.props.character.likes.sort().map((like, index: number) =>
										<p>{like}</p>
									)} */}
									<h5 id="item-3-2">Dislikes</h5>
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
	characters: [
		{
			id: "hatharal",
			name: "Hatharal Ward",
			title: "Ultimate Carpenter",
			image: "/dnd/img/characters/npc/killinggame/hatharal-ward-portrait.png",
			race: "Half-elf",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CG",
			threat: "slightly low",
			intelligence: "average",
			personalityTags: [],
			profession: "carpenter",
			description: "A young adult halfelf, who wears rings, which isn’t cool, but it's cool that they don’t care if they’re cool and comes from an engineer's guild. He is frightened and earthy, and has found work as a mercenary.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.1,
			killingInstinct: 0.2,
		},
		{
			id: "sindri",
			name: "Sindri \"Thunderbonk\" Raulnor",
			title: "Ultimate Royal Taster",
			image: "/dnd/img/characters/npc/killinggame/sindri-portrait.png",
			race: "Gnome",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Adult",
			alignment: "CN",
			threat: "slightly high",
			intelligence: "very low",
			personalityTags: [],
			profession: "royal taster",
			description: "An adult gnome, who has bad hygiene and comes from a strict, religious temple. He is submissive and rigid, and has found work as a royal taster.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 1.0,
			killingInstinct: 0.5,
		},
		{
			id: "gribak",
			name: "Gribak",
			title: "Ultimate Animal Tamer",
			image: "/dnd/img/characters/npc/killinggame/gribak-portrait.png",
			race: "Goblin",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "LG",
			threat: "slightly high",
			intelligence: "average",
			personalityTags: [],
			profession: "knight",
			description: "A young adult goblin, who is not very good at sports and comes from a small village of barbarians. He is instructive and dramatic, and has found work as a knight.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.7,
			killingInstinct: 0.2,
		},
		{
			id: "diggory",
			name: "Diggory Ward",
			title: "Ultimate Host",
			image: "/dnd/img/characters/npc/killinggame/diggory-ward-portrait.png",
			race: "Human",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Adult",
			alignment: "LE",
			threat: "high",
			intelligence: "high",
			personalityTags: [],
			profession: "adventurer",
			description: "An adult human, who knows the location of a huge weapons cache and comes from a bustling underground city. He is playful and impatient, and has found work as an adventurer.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.3,
			killingInstinct: 0.3,
		},
		{
			id: "randal",
			name: "Randal Baker",
			title: "Ultimate Fisher",
			image: "/dnd/img/characters/npc/killinggame/randal-portrait.png",
			race: "Human",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Adult",
			alignment: "CE",
			threat: "medium",
			intelligence: "average",
			personalityTags: [],
			profession: "smuggler",
			description: "An adult human, who is superstitious and comes from a small island. He is solemn and disloyal, and has found work as a smuggler.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.4,
			killingInstinct: 1.0,
		},
		{
			id: "eliot",
			name: "Eliot Brewer",
			title: "Ultimate Kidnapper",
			image: "/dnd/img/characters/npc/killinggame/eliot-portrait.png",
			race: "Water Genasi",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "NE",
			threat: "slightly high",
			intelligence: "average",
			personalityTags: [],
			profession: "monk",
			description: "A young adult genasi, who has connections to underworld crime syndicates and comes from a powerful trading city. He is obnoxious and curious, and has found work as a monk.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.4,
			killingInstinct: 0.2,
		},
		{
			id: "salvini",
			name: "Salvini Devia",
			title: "Ultimate Entrepreneur",
			image: "/dnd/img/characters/npc/killinggame/salvini-portrait.png",
			race: "Ratfolk",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CN",
			threat: "low",
			intelligence: "slightly high",
			personalityTags: [],
			profession: "entrepreneur",
			description: "A young adult ratfolk, who has a burning hatred for pirates and comes from a laid back beach town. He is loud and philosophical, and has found work as a farmhand.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.9,
			killingInstinct: 0.4,
		},
		{
			id: "rosewood",
			name: "Rosewood",
			title: "Ultimate Botanist",
			image: "/dnd/img/characters/npc/killinggame/rosewood-portrait.png",
			race: "Firbolg",
			subrace: "",
			gender: "Male",
			age: -1,
			relativeAge: "Adult",
			alignment: "N",
			threat: "high",
			intelligence: "average",
			personalityTags: [],
			profession: "druid",
			description: "An adult firbolg, who is scared of airship travel and comes from a company of mercenaries and sellswords. He is fatalistic and adventurous, and has found work as a druid.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.5,
			killingInstinct: 0.7,
		},
		{
			id: "yrthraethra",
			name: "Yrthraethra Payne",
			title: "Ultimate Armorer",
			image: "/dnd/img/characters/npc/killinggame/yrthraethra-payne-portrait.png",
			race: "Half-Elf",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CN",
			threat: "high",
			intelligence: "high",
			personalityTags: [],
			profession: "armorer",
			description: "A young adult halfelf, who is a total gear-head and comes from a city no one else has ever heard of. She is humble and harsh, and has found work as an innkeeper.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.1,
			killingInstinct: 0.9,
		},
		{
			id: "chenna",
			name: "Chenna Honeymaker",
			title: "Ultimate Bartender",
			image: "/dnd/img/characters/npc/killinggame/chenna-portrait.png",
			race: "Halfling",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Adult",
			alignment: "LG",
			threat: "medium",
			intelligence: "average",
			personalityTags: [],
			profession: "bartender",
			description: "An adult halfling, who hates wearing armor face masks and comes from a large military outpost. She is risk-taking and agreeable, and has found work as a courtesan.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 1.0,
			killingInstinct: 0.6,
		},
		{
			id: "nora",
			name: "Nora Shaeremae",
			title: "Ultimate Ventriloquist",
			image: "/dnd/img/characters/npc/killinggame/nora-portrait.png",
			race: "Dwarf",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Adult",
			alignment: "CG",
			threat: "low",
			intelligence: "low",
			personalityTags: [],
			profession: "blacksmith",
			description: "An adult dwarf, who wants to open her own bar and comes from a place only she can pronounce. She is emotional and loving, and has found work as a blacksmith.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.8,
			killingInstinct: 0.9,
		},
		{
			id: "nueleth",
			name: "Nueleth Symbaern",
			title: "Ultimate Librarian",
			image: "/dnd/img/characters/npc/killinggame/nueleth-portrait.png",
			race: "Elf",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CN",
			threat: "slightly low",
			intelligence: "average",
			personalityTags: [],
			profession: "philosopher",
			description: "A young adult elf, who has a split personality who is her complete opposite, changes personalities when exposed to a specific stimuli, and comes from a peaceful coastal town. She is restless and careless, and has found work as a philosopher.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.9,
			killingInstinct: 0.3,
		},
		{
			id: "aym",
			name: "Aym",
			title: "Ultimate Painter",
			image: "/dnd/img/characters/npc/killinggame/aym-portrait.png",
			race: "Tiefling",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CG",
			threat: "slightly low",
			intelligence: "slightly high",
			personalityTags: [],
			profession: "sailor",
			description: "An adult tiefling, who is completely mute and comes from the forests of the Verdant Isle. She is unpredictable and argumentative, and has found work as a sailor.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.3,
			killingInstinct: 0.3,
		},
		{
			id: "gaaki",
			name: "Gaaki Clark",
			title: "Ultimate Strongwoman",
			image: "/dnd/img/characters/npc/killinggame/gaaki-clark-portrait.png",
			race: "Half-Orc",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Adult",
			alignment: "LG",
			threat: "very high",
			intelligence: "very low",
			personalityTags: [],
			profession: "mercenary",
			description: "An adult halforc, who has a twin and constantly gets confused for them and comes from an underwater city protected by a magical force field. She is shifty and affable, and has found work as a mercenary.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.5,
			killingInstinct: 0.1,
		},
		{
			id: "forest",
			name: "Bush in the Forest (Forest)",
			title: "Ultimate Acrobat",
			image: "/dnd/img/characters/npc/killinggame/forest-portrait.png",
			race: "Tabaxi",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "CN",
			threat: "medium",
			intelligence: "low",
			personalityTags: [],
			profession: "airship pirate",
			description: "A young adult tabaxi, who speaks to people as though she's being hunted and comes from the remains of a sunken city. She is courageous and self-effacing, and has found work as an airship pirate.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 0.9,
			killingInstinct: 0.8,
		},
		{
			id: "queg",
			name: "Queg",
			title: "Ultimate Carnival Worker",
			image: "/dnd/img/characters/npc/killinggame/queg-portrait.png",
			race: "Tortle",
			subrace: "",
			gender: "Female",
			age: -1,
			relativeAge: "Young Adult",
			alignment: "LE",
			threat: "medium",
			intelligence: "average",
			personalityTags: [],
			profession: "carnival worker",
			description: "A young adult tortle, who gives the best gifts and comes from a disease ridden city. She is irresponsible and sweet, and has found work as a smuggler.",
			status: "Alive",
			dislikes: [],
			likes: [],
			desperation: 1.0,
			killingInstinct: 0.7,
		}
	],
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