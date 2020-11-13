var gunParts = ["Muzzle","Barrel","Sights","Stock"]

var flavourTextMelee = ["Looks like a ranged weapon",
  "Has a notch in the hilt for each kill ",
  "Is inset with pearl along the handle",
  "Has a large ruby set on the pommel",
  "Glows dimly with some sort of inner power",
  "Has strange runes etched on the sides",
  "Has a wrist strap on the handle",
  "Was once a fine weapon, but is very broken, but it can make due as a different one",
  "Has an ergonomic grip to it",
  "Has a screw off cap on the bottom of the handle, in it is a compass, needle and thread, fishing line, and a whetstone",
  "Has a switch that functions as a windshield wiper on the blade, but for blood though",
  "Has a constant smell of kerosene",
  "Has a matte black paint job",
  "When swung, something rattles inside, but if disassembled, nothing is there ",
  "Has the instruction manual tied to the handle",
  "Has a memory foam handle",
  "In combat, the swings of this blade hum a song, that gets louder with every kill",
  "Feels like it will break any minute",
  "Has a laser burned image of a particular deity’s holy symbol on the hilt/handle",
  "Has a crude looking design, though despite this, is just as effective as the current model of this weapon type ",
  "Has a purple ribbon tied to the handle",
  "Has a hilt that doubles as a large wrench",
  "Is made from the bones of some exotic creature",
  "Has the name ‘Montgomery’ etched into it",
  "Is perfectly weighted",
  "Feels like it has a higher purpose or calling",
  "Was once used for ceremonial purposes",
  "Has a hilt you wear like a glove",
  "Changes colour depending on the mood of who wields it",
  "Once belonged to a great General",
  "Looks like it was cobbled together from scraps",
  "Is inlaid with pearl and gold",
  "Is awkwardly balanced",
  "Has been modified heavily by a prior owner",
  "Has clumps of multi colored hair hung from the hilt",
  "Has a gold locket with a picture of a Lashunta hanging from the pommel",
  "Is unnaturally cold to the touch",
  "Hums a tune while used in battle",


]

var flavourTextAll = ["looks quite old",
  "has had the serial number filed off and electronic tags erased",
  "has a grip that is odd and mishapen as if for an alien hand",
  "is made from a strange material that absorbs light",
  "sparkles and glitters in the light",
  "is surplus military stock",
  "has the model number scrawled on to it in some alien text",
  "is small, half the size of similar makes",
  "is large, double the size of similar makes",
  "is pretty underwhelming",
  "generates a small electrical field, attracting nearby dust and particles",
  "was at some point painted in dark colours",
  "has grease ducts that need constant maintenance",
  "is overed in rust",
  "Looks like it just came off the assembly line",
  "smells of fresh wrought metal",
  "is entirely made from plastics",
  "is two sizes too big, as if it were made for large hands",
  "is switchurdy and reliable",
  "is a particular model favoured by the Hellnights",
  "glows warmly in dim and dark light",
  "has had many owners",
  "is reliable and trustworthy",
  "Looks like it might break at any minute",
  "has proven itself in combat",
  "is leftover stock from the Vesk wars",
  "is old stock, battle proven",
  "has been mirror polished",
  "has been plated with a strange blue material",
  "is constructed entirely from advanced lightweight fibres",
  "feels heavier than it looks",
  "is left handed",
  "needs to be greased reguarly",
  "is covered in dirt and grime",
  "Looks cheap but functional",
  "Is much lighter than you expected",
  "Is much heavier than you expected",
  "Was painted a garish color",
  "Is made of an unfamiliar material",
]

var flavourTextRanged = ["features an oversized scope",
  "has advanced technologies that keep it firing with no maintenance required",
  "has three barrels! that seems excessive",
  "has the sights on the side of it",
  "has a barrel that looks like the end of a trumpet",
  "feels like the more it is used the smoother it is to fire",
  "has a lucky skittermander foot is attached to the barrel",
  "has red lights that indicate when it is ready to fire",
  "Is old and worn, but reliable in a firefight",
  "Humms oddly when fully charged",
  "Looks like a melee weapon",
  "Is encased in chrome, classic ray-gun styling",
  "Has red pulsating veins embedded within it",
  "Is oddly light for it’s size; maybe it’s made of special material?",
  "Has a small plaque on the handle, the name worn away over time",
  "Is made specifically for a lefty",
  "Has a pink, bubble filled paint job",
  "Is fitted for a bayonet",
  "Has a slot to hold a spare magazine",
  "Has bite marks on the barrel",
  "Looks as though it was fashioned together with multiple different gun parts",
  "Has 1d20 tally marks on the side",
  "Has vulgar language etched on the sides",
  "Vibrates strangely when used excessively",
  "Has a heavy weighted barrel",
  "Has a camo paintjob that changes depending on the environment",
  "Has a classic design reminiscent of yesteryear",
  "Has been lovingly cared for by expert hands",
  "Is particularly well-balanced",
  "Has a matte finish that reflects little light",
  "Bears scorch marks from having been caught in an explosion",
  "Has a sleek profile, about twenty-five percent more narrow than similar models",
  "Has an unidentifiable carnivore’s jaws painted around the barrel",
  "Is brightly patterned like a stinging insect",
  "Has a nondescript, mass-produced look",
  "Was clearly originally issued to security forces and subsequently stolen",
  "Has a hologram projected across the barrel that displays information regarding the weapon’s remaining ammunition, temperature, barrel condition, and more",
  "Has a somewhat bulky, inefficient design",
  "Seems deliberately modeled to resemble a much more common (and less lethal) weapon",
  "Bears a strange camouflage pattern that doesn’t seem suitable to any local environment",
  "Has been optimized for marksmanship over speed",
  "Was clearly poorly handled, and shows signs of having been dropped numerous times",
  "Shows signs of water damage",
  "Is made of an unusual industrial polymer, not typically seen in weapon manufacture",
  "Seems fresh from the factory floor",
  "Has numerous gaudy embellishments that make it look almost like a toy",
  "Has several aftermarket parts, cobbled together from all sorts of other models",
  "Bears the logo of a now-defunct manufacturer, notorious for shoddy workmanship",
  "Has the symbol of Nyarlathotep etched deeply into the grip",
  "Is a classic model that only a true connoisseur could properly appreciate",
  "Was assembled from a kit by an enthusiastic but clearly untalented amateur",
  "Is a relic of a forgotten war",
  "Bears the message “Remember Aledra” along the barrel",
  "Has a multi-barrel design not typical for weapons of this type",
  "Is the sort of standard, reliable model that veteran spacers appreciate",
  "Is a model notorious for jamming issues",
  "Has a Datapad port for making micro-adjustments to its internal mechanisms",
  "Has clearly never had even basic maintenance",
  "Is the sort of cruel-looking design favored by those who like to intimidate their comrades as well as their foes",
  "Has a distinctive pattern favored by a well-known military unit",
  "Has a crudely applied chrome finish",
  "Emits a piercing beep when it's low on ammo",
  "Has a habit of ejecting spent ammunition at high velocity",
  "Refuses to fit in any conventional holster",
  "Is adorned with charms and runes",
  "Is stained heavily with blood and oil",
  "Looks like a children’s toy",
  "Is deafening when fired"


]

var damageType = ["Acid", "Cryo", "Flame", "Laser", "Plasma", "Projectile", "Shock", "Sonic"];
var meleeDamageType = ["Acid", "Cryo", "Flame", "Plasma", "Shock", "Sonic", "Uncat","Uncat"];
var damageTypeAbbrv = {
  "Acid":" A",
  "Bludgeoning": " B",
  "Cryo": " C",
  "Flame": " F",
  "Laser": " F",
  "Plasma": " E & F",
  "Piercing": " P",
  "Projectile": " P",
  "Shock": " E",
  "Slashing": " S",
  "Sonic": " So"
};
var criticalTypeAdvanced = {
  "Acid": ["Corrode"],
  "Cryo": ["Staggered"],
  "Flame": ["Burn","Wound"],
  "Plasma": ["Burn", "Severe Wound"],
  "Uncat": ["-"],
  "Shock": ["Arc"],
  "Sonic": ["Knockdown", "Deafen"]
};
var criticalTypeSmall = {
  "Acid": ["Corrode"],
  "Cryo": ["Staggered"],
  "Flame": ["Burn"],
  "Laser": ["Burn", "Staggered"],
  "Plasma": ["Burn", "Knockdown"],
  "Projectile": ["Knockdown", "-"],
  "Shock": ["Arc"],
  "Sonic": ["Knockdown", "Deafen"]
};
var criticalTypeLong = {
  "Acid": ["Corrode"],
  "Cryo": ["Staggered"],
  "Flame": ["Burn"],
  "Laser": ["Burn", "Staggered", "Wound"],
  "Plasma": ["Burn", "Knockdown", "Corrode"],
  "Projectile": ["Knockdown", "Wound", "-"],
  "Shock": ["Arc"],
  "Sonic": ["Knockdown", "Deafen"]
};
var criticalTypeHeavy = {
  "Acid": ["Corrode"],
  "Cryo": ["Staggered", "Wound"],
  "Flame": ["Burn"],
  "Laser": ["Burn", "Staggered", "Wound", "Severe Wound"],
  "Plasma": ["Burn", "Knockdown", "Corrode"],
  "Projectile": ["Knockdown", "Wound", "-", "Severe Wound"],
  "Shock": ["Arc"],
  "Sonic": ["Knockdown", "Deafen", "Wound"]
};
var criticalTypeSniper = {
  "Acid": ["Corrode", "Wound"],
  "Cryo": ["Staggered", "Wound"],
  "Flame": ["Burn", "Wound"],
  "Laser": ["Burn", "Staggered", "Wound", "Severe Wound"],
  "Plasma": ["Burn", "Knockdown", "Corrode", "Wound"],
  "Projectile": ["Knockdown", "Wound", "Severe Wound"],
  "Shock": ["Arc", "Wound"],
  "Sonic": ["Knockdown", "Deafen", "Wound"]
};

//These three not used, here for reference
var armType = ["smallArm", "longarm", "heavyWeapon", "sniperWeapon"];
var special = ["Analog", "Automatic", "Blast", "Boost", "Bright", "Entangle", "Explode", "Injection", "Line", "Penetrating", "Quick Reload", "Sniper", "Stun", "Unwieldy"];
var criticalType = ["Arc", "Bleed", "Corrode","Burn", "Corrode", "Deafen", "Injection DC +2", "Knockdown", "Severe wound", "Staggered", "Wound"];

var smallSubType = ["Semi-Auto FX Pistol", "FX Machine Pistol", "FX Revolver", "FX Hand-Cannon", "FX Bolt Gun", "FX Blaster"];
var longSubType = ["FX Assault Rifle", "FX Carbine", "FX Scattergun", "FX Submachine Gun", "FX Crossbolter","FX Scout Rifle"];
var heavySubType = ["FX Cannon", "Heavy FX Repeater", "FX Thrower", "FX Railgun", "Smart Gun - FX", "FX Mass Driver"];
var sniperSubType = ["Shirren-eye FX Rifle", "Bolt Action FX Rifle", "Semi-Auto FX Rifle", "Gas-operated FX Rifle","FX Beam Rifle","FX Sports Rifle"];

var boostDice = [
  ["1d4", "1d6"],
  ["1d6", "1d8"],
  ["1d10", "1d12"],
  ["2d6", "2d8"],
  ["3d6", "2d10"]
];

var rangeSmall = [20, 30, 40];
var rangeLong = [30, 40, 50, 60, 70];
var rangeHeavy = [30, 40, 50, 60, 70, 80];
var rangeSniper = [50, 60];

var smallArmEnergyDamageCurve = {
  "1": ["1d3", "1d4"],
  "2": ["1d4", "1d6"],
  "3": ["1d4", "1d6"],
  "4": ["1d6", "1d8"],
  "5": ["1d6", "1d8"],
  "6": ["1d8", "2d4"],
  "7": ["2d4", "2d6"],
  "8": ["2d6", "3d4"],
  "9": ["3d4", "2d8"],
  "10": ["2d8", "4d4"],
  "11": ["4d4", "3d6"],
  "12": ["3d6", "2d10"],
  "13": ["2d10", "5d4"],
  "14": ["5d4", "2d12"],
  "15": ["3d8", "4d6"],
  "16": ["3d10", "5d6"],
  "17": ["4d8", "3d12"],
  "18": ["8d4", "4d10"],
  "19": ["5d8", "9d4"],
  "20": ["10d4", "4d12"]
};

var smallArmKineticDamageCurve = {
  "1": ["1d4", "1d6"],
  "2": ["1d6", "1d8"],
  "3": ["1d8", "2d4"],
  "4": ["2d4", "1d10"],
  "5": ["1d10", "1d12"],
  "6": ["1d12", "2d6"],
  "7": ["2d6", "3d4"],
  "8": ["3d4", "2d8"],
  "9": ["2d8", "4d4"],
  "10": ["4d4", "3d6"],
  "11": ["2d10", "5d4"],
  "12": ["2d12", "3d8"],
  "13": ["3d8", "4d6"],
  "14": ["3d10", "5d6"],
  "15": ["4d8", "3d12"],
  "16": ["6d6", "5d8"],
  "17": ["7d6", "4d12"],
  "18": ["6d8", "5d10"],
  "19": ["8d6", "7d8"],
  "20": ["5d12", "6d10"]
};

var longarmEnergyDamageCurve = {
  "1": ["1d6", "1d8"],
  "2": ["1d6", "1d8"],
  "3": ["1d6", "1d8"],
  "4": ["1d8", "2d4"],
  "5": ["1d10", "1d12"],
  "6": ["1d12", "2d6"],
  "7": ["2d6", "3d4"],
  "8": ["2d8", "4d4"],
  "9": ["3d6", "2d10"],
  "10": ["2d10", "5d4"],
  "11": ["5d4", "2d12"],
  "12": ["4d6", "3d10"],
  "13": ["5d6", "7d4"],
  "14": ["4d8", "8d4"],
  "15": ["6d6", "4d10"],
  "16": ["10d4", "6d8"],
  "17": ["8d6", "5d12"],
  "18": ["6d10", "10d6"],
  "19": ["8d8", "6d12"],
  "20": ["9d8", "8d10"]
};

var longarmKineticDamageCurve = {
  "1": ["1d6", "1d8"],
  "2": ["1d6", "1d8"],
  "3": ["1d8", "1d10"],
  "4": ["1d10", "1d12"],
  "5": ["1d12", "2d6"],
  "6": ["3d4", "2d8"],
  "7": ["2d8", "4d4"],
  "8": ["3d6", "2d10"],
  "9": ["5d4", "2d12"],
  "10": ["3d8", "4d6"],
  "11": ["6d4", "3d10"],
  "12": ["5f6", "7d4"],
  "13": ["4d8", "3d12"],
  "14": ["4d10", "7d6"],
  "15": ["6d8", "8d6"],
  "16": ["7d8", "5d12"],
  "17": ["10d6", "6d12"],
  "18": ["9d8", "10d8"],
  "19": ["9d10", "8d12"],
  "20": ["12d8", "10d10"]
};

var heavyEnergyDamageCurve = {
  "1": ["1d6", "1d8"],
  "2": ["1d8", "1d10"],
  "3": ["1d8", "1d10"],
  "4": ["1d10", "1d12"],
  "5": ["1d12", "2d6"],
  "6": ["2d6", "2d8"],
  "7": ["2d8", "3d6"],
  "8": ["3d6", "2d10"],
  "9": ["2d10", "2d12"],
  "10": ["2d12", "3d8"],
  "11": ["3d8", "4d6"],
  "12": ["4d6", "3d10"],
  "13": ["5d6", "4d8"],
  "14": ["3d12", "6d6"],
  "15": ["4d10", "7d6"],
  "16": ["4d12", "5d10"],
  "17": ["5d12", "10d6"],
  "18": ["8d8", "6d12"],
  "19": ["9d8", "8d10"],
  "20": ["10d8", "7d12"]
};
var heavyKineticDamageCurve = {
  "1": ["1d10", "1d10"],
  "2": ["1d10", "1d12"],
  "3": ["1d12", "4d4"],
  "4": ["4d4", "3d6"],
  "5": ["3d6", "2d10"],
  "6": ["2d10", "5d4"],
  "7": ["5d4", "2d12"],
  "8": ["2d12", "4d6"],
  "9": ["4d6", "3d10"],
  "10": ["3d10", "3d12"],
  "11": ["3d12", "4d10"],
  "12": ["4d10", "4d12"],
  "13": ["4d12", "5d10"],
  "14": ["5d10", "8d6"],
  "15": ["7d8", "5d12"],
  "16": ["10d6", "8d8"],
  "17": ["7d10", "6d12"],
  "18": ["7d12", "8d12"],
  "19": ["12d8", "10d10"],
  "20": ["9d12", "12d10"]
};

var sniperEnergyDamageCurve = {
  "1": ["1d8"],
  "2": ["1d8"],
  "3": ["1d8"],
  "4": ["1d8"],
  "5": ["2d8"],
  "6": ["2d8"],
  "7": ["2d8"],
  "8": ["2d8"],
  "9": ["3d8"],
  "10": ["4d8"],
  "11": ["4d8"],
  "12": ["4d8"],
  "13": ["5d8"],
  "14": ["5d8"],
  "15": ["6d8"],
  "16": ["6d8"],
  "17": ["6d8"],
  "18": ["8d8"],
  "19": ["8d8"],
  "20": ["10d8"]
};

var sniperKineticDamageCurve = {
  "1": ["1d10"],
  "2": ["1d10"],
  "3": ["1d10"],
  "4": ["1d10"],
  "5": ["2d10"],
  "6": ["2d10"],
  "7": ["2d10"],
  "8": ["2d10"],
  "9": ["3d10"],
  "10": ["4d10"],
  "11": ["4d10"],
  "12": ["4d10"],
  "13": ["5d10"],
  "14": ["5d10"],
  "15": ["6d10"],
  "16": ["6d10"],
  "17": ["6d10"],
  "18": ["8d10"],
  "19": ["8d10"],
  "20": ["10d10"]
};

var basicMeleeDamageCurve = {
  "1":["1d4", "1d6"],
  "2":["1d4", "1d6"],
  "3":["1d4", "1d6"],
  "4":["1d6", "1d8"],
  "5":["1d6", "1d8"],
  "6":["1d6", "1d8"],
  "7":["2d4", "1d10"],
  "8":["1d12", "2d6"],
  "9":["3d4", "2d8"],
  "10":["2d8", "4d4"],
  "11":["3d6", "2d10"],
  "12":["5d4", "3d8"],
  "13":["4d6", "6d4"],
  "14":["5d6", "3d12"],
  "15":["4d10", "9d4"],
  "16":["7d6", "10d4"],
  "17":["4d12", "6d8"],
  "18":["8d6", "5d12"],
  "19":["10d6", "8d8"],
  "20":["6d12", "12d6"]
};

var advMeleeEnergy1HDamageCurve = {
  "1":["1d4", "1d6"],
  "2":["1d4", "1d6"],
  "3":["1d6", "1d8"],
  "4":["1d6", "1d8"],
  "5":["1d8", "1d10"],
  "6":["1d10", "1d12"],
  "7":["1d12", "2d6"],
  "8":["3d4", "2d8"],
  "9":["2d8", "2d8"],
  "10":["3d6", "2d10"],
  "11":["2d10", "5d4"],
  "12":["4d6", "6d4"],
  "13":["5d6", "4d8"],
  "14":["4d8", "3d12"],
  "15":["4d10", "10d4"],
  "16":["8d6", "6d10"],
  "17":["10d6", "8d8"],
  "18":["8d8", "7d10"],
  "19":["6d12", "9d8"],
  "20":["8d10", "10d8"]
};

var advMeleeKinetic1HDamageCurve = {
  "1":["1d4", "1d6"],
  "2":["1d6", "1d8"],
  "3":["1d6", "1d8"],
  "4":["1d8", "1d10"],
  "5":["1d8", "1d10"],
  "6":["1d10", "1d12"],
  "7":["1d12", "2d6"],
  "8":["4d4", "3d6"],
  "9":["2d10", "2d12"],
  "10":["4d6", "3d10"],
  "11":["7d4", "4d8"],
  "12":["3d12", "7d6"],
  "13":["10d4", "6d8"],
  "14":["8d6", "7d8"],
  "15":["9d6", "5d12"],
  "16":["7d10", "6d12"],
  "17":["8d10", "10d8"],
  "18":["9d10", "8d12"],
  "19":["10d10", "9d12"],
  "20":["10d12", "12d10"]
};

var advMeleeEnergy2HDamageCurve = {
  "1":["1d6", "1d8"],
  "2":["1d8", "1d10"],
  "3":["1d8", "1d10"],
  "4":["1d10", "1d12"],
  "5":["1d10", "1d12"],
  "6":["1d10", "1d12"],
  "7":["1d12", "2d6"],
  "8":["3d4", "2d8"],
  "9":["2d8", "2d8"],
  "10":["3d6", "2d10"],
  "11":["2d10", "5d4"],
  "12":["4d6", "6d4"],
  "13":["5d6", "4d8"],
  "14":["4d8", "3d12"],
  "15":["4d10", "10d4"],
  "16":["8d6", "6d10"],
  "17":["10d6", "8d8"],
  "18":["8d8", "7d10"],
  "19":["6d12", "9d8"],
  "20":["8d10", "10d8"]
};

var advMeleeKinetic2HDamageCurve = {
  "1":["1d10", "1d12"],
  "2":["1d10", "1d12"],
  "3":["1d10", "1d12"],
  "4":["1d12", "2d6"],
  "5":["1d12", "2d6"],
  "6":["1d12", "2d6"],
  "7":["2d6", "2d8"],
  "8":["4d4", "3d6"],
  "9":["2d12", "3d10"],
  "10":["4d6", "3d10"],
  "11":["7d4", "4d8"],
  "12":["3d12", "7d6"],
  "13":["10d4", "6d8"],
  "14":["8d6", "7d8"],
  "15":["9d6", "5d12"],
  "16":["7d10", "6d12"],
  "17":["8d10", "10d8"],
  "18":["8d12", "12d8"],
  "19":["9d12", "14d8"],
  "20":["12d10", "14d10"]
};

var batteryCurve = {
  "1":["20"],
  "2":["20"],
  "3":["20"],
  "4":["20", "40"],
  "5":["20", "40"],
  "6":["20", "40"],
  "7":["20", "40"],
  "8":["40", "80"],
  "9":["40", "80"],
  "10":["40", "80"],
  "11":["40", "80"],
  "12":["40", "80"],
  "13":["40", "80", "100"],
  "14":["40", "80", "100"],
  "15":["40", "80", "100"],
  "16":["40", "80", "100"],
  "17":["40", "80", "100"],
  "18":["40", "80", "100"],
  "19":["40", "80", "100"],
  "20":["80", "100"]
};

var basePrice = [260,625,1415,2195,3230,4425,6350,9175,13300,17950,24400,35300,49600,72400,109750,170350,243850,370000,557450,832900];

var priceVariance = {
  "0.7":[-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8],
  "0.2":[-0.2,-0.15,-0.1,-0.05,0,0.05,0.1,0.15,0.2],
  "0.15":[-0.15,-0.12,-0.1,-0.05,0,0.05,0.1,0.12,0.15],
  "0.1":[-0.1,-0.08,-0.06,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1]
};

var indexCounter = 0;

function clearOutput() {
  var $outputArea = $(".output.area").first();
  $outputArea.empty();
  indexCounter = 0;
}

/**
 * Get the weapon's tier based on its item level.
 * @param level number
 *   An integer from 1 to 20.
 * @return number
 */
function getTier(level) {
  switch (level) {
    case 1: case 2: case 3: case 4:
      return 1;
    case 5: case 6: case 7: case 8:
      return 2;
    case 9: case 10: case 11: case 12:
      return 3;
    case 13: case 14: case 15: case 16:
      return 4;
    case 17: case 18: case 19: case 20:
      return 5;
    default:
      return NaN;
  }
}

/**
 * Nondestructively remove any blank entry from an array.
 * @param array array
 * @return array
 */
function removeBlankValues(array) {
  var splicedArray = array.slice(0);
  while (splicedArray.indexOf("") !== -1) {
    var index = splicedArray.indexOf("");
    splicedArray.splice(index, 1);
  }

  return splicedArray;
}

function getPrice(level) {
  var price;
  var variance;
  var rounding;
  var finish;
  var base = basePrice[level - 1];
  if (level == 1){
    variance = randomChoice(priceVariance["0.7"]) * base;
    rounding = 10;
    finish = randomChoice([0,5,-5]);
  }
  else if (level == 2) {
    variance = randomChoice(priceVariance["0.2"]) * base;
    rounding = 10;
    finish = randomChoice([0,5,-5]);
  }
  else if (level >= 3 && level <= 6) {
    variance = randomChoice(priceVariance["0.15"]) * base;
    rounding = 100;
    finish = randomChoice([0,50,-50]);
  }
  else if (level >= 7 && level <= 19) {
    variance = randomChoice(priceVariance["0.1"]) * base;
    rounding = 100;
    finish = randomChoice([0,100,-100]);
  }
  else if (level == 20) {
    variance = randomChoice(priceVariance["0.2"]) * base;
    rounding = 100;
    finish = randomChoice([0,100,-100]);
  }
  price = (Math.floor((base + variance)/rounding)*rounding) + finish
  return price;
}

function getCritDice(critical,level){
  if (critical === "Burn" || critical === "Arc" || critical === "Corrode" || critical === "Bleed") {
    var num, die;
    switch (level) {
      case 1: case 2: case 3: case 4: case 5: case 6:
      case 7: case 8: case 9: case 10: case 11:
        num = 1;
        die = randomChoice(["4", "6"]);
        break;
      case 12: case 13: case 14: case 15:
        num = 2;
        die = randomChoice(["4", "6", "8"]);
        break;
      case 16: case 17: case 18:
        num = 3;
        die = randomChoice(["4", "6", "8"]);
        break;
      case 19: case 20:
        num = 4;
        die = randomChoice(["4", "6", "8"]);
        break;
      default:
        console.error("Invalid level when trying to determine critical.");
        num = "?";
        die = "?";
    }
    critical = critical + " " + num + "d" + die;
  }
  return critical;
}

function getBattery(level) {
  return batteryCurve[level].selectRandom()
}

function printNeat(level,gunName,type,damage,range,critical,capacity,usage,special,bulk) {
  var $outputArea = $(".output.area").first();
  var storeOutput = $( "div.output.area" ).html();
  $outputArea.empty();
  var nameDrop = $('#nameDrop').text();

  indexCounter += 1;
  indexString = "index" + indexCounter.toString();

  if (nameDrop.includes("Off")) {
    var panelTitle =  "Level " + level + " " + gunName;
    var panelBody =   "<h5 class=\"text-muted text-muted-one\">" + type + "</h5>" +
                      "<p><b>Price: </b>"+  getPrice(level) +
                        "<br><b>Damage: </b>" + damage +
                        "<br><b>Range: </b>" + range + " ft." +
                        "<br><b>Critical: </b>" + critical +
                        "<br><b>Capacity: </b>" + capacity +
                        "<br><b>Usage: </b>" + usage +
                        "<br><b>Bulk: </b>" + bulk +
                        "<br><b>Special: </b>" + special + "</p>";

  } else if (nameDrop.includes("On")){
    var weaponName = getrandomName(gunName);
    var panelTitle =  weaponName[2] + " " + weaponName[0];
    var panelBody =   "<h5 class=\"text-muted text-muted-one\">" + weaponName[1] + " - " + gunName + "</h5>" +
                      "<h5 class=\"text-muted text-muted-one\">" + type + "</h5>" +
                      "<p><b>Level: </b>" + level +
                        "<br><b>Price: </b>"+  getPrice(level) +
                        "<br><b>Damage: </b>" + damage +
                        "<br><b>Range: </b>" + range + " ft." +
                        "<br><b>Critical: </b>" + critical +
                        "<br><b>Capacity: </b>" + capacity +
                        "<br><b>Usage: </b>" + usage +
                        "<br><b>Bulk: </b>" + bulk +
                        "<br><b>Special: </b>" + special + "</p>" +
                      "<h5 class=\"text-muted text-muted-one\"><i> This " + gunName.toLowerCase() + " " + flavourTextAll.concat(flavourTextRanged).selectRandom().toLowerCase() + "</i></h5>";

  }
  $outputArea.append("<div class=\"panel " + indexString + "\">");
  var $panel = $(".panel."+indexString).first();
  $panel.append("<div class=\"panel-heading panel-bottom\"><h4>" + panelTitle + "</h4></div>");
  $panel.append("<div class=\"panel-body "+ indexString + "\">");
  var $index = $(".panel-body."+indexString).first();
  $index.append(panelBody);
  $index.append("<button type=\"button\" id=\""+indexString+"\"class=\"btn btn-default btn-sm btn-notblack pull-right\" onclick = \"removeEntry(this.id)\">Remove</button>");

  if (storeOutput != ""){
    $outputArea.append(storeOutput);
  }
}

function printMeleeNeat(level,weaponName,type,damage,critical,bulk,special) {
  var $outputArea = $(".output.area").first();
  var storeOutput = $( "div.output.area" ).html();
  $outputArea.empty();
  var nameDrop = $('#nameDrop').text();
  indexCounter += 1;
  indexString = "index" + indexCounter.toString();

  if (nameDrop.includes("Off")) {
    var panelTitle = "Level " + level + " " + weaponName;
    var panelBody = "<h5 class=\"text-muted text-muted-one\">" + type + "</h5>" +
                    "<p><b>Price: </b>"+  getPrice(level) +
                        "<br><b>Damage: </b>" + damage +
                        "<br><b>Critical: </b>" + critical +
                        "<br><b>Bulk: </b>" + bulk +
                        "<br><b>Special: </b>" + special + "</p>";

  } else if (nameDrop.includes("On")){
    var gName = getrandomName(weaponName);
    var panelTitle = gName[0] + " " + gName[3];
    var panelBody = "<h5 class=\"text-muted text-muted-one\">" + gName[1] + " - " + weaponName + "</h5>" +
                    "<h5 class=\"text-muted text-muted-one\">" + type + "</h5>" +
                    "<p><b>Level: </b>" + level +
                        "<br><b>Price: </b>"+  getPrice(level) +
                        "<br><b>Damage: </b>" + damage +
                        "<br><b>Critical: </b>" + critical +
                        "<br><b>Bulk: </b>" + bulk +
                        "<br><b>Special: </b>" + special + "</p>" +
                    "<h5 class=\"text-muted text-muted-one\"><i> This " + weaponName.toLowerCase() + " " + flavourTextAll.concat(flavourTextMelee).selectRandom().toLowerCase() + "</i></h5>";
  }
  $outputArea.append("<div class=\"panel " + indexString + "\">");
  var $panel = $(".panel."+indexString).first();
  $panel.append("<div class=\"panel-heading panel-bottom\"><h4>" + panelTitle + "</h4></div>");
  $panel.append("<div class=\"panel-body "+ indexString + "\">");
  var $index = $(".panel-body."+indexString).first();
  $index.append(panelBody);
  $index.append("<button type=\"button\" id=\""+indexString+"\"class=\"btn btn-default btn-sm btn-notblack pull-right\" onclick = \"removeEntry(this.id)\">Remove</button>");

  if (storeOutput != ""){
      $outputArea.append(storeOutput);
  }
}

function removeEntry(index) {
  $(".panel."+index).remove();
}

function basicMelee(level) {
  var damage;
  var handed;
  var bulk;
  var type;
  var critical;
  var special = [];

  var basicMeleeType = ["Knife","Baton","Duelling Sword","Battleglove","Space Mace","Spear","Kasathan Bladestaff","Staff"];
  var weaponName = randomChoice(basicMeleeType);

  if (level <= 10){
    special.push("Analog");
  }
  else  {
    if (weaponName === "Duelling Sword" || weaponName === "Battleglove" || weaponName === "Space Mace") {
      special.push(randomChoice(["Powered (capacity 20, usage 1)","Analog"]));
    }
    else {
      special.push("Analog");
    }
  }

  if (weaponName === "Knife") {
    damage = basicMeleeDamageCurve[level][0] + " S";
    handed = "one";
    bulk = "L";
    critical = "-";
    special.push("Operative");
  }
  else if (weaponName === "Baton") {
    damage = randomChoice(basicMeleeDamageCurve[level]) + " B"
    handed = "one";
    bulk = "L";
    critical = "-";
    special.push("Operative");
  }
  else if (weaponName === "Duelling Sword") {
    damage = basicMeleeDamageCurve[level][1] + " S";
    handed = "one";
    bulk = "L";
    critical = "-";
  }
  else if (weaponName === "Battleglove") {
    damage = randomChoice(basicMeleeDamageCurve[level]) + " B";
    handed = "one";
    bulk = "L";
    critical = "-";
  }
  else if (weaponName === "Space Mace") {
    damage = randomChoice(basicMeleeDamageCurve[level]) + " B";
    handed = "one";
    bulk = "L";
    critical = "Staggered";
  }
  else if (weaponName === "Spear") {
    damage = randomChoice(basicMeleeDamageCurve[level]) + " P";
    handed = "two";
    bulk = "1";
    critical = "-";
    special.push("Block");
    special.push("thrown (20 ft.)");
  }
  else if (weaponName === "Kasathan Bladestaff") {
    damage = basicMeleeDamageCurve[level][1]  + " S";
    handed = "two";
    bulk = "1";
    critical = "-";
    special.push("Block");
  }
  else if (weaponName === "Staff") {
    damage = randomChoice(basicMeleeDamageCurve[level]) + " B";
    handed = "two";
    bulk = "1";
    critical = "Knockdown";
    special.push("Block");
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");
  type = "Basic melee - " + handed + "-handed";

  printMeleeNeat(level,weaponName,type,damage,critical,bulk,printSpecial);

}

function advancedMelee(level) {
  var damage;
  var damageShorthand;
  var handed;
  var bulk;
  var type;
  var critical;
  var special = [];

  var advancedMeleeType = ["FX Sword","FX Gauntlet","FX Hammer","FX-edged Handaxe","FX Truncheon","FX Doshko","FX-edged Greatsword","FX Pike","FX Longhammer"];
  var weaponType = randomChoice(advancedMeleeType);

  var damageType = randomChoice(meleeDamageType);

  var weaponName = weaponType.replace("FX", damageType).replace("Uncat ", "").replace("Uncat-edged ", "");

  if (weaponType === "FX Sword") {
    if (weaponName ==="Sword"){
      weaponName = "Longsword";
    }
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Slashing"];
      critical = (randomChoice(["-","Bleed"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "one";
    bulk = "1";
  }
  else if (weaponType === "FX Gauntlet") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Bludgeoning"];
      critical = (randomChoice(["-","Knockdown"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "one";
    bulk = "1";
  }
  else if (weaponType === "FX Hammer") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Bludgeoning"];
      critical = (randomChoice(["-","Staggered"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "one";
    bulk = "1";
  }
  else if (weaponType === "FX-edged Handaxe") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Slashing"];
      critical = (randomChoice(["-","-","Bleed","Wound"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }

    handed = "one";
    bulk = "1";
  }
  else if (weaponType === "FX Truncheon") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Bludgeoning"];
      critical = (randomChoice(["-","Staggered","Wound"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }

    handed = "one";
    bulk = "1";
  }
  else if (weaponType === "FX Doshko") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Piercing"];
      critical = (randomChoice(["-"]));
      special.push("Analog");
      special.push("Unwieldy");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "two";
    bulk = "1";
  }
  else if (weaponType === "FX-edged Greatsword") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Slashing"];
      critical = (randomChoice(["-","Wound","Bleed"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    special.push("Unwieldy");
    handed = "two";
    bulk = "2";

  }
  else if (weaponType === "FX Pike") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Piercing"];
      critical = (randomChoice(["-","Bleed"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "two";
    bulk = "2";
    special.push("Reach");
  }
  else if (weaponType === "FX Longhammer") {
    if (damageType === "Uncat"){
      damageShorthand = damageTypeAbbrv["Bludgeoning"];
      critical = (randomChoice(["-","Knockdown"]));
      special.push("Analog");
    } else {
      special.push("Powered (capacity "+randomChoice(["20","40"])+", usage "+randomChoice(["1","2","4"])+")");
    }
    handed = "two";
    bulk = "2";
    special.push("Reach");
    special.push("Unwieldy");
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");
  type = "Advanced melee - " + handed + "-handed";
  if (handed == "one") {
    if (damageType === "Uncat"){
      if (weaponType === "FX Doshko" || weaponType === "FX Longhammer") {
        damage = advMeleeKinetic1HDamageCurve[level][1] + damageShorthand;
      } else {
        damage = randomChoice(advMeleeKinetic1HDamageCurve[level]) + damageShorthand;
      }
    } else {
      damageShorthand = damageTypeAbbrv[damageType];
      critical = randomChoice(criticalTypeAdvanced[damageType]);
      if (weaponType === "FX Doshko" || weaponType === "FX Longhammer") {
        damage = randomChoice(advMeleeKinetic1HDamageCurve[level]) + damageShorthand;
      } else {
        damage = randomChoice(advMeleeEnergy1HDamageCurve[level]) + damageShorthand;
      }
    }
  }
  else if (handed =="two") {
    if (damageType === "Uncat"){
      if (weaponType === "FX Doshko" || weaponType === "FX Longhammer") {
        damage = advMeleeKinetic2HDamageCurve[level][1] + damageShorthand;
      } else {
        damage = randomChoice(advMeleeKinetic2HDamageCurve[level]) + damageShorthand;
      }
    } else {
      damageShorthand = damageTypeAbbrv[damageType];
      critical = randomChoice(criticalTypeAdvanced[damageType]);
      if (weaponType === "FX Doshko" || weaponType === "FX Longhammer") {
        damage = randomChoice(advMeleeKinetic2HDamageCurve[level]) + damageShorthand;
      } else {
        damage = randomChoice(advMeleeEnergy2HDamageCurve[level]) + damageShorthand;
      }
    }
  }
  critical = getCritDice(critical,level);

  printMeleeNeat(level,weaponName,type,damage,critical,bulk,printSpecial);

}

function smallArm(level) {

  var tier = getTier(level);
  var randomDamageType = randomChoice(damageType);
  var gunType = randomChoice(smallSubType);
  var printLevel = level;
  var battery = getBattery(level)

  // Hand-Cannon has higher damage compared to other typed
  if (gunType === "FX Hand-Cannon" && level !== 20) {
    level += 1;
  }
  if (gunType === "FX Blaster" && randomDamageType === "Projectile") {
    randomDamageType = "Laser";
  }

  var damage;
  if (randomDamageType === "Projectile") {
    damage = randomChoice(smallArmKineticDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  } else {
    damage = randomChoice(smallArmEnergyDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  }

  var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "");

  var special = [];
  var ammo = [];

  // Range
  var rangeo = 0;
  rangeo = randomChoice(rangeSmall);
  rangeo += (10 * tier);
  if (tier === 5) {
    rangeo -= 10;
  }
  if (randomDamageType === "Laser") {
    rangeo += 20;
  }
  if (rangeo > 100) {
    rangeo = 100;
  }

  // Ammo // Special
  if (gunType === "FX Revolver") {
    ammo.push(randomChoice(["6 rounds", "8 rounds"]));
    ammo.push("1");
    special.push(randomChoice([
      "Boost " + randomChoice(boostDice[tier-1]),
      "Bright",
      "Quick Reload",
      "Stun",
      "-"
    ]));
  }
  else if (gunType === "FX Hand-Cannon") {
    var specialloc = randomChoice(["Blast", "Line"]);
    if (specialloc === "Blast"){
      rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
      if (rangeo > 30) {
        rangeo = 30;
      }
    }
    else if (specialloc === "Line") {
      rangeo = 10 + (tier * 10) + randomChoice([-5,0, 5]);
      if (rangeo > 60) {
        rangeo = 60;
      }
    }
    special.push(specialloc);
    special.push("Unwieldy");
    ammo.push("1 shell");
    ammo.push("1");
  }
  else if (gunType === "Semi-Auto FX Pistol") {
    var semiAuto1 = [
      battery + " charges",
      randomChoice(["1", "1", "2", "4"])
    ];
    var semiAuto2= [randomChoice(["10", "12", "16", "18"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push(randomChoice([
      "Boost "+ randomChoice(boostDice[tier-1]),
      "Bright",
      "Quick Reload",
      "Stun",
      "-"
    ]));
  }
  else if (gunType === "FX Machine Pistol") {
    var semiAuto1 = [
      battery + " charges",
      randomChoice(["1", "1", "2", "4"])
    ];
    var semiAuto2 = [randomChoice(["10", "12", "12", "24", "48"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push("Automatic");
  }
  else if (gunType === "FX Bolt Gun") {
    ammo = [randomChoice(["10", "12", "24", "32"]) + " rounds", randomChoice(["1", "2"])];
    special.push(randomChoice([
      "Boost "+ randomChoice(boostDice[tier-1]),
      "Bright",
      "Quick Reload",
      "Stun"
    ]));
  }
  else if (gunType === "FX Blaster") {
    ammo = [
      battery + " charges",
      randomChoice(["1", "4", "5", "10"])
    ];
    special.push(randomChoice([
      "Boost "+ randomChoice(boostDice[tier-1]),
      "Bright",
      "Quick Reload",
    ]));
  }

  if (special.join(", ") === "Analog, -") {
    special = ["Analog"];
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");
  // Critical
  var critical = randomChoice(criticalTypeSmall[randomDamageType]);

  // possibility of no critical in low tiers
  if (tier <= 2) {
    critical = randomChoice([critical, critical, "-"]);
  }
  critical = getCritDice(critical,level);

  bulk = "L"
  type = "Small arm - one-handed"

  printNeat(printLevel,gunName,type,damage,rangeo,critical,ammo[0],ammo[1],printSpecial,bulk)

}

function longarm(level) {

  var tier = getTier(level);
  var randomDamageType = randomChoice(damageType);
  var gunType = randomChoice(longSubType);
  var printLevel = level;
  var battery = getBattery(level);

  // Rifle has higher damage compared to other types
  if (gunType === "FX Assault Rifle" && level != 20) {
    level += 1;
  }
  if (gunType === "FX Scout Rifle" && level != 1) {
    level -= 1;
  }

  var damage;
  if (randomDamageType === "Projectile") {
    damage = randomChoice(longarmKineticDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  } else {
    damage = randomChoice(longarmEnergyDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  }

  var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "");

  var special = [];
  var ammo = [];
  var bulk;

  // Range
  var rangeo = 0;
  rangeo = randomChoice(rangeLong);
  rangeo += (10 * tier);
  if (randomDamageType === "Laser") {
    rangeo += 20;
  }
  if (rangeo > 120) {
    rangeo = 120;
  }

  // Special
  special.push(randomChoice(["Analog", "", ""]));

  // Ammo
  if (gunType === "FX Assault Rifle") {
    var semiAuto1 = [
      battery + " charges",
      randomChoice(["1", "2", "4", "10"])
    ];
    var semiAuto2 = [randomChoice(["12", "18", "24"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push(randomChoice([
      "Automatic",
      "Penetrating",
      "-"
    ]));
    bulk = randomChoice(["1","1","2"]);
  }
  else if (gunType === "FX Carbine") {
    var semiAuto1 = [battery + " charges",randomChoice(["1", "2", "4", "10"])];
    var semiAuto2 = [randomChoice(["12", "24", "48"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push(randomChoice([
      "Quick Reload",
      "Boost " + randomChoice(boostDice[tier-1]),
      "Stun",
      "-"
    ]));
    rangeo -= 30;
    if (rangeo < 40) {
      rangeo = 40;
    }
    bulk = "L";
  }
  else if (gunType === "FX Scattergun") {
    special.push("Blast");
    rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
    if (rangeo > 30) {
      rangeo = 30;
    }
    ammo.push(randomChoice([
      "1 shell",
      "2 shells",
      "6 shells",
      "12 shells"
    ]));
    ammo.push("1");
    bulk = "1";
  }
  else if (gunType === "FX Submachine Gun") {
    special.push("Automatic");
    var semiAuto1 = [
      battery + " charges",
      randomChoice(["1", "1", "2", "4"])
    ];
    var semiAuto2 = [randomChoice(["10", "12", "12", "24", "48"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    bulk = randomChoice(["1", "1", "2"]);
  }
  else if (gunType === "FX Crossbolter") {
    special.push("Unwieldy");
    ammo.push(randomChoice([
      "1 arrow",
      "2 arrows",
      "4 arrows",
      "8 arrows"
    ]));
    ammo.push("1");
    bulk = "1";
  }
  else if (gunType === "FX Scout Rifle") {
    rangeo = 120
    ammo = [randomChoice(["6", "8", "10", "12",]) + " rounds", "1"];
    bulk = "1";
    special.push(randomChoice([
      "Boost " + randomChoice(boostDice[tier-1]),
      "Bright",
      "Quick Reload",
      "-"
    ]));
  }

  if (special.join(", ") === "Analog, -") {
    special = ["Analog"];
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");

  // Critical
  var critical = randomChoice(criticalTypeLong[randomDamageType]);
  // possibility of no critical in low tiers
  if (tier <= 2) {
    critical = randomChoice([critical, critical, "-"]);
  }
  critical = getCritDice(critical,level);

  type = "Longarm - two-handed"
  printNeat(printLevel,gunName,type,damage,rangeo,critical,ammo[0],ammo[1],printSpecial,bulk)

}

function heavyWeapon(level) {

  var tier = getTier(level);
  var randomDamageType = randomChoice(damageType);
  var gunType = randomChoice(heavySubType);
  var printLevel = level;
  var damage;
  var battery = getBattery(level);

  // Railgun increase damage compared to other types
  if (gunType === "FX Railgun" && level != 20) {
    level += 1;
  }
  if (gunType === "FX Thrower" && randomDamageType === "Projectile") {
    randomDamageType = "Laser";
  }



  if (randomDamageType === "Projectile") {
    damage = randomChoice(heavyKineticDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  } else {
    damage = randomChoice(heavyEnergyDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  }
  var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "").replace(" - Projectile", "");

  var special = [];
  var ammo = [];

  // Range
  var rangeo = 0;
  rangeo = randomChoice(rangeHeavy);
  rangeo += (10 * tier);
  if (randomDamageType === "Laser") {
    rangeo += 30;
  }
  if (rangeo > 120) {
    rangeo = 120;
  }

  special.push(randomChoice([
    "Analog",
    "",
    "",
    ""
  ]));

  if (gunType === "FX Cannon") {
    ammo = [
      battery + " charges",
      randomChoice(["2", "4", "5", "10"])
    ];
    var radius = 5 * tier;
    rangeo -= 30;
    if (rangeo < 30) {
      rangeo = 30;
    }
    special.push("Explode (" + radius + " ft.)");
    special.push("Unwieldy");
  }
  else if (gunType === "Heavy FX Repeater") {
    var semiAuto1= [
      battery + " charges","1"
    ];
    var semiAuto2= [randomChoice(["12", "24", "48"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push("Automatic");
    special.push(randomChoice(["Penetrating", ""]));
    rangeo -= 30;
  }
  else if (gunType === "FX Thrower") {
    var specialloc = randomChoice(["Blast", "Line"]);
    if (specialloc === "Blast"){
      rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
      if (rangeo > 30) {
        rangeo = 30;
      }
    }
    else if (specialloc === "Line") {
      rangeo = 10 + (tier * 15) + randomChoice([-5,0, 5]);
      if (rangeo > 80) {
        rangeo = 80;
      }
    }
    special.push(specialloc);
    special.push("Unwieldy");
    ammo = [
      battery + " charges",
      randomChoice(["2", "4", "10"])
    ];
  }
  else if (gunType === "FX Railgun") {
    rangeo = 15 + (tier * 15) + randomChoice([-5,0, 5]);
    if (rangeo > 80) {
      rangeo = 80;
    }
    special.push("Line");
    special.push("Penetrating");
    special.push("Unwieldy");
    var semiAuto1= [
      battery + " charges",
      randomChoice(["2", "4", "10"])
    ];
    var semiAuto2= [randomChoice(["8", "12", "18"]) + " rounds", "1"]
    ammo = randomChoice([semiAuto1, semiAuto2]);
  }
  else if (gunType === "Smart Gun - FX") {
    var semiAuto1= [
      battery + " charges",
      randomChoice(["2", "4", "10"])
    ];
    var semiAuto2= [randomChoice(["12", "24", "48"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
    special.push("Automatic");
    special.push(randomChoice(["Penetrating", ""]));
    special.push("Stun");
  }
  if (gunType === "FX Mass Driver") {
    ammo = [
      battery + " charges",
      randomChoice(["5", "10"])
    ];
    var radius = 5 * tier;
    special.push("Explode (" + radius + " ft.)");
    special.push("Unwieldy");
  }

  var bulk = randomChoice(["2", "2", "3"]);
  if (special.join(", ") === "Analog, -") {
    special = ["Analog"];
  }

  // Critical
  var critical = randomChoice(criticalTypeHeavy[randomDamageType]);
  // possibility of no critical in low tiers
  if (tier <= 2) {
    critical = randomChoice([critical, critical, "-"]);
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");
  critical = getCritDice(critical,level);

  type = "Heavy - two-handed"

  printNeat(printLevel,gunName,type,damage,rangeo,critical,ammo[0],ammo[1],printSpecial,bulk)

}

function sniperWeapon(level) {

  var tier = getTier(level);
  var randomDamageType = randomChoice(damageType);
  var gunType = randomChoice(sniperSubType);
  var printLevel = level;

  // Shirren-eye Rifle increase damage compared to other types
  if (gunType === "Shirren-eye FX Rifle" && level != 20) {
    level += 1;
  }
  if (gunType === "FX Beam Rifle" && randomDamageType === "Projectile") {
    randomDamageType = "Laser";
  }

  if (randomDamageType === "Projectile") {
    damage = randomChoice(sniperKineticDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  } else {
    damage = randomChoice(sniperEnergyDamageCurve[level]) + damageTypeAbbrv[randomDamageType];
  }

  var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "");

  var special = [];
  var ammo = [];

  // Range
  var rangeo = 0;
  rangeo = randomChoice(rangeSniper);
  rangeo += (10 * tier);
  if (randomDamageType === "Laser" || randomDamageType === "Projectile") {
    rangeo += 20;
  }
  if (rangeo > 100) {
    rangeo = 100;
  }

  if (randomDamageType === "Projectile") {
    special.push(randomChoice(["Analog", ""]));
  }

  if (gunType === "Shirren-eye FX Rifle") {
    ammo = [randomChoice(["4", "6", "8"]) + " rounds", "1"];
  }
  else if (gunType === "Bolt Action FX Rifle") {
    ammo = ["1 round", "1"];
  }
  else if (gunType === "Semi-Auto FX Rifle") {
    var semiAuto1 = [
      randomChoice(["10", "20", "30"]) + " charges", "1"
    ];
    var semiAuto2 = [randomChoice(["4", "8", "12", "16"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
  }
  else if (gunType === "Gas-operated FX Rifle") {
    var semiAuto1 = [
      randomChoice(["10", "20", "30"]) + " charges", "1"
    ];
    var semiAuto2 = [randomChoice(["4", "8", "12"]) + " rounds", "1"];
    ammo = randomChoice([semiAuto1, semiAuto2]);
  }
  else if (gunType === "FX Beam Rifle") {
    ammo = [
      randomChoice(["10", "20", "30"]) + " charges",
      randomChoice(["5", "10"])
    ];
    special.push("Bright");
  }
  else if (gunType === "FX Sports Rifle") {
    ammo = [randomChoice(["4", "8", "12"]) + " rounds", "1"];
    special.push("Stun");
  }

  // add sniper range
  var radius = 250 * tier;
  if (radius > 1000) {
    radius = 1000;
  }
  special.push(randomChoice(["Penetrating", ""]));
  special.push("Sniper (" + radius + " ft.)");
  special.push("Unwieldy");

  var bulk = randomChoice(["1", "2"]);
  if (special.join(", ") === "Analog, -") {
    special = ["Analog"];
  }

  special = removeBlankValues(special);
  var printSpecial = special.join(", ");

  // Critical
  var critical = randomChoice(criticalTypeSniper[randomDamageType]);
  // possibility of no critical in low tiers
  if (tier <= 2) {
    critical = randomChoice([critical, "-"]);
  }
  critical = getCritDice(critical,level);

  type = "Sniper - two-handed"

  printNeat(printLevel,gunName,type,damage,rangeo,critical,ammo[0],ammo[1],printSpecial,bulk)
}

function generateWeapon() {

  var level;
  var type;
  var typeString;

  //get vars from page
  var levelDrop = $('#levelDrop').text();
  var typeDrop = $('#weaponDrop').text();

  //sort level
  if (levelDrop.includes("Any")) {
    level = getRandomInt(1, 20);
  } else if (levelDrop.includes("Tier")){
    tier = parseInt(levelDrop.replace("Tier ", ""));
    level = ((tier - 1) * 4 ) +getRandomInt(1, 4);
  } else if (levelDrop.includes("Level")){
    level = parseInt(levelDrop.replace("Level ", ""));
  } else {
    level = NaN;
  }

  //sort weapon
  if (typeDrop.includes("Any")) {
    type = getRandomInt(1, 6);
  } else if (typeDrop.includes("Basic melee")){
    type = 1;
  } else if (typeDrop.includes("Advanced melee")){
    type = 2;
  } else if (typeDrop.includes("Small arm")){
    type = 3;
  } else if (typeDrop.includes("Longarm")){
    type = 4;
  } else if (typeDrop.includes("Heavy")){
    type = 5;
  } else if (typeDrop.includes("Sniper")){
    type = 6;
  } else {
    type = NaN;
  }

  //generate
  switch (type) {
    case 1:
      basicMelee(level);
      typeString = "Basic Melee";
      break;
    case 2:
      advancedMelee(level);
      typeString = "Advanced Melee";
      break;
    case 3:
      smallArm(level);
      typeString = "Smallarm";
      break;
    case 4:
      longarm(level);
      typeString = "Long Arm";
      break;
    case 5:
      heavyWeapon(level);
      typeString = "Heavy";
      break;
    case 6:
      sniperWeapon(level);
      typeString = "Sniper";
      break;
    default:
      typeString = "Error";
      console.error("generation error");
  }
  //log event in analytics
  ga('send', 'event', 'Generation', 'weapon', typeString);
}

//Sets selected dropdown to dropdown display
//BOOTSTRAP 3
$(".dropdown-menu li a").click(function(){
  var selected = $(this).text();
  if (selected.includes("On") || selected.includes("Off")) {
    $(this).closest('.btn-group').find('.dropdown-toggle').html('<span class="pull-left">Name Generator ' + selected + '</span><span class="caret"></span>');
    $(this).closest('.btn-group').find('.dropdown-toggle').val("Name Generator " + selected)
  }
  else {
    $(this).closest('.btn-group').find('.dropdown-toggle').html('<span class="pull-left">' +selected + '</span><span class="caret"></span>');
    $(this).closest('.btn-group').find('.dropdown-toggle').val(selected)
  }
});
