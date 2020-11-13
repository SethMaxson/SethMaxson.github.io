const races = ["Aarakocra", "Aasimar", "Bloodfin", "Bugbear", "Drow", "Dwarf", "Elf", "Firbolg", "Firenewt", "Gnome", "Goblin", "Grippli", "Grung", "Halfling", "HalfOrc", "Human", "Kenku", "Kobold", "Kuo-toa", "Orc", "Tabaxi", "Tiefling", "Tortle", "Triton"];

const itemData = [
	{
		rarity: "common",
		name: function(type) {
			var name;
			switch (type) {
				case "armor":
					name = randomize(["Shield of Expression", "Armor of Gleaming (Any Armor)", "Smoldering Armor (Any Armor)"]);
					break;
				case "potion":
					name = randomize(["Potion of Climbing", "Potion of Healing"]);
					break;
				// There are no common rings
				// case "ring":
				// 	name = randomize(["Ring"]);
				// 	break;
				case "scroll":
					name = "Scroll of "
					var lvl = randomize([0,1]);
					if (lvl == 0) {
						name += randomize(["Acid Splash", "Blade Ward", "Booming Blade", "Chill Touch", "Control Flames", "Create Bonfire", "Dancing Lights", "Fire Bolt", "Friends", "Frostbite", "Green-Flame Blade", "Gust", "Infestation", "Light", "Lightning Lure", "Mage Hand", "Mending", "Message", "Minor Illusion", "Mold Earth", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shape Water", "Shocking Grasp", "Sword Burst", "Thunderclap", "Toll the Dead", "True Strike", "Vicious Mockery"]);
					} else {
						name += randomize(["Absorb Elements", "Alarm", "Burning Hands", "Catapult", "Cause Fear", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Earth Tremor", "Expeditious Retreat", "False Life", "Feather Fall", "Find Familiar", "Fog Cloud", "Grease", "Ice Knife", "Identify", "Illusory Script", "Jump", "Longstrider", "Mage Armor", "Magic Missile", "Protection from Evil and Good", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Snare", "Tasha's Hideous Laughter", "Tenser's Floating Disk", "Thunderwave", "Unseen Servant", "Witch Bolt"]);
					}
					name += " (lv. " + lvl + ")";
					break;
				case "weapon":
					name = randomize(["Moon-Touched Sword (Any Sword)"]);
					break;

				default:
					name = randomize(["Bead of Nourishment", "Bead of Refreshment", "Boots of False Tracks", "Candle of the Deep", "Charlatan's Die", "Cloak of Billowing", "Cloak of Many Fashions", "Clockwork Amulet", "Clothes of Mending", "Dark Shard Amulet", "Dread Helm", "Ear Horn of Hearing", "Enduring Spellbook", "Ersatz Eye", "Hat of Vermin", "Hat of Wizardry", "Heward's Handy Spice Pouch", "Horn of Silent Alarm", "Instrument of Illusions", "Instrument of Scribing", "Lock of Trickery", "Mystery Key", "Orb of Direction", "Orb of Time", "Perfume of Bewitching", "Pipe of Smoke Monsters", "Pole of Angling", "Pole of Collapsing", "Pot of Awakening", "Rope of Mending", "Ruby of the War Mage", "Talking Doll", "Tankard of Sobriety", "Veteran's Cane"]);
					break;
			}
			return name;
		}
	},
	{
		rarity: "uncommon",
		name: function(type) {
			var name;
			switch (type) {
				case "armor":
					name = randomize(["Dragonguard (Medium Armor)", "Sentinel Shield", "Shield +1", "Mariner's Armor (Any Armor)", "Mithral Armor (Any Armor)"]);
					break;
				case "potion":
					name = randomize(["Bottled Breath", "Oil of Slipperiness", "Philter of Love", "Potion of Acid Resistance", "Potion of Animal Friendship", "Potion of Cold Resistance", "Potion of Fire Breath", "Potion of Fire Resistance", "Potion of Force Resistance", "Potion of Greater Healing", "Potion of Growth", "Potion of Hill Giant Strength", "Potion of Lightning Resistance", "Potion of Necrotic Resistance", "Potion of Poison", "Potion of Poison Resistance", "Potion of Psychic Resistance", "Potion of Radiant Resistance", "Potion of Thunder Resistance", "Potion of Water Breathing"]);
					break;
				case "ring":
					name = randomize(["Ring of Jumping", "Ring of Mind Shielding", "Ring of Swimming", "Ring of Warmth", "Ring of Water Walking"]);
					break;
				case "scroll":
					name = "Scroll of "
					var lvl = randomize([2,3]);
					if (lvl == 2) {
						name += randomize(["Aganazzar's Scorcher", "Alter Self", "Arcane Lock", "Blindness/Deafness", "Blur", "Cloud of Daggers", "Continual Flame", "Crown of Madness", "Darkness", "Darkvision", "Detect Thoughts", "Dragon's Breath", "Dust Devil", "Earthbind", "Enlarge/Reduce", "Flaming Sphere", "Gentle Repose", "Gust of Wind", "Hold Person", "Invisibility", "Knock", "Levitate", "Locate Object", "Magic Mouth", "Magic Weapon", "Maximilian's Earthen Grasp", "Melf's Acid Arrow", "Mind Spike", "Mirror Image", "Misty Step", "Nystul's Magic Aura", "Phantasmal Force", "Pyrotechnics", "Ray of Enfeeblement", "Rope Trick", "Scorching Ray", "See Invisibility", "Shadow Blade", "Shatter", "Skywrite", "Snilloc's Snowball Swarm", "Spider Climb", "Suggestion", "Warding Wind", "Web"]);
					} else {
						name += randomize(["Animate Dead", "Bestow Curse", "Blink", "Catnap", "Clairvoyance", "Counterspell", "Dispel Magic", "Enemies Abound", "Erupting Earth", "Fear", "Feign Death", "Fireball", "Flame Arrows", "Fly", "Gaseous Form", "Glyph of Warding", "Haste", "Hypnotic Pattern", "Leomund's Tiny Hut", "Life Transference", "Lightning Bolt", "Magic Circle", "Major Image", "Melf's Minute Meteors", "Nondetection", "Phantom Steed", "Protection from Energy", "Remove Curse", "Sending", "Sleet Storm", "Slow", "Stinking Cloud", "Summon Lesser Demons", "Thunder Step", "Tidal Wave", "Tiny Servant", "Tongues", "Vampiric Touch", "Wall of Sand", "Wall of Water", "Water Breathing"]);
					}
					name += " (lv. " + lvl + ")";
					break;
				case "weapon":
					name = randomize(["Blood Spear", "Javelin of Lightning", "Lightbringer", "Reszur", "Seeker Dart", "Shatterspike", "Storm Boomerang", "Trident of Fish Command", "+1 Weapon (Any Weapon)", "Weapon of Warning (Any Weapon)"]);
					break;

				default:
					name = randomize(["Alchemy Jug", "Amulet of Proof Against Detection and Location", "Bag of Bounty", "Bag of Holding", "Bag of Tricks, Gray", "Bag of Tricks, Rust", "Bag of Tricks, Tan", "Balance of Harmony", "Balloon Pack", "Boots of Elvenkind", "Boots of Striding and Springing", "Boots of the Winterlands", "Bracers of Archery", "Brooch of Shielding", "Broom of Flying", "Cap of Water Breathing", "Circlet of Blasting", "Cloak of Elvenkind", "Cloak of Protection", "Cloak of the Manta Ray", "Decanter of Endless Water", "Deck of Illusions", "Driftglobe", "Dust of Disappearance", "Dust of Dryness", "Dust of Sneezing and Choking", "Elemental Gem, Blue Sapphire", "Elemental Gem, Emerald", "Elemental Gem, Red Corundum", "Elemental Gem, Yellow Diamond", "Eversmoking Bottle", "Eyes of Charming", "Eyes of Minute Seeing", "Eyes of the Eagle", "Figurine of", "Gauntlets of Ogre Power", "Gem of Brightness", "Gloves of Missile Snaring", "Gloves of Swimming and Climbing", "Gloves of Thievery", "Goggles of Night", "Hat of Disguise", "Headband of Intellect", "Helm of Comprehending Languages", "Helm of Telepathy", "Inquisitive's Goggles", "Insignia of Claws", "Instrument of the Bards, Doss Lute", "Instrument of the Bards, Fochlucan Bandore", "Instrument of the Bards, Mac-Fuirmidh Cittern", "Keoghtom's Ointment", "Lantern of Revealing", "Mask of the Beast", "Medallion of Thoughts", "Necklace of Adaptation", "Night Caller", "Pearl of Power", "Periapt of Health", "Periapt of Wound Closure", "Pipes of Haunting", "Pipes of the Sewers", "Piwafwi (Cloak of Elvenkind)", "Quiver of Ehlonna", "Robe of Serpents", "Robe of Useful Items", "Rope of Climbing", "Saddle of the Cavalier", "Sending Stones", "Slippers of Spider Climbing", "Spell Gem (Lapis lazuli)", "Spell Gem (Obsidian)", "Stone of Good Luck", "Stone of Ill Luck", "Wheel of Wind and Water", "Wind Fan", "Winged Boots", "Wingwear"]);
					break;
			}
			return name;
		}
	},
	{
		rarity: "rare",
		name: function(type) {
			var name;
			switch (type) {
				case "armor":
					name = randomize(["Arrow-Catching Shield", "Elven Chain (Medium Armor)", "Glamoured Studded Leather (Light Armor)", "Scorpion Armor (Heavy Armor)", "Shield of Far Sight", "Shield of Missile Attraction", "Silver Dragon Shield +2", "Shield +2", "Armor +1 (Any Armor)"]);
					break;
				case "potion":
					name = randomize(["Elixir of Health", "Oil of Etherealness", "Potion of Clairvoyance", "Potion of Diminution", "Potion of Fire Giant Strength", "Potion of Frost Giant Strength", "Potion of Gaseous Form", "Potion of Heroism", "Potion of Invulnerability", "Potion of Mind Control (beast)", "Potion of Mind Control (humanoid)", "Potion of Mind Reading", "Potion of Stone Giant Strength", "Potion of Superior Healing"]);
					break;
				case "ring":
					name = randomize(["Ring of Acid Resistance", "Ring of Animal Influence", "Ring of Cold Resistance", "Ring of Evasion", "Ring of Feather Falling", "Ring of Fire Resistance", "Ring of Force Resistance", "Ring of Free Action", "Ring of Lightning Resistance", "Ring of Necrotic Resistance", "Ring of Poison Resistance", "Ring of Protection", "Ring of Psychic Resistance", "Ring of Quiptical Hits", "Ring of Radiant Resistance", "Ring of Spell Storing", "Ring of the Grammarian", "Ring of the Ram", "Ring of Thunder Resistance", "Ring of UnDwarf", "Ring of X-ray Vision"]);
					break;
				case "scroll":
					name = "Scroll of "
					var lvl = randomize([4,5]);
					if (lvl == 4) {
						name += randomize(["Arcane Eye", "Banishment", "Blight", "Charm Monster", "Confusion", "Conjure Minor Elementals", "Control Water", "Dimension Door", "Elemental Bane", "Evard's Black Tentacles", "Fabricate", "Fire Shield", "Greater Invisibility", "Hallucinatory Terrain", "Ice Storm", "Leomund's Secret Chest", "Locate Creature", "Mordenkainen's Faithful Hound", "Mordenkainen's Private Sanctum", "Otiluke's Resilient Sphere", "Phantasmal Killer", "Polymorph", "Sickening Radiance", "Stone Shape", "Stoneskin", "Storm Sphere", "Summon Greater Demon", "Vitriolic Sphere", "Wall of Fire", "Watery Sphere"]);
					} else {
						name += randomize(["Animate Objects", "Bigby's Hand", "Cloudkill", "Cone of Cold", "Conjure Elemental", "Contact Other Plane", "Control Winds", "Creation", "Danse Macabre", "Dawn", "Dominate Person", "Dream", "Enervation", "Far Step", "Geas", "Hold Monster", "Immolation", "Infernal Calling", "Legend Lore", "Mislead", "Modify Memory", "Negative Energy Flood", "Passwall", "Planar Binding", "Rary's Telepathic Bond", "Scrying", "Seeming", "Skill Empowerment", "Steel Wind Strike", "Synaptic Static", "Telekinesis", "Teleportation Circle", "Transmute Rock", "Wall of Force", "Wall of Light", "Wall of Stone"]);
					}
					name += " (lv. " + lvl + ")";
					break;
				case "weapon":
					name = randomize(["Dagger of Venom", "Dragontooth Dagger", "Gulthias Staff", "Mace of Disruption", "Mace of Smiting", "Mace of Terror", "Sun Blade", "+2 Weapon (Any Weapon)"]);
					break;

				default:
					name = randomize(["Amulet of Health", "Amulet of Protection from Turning", "Bag of Beans", "Banner of the Krig Rune", "Bead of Force", "Belt of Dwarvenkind", "Belt of Hill Giant Strength", "Blod Stone", "Boots of Levitation", "Boots of Speed", "Bowl of Commanding Water Elementals", "Bracers of Defense", "Brazier of Commanding Fire Elementals", "Cape of the Mountebank", "Censer of Controlling Air Elementals", "Chime of Opening", "Claw of the Wyrm Rune", "Claws of the Umber Hulk", "Cloak of Displacement", "Cloak of the Bat", "Cube of Force", "Daern's Instant Fortress", "Dimensional Shackles", "Docent", "Eagle Whistle", "Figurine of Wondrous Power, Bronze Griffon", "Figurine of Wondrous Power, Ebony Fly", "Figurine of Wondrous Power, Golden Lions", "Figurine of Wondrous Power, Ivory Goats", "Figurine of Wondrous Power, Marble Elephant", "Figurine of Wondrous Power, Onyx Dog", "Figurine of Wondrous Power, Serpentine Owl", "Folding Boat", "Gavel of the Venn Rune", "Gem of Seeing", "Gloves of the Mime", "Grenade of Many Things", "Hell Hound Cloak", "Helm of Teleportation", "Heward's Handy Haversack", "Horn of Blasting", "Horn of Valhalla, Brass", "Horn of Valhalla, Silver", "Horseshoes of Speed", "Instrument of the Bards, Canaith Mandolin", "Instrument of the Bards, Cli Lyre", "Ioun Stone, Awareness", "Ioun Stone, Protection", "Ioun Stone, Reserve", "Ioun Stone, Sustenance", "Iron Bands of Bilarro", "Load Stone", "Mantle of Spell Resistance", "Mirror of the Past", "Monkey Wrench", "Necklace of Fireballs", "Necklace of Prayer Beads", "Opal of the Ild Rune", "Orb of the Stein Rune", "Periapt of Proof Against Poison", "Piwafwi of Fire Resistance (Cloak of Elvenkind)", "Portable Hole", "Quaal's Feather Token, Anchor", "Quaal's Feather Token, Bird", "Quaal's Feather Token, Fan", "Quaal's Feather Token, Swan Boat", "Quaal's Feather Token, Tree", "Quaal's Feather Token, Whip", "Robe of Eyes", "Robe of Summer", "Rope of Entanglement", "Spell Gem (Bloodstone)", "Spell Gem (Quartz)", "Sprite's Pendant", "Stone of Controlling Earth Elementals", "Stonespeaker Crystal", "Umbrella of Feather Falling", "Weird Tank", "Wings of Flying"]);
					break;
			}
			return name;
		}
	},
	{
		rarity: "very rare",
		name: function(type) {
			var name;
			switch (type) {
				case "armor":
					name = randomize(["Animated Shield", "Black Dragon Scale Mail", "Blue Dragon Scale Mail", "Brass Dragon Scale Mail", "Bronze Dragon Scale Mail", "Copper Dragon Scale Mail", "Demon Armor", "Dwarven Plate", " Gold Dragon Scale Mail", "Green Dragon Scale Mail", "Red Dragon Scale Mail", "Silver Dragon Scale Mail", "Spellguard Shield", "White Dragon Scale Mail", "Shield +3", "Armor +2 (Any Armor)"]);
					break;
				case "potion":
					name = randomize(["Oil of Sharpness", "Potion of Cloud Giant Strength", "Potion of Flying", "Potion of Invisibility", "Potion of Longevity", "Potion of Mind Control (monster)", "Potion of Speed", "Potion of Supreme Healing", "Potion of Vitality"]);
					break;
				case "ring":
					name = randomize(["Ring of Regeneration", "Ring of Shooting Stars", "Ring of Telekinesis"]);
					break;
				case "scroll":
					name = "Scroll of "
					var lvl = randomize([6,7,8]);
					if (lvl == 6) {
						name += randomize(["Arcane Gate", "Chain Lightning", "Circle of Death", "Contingency", "Create Homunculus", "Create Undead", "Disintegrate", "Drawmij's Instant Summons", "Eyebite", "Flesh to Stone", "Globe of Invulnerability", "Guards and Wards", "Investiture of Flame", "Investiture of Ice", "Investiture of Stone", "Investiture of Wind", "Magic Jar", "Mass Suggestion", "Mental Prison", "Move Earth", "Otiluke's Freezing Sphere", "Otto's Irresistible Dance", "Programmed Illusion", "Scatter", "Soul Cage", "Sunbeam", "Tenser's Transformation", "True Seeing", "Wall of Ice"]);
					} else if (lvl == 7) {
						name += randomize(["Crown of Stars", "Delayed Blast Fireball", "Etherealness", "Finger of Death", "Forcecage", "Mirage Arcane", "Mordenkainen's Magnificent Mansion", "Mordenkainen's Sword", "Plane Shift", "Power Word Pain", "Prismatic Spray", "Project Image", "Reverse Gravity", "Sequester", "Simulacrum", "Symbol", "Teleport", "Whirlwind"]);
					} else {
						name += randomize(["Abi-Dalzim's Horrid Wilting", "Antimagic Field", "Antipathy/Sympathy", "Clone", "Control Weather", "Demiplane", "Dominate Monster", "Feeblemind", "Illusory Dragon", "Incendiary Cloud", "Maddening Darkness", "Maze", "Mighty Fortress", "Mind Blank", "Power Word Stun", "Sunburst", "Telepathy"]);
					}
					name += " (lv. " + lvl + ")";
					break;
				case "weapon":
					name = randomize(["Dwarven Thrower", "Javelin of Backbiting", "Oathbow", "Scimitar of Speed", "Spear of Backbiting", "Frost Brand weapon", "+3 Weapon (Any Weapon)", "Nine Lives Stealer (Any Sword)", "Dancing Sword (Any Sword)"]);
					break;

				default:
					name = randomize(["Amulet of Merkind", "Amulet of the Black Skull", "Amulet of the Planes", "Bag of Devouring", "Belt of Fire Giant Strength", "Belt of Frost Giant Strength", "Belt of Stone Giant Strength", "Bracelet of Rock Magic", "Candle of Invocation", "Carpet of Flying, 3 ft. × 5 ft.", "Carpet of Flying, 4 ft. × 6 ft.", "Carpet of Flying, 5 ft. × 7 ft.", "Carpet of Flying, 6 ft. × 9 ft.", "Cloak of Arachnida", "Conch of Teleportation", "Crystal Ball", "Crystal Ball", "Devastation Orb of Air", "Devastation Orb of Earth", "Devastation Orb of Fire", "Devastation Orb of Water", "Earthbreaker's Knuckle Dusters", "Efreeti Bottle", "Figurine of Wondrous Power, Obsidian Steed", "Helm of Brilliance", "Horn of Valhalla, Bronze", "Horseshoes of a Zephyr", "Ingot of the Skold Rune", "Instrument of the Bards, Anstruth Harp", "Ioun Stone, Absorption", "Ioun Stone, Agility", "Ioun Stone, Fortitude", "Ioun Stone, Insight", "Ioun Stone, Intellect", "Ioun Stone, Leadership", "Ioun Stone, Strength", "Manual of Bodily Health", "Manual of Clay Golems", "Manual of Flesh Golems", "Manual of Gainful Exercise", "Manual of Iron Golems", "Manual of Quickness of Action", "Manual of Stone Golems", "Mirror of Life Trapping", "Navigation Orb", "Nolzur's Marvelous Pigments", "Pennant of the Vind Rune", "Robe of Scintillating Colors", "Robe of Stars", "Shard of the Ise Rune", "Spell Gem (Amber)", "Spell Gem (Jade)", "Spell Gem (Topaz)", "Tome of Clear Thought", "Tome of Leadership and Influence", "Tome of Understanding"]);
					break;
			}
			return name;
		}
	},
	{
		rarity: "legendary",
		name: function(type) {
			var name;
			switch (type) {
				case "armor":
					name = randomize(["Armor of Invulnerability (Heavy Armor)", "Efreeti Chain (Heavy Armor)", "Plate Armor of Etherealness (Heavy Armor)"]);
					break;
				case "potion":
					name = randomize(["Potion of Giant Size", "Potion of Storm Giant Strength"]);
					break;
				case "ring":
					name = randomize(["Ring of Air Elemental Command", "Ring of Djinni Summoning", "Ring of Earth Elemental Command", "Ring of Fire Elemental Command", "Ring of Invisibility", "Ring of Spell Turning", "Ring of Three Wishes", "Ring of Water Elemental Command"]);
					break;
				case "scroll":
					name = "Scroll of " + randomize(["Astral Projection", "Foresight", "Gate", "Imprisonment", "Invulnerability", "Mass Polymorph", "Meteor Swarm", "Power Word Kill", "Prismatic Wall", "Psychic Scream", "Shapechange", "Time Stop", "True Polymorph", "Weird", "Wish"]) +  " (lv. 9)";
					return name;
					break;
				case "weapon":
					name = randomize(["Defender Double-Bladed Scimitar", "Defender Greatsword", "Defender Longsword", "Defender Rapier", "Defender Scimitar", "Defender Shortsword", "Holy Avenger Double-Bladed Scimitar", "Holy Avenger Greatsword", "Holy Avenger Longsword", "Holy Avenger Rapier", "Holy Avenger Scimitar", "Holy Avenger Shortsword", "Luck Blade Double-Bladed Scimitar", "Luck Blade Greatsword", "Luck Blade Longsword", "Luck Blade Rapier", "Luck Blade Scimitar", "Luck Blade Shortsword", "Vorpal Double-Bladed Scimitar", "Vorpal Greatsword", "Vorpal Longsword", "Vorpal Scimitar"]);
					break;

				default:
					name = randomize(["Apparatus of Kwalish", "Belt of Cloud Giant Strength", "Belt of Storm Giant Strength", "Black Dragon Mask", "Blue Dragon Mask", "Cloak of Invisibility", "Crystal Ball of Mind Reading", "Crystal Ball of Telepathy", "Crystal Ball of True Seeing", "Cubic Gate", "Deck of Many Things", "Ghost Lantern", "Green Dragon Mask", "Holy Symbol of Ravenkind", "Horn of Valhalla, Iron", "Icon of Ravenloft", "Infernal Tack", "Instrument of the Bards, Ollamh Harp", "Ioun Stone, Greater Absorption", "Ioun Stone, Mastery", "Ioun Stone, Regeneration", "Iron Flask", "Lost Crown of Besilmer", "The Lunch Lady - Glinda's Ladle", "Mask of the Dragon Queen", "Red Dragon Mask", "Robe of the Archmagi", "Scarab of Protection", "Sovereign Glue", "Spell Gem (Diamond)", "Spell Gem (Ruby)", "Spell Gem (Star ruby)", "Sphere of Annihilation", "The Splendiferous Bauble", "Sweater of Wholesemity", "Talisman of Pure Good", "Talisman of the Sphere", "Talisman of Ultimate Evil", "Tome of the Stilled Tongue", "Universal Solvent", "Well of Many Worlds", "White Dragon Mask"]);
					break;
			}
			return name;
		}
	}
]

function ShopItem(name, rarity, type, price, count) {
	var item;
	this.count = count || Math.ceil(Math.random() * 20);
	rarity = rarity || "";
	rarity = rarity.toLowerCase();
	if (rarity != "common" && rarity != "uncommon" && rarity != "rare" && rarity != "very rare" && rarity != "legendary") {
		rarity = randomize(["common", "uncommon", "rare"]);
	}
	this.rarity = rarity;
	this.type = type || randomize(["armor", "potion", "ring", "scroll", "weapon", "wondrous item"]);
	for (let i = 0; i < itemData.length; i++) {
		const el = itemData[i];
		if (el.rarity == this.rarity) {
			item = el;
			this.itemIndex = i;
			break;
		};
	}
	if (item == undefined) {
		item = itemData[0];
	}


	this.name = name || item.name(this.type);
	switch (rarity) {
		case undefined:
		case "common":
			this.price = 50 + Math.round(Math.random() * 50);
			break;
		case "uncommon":
			this.price = 100 + Math.ceil(Math.random() * 400);
			break;
		case "rare":
			this.price = 500 + Math.ceil(Math.random() * 4500);
			break;
		case "very rare":
			this.price = 5000 + Math.ceil(Math.random() * 45000);
			break;
		case "lengendary":
			this.price = 50000 + Math.ceil(Math.random() * 450000);
			break;
		default:
			this.price = 50 + Math.round(Math.random() * 50);
			break;
	}
}

function generateItems(rarity, type, count, number) {
	var itemNames = [];
	var items = [];

	for (let index = 0; index < number; index++) {
		var newItem;
		var repeat = 0;
		do {
			newItem = new ShopItem(undefined, rarity, type, undefined, undefined);
			repeat++;
		} while (itemNames.includes(newItem.name) && repeat < 10);
		itemNames.push(newItem.name);
		items.push(newItem);
		if (repeat == 10) break;
	}
	return items;

}