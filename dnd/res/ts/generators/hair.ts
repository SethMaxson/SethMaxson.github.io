const HairGenerator = {
	color: function(species: string = "human", gender: string = "female", age: string = "adult"): string {
		let color = "";
		let possibleColors: IWeightedKeyList = {};
		const wildMagicInfluence = roll("1d100") == 100;
		if (wildMagicInfluence) {
			possibleColors = {
				"black": 1,
				"blonde": 1,
				"blue": 1,
				"brown": 1,
				"dark blue": 1,
				"dark brown": 1,
				"dark green": 1,
				"dark purple": 1,
				"dark red": 1,
				"green": 1,
				"gray": 1,
				"light brown": 1,
				"orange": 1,
				"pink": 1,
				"purple": 1,
				"red": 1,
				"silver": 1,
				"tan": 1,
				"white": 1,
				"yellow": 1,
			};
			return weightedRandom(possibleColors);
		}
		switch (species)
		{
			//#region Aarakocra
			case "aarakocra":
				if (gender == "male")
				{
					return weightedRandom({
						"blue": 1,
						"green": 4,
						"gray": 6,
						"orange": 10,
						"pink": 1,
						"red": 10,
						"white": 1,
						"yellow": 10,
					} as IWeightedKeyList);

				} else
				{
					return weightedRandom({
						"blue": 1,
						"green": 1,
						"gray": 10,
						"orange": 1,
						"pink": 2,
						"red": 1,
						"white": 10,
						"yellow": 1,
					} as IWeightedKeyList);
				}
			//#endregion Aarakocra
			//#region Aasimar
			case "aasimar":
				possibleColors = {
					"black": 20,
					"blonde": 20,
					"brown": 10,
					"light brown": 10,
					"red": 10,
					"silver": 15,
					"white": 20,
				};
				return weightedRandom(possibleColors);
			//#endregion Aasimar
			//#region Bear
			case "bear":
				return weightedRandom({
					"black": 3,
					"brown": 3,
					"white": 1,
				} as IWeightedKeyList);
			//#endregion
			//#region Bloodfin
			case "bloodfin":
				return "no";
			//#endregion
			//#region Brokkos
			case "brokkos":
				return "black and white";
			//#endregion
			//#region Bugbear
			case "bugbear":
				possibleColors = {
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"tan": 10,
				};
				if (age == AgeCategory.Old) {
					return "gray";
				}
				return weightedRandom(possibleColors);

			//#endregion
			//#region Burrowfolk
			case "burrowfolk":
				possibleColors = {
					"light brown": 10,
					"tan": 10,
				};
				if (age == AgeCategory.Old) {
					return "gray";
				}
				return weightedRandom(possibleColors);
				break;
			//#endregion
			//#region Dragonborn
			case "dragonborn":
				return "no";
			//#endregion
			//#region Drow
			case "drow":
				return "white";
			//#endregion Drow
			//#region Dwarf
			case "dwarf":
				possibleColors = {
					"black": 10,
					"blonde": 2,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"red": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				return weightedRandom(possibleColors);
			//#endregion Dwarf
			//#region Elf/Half-Elf
			case "elf":
			case "halfelf":
				possibleColors = {
					"black": 10,
					"blonde": 20,
					"brown": 10,
					"light brown": 20,
					"red": 10,
				};
				return weightedRandom(possibleColors);
			//#endregion Elf/Half-Elf
			//#region Firbolg
			case "firbolg":
				possibleColors = {
					"black": 10,
					"blonde": 10,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"red": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 20;
				}
				return weightedRandom(possibleColors);
			//#endregion Firbolg
			//#region Firenewt
			case "firenewt":
				return "no";
			//#endregion Firenewt
			//#region Goblin
			case "goblin":
				if (gender == "male") {
					possibleColors = {
						"black": 10,
						"no": 30,
					};
				}
				else
				{
					possibleColors = {
						"black": 15,
						"no": 5,
					};
				}
				if (age == AgeCategory.Old) {
					possibleColors.gray = 15;
				}
				return weightedRandom(possibleColors);
			//#endregion Goblin
			//#region Goliath
			case "goliath":
				if (gender == "male") {
					possibleColors = {
						"black": 10,
						"no": 30,
					};
				}
				else
				{
					possibleColors = {
						"black": 15,
						"no": 5,
					};
				}
				if (age == AgeCategory.Old) {
					possibleColors.gray = 15;
				}
				return weightedRandom(possibleColors);
			//#endregion Goliath
			//#region Gnome
			case "gnome":
				possibleColors = {
					"black": 10,
					"blonde": 2,
					"blue": 10,
					"brown": 10,
					"gray": 1,
					"green": 10,
					"light brown": 10,
					"orange": 10,
					"pink": 10,
					"purple": 10,
					"red": 10,
					"white": 10,
					"yellow": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				color = weightedRandom(possibleColors);
				if (roll("1d10") >= 9) {
					color += " with " + weightedRandom(possibleColors) + " streaks";
				}
				break;
			//#endregion Gnome
			//#region Grippli
			case "grippli":
				return "no";
			//#endregion Grippli
			//#region Grung
			case "grung":
				return "no";
			//#endregion Grung
			//#region Halfling
			case "halfling":
				possibleColors = {
					"black": 10,
					"blonde": 2,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"red": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				return weightedRandom(possibleColors);
			//#endregion Halfling
			//#region Half-Orc
			case "halforc":
				possibleColors = {
					"black": 20,
					"blonde": 10,
					"brown": 10,
					"dark brown": 10,
					"gray": 1,
					"light brown": 10,
					"red": 5,
				};
				if (gender == "male") {
					possibleColors.no = 5;
				}
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				return weightedRandom(possibleColors);
			//#endregion Half-Orc
			//#region Hobgoblin
			case "hobgoblin":
				possibleColors = {
					"black": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 10;
				}
				return weightedRandom(possibleColors);
			//#endregion Hobgoblin
			//#region Human
			case "human":
				possibleColors = {
					"black": 10,
					"blonde": 10,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"red": 5,
				};
				if (gender == "male" && (age == AgeCategory.Adult || age == AgeCategory.Old)) {
					possibleColors.no = 10;
				}
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				return weightedRandom(possibleColors);
			//#endregion Human
			//#region Kenku
			case "kenku":
				return "black";
			//#endregion
			//#region Kobold
			case "kobold":
				return "no";
			//#endregion
			//#region Koa-Toa
			case "kuo-toa":
				return "no";
			//#endregion
			//#region Lizardfolk
			case "lizardfolk":
				return "no";
			//#endregion
			//#region Modron
			case "modron":
				return "no";
			//#endregion
			//#region Orc
			case "orc":
				possibleColors = {
					"black": 10,
					"no": 1,
				};
				if (gender == "male")
				{
					possibleColors.no = 10;
				}
				if (age == AgeCategory.Old) {
					possibleColors.gray = 20;
				}
				return weightedRandom(possibleColors);
			//#endregion Orc
			//#region Ratfolk
			case "ratfolk":
				possibleColors = {
					"black": 5,
					"brown": 10,
					"gray": 10,
					"tan": 10,
					"white": 10,
				};
				return weightedRandom(possibleColors);
			//#endregion Ratfolk
			//#region Tabaxi
			case "tabaxi":
				possibleColors = {
					"black": 10,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"orange": 3,
					"tan": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 20;
				}
				return weightedRandom(possibleColors);
			//#endregion Tabaxi
			//#region Tiefling
			case "tiefling":
				possibleColors = {
					"black": 20,
					"dark blue": 10,
					"dark brown": 10,
					"dark green": 10,
					"dark purple": 10,
					"dark red": 10,
				};
				return weightedRandom(possibleColors);
			//#endregion Tiefling
			//#region Tortle
			case "tortle":
				return "no";
			//#endregion
			//#region Triton
			case "triton":
				possibleColors = {
					"black": 2,
					"dark blue": 10,
					"dark green": 10,
				};
				return weightedRandom(possibleColors);
			//#endregion
			//#region Wilkoss
			case "wilkoss":
				possibleColors = {
					"black": 10,
					"blonde": 10,
					"green": 10,
					"purple": 10,
					"red": 10,
					"yellow": 10,
				};
				if (gender == "male") {
					possibleColors.no = 20;
				}
				return weightedRandom(possibleColors);
			//#endregion
			default:
				possibleColors = {
					"black": 10,
					"blonde": 2,
					"brown": 10,
					"gray": 1,
					"light brown": 10,
					"no": 10,
					"red": 10,
				};
				if (age == AgeCategory.Old) {
					possibleColors.gray = 50;
				}
				return weightedRandom(possibleColors);
		}
		return color;
	},
	style: function(species: string = "human", gender: string = "female", age: string = "adult"): string {
		var name = "";
		switch (species) {
			//#region Aarakocra
			case "aarakocra":
				name = randomize([
					"Airswimmer",
					"Breezehopper",
					"Cloudwalker",
					"Galerunner",
					"Gustfeather",
					"Skyherald",
					"Stormtalon",
					"Thunderwing",
					"Windfeather"
				]);
				break
			//#endregion Aarakocra
			//#region Anime
			case "anime":
				name = randomize([
					"Ikeda",
					"Ito",
					"Kobayashi",
					"Kondo",
					"Miyamoto",
					"Miyazaki",
					"Nakamura",
					"Saito",
					"Sakai",
					"Sato",
					"Suzuki",
					"Takahashi",
					"Takeda",
					"Tanaka",
					"Uchida",
					"Watanabe",
					"Yamamoto"
				]);
				break
			//#endregion Anime
			//#region Brokkos
			case "brokkos":
				/*
					name | role | color
					Aiutatu - helper, assists with any role that has insufficient Brokkos
					Cuocu - cook/chef
					Doto - healer
					Fermia - childcare
					Guardia - guard
					Maestru - teacher
					Produ - maker, craftsman
					Raccogli - gatherer/forager
					Scavo - digger
					Zitellu - fledgling
				*/
				if (age == "child") {
					name = "Zitellu (Fledgling)";
				}
				else
				{
					name = randomize([
						"Aiutatu (Helper)",
						"Cuocu (Cook)",
						"Doto (Healer)",
						"Fermia (Childcare)",
						"Guardia (Warrior)",
						"Maestru (Teacher)",
						"Produ (Craftsman)",
						"Raccogli (Forager)",
						"Scavo (Digger)"
					]);
				}
				break;
			//#endregion Brokkos
			//#region Dragonborn
			case "dragonborn":
				name = randomize([
					"Akambherylliax",
					"Argenthrixus",
					"Baharoosh",
					"Beryntolthropal",
					"Bhenkumbyrznaax",
					"Caavylteradyn",
					"Chumbyxirinnish",
					"Clethtinthiallor",
					"Daardendrian",
					"Delmirev",
					"Dhyrktelonis",
					"Ebynichtomonis",
					"Esstyrlynn",
					"Fharngnarthnost",
					"Ghaallixirn",
					"Grrrmmballhyst",
					"Gygazzylyshrift",
					"Hashphronyxadyn",
					"Hshhsstoroth",
					"Imbixtellrhyst",
					"Jerynomonis",
					"Jharthraxyn",
					"Kerrhylon",
					"Kimbatuul",
					"Lhamboldennish",
					"Linxakasendalor",
					"Mohradyllion",
					"Mystan",
					"Nemmonis",
					"Norixius",
					"Ophinshtalajiir",
					"Orexijandilin",
					"Pfaphnyrennish",
					"Phrahdrandon",
					"Pyraxtallinost",
					"Qyxpahrgh",
					"Raghthroknaar",
					"Shestendeliath",
					"Skaarzborroosh",
					"Sumnarghthrysh",
					"Tiammanthyllish",
					"Turnuroth",
					"Umbyrphrael",
					"Vangdondalor",
					"Verthisathurgiesh",
					"Wivvyrholdalphiax",
					"Wystongjiir",
					"Xephyrbahnor",
					"Yarjerit",
					"Zzzxaaxthroth"
				]);
				break;
			//#endregion Dragonborn
			//#region Drow
			case "drow":
				name = randomize([
					"A'Daragon",
					"Abaeir",
					"Abbylan",
					"Arabani",
					"Argith",
					"Baenre",
					"Beltaulur",
					"Blaerabban",
					"Blundyth",
					"Brevak",
					"Chaulssin",
					"Coborel",
					"Coloara",
					"Cormrael",
					"Daevion'lyr",
					"Dalael",
					"Dhalmass",
					"Dhunnyl",
					"Diliriy",
					"Dinoryn",
					"Dryaalis",
					"Duskryn",
					"Dyrr",
					"Elpragh",
					"Elpragh",
					"Faertala",
					"Filifar",
					"Gallaer",
					"Glannath",
					"Glaurach",
					"Helviiryn",
					"Hune",
					"Hunzrin",
					"Hyluan",
					"Icharyd",
					"Ilaleztice",
					"Illistyn",
					"Illykur",
					"Jhalavar",
					"Jusztiirn",
					"Keteeruae",
					"Khalazza",
					"Khalazza",
					"Kront'tane",
					"Lhalabar",
					"Lueltar",
					"Mizzrym",
					"Mlezziir",
					"Naerth",
					"Nirinath",
					"Olonrae",
					"Omriwin",
					"Philiom",
					"Quavein",
					"Rhomduil",
					"Rrostarr",
					"Rycast",
					"Seerear",
					"Ssambra",
					"T'orgh",
					"T'sarran",
					"Tanor'Thal",
					"Telenna",
					"Tlin'orzza",
					"Tlintarn",
					"Tuin",
					"Uloavae",
					"Vex",
					"Vrammyr",
					"Vrinn",
					"Waeglossz",
					"Xicton",
					"Xiltyn",
					"Yauntyrr",
					"Yauthlo",
					"Yril'Lysaen",
					"Zaphresz",
					"Zauviir",
					"Zeizerer",
					"Zolond"
				]);
			//#endregion Drow
			//#region Dwarf
			case "dwarf":
				name = randomize([
					"Aranore",
					"Balderk",
					"Battlehammer",
					"Bigtoe",
					"Bloodkith",
					"Bofdann",
					"Brawnanvil",
					"Brazzik",
					"Bronzehand",
					"Broodfist",
					"Burrowfound",
					"Caebrek",
					"Coppervein",
					"Daerdahk",
					"Dankil",
					"Daraln",
					"Deepdelver",
					"Deepforge",
					"Diamondpick",
					"Durthane",
					"Eversharp",
					"Fallack",
					"Fireforge",
					"Foamtankard",
					"Frostbeard",
					"Glanhig",
					"Goblinbane",
					"Goldfinder",
					"Gorunn",
					"Graybeard",
					"Hackinsteel",
					"Hackinstone",
					"Hammerstone",
					"Helcral",
					"Holderhek",
					"Ironfist",
					"Ironheart",
					"Kreel",
					"Loderr",
					"Lutgehr",
					"Morigak",
					"Orcfoe",
					"Rakankrak",
					"Rockseeker",
					"RubyEye",
					"Rumnaheim",
					"Silveraxe",
					"Silverstone",
					"Steelfist",
					"Steelshadow",
					"Stonespire",
					"Stormforge",
					"Stoutale",
					"Strakeln",
					"Strongbellows",
					"Strongheart",
					"Thrahak",
					"Torevir",
					"Torunn",
					"Trollbleeder",
					"Trueanvil",
					"Trueblood",
					"Ungart"
				]);
			//#endregion Dwarf
			//#region Elf
			case "elf":
				name = randomize([
					"Aelasar",
					"Aelorothi",
					"Aendryr",
					"Aerasumé",
					"Aeravansel",
					"Agayous",
					"Agrivar",
					"Ahmaquissar",
					"Alaenree",
					"Alantar",
					"Alastrarra",
					"Alavara",
					"Alenuath",
					"Alerothi",
					"Alluth",
					"Aloevan",
					"Aloro",
					"Aluianti",
					"Aluviirsaan",
					"Amakiir",
					"Amalith",
					"Amarallis",
					"Amaratharr",
					"Amarthen",
					"Amastacia",
					"Ammath",
					"Amrallatha",
					"Anuaer",
					"Argentaamn",
					"Ariessus",
					"Arnuanna",
					"Arren",
					"Ash",
					"Ashgrove",
					"Audark",
					"Auglamyr",
					"Auglathla",
					"Aunglor",
					"Autumnfire",
					"Bellas",
					"Berethryl",
					"Berevan",
					"Berilan",
					"Bharaclaiev",
					"Bhephel",
					"Blackhelm",
					"Braegen",
					"Briarbosk",
					"Brightcloak",
					"Brightsong",
					"Brightwing",
					"Caerdonel",
					"Caersaelk",
					"Calaudra",
					"Calauth",
					"Camusiil",
					"Caphaxath",
					"Casilltenirra",
					"Cathdeiryn",
					"Ceretlan",
					"Chaadren",
					"Chamaranthe",
					"Cithreth",
					"Clatharla",
					"Cormyth",
					"Coudoarluth",
					"Craulnober",
					"Crystalembers",
					"Dahast",
					"Dalanthan",
					"Dawnhorn",
					"Dhorinshyl",
					"Dlardrageth",
					"Doedance",
					"Donnathlascen",
					"Dracoseir",
					"Dree",
					"Duirsar",
					"Durothil",
					"Duskmere",
					"Duthjuth",
					"Ealoeth",
					"Eathalena",
					"Echorn",
					"Elaéyadar",
					"Elassidil",
					"Elian",
					"Ellarian",
					"Elond",
					"Eluarshee",
					"Erenaeth",
					"Ereuvyn",
					"Erkowe",
					"Erladden",
					"Erlshade",
					"Eroth",
					"Estelda",
					"Ethanasath",
					"Evanara",
					"Eveningfall",
					"Everlove",
					"Evioro",
					"Eyriendor",
					"Faerondaerl",
					"Faerondarl",
					"Falanae",
					"Fasharash",
					"Felinaun",
					"Fellmirr",
					"Fenmarel",
					"Fflannidan",
					"Firahel",
					"Floshem",
					"Floshin",
					"Fynnasla",
					"Galanodel",
					"Gildenguard",
					"Goadulphyn",
					"Goldenleaf",
					"Goltorah",
					"Gourael",
					"Greencloak",
					"Gwaelon",
					"Haell",
					"Haerlgent",
					"Haevaul",
					"Haladar",
					"Halavanthlarr",
					"Hanali",
					"Hawksong",
					"Hlarr",
					"Holimion",
					"Horineth",
					"Hyshaanth",
					"Iathrana",
					"Iazymnal",
					"Ibryiil",
					"Ilbaereth",
					"Ilbenalu",
					"Ildacer",
					"Ildroun",
					"Iliathor",
					"Iliathorr",
					"Ilnatar",
					"Ilphelkiir",
					"Immeril",
					"Ipyllasc",
					"Iranapha",
					"Irian",
					"Irithyl",
					"Ithruen",
					"Iydril",
					"Jaglene",
					"Kadelaryn",
					"Kelerandri",
					"Kelpor’ral",
					"Keove",
					"Kevanarial",
					"Koehlanna",
					"Korianthil",
					"Kraok",
					"Laelithar",
					"Laralytha",
					"Larenthanil",
					"Larethian",
					"Lathalas",
					"Laughingwater",
					"Le’Quella",
					"Leafbower",
					"Leafsigil",
					"Lharithlyn",
					"Lhoril",
					"Liadon",
					"Lightshiver",
					"Llundlar",
					"Loceath",
					"Maendellyn",
					"Maerdrym",
					"Meirityn",
					"Meliamne",
					"Mellerelel",
					"Melruth",
					"M'Haaren",
					"Miritar",
					"Mistrivvin",
					"Mistwinter",
					"Mithalvarin",
					"Moonbow",
					"Moondown",
					"Moonflower",
					"Moonglade",
					"Moonglamaer",
					"Moonshadow",
					"Moonsnow",
					"Moonweather",
					"Morningdove",
					"Mornmist",
					"Mrhulaedir",
					"Mystralath",
					"Nacnar",
					"Naelgrath",
					"Naïlo",
					"Narlbeth",
					"Neirdre",
					"Nelnueve",
					"Netyoive",
					"Never",
					"Nhachashaal",
					"Nhaéslal",
					"Nharimlur",
					"Ni’Tessine",
					"Nierde",
					"Nightmeadow",
					"Nightstar",
					"Nightwing",
					"Nihmedu",
					"Nimesin",
					"Nlossae",
					"Nolbrae",
					"Nyamtharsar",
					"Nyntynel",
					"Oakstaff",
					"Oakwood",
					"Ofandrus",
					"Olortynnal",
					"Olyrnn",
					"Omberdawn",
					"Ongluth",
					"Orama",
					"Orbryn",
					"Ortauré",
					"Ostoroth",
					"Othronus",
					"Oumryn",
					"Phenthae",
					"Pholont",
					"Presrae",
					"Q'Naepp,",
					"Qualanthri",
					"Rachiilstar",
					"Raedrimn",
					"Raethran",
					"Raryndur",
					"Reithel",
					"Revven",
					"Rhaevaern",
					"Rhothomir",
					"Rhuidhen",
					"Rhyllgallohyr",
					"Rivleam",
					"Rivvikyn",
					"Rothenel",
					"Runemaster",
					"Sarsantyr",
					"Selakiir",
					"Selevarun",
					"Selmer",
					"Selorn",
					"Shadowmantle",
					"Shadowwater",
					"Shaeremae",
					"Shaethe",
					"Shalandalan",
					"Sharrith",
					"Shaurlanglar",
					"Shraiee",
					"Shyr",
					"Siannodel",
					"Sicafei",
					"Siltral",
					"Silverbow",
					"Silverhand",
					"Silveroak",
					"Silverspear",
					"Sinaran",
					"Slenderbow",
					"Soryn",
					"Spellstalker",
					"Srinshee",
					"Starbrow",
					"Starglance",
					"Starglow",
					"Starnar",
					"Starym",
					"Stillhawk",
					"Stilmyst",
					"Straeth",
					"Strongbow",
					"Suithrasas",
					"Suldusk",
					"Sultaasar",
					"Summerstars",
					"Sunweaver",
					"Swordstar",
					"Sylvaranth",
					"Symbaern",
					"Talandren",
					"Talesspur",
					"Tamlyranth",
					"Tanagathor",
					"Tarnruth",
					"Tarsap",
					"Tarsis",
					"Tassarion",
					"Taurntyrith",
					"Teinithra",
					"Tellynnan",
					"Teshurr",
					"Thea",
					"Tiltathana",
					"Tlanbourn",
					"Tohrthaal",
					"Toralynnsyr",
					"Tornglara",
					"Torthtan",
					"Toryvhallen",
					"Trueshot",
					"Tsornyl",
					"Tyrneladhelu",
					"Uirthur",
					"Ulondarr",
					"Ulongyr",
					"Vandiir",
					"Veverell",
					"Vispasial",
					"Vyshaan",
					"Waelvor",
					"Wasanthi",
					"Whitethistle",
					"Windstar",
					"Windwalker",
					"Withrethin",
					"Xantrani",
					"Xiloscient",
					"Xistsrith",
					"Yaeldrin",
					"Yeschant",
					"Yhendorn",
					"Yraueme",
					"Yridnae",
					"Yundraer"
				]);
				break;
			//#endregion Elf
			//#region Goliath
			case "goliath":
				name = randomize([
					"Anakalathai",
					"Elanithino",
					"Gathakanathi",
					"Kalagiano",
					"Katho-Olavi",
					"Kolae-Gileana",
					"Ogolakanu",
					"Thuliaga",
					"Thunukalathi",
					"Thuunlakalaga",
					"Vaimei-Laga",
				]);
				break;
			//#endregion Goliath
			//#region Gnome
			case "gnome":
				name = randomize([
					"Beren",
					"Daergel",
					"Fleagol",
					"Folkor",
					"Garrick",
					"Glinckle",
					"Nackle",
					"Murnig",
					"Ningel",
					"Raulnor",
					"Scheppen",
					"Timbers",
					"Turen",
					"Uvarkk",
				]);
				break;
			//#endregion Gnome
			//#region Halfling
			case "halfling":
				name = randomize([
					"Appleblossom",
					"Bigheart",
					"Brightmoon",
					"Brushgather",
					"Cherrycheeks",
					"Cherryport",
					"Copperkettle",
					"Deephollow",
					"Elderberry",
					"Fairkettle",
					"Fastfoot",
					"Fatrabbit",
					"Fiddlewick",
					"Glenfellow",
					"Goldfound",
					"Goodbarrel",
					"Goodearth",
					"Greenbottle",
					"Greenleaf",
					"Highhill",
					"Hilltopple",
					"Hogcollar",
					"Honeypot",
					"Honeymaker",
					"Jamjar",
					"Kettlewhistle",
					"Leagallow",
					"Littlefoot",
					"Moxie",
					"Nimblefingers",
					"Porridgepot",
					"Quickknife",
					"Quickstep",
					"Reedfellow",
					"Satinleaf",
					"Shadowquick",
					"Silvereyes",
					"Smoothhands",
					"Stonebridge",
					"Stoutman",
					"Strongbones",
					"Sunmeadow",
					"Swiftwhistle",
					"Tallfellow",
					"Tealeaf",
					"Tenpenny",
					"Thistletop",
					"Thorngage",
					"Tosscobble",
					"Underbough",
					"Underfoot",
					"Warmwater",
					"Whispermouse",
					"Wildcloak",
					"Wildheart",
					"Wiseacre"
				]);
				break;
			//#endregion Halfling
			//#region Hobgoblin
			case "hobgoblin":
				name = randomize([
					"Baaz",
					"Draet",
					"Draguus",
					"Gan’duur",
					"Gantii Vus",
					"Ghaal Sehn",
					"Kuun",
					"Mbar’ost",
					"Mur Talaan",
					"Nasaar",
					"Rhukaan Taash",
					"Shaart",
					"Stormcaller",
					"Thaar",
					"Uhl",
					"Volaar"
				]);
				break;
			//#endregion Hobgoblin
			//#region Human
			case "human":
				name = randomize([
					"Archer",
					"Baker",
					"Becket",
					"Blackwood",
					"Brewer",
					"Butcher",
					"Carpenter",
					"Carter",
					"Carver",
					"Clark",
					"Cobbler",
					"Cooper",
					"Cook",
					"Crowe",
					"Dyer",
					"Everly",
					"Faire",
					"Farmer",
					"Faulkner",
					"Fisher",
					"Fletcher",
					"Flynn",
					"Freeman",
					"Fuller",
					"Gardener",
					"Glover",
					"Hunt",
					"Jenkins",
					"Judge",
					"Knight",
					"Law",
					"Mason",
					"Miller",
					"Miner",
					"Page",
					"Parker",
					"Payne",
					"Potter",
					"Rolfe",
					"Sawyer",
					"Slater",
					"Smith",
					"Taylor",
					"Thatcher",
					"Turner",
					"Ward",
					"Weaver",
					"Wood",
					"Wright"
				]);
				break;
			//#endregion Human
			//#region Ratfolk
			case "ratfolk":
				name = randomize([
					"Arrogans",
					"Blangorum",
					"Devia",
					"Elator",
					"Enganus",
					"Exulans",
					"Ingens",
					"Koopmani",
					"Lepida",
					"Leucopus",
					"Losea",
					"Lugens",
					"Mordax",
					"Niobe",
					"Norvegicus",
					"Ordii",
					"Osgoodi",
					"Palatina",
					"Palmarum",
					"Pococki",
					"Rattus",
					"Sanila",
					"Satarae",
					"Steini",
					"Tanezumi",
				]);
				break;
			//#endregion Ratfolk
			//#region Tabaxi
			case "tabaxi":
				name = randomize([
					"Bright Cliffs",
					"Distant Rain",
					"Mountain Tree",
					"Rumbling River",
					"Snoring Mountain"
				]);
				break;
			//#endregion Tabaxi
			//#region Triton
			case "triton":
				name = randomize([
					"Bazath",
					"Dnoth",
					"Jastogoth",
					"Mestoth",
					"Modrith",
					"Mokroth",
					"Morjath",
					"Morskath",
					"Morskoth",
					"Podith",
					"Paroxath",
					"Rakath",
					"Toplath",
					"Tyverith",
					"Valovith",
				]);
				break;
			//#endregion Triton
			default:
				break;
		}
		return name;
	},
	full: function(species: string = "human", gender: string = "female", age: string = "adult"): string {
		let hair = HairGenerator;
		switch (species) {
			case "genasi":
			case "kitsune":
			case "yuan-ti":
				return hair.color("human", gender, age);
			default:
				return hair.color(species, gender, age);
				// return hair.color(species, gender, age) + " " + hair.style(species, gender, age);
		}
	}
}