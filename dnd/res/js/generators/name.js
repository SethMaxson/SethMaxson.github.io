"use strict";
const NameGenerator = {
    first: function (species = "human", gender = "female", age = "adult") {
        var name = "";
        switch (species) {
            //#region Aarakocra
            case "aarakocra":
                name = randomize([
                    "Aera",
                    "Aial",
                    "Aur",
                    "Bara",
                    "Deekek",
                    "Errk",
                    "Goost",
                    "Heehk",
                    "Ikki",
                    "Kaaw",
                    "Kleeck",
                    "Koka",
                    "Oorr",
                    "Ost",
                    "Ouss",
                    "Quaf",
                    "Quierk",
                    "Rok",
                    "Salleek",
                    "Tuk",
                    "Urreek",
                    "Zeed"
                ]);
                break;
            //#endregion
            //#region Anime
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
                }
                else {
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
            //#endregion
            //#region Bear
            case "bear":
                name = randomize([
                    "Bam",
                    "Bar",
                    "Bash",
                    "Bay",
                    "Beef",
                    "Bob",
                    "Bog",
                    "Boom",
                    "Boo",
                    "Bra",
                    "Bro",
                    "Brak",
                    "Brash",
                    "Buff"
                ]) + randomize([
                    "",
                    "er",
                    "lin",
                    "o",
                    "s",
                    "ski",
                    "ster",
                    "town",
                    "y"
                ]);
                break;
            //#endregion
            //#region Bloodfin
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
            //#endregion
            //#region Brokkos
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
                }
                else {
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
            //#endregion
            //#region Bugbear
            case "bugbear":
                let nameParts = ["bug", "bar", "ber", "krag", "hak", "kar", "rak", "dos", "gro", "umsch"];
                name = randomize(nameParts) + randomize(nameParts);
                name = name.charAt(0).toUpperCase() + name.slice(1);
                break;
            //#endregion
            //#region Burrowfolk
            case "burrowfolk":
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
            //#endregion
            //#region Chinese
            case "chinese":
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
                }
                else {
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
            //#endregion
            //#region Dragonborn
            case "dragonborn":
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
                }
                else {
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
            //#endregion
            //#region Drow
            case "drow":
                if (gender == "male") {
                    name = randomize([
                        "Alton",
                        "Balok",
                        "Baragh",
                        "Beidnach",
                        "Belaern",
                        "Belgos",
                        "Bemril",
                        "Berg'inyon",
                        "Bhintel",
                        "Brorn",
                        "Bruherd",
                        "Caelkoth",
                        "Callimar",
                        "Ceobarn",
                        "Chakos",
                        "Chaszmyr",
                        "Coranzen",
                        "Dantrag",
                        "Dhuunyl",
                        "Dinin",
                        "Dresmorlin",
                        "Dro",
                        "Duagloth",
                        "Durdyn",
                        "Elamshin",
                        "Elendar",
                        "Elkantar",
                        "Ellandail",
                        "Filraen",
                        "Ghaundan",
                        "Ghaundar",
                        "Guldor",
                        "Guldor",
                        "Gwylyss",
                        "Hadrogh",
                        "Hatch'net",
                        "Honemmeth",
                        "Houndaer",
                        "Ildan",
                        "Ilmryn",
                        "Ilphrin",
                        "Imbros",
                        "Irennan",
                        "Istolil",
                        "Istorvir",
                        "Iymril",
                        "Jaezred",
                        "Jalynfein",
                        "Jeggred",
                        "Jevan",
                        "Jhaamdath",
                        "Jhaldrym",
                        "Jivvin",
                        "Jyslin",
                        "K'yorl",
                        "Kalannar",
                        "Kethan",
                        "Kluthruel",
                        "Kophyn",
                        "Krenaste",
                        "Krondorl",
                        "Kunoris",
                        "Kyorlin",
                        "Lesaonar",
                        "Lirdnolu",
                        "Llaulmyn",
                        "Malaggar",
                        "Micarlin",
                        "Minolin",
                        "Molvayas",
                        "Morennel",
                        "Nadal",
                        "Nalfein",
                        "Narissorin",
                        "Narlros",
                        "Nilonim",
                        "Nimruil",
                        "Numrini'th",
                        "Nyloth",
                        "Nym",
                        "Omareth",
                        "Orgoloth",
                        "Ornaryn",
                        "Pharaun",
                        "Pharius",
                        "Quave",
                        "Quendar",
                        "Quenthel",
                        "Quevven",
                        "Raimsael",
                        "Ranaghar",
                        "Relonor",
                        "Riklaunim",
                        "Rinnill",
                        "Ristel",
                        "Ruathym",
                        "Ryld",
                        "Ryltar",
                        "Sabal",
                        "Selakiir",
                        "Seldszar",
                        "Seldszar",
                        "Sengo",
                        "Solaufein",
                        "Sorn",
                        "Syrdar",
                        "Szordrin",
                        "Szordrin",
                        "Taldinyon",
                        "Tarlyn",
                        "Tathlyn",
                        "Tazennin",
                        "Tebryn",
                        "Tolokoph",
                        "Torrellan",
                        "Trelgath",
                        "Tsabrak",
                        "Urlryn",
                        "Valas",
                        "Veldrin",
                        "Velkyn",
                        "Vhurdaer",
                        "Vhurindrar",
                        "Vielyn",
                        "Vlondril",
                        "Vorn",
                        "Vuzlyn",
                        "Welverin",
                        "Xarann",
                        "Xundus",
                        "Yazston",
                        "Yuimmar",
                        "Zaknafein",
                        "Zeerith",
                        "Zyn"
                    ]);
                }
                else {
                    name = randomize([
                        "Ahlysaaria",
                        "Akordia",
                        "Alaunirra",
                        "Alystin",
                        "Amalica",
                        "Angaste",
                        "Anluryn",
                        "Ardulace",
                        "Aunrae",
                        "Balaena",
                        "Baltana",
                        "Bautha",
                        "Belarbreena",
                        "Beszrima",
                        "Brigantyna",
                        "Briza",
                        "Brorna",
                        "Burryna",
                        "Byrtyn",
                        "Caya",
                        "Cazna",
                        "Chadra",
                        "Chadzina",
                        "Chalithra",
                        "Chandara",
                        "Chardalyn",
                        "Charinida",
                        "Charlindra",
                        "Chenzira",
                        "Chessintra",
                        "Dhaunae",
                        "Dilynrae",
                        "Drada",
                        "Drisinil",
                        "Eclavdra",
                        "Elerra",
                        "Elvanshalee",
                        "Elvraema",
                        "Erakasyne",
                        "Ereldra",
                        "Faeryl",
                        "Felyndiira",
                        "Felyndiira",
                        "Filfaere",
                        "G'eldriia",
                        "Gaussra",
                        "Ghilanna",
                        "Greyanna",
                        "Gurina",
                        "Haelra",
                        "Halisstra",
                        "Ilharess",
                        "Ilivarrra",
                        "Ilmra",
                        "Imrae",
                        "Jaelryn",
                        "Jezzara",
                        "Jhaelryna",
                        "Jhaelrynna",
                        "Jhalass",
                        "Jhangara",
                        "Jhanniss",
                        "Jhulae",
                        "Khaless",
                        "Kiaran",
                        "Laele",
                        "Laele",
                        "Larynda",
                        "LiNeerlay",
                        "Lledrith",
                        "Llolfaen",
                        "Lualyrr",
                        "Lythrana",
                        "Malindeil",
                        "Maya",
                        "Menzoberra",
                        "Mez'Barris",
                        "Micarlin",
                        "Miz'ri",
                        "Mizzrym",
                        "Myrymma",
                        "Narcelia",
                        "Nathrae",
                        "Nedylene",
                        "Nendra",
                        "Nizana",
                        "Nulliira",
                        "Olorae",
                        "Pellanistra",
                        "Phaere",
                        "Phyrra",
                        "Qilue",
                        "Quarra",
                        "Rauva",
                        "Rilrae",
                        "Sabrae",
                        "Saradreza",
                        "Sassandra",
                        "Schezalle",
                        "Shimyra",
                        "ShriNeerune",
                        "Shulvallriel",
                        "Shurdriira",
                        "Shurdriira",
                        "Shurraenil",
                        "Shyntlara",
                        "SiNafay",
                        "Sindyrrith",
                        "Solenzara",
                        "Ssapriina",
                        "T'risstree",
                        "Talabrina",
                        "Talice",
                        "Tallrene",
                        "Thalra",
                        "Thirza",
                        "Thraele",
                        "Triel",
                        "Ulitree",
                        "Ulviirala",
                        "Umrae",
                        "Urlryn",
                        "Urmelena",
                        "Vhondryl",
                        "Viconia",
                        "Vierna",
                        "Villyth",
                        "Vornalla",
                        "Waerva",
                        "Wuyondra",
                        "Xalyth",
                        "Xullrae",
                        "Xune",
                        "Yasrena",
                        "Yvonnel",
                        "Z'ress",
                        "Zarra",
                        "Zebeyana",
                        "Zeerith",
                        "Zelpassa",
                        "Zendalure",
                        "Zesstra",
                        "Zirachaun",
                        "Zilvra"
                    ]);
                }
                break;
            //#endregion
            //#region Dwarf
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
                }
                else {
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
            //#endregion
            //#region Elf
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
                        "Erol",
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
                }
                else {
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
            //#endregion
            //#region Firbolg
            case "firbolg":
                name = randomize([
                    "Alder",
                    "Almond",
                    "Beech",
                    "Birch",
                    "Buloke",
                    "Calabash",
                    "Cebil",
                    "Cedar",
                    "Cycad",
                    "Cyrilla",
                    "Chestnut",
                    "Dogwood",
                    "Elm",
                    "Eucalyptus",
                    "Fir",
                    "Hazel",
                    "Hemlock",
                    "Hickory",
                    "Juniper",
                    "Larch",
                    "Lyonia",
                    "Magnolia",
                    "Mangrove",
                    "Maple",
                    "Meranti",
                    "Nutmeg",
                    "Oak",
                    "Pine",
                    "Palm",
                    "Poplar",
                    "Redwood",
                    "Rosewood",
                    "Sequoia",
                    "Spruce",
                    "Strongbark",
                    "Sycamore",
                    "Verawood",
                    "Walnut",
                    "Willow",
                    "Wormwood",
                    "Yew"
                ]);
                break;
            //#endregion
            //#region Firenewt
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
            //#endregion
            //#region Goblin
            case "goblin":
                const goblinNameParts = ["krun", "grum", "gri", "nion", "krad", "dia", "rita", "rip", "borgor", "bago", "gut", "proud", "pol", "bak"];
                name = randomize(goblinNameParts);
                name += randomize(goblinNameParts);
                name = name.charAt(0).toUpperCase() + name.slice(1);
                break;
            //#endregion
            //#region Gnome
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
                }
                else {
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
            //#endregion
            //#region Grippli
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
                }
                else {
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
            //#endregion
            //#region Grung
            case "grung":
                const grungGreenNames = [
                    "Pap'k'aka",
                    "Ski'di'ki'pap",
                    "Ap'upu",
                    "Sk'ya",
                    "D'udu",
                    "K'uku",
                    "Dun'd'un",
                    "P'oo'mp'oom",
                    "Pa'n",
                    "N'da",
                    "B'oom",
                    "Pu'dr'r'r",
                    "Skiv'ipa",
                    "Sk'ree'e"
                ];
                const grungBlueNames = [
                    "G'ot'taf'iyt",
                    "F'ory'ar'iyt",
                    "To'pra'tee",
                    "S'abo",
                    "Ta'je"
                ];
                const grungPurpleNames = [
                    "O'u",
                    "T'r'un",
                    "M'iam'",
                    "Ei'ht",
                    "S'yn",
                    "Pla'm",
                    "Tw'y",
                    "Ni'on",
                    "V'ae",
                    "Po'r",
                    "W'ae'v"
                ];
                name = randomize(grungGreenNames);
                break;
            //#endregion
            //#region Halfling
            case "halfling":
                if (gender == "male") {
                    name = randomize([
                        "Alton",
                        "Ander",
                        "Atherton",
                        "Bernie",
                        "Bobbin",
                        "Cade",
                        "Callus",
                        "Corrin",
                        "Dannad",
                        "Danniel",
                        "Dellby",
                        "Eddie",
                        "Egart",
                        "Eldon",
                        "Enzo",
                        "Errich",
                        "Fildo",
                        "Finnan",
                        "Franklin",
                        "Garret",
                        "Garth",
                        "Gilbert",
                        "Gob",
                        "Harol",
                        "Jasper",
                        "Keith",
                        "Kevin",
                        "Lazam",
                        "Lerry",
                        "Lindal",
                        "Lowell",
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
                        "Regis",
                        "Reuben",
                        "Roscoe",
                        "Sam",
                        "Shardon",
                        "Tye",
                        "Ulmo",
                        "Violet",
                        "Wellby",
                        "Wendel",
                        "Wenner",
                        "Wes"
                    ]);
                }
                else {
                    name = randomize([
                        "Alain",
                        "Alora",
                        "Andry",
                        "Anne",
                        "Bella",
                        "Blossom",
                        "Bree",
                        "Cellica",
                        "Callie",
                        "Chenna",
                        "Cora",
                        "Dee",
                        "Dell",
                        "Eida",
                        "Eran",
                        "Euphemia",
                        "Farrow",
                        "Georgina",
                        "Gynnie",
                        "Harriet",
                        "Jasmine",
                        "Jillian",
                        "Jo",
                        "Kithri",
                        "Kyla",
                        "Lavinia",
                        "Lidda",
                        "Locke",
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
                        "Shandie",
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
            //#endregion
            //#region Hobgoblin
            case "hobgoblin":
                if (gender == "male") {
                    name = randomize([
                        "Aruget",
                        "Biish",
                        "Daavan",
                        "Dagii",
                        "Durnn",
                        "Duulun",
                        "Fenic",
                        "Haruuc",
                        "Hashrad",
                        "Iizan",
                        "Jhezon",
                        "Krakuul",
                        "Kurac",
                        "Lhurusk",
                        "Mazaan",
                        "Muuka",
                        "Munta",
                        "Nasaar",
                        "Oraan",
                        "Okaat",
                        "Ruus",
                        "Saabak",
                        "Tasaam",
                        "Taak",
                        "Tariic",
                        "Thuun",
                        "Vanii",
                        "Vanon",
                        "Woshar"
                    ]);
                }
                else {
                    name = randomize([
                        "Diitesh",
                        "Ekhaas",
                        "Jhazaal",
                        "Khaar",
                        "Kitaas",
                        "Mekiis",
                        "Razu",
                        "Reirie",
                        "Riila",
                        "Senen",
                        "Shaardat",
                        "Tuura",
                        "Ulwai"
                    ]);
                }
                break;
            //#endregion
            //#region Human
            case "human":
                if (gender == "male") {
                    name = randomize([
                        "Adam",
                        "Adelard",
                        "Alan",
                        "Albert",
                        "Aldous",
                        "Aldred",
                        "Alexander",
                        "Alisander",
                        "Anselm",
                        "Arnold",
                        "Arthur",
                        "Bardolph",
                        "Barnabas",
                        "Bartholomew",
                        "Basil",
                        "Bennet",
                        "Berenger",
                        "Bernard",
                        "Bertram",
                        "Bryce",
                        "Castor",
                        "Charles",
                        "Clerebold",
                        "Conrad",
                        "David",
                        "Diggory",
                        "Dinadan",
                        "Drogo",
                        "Edwin",
                        "Eliot",
                        "Elton",
                        "Everard",
                        "Frederick",
                        "Geoffrey",
                        "George",
                        "Gerald",
                        "Gilbert",
                        "Giles",
                        "Godfrey",
                        "Gunter",
                        "Guy",
                        "Hamond",
                        "Hardwin",
                        "Henry",
                        "Herbert",
                        "Heward",
                        "Hildebrand",
                        "Hubert",
                        "Hugh",
                        "Jocelyn",
                        "John",
                        "Lance",
                        "Leon",
                        "Leroy",
                        "Lionel",
                        "Lucan",
                        "Manfred",
                        "Mark",
                        "Martin",
                        "Matthew",
                        "Merek",
                        "Michael",
                        "Miles",
                        "Nicholas",
                        "Nigel",
                        "Noah",
                        "Norman",
                        "Odo",
                        "Paul",
                        "Percival",
                        "Peter",
                        "Ralf",
                        "Randal",
                        "Raymond",
                        "Reynard",
                        "Richard",
                        "Robin",
                        "Robert",
                        "Roger",
                        "Roland",
                        "Rolf",
                        "Simon",
                        "Theobald",
                        "Theodoric",
                        "Thomas",
                        "Timm",
                        "Trevor",
                        "Tristram",
                        "Urian",
                        "William",
                        "Wolfstan",
                        "Wymar"
                    ]);
                }
                else {
                    name = randomize([
                        "Adelaide",
                        "Adelina",
                        "Aelina",
                        "Agatha",
                        "Agnes",
                        "Aldith",
                        "Alice",
                        "Aline",
                        "Alma",
                        "Althea",
                        "Alyson",
                        "Amelina",
                        "Anais",
                        "Anne",
                        "Artemisia",
                        "Aubrey",
                        "Audry",
                        "Augusta",
                        "Avelina",
                        "Avice",
                        "Barbetta",
                        "Beatrice",
                        "Bertha",
                        "Brangwine",
                        "Bridget",
                        "Brien",
                        "Catelin",
                        "Caterina",
                        "Cecily",
                        "Clare",
                        "Cristina",
                        "Dameta",
                        "Dionisia",
                        "Edeva",
                        "Edith",
                        "Egelina",
                        "Elaine",
                        "Eleanor",
                        "Elizabeth",
                        "Ella",
                        "Elle",
                        "Eloise",
                        "Elysande",
                        "Emeline",
                        "Emeny",
                        "Emma",
                        "Emmeline",
                        "Ermina",
                        "Eva",
                        "Evelune",
                        "Galiena",
                        "Geva",
                        "Giselle",
                        "Griselda",
                        "Guinevere",
                        "Hadwisa",
                        "Helen",
                        "Herleva",
                        "Hugolina",
                        "Ida",
                        "Isabella",
                        "Ivette",
                        "Jacoba",
                        "Jane",
                        "Joan",
                        "Johanna",
                        "Judith",
                        "Juliana",
                        "Julliet",
                        "Katherine",
                        "Lena",
                        "Margaret",
                        "Margery",
                        "Martha",
                        "Mary",
                        "Matilda",
                        "Maynild",
                        "Millicent",
                        "Molly",
                        "Oriel",
                        "Paulina",
                        "Regina",
                        "Ricolda",
                        "Roana",
                        "Robbin",
                        "Rohesia",
                        "Rosalind",
                        "Rosamund",
                        "Sarah",
                        "Sela",
                        "Susanna"
                    ]);
                }
                break;
            //#endregion
            //#region Infernal
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
                }
                else {
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
            //#endregion
            //#region Kenku
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
            //#endregion
            //#region Kobold
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
            //#endregion
            //#region Koa-Toa
            case "kuo-toa":
                name = randomize(["Too", "Mmot", "Loo", "Chog", "Laag", "Shoo", "Doo", "Gib", "Glol", "Kur", "Dag", "Gap", "Blop"]) + randomize(["ploorg", "hagoon", "goorg", "bogg", "goop", "loorg", "daga", "gool", "goonleth"]);
                break;
            //#endregion
            //#region Lizardfolk
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
            //#endregion
            //#region Modron
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
            //#endregion
            //#region Northern
            case "northern":
                if (gender == "male") {
                    name = randomize(["Edd", "Rob", "Ren", "Stan", "Ned"]);
                    name += randomize(["ard", "is", "ert"]);
                }
                else {
                    name = randomize(["Ar", "Cat", "San"]);
                    name += randomize(["ya", "sa", "lyn"]);
                }
                break;
            //#endregion
            //#region Orc
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
                }
                else {
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
            //#endregion
            //#region Tabaxi
            case "tabaxi":
                name = randomize([
                    "Afternoon Nap (Nap)",
                    "Cloud on the Mountaintop (Cloud)",
                    "Defiant Time (Defiant)",
                    "Drifting Snowflake (Snowflake)",
                    "Five Timber (Timber)",
                    "Flask of Wine (Flask)",
                    "Game of Chance (Game)",
                    "Gold Wind (Wind)",
                    "Jade Shoe (Jade)",
                    "Left-Handed Hummingbird (Bird)",
                    "River Mist (River)",
                    "Scratch on Wood (Scratch)",
                    "Seven Thundercloud (Thunder)",
                    "Skirt of Snakes (Snake)",
                    "Smoking Mirror (Smoke)",
                    "Snow of the Mountain (Snow)",
                    "Spring Blossom (Spring)",
                    "Storm at Sea (Sea)",
                    "Winter Breath (Winter)"
                ]);
                break;
            //#endregion
            //#region Tortle
            case "tortle":
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
            //#endregion
            //#region Triton
            case "triton":
                if (gender == "male") {
                    name = randomize([
                        "Corus",
                        "Delnis",
                        "Jhimas",
                        "Keros",
                        "Molos",
                        "Nalos",
                        "Vodos",
                        "Zunis"
                    ]);
                }
                else {
                    name = randomize([
                        "Aryn",
                        "Belthyn",
                        "Duthyn",
                        "Feloren",
                        "Otanyn",
                        "Shalryn",
                        "Vlaryn",
                        "Wolyn"
                    ]);
                }
                break;
            //#endregion
            //#region Virtue
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
            //#endregion
            //#region Wilkoss
            case "wilkoss":
                if (gender == "male") {
                    name = randomize(["Bee", "Bun", "Er", "Foz", "Gon", "Gro", "Ker"]);
                    name += randomize(["ker", "son", "nie", "zie", "zo", "ver", "mit"]);
                }
                else {
                    name = randomize(["Ab", "Cam", "Jan", "Ros", "Zo", "Prair"]);
                    name += randomize(["by", "illa", "ice", "ita", "eey"]);
                }
                break;
            //#endregion
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
                }
                else {
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
    last: function (species = "human", gender = "female", age = "adult") {
        var name = "";
        switch (species) {
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
                break;
            //#endregion
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
            //#endregion
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
            //#endregion
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
            //#endregion
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
            //#endregion
            //#region Elf
            case "elf":
                name = randomize([
                    "Aloro",
                    "Amakiir",
                    "Amastacia",
                    "Ariessus",
                    "Arnuanna",
                    "Berevan",
                    "Caerdonel",
                    "Caphaxath",
                    "Casilltenirra",
                    "Cithreth",
                    "Dalanthan",
                    "Eathalena",
                    "Erenaeth",
                    "Ethanasath",
                    "Fasharash",
                    "Firahel",
                    "Floshem",
                    "Galanodel",
                    "Goltorah",
                    "Hanali",
                    "Holimion",
                    "Horineth",
                    "Iathrana",
                    "Ilphelkiir",
                    "Iranapha",
                    "Koehlanna",
                    "Lathalas",
                    "Liadon",
                    "Meliamne",
                    "Mellerelel",
                    "Mystralath",
                    "Naïlo",
                    "Netyoive",
                    "Ofandrus",
                    "Ostoroth",
                    "Othronus",
                    "Qualanthri",
                    "Raethran",
                    "Rothenel",
                    "Selevarun",
                    "Siannodel",
                    "Suithrasas",
                    "Sylvaranth",
                    "Teinithra",
                    "Tiltathana",
                    "Wasanthi",
                    "Withrethin",
                    "Xiloscient",
                    "Xistsrith",
                    "Yaeldrin"
                ]);
                break;
            //#endregion
            //#region Gnome
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
            //#endregion
            //#region Halfling
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
                    "Fairkettle",
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
                    "Satinleaf",
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
            //#endregion
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
            //#endregion
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
            //#endregion
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
            //#endregion
            //#region Triton
            case "triton":
                name = randomize([
                    "Paroxath",
                    "Morskoth",
                    "Dnoth"
                ]);
                break;
            //#endregion
            default:
                break;
        }
        return name;
    },
    full: function (species = "human", gender = "female", age = "adult") {
        let n = NameGenerator;
        switch (species) {
            case "aasimar":
                return n.first("human", gender, age) + " " + n.last("human", gender, age);
            case "brokkos":
                return n.last("brokkos", gender, age) + " " + n.first("brokkos", gender, age);
            case "dragonborn":
                return (n.first("dragonborn", gender, age) + " " + n.last("dragonborn", gender, age));
            case "drow":
                return (n.first("drow", gender, age) + " " + n.last("drow", gender, age));
            case "dwarf":
                return (n.first("dwarf", gender, age) + " " + n.last("dwarf", gender, age));
            case "elf":
                return (n.first("elf", gender, age) + " " + n.last("elf", gender, age));
            case "genasi":
                return n.first("human", gender, age);
            case "gnome":
                return (n.first("gnome", gender, age) + " " + n.last("gnome", gender, age));
            case "halfling":
                return (n.first("halfling", gender, age) + " " + n.last("halfling", gender, age));
            case "halfelf":
                return (n.first("elf", gender, age) + " " + n.last("human", gender, age));
            case "halforc":
                return (n.first("orc", gender, age) + " " + n.last("human", gender, age));
            case "hobgoblin":
                return (n.first("hobgoblin", gender, age) + " " + n.last("hobgoblin", gender, age));
            case "human":
                return n.first("human", gender, age) + " " + n.last("human", gender, age);
            case "kitsune":
                return n.first("anime", gender, age) + " " + n.last("anime", gender, age);
            case "kuotoa":
            case "kuo-toa":
                return n.first("kuo-toa", gender, age);
            case "tabaxi":
                return n.first("tabaxi", gender, age) + " " + n.last("tabaxi", gender, age);
            case "triton":
                return n.first("triton", gender, age) + " " + n.last("triton", gender, age);
            case "tiefling":
                var name;
                if (Math.round(Math.random()) == 0) {
                    name = n.first("virtue", gender, age);
                }
                else {
                    name = n.first("infernal", gender, age);
                }
                return name;
            default:
                return n.first(species, gender, age);
        }
    }
};
//# sourceMappingURL=name.js.map