
const NameGenerator = {
	first: function(race, gender, age) {
		var name;
		switch (race) {
			case "aarakocra":
				name = randomize([
					"Aera",
					"Aial",
					"Aur", "Bara", "Deekek", "Errk", "Goost", "Heehk", "Ikki", "Kaaw", "Kleeck", "Koka", "Oorr", "Ost", "Ouss", "Quaf", "Quierk", "Rok", "Salleek", "Tuk", "Urreek", "Zeed"
				]);
				break;
			case "android":
				const genderlessNames = [
					"Asha",
					"Blue-17",
					"Emene-3",
					"Flick",
					"Garro",
					"Iseph",
					"Monitor",
					"Naga",
					"Null-9",
					"Olas",
					"Stringer",
					"Twenty",
					"Velocity",
					"Yose"
				];
				if (gender == "male") {
					name = randomize(genderlessNames);
				} else if (gender == "female") {
					let newArray = genderlessNames.concat([
						"Clara-247",
						"Melody",
						"Uilee"
					]);
					name = randomize(newArray);
				} else {
					name = randomize(genderlessNames);
				}
				break;
			case "anime":
				if (gender == "male") {
					name = randomize([
						"Akira",
						"Daichi",
						"Goro",
						"Haru",
						"Ichiro",
						"Jiro",
						"Katsuki",
						"Kenji",
						"Kuro",
						"Mirio",
						"Riku",
						"Ryo",
						"Ryuu",
						"Shiro",
						"Tenga"
					]);
				} else {
					name = randomize([
						"Akane",
						"Ayane",
						"Etsuko",
						"Hikari",
						"Izumi",
						"Kasumi",
						"Mei",
						"Mizuki",
						"Natsumi",
						"Ryuko",
						"Shino",
						"Shiori",
						"Takara",
						"Tomoko",
						"Tsuyu",
						"Yuna"
					]);
				}
				break;
			case "barathu":
				name = randomize([
					"The Warden",
					"Ulurio"
				])
				break;
			case "bear":
				name = randomize([
						"Bam",
						"Bash",
						"Bay",
						"Beef",
						"Bob",
						"Bog",
						"Boom",
						"Boo",
						"Bro",
						"Brak",
						"Brash",
						"Buff"
					]) + randomize([
						"",
						"er",
						"lin",
						"s",
						"town",
						"y"
					]);
				break;
			case "bloodfin":
				name = randomize([
					"Bitey",
					"Blood",
					"Bone",
					"Bubble",
					"Hard",
					"Hungry",
					"Leather",
					"Rock",
					"Salt",
					"Stone",
					"Thirsty",
					"Tough"
				]) + randomize([
					"Face",
					"Fin",
					"Jaw",
					"Maw",
					"Scale",
					"Tail",
					"Teeth",
					"Tooth"
				]);
				break;
			case "brakim":
				if (gender == "male") {
					name += randomize([
						""
					]);
				} else {
					name += randomize([
						"Daina"
					]);
				}
				break;
			case "brenneri":
				name = randomize([
					"Shurmie",
					"Burmo",
					"Foro",
					"Rowf",
					"Suko",
					"Rolu",
					"Rofo",
					"Lubo",
					"Bowuf",
					"Wufo",
					"Kulo",
					"Roru"
				]);
				break;
			case "brokkos":
				if (gender == "male") {
					name += randomize([
						"Adalbertu",
						"Alesiu",
						"Ambrosgiu",
						"Andria",
						"Antone",
						"Biasgiu",
						"Baltazaru",
						"Benghjaminu",
						"Bernardu",
						"Boaris",
						"Borisu",
						"Calistu",
						"Carlu",
						"Conradu",
						"Cristofanu",
						"Danelu",
						"Francescu",
						"Gasparu",
						"Giacumu",
						"Ghjaseppu",
						"Larenzu",
						"Lisandru",
						"Martinu",
						"Melchioru",
						"Niculaiu",
						"Petru",
						"Raimondu",
						"Saveriu",
						"Silvestru",
						"Simone",
						"Tumasgiu",
						"Volfgangu"
					]);
				} else {
					name += randomize([
						"Amandina",
						"Angiola",
						"Angioletta",
						"Angiolina",
						"Catalina",
						"Cicilia",
						"Cristina",
						"Edvige",
						"Elodia",
						"Ghjenuveffa",
						"Gnese",
						"Laurenza",
						"Laurenzia",
						"Lisabetta",
						"Lisandra",
						"Lucia",
						"Maria",
						"Martina",
						"Orsula",
						"Rita",
						"Teresia",
						"Saveria",
						"Sofia",
						"Stefania"
					]);
				}
				break;
			case "bugbear":
				let nameParts = ["bug", "bar", "ber", "krag", "hak", "kar", "rak", "dos", "gro", "umsch"];
				name = randomize(nameParts) + randomize(nameParts);
				name = name.charAt(0).toUpperCase() + name.slice(1);
				break;
			case "contemplative":
				if (gender == "male") {
					name = randomize([
						"Ailabiens 21:2"
					]);
				} else {
					name = randomize([
						""
					]);
				}
				break;
			case "copaxi":
				name = randomize([
					"Bryanisis",
					"Gnaucara",
					"Panacula",
					"Therseis"
				])
				break;
			case "damai":
				if (gender == "male") {
					name = randomize([
						"An",
						"Bing",
						"Chen",
						"Chung",
						"Confucius",
						"Cong",
						"Deshi",
						"Dewei",
						"Fo-hai",
						"Fo-hsing",
						"Gan",
						"Gao",
						"Genjo",
						"Ho",
						"Hsin",
						"Huang fu",
						"Hui-chao",
						"HuiK'o",
						"Jiang",
						"Jin",
						"Jing",
						"Jun",
						"Kong",
						"Lao-Tzu",
						"Lee",
						"Lei",
						"Li",
						"Li-Liang",
						"Liang",
						"Liko",
						"Manchu",
						"Ming",
						"Niao-ka",
						"On",
						"Qing-Nan",
						"Quon",
						"Shen",
						"Shing",
						"Sun",
						"Tung",
						"Uang",
						"Wang",
						"Wen",
						"Woo",
						"Wu-pen",
						"Xi-Wang",
						"Xiaoping",
						"Xin",
						"Xing-fu",
						"Yao"
					]);
				} else {
					name = randomize([
						"Ah lam",
						"An",
						"Bao",
						"Chen",
						"Chen-chio",
						"Chen-tao",
						"Chow",
						"Chu hua",
						"Chun",
						"Chyou",
						"Da-Shin",
						"Da-xia",
						"Fai",
						"Fang",
						"Fang hua",
						"Genji",
						"Guanyin",
						"Hua",
						"Hui fang",
						"Jing Wei",
						"Jun",
						"Kimora",
						"Le",
						"Lee",
						"Lei",
						"Li",
						"Li Hua",
						"Li Mei",
						"Li Ming",
						"Lian",
						"Lien",
						"Lin",
						"Ling",
						"Lixue",
						"Mee",
						"Mei",
						"Mingmei",
						"Quan",
						"Shu Fang",
						"Ting",
						"Ushi",
						"Xiang",
						"Xiao-Niao",
						"Xiao-Xing",
						"Xin",
						"Xiu Mei",
						"Yin",
						"Yu",
						"Zan",
						"Zhengqiu",
						"Zhi",
						"Zhijuan",
						"Zi"
					]);
				}
				break;
			case "dragonkin":
				// names listed after 'z' are from Starfinder books. Prior to this are dragonborn names.
				if (gender == "male") {
					name = randomize([
						"Adrex",
						"Arjhan",
						"Azzakh",
						"Balasar",
						"Baradad",
						"Bharash",
						"Bidreked",
						"Dadalan",
						"Dazzazn",
						"Direcris",
						"Donaar",
						"Fax",
						"Gargax",
						"Ghesh",
						"Gorbundus",
						"Greethen",
						"Heskan",
						"Hirrathak",
						"Ildrex",
						"Kaladan",
						"Kerkad",
						"Kiirith",
						"Kriv",
						"Maagog",
						"Medrash",
						"Mehen",
						"Mozikth",
						"Mreksh",
						"Mugrunden",
						"Nadarr",
						"Nithther",
						"Norkruuth",
						"Nykkan",
						"Pandjed",
						"Patrin",
						"Pijjirik",
						"Quarethon",
						"Rathkran",
						"Rhogar",
						"Rivaan",
						"Sethrekar",
						"Shamash",
						"Shedinn",
						"Srorthen",
						"Tarhun",
						"Torinn",
						"Trynnicus",
						"Valorean",
						"Vrondiss",
						"Zedaar",
						"Roslant"
					]);
				} else {
					name = randomize([
						"Akra",
						"Aasathra",
						"Antrara",
						"Aralyx",
						"Arava",
						"Biri",
						"Blendaeth",
						"Burana",
						"Chassath",
						"Daar",
						"Dentratha",
						"Doudra",
						"Driindar",
						"Eggren",
						"Farideh",
						"Findex",
						"Furrele",
						"Gesrethe",
						"Gilkass",
						"Harann",
						"Havilar",
						"Hethress",
						"Hillanot",
						"Jaxi",
						"Jezean",
						"Jheri",
						"Kadana",
						"Kava",
						"Korinn",
						"Megren",
						"Mijira",
						"Mishann",
						"Nala",
						"Nuthra",
						"Perra",
						"Pogranix",
						"Pyxrin",
						"Quespa",
						"Raiann",
						"Rezena",
						"Ruloth",
						"Saphara",
						"Savaran",
						"Sora",
						"Surina",
						"Synthrin",
						"Tatyan",
						"Thava",
						"Uadjit",
						"Vezera",
						"Zykroff",
						"Binata"
					]);
				}
				break;
			case "drow":
				if (gender == "male") {
					name = randomize([
						"Beidnach",
						"Ceobarn",
						"Ellandail",
						"Kunoris",
						"Raimsael"
					]);
				} else {
					name = randomize([
						"Caya",
						"Malindeil",
						"Villyth",
						"Zirachaun"
					]);
				}
				break;
			case "dwarf":
				if (gender == "male") {
					name = randomize([
						"Adrik",
						"Alberich",
						"Baern",
						"Barendd",
						"Beloril",
						"Brodain",
						"Brottor",
						"Bruenor",
						"Dain",
						"Dalgal",
						"Darrak",
						"Deldrig",
						"Delg",
						"Duergath",
						"Duravor",
						"Dworic",
						"Eberk",
						"Einkil",
						"Elaim",
						"Erias",
						"Fallond",
						"Fargrim",
						"Flint",
						"Gardain",
						"Gilthur",
						"Gimgen",
						"Gimurt",
						"Harbek",
						"Kildrak",
						"Kilvar",
						"Morgran",
						"Morkral",
						"Nalral",
						"Nordak",
						"Nuraval",
						"Oloric",
						"Olunt",
						"Orsik",
						"Oskar",
						"Ragnar",
						"Rangrim",
						"Reirak",
						"Rurik",
						"Taklinn",
						"Thoradin",
						"Thorin",
						"Thradal",
						"Tordek",
						"Traubon",
						"Travok",
						"Ulfgar",
						"Uraim",
						"Veit",
						"Vonbin",
						"Vondal",
						"Whurbin"
					]);
				} else {
					name = randomize([
						"Amber",
						"Anbera",
						"Artin",
						"Audhild",
						"Balifra",
						"Barbena",
						"Bardryn",
						"Bolhild",
						"Brumhilda",
						"Dagnal",
						"Dariff",
						"Delre",
						"Diesa",
						"Eldeth",
						"Eridred",
						"Falkrunn",
						"Fallthra",
						"Finellen",
						"Gillydd",
						"Gunnloda",
						"Gurdis",
						"Helgret",
						"Helja",
						"Hilda",
						"Hlin",
						"Ilde",
						"Jarana",
						"Kathra",
						"Kilia",
						"Kristryd",
						"Liftrasa",
						"Marastyr",
						"Mardred",
						"Morana",
						"Nalaed",
						"Nora",
						"Nurkara",
						"Oriff",
						"Ovina",
						"Riswynn",
						"Sannl",
						"Therlin",
						"Thodris",
						"Thoretta",
						"Thorina",
						"Torbera",
						"Tordrid",
						"Torgga",
						"Torveda",
						"Urshar",
						"Valida",
						"Vistra",
						"Vonana",
						"Werydd",
						"Whurdred",
						"Yurgunn"
					]);
				}
				break;
			case "elf":
				if (gender == "male") {
					name = randomize([
						"Adran",
						"Aelar",
						"Aramil",
						"Arannis",
						"Aust",
						"Beiro",
						"Berrian",
						"Carric",
						"Enialis",
						"Erdan",
						"Erevan",
						"Galinndan",
						"Hadarai",
						"Heian",
						"Himo",
						"Immeral",
						"Ivellios",
						"Laucian",
						"Mindartis",
						"Paelias",
						"Peren",
						"Quarion",
						"Riardon",
						"Rolen",
						"Soveliss",
						"Thamior",
						"Tharivol",
						"Theren",
						"Varis"
					]);
				} else {
					name = randomize([
						"Adrie",
						"Althaea",
						"Anastrianna",
						"Andraste",
						"Antinua",
						"Bethrynna",
						"Birel",
						"Caelynn",
						"Drusilia",
						"Enna",
						"Felosial",
						"Ielenia",
						"Jelenneth",
						"Keyleth",
						"Leshanna",
						"Lia",
						"Meriele",
						"Mialee",
						"Naivara",
						"Quelenna",
						"Quillathe",
						"Sariel",
						"Shanairra",
						"Shava",
						"Silaqui",
						"Theirastra",
						"Thia",
						"Vadania",
						"Valanthe",
						"Xanaphia"
					]);
				}
				break;
			case "eox":
				if (gender == "male") {
					name = randomize([
						"Gevalarsk",
						"Larex",
						"Voxel",
						"Welles"
					]);
				} else {
					name = randomize([
						"Danine",
						"Gretal",
						"Hebiza",
						"Jaklyn",
						"Xerantha",
						"Zeera"
					]);
				}
				break;
			case "firbolg":
				name = randomize([
					"Beech",
					"Birch",
					"Dogwood",
					"Hemlock",
					"Magnolia",
					"Maple",
					"Oak",
					"Pine",
					"Palm",
					"Redwood",
					"Sequoia",
					"Spruce",
					"Sycamore",
					"Walnut",
					"Willow",
					"Wormwood"
				]);
				break;
			case "firenewt":
				name = randomize([
					"Sahalia (lizard)",
					"Nariyin (fiery)",
					"Harq (burn)",
					"'Ahraq (scald)",
					"Rawasib (magma)",
					"Damalon (boil)",
					"Dukhanon (smoke)",
					"Dhabulon (sear)",
					"Manalon (roast)",
					"Yaqlaa (fry)",
					"Nar (fire)",
					"Alnakhbu (toast)",
					"Lahab (flame)"
				]);
				break;
			case "ghibrani":
				name = randomize([
					"Koseemo",
					"Alomir",
					"Dystane",
					"Klarima"
				]);
				break;
			case "goblin":
				const goblinNameParts = ["krun", "grum", "gri", "nion", "krad", "dia", "rita", "rip", "borgor", "bago", "gut", "proud", "pol", "bak"];
				var name = randomize(goblinNameParts);
				name += randomize(goblinNameParts);
				name = name.charAt(0).toUpperCase() + name.slice(1);
				break;
			case "gnome":
				if (gender == "male") {
					name = randomize([
						"Alston",
						"Alvyn",
						"Boddynock",
						"Brocc",
						"Burgell",
						"Dimble",
						"Eldon",
						"Erky",
						"Fonkin",
						"Frug",
						"Gerbo",
						"Gimble",
						"Glim",
						"Jebodah",
						"Jebeddo",
						"Kellen",
						"Namfoodle",
						"Orryn",
						"Roondar",
						"Seebo",
						"Sindri",
						"Warryn",
						"Wrenn",
						"Zook"
					]);
				} else {
					name = randomize([
						"Bimpnottin",
						"Breena",
						"Caramip",
						"Carlin",
						"Donella",
						"Duvamil",
						"Ella",
						"Ellyjobell",
						"Ellywick",
						"Lilli",
						"Loopmottin",
						"Lorilla",
						"Mardnab",
						"Nissa",
						"Nyx",
						"Oda",
						"Orla",
						"Roywyn",
						"Shamil",
						"Tana",
						"Waywocket",
						"Zanna"
					]);
				}
				name += " " + randomize([
					"Beren",
					"Daergel",
					"Folkor",
					"Garrick",
					"Nackle",
					"Murnig",
					"Ningel",
					"Raulnor",
					"Scheppen",
					"Timbers",
					"Turen"
				]);
				break;
			case "grippli":
				if (gender == "male") {
					name = randomize([
						"Brillup",
						"Bullgup",
						"Chirk",
						"Dart",
						"Labllup",
						"Quartle",
						"Rublup",
						"Willup"
					]);
				} else {
					name = randomize([
						"Bellum",
						"Kaillum",
						"Que",
						"Quon",
						"Ruue",
						"Toum",
						"Wuon"
					]);
				}
				break;
			case "haan":
				if (gender == "male") {
					name = randomize([
						"Ipsoth"
					]);
				} else {
					name = randomize([
						""
					]);
				}
				break;
			case "halfling":
				if (gender == "male") {
					name = randomize([
						"Alton",
						"Ander",
						"Bernie",
						"Bobbin",
						"Cade",
						"Callus",
						"Corrin",
						"Dannad",
						"Danniel",
						"Eddie",
						"Egart",
						"Eldon",
						"Errich",
						"Fildo",
						"Finnan",
						"Franklin",
						"Garret",
						"Garth",
						"Gilbert",
						"Gob",
						"Harol",
						"Igor",
						"Jasper",
						"Keith",
						"Kevin",
						"Lazam",
						"Lerry",
						"Lindal",
						"Lyle",
						"Merric",
						"Mican",
						"Milo",
						"Morrin",
						"Nebin",
						"Nevil",
						"Osborn",
						"Ostran",
						"Oswalt",
						"Perrin",
						"Poppy",
						"Reed",
						"Roscoe",
						"Sam",
						"Shardon",
						"Tye",
						"Ulmo",
						"Wellby",
						"Wendel",
						"Wenner",
						"Wes"
					]);
				} else {
					name = randomize([
						"Alain",
						"Andry",
						"Anne",
						"Bella",
						"Blossom",
						"Bree",
						"Callie",
						"Chenna",
						"Cora",
						"Dee",
						"Dell",
						"Eida",
						"Eran",
						"Euphemia",
						"Georgina",
						"Gynnie",
						"Harriet",
						"Jasmine",
						"Jillian",
						"Jo",
						"Kithri",
						"Lavinia",
						"Lidda",
						"Maegan",
						"Marigold",
						"Merla",
						"Mia",
						"Myria",
						"Nedda",
						"Nikki",
						"Nora",
						"Olivia",
						"Paela",
						"Pearl",
						"Pennie",
						"Philomena",
						"Portia",
						"Robbie",
						"Rose",
						"Saral",
						"Seraphina",
						"Shaena",
						"Stacee",
						"Tawna",
						"Thea",
						"Trym",
						"Tyna",
						"Vani",
						"Verna",
						"Wella",
						"Willow"
					]);
				}
				break;
			case "human":
				if (gender == "male") {
					name = randomize([
						"Adam",
						"Alan",
						"Albert",
						"Alex",
						"Arnold",
						"Arthur",
						"Axel",
						"Barney",
						"Bartholomew",
						"Bennet",
						"Berenger",
						"Bernard",
						"Bruce",
						"Bryce",
						"Charles",
						"Conrad",
						"David",
						"Edwin",
						"Eliot",
						"Elton",
						"Fred",
						"Geoffrey",
						"George",
						"Gerald",
						"Gilbert",
						"Giles",
						"Godfrey",
						"Gunter",
						"Guy",
						"Hammond",
						"Henry",
						"Herbert",
						"Hugh",
						"John",
						"Lance",
						"Leon",
						"Lionel",
						"Locke",
						"Manfred",
						"Mark",
						"Martin",
						"Matthew",
						"Michael",
						"Miles",
						"Nicholas",
						"Nigel",
						"Noah",
						"Norman",
						"Paul",
						"Peter",
						"Ralph",
						"Randal",
						"Raymond",
						"Richard",
						"Robert",
						"Roger",
						"Roland",
						"Rolf",
						"Simon",
						"Thomas",
						"Tim",
						"Trevor",
						"Tristram",
						"William",
						"Zane"
					]);
				} else {
					name = randomize([
						"Aila",
						"Alice",
						"Alyson",
						"Anne",
						"Ariana",
						"Aubrey",
						"Audry",
						"Beth",
						"Bridget",
						"Brien",
						"Brittany",
						"Caterina",
						"Claire",
						"Cristina",
						"Elaine",
						"Elizabeth",
						"Ella",
						"Elle",
						"Emily",
						"Emma",
						"Eva",
						"Haley",
						"Helen",
						"Izzy",
						"Jane",
						"Janet",
						"Joan",
						"Juliana",
						"Julliet",
						"Katherine",
						"Lena",
						"Lizzy",
						"Margaret",
						"Margery",
						"Martha",
						"Mary",
						"Sam",
						"Sarah",
						"Sue"
					]);
				}
				break;
			case "infernal":
				if (gender == "male") {
					name = randomize([
						"Abad",
						"Ahrim",
						"Akmen",
						"Akmenos",
						"Amnon",
						"Andram",
						"Astar",
						"Balam",
						"Barakas",
						"Bathin",
						"Caim",
						"Chem",
						"Cimer",
						"Cressel",
						"Damakos",
						"Ekemon",
						"Euron",
						"Fenriz",
						"Forcas",
						"Habor",
						"Iados",
						"Kairon",
						"Leucis",
						"Mamnen",
						"Mantus",
						"Marbas",
						"Melech",
						"Merihim",
						"Modean",
						"Mordai",
						"Mormo",
						"Morthos",
						"Nicor",
						"Nirgel",
						"Oriax",
						"Paymon",
						"Pelaios",
						"Purson",
						"Qemuel",
						"Raam",
						"Rimmon",
						"Sammal",
						"Skamos",
						"Tethren",
						"Thamuz",
						"Therai",
						"Valafar",
						"Vassago",
						"Xappan",
						"Zepar",
						"Zephan"
					]);
				} else {
					name = randomize([
						"Akta",
						"Anakis",
						"Armara",
						"Astaro",
						"Aym",
						"Azza",
						"Beleth",
						"Bryseis",
						"Bune",
						"Criella",
						"Damaia",
						"Decarabia",
						"Ea",
						"Gadreel",
						"Gomory",
						"Hecat",
						"Ishte",
						"Jezebeth",
						"Kali",
						"Kallista",
						"Kasdeya",
						"Lerissa",
						"Lilith",
						"Makaria",
						"Manea",
						"Markosian",
						"Mastema",
						"Naamah",
						"Nemeia",
						"Nija",
						"Orianna",
						"Osah",
						"Phelaia",
						"Prosperine",
						"Purah",
						"Pyra",
						"Rieta",
						"Ronobe",
						"Ronwe",
						"Seddit",
						"Seere",
						"Sekhmet",
						"Semyaza",
						"Shava",
						"Shax",
						"Sorath",
						"Uzza",
						"Vapula",
						"Vepar",
						"Verin"
					]);
				}
				break;
			case "ikeshti":
				if (gender == "male") {
					name = randomize([
						""
					]);
				} else {
					name = randomize([
						"Merthinett"
					]);
				}
				break;
			case "izalguun":
				if (gender == "male") {
					name = randomize([
						"Ralveen"
					]);
				} else {
					name = randomize([
						"Naarma",
						"Prima",
						"Ulyapses"
					]);
				}
				break;
			case "kalo":
				if (gender == "male") {
					name = randomize([
						"Alluguoth",
						"Ushuul"
					]);
				} else {
					name = randomize([
						"Suulhu-Huur",
						"Vhoosh"
					]);
				}
				break;
			case "kasatha":
				if (gender == "male") {
					name = randomize([
						"Altronus",
						"Boojan",
						"Jadnura",
						"Kahir",
						"Kan-Zal"
					]);
				} else {
					name = randomize([
						"Muldoi",
						"Olmehya",
						"Taylehm",
						"Tolara",
						"Yotto"
					]);
				}
				break;
			case "kenku":
				name = randomize([
					"Smasher",
					"Clanger",
					"Slicer",
					"Basher",
					"Rat Scratch",
					"Whistler",
					"Mouser",
					"Growler",
					"Sail Snap",
					"Hammerer",
					"Cutter"
				]);
				break;
			case "kish":
				if (gender == "male") {
					name = randomize([
						"Gundi",
						"Hoyfeq",
						"Osteth",
						"Xavra"
					]);
				} else {
					name = randomize([
						"Hybeki",
						"Iokki",
						"Phej",
						"Tzayl"
					]);
				}
				break;
			case "kobold":
				name = randomize([
					"Arix",
					"Eks",
					"Ett",
					"Galax",
					"Garu",
					"Hagnar",
					"Hox",
					"Irtos",
					"Kashak",
					"Kovi",
					"Kubo",
					"Meepo",
					"Molo",
					"Rotom",
					"Ohsoss",
					"Sagin",
					"Sik",
					"Sniv",
					"Taklak",
					"Tes",
					"Urak",
					"Varn"
				]);
				break;
			case "kuo-toa":
				name = randomize(["Too", "Mmot", "Loo", "Chog", "Laag", "Shoo", "Doo", "Gib", "Glol", "Kur", "Dag", "Gap", "Blop"]) +  randomize(["ploorg", "hagoon", "goorg", "bogg", "goop", "loorg", "daga", "gool", "goonleth"]);
				break;
			case "lashunta":
				if (gender == "male") {
					name = randomize([
						"Arvin",
						"Ilia",
						"Ikimsi",
						"Lin",
						"Orsis",
						"Rafelo",
						"Tahomen",
						"Twonas En",
						"Whaloss"
					]);
				} else {
					name = randomize([
						"Alsuka",
						"Avisa",
						"Ilia",
						"Muhali",
						"Petine",
						"Raia",
						"Raiyiri",
						"Ralkawi",
						"Taza",
						"Voryna",
						"Xatina"
					]);
				}
				break;
			case "lizardfolk":
				name = randomize([
					"Achuak (green)",
					"Aryte (war)",
					"Baeshra (animal)",
					"Darastrix (dragon)",
					"Garurt (axe)",
					"Irhtos (secret)",
					"Jhank (hammer)",
					"Kepesk (storm)",
					"Kethend (gem)",
					"Korth (danger)",
					"Kosj (small)",
					"Kothar (demon)",
					"Litrix (armor)",
					"Mirik (song)",
					"Othokent (smart)",
					"Sauriv (eye)",
					"Throden (many)",
					"Thurkear (night)",
					"Usk (iron)",
					"Valignat (burn)",
					"Vargach (battle)",
					"Verthica (mountain)",
					"Vutha (black)",
					"Vyth (steel)"
				]);
				break;
			case "modron":
				const modronLetters = [
					"alpha",
					"beta",
					"gamma",
					"delta",
					"epsilon",
					"zeta",
					"eta",
					"theta",
					"iota",
					"kappa",
					"lambda",
					"mu",
					"nu",
					"xi",
					"omicron",
					"pi",
					"rho",
					"sigma",
					"tau",
					"upsilon",
					"phi",
					"chi",
					"psi",
					"omega"
				];
				name = randomize(modronLetters);
				for (let i = 0; i < 6; i++) {
					name += " " + randomize(modronLetters);
				}
				break;
			case "morlamaw":
				if (gender == "male") {
					name = randomize([
						"Teltham",
						"Zavlig"
					]);
				} else {
					name = randomize([
						"Hinevera",
						"Irtrine",
						"Oshessa"
					]);
				}
				break;
			case "nuar":
				if (gender == "male") {
					name = randomize([
						"Orghuun"
					]);
				} else {
					name = randomize([
						"Glahr"
					]);
				}
				break;
			case "orc":
				if (gender == "male") {
					name = randomize([
						"Dench",
						"Feng",
						"Gell",
						"Henk",
						"Holg",
						"Imsh",
						"Keth",
						"Krusk",
						"Mhurren",
						"Ront",
						"Thokk",
						"Shump",
						"Argran",
						"Braak",
						"Brug",
						"Cagak",
						"Dorn",
						"Dren",
						"Druuk",
						"Gnarsh",
						"Grumbar",
						"Gubrash",
						"Hagren",
						"Hogar",
						"Karash",
						"Karg",
						"Korag",
						"Lubash",
						"Megged",
						"Mord",
						"Morg",
						"Nil",
						"Nybarg",
						"Odorr",
						"Ohr",
						"Rendar",
						"Resh",
						"Rrath",
						"Sark",
						"Scrag",
						"Sheggen",
						"Tanglar",
						"Tarak",
						"Thar",
						"Trag",
						"Ugarth",
						"Varg",
						"Vilberg",
						"Yurk",
						"Zed"
					]);
				} else {
					name = randomize([
						"Arha",
						"Baggi",
						"Bendoo",
						"Bilga",
						"Brakka",
						"Creega",
						"Drenna",
						"Ekk",
						"Emen",
						"Engong",
						"Fistula",
						"Gaaki",
						"Gorga",
						"Grai",
						"Greeba",
						"Grigi",
						"Gynk",
						"Hrathy",
						"Huru",
						"Ilga",
						"Kabbarg",
						"Kansif",
						"Lagazi",
						"Lezre",
						"Murgen",
						"Murook",
						"Myev",
						"Nagrette",
						"Neega",
						"Nella",
						"Nogu",
						"Oolah",
						"Ootah",
						"Ovak",
						"Ownka",
						"Puyet",
						"Reeza",
						"Shautha",
						"Silgre",
						"Sisyrus",
						"Sutha",
						"Tagga",
						"Tawar",
						"Tomph",
						"Ubada",
						"Vanchu",
						"Vola",
						"Volen",
						"Vorka",
						"Yevelda",
						"Zagga"
					]);
				}
				break;
			case "osharu":
				if (gender == "male") {
					name = randomize([
						"Cheliko",
						"Olavier",
						"Pahdric",
						"Ponatia"
					]);
				} else {
					name = randomize([
						"Kiodea",
						"Saguntes",
						"Zoni"
					]);
				}
				break;
			case "pahtra":
				if (gender == "male") {
					name = randomize([
						"Shaakar",
						"Tillik"
					]);
				} else {
					name = randomize([
						"M'Ress"
					]);
				}
				break;
			case "reptoid":
				if (gender == "male") {
					name = randomize([
						""
					]);
				} else {
					name = randomize([
						"Triloteya"
					]);
				}
				break;
			case "ryphorian":
				if (gender == "male") {
					name = randomize([
						"Brax",
						"Flennish",
						"Sindeo",
						"Tefarian"
					]);
				} else {
					name = randomize([
						"Echera",
						"Nyizin",
						"Wenda"
					]);
				}
				break;
			case "sarcesian":
				if (gender == "male") {
					name = randomize([
						"Mengian",
						"Yex",
					]);
				} else {
					name = randomize([
						"Fayetta"
					]);
				}
				break;
			case "shirren":
				if (gender == "male") {
					name = randomize([
						"Dench",
						"Keskodai",
						"Philt",
						"Vrisken"
					]);
				} else if (gender == "female") {
					name = randomize([
						"Salask",
						"Theskell",
						"Xarafo",
						"Zhast"
					]);
				} else {
					//Host
					name = randomize([
						"Chiskisk",
						"Kinnakt",
						"Zigvigix"
					]);
				}
				break;
			case "shobhad":
				if (gender == "male") {
					name = randomize([
						"Gallask",
						"Hurondo"
					]);
				} else {
					name = randomize([
						"Maarbadvae",
						"Shazzag"
					]);
				}
				break;
			case "skittermander":
				if (gender == "male") {
					name = randomize([
						"Dakoyo",
						"Eshki",
						"Gazigaz"
					]);
				} else {
					name = randomize([
						"Nako",
						"Quonx",
						"Suwalnazka"
					]);
				}
				break;
			case "tabaxi":
				name = randomize([
					"Cloud on the Mountaintop (Cloud)",
					"Five Timber (Timber)",
					"Jade Shoe (Jade)",
					"Left-Handed Hummingbird (Bird)",
					"Seven Thundercloud (Thunder)",
					"Skirt of Snakes (Snake)",
					"Smoking Mirror (Smoke)"
				]);
				break;
			case "telia":
				name = randomize([
					"Baka",
					"Damu",
					"Gar",
					"Gura",
					"Ini",
					"Jappa",
					"Kinlek",
					"Krull",
					"Lim",
					"Lop",
					"Nortle",
					"Nulka",
					"Olo",
					"Ploqwat",
					"Quee",
					"Queg",
					"Quott",
					"Sunny",
					"Tibor",
					"Ubo",
					"Uhok",
					"Wabu",
					"Xelbuk",
					"Xopa",
					"Yog"
				]);
				break;
			case "verthani":
				if (gender == "male") {
					name = randomize([
						"Chryson",
						"Pemano"
					]);
				} else {
					name = randomize([
						""
					]);
				}
				break;
			case "vesk":
				if (gender == "male") {
					name = randomize([
						"Julzakama",
						"Katazoa",
						"Nakonechkin",
						"Radaszam",
						"Razda",
						"Sabatra",
						"Xalak-don",
						"Yuluzak"
					]);
				} else {
					name = randomize([
						"Berchta",
						"Joyozalva",
						"Kelria",
						"Obozaya",
						"Radaszam",
						"Shonvyzam",
						"Svata",
						"Voorkis"
					]);
				}
				break;
			case "virtue":
				name = randomize([
					"Ambition",
					"Art",
					"Beauty",
					"Carrion",
					"Chant",
					"Chivalry",
					"Conflict",
					"Creed",
					"Death",
					"Debauchery",
					"Despair",
					"Doom",
					"Doubt",
					"Dread",
					"Ecstasy",
					"Ennui",
					"Entropy",
					"Excellence",
					"Fear",
					"Glory",
					"Gluttony",
					"Grief",
					"Hate",
					"Hope",
					"Horror",
					"Ideal",
					"Ignominy",
					"Joy",
					"Laughter",
					"Love",
					"Lust",
					"Mayhem",
					"Misery",
					"Mockery",
					"Murder",
					"Muse",
					"Music",
					"Mystery",
					"Nowhere",
					"Open",
					"Pain",
					"Passion",
					"Poetry",
					"Power",
					"Quest",
					"Random",
					"Reverence",
					"Revulsion",
					"Secrecy",
					"Sorrow",
					"Temerity",
					"Torment",
					"Tragedy",
					"Vice",
					"Virtue",
					"War",
					"Weary",
					"Wit"
				]);
				break;
			case "vlaka":
				if (gender == "male") {
					name = randomize([
						"Lycos"
					]);
				} else {
					name = randomize([
						"Bargai"
					]);
				}
				break;
			case "wilkoss":
				if (gender == "male") {
					name = randomize(["Bee", "Bun", "Er", "Foz", "Gon", "Gro", "Ker"]);
					name += randomize(["ker", "son", "nie", "zie", "zo", "ver", "mit"]);
				} else {
					name = randomize(["Ab", "Cam", "Jan", "Ros", "Zo", "Prair"]);
					name += randomize(["by", "illa", "ice", "ita", "eey"]);
				}
				break;
			case "ysoki":
				name = randomize([
					"Bena",
					"Coponisa",
					"Cors",
					"Diwata",
					"Fitch",
					"Goba",
					"Jabaxa",
					"Ketch",
					"Kib",
					"Lezosk",
					"Lhana",
					"Livewire",
					"Lolo",
					"Niknik",
					"Nokoriso",
					"Podswald",
					"Quig",
					"Resk",
					"Royo",
					"Scratch",
					"Sim",
					"Twik",
					"Xix",
					"Zaz"
				]);
			default:
				if (gender == "male") {
					name = randomize([
						"Acko",
						"Babu",
						"Betuz",
						"Carse",
						"Dak",
						"Dengar",
						"Dexar",
						"Ejlo",
						"Enzo",
						"Farmik",
						"Grik",
						"Harpo",
						"Hurrin",
						"Imman",
						"Jyur",
						"Kwapo",
						"Larry",
						"Lirf",
						"Mako",
						"Mvu",
						"Nando",
						"Nipuum",
						"Orrin",
						"Oq",
						"Puy",
						"Preelo",
						"Quipss",
						"Renar",
						"Rimpi",
						"Seirgol",
						"Suje",
						"Tampit",
						"Trewk",
						"Ullo",
						"Vibe",
						"Vos",
						"Wlop",
						"Xyrnos",
						"Yyy",
						"Zop"
					]);
				} else {
					name = randomize([
						"Aayla",
						"Aewo",
						"Briz",
						"Beat",
						"Carf",
						"Cartu",
						"Denza",
						"Dia",
						"Ejla",
						"Eppi",
						"Firne",
						"Friju",
						"Giquop",
						"Grorn",
						"Hinok",
						"Izzy",
						"Ion'yar",
						"Jaina",
						"Jestofu",
						"Korlij",
						"Lushav",
						"Miral",
						"Nupay",
						"Oshiquo",
						"Prinyak",
						"Qralu",
						"Raura",
						"Shaak",
						"Synapti",
						"Tuzzzozox",
						"Unbrito",
						"Vaournik",
						"Viol",
						"Wyrniz",
						"Xika",
						"Yu'vu",
						"Zliwqu"
					]);
				}
				break;
		}
		return name;
	},
	last: function(race, gender, age) {
		var name;
		switch (race) {
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
			case "brokkos":
				/*
					Aiutatu - helper, assists with any role that has insufficient Brokkos
					Cuocu - cook/chef
					Doto - healer
					Fermia - childcare
					Guardia - guard
					Maestru - teacher
					Produ - maker, craftsman
					Raccogli - gatherer/forager
					Scavo - digger
				*/
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
				break;
			case "dragonkin":
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
			case "drow":
				name = randomize([
					"Arabani",
					"Brevak",
					"Rycast",
					"Vex",
					"Xicton",
					"Zeizerer"
				]);
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
					"Daerdahk",
					"Dankil",
					"Daraln",
					"Deepdelver",
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
					"Hammerstone",
					"Helcral",
					"Holderhek",
					"Ironfist",
					"Kreel",
					"Loderr",
					"Lutgehr",
					"Morigak",
					"Orcfoe",
					"Rakankrak",
					"RubyEye",
					"Rumnaheim",
					"Silveraxe",
					"Silverstone",
					"Steelfist",
					"Stonespire",
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
			case "elf":
				name = randomize([
					"Amakiir (Gemflower)",
					"Amastacia (Starflower)",
					"Galanodel (Moonwhisper)",
					"Holimion (Diamonddew)",
					"Ilphelkiir (Gemblossom)",
					"Liadon (Silverfrond)",
					"Meliamne (Oakenheel)",
					"Naïlo (Nightbreeze)",
					"Siannodel (Moonbrook)",
					"Xiloscient (Goldpetal)"
				]);
				break;
			case "eox":
				name = randomize([
					"Coranith",
					"Darksend",
					"Eskolar",
					"Mortrant",
					"Nor",
					"Rapinder",
					"Shatrava",
					"Vesh",
					"Vuraanka"
				]);
				break;
			case "gnome":
				name = randomize([
					"Aleslosh",
					"Ashhearth",
					"Badger",
					"Cloak",
					"Doublelock",
					"Filchbatter",
					"Fnipper",
					"Hamisfore",
					"Ku",
					"Nim",
					"Oneshoe",
					"Pock",
					"Sparklegem",
					"Stumbleduck"
				]);
				break;
			case "halfling":
				name = randomize([
					"Appleblossom",
					"Bigheart",
					"Brightmoon",
					"Brushgather",
					"Cherrycheeks",
					"Copperkettle",
					"Deephollow",
					"Elderberry",
					"Fastfoot",
					"Fatrabbit",
					"Glenfellow",
					"Goldfound",
					"Goodbarrel",
					"Goodearth",
					"Greenbottle",
					"Greenleaf",
					"Highhill",
					"High-hill",
					"Hilltopple",
					"Hogcollar",
					"Honeypot",
					"Jamjar",
					"Kettlewhistle",
					"Leagallow",
					"Littlefoot",
					"Moxie",
					"Nimblefingers",
					"Porridgepot",
					"Quickstep",
					"Reedfellow",
					"Shadowquick",
					"Silvereyes",
					"Smoothhands",
					"Stonebridge",
					"Stoutbridge",
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
			case "human":
				name = randomize([
					"Archer",
					"Baker",
					"Butcher",
					"Carpenter",
					"Carter",
					"Carver",
					"Clark",
					"Cooper",
					"Cook",
					"Dyer",
					"Faire",
					"Farmer",
					"Faulkner",
					"Fisher",
					"Freeman",
					"Fuller",
					"Gardener",
					"Glover",
					"Hammond",
					"Hayter",
					"Hunt",
					"Judge",
					"Knight",
					"Mason",
					"Miller",
					"Miner",
					"Nash",
					"Page",
					"Parker",
					"Potter",
					"Sawyer",
					"Sharp",
					"Slater",
					"Smith",
					"Swift",
					"Taylor",
					"Thatcher",
					"Turner",
					"Weaver",
					"Wong",
					"Wood",
					"Wright"
				]);
				break;
			case "kasatha":
				name = randomize([
					"Pelata",
					"Solstarni"
				]);
			case "lashunta":
				name = randomize([
					"Camulan",
					"Kopalli",
					"Marcos",
					"Nepobo",
					"Tamm"
				]);
			case "ryphorian":
				name = randomize([
					"Mel"
				]);
			case "tabaxi":
				name = randomize([
					"Bright Cliffs",
					"Distant Rain",
					"Mountain Tree",
					"Rumbling River",
					"Snoring Mountain"
				]);
				break;
			case "verthani":
				name = randomize([
					"",
					"",
					"",
					"Teth"
				]);
			case "vesk":
				name = randomize([
					"",
					"",
					"",,
					"Abazobari",
					"Yormin"
				]);
			default:
				break;
		}
		return name;
	},
	full: function(race, gender, age) {
		let n = NameGenerator;
		switch (race) {
			case "aasimar":
				return n.first("human", gender, age) + " " + n.last("human", gender, age);
			case "android":
				return n.first("android", gender, age);
			case "bear":
				return n.first("bear", gender, age);
			case "bloodfin":
				return n.first("bloodfin", gender, age);
			case "brenneri":
				return n.first("brenneri", gender, age);
			case "brokkos":
				return n.last("brokkos", gender, age) + " " + n.first("brokkos", gender, age);
			case "bugbear":
				return n.first("bugbear", gender, age);
			case "damai":
				return (n.first("damai", gender, age) + " " + n.last("damai", gender, age));
			case "dragonkin":
				return (n.first("dragonkin", gender, age) + " " + n.last("dragonkin", gender, age));
			case "drow":
				return (n.first("drow", gender, age) + " " + n.last("drow", gender, age));
			case "dwarf":
				return (n.first("dwarf", gender, age) + " " + n.last("dwarf", gender, age));
			case "elf":
				return (n.first("elf", gender, age) + " " + n.last("elf", gender, age));
			case "espraksa":
				return n.first("aarakocra", gender, age);
			case "firbolg":
				return n.first("firbolg", gender, age);
			case "firenewt":
				return n.last("firenewt", gender, age);
			case "geniekin":
				return n.first("human", gender, age);
			case "gnome":
				return (n.first("gnome", gender, age) + " " + n.last("gnome", gender, age));
			case "goblin":
				return n.first("goblin", gender, age);
			case "grippli":
				return n.first("grippli", gender, age);
			case "halfling":
				return (n.first("halfling", gender, age) + " " + n.last("halfling", gender, age));
			case "halfelf":
				return (n.first("elf", gender, age) + " " + n.last("human", gender, age));
			case "halforc":
				return (n.first("orc", gender, age) + " " + n.last("human", gender, age));
			case "human":
				return n.first("human", gender, age) + " " + n.last("human", gender, age);
			case "kasatha":
				return n.first("kasatha", gender, age) + " " + n.last("kasatha", gender, age);
			case "kish":
				return n.first("kish", gender, age);
			case "kitsune":
				return n.first("anime", gender, age) + " " + n.last("anime", gender, age);
			case "kobold":
				return n.first("kobold", gender, age);
			case "lashunta":
				return n.first("lashunta", gender, age) + " " + n.last("lashunta", gender, age);
			case "orc":
				return n.first("orc", gender, age);
			case "pahtra":
				return n.first("pahtra", gender, age) + " " + n.last("pahtra", gender, age);
			case "raxilite":
				return n.first("orc", gender, age);
			case "sro":
				return n.first("modron", gender, age);
			case "telia":
				return n.first("telia", gender, age);
			case "tiefling":
				var name;
				if (Math.round(Math.random()) == 0) {
					name = n.first("virtue", gender, age);
				} else {
					name = n.first("infernal", gender, age);
				}
				return name;
			case "vesk":
				return n.first("vesk", gender, age);
			case "wilkoss":
				return n.first("wilkoss", gender, age);
			case "ysoki":
				return n.first("ysoki", gender, age);
			default:
				return n.first(race, gender, age);
		}
	}
}