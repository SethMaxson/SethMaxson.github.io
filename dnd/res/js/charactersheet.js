"use strict";
// Character Sheet Data Manager
class CharacterSheetDataManager {
    constructor() {
        this.spell = undefined;
    }
}
const csdm = new CharacterSheetDataManager();
function prepareCharacterSheet() {
    var dfd = jQuery.Deferred();
    createSkillTable();
    createWeaponTable();
    getPage2();
    getPage3();
    getPage4();
    getSpells().done(function (returnedData) {
        csdm.spell = new SpellManager(returnedData);
        csdm.spell.parse();
        dfd.resolve("hurray");
    });
    return dfd.promise();
}
function getPage2() {
    $("#Page2").append($(`
		<table class="fullwidth">
			<tr>
				<td><h2>Starfinder</h2></td>
				<td><input type="text" class="charname input_ubig" disabled><br />Character Name</td>
				<td class="right-aligned"><h2>Page 2</h2></td>
			</tr>
		</table>
		<table class="fullwidth">
			<tr>
				<td colspan="2">
					<h3>Abilities</h3><br>
					<textarea rows="42" cols="80" id="AbilityTextArea"></textarea>
				</td>
				<td rowspan="2" class="onethirdwidth">
					<div id="Spells"></div>
				</td>
			</tr>
			<tr>
				<td class="onethirdwidth top-aligned">
					<h3>Feats</h3><br>
					<textarea rows="22" cols="40" id="FeatTextArea"></textarea>
				</td>
				<td class="top-aligned">
					<h3>Languages</h3><br>
					<textarea rows="5" cols="80" id="LanguagesTextArea"></textarea><br>
					<div id="Proficiencies">
						<h3>Proficiencies</h3>
						<table>
							<tr>
								<td><input type="checkbox" id="Light-Armor"></td>
								<td>Light Armor</td>
								<td><input type="checkbox" id="Heavy-Armor"></td>
								<td>Heavy Armor</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="Power-Armor"></td>
								<td>Power Armor</td>
								<td><input type="checkbox" id="Grenades"></td>
								<td>Grenades</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="Basic-Melee-Weapons"></td>
								<td>Basic Melee</td>
								<td><input type="checkbox" id="Advanced-Melee-Weapons"></td>
								<td>Advanced Melee</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="Small-Arms"></td>
								<td>Small Arms</td>
								<td><input type="checkbox" id="Longarms"></td>
								<td>Longarms</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="Heavy-Weapons"></td>
								<td>Heavy Weapons</td>
								<td><input type="checkbox" id="Sniper-Weapons"></td>
								<td>Sniper Weapons</td>
							</tr>
							<tr>
								<td class="top-aligned"><input type="checkbox" id="ProfSpecial1"></td>
								<td><input type="text" id="Special1Type" class="input_u"><br /><sup>Special</sup></td>
								<td class="top-aligned"><input type="checkbox" id="ProfSpecial2"></td>
								<td><input type="text" id="Special2Type" class="input_u"><br /><sup>Special</sup></td>
							</tr>
						</table>
					</div>
					<h3>Experience</h3>
					<table>
						<tr>
							<td><input type="text" id="XPCurrent" class="input_u"><br>
							XP Earned</td>
							<td><input type="text" id="XPNext" class="input_u"><br>
							Next Level</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	`));
    createSpellTable();
}
function getPage3() {
    $("#Page3").append($(`
		<table class="fullwidth">
			<tr>
				<td><h2>Starfinder</h2></td>
				<td><input type="text" class="charname input_ubig" disabled><br />Character Name</td>
				<td class="right-aligned"><h2>Page 3</h2></td>
			</tr>
		</table>
		<table class="fullwidth">
			<tr>
				<td class="right-aligned"><h3>Credits</h3></td>
				<td><input type="text" id="Credits" class="input_b"></td>
				<td class="right-aligned"><h3>Other Wealth</h3></td>
				<td>
					<input type="text" id="OtherWealth1" class="input_u"><br>
					<input type="text" id="OtherWealth2" class="input_u"><br>
					<input type="text" id="OtherWealth3" class="input_u">
				</td>
			</tr>
		</table>
		<div id="Equipment"></div>
		<table class="fullwidth">
			<tr>
				<td class="halfwidth top-aligned">
					<h3>Other Notes</h3><br>
					<textarea rows="6" cols="50" id="OtherNotes"></textarea>
				</td>

				<td class="halfwidth top-aligned">
					<h3>Carrying Capacity</h3>
					<table>
						<tr>
							<th>Unencumbered</th>
							<td><input type="text" id="CapacityU" class="input_b"></td>
							<th>Current</th>
							<td><input type="text" id="CapacityC" class="input_b"></td>
						</tr>
						<tr>
							<th>Encumbered</th>
							<td><input type="text" id="CapacityE" class="input_b"></td>
							<td></td>
							<th><button class="nonprinting" onclick="CalculateBulk()" title="Click to calculate current carried bulk.">Calculate</button></th>
						</tr>
						<tr>
							<th>Overburdened</th>
							<td><input type="text" id="CapacityO" class="input_b"></td>
							<th><span class="nonprinting">Backpack</span></th>
							<td>
								<select id="BackPack" class="nonprinting">
									<option value="0">None</option>
									<option value="1">Consumer</option>
									<option value="2">Industrial</option>
								</select>
							</td>
						</tr>
						<tr>
							<td></td>
							<th><button class="nonprinting" onclick="CalculateCarry()" title="Click to calculate carrying capacity.">Calculate</button></th>
							<th><span class="nonprinting">6th Level Mercenary</span></th>
							<td><input class="nonprinting" type="checkbox" id="Mercenary6"></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	`));
    createEquipmentTable();
}
function getPage4() {
    $("#Page4").append($(`
		<table class="fullwidth">
			<tr>
				<td><h2>Starfinder</h2></td>
				<td><input type="text" class="charname input_ubig" disabled><br />Character Name</td>
				<td class="right-aligned"><h2>Page 4</h2></td>
			</tr>
		</table>
		<table class="fullwidth">
		<tr>
			<td><h3>Reputation</h3></td>
			<th>Fame</th>
			<td><input type="text" id="Fame" class="input_uc"></td>
			<th>Infamy</th>
			<td><input type="text" id="Infamy" class="input_uc"></td>
		</tr>
		</table>
		<div id="Factions">
			<h3>Factions</h3><br>
			<table>
				<tr>
					<th>Faction</th>
					<td><input type="text" id="Faction1" class="input_uc" value="Acquisitives"></td>
					<td><input type="text" id="Faction2" class="input_uc" value="Dataphiles"></td>
					<td><input type="text" id="Faction3" class="input_uc" value="Exo-guardians"></td>
					<td><input type="text" id="Faction4" class="input_uc" value="Second Seekers ( )"></td>
					<td><input type="text" id="Faction5" class="input_uc" value="Wayfinders"></td>
					<td><input type="text" id="Faction6" class="input_uc" value="Other"></td>
					<td><input type="text" id="Faction7" class="input_uc" value="Other"></td>
				</tr>
				<tr>
					<th>Reputation</th>
					<td><input type="text" id="Faction1Rep" class="input_b"></td>
					<td><input type="text" id="Faction2Rep" class="input_b"></td>
					<td><input type="text" id="Faction3Rep" class="input_b"></td>
					<td><input type="text" id="Faction4Rep" class="input_b"></td>
					<td><input type="text" id="Faction5Rep" class="input_b"></td>
					<td><input type="text" id="Faction6Rep" class="input_b"></td>
					<td><input type="text" id="Faction7Rep" class="input_b"></td>
				</tr>
			</table>
		</div>
		<div id="InventoryLog"></div>
		<div id="Ammunition"></div>
		<!-- <h3>Community Use Policy</h3><br>This character sheet uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This character sheet is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit <a href="http://paizo.com/paizo/about/communityuse">paizo.com/communityuse</a>. For more information about Paizo Inc. and Paizo products, please visit <a href="http://paizo.com/">paizo.com</a>. -->
	`));
    createInventoryLogTable();
    createAmmoTable();
}
function populateCharacterSheet(char) {
    populatePage1(char);
    populatePage2(char);
}
function populatePage1(char) {
    populateName(char.name);
    $("#Gender").val(char.gender);
    $("#Homeworld").val(char.homeWorld);
    $("#Deity").val(char.deity);
    $("#Player").val(char.player);
    $("#HPTotal").val(char.hp);
    $("#SPTotal").val(char.sp);
    $("#RPTotal").val(char.rp);
    $("#Race").val(char.race.name);
    $("#Theme").val(char.theme.name);
    $("#Size").val(char.race.size);
    $("#FortBase").val(char.fortSaveBonus);
    $("#RefBase").val(char.refSaveBonus);
    $("#WillBase").val(char.willSaveBonus);
    $(".bab").val(char.bab);
    updateClassSkills();
    updateSkillRanks();
    populateAbilities();
    CalcAllSkills();
    CalcSavingThrows();
    SumUp('InitTotal', ['InitDexMod', 'InitMiscMod']);
    updateAC();
    getClassDisplayString(char);
}
function populatePage2(char) {
    var feats = "";
    const stuff = char.benefits();
    for (let index = 0; index < stuff.length; index++) {
        const feat = stuff[index];
        feats += feat.name + "\n" + feat.description + "\n\n";
    }
    $("#LanguagesTextArea").val(char.languages.join(", "));
    $("#AbilityTextArea").val(feats);
    getFeats().done(function (returnedData) {
        var items = returnedData.items;
        const f = char.feats();
        feats = "";
        for (let i = 0; i < f.length; i++) {
            var feat = items.filter(function (entry) {
                return entry.name === f[i];
            })[0];
            feats += feat.name + "\n" + feat.description + "\n\n";
        }
        $("#FeatTextArea").val(feats);
    });
    updateProficiencies(char);
    populateSpells(char);
}
function getClassDisplayString(char) {
    const classes = char.classNames;
    var classString = "";
    for (let i = 0; i < classes.length; i++) {
        const cls = classes[i];
        classString += cls + " level " + char.classLevel(cls);
        if (i < classes.length - 1)
            classString += ", ";
    }
    $("#ClassLevels").val(classString);
}
function populateSpells(char) {
    var spls = char.spellsKnown;
    var slots = char.spellSlots;
    var sortedSpells = [
        [], [], [], [], [], [], []
    ];
    char.spells.forEach(spellName => {
        if (csdm.spell != undefined) {
            let spell = csdm.spell.get(spellName);
            if (spell) {
                sortedSpells[spell.level].push(spellName);
            }
        }
    });
    for (let i = 0; i < 7; i++) {
        // populate number of spells known
        $("#Spells").find(`#SpellsKnown${i}`).val(spls[i]);
        if (i > 0) {
            $("#Spells").find(`#SpellSlots${i}`).val(slots[i - 1]);
        }
        // populate specific spells known
        let targets = $(`#Spells-${i}`).find(".spell-name");
        for (let index = 0; index < sortedSpells[i].length; index++) {
            $(targets[index]).text(sortedSpells[i][index]).on("click", function () { displaySpell(sortedSpells[i][index]); });
        }
    }
}
function createSkillTable() {
    $("#Skills").append($(`<h3>Skills</h3>
			<table>
				<tr>
					<td></td>
					<th></th>
					<th>Total</th>
					<th></th>
					<th>Ranks</th>
					<th></th>
					<th>Class<br />Bonus</th>
					<th></th>
					<th>Ability<br />Mod</th>
					<th></th>
					<th>Misc<br />Mod</th>
				</tr>
			</table>
			<p>&dagger;Trained only <input type="checkbox" id="alwaystrue" checked disabled>Class skill *Armor check penalty applies<br/>
				**<b>A</b>rmor <b>C</b>heck <b>P</b>enalty</p>
			<h3>Skill Notes</h3><br>
			<textarea rows="6" cols="48" id="SkillNotes"></textarea>
		`));
    const sklz = $("#Skills>table");
    sklz.append(createSkillRow("Acrobatics", "Dex", false, true));
    sklz.append(createSkillRow("Athletics", "Str", false, true));
    sklz.append(createSkillRow("Bluff", "Cha", false, false));
    sklz.append(createSkillRow("Computers", "Int", true, false));
    sklz.append(createSkillRow("Culture", "Int", true, false));
    sklz.append(createSkillRow("Diplomacy", "Cha", false, false));
    sklz.append(createSkillRow("Disguise", "Cha", false, false));
    sklz.append(createSkillRow("Engineering", "Int", true, false));
    sklz.append(createSkillRow("Intimidate", "Cha", false, false));
    sklz.append(createSkillRow("Life Science", "Int", true, false));
    sklz.append(createSkillRow("Medicine", "Int", true, false));
    sklz.append(createSkillRow("Mysticism", "Wis", true, false));
    sklz.append(createSkillRow("Perception", "Wis", false, false));
    sklz.append(createSkillRow("Physical Science", "Int", true, false));
    sklz.append(createSkillRow("Piloting", "Dex", false, false));
    sklz.append(createProfessionSkillRow("Profession", "Dex", true));
    sklz.append(createProfessionSkillRow("Profession2", "Dex", true));
    sklz.append(createSkillRow("Sense Motive", "Wis", false, false));
    sklz.append(createSkillRow("Sleight of Hand", "Dex", true, true));
    sklz.append(createSkillRow("Stealth", "Dex", false, true));
    sklz.append(createSkillRow("Survival", "Wis", false, false));
    sklz.append($(`
			<tr>
				<td></td>
				<td colspan=3 class="right-aligned">Skill Points Spent/Total</td>
				<td><input type="text" id="TotalSkillSpent" class="input_b"></td>
				<td>/</td>
				<td><input type="text" id="TotalSkillPoints" class="input_b"></td>
				<td colspan=3 class="right-aligned">ACP**</td>
				<td><input type="text" id="ACP" class="input_b" title="Will be automatically applied to relevant skills when you hit the = button."></td>
			</tr>
		`));
}
function createSkillRow(skill, ability, trainedOnly, armorPenalty) {
    const abUC = ability.charAt(0).toUpperCase() + ability.slice(1);
    const toHTML = trainedOnly == true ? "&dagger;" : "";
    const toClass = trainedOnly == true ? " trained-only" : "";
    const apHTML = armorPenalty == true ? "<sup>*</sup>" : "";
    const id = skill.replace(/\s/g, '-');
    return $(`
		<tr id="${id}" class="skill${toClass}">
			<td class="right-aligned">${toHTML}<input type="checkbox" class="class-skill" disabled></td>
			<td>${skill}${apHTML} (${abUC})</td>
			<td><input type="text" class="input_b total" disabled></td>
			<td style="text-align:center;">=</td>
			<td><input type="text" class="input_b ranks" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b classB" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b Use${abUC}Mod ability" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b misc" disabled></td>
		</tr>
	`);
}
function createProfessionSkillRow(skill, ability, trainedOnly) {
    const abUC = ability.charAt(0).toUpperCase() + ability.slice(1);
    const toHTML = trainedOnly == true ? "&dagger;" : "";
    return $(`
		<tr id="${skill}" class="skill trained-only">
			<td class="right-aligned">${toHTML}<input type="checkbox" class="class-skill"></td>
			<td>Profession (<input type="text" class="input_u3" id="${skill}ABScore">)<br /><input type="text" class="input_u"></td>
			<td><input type="text" class="input_b total" disabled></td>
			<td style="text-align:center;">=</td>
			<td><input type="text" class="input_b ranks" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b classB" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b ability" disabled></td>
			<td>+</td>
			<td><input type="text" class="input_b misc" disabled></td>
		</tr>
	`);
}
function createWeaponTable() {
    $("#Weapons").append($("<h3>Weapons</h3>"));
    // for (let i = 0; i < 4; i++) {
    // 	$("#Weapons").append(
    // 		$(`<table class="bordered weapon">
    // 			<tr>
    // 				<td colspan="3"><input type="text" class="input_u name"><br /><sup>Weapon</sup></td>
    // 				<td><input type="text" class="input_u level"><br /><sup>Level</sup></td>
    // 				<td><input type="text" class="input_u bonus"><br /><sup>Attack Bonus</sup></td>
    // 				<td><input type="text" class="input_u damage"><br /><sup>Damage</sup></td>
    // 			</tr>
    // 			<tr>
    // 				<td><input type="text" class="input_u critical"><br /><sup>Critical</sup></td>
    // 				<td><input type="text" class="input_u range"><br /><sup>Range</sup></td>
    // 				<td><input type="text" class="input_u type"><br /><sup>Type</sup></td>
    // 				<td colspan="2"><input type="text" class="input_u ammo"><br /><sup>Ammo/Usage</sup></td>
    // 				<td><input type="text" class="input_u special"><br /><sup>Special</sup></td>
    // 			</tr>
    // 		</table>`)
    // 	);
    // }
    for (let i = 0; i < 4; i++) {
        $("#Weapons").append($(`<table class="weapon">
				<tr>
					<td colspan="3"><sup>Weapon</sup><br /><input type="text" class="name"></td>
					<td><sup>Level</sup><br /><input type="text" class="level"></td>
					<td><sup>Attack Bonus</sup><br /><input type="text" class="bonus"></td>
					<td><sup>Damage</sup><br /><input type="text" class="damage"></td>
				</tr>
				<tr>
					<td><sup>Critical</sup><br /><input type="text" class="critical"></td>
					<td><sup>Range</sup><br /><input type="text" class="range"></td>
					<td><sup>Type</sup><br /><input type="text" class="type"></td>
					<td colspan="2"><sup>Usage</sup><br /><input type="text" class="ammo"></td>
					<td><sup>Special</sup><br /><input type="text" class="special"></td>
				</tr>
			</table>`));
    }
}
function createEquipmentTable() {
    let eqTab = $(`
		<table class="fullwidth bordered">
			<tr>
				<td class="halfwidth"><h3>Equipment</h3></td>
				<th>Current Ammo/Charge</th>
				<th>Ammo/Charge Capacity</th>
				<th>Level</th>
				<th>Value</th>
				<th>Bulk</th>
			</tr>
		</table>
	`);
    $("#Equipment").append(eqTab);
    for (let i = 1; i < 41; i++) {
        eqTab.append($(`
				<tr>
					<td><input type="text" id="ItemName${i}" class="input_u"><br></td>
					<td><input type="text" id="ItemCharge${i}" class="input_u"><br></td>
					<td><input type="text" id="ItemCapacity${i}" class="input_u"><br></td>
					<td><input type="text" id="ItemLevel${i}" class="input_u"><br></td>
					<td><input type="text" id="ItemValue${i}" class="input_u"><br></td>
					<td><input type="text" id="ItemBulk${i}" class="input_u"><br></td>
				</tr>
			`));
    }
}
function createSpellTable() {
    $("#Spells").append($(`<h3>Spells</h3>`));
    for (let i = 0; i <= 6; i++) {
        let slots = i != 0 ? `<td>Slots</td><td><input type="text" id="SpellSlots${i}" class="input_b"></td>` : "";
        $("#Spells").append($(`
			<div id="Spells-${i}">
				<table>
					<tr>
						<th>${i}</th>
						<td>Spells Known</td>
						<td><input type="text" id="SpellsKnown${i}" class="input_b"></td>
						${slots}
					</tr>
				</table>
				<div class="input_u spell-name">&#160;</div>
				<div class="input_u spell-name">&#160;</div>
				<div class="input_u spell-name">&#160;</div>
				<div class="input_u spell-name">&#160;</div>
				<div class="input_u spell-name">&#160;</div>
				<div class="input_u spell-name">&#160;</div>
			</div>
			`));
    }
}
function createAmmoTable() {
    $("#Ammunition").append($(`
		<h3>Ammunition and Charges</h3>
		<table class="fullwidth bordered">
			<tr>
				<th class="twentyfive">Item</th>
				<th>Cost</th>
				<th>Bought</th>
				<th>Sold</th>
				<th>Capacity</th>
				<td class="halfwidth"></td>
			</tr>
		</table>
	`));
    for (let line = 1; line <= 5; line++) {
        var tr = $(`<tr class="ammo-line">
			<td><input type="text" id="AmmoName${line}" class="input_u"></td>
			<td><input type="text" id="AmmoCost${line}" class="input_u"></td>
			<td><input type="text" id="AmmoBought${line}" class="input_b"></td>
			<td><input type="text" id="AmmoSold${line}" class="input_b"></td>
			<td><input type="text" class="input_b capacity" value="20" onchange="modCapacity()"></td>
			<th class="thinbordered">
			</th>
		</tr>`);
        for (let i = 0; i < 20; i++) {
            const el = createAmmoCheckboxes(line, i);
            tr.find(".thinbordered").append(el);
        }
        $("#Ammunition>table").append(tr);
    }
    modCapacity();
}
function createAmmoCheckboxes(line, index) {
    const cls = "AmmoUsed" + line + "_";
    index = index * 5;
    return $(`
	<span class="nobreak">
		<span class="${index + 1}"><input type="checkbox"></span>
		<span class="${index + 2}"><input type="checkbox"></span>
		<span class="${index + 3}"><input type="checkbox"></span>
		<span class="${index + 4}"><input type="checkbox"></span>
		<span class="${index + 5}"><input type="checkbox">
		&nbsp;</span>
	</span>
	`);
}
function modCapacity() {
    $(".ammo-line").each(function () {
        var capacity = parseInt($(this).find(".capacity").val()) || 20;
        if (isNaN(capacity))
            capacity = 20;
        for (var i = 1; i <= 100; i++) {
            let box = $(this).find("." + i)[0];
            if (i <= capacity)
                box.classList.remove("invisible");
            else
                box.classList.add("invisible");
        }
    });
}
function createInventoryLogTable() {
    $("#InventoryLog").append($(`
		<h3>Inventory Log</h3>
		<table class="fullwidth bordered">
			<tr>
			</tr>
		</table>
	`));
    var td = $(`
		<td class="halfwidth">
			<table>
				<tr>
					<th class="halfwidth">Item</th>
					<th>Cost</th>
					<th>Bought</th>
					<th>Sold</th>
					<th>Expended</th>
				</tr>
			</table>
		</td>
	`);
    for (let i = 0; i < 20; i++) {
        const el = createInventoryLogRow();
        td.find("table").append(el);
    }
    $("#InventoryLog>table tr").first().append(td);
    $("#InventoryLog>table tr").first().append(td.clone());
}
function createInventoryLogRow() {
    return $(`
		<tr class="inventory-log-row">
			<td><input type="text" class="input_u name"></td>
			<td><input type="text" class="input_u cost"></td>
			<td><input type="text" class="input_b bought"></td>
			<td><input type="text" class="input_b sold"></td>
			<td><input type="text" class="input_b used"></td>
		</tr>
	`);
}
function updateAC() {
    $("#EACTotal").val(sum(['EACArmor', 'EACDexMod', 'EACMiscMod']) + 10);
    $("#KACTotal").val(sum(['KACArmor', 'KACDexMod', 'KACMiscMod']) + 10);
    const MAC = parseInt($("#KACTotal").val()) + 8 || 8;
    $("#MACTotal").val(MAC);
}
function sum(srcfields) {
    var total = 0;
    for (var i = 0; i < srcfields.length; i++) {
        let field = document.getElementById(srcfields[i]);
        if (field) {
            var ival = parseInt(field.value);
            if (!isNaN(ival)) {
                total += ival;
            }
        }
    }
    return total;
}
function populateName(charname = "") {
    ccm.character.name = charname;
    $(".charname").val(charname);
}
function updateClassSkills() {
    $("#Skills tr input[type='checkbox']").prop("checked", false);
    const skills = ccm.character.classes.skills;
    for (let index = 0; index < skills.length; index++) {
        const item = skills[index].replace(/\s/g, '-');
        $("#" + item).find("input[type='checkbox']").prop("checked", true);
    }
}
function updateSkillRanks() {
    $("#Skills .ranks").val(0);
    const sr = ccm.character.skills();
    for (let i = 0; i < sr.names.length; i++) {
        const item = sr.names[i].replace(/\s/g, '-');
        $("#" + item).find("input.ranks").val(sr.ranks[i]);
        $("#" + item).find("input.classB").val(sr.classBonus[i]);
        $("#" + item).find("input.misc").val(sr.misc[i]);
    }
}
function updateProficiencies(char) {
    $("#Proficiencies input[type='checkbox']").prop("checked", false);
    var p = char.proficiencies;
    for (let index = 0; index < p.length; index++) {
        const item = p[index].replace(/\s/g, '-');
        $("#" + item).prop("checked", true);
    }
}
function populateAbilities() {
    const abs = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
    const ab = ccm.character.getAbilities();
    const abm = ab.getModifiers();
    for (let i = 0; i < abs.length; i++) {
        var stat = abs[i];
        const el = {
            score: $("#" + stat + "Score"),
            upscore: $("#" + stat + "UpScore"),
            mod: $("#" + stat + "Mod"),
            upmod: $("#" + stat + "UpMod")
        };
        const abilityClass = ".Use" + stat + "Mod";
        stat = stat.toLowerCase();
        const score = ab[stat];
        const mod = abm[stat];
        const upscore = ab[stat];
        const upmod = abm[stat];
        el.score.val(score);
        el.mod.val(mod);
        el.upscore.val(upscore);
        el.upmod.val(upmod);
        $(abilityClass).val(upmod);
    }
}
function ClearInputs() {
    // clear all text from text inputs
    $("input:text").val("");
    // clear all text from textarea
    $("input:text").val("");
    // uncheck all checkboxes
    $('input:checkbox').removeAttr('checked');
    document.getElementById("alwaystrue").checked = true;
    document.getElementById("AmmoCapacity1").value = "20";
    document.getElementById("AmmoCapacity2").value = "20";
    document.getElementById("AmmoCapacity3").value = "20";
    document.getElementById("AmmoCapacity4").value = "20";
    document.getElementById("AmmoCapacity5").value = "20";
    document.getElementById("Faction1").value = "Acquisitives";
    document.getElementById("Faction2").value = "Dataphiles";
    document.getElementById("Faction3").value = "Exo-guardians";
    document.getElementById("Faction4").value = "Second Seekers";
    document.getElementById("Faction5").value = "Wayfinders";
    document.getElementById("Faction6").value = "Other";
    document.getElementById("Faction7").value = "Other";
    document.getElementById("BackPack").value = "0";
}
function CalcSavingThrows() {
    SumUp('FortTotal', ['FortBase', 'FortAbility', 'FortMisc']);
    SumUp('RefTotal', ['RefBase', 'RefAbility', 'RefMisc']);
    SumUp('WillTotal', ['WillBase', 'WillAbility', 'WillMisc']);
    SumUp('MeleeTotal', ['MeleeBAB', 'MeleeAbility', 'MeleeMisc']);
    SumUp('RangedTotal', ['RangedBAB', 'RangedAbility', 'RangedMisc']);
}
function CalcAllSkills() {
    var spentRanks = 0;
    $("#Skills tr.skill").each(function () {
        SumUpSkill(this, false, true);
        var sr = parseInt($(this).find(".ranks").val()) || 0;
        spentRanks += sr;
    });
    $("#TotalSkillSpent").val(spentRanks);
}
function SumUpSkill(skill, trainedonly, applyACP) {
    const inputs = $(skill).find("input");
    var SkillRanks = parseInt(inputs[2].value) || 0;
    var SkillClassB = parseInt(inputs[3].value) || 0;
    var SkillAbility = parseInt(inputs[4].value) || 0;
    var SkillMisc = parseInt(inputs[5].value) || 0;
    var ACP = parseInt($("#ACP").val()) || 0;
    trainedonly = $(skill).hasClass("trained-only");
    if (applyACP) {
        var sum = SkillRanks + SkillClassB + SkillAbility + SkillMisc + ACP;
        $(skill).find(".total").val(sum);
    }
    else
        var sum = SkillRanks + SkillClassB + SkillAbility + SkillMisc;
    $(skill).find(".total").val(sum);
    if (trainedonly && SkillRanks == 0) {
        $(skill).find(".total").val("-");
        $(skill).find(".ability").val("-");
    }
}
function CalculateCarry() {
    var sStrMod = document.getElementById('StrUpScore').value;
    if (sStrMod == "") {
        sStrMod = document.getElementById('StrScore').value;
    }
    var eStrMod = parseInt(sStrMod);
    if (!isNaN(eStrMod)) {
        eStrMod += parseInt($("#BackPack").val());
        if (document.getElementById('Mercenary6').checked) {
            eStrMod += 1;
        }
        var uBulk = Math.trunc(eStrMod / 2);
        document.getElementById('CapacityU').value = "" + uBulk;
        document.getElementById('CapacityE').value = (uBulk + 1) + "-" + eStrMod;
        document.getElementById('CapacityO').value = (eStrMod + 1).toString();
    }
}
function CalculateBulk() {
    var totalbulk = 0;
    for (var i = 1; i <= 40; i++) {
        let box = document.getElementById("ItemBulk" + i);
        if (box.value == "L")
            totalbulk += 1;
        else if (!isNaN(parseInt(box.value)))
            totalbulk += parseInt(box.value) * 10;
    }
    document.getElementById("CapacityC").value = Math.trunc(totalbulk / 10).toString();
}
function SumUp(dstfield, srcfields) {
    var total = 0;
    for (var i = 0; i < srcfields.length; i++) {
        let field = document.getElementById(srcfields[i]);
        if (field) {
            var ival = parseInt(field.value);
            if (!isNaN(ival)) {
                total += ival;
            }
        }
    }
    document.getElementById(dstfield).value = total.toString();
}
function displaySpell(spellName) {
    if (csdm != undefined) {
        if (csdm.spell != undefined) {
            let spell = csdm.spell.get(spellName);
            if (spell) {
                let content = $("<div></div>").append(getSpellPreview(spell)).html();
                const newpage = new PreviewModal(spellName, content);
                $("body").append(newpage.element);
                $(".container").addClass("no-scroll");
            }
        }
    }
}
//# sourceMappingURL=charactersheet.js.map