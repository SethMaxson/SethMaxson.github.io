declare var races: string[];
var randomNPCs: NPCManager;
var loadedNPCs: NPCManager;
const npcGenerator = new NPCDeepGenerator();

$(document).ready(function ()
{
	const clipBoardStaging = $(`<input type="text" style="opacity:0; display:none;" id="clipboard-staging" />`);
	$(".container").append(clipBoardStaging);

	function getRaces() {
		return $.ajax({ crossDomain: true, url: "/dnd/res/data/races.json", dataType: 'json' });
	}

	getRaces().done(function (returnedData)
	{
		returnedData.sort
		for (let i = 0; i < returnedData.length; i++) {
			const e = returnedData[i];
			let id = e.hasOwnProperty("ID") ? e.ID : e.name;
			races.push(id);
			//@ts-ignore
			$("#race-select").multiselect('loadOptions', [{
					name   : e.name,
					value  : id,
					checked: false
				}],
				false
			);
			// $("#race-select").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
			$("#race-filter").append($("<option value=\"" + id + "\">" + e.name + "</option>"));
		}
		loadNPCs();
		randomNPCs = new NPCManager();
		generateNPCs(undefined, undefined, undefined, undefined, 20);
	});

	//#region initialize jquery.multiselect.js
	//@ts-ignore
	$('#race-select').multiselect({
		columns: 1,
		placeholder: 'Surprise Me',
		search: true,
		selectAll: true
	});

	//@ts-ignore
	$('#age-select').multiselect({
		columns: 1,
		placeholder: 'Surprise Me',
		search: true,
		selectAll: true
	});

	//@ts-ignore
	$('#alignment-select').multiselect({
		columns: 3,
		placeholder: 'Surprise Me',
		selectAll: true,
		// selectGroup: true
	});

	//@ts-ignore
	$('#gender-select').multiselect({
		columns: 1,
		placeholder: 'Surprise Me'
	});
	//#endregion initialize jquery.multiselect.js

	$("#generate-npcs").on("click", function ()
	{
		var race = undefined,
			gender = undefined,
			age = undefined,
			availableAlignments = undefined;
		var restrictRacesByAlignment = $("#alignment-restrict-races").prop("checked");
		// get species setting
		if (($("#race-select").val() as string[]).length == 1)
		{
				race = ($("#race-select").val() as string[])[0];
		}
		else if (($("#race-select").val() as string[]).length > 1)
		{
				race = $("#race-select").val();
		}
		// get gender setting
		if (($("#gender-select").val() as string[]).length == 1) gender = ($("#gender-select").val() as string[])[0];
		// get age setting
		age = getFilterValue("#age-select");
		// get alignment setting
		if ($("#alignment-select").val() !== "null")
		{
			let alnVal = $("#alignment-select").val()?.toString() as string;
			availableAlignments = ((alnVal.indexOf(",") != -1) ? alnVal.split(",") : [alnVal]) as Alignment[];
			if (restrictRacesByAlignment)
			{
				race = getRaceByAlignment(availableAlignments);
			}
		}
		// create NPCs
		generateNPCs(
			race as string,
			gender as string,
			age as AgeCategory,
			availableAlignments,
			$("#records-to-generate").val() as number
		);
	});

	$("#loaded-sort-select").on("change", function ()
	{
		sortNPCs(false, $(this).val() as string);
	});

	$("#random-sort-select").on("change", function ()
	{
		sortNPCs(true, $(this).val() as string);
	});

	$("#clear-npcs").on("click", function ()
	{
		randomNPCs.all = [];
		randomNPCs.filtered = [];
		renderRandomNPCs();
	});

	$("#default-settings").on("click", function ()
	{
		let settingsContainer = $(this).closest(".generator-settings");
		settingsContainer.find("select").each(function ()
		{
			let sel = $(this) as JQuery<HTMLSelectElement>
			sel[0].selectedIndex = 0;
		});

		settingsContainer.find("select[multiple] option:selected").prop("selected", false);
		//@ts-ignore
		$('select[multiple]').multiselect( 'reset' );

		settingsContainer.find("input[type='checkbox']").prop( "checked", false );
		settingsContainer.find("input[type='number']").each(function ()
		{
			$(this).val($(this).attr("initial") as string);
		});
	});

	$("#save-npcs").on("click", function (e)
	{
		e.preventDefault();
		loadedNPCs.save();
	});

	$(".collapsible h3").on("click", function ()
	{
		$(this).closest(".collapsible").toggleClass("collapsed");
	});

	$(document).on("click", ".map-page-description", function (e)
	{
		e.preventDefault();
		let index = parseInt($(this).closest("tr").attr("index") as string);
		let npc = $(this).hasClass("rando") ? randomNPCs.filtered[index] : loadedNPCs.filtered[index];
		let cbs = `${npc.name} - ${npc.alignment} ${npc.relativeAge.capitalize()} ${npc.gender.capitalize()} ${npc.race.capitalize()}. Threat level: ${npc.threat}. Intelligence level: ${npc.intelligence}. ${npc.description}`;
		clipBoardStaging.val(cbs);
		clipBoardStaging.show();
		(clipBoardStaging[0] as HTMLInputElement).select();
		document.execCommand("copy");
		clipBoardStaging.hide();
	});
})

function deleteNPC(index: number, isRando: boolean)
{
	let npcCollection = isRando ? randomNPCs : loadedNPCs;
	removeNPCFromManager(npcCollection, index);
	isRando ? renderRandomNPCs() : renderLoadedNPCs();
}

function sortNPCs(isRando: boolean, property: string)
{
	let npcCollection = isRando ? randomNPCs : loadedNPCs;
	npcCollection.sort(property);
	isRando ? renderRandomNPCs() : renderLoadedNPCs();
}

function transferNPCBetweenManagers(moveToRando: boolean, index: number)
{
	let donor = moveToRando ? loadedNPCs : randomNPCs;
	let target = moveToRando ? randomNPCs : loadedNPCs;
	// locate target npc
	var npc = donor.filtered[index];
	// add to random npc collection
	target.add(npc);
	// remove from saved npc collection
	removeNPCFromManager(donor, index);
	// redraw
	renderLoadedNPCs();
	renderRandomNPCs();
}

function removeNPCFromManager(manager: NPCManager, index: number) {
	// remove from specified npc collection
	manager.all.splice(index, 1);
	manager.filtered.splice(index, 1);
}

function loadNPCs() {
	getNPCs().done(function (items) {
		loadedNPCs = new NPCManager(items);
		loadedNPCs.parse();
		renderLoadedNPCs();
	});
}

function renderLoadedNPCs() {
	$("#loaded-npcs tr:not(.header-row)").remove();
	for (let i = 0; i < loadedNPCs.filtered.length; i++) {
		const npc = loadedNPCs.filtered[i];
		$("#loaded-npcs").append(getNPCRow(npc, false, i));
	}
}

function renderRandomNPCs() {
	$("#random-npcs tr:not(.header-row)").remove();
	for (let i = 0; i < randomNPCs.filtered.length; i++) {
		const npc = randomNPCs.filtered[i];
		$("#random-npcs").append(getNPCRow(npc, true, i));
	}
}

function getNPCRow(npc: NPC, rando: boolean, index: number) {
	var ageMod = npcGenerator.getNPCOldness(npc);
	// var threatMod = threat.indexOf(npc.threat)/(threat.length);
	rando = rando || false;
	let moveButton = `<button class="btn btn-secondary" onclick="transferNPCBetweenManagers(${!rando}, ${index});">${rando? "Add" : "Remove"}</button>`;
	let imgSrc = getNPCImage(npc);
	let ageColor = `rgb(${Math.round(200 * ageMod)},${Math.round(200 * (1 - ageMod))},00)`;
	return $(
		`<tr index="${index}">
			<td class="npc-name">
				<div style="font-weight:bold;">${npc.name}</div>
				<div style="font-style: italic;">${npc.alignment} <span style='color:${ageColor};'>${npc.relativeAge} (${npc.age} years)</span> ${npc.gender} ${npc.race}</div>
				Threat Level: ${npc.threat}<br />
				Intelligence Level: ${npc.intelligence}
			</td>
			<td>${npc.description}</td>
			<td style="position:relative;"><div class="token" style="background-image: url('${imgSrc}');"></div></td>
			<td class="noprint">
				${moveButton}
				<button class="btn btn-secondary map-page-description${rando? " rando" : ""}">Copy map page desc</button>
				<button class="btn btn-danger" onclick="deleteNPC(${index}, ${rando})">Delete</button>
			</td>
		</tr>
	`);
}

function generateNPCs(race: string|string[]|undefined, gender: string|undefined, age: AgeCategory|AgeCategory[]|undefined, alignment: string[] = [], number: number): void {
	for (let index = 0; index < number; index++) {
		const newnpc = new NPC();
		var alignmentToUse = undefined;
		if (alignment.length) {
			alignmentToUse = randomize(alignment);
		}
		let raceToUse = race instanceof Array? getRandomRaceFromList(race) : race;
		npcGenerator.randomizeNPC(newnpc, raceToUse, gender, age, alignmentToUse);
		randomNPCs.add(newnpc);
	}
	renderRandomNPCs();
}

function getFilterValue(jquerySelector: string)
{
	let result = undefined;
	if ($(jquerySelector).attr("multiple")) {
		let baseVal = $(jquerySelector).val() as string[];
		if (baseVal.length > 1)
		{
			result = [];
			for (let index = 0; index < baseVal.length; index++) {
				if (baseVal[index] != "null") {
					result.push(baseVal[index]);
				}
			}
		} else if (baseVal.length == 1 && baseVal[0] !== "null")
		{
			result = baseVal[0];
		}
	}
	else if ($(jquerySelector).val() !== "null") {
		result = $(jquerySelector).val();
	}
	return result;
}