type OrganizationViewerTab = "guilds" | "mercenaries";

function isOfTypeGuildMenuTab (keyInput: string): keyInput is OrganizationViewerTab {
	return ["guilds", "mercenaries"].includes(keyInput);
}



interface IGuildNameProps
{
	name: string;
	tagline: string;
}
class GuildName extends React.Component<IGuildNameProps> {
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

interface IGuildSymbolProps
{
	image: string;
}
class GuildSymbol extends React.Component<IGuildSymbolProps> {
	render()
	{
		return (
			<img src={this.props.image} alt="symbol" style={{ width: "15%", float: "right", marginRight:"10px"}} />
		);
	}
}

interface IGuild
{
	dmNotes: string[];
	information: string[];
	name: string;
	tagline: string;
	image?: string;
}

interface IGuildViewProps
{
	JsonObject: IGuild;
}
interface IGuildViewState { }

class GuildView extends React.Component<IGuildViewProps, IGuildViewState> {
	constructor(props: IGuildViewProps) {
		super(props);
	}

	render()
	{
		return (
			<div className="overflow-auto card mt-2 mt-lg-3 bg-body">
				<div className="card-body p-1 p-lg-3">
					<div className="name">{this.props.JsonObject.name}</div>
					<p className="ps-1 text-secondary border-bottom"><i>{this.props.JsonObject.tagline}</i></p>
					<div className="ps-2 ps-lg-3">
						{(this.props.JsonObject.image && this.props.JsonObject.image.length > 0) && <GuildSymbol image={this.props.JsonObject.image} />}
						{this.props.JsonObject.information.map((paragraph, index: number) =>
							<ParagraphFromRawHTML text={paragraph} key={index} />
						)}
					</div>
				</div>
			</div>
		)
	}
}


interface IGuildViewerProps
{
	guilds: IGuild[];
}
interface IGuildViewerState
{
	selectedGuild: IGuild;
	selectedIndex: number;
	viewingItem: boolean;
}
class GuildViewer extends React.Component<IGuildViewerProps, IGuildViewerState> {
	constructor(props: IGuildViewerProps)
	{
		super(props);
		this.changeGuild = this.changeGuild.bind(this);
		let GuildName = GetURLParameter("name");
		let matchingGuilds: IGuild[] = [];
		if (GuildName) {
			matchingGuilds = this.props.guilds.filter(el => el.name.toLowerCase() == GuildName?.toLowerCase());
		}
		let selectedGuild = matchingGuilds.length > 0? matchingGuilds[0] : this.props.guilds[0]

		this.state = {
			selectedGuild: selectedGuild,
			selectedIndex: 0,
			viewingItem: false,
		};
	}
	render()
	{
		let filterableItems: IFilterableItemObject[] = this.props.guilds.map(a => { return { text: a.name, tags: [] } });
		return (
			<div className="bg-dark bg-gradient" style={{ padding: "0px", height: "100%" }}>
				<div className="container-sm bg-body d-flex flex-column position-relative" style={{ padding: "0px", height: "100%", overflowY: "hidden" }}>
					<FilterPanel
						className="position-absolute top-0 start-0 w-100 h-100"
						items={filterableItems}
						selectedIndex={this.state.selectedIndex}
						onChange={this.changeGuild}
					/>
					{
						this.state.viewingItem &&
						<div className="position-absolute top-0 start-0 w-100 h-100 bg-secondary d-flex flex-column p-2 p-lg-3" style={{ zIndex: 10 }}>
							<div className="text-start">
								<button className="btn btn-light" onClick={() => { this.setState({ viewingItem: false }) }}>&lt; Back to Guild Select</button>
							</div>
							<GuildView JsonObject={this.state.selectedGuild} />
						</div>
					}
				</div>
			</div>

		);
	}
	changeGuild(index: number)
	{
		this.setState({ selectedGuild: this.props.guilds[index], selectedIndex: index, viewingItem: true });
	}
}

interface IOrganizationViewerProps { }
interface IOrganizationViewerState
{
	selectedTab: OrganizationViewerTab;
}
class OrganizationViewer extends React.Component<IOrganizationViewerProps, IOrganizationViewerState> {
	constructor(props: IOrganizationViewerProps)
	{
		super(props);

		this.state = {
			selectedTab: "guilds",
		};
	}
	render()
	{
		return (
			<div className="bg-dark bg-gradient d-flex flex-column" style={{ padding: "0px", height: "100%" }}>
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<button
							className={"nav-link" + (this.state.selectedTab == "guilds" ? " active" : "")}
							type="button"
							onClick={() => this.setState({ selectedTab: "guilds" })}
						>
							Guilds
						</button>
					</li>
					<li className="nav-item">
						<button
							className={"nav-link" + (this.state.selectedTab == "mercenaries" ? " active" : "")}
							type="button"
							onClick={() => this.setState({ selectedTab: "mercenaries" })}
						>
							Mercenary Groups
						</button>
					</li>
				</ul>
				{
					this.state.selectedTab == "guilds" ?
						<GuildViewer guilds={GUILDS.sort((a, b) => a.name > b.name && 1 || -1)} /> :
						<MercenariesTestPage />
				}
			</div>

		);
	}
}

const GUILDS: IGuild[] = [
	{
		name: "Bringers of Light",
		tagline: "Heroism at its loudest.",
		image: "",
		dmNotes: [],
		information: [
			"The Bringers of Light consider themselves the children of Lonic, Lord of the Champion.",
			"Their primary focus is grandstanding heroism for heroism sake. The guild has become notorious in recent years for some of its members' fame-hungry tendencies."
		]
	},
	{
		name: "Bringers of Darkness",
		tagline: "It turns out the truest form of power is... power.",
		image: "",
		dmNotes: [],
		information: [
			"The Bringers of Darkness believe their purpose in life is to wreak villainous havoc in the name of Fouvil, Lord of the Vile.",
			"Despite their decidedly evil actions, their antics are performed for religious reasons. Many members are surprisingly personable when they are off-duty."
		]
	},
	{
		name: "Brotherhood of Matthias",
		tagline: "If you understand your cult's ideology, you need a new cult.",
		image: "/dnd/img/emblems/matthias.svg",
		dmNotes: [],
		information: []
	},
	{
		name: "PolyForce",
		tagline: "Protecting the little people.",
		image: "",
		dmNotes: [
			"PolyForce was founded by Smith after the extinction event on the Sky Island. Their goal is to be the heroes that Smith believes Geoss needs.",
			"Members:",
			"- Smith - Bullywug",
			"- Althea Holimion - Half-Elf",
			"- Amos Aldrin - Dragonborn",
			"- Howler - Kenku",
			"- Ost - Aarakocra",
			"- Koka - Aarakocra",
			"- Tuk - Aarakocra",
			"- Tarakona - Half-Orc",
			"- Da'Voe - Purple Grung",
			"- 8 x Additional Kenku",
		],
		information: [
			"PolyForce is a young guild, having seemingly sprung up overnight. Relatively little is known about it, although rumors suggest that its goal is generally benevolent."
		]
	},
	{
		name: "The Swarm",
		tagline: "Silent enforcers.",
		image: "",
		dmNotes: [
			"The Swarm is an elite force of assassins that operate out of Aphotia. Using the city's tunnels, they can strike nearly anywhere on Geoss."
		],
		information: [
			"The Swarm is spoken of only in frightened whispers. There are no recorded sightings of this guild, but it is believed to be behind an alarming number of disappearances.",
		]
	},
	{
		name: "The Razor's Edge",
		tagline: "Warriors of science.",
		image: "",
		dmNotes: [],
		information: [
			"Based out of Okham, The Razor's Edge is one of the best equipped guilds in the known world. Most of its members are either wizards or scientists, but some are simple warriors who joined the guild in exchange for residency within Okham's walls.",
			"The guild is known for making contact with unaffiliated scientists who have made important discoveries in an effort to advance their research. There have also been reports of the Razor practicing extreme violence to prevent the regulation of scientific study."
		]
	},
	{
		name: "Reincarnis",
		tagline: "Ascension through reinvention.",
		image: "",
		dmNotes: [],
		information: [
			"Reincarnis was founded in 2149 AE by a powerful transmutation wizard by the name of Jud Kuhn. He strongly believed that everyone deserves a second chance, and sought to provide that to anyone willing to seek it out.",
			"Reincarnis has magically bolstered programs for rehabilitating criminals and addicts. Any member reaching graduation is offered a fresh start via reincarnation or, in rare cases, true polymorph. Violent criminals failing the program are usually polymorphed into something of use to the guild. It is believed that much of the guilds mounts and furniture were once members."
		]
	},
	{
		name: "Zoological Fellowship",
		tagline: "I will travel across the land, searching far and wide.",
		image: "",
		dmNotes: [],
		information: [
			"The Zoological is an organization of likeminded zoologists and cryptozoologists who wish to find, understand, and document every species of fauna in the world. Since many of its members are squishy nerds, they frequently hire adventurers to scout dangerous areas where rare creatures are suspected to live, or to escort a nerd to the dangerous location. Established in 2065 AE."
		]
	},
	{
		name: "Shadowhand Clan",
		tagline: "Hide in the shadows to serve the light.",
		image: "",
		dmNotes: [],
		information: [
			"The Shadowhand Clan is a highly secretive ninja clan, and is considered by most to be nothing more than an urban legend.",
			"The Shadowhand Clan puts its members through years of vigorous training to become the most lethal ninjas in the known world. Upon graduation, each member is assigned a city or region to watch over. The ninja then moves to the assigned location and lives among its citizens. They conduct themselves as unsuspiciously as they can manage, but quietly protect their neighbors. If a major threat arises, the ninja dons their mask and removes the problem as discretely as possible. These threats usually come in the form of oppressive government officials, criminals who evade the law, or occupation by an outside military force."
		]
	},
	{
		name: "Society for Collection and Preservation of History",
		tagline: "Uncovering the secrets of yesteryear.",
		image: "",
		dmNotes: [],
		information: [
			"The Society for the Collection and Preservation of History is an organization of like-minded historians and archaeologists who wish to preserve history as thoroughly as possible. Established in 1520 AE."
		]
	},
];

ReactDOM.render(
	<OrganizationViewer />,
	document.getElementById("viewer-panel")
);