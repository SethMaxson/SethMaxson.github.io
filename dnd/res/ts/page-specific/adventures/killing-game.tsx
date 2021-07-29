type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
type KillingGameGender = "Male" | "Female";
type KillingGameStatus = "Alive" | "Dead" | "Missing" | "Unknown";

interface IKillingGameCharacter extends INPC
{
	/**Should be 0-1 */
	desperation: number;
	dmNotes: string[];
	gender: KillingGameGender;
	image: string;
	information: string[];
	/**Should be 0-1 */
	killingInstinct: number;
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
		let dioramaName = GetURLParameter("diorama");
		let matches: IDioramaProps[] = [];
		if (dioramaName) {
			matches = matches.concat(this.props.data.misc.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
		}
		let selectedDiorama = matches.length > 0 ? matches[0] : this.props.data.misc[0];
		let selectedCharacter = this.props.data.characters[0];

		this.state = {
			dioramaShownAtLoad: matches.length > 0,
			displayType: "Menu",
			selectedCharacter: selectedCharacter,
			selectedDiorama: selectedDiorama
		};
	}
	render()
	{
		return (
			<div className="h-100 w-100">
				{this.state.displayType == "Menu" && <KillingGameViewerNav data={this.props.data} displayCharacter={this.viewCharacter} />}
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
}
class KillingGameViewerNav extends React.Component<IKillingGameViewerNavProps> {
	render()
	{
		return (
			<div className="container killing-game-nav h-100">
				<ul className="nav nav-tabs sticky-top fixed-top bg-dark" role="tablist">
					<li className="nav-item" role="presentation">
						<button className="nav-link active" id="characters-tab" data-bs-toggle="tab" data-bs-target="#characters" type="button" role="tab" aria-controls="characters" aria-selected="true">Contestants</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="map-tab" data-bs-toggle="tab" data-bs-target="#map" type="button" role="tab" aria-controls="map" aria-selected="false">Map</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="rules-tab" data-bs-toggle="tab" data-bs-target="#rules" type="button" role="tab" aria-controls="rules" aria-selected="false">Rules</button>
					</li>
					{/* <li className="nav-item" role="presentation">
						<button className="nav-link" id="misc-tab" data-bs-toggle="tab" data-bs-target="#misc" type="button" role="tab" aria-controls="misc" aria-selected="false">Misc.</button>
					</li> */}
				</ul>
				<div className="tab-content row h-100">
					<div className="tab-pane active h-100" id="characters" role="tabpanel" aria-labelledby="characters-tab">

						<div className="list-group h-100 overflow-auto">
							{this.props.data.characters.map((character, index: number) =>
								<CharacterLink character={character} key={index} onClick={this.props.displayCharacter} />
							)}
						</div>

					</div>

					<div className="tab-pane h-100" id="map" role="tabpanel" aria-labelledby="map-tab">

						<LayeredMap layers={this.props.data.mapLayers} displayStack={false} />

					</div>

					<div className="tab-pane h-100" id="rules" role="tabpanel" aria-labelledby="rules-tab">
						<div className="bg-light h-100 overflow-auto">
							<ol className="list-group list-group-numbered">
								<li className="list-group-item">
									All characters will live within the area they are trapped in. There is no limit as to the length of their stay.
								</li>
								<li className="list-group-item">
									"Nighttime" is from 10 pm to 7 am. Some areas are off-limits at night, so please exercise caution.
								</li>
								<li className="list-group-item">
									Sleeping anywhere other than the dormitory will be seen as sleeping in class and punished accordingly.
								</li>
								<li className="list-group-item">
									With minimal restrictions, you are free to explore Ascendant Aspirations Academy at your discretion.
								</li>
								<li className="list-group-item">
									Violence against the headmaster is strictly prohibited, as is destruction of floating orbs.
								</li>
								<li className="list-group-item">
									An anointed who kills another character will graduate, but only if they can convince the other characters that they are not the anointed. If the anointed succeeds, the anointed can leave, and all other living characters will be killed in the anointed's place. If the anointed is proven guilty, the anointed alone will be rightfully executed.
								</li>
								<li className="list-group-item">
									After three or more people discover a dead body, a “body discovery announcement” shall be made to inform everyone of the death.
								</li>
								{/* <li className="list-group-item">
										Once a murder takes place, a class trial will begin shortly thereafter. Participation is mandatory for all surviving students.
								</li> */}
								{/* <li className="list-group-item">
										If the guilty party is exposed during the class trial, they alone will be executed.
								</li> */}
								{/* <li className="list-group-item">
										If the guilty party is not exposed, they alone will graduate, and all remaining students will be executed.
								</li> */}
								{/* <li className="list-group-item">
										Lending your e-Handbook to another student is strictly prohibited.
								</li> */}
								{/* <li className="list-group-item">
										The guilty party may only kill a maximum of two people during any single "Killing Game."
								</li> */}
								{/* <li className="list-group-item">
										Attempting to break into locked rooms is strictly prohibited.
								</li> */}
								{/* <li className="list-group-item">Rule</li> */}
								<li className="list-group-item">
									Additional regulations may be added if necessary.
								</li>
							</ol>
						</div>
					</div>
					{/* <div className="tab-pane" id="misc" role="tabpanel" aria-labelledby="misc-tab">

						<div className="list-group">
							{this.props.data.misc.map((diorama, index: number) =>
								<DioramaLink diorama={diorama} key={index} onClick={this.changeDiorama} />
							)}
						</div>
					</div> */}
				</div>
			</div>

		);
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

					<div className="row m-0">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><a href="#" onClick={this.props.close}>Home</a></li>
								<li className="breadcrumb-item active" aria-current="page">{this.props.character.name}</li>
							</ol>
						</nav>
					</div>
					<div className="row bg-dark flex-grow-1 m-0 overflow-auto">
						<div className="col-sm-2">
							<nav id="navbar-example3" className="navbar navbar-light bg-light flex-column align-items-stretch p-2 m-2 rounded">
								<a className="navbar-brand" href="#">Navbar</a>
								<nav className="nav nav-pills flex-column">
									<a className="nav-link" href="#item-1">Summary</a>
									<nav className="nav nav-pills flex-column">
										<a className="nav-link ms-3 my-1" href="#item-1-1">Description</a>
										<a className="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
									</nav>
									<a className="nav-link" href="#item-2">Item 2</a>
									<a className="nav-link" href="#item-3">Item 3</a>
									<nav className="nav nav-pills flex-column">
										<a className="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
										<a className="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
									</nav>
								</nav>
							</nav>
						</div>

						<div className="col-auto overflow-auto bg-white">
							<div className="bg-white flex-column" data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0">
								<h3 id="item-1">{this.props.character.name} | <i>{this.props.character.title}</i></h3>
								<h5 id="item-1-1">Description</h5>
								<p>{this.props.character.relativeAge} {this.props.character.race}</p>
								<p>{this.props.character.description}</p>
								<h5 id="item-1-2">Item 1-2</h5>
								<p>...</p>
								<h4 id="item-2">Item 2</h4>
								<p>...</p>
								<h4 id="item-3">Item 3</h4>
								<p>...</p>
								<h5 id="item-3-1">Item 3-1</h5>
								<p>...</p>
								<h5 id="item-3-2">Item 3-2</h5>
								<p>...</p>
							</div>
						</div>
					</div>
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
		let statusColor = this.props.character.status == "Alive" ? " bg-success" : this.props.character.status == "Dead" ? " bg-danger" : "bg-secondary";
		return (
			<button className="list-group-item list-group-item-action" onClick={(ev) => this.props.onClick(this.props.character)}>
				{this.props.character.name}
				<span className={"badge position-absolute top-50 end-0 translate-middle-y me-1 rounded-pill " + statusColor}>{this.props.character.status}</span>
			</button>
		);
	}
}

interface IKillingGameIndex
{
	characters: IKillingGameCharacter[];
	mapLayers: string[];
	misc: IDioramaProps[];
}
const KILLINGGAMEDATA: IKillingGameIndex = {
	characters: [
		{
			id: "hatharal",
			name: "Hatharal Ward",
			title: "Ultimate Carpenter",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.1,
			killingInstinct: 0.2,
		},
		{
			id: "sindri",
			name: "Sindri \"Thunderbonk\" Raulnor",
			title: "Ultimate Royal Taster",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 1.0,
			killingInstinct: 0.5,
		},
		{
			id: "gribak",
			name: "Gribak",
			title: "Ultimate Animal Tamer",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.7,
			killingInstinct: 0.2,
		},
		{
			id: "diggory",
			name: "Diggory Ward",
			title: "Ultimate Host",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.3,
			killingInstinct: 0.3,
		},
		{
			id: "randal",
			name: "Randal Baker",
			title: "Ultimate Fisher",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.4,
			killingInstinct: 1.0,
		},
		{
			id: "eliot",
			name: "Eliot Brewer",
			title: "Ultimate Kidnapper",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.4,
			killingInstinct: 0.2,
		},
		{
			id: "salvini",
			name: "Salvini Devia",
			title: "Ultimate Entrepreneur",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.9,
			killingInstinct: 0.4,
		},
		{
			id: "rosewood",
			name: "Rosewood",
			title: "Ultimate Botanist",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.5,
			killingInstinct: 0.7,
		},
		{
			id: "yrthraethra",
			name: "Yrthraethra Payne",
			title: "Ultimate Armorer",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.1,
			killingInstinct: 0.9,
		},
		{
			id: "chenna",
			name: "Chenna Honeymaker",
			title: "Ultimate Bartender",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 1.0,
			killingInstinct: 0.6,
		},
		{
			id: "nora",
			name: "Nora Shaeremae",
			title: "Ultimate Ventriloquist",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.8,
			killingInstinct: 0.9,
		},
		{
			id: "nueleth",
			name: "Nueleth Symbaern",
			title: "Ultimate Librarian",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.9,
			killingInstinct: 0.3,
		},
		{
			id: "aym",
			name: "Aym",
			title: "Ultimate Painter",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.3,
			killingInstinct: 0.3,
		},
		{
			id: "gaaki",
			name: "Gaaki Clark",
			title: "Ultimate Strongwoman",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.5,
			killingInstinct: 0.1,
		},
		{
			id: "forest",
			name: "Bush in the Forest (Forest)",
			title: "Ultimate Acrobat",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 0.9,
			killingInstinct: 0.8,
		},
		{
			id: "queg",
			name: "Queg",
			title: "Ultimate Carnival Worker",
			image: "",
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
			dmNotes: [],
			information: [],
			desperation: 1.0,
			killingInstinct: 0.7,
		}
	],
	mapLayers: [
		"/dnd/img/maps/adventures/killinggame/floor1.png",
		"/dnd/img/maps/adventures/killinggame/floor2-1.png",
		"/dnd/img/maps/adventures/killinggame/floor3.png",
		"/dnd/img/maps/adventures/killinggame/floor4.png",
		"/dnd/img/maps/adventures/killinggame/floor5.png"
	],
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