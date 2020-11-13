const races = ["Aarakocra", "Aasimar", "Bloodfin", "Brokkos", "Bugbear", "Burrowfolk", "Dragonborn", "Drow", "Dwarf", "Elf", "Firbolg", "Firenewt", "Gnome", "Goblin", "Grippli", "Grung", "Halfling", "HalfOrc", "Human", "Kenku", "Kobold", "Kuo-toa", "Orc", "Tabaxi", "Tiefling", "Tortle", "Triton"];

function getGender() {
	return randomize(["f", "m"]);
}

const racialTraits = [
	{
		race: "Human",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 70,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Adam", "Adelard", "Alan", "Albert", "Aldous", "Aldred", "Alexander", "Alisander", "Anselm", "Arnold", "Arthur", "Bardolph", "Barnabas", "Bartholomew", "Basil", "Bennet", "Berenger", "Bernard", "Bertram", "Bryce", "Castor", "Charles", "Clerebold", "Conrad", "David", "Diggory", "Dinadan", "Drogo", "Edwin", "Eliot", "Elton", "Everard", "Frederick", "Geoffrey", "George", "Gerald", "Gilbert", "Giles", "Godfrey", "Gunter", "Guy", "Hamond", "Hardwin", "Henry", "Herbert", "Heward", "Hildebrand", "Hubert", "Hugh", "Jocelyn", "John", "Lance", "Leon", "Lionel", "Lucan", "Manfred", "Mark", "Martin", "Matthew", "Merek", "Michael", "Miles", "Nicholas", "Nigel", "Noah", "Norman", "Odo", "Paul", "Percival", "Peter", "Ralf", "Randal", "Raymond", "Reynard", "Richard", "Robert", "Roger", "Roland", "Rolf", "Simon", "Theobald", "Theodoric", "Thomas", "Timm", "Trevor", "Tristram", "Urian", "William", "Wolfstan", "Wymar"]);
			} else {
				name = randomize(["Adelaide", "Adelina", "Aelina", "Agatha", "Agnes", "Aldith", "Alice", "Aline", "Alma", "Althea", "Alyson", "Amelina", "Anais", "Anne", "Artemisia", "Aubrey", "Audry", "Augusta", "Avelina", "Avice", "Barbetta", "Beatrice", "Bertha", "Brangwine", "Bridget", "Brien", "Catelin", "Caterina", "Cecily", "Clare", "Cristina", "Dameta", "Dionisia", "Edeva", "Edith", "Egelina", "Elaine", "Eleanor", "Elizabeth", "Ella", "Elle", "Eloise", "Elysande", "Emeline", "Emeny", "Emma", "Emmeline", "Ermina", "Eva", "Evelune", "Galiena", "Geva", "Giselle", "Griselda", "Guinevere", "Hadwisa", "Helen", "Herleva", "Hugolina", "Ida", "Isabella", "Ivette", "Jacoba", "Jane", "Joan", "Johanna", "Judith", "Juliana", "Julliet", "Katherine", "Lena", "Margaret", "Margery", "Martha", "Mary", "Matilda", "Maynild", "Millicent", "Molly", "Oriel", "Paulina", "Regina", "Ricolda", "Roana", "Rohesia", "Rosalind", "Rosamund", "Sarah", "Sela", "Susanna"]);
			}
			name += " " + randomize(["Archer", "Baker", "Brewer", "Butcher", "Carpenter", "Carter", "Carver", "Clark", "Cobbler", "Cooper", "Cook", "Dyer", "Faire", "Farmer", "Faulkner", "Fisher", "Freeman", "Fuller", "Gardener", "Glover", "Hunt", "Judge", "Knight", "Mason", "Miller", "Miner", "Page", "Parker", "Potter", "Sawyer", "Slater", "Smith", "Taylor", "Thatcher", "Turner", "Weaver", "Wood", "Wright"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Aarakocra",
		gender: function() {return getGender();},
		adultAge: 3,
		maxAge: 30,
		name: function(gender, age) {
			return randomize(["Aera", "Aial", "Aur", "Bara", "Deekek", "Errk", "Goost", "Heehk", "Ikki", "Kaaw", "Kleeck", "Koka", "Oorr", "Ost", "Ouss", "Quaf", "Quierk", "Rok", "Salleek", "Tuk", "Urreek", "Zeed"]);
		},
		alignment: ["LG", "NG", "CG"]
	},
	{
		race: "Bloodfin",
		gender: function() {return getGender();},
		adultAge: 4,
		maxAge: 40,
		name: function(gender, age) {
			return randomize(["Bitey", "Blood", "Bone", "Bubble", "Hard", "Hungry", "Leather", "Rock", "Salt", "Stone", "Thirsty", "Tough"]) +  randomize(["Face", "Fin", "Jaw", "Maw", "Scale", "Tail", "Teeth", "Tooth"]);
		},
		alignment: ["LE", "NE", "CE"]
	},
	{
		race: "Brokkos",
		gender: function() {return getGender();},
		adultAge: 7,
		maxAge: 80,
		name: function(gender, age) {
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
			name = randomize(["Aiutatu (Helper)", "Cuocu (Cook)", "Doto (Healer)", "Fermia (Childcare)", "Guardia (Warrior)", "Maestru (Teacher)", "Produ (Craftsman)", "Raccogli (Forager)", "Scavo (Digger)"]) + " ";
			if (gender == "m") {
				name += randomize(["Adalbertu", "Alesiu", "Ambrosgiu", "Andria", "Antone", "Biasgiu", "Baltazaru", "Benghjaminu", "Bernardu", "Boaris", "Borisu", "Calistu", "Carlu", "Conradu", "Cristofanu", "Danelu", "Francescu", "Gasparu", "Giacumu", "Ghjaseppu", "Larenzu", "Lisandru", "Martinu", "Melchioru", "Niculaiu", "Petru", "Raimondu", "Saveriu", "Silvestru", "Simone", "Tumasgiu", "Volfgangu"]);
			} else {
				name += randomize(["Amandina", "Angiola", "Angioletta", "Angiolina", "Catalina", "Cicilia", "Cristina", "Edvige", "Elodia", "Ghjenuveffa", "Gnese", "Laurenza", "Laurenzia", "Lisabetta", "Lisandra", "Lucia", "Maria", "Martina", "Orsula", "Rita", "Teresia", "Saveria", "Sofia", "Stefania"]);
			}
			return name;
		},
		alignment: ["LN", "NN"]
	},
	{
		race: "Bugbear",
		gender: function() {return getGender();},
		adultAge: 16,
		maxAge: 80,
		name: function(gender, age) {
			var name = randomize(["bug", "bar", "ber", "krag", "hak", "kar", "rak", "dos", "gro", "umsch"]);
			name += randomize(["bug", "bar", "ber", "krag", "hak", "kar", "rak", "dos", "gro", "umsch"]);
			name = name.charAt(0).toUpperCase() + name.slice(1);
			return name;
		},
		alignment: ["NE", "CE"]
	},
	{
		race: "Burrowfolk",
		gender: function() {return getGender();},
		adultAge: 16,
		maxAge: 80,
		name: function(gender, age) {
			var name = randomize(["Shurmie", "Burmo", "Foro", "Rowf", "Suko", "Rolu", "Rofo", "Lubo", "Bowuf", "Wufo", "Kulo", "Roru"]);
			return name;
		},
		alignment: ["LN", "N"]
	},
	{
		race: "Drow",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 700,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol, Theren", "Varis"]);
			} else {
				name = randomize(["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia"]);
			}
			name += " " + randomize(["Amakiir (Gemflower)", "Amastacia (Starflower)", "Galanodel (Moonwhisper)", "Holimion (Diamonddew)", "Ilphelkiir (Gemblossom)", "Liadon (Silverfrond)", "Meliamne (Oakenheel)", "Naïlo (Nightbreeze)", "Siannodel (Moonbrook)", "Xiloscient (Goldpetal)"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Dragonborn",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 360,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Adrex", "Arjhan", "Azzakh", "Balasar", "Baradad", "Bharash", "Bidreked", "Dadalan", "Dazzazn", "Direcris", "Donaar", "Fax", "Gargax", "Ghesh", "Gorbundus", "Greethen", "Heskan", "Hirrathak", "Ildrex", "Kaladan", "Kerkad", "Kiirith", "Kriv", "Maagog", "Medrash", "Mehen", "Mozikth", "Mreksh", "Mugrunden", "Nadarr", "Nithther", "Norkruuth", "Nykkan", "Pandjed", "Patrin", "Pijjirik", "Quarethon", "Rathkran", "Rhogar", "Rivaan", "Sethrekar", "Shamash", "Shedinn", "Srorthen", "Tarhun", "Torinn", "Trynnicus", "Valorean", "Vrondiss", "Zedaar"]);
			} else {
				name = randomize(["Akra", "Aasathra", "Antrara", "Arava", "Biri", "Blendaeth", "Burana", "Chassath", "Daar", "Dentratha", "Doudra", "Driindar", "Eggren", "Farideh", "Findex", "Furrele", "Gesrethe", "Gilkass", "Harann", "Havilar", "Hethress", "Hillanot", "Jaxi", "Jezean", "Jheri", "Kadana", "Kava", "Korinn", "Megren", "Mijira", "Mishann", "Nala", "Nuthra", "Perra", "Pogranix", "Pyxrin", "Quespa", "Raiann", "Rezena", "Ruloth", "Saphara", "Savaran", "Sora", "Surina", "Synthrin", "Tatyan", "Thava", "Uadjit", "Vezera", "Zykroff"]);
			}
			name += " " + randomize(["Akambherylliax", "Argenthrixus", "Baharoosh", "Beryntolthropal", "Bhenkumbyrznaax", "Caavylteradyn", "Chumbyxirinnish", "Clethtinthiallor", "Daardendrian", "Delmirev", "Dhyrktelonis", "Ebynichtomonis", "Esstyrlynn", "Fharngnarthnost", "Ghaallixirn", "Grrrmmballhyst", "Gygazzylyshrift", "Hashphronyxadyn", "Hshhsstoroth", "Imbixtellrhyst", "Jerynomonis", "Jharthraxyn", "Kerrhylon", "Kimbatuul", "Lhamboldennish", "Linxakasendalor", "Mohradyllion", "Mystan", "Nemmonis", "Norixius", "Ophinshtalajiir", "Orexijandilin", "Pfaphnyrennish", "Phrahdrandon", "Pyraxtallinost", "Qyxpahrgh", "Raghthroknaar", "Shestendeliath", "Skaarzborroosh", "Sumnarghthrysh", "Tiammanthyllish", "Turnuroth", "Umbyrphrael", "Vangdondalor", "Verthisathurgiesh", "Wivvyrholdalphiax", "Wystongjiir", "Xephyrbahnor", "Yarjerit", "Zzzxaaxthroth"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Dwarf",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 360,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Adrik", "Alberich", "Baern", "Barendd", "Beloril", "Brodain", "Brottor", "Bruenor", "Dain", "Dalgal", "Darrak", "Delg", "Duergath", "Dworic", "Eberk", "Einkil", "Elaim", "Erias", "Fallond", "Fargrim", "Flint", "Gardain", "Gilthur", "Gimgen", "Gimurt", "Harbek", "Kildrak", "Kilvar", "Morgran", "Morkral", "Nalral", "Nordak", "Nuraval", "Oloric", "Olunt", "Orsik", "Oskar", "Ragnar", "Rangrim", "Reirak", "Rurik", "Taklinn", "Thoradin", "Thorin", "Thradal", "Tordek", "Traubon", "Travok", "Ulfgar", "Uraim", "Veit", "Vonbin", "Vondal", "Whurbin"]);
			} else {
				name = randomize(["Amber", "Anbera", "Artin", "Audhild", "Balifra", "Barbena", "Bardryn", "Bolhild", "Brumhilda", "Dagnal", "Dariff", "Delre", "Diesa", "Eldeth", "Eridred", "Falkrunn", "Fallthra", "Finellen", "Gillydd", "Gunnloda", "Gurdis", "Helgret", "Helja", "Hilda", "Hlin", "Ilde", "Jarana", "Kathra", "Kilia", "Kristryd", "Liftrasa", "Marastyr", "Mardred", "Morana", "Nalaed", "Nora", "Nurkara", "Oriff", "Ovina", "Riswynn", "Sannl", "Therlin", "Thodris", "Thoretta", "Thorina", "Torbera", "Tordrid", "Torgga", "Torveda", "Urshar", "Valida", "Vistra", "Vonana", "Werydd", "Whurdred", "Yurgunn"]);
			}
			name += " " + randomize(["Aranore", "Balderk", "Battlehammer", "Bigtoe", "Bloodkith", "Bofdann", "Brawnanvil", "Brazzik", "Bronzehand", "Broodfist", "Burrowfound", "Caebrek", "Daerdahk", "Dankil", "Daraln", "Deepdelver", "Diamondpick", "Durthane", "Eversharp", "Fallack", "Fireforge", "Foamtankard", "Frostbeard", "Glanhig", "Goblinbane", "Goldfinder", "Gorunn", "Graybeard", "Hammerstone", "Helcral", "Holderhek", "Ironfist", "Loderr", "Lutgehr", "Morigak", "Orcfoe", "Rakankrak", "RubyEye", "Rumnaheim", "Silveraxe", "Silverstone", "Steelfist", "Stonespire", "Stoutale", "Strakeln", "Strongbellows", "Strongheart", "Thrahak", "Torevir", "Torunn", "Trollbleeder", "Trueanvil", "Trueblood", "Ungart"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Elf",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 750,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol, Theren", "Varis"]);
			} else {
				name = randomize(["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia"]);
			}
			name += " " + randomize(["Amakiir (Gemflower)", "Amastacia (Starflower)", "Galanodel (Moonwhisper)", "Holimion (Diamonddew)", "Ilphelkiir (Gemblossom)", "Liadon (Silverfrond)", "Meliamne (Oakenheel)", "Naïlo (Nightbreeze)", "Siannodel (Moonbrook)", "Xiloscient (Goldpetal)"]);
			return name;
		},
		alignment: ["CG", "CN", "CE"]
	},
	{
		race: "Firbolg",
		gender: function() {return getGender();},
		adultAge: 30,
		maxAge: 500,
		name: function(gender, age) {
			var name;
			return randomize(["Beech", "Birch", "Dogwood", "Hemlock", "Magnolia", "Maple", "Oak", "Pine", "Palm", "Redwood", "Sequoia", "Spruce", "Sycamore", "Walnut", "Willow", "Wormwood"]);
		},
		alignment: ["NG", "NN"]
	},
	{
		race: "Firenewt",
		gender: function() {return getGender();},
		adultAge: 3,
		maxAge: 50,
		name: function(gender, age) {
			var name;
			return randomize(["Sahalia (lizard)", "Nariyin (fiery)", "Harq (burn)", "'Ahraq (scald)", "Rawasib (magma)", "Damalon (boil)", "Dukhanon (smoke)", "Dhabulon (sear)", "Manalon (roast)", "Yaqlaa (fry)", "Nar (fire)", "Alnakhbu (toast)", "Lahab (flame)"]);
		},
		alignment: ["LE"]
	},
	{
		race: "Gnome",
		gender: function() {return getGender();},
		adultAge: 40,
		maxAge: 500,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Zook"]);
			} else {
				name = randomize(["Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna"]);
			}
			name += " " + randomize(["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen"]) + " " + randomize(["Aleslosh", "Ashhearth", "Badger", "Cloak", "Doublelock", "Filchbatter", "Fnipper", "Ku", "Nim", "Oneshoe", "Pock", "Sparklegem", "Stumbleduck"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Goblin",
		gender: function() {return getGender();},
		adultAge: 8,
		maxAge: 60,
		name: function(gender, age) {
			const goblinNameParts = ["krun", "grum", "gri", "nion", "pook", "shch", "krad", "dia"];
			var name = randomize(goblinNameParts);
			name += randomize(goblinNameParts);
			name = name.charAt(0).toUpperCase() + name.slice(1);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Grippli",
		gender: function() {return getGender();},
		adultAge: 30,
		maxAge: 180,
		name: function(gender, age) {
			return randomize(["Bellum", "Brillup", "Bullgup", "Chirk", "Dart", "Flybert", "Frollum", "Kaillum", "Kermin", "Kroallup", "Quartle", "Quon", "Ribbert", "Roagup", "Toallum"]);
			// var name;
			// if (gender == "m") {
			// 	name = randomize(["Brillup", "Bullgup", "Chirk", "Dart", "Labllup", "Quartle", "Rublup", "Willup"]);
			// } else {
			// 	name = randomize(["Bellum", "Kaillum", "Que", "Quon", "Ruue", "Toum", "Wuon"]);
			// }
			// return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Grung",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 70,
		name: function(gender, age) {
			var name;
			const grungGreenNames = ["Pap'k'aka", "Ski'di'ki'pap", "Ap'upu", "Sk'ya", "D'udu", "K'uku", "Dun'd'un", "P'oo'mp'oom", "Pa'n", "N'da", "B'oom", "Pu'dr'r'r", "Skiv'ipa", "Sk'ree'e"];
			const grungBlueNames = ["G'ot'taf'iyt", "F'ory'ar'iyt", "To'pra'tee", "S'abo", "Ta'je"];
			const grungPurpleNames = ["O'u", "T'r'un", "M'iam'", "Ei'ht", "S'yn", "Pla'm", "Tw'y", "Ni'on", "V'ae", "Po'r", "W'ae'v"];
				name = randomize(grungGreenNames);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Halfling",
		gender: function() {return getGender();},
		adultAge: 20,
		maxAge: 150,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Alton", "Ander", "Bernie", "Bobbin", "Cade", "Callus", "Corrin", "Dannad", "Danniel", "Eddie", "Egart", "Eldon", "Errich", "Fildo", "Finnan", "Franklin", "Garret", "Garth", "Gilbert", "Gob", "Harol", "Igor", "Jasper", "Keith", "Kevin", "Lazam", "Lerry", "Lindal", "Lyle", "Merric", "Mican", "Milo", "Morrin", "Nebin", "Nevil", "Osborn", "Ostran", "Oswalt", "Perrin", "Poppy", "Reed", "Roscoe", "Sam", "Shardon", "Tye", "Ulmo", "Wellby", "Wendel", "Wenner", "Wes"]);
			} else {
				name = randomize(["Alain", "Andry", "Anne", "Bella", "Blossom", "Bree", "Callie", "Chenna", "Cora", "Dee", "Dell", "Eida", "Eran", "Euphemia", "Georgina", "Gynnie", "Harriet", "Jasmine", "Jillian", "Jo", "Kithri", "Lavinia", "Lidda", "Maegan", "Marigold", "Merla", "Myria", "Nedda", "Nikki", "Nora", "Olivia", "Paela", "Pearl", "Pennie", "Philomena", "Portia", "Robbie", "Rose", "Saral", "Seraphina", "Shaena", "Stacee", "Tawna", "Thea", "Trym", "Tyna", "Vani", "Verna", "Wella", "Willow"]);
			}
			name += " " + randomize(["Appleblossom", "Bigheart", "Brightmoon", "Brushgather", "Cherrycheeks", "Copperkettle", "Deephollow", "Elderberry", "Fastfoot", "Fatrabbit", "Glenfellow", "Goldfound", "Goodbarrel", "Goodearth", "Greenbottle", "Greenleaf", "Highhill", "High-hill", "Hilltopple", "Hogcollar", "Honeypot", "Jamjar", "Kettlewhistle", "Leagallow", "Littlefoot", "Nimblefingers", "Porridgepot", "Quickstep", "Reedfellow", "Shadowquick", "Silvereyes", "Smoothhands", "Stonebridge", "Stoutbridge", "Stoutman", "Strongbones", "Sunmeadow", "Swiftwhistle", "Tallfellow", "Tealeaf", "Tenpenny", "Thistletop", "Thorngage", "Tosscobble", "Underbough", "Underfoot", "Warmwater", "Whispermouse", "Wildcloak", "Wildheart", "Wiseacre"]);
			return name;
		},
		alignment: ["LG", "NG"]
	},
	{
		race: "HalfOrc",
		gender: function() {return getGender();},
		adultAge: 14,
		maxAge: 75,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Thokk", "Shump", "Argran", "Braak", "Brug", "Cagak", "Dorn", "Dren", "Druuk", "Gnarsh", "Grumbar", "Gubrash", "Hagren", "Hogar", "Karash", "Karg", "Korag", "Lubash", "Megged", "Mord", "Morg", "Nil", "Nybarg", "Odorr", "Ohr", "Rendar", "Resh", "Rrath", "Sark", "Scrag", "Sheggen", "Tanglar", "Tarak", "Thar", "Trag", "Ugarth", "Varg", "Vilberg", "Yurk", "Zed"]);
			} else {
				name = randomize(["Arha", "Baggi", "Bendoo", "Bilga", "Brakka", "Creega", "Drenna", "Ekk", "Emen", "Engong", "Fistula", "Gaaki", "Gorga", "Grai", "Greeba", "Grigi", "Gynk", "Hrathy", "Huru", "Ilga", "Kabbarg", "Kansif", "Lagazi", "Lezre", "Murgen", "Murook", "Myev", "Nagrette", "Neega", "Nella", "Nogu", "Oolah", "Ootah", "Ovak", "Ownka", "Puyet", "Reeza", "Shautha", "Silgre", "Sutha", "Tagga", "Tawar", "Tomph", "Ubada", "Vanchu", "Vola", "Volen", "Vorka", "Yevelda", "Zagga"]);
			}
			name += " " + randomize(["Archer", "Baker", "Brewer", "Butcher", "Carpenter", "Carter", "Carver", "Clark", "Cobbler", "Cooper", "Cook", "Dyer", "Faire", "Farmer", "Faulkner", "Fisher", "Freeman", "Fuller", "Gardener", "Glover", "Hunt", "Judge", "Knight", "Mason", "Miller", "Miner", "Page", "Parker", "Potter", "Sawyer", "Slater", "Smith", "Taylor", "Thatcher", "Turner", "Weaver", "Wood", "Wright"]);
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Kenku",
		gender: function() {return getGender();},
		adultAge: 12,
		maxAge: 60,
		name: function(gender, age) {
			return randomize(["Smasher", "Clanger", "Slicer", "Basher", "Rat Scratch", "Whistler", "Mouser", "Growler", "Sail Snap", "Hammerer", "Cutter"]);
		},
		alignment: ["CN"]
	},
	{
		race: "Kobold",
		gender: function() {return getGender();},
		adultAge: 6,
		maxAge: 120,
		name: function(gender, age) {
			return randomize(["Arix", "Eks", "Ett", "Galax", "Garu", "Hagnar", "Hox", "Irtos", "Kashak", "Kovi", "Kubo", "Meepo", "Molo", "Rotom", "Ohsoss", "Sagin", "Sik", "Sniv", "Taklak", "Tes", "Urak", "Varn"]);
		},
		alignment: ["LN", "LE"]
	},
	{
		race: "Kuo-toa",
		gender: function() {return getGender();},
		adultAge: 6,
		maxAge: 120,
		name: function(gender, age) {
			return randomize(["Too", "Mmot", "Loo", "Chog", "Laag", "Shoo", "Doo", "Gib", "Glol", "Kur", "Dag", "Gap", "Blop"]) +  randomize(["ploorg", "hagoon", "goorg", "bogg", "goop", "loorg", "daga", "gool", "goonleth"]);
		},
		alignment: ["NE"]
	},
	{
		race: "Lizardfolk",
		gender: function() {return getGender();},
		adultAge: 14,
		maxAge: 60,
		name: function(gender, age) {
			return randomize(["Achuak (green)", "Aryte (war)", "Baeshra (animal)", "Darastrix (dragon)", "Garurt (axe)", "Irhtos (secret)", "Jhank (hammer)", "Kepesk (storm)", "Kethend (gem)", "Korth (danger)", "Kosj (small)", "Kothar (demon)", "Litrix (armor)", "Mirik (song)", "Othokent (smart)", "Sauriv (eye)", "Throden (many)", "Thurkear (night)", "Usk (iron)", "Valignat (burn)", "Vargach (battle)", "Verthica (mountain)", "Vutha (black)", "Vyth (steel)"]);
		},
		alignment: ["NN"]
	},
	{
		race: "Modron",
		gender: function() {return getGender();},
		adultAge: 0,
		maxAge: 9999,
		name: function(gender, age) {
			const modronLetters = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"];
			var name = randomize(modronLetters);
			for (let i = 0; i < 6; i++) {
				name += " " + randomize(modronLetters);
			}
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	},
	{
		race: "Orc",
		gender: function() {return getGender();},
		adultAge: 12,
		maxAge: 50,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk"]);
			} else {
				name = randomize(["Baggi", "Emen", "Engong", "Kansif", "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda"]);
			}
			return name;
		},
		alignment: ["CE"]
	},
	{
		race: "Tabaxi",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 70,
		name: function(gender, age) {
			return randomize(["Cloud on the Mountaintop (Cloud)", "Five Timber (Timber)", "Jade Shoe (Jade)", "Left-Handed Hummingbird (Bird)", "Seven Thundercloud (Thunder)", "Skirt of Snakes (Snake)", "Smoking Mirror (Smoke) "]) + " " + randomize(["Bright Cliffs", "Distant Rain", "Mountain Tree", "Rumbling River", "Snoring Mountain"]);
		},
		alignment: ["CG", "CN"]
	},
	{
		race: "Tiefling",
		gender: function() {return getGender();},
		adultAge: 18,
		maxAge: 110,
		name: function(gender, age) {
			var name;
			if (Math.round(Math.random()) == 0) {
				name = randomize(["Ambition", "Art", "Beauty", "Carrion", "Chant", "Chivalry", "Conflict", "Creed", "Death", "Debauchery", "Despair", "Doom", "Doubt", "Dread", "Ecstasy", "Ennui", "Entropy", "Excellence", "Fear", "Glory", "Gluttony", "Grief", "Hate", "Hope", "Horror", "Ideal", "Ignominy", "Joy", "Laughter", "Love", "Lust", "Mayhem", "Misery", "Mockery", "Murder", "Muse", "Music", "Mystery", "Nowhere", "Open", "Pain", "Passion", "Poetry", "Power", "Quest", "Random", "Reverence", "Revulsion", "Secrecy", "Sorrow", "Temerity", "Torment", "Tragedy", "Vice", "Virtue", "War", "Weary", "Wit"]);
			} else {
				if (gender == "m") {
					name = randomize(["Abad", "Ahrim", "Akmen", "Akmenos", "Amnon", "Andram", "Astar", "Balam", "Barakas", "Bathin", "Caim", "Chem", "Cimer", "Cressel", "Damakos", "Ekemon", "Euron", "Fenriz", "Forcas", "Habor", "Iados", "Kairon", "Leucis", "Mamnen", "Mantus", "Marbas", "Melech", "Merihim", "Modean", "Mordai", "Mormo", "Morthos", "Nicor", "Nirgel", "Oriax", "Paymon", "Pelaios", "Purson", "Qemuel", "Raam", "Rimmon", "Sammal", "Skamos", "Tethren", "Thamuz", "Therai", "Valafar", "Vassago", "Xappan", "Zepar", "Zephan"]);
				} else {
					name = randomize(["Akta", "Anakis", "Armara", "Astaro", "Aym", "Azza", "Beleth", "Bryseis", "Bune", "Criella", "Damaia", "Decarabia", "Ea", "Gadreel", "Gomory", "Hecat", "Ishte", "Jezebeth", "Kali", "Kallista", "Kasdeya", "Lerissa", "Lilith", "Makaria", "Manea", "Markosian", "Mastema", "Naamah", "Nemeia", "Nija", "Orianna", "Osah", "Phelaia", "Prosperine", "Purah", "Pyra", "Rieta", "Ronobe", "Ronwe", "Seddit", "Seere", "Sekhmet", "Semyaza", "Shava", "Shax", "Sorath", "Uzza", "Vapula", "Vepar", "Verin"]);
				}
			}
			return name;
		},
		alignment: ["CG", "CN", "CE"]
	},
	{
		race: "Tortle",
		gender: function() {return getGender();},
		adultAge: 15,
		maxAge: 50,
		name: function(gender, age) {
			return randomize(["Baka", "Damu", "Gar", "Gura", "Ini", "Jappa", "Kinlek", "Krull", "Lim", "Lop", "Nortle", "Nulka", "Olo", "Ploqwat", "Quee", "Queg", "Quott", "Sunny", "Tibor", "Ubo", "Uhok", "Wabu", "Xelbuk", "Xopa", "Yog"]);
		},
		alignment: ["LG", "LN", "LE"]
	},
	{
		race: "Triton",
		gender: function() {return getGender();},
		adultAge: 15,
		maxAge: 200,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Corus", "Delnis", "Jhimas", "Keros", "Molos", "Nalos", "Vodos", "Zunis"]);
			} else {
				name = randomize(["Aryn", "Belthyn", "Duthyn", "Feloren", "Otanyn", "Shalryn", "Vlaryn", "Wolyn"]);
			}
			name += " " + randomize(["Paroxath", "Morskoth", "Dnoth"]);
			return name;
		},
		alignment: ["LG", "NG", "LN"]
	},
	{
		race: "Wilkoss",
		gender: function() {return getGender();},
		adultAge: 12,
		maxAge: 50,
		name: function(gender, age) {
			var name;
			if (gender == "m") {
				name = randomize(["Bee", "Bun", "Er", "Foz", "Gon", "Gro", "Ker"]);
				name += randomize(["ker", "son", "nie", "zie", "zo", "ver", "mit"]);
			} else {
				name = randomize(["Ab", "Pig", "Zo", "Bubble", "Hungry", "Leather", "Rock", "Salt", "Stone", "Thirsty"]);
				name += randomize(["bie", "gie", "eey", "Maw", "Scale", "Tail", "Teeth", "Tooth"]);
			}
			return name;
		},
		alignment: ["LG", "NG", "CG",
					"LN", "NN", "CN",
					"LE", "NE", "CE"]
	}
]

function NPC(name, race, gender, age, alignment, description) {
	var npc;
	this.race = race || races[Math.floor(Math.random() * races.length)];
	for (let i = 0; i < racialTraits.length; i++) {
		const el = racialTraits[i];
		if (el.race.toLowerCase() == this.race.toLowerCase()) {
			npc = el;
			this.raceIndex = i;
			break;
		};
	}
	if (npc == undefined) {
		npc = racialTraits[0];
		this.raceIndex = 0;
	}
	this.gender = gender || npc.gender();
	switch (parseInt(age)) {
		case undefined:
		case 0:
			if (chance(15)) {
				this.age = rollDie(npc.adultAge);
			}
			else {
				this.age = npc.adultAge + Math.floor(Math.random() * Math.random() * (npc.maxAge - npc.adultAge));
			}
			break;
		case 1:
			this.age = Math.max(rollDie(npc.adultAge), 1);
			break;
		case 2:
			this.age = npc.adultAge + Math.floor(Math.random() * Math.random() * (npc.maxAge / 5));
			break;
		case 3:
			this.age = npc.adultAge + Math.floor((npc.maxAge / 5)) + Math.floor(Math.random() * Math.random() * 2 * (npc.maxAge / 5));
			break;
		default:
			this.age = npc.maxAge - Math.floor(Math.random() * Math.random() * (npc.maxAge / 5));
			break;
	}
	this.alignment = alignment || randomize(npc.alignment);
	this.name = name || npc.name(this.gender, this.age);
}