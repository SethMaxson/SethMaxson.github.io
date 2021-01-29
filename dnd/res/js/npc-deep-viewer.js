"use strict";
var randomNPCs;
var loadedNPCs;
$(document).ready(function () {
    const npcGenerator = new NPCDeepGenerator();
    const clipBoardStaging = $(`<input type="text" style="opacity:0; display:none;" id="clipboard-staging" />`);
    $(".container").append(clipBoardStaging);
    function getRaces() {
        return $.ajax({ crossDomain: true, url: "/dnd/res/data/races.json", dataType: 'json' });
    }
    getRaces().done(function (returnedData) {
        for (let i = 0; i < returnedData.length; i++) {
            const e = returnedData[i];
            if (e.hasOwnProperty("ID")) {
                races.push(e.ID);
                $("#race-select").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
                $("#race-filter").append($("<option value=\"" + e.ID + "\">" + e.name + "</option>"));
            }
            else {
                races.push(e.name);
                $("#race-select").append($("<option value=\"" + e.name + "\">" + e.name + "</option>"));
                $("#race-filter").append($("<option value=\"" + e.name + "\">" + e.name + "</option>"));
            }
        }
        loadNPCs();
        randomNPCs = new NPCManager();
        generateNPCs(undefined, undefined, undefined, 20);
    });
    $("#generate-npcs").on("click", function () {
        var race = undefined, gender = undefined, age = undefined;
        if ($("#race-select").val() !== "null")
            race = $("#race-select").val();
        if ($("#gender-select").val() !== "null")
            gender = $("#gender-select").val();
        if ($("#age-select").val() !== "null")
            age = $("#age-select").val();
        generateNPCs(race, gender, age, $("#records-to-generate").val());
    });
    $("#clear-npcs").on("click", function () {
        randomNPCs.all = [];
        randomNPCs.filtered = [];
        renderRandomNPCs();
    });
    $("#save-npcs").on("click", function (e) {
        e.preventDefault();
        loadedNPCs.save();
    });
    $(".collapsible").on("click", function () {
        $(this).toggleClass("collapsed");
    });
    $(document).on("click", ".map-page-description", function (e) {
        e.preventDefault();
        let index = parseInt($(this).closest("tr").attr("index"));
        let npc = $(this).hasClass("rando") ? randomNPCs.filtered[index] : loadedNPCs.filtered[index];
        let cbs = `${npc.name} - ${npc.alignment} ${npc.relativeAge.capitalize()} ${npc.gender.capitalize()} ${npc.race.capitalize()}. Threat level: ${npc.threat}. ${npc.description}`;
        clipBoardStaging.val(cbs);
        clipBoardStaging.show();
        clipBoardStaging[0].select();
        document.execCommand("copy");
        clipBoardStaging.hide();
    });
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
        var ageMod = npcGenerator.getNPCOldness(npc);
        // var threatMod = threat.indexOf(npc.threat)/(threat.length);
        rando = rando || false;
        let moveButton = rando ? `<button onclick="moveToSaved(${index});">Add</button>` : `<button onclick="moveToRandom(${index});">Remove</button>`;
        let imgSrc = getNPCImage(npc);
        return $(`<tr index="${index}">
				<td class="npc-name">${npc.name}</td>
				<td class="npc-species">${npc.race}</td>
				<td class="npc-gender">${npc.gender}</td>
				<td style='background-color:rgb(${Math.round(255 * ageMod)},${Math.round(255 * (1 - ageMod))},50);'>${npc.relativeAge} (${npc.age} years)</td>
				<td>${npc.alignment}</td>
				<td>${npc.threat}</td>
				<td>${npc.description}</td>
				<!-- <td><img src="${imgSrc}" /></td> -->
				<td style="position:relative;"><div class="token" style="background-image: url('${imgSrc}');"></div></td>
				<td>
					${moveButton}
					<button class="map-page-description${rando ? " rando" : ""}">Copy map page desc</button>
				</td>
			</tr>
		`);
    }
    function generateNPCs(race, gender, age, number) {
        for (let index = 0; index < number; index++) {
            const newnpc = new NPC();
            npcGenerator.randomizeNPC(newnpc, race, gender, age);
            randomNPCs.add(newnpc);
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
});
//# sourceMappingURL=npc-deep-viewer.js.map