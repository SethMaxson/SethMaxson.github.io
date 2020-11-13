export { };
declare var races: string[];
var npcCitizens: NPCManager;
var npcNonCitizens: NPCManager;
var loadedRelationships: RelationshipManager;
var character1: NPC | undefined;
function getRaces() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/races.json", dataType: 'json' });
}

$(document).ready(function ()
{
	loadedRelationships = new RelationshipManager();
	loadedRelationships.load();
	loadContestants();

	for (let item in RelationshipTypes) {
		if (isNaN(Number(item))) {
			$("#relationship-select").append($(`<option value="${item}">${item}</option>`));
		}
	}

	$("#character1-select").change(function ()
	{
		let id = $(this).val() as string;
		character1 = npcCitizens.getByID(id);
		if (character1) {
			$("#character1-image").attr("src", `${getNPCImage(character1)}`);
		}
		else
		{
			$("#character1-image").css("backgroundImage", "none");
		}
		updateRelationshipCharacterSelector2()
	})
	$("#citizen-save").click(function () {
		loadedRelationships.save();
	})
	$("#citizen-generate").click(function () {
		if (character1 && character2) {
			$("#relationship-select").val(RelationshipLogic.generateRelationship(loadedRelationships, character1, character2));
		}
	})
	$("#citizen-select").change(function ()
	{
		if (character1 && character2) {
			let relat = loadedRelationships.get(character1.id, character2.id, true);
			if (relat) {
				relat.relationshipType = $(this).val() as keyof typeof RelationshipTypes;
			}
		}
	})
})

function loadContestants() {
	getNPCs().done(function (items) {
		npcCitizens = new NPCManager(items);
		npcCitizens.parse();
		npcCitizens.sort();
		npcNonCitizens = new NPCManager(items);
		npcNonCitizens.parse();
		npcNonCitizens.sort();
		updateRelationshipCharacterSelector1();
		updateNonCitizenDisplay();
	});
}

function updateRelationshipCharacterSelector1() {
	$("#character1-select").html("");
	for (let i = 0; i < npcCitizens.filtered.length; i++) {
		const npc = npcCitizens.filtered[i];
		$("#character1-select").append($(`<option value="${npc.id}">${npc.name}</option>`));
	}
	$("#character1-select").change();
}

function updateRelationshipCharacterSelector2() {
	$("#character2-select").html("");
	for (let i = 0; i < npcNonCitizens.filtered.length; i++) {
		const npc = npcNonCitizens.filtered[i];
		if (npc.id != character1?.id) {
			$("#character2-select").append($(`<option value="${npc.id}">${npc.name}</option>`));
		}
	}
	$("#character2-select").change();
}

function updateNonCitizenDisplay()
{
	$(".non-citizens").html("");
	for (let i = 0; i < npcNonCitizens.filtered.length; i++) {
		const e = npcNonCitizens.filtered[i];
		$(".non-citizens").append($(`<div class="citizen" id="${e.id}">${e.name}<div><img src="${getNPCImage(e)}" /></div></div>`));
	}
}

//#region NPC filters test
var species: string[] = [];
function getRacesForCitizens() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/races.json", dataType: 'json' });
}

$(document).ready(function ()
{
	getRacesForCitizens().done(function (returnedData)
	{
		for (let i = 0; i < returnedData.length; i++) {
			const e = returnedData[i];
			if (e.hasOwnProperty("ID")) {
				species.push(e.ID);
				$(".species-filter").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
			} else {
				species.push(e.name);
				$(".species-filter").append($("<option value=\"" + e.name + "\">" + e.name + "</option>"));
			}
		}
	});

	$(".apply-filters").click(function ()
	{
		npcNonCitizens.filter();
		updateNonCitizenDisplay();
	});

	$(".gender-filter").change(function ()
	{
		if ($(this).val() == "null")
		{
			npcNonCitizens.genders = [];
		}
		else
		{
			npcNonCitizens.genders = [$(this).val() as string];
		}
	});

	$(".species-filter").change(function ()
	{
		if ($(this).val() == "null")
		{
			npcNonCitizens.races = [];
		}
		else
		{
			npcNonCitizens.races = [$(this).val() as string];
		}
	});

	$(".alignment-filter").change(function ()
	{
		if ($(this).val() == "null")
		{
			npcNonCitizens.alignments = [];
		}
		else
		{
			npcNonCitizens.alignments = [$(this).val() as string];
		}
	});

	$(".relative-age-filter").change(function ()
	{
		if ($(this).val() == "null")
		{
			npcNonCitizens.relativeAges = [];
		}
		else
		{
			npcNonCitizens.relativeAges = [$(this).val() as string];
		}
	});
})


//#endregion