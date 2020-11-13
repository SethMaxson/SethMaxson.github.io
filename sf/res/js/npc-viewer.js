var randomNPCs;
var loadedNPCs;
const container = $("#random-npcs");
races = [];
$(document).ready(function () {
	getRaces().done(function (returnedData) {
		var items = returnedData.items;
		for (let i = 0; i < items.length; i++) {
			const e = items[i];
			if (e.hasOwnProperty("ID")) {
				races.push(e.ID);
				$("#race-select").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
				$("#race-filter").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
			} else {
				races.push(e.name);
				$("#race-select").append($("<option value=\"" + e.name + "\">" + e.name + "</option>"));
				$("#race-filter").append($("<option value=\"" + e.name + "\">" + e.name + "</option>"));
			}
		}
		loadNPCs();
		randomNPCs = new NPCManager();
		generateNPCs(undefined, undefined, 0, 20);
	});
	$("#generate-npcs").click(function () {
		var race = undefined,
			gender = undefined;
		if ($("#race-select").val() !== "null") race = $("#race-select").val();
		if ($("#gender-select").val() !== "null") gender = $("#gender-select").val();
		generateNPCs(
			race,
			gender,
			$("#age-select").val(),
			$("#records-to-generate").val()
		);
	})
	$("#clear-npcs").click(function () {
		randomNPCs.all = [];
		randomNPCs.filtered = [];
		// $("#random-npcs tr:not(.header-row)").remove();
		renderRandomNPCs();
	})
	$("#save-npcs").click(function () {
		loadedNPCs.save();
	})
	$(".collapsible").click(function () {
		$(this).toggleClass("collapsed");
	})

})

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

function getNPCRow(npc, rando, index) {
	var ageMod = getNPCOldness(npc);
	// var threatMod = threat.indexOf(npc.threat)/(threat.length);
	rando = rando || false;
	let moveButton = rando ? `<td><button onclick="moveToSaved(${index});">Add</button></td>` : `<td><button onclick="moveToRandom(${index});">Remove</button></td>`;
	return $(
		`<tr>
						<td>${npc.name}</td>
						<td>${npc.race}</td>
						<td>${npc.gender}</td>
						<td style='background-color:rgb(${Math.round(255 * ageMod)},${Math.round(255 * (1 - ageMod))},50);'>${npc.age} years</td>
						<td>${npc.alignment}</td>
						<td>${npc.threat}</td>
						<td>${npc.description}</td>
						${moveButton}
					</tr>
				`);
}

function generateNPCs(race, gender, age, number) {
	for (let index = 0; index < number; index++) {
		const newnpc = new NPC();
		randomizeNPC(newnpc, undefined, race, gender, age);
		randomNPCs.all.push(newnpc);
		randomNPCs.filtered.push(newnpc);
	}
	renderRandomNPCs();
}

function moveToSaved(index) {
	// locate target npc
	var npc = randomNPCs.filtered[index];
	// add to saved npc collection
	loadedNPCs.add(npc);
	// remove from random npc collection
	randomNPCs.all.splice(index, 1);
	randomNPCs.filtered.splice(index, 1);
	// redraw
	renderLoadedNPCs();
	renderRandomNPCs();
}

function moveToRandom(index) {
	// locate target npc
	var npc = loadedNPCs.filtered[index];
	// add to random npc collection
	randomNPCs.all.push(npc);
	randomNPCs.filtered.push(npc);
	// remove from saved npc collection
	loadedNPCs.all.splice(index, 1);
	loadedNPCs.filtered.splice(index, 1);
	// redraw
	renderLoadedNPCs();
	renderRandomNPCs();
}