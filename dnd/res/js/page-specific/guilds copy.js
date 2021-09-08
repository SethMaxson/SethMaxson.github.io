"use strict";
class GuildName extends React.Component {
    render() {
        if (this.props.tagline.length > 0) {
            return (React.createElement("div", { className: "name" },
                this.props.name,
                "\u00A0|\u00A0 ",
                React.createElement("span", { className: "tagline" }, this.props.tagline)));
        }
        else {
            return (React.createElement("div", { className: "name" }, this.props.name));
        }
    }
}
class GuildSymbol extends React.Component {
    render() {
        return (React.createElement("img", { src: this.props.image, alt: "symbol", style: { width: "15%", float: "right", marginRight: "10px" } }));
    }
}
class GuildView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "h-100 overflow-auto p-3 px-lg-5" },
            React.createElement("div", { className: "name" }, this.props.JsonObject.name),
            React.createElement("p", { className: "ps-1 text-secondary" },
                React.createElement("i", null, this.props.JsonObject.tagline)),
            React.createElement("div", { className: "ps-2 ps-lg-5" },
                (this.props.JsonObject.image && this.props.JsonObject.image.length > 0) && React.createElement(GuildSymbol, { image: this.props.JsonObject.image }),
                this.props.JsonObject.information.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })))));
    }
}
class GuildViewer extends React.Component {
    constructor(props) {
        super(props);
        this.changeGuild = this.changeGuild.bind(this);
        let GuildName = GetURLParameter("name");
        let matchingGuilds = [];
        if (GuildName) {
            matchingGuilds = this.props.guilds.filter(el => el.name.toLowerCase() == GuildName?.toLowerCase());
        }
        let selectedGuild = matchingGuilds.length > 0 ? matchingGuilds[0] : this.props.guilds[0];
        this.state = {
            selectedGuild: selectedGuild,
            selectedIndex: 0
        };
    }
    render() {
        let filterableItems = this.props.guilds.map(a => { return { text: a.name, tags: [] }; });
        return (React.createElement("div", { className: "bg-dark bg-gradient", style: { padding: "0px", height: "100%" } },
            React.createElement(FilterPanel, { items: filterableItems, selectedIndex: this.state.selectedIndex, onChange: this.changeGuild }),
            React.createElement(FilterPanelToggleButton, null),
            React.createElement("div", { className: "container-sm bg-body d-flex flex-column", style: { padding: "0px", height: "100%", overflowY: "hidden" } },
                React.createElement(FilterPanelToggleButtonMobile, null),
                React.createElement(GuildView, { JsonObject: this.state.selectedGuild }))));
    }
    changeGuild(index) {
        this.setState({ selectedGuild: this.props.guilds[index], selectedIndex: index });
    }
}
const GUILDS = [
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
            "The Society for the Collection and Preservation of History is an organization of likeminded historians and archaeologists who wish to preserve history as thoroughly as possible. Established in 1520 AE."
        ]
    },
];
ReactDOM.render(React.createElement(GuildViewer, { guilds: GUILDS.sort((a, b) => a.name > b.name && 1 || -1) }), document.getElementById("viewer-panel"));
//# sourceMappingURL=guilds%20copy.js.map