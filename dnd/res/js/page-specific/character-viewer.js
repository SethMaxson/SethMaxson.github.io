"use strict";
class CharacterPortrait extends React.Component {
    render() {
        return (React.createElement("div", { className: "portrait-frame float-end" },
            React.createElement("img", { src: this.props.image, alt: "Character Portrait" })));
    }
}
class CharacterName extends React.Component {
    render() {
        if (this.props.tagline.length > 0) {
            return (React.createElement("div", { className: "name" },
                this.props.name,
                this.props.status !== "Fine" && (" (" + this.props.status + ")"),
                "\u00A0|\u00A0 ",
                React.createElement("span", { className: "tagline" }, this.props.tagline)));
        }
        else {
            return (React.createElement("div", { className: "name" }, this.props.name));
        }
    }
}
CharacterName.defaultProps = {
    status: "Fine"
};
class CharacterProperties extends React.Component {
    render() {
        return (React.createElement("p", { className: "properties fst-italic fs-6" },
            this.props.alignment + ", ",
            React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.race + ", " } }),
            this.props.class,
            React.createElement("br", null),
            "First Appearance: ",
            this.props.firstAppearance,
            React.createElement("br", null),
            "Total Appearances: ",
            this.props.totalAppearances));
    }
}
class CharacterTitles extends React.Component {
    render() {
        if (this.props.titles.length > 0) {
            return (React.createElement("p", { className: "titles" }, "Titles: " + this.props.titles.join(", ")));
        }
        else {
            return null;
        }
    }
}
class CharacterView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { style: { height: "100%", overflow: "auto", padding: "1em" } },
            React.createElement(CharacterName, { name: this.props.JsonObject.name, status: this.props.JsonObject.status, tagline: this.props.JsonObject.tagline }),
            React.createElement(CharacterProperties, { alignment: this.props.JsonObject.alignment, race: this.props.JsonObject.race, class: this.props.JsonObject.class, firstAppearance: this.props.JsonObject.firstAppearance, totalAppearances: this.props.JsonObject.totalAppearances }),
            React.createElement(CharacterTitles, { titles: this.props.JsonObject.titles }),
            React.createElement("div", null,
                React.createElement(CharacterPortrait, { image: this.props.JsonObject.image }),
                React.createElement(ParagraphFromRawHTML, { text: this.props.JsonObject.description }),
                this.props.JsonObject.information.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })))));
    }
}
class CharacterViewer extends React.Component {
    constructor(props) {
        super(props);
        this.changeCharacter = this.changeCharacter.bind(this);
        let characterName = GetURLParameter("character");
        let matchingCharacters = [];
        if (characterName) {
            matchingCharacters = this.props.characters.filter(el => el.name.toLowerCase() == characterName?.toLowerCase());
        }
        let selectedCharacter = matchingCharacters.length > 0 ? matchingCharacters[0] : this.props.characters[0];
        this.state = {
            selectedCharacter: selectedCharacter,
            selectedIndex: 0
        };
    }
    render() {
        let filterableItems = this.props.characters.map(a => { return { text: a.name, tags: [] }; });
        return (React.createElement("div", { className: "bg-dark bg-gradient", style: { padding: "0px", height: "100%" } },
            React.createElement(FilterPanel, { items: filterableItems, selectedIndex: this.state.selectedIndex, onChange: this.changeCharacter }),
            React.createElement(FilterPanelToggleButton, null),
            React.createElement("div", { className: "container bg-body d-flex flex-column", style: { padding: "0px", height: "100%", overflowY: "hidden" } },
                React.createElement(FilterPanelToggleButtonMobile, null),
                React.createElement(CharacterView, { JsonObject: this.state.selectedCharacter }))));
    }
    changeCharacter(index) {
        this.setState({ selectedCharacter: this.props.characters[index], selectedIndex: index });
    }
}
const CHARACTERS = [
    {
        name: "Jasper Nightbreeze",
        tagline: "Adrift in Time",
        status: "Fine",
        image: "/dnd/img/characters/party/jasper_portrait.png",
        themeColor: "#48A9A6",
        alignment: "CG",
        race: "Simic Hybrid",
        class: "Eldritch Knight",
        firstAppearance: "Birth of the Resistance (11/17/2018)",
        totalAppearances: 13,
        titles: [
            "Sir Jasper the Bold"
        ],
        dmNotes: [
            "From Dom: Jasper is a solider frozen from the past. Jasper grew up with her sister Mirage and they were inseparable. When Mirage got older she decided she wanted to go into the military and be a solider. Jasper was not used to being away from her sister but Jasper was a male. Jasper worked part time as a Simic scientist and decided to do tests on himself. After some experiments Jasper was able to convert himself into a female to join the military with his sister but not with repercussions. Jasper not only had a new body but powers and wings to go with it. Jasper and Mirage discussed the new change and decided to try and sign up. Jasper made it through training by carefully concealing her wings. But one night an officer went into Mirage’s and Jasper’s bunker and saw Jasper’s wings. The officer demanded Jasper come with him and they went off to his station. When the officer pulled up her file and looked through it and noticed that Jasper used to be a man but transitioned into a female. Outraged the officer was angry this was overlooked and decided to put Jasper down as dishonorable discharge because he felt like just because Jasper identified as female doesn’t make her a true female.",
            "From Dom, partially revised: Jasper is a solider frozen from the past. Jasper grew up with her sister Mirage and they were inseparable. When Mirage got older she decided she wanted to join the military and be a solider. Jasper was not used to being away from her sister, but Jasper was a male. Jasper worked part time as a Simic scientist and decided to conduct tests on himself. After some experiments Jasper was able to convert himself into a female to join the military with his sister, but this was not without repercussions. Jasper not only had a new body but powers and wings to go with it. Jasper and Mirage discussed the new change and decided to try and enlist. Jasper made it through training by carefully concealing her wings. But one night an officer went into Mirage’s and Jasper’s bunker and saw Jasper’s wings. The officer demanded Jasper come with him and they went off to his station. When the officer pulled up her file and looked through it and noticed that Jasper used to be a man but transitioned into a female. Outraged, the officer was angry this was overlooked and decided to put Jasper down as dishonorable discharge because he felt like just because Jasper identified as female doesn’t make her a true female.",
            "Jasper was once a male, but the same experiments that gave Jasper her powers also changed her sex. Her main drives are to protect the innocent and find her sister. Revenge would also be a plus.",
            "Note to self: winged elves are typically called 'Avariel'. May use this at some point."
        ],
        description: "Jasper is a gifted swordswoman who dabbles in the arcane arts. She is still learning how to interact with most of the more modern technology of Geoss, but that has done nothing to dampen her unwavering dedication to the forces of good.",
        information: [
            "Jasper was orphaned at an early age, and subsequently raised by her elder sister, Mirage. Jasper spent her childhood years learning to value the greater good, and practicing arcane magic under the guidance of her sister. When Jasper was nearing adulthood, her sister was called away to war. Jasper used the resources in her sister's arcane study to undergo alterations in order to follow her to war.",
            "Jasper proved to be a ferocious warrior with a strong moral compass. However, her commander discovered that she had undergone mutations in order to enlist. Learning that she was unqualified for service, the commander discharged her immediately.",
            "Jasper continued to do her best to serve the public as a wandering adventurer. Her success was mixed, but she remained content in the knowledge that she served the greater good. Eventually her adventures saw her turned to stone. She spent roughly five centuries in this state before eventually being thawed by <span class=\"ally\">Cog</span> to once again fight for the good of Geoss."
        ]
    },
    {
        name: "Namfoodle Daergel",
        tagline: "The captain of crunch",
        status: "Fine",
        image: "/dnd/img/characters/party/namfoodle_portrait.png",
        themeColor: "#1f271b",
        alignment: "CE",
        race: "Tiefling",
        class: "Hexblade Warlock",
        firstAppearance: "Land Ho (01/13/2018)",
        totalAppearances: 28,
        titles: [
            "Captain of the Flying Poo",
            "Zaienen (previously held title)",
            "god of death"
        ],
        dmNotes: [],
        description: "Namfoodle \"Blabberchat\" Daergel is a good humored warlock driven by ambition. He is highly chaotic and unpredictable by most standards, but he frequently exhibits a love of adventure and a nasty Napoleon complex.",
        information: [
            "Gold is the only thing Namfoodle loves more than a good jape. When a good-humored sky-pirate offered him the chance to fly all over the world swiping people's gold from right under their noses, he gleefully accepted."
        ]
    },
    {
        name: "Bud Smoak",
        tagline: "Life of the party",
        status: "Fine",
        image: "/dnd/img/characters/party/bud_portrait.png",
        themeColor: "#437a6b",
        alignment: "CN",
        race: "Aasimar",
        class: "Circle of the Land Druid",
        firstAppearance: "Land Ho (01/13/2018)",
        totalAppearances: 19,
        titles: [
            "Brrawd",
            "god of parties",
            "lord of the Wetwood",
            "god-king of Budopolis",
            "god of the harvest"
        ],
        dmNotes: [
            "Bud is the ruler of the kingdom Budopolis, though he has not held this title for long. Budopolis' populace is almost entirely comprised of Bloodfins, Tortles, Kenku, and Lizardfolk.",
            "He recently discovered that he is the last heir to an ancient tribe of Aasimar, tasked with protecting the Rewera Amulets."
        ],
        description: "Bud is a gifted guardian of nature, and is always the most laid-back person in any room. He works in the service of the greater good, but tends to believe that the ends justify the means.",
        information: [
            "Bud has spent countless centuries drifting between worlds and universes. His history is long, and largely unknown even to him. He is unsure of how old he is, where he came from, and if he ever had a family or a people. Centuries of aimless drifting coupled with rampant use of recreational herbs and mushrooms have severely dulled his long term memory."
        ]
    },
    {
        name: "Shamous Northunder",
        tagline: "Nature's fury",
        status: "Fine",
        image: "/dnd/img/characters/party/shamous_portrait.png",
        themeColor: "#6d1223",
        alignment: "CG",
        race: "Tortle",
        class: "Circle of the Moon Druid",
        firstAppearance: "Rude Awakening (06/16/2018)",
        totalAppearances: 19,
        titles: [
            "Sir Shamous the Noble"
        ],
        dmNotes: [],
        description: "Shamous is an abnormally savage, violent druid. Despite having anger issues and a troubled past, he ultimately has good intentions.",
        information: [
            "Shamous was forever changed the day he saw his village burned to the ground by a rampaging dragon. Finding himself suddenly alone, Shamous wandered the forest seeking purpose. He met another young firbolg survivor, Sonya. They quickly kindled a romance.",
            "After several happy years together, Sonya revealed a startling truth. She was the dragon who had razed his childhood home, and chose to take firbolg form afterwards out of guilt. She bore the village no ill-will, but had not yet gained full control over her strength. Shamous was devastated, but chose to forgive Sonya.",
            "Eventually, Shamous and Sonya had a child, whom they named Eve. Shamous finally felt at peace. Fate, however, had other plans. Rumors of Sonya's true draconic nature began to spread in the surrounding villages. A mob of panicked villagers attacked during the night. Shamous fought with all his might, but lacked the strength to repel the horde. Once again, he watched as his home and loved ones were burned to the ground.",
            "Losing everything twice left Shamous a broken man. He now wanders the world looking for a way to be reunited with his wife and daughter. He will stop at nothing until he achieves this goal."
        ]
    },
    {
        name: "Redji Cloudtaker",
        tagline: "Even higher learning",
        status: "Fine",
        image: "/dnd/img/characters/party/redji_portrait.png",
        themeColor: "#58cce9",
        alignment: "LN",
        race: "Air Genasi",
        class: "Chronomancy Wizard",
        firstAppearance: "The Firelake (09/08/2018)",
        totalAppearances: 16,
        titles: [],
        dmNotes: [],
        description: "Redji is a scholarly wizard who has a fascination with the unrecorded parts of history. His ego has a tendency to get him into trouble, but fortunately he is quite experienced at escaping the repercussions of his actions.",
        information: [
            "Like most Genasi, Redji never knew his Djinn parent. Redji grew up on the mean streets of Amarillo, where he dedicated his life to the study of the arcane arts. He quickly proved himself gifted with both wand and pen.",
            "Upon deciding that he had learned everything the scholars in Amarillo could teach, Redji set out to explore the larger world in search of new challenges."
        ]
    },
    {
        name: "Teomyr Thorsson",
        tagline: "Human stormfront",
        status: "Fine",
        image: "/dnd/img/characters/party/teomyr_portrait.png",
        themeColor: "#C1666B",
        alignment: "CN",
        race: "Human",
        class: "Tempest Cleric",
        firstAppearance: "Echoes of the Past (03/16/2019)",
        totalAppearances: 4,
        titles: [],
        dmNotes: [],
        description: "Teomyr is a fierce warrior, and a competent wielder of arcane magics. He is unflinching in the face of danger, but frequently endangers himself and his allies with his tendency for rash action.",
        information: [
            "Teomyr served as the priest for the tribe of barbarians that raised him. As such, he learned much about the art of war, and very little about impulse control."
        ]
    },
    {
        name: "Seabern Forestgloom",
        tagline: "Final bow",
        status: "Fine",
        image: "/dnd/img/characters/party/seabern_portrait.png",
        themeColor: "gold",
        alignment: "CN",
        race: "Half-Elf",
        class: "Valor Bard",
        firstAppearance: "Setbacks (01/12/2019)",
        totalAppearances: 3,
        titles: [],
        dmNotes: [],
        description: "Seabern is a wandering minstrel with a bit of a vanity problem. His skills with a bow make him a valuable asset, despite his narcissistic tendencies.",
        information: []
    },
    {
        name: "Uriver",
        tagline: "Venom and violence",
        status: "Fine",
        image: "/dnd/img/characters/party/uriver_portrait.png",
        themeColor: "black",
        alignment: "NE",
        race: "Yuan-Ti",
        class: "Barbarian/Rogue",
        firstAppearance: "Rude Awakening (06/16/2018)",
        totalAppearances: 7,
        titles: [],
        dmNotes: [],
        description: "Uriver is an unrepentantly sadistic sea witch. Violence is both her greatest skill and her only hobby. Consequently, it is usually wise to stay on her good side.",
        information: [
            "Very little is known about Uriver's past. It is likely she prefers it that way."
        ]
    },
    {
        name: "S'kra'p'ap",
        tagline: "Hopping mad",
        status: "Fine",
        image: "/dnd/img/characters/party/skrapap_portrait.png",
        themeColor: "orangered",
        alignment: "LE",
        race: "Grung",
        class: "Dragon Soul Sorcerer",
        firstAppearance: "Land Ho (01/13/2018)",
        totalAppearances: 10,
        titles: [],
        dmNotes: [],
        description: "S'kra'p'ap's raw talent as a magic wielder is almost unparalleled. He has a notable preference for spells that involve fire. While he readily commits heinous acts, he does so only in accordance with the laws of his people.",
        information: [
            "S'kra'p'ap was once a noble red Grung, poised to become the new Arch Sorcerer for his clan. However, a jealous rival cast a dark spell on poor S'kra'p'ap, dulling his magnificent red skin into a lowly purple color. Feeling cheated out of his rightful place in the clan hierarchy, he fled with a benevolent sky-pirate who offered him a place in a society based on skill instead of color."
        ]
    },
    {
        name: "Zenrya Fastfoot",
        tagline: "Chaotic fun",
        status: "Fine",
        image: "/dnd/img/characters/party/zenrya_portrait.png",
        themeColor: "#ac3b9b",
        alignment: "CN",
        race: "Halfling",
        class: "War Magic Wizard",
        firstAppearance: "Setbacks (01/12/2019)",
        totalAppearances: 5,
        titles: [],
        dmNotes: [],
        description: "Zenrya is a relentlessly optimistic war wizard. She has a knack for defusing tense social situations, but can be quite naive.",
        information: [
            "Zenrya was born on a farm, where she grew up raising large birds known as axebeaks. As she neared adulthood, she decided that destiny held greater things for her. Zenrya left her family farm with her dreams as her compass."
        ]
    },
    {
        name: "Falimur Lightbringer",
        tagline: "Ordained defender",
        status: "Fallen",
        image: "/dnd/img/characters/party/falimur_portrait.png",
        themeColor: "#4357AD",
        alignment: "LN",
        race: "Aasimar",
        class: "Life Cleric",
        firstAppearance: "Birth of the Resistance (11/17/2018)",
        totalAppearances: 8,
        titles: [],
        dmNotes: [],
        description: "Falimur is a reliable warrior priest. He would take an arrow for an ally just as enthusiastically as he would smite an undead monster.",
        information: [
            "Falimur lived almost his entire life in service to all the gods of the Prime Pantheon. When the balance of divine power was upset, he set forth on a quest to set it right."
        ]
    },
    {
        name: "Yoaral",
        tagline: "Power, Hungry",
        status: "Missing",
        image: "/dnd/img/characters/party/yoaral_portrait.png",
        themeColor: "#EE6C4D",
        alignment: "N",
        race: "Lizardfolk",
        class: "Barbarian",
        firstAppearance: "Land Ho (01/13/2018)",
        totalAppearances: 5,
        titles: [],
        dmNotes: [],
        description: "Yoaral is a harshly utilitarian warrior from one of the outer tribes. When he is hungry, he has a tendency to eat the person he believes to have the least value in the vicinity. He is often hungry. Despite his cannibalistic appetite, he is loyal to the crew with which he serves.",
        information: [
            "Yoaral came from a lizardfolk tribe of hunters and fishers. He attempted to slay an aarakocra warrior by grappling it out of the air, but was carried into the sky and left stranded atop a mountain instead. He was rescued by a passing sky pirate, who suggested that Yoaral could have all the food he could ever want if he were to become a sky pirate."
        ]
    },
    {
        name: "Wickerbeak Crowfist",
        tagline: "Murder most fowl",
        status: "Missing",
        image: "/dnd/img/characters/party/wickerbeak_portrait.png",
        themeColor: "#E40066",
        alignment: "CN",
        race: "<span style=\"text-decoration: line-through;\">Kenku</span> Dryad",
        class: "Way of the Four Elements Monk",
        firstAppearance: "The Brotherhood (01/27/2018)",
        totalAppearances: 4,
        titles: [],
        dmNotes: [],
        description: "WickerBeak is a slightly chaotic, but ultimately good-hearted practitioner of the martial arts.",
        information: [
            "WickerBeak grew up as part of a flock on the streets of Amarillo. Constantly spat upon by society, he and his makeshift family mostly kept to the shadows and stole to keep food on the table.",
            "After hearing of an ancient scroll describing kenku flight from before the curse, the flock immediately decided to steal it. The scroll was housed in the council chambers of a cult of powerful sorcerers. This attempted heist failed. Rather than face the music, the flock claimed that it was all WickerBeak's idea. Somehow the sorcerers believed this.",
            "WickerBeak was branded a thief and an anarchist and cast out from Amarillo. He wandered the wilderness for what felt like an eternity. Eventually he came upon a secluded monastery. The kindly old master saw goodness in WickerBeak, and allowed him to partake of the monastery's food and shelter. It was here that he began to walk the path of peace. Using his innate ability for mimicry, he was able to learn devastatingly powerful techniques by watching the old master of the monastery. His abilities sparked a great deal of jealousy from the students of the monastery. After being aggressively confronted and threatened by his peers, WickerBeak decided the wisest course of action was to leave his new home before things got out of hand.",
            "WickerBeak had been rejected by every family or home he had ever known. Undeterred, he resumed his wandering, hoping to find his place in the world."
        ]
    },
    {
        name: "Zora Onguh",
        tagline: "Daughter of destruction",
        status: "Fallen",
        image: "/dnd/img/characters/party/zora_portrait.png",
        themeColor: "#4357AD",
        alignment: "CN",
        race: "Drow",
        class: "Rogue",
        firstAppearance: "The Fall of Bubbletown (03/24/2018)",
        totalAppearances: 10,
        titles: [],
        dmNotes: [],
        description: "Zora Onguh is an exceptional assassin and a woman of few words. Despite her stoicism, she is one of the best allies one could ask for when things hit the fan.",
        information: [
            "Zora spent her early life as a homeless orphan in the seedy underbelly of Aphotia. She was forced to be entirely self-reliant from an early age, and survived only through quick thinking and street smarts. While on the streets, she demonstrated an uncanny gift for stealth and murder. Job options for an underage orphan were limited, so she became an assassin in her early adolescence.",
            "Eventually, her work as an assassin caused her to cross paths with a pirate captain named Cross. Cross found her resourcefulness admirable and her plight pitiable. He adopted her and raised her as his own. She became his most trusted lieutenant during his rise to power. As Cross' empire grew, they agreed to keep quiet about their father-daughter bond, so that there was never any doubt that none of Zora's success came from nepotism. Though they downplay their familial bond, Zora continues to be one of Cross' most trusted agents."
        ]
    },
    {
        name: "Cut-Purse Thistlewick",
        tagline: "Blaze of glory",
        status: "Fallen",
        image: "/dnd/img/characters/party/thistlewick_portrait.png",
        themeColor: "#8B9556",
        alignment: "CN",
        race: "Kenku",
        class: "Rogue",
        firstAppearance: "Land Ho (01/13/2018)",
        totalAppearances: 1,
        titles: [],
        dmNotes: [],
        description: "Thistlewick is a brash pickpocket who lives by the skin of his teeth, er, beak.",
        information: [
            "Cut-Purse spent most of his life penniless, and turned to a life of petty crime to fill his stomach. Most of the citizens of the capital city were disgusted by his very existence, calling him such crude things as \"weather-beaten dung pile\", or \"wet dog fart\". A kindly sky-pirate was moved by his plight, and nicknamed him Thistlewick. The pirate offered him a career as a fellow sky-pirate to fill his stomach and allow him a form of flight."
        ]
    }
];
ReactDOM.render(React.createElement(CharacterViewer, { characters: CHARACTERS.sort((a, b) => a.name > b.name && 1 || -1) }), document.getElementById("character-viewer-panel"));
//# sourceMappingURL=character-viewer.js.map