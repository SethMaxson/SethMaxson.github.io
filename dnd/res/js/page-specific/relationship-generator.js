"use strict";
var npcManager1;
var npcManager2;
var loadedRelationships;
var character1;
var character2;
$(document).ready(function () {
    loadedRelationships = new RelationshipManager();
    loadedRelationships.load();
    loadContestants();
    for (let item in RelationshipTypes) {
        if (isNaN(Number(item))) {
            $("#relationship-select").append($(`<option value="${item}">${item}</option>`));
        }
    }
    $("#character1-select").change(function () {
        let id = $(this).val();
        character1 = npcManager1.getByID(id);
        if (character1) {
            $("#character1-image").attr("src", `${getNPCImage(character1)}`);
        }
        else {
            $("#character1-image").css("backgroundImage", "none");
        }
        updateRelationshipCharacterSelector2();
    });
    $("#character2-select").change(function () {
        let id = $(this).val();
        character2 = npcManager1.getByID(id);
        if (character2) {
            $("#character2-image").attr("src", `${getNPCImage(character2)}`);
        }
        else {
            $("#character2-image").css("backgroundImage", "none");
        }
        updateRelationshipLabel();
    });
    $("#relationship-save").click(function () {
        loadedRelationships.save();
    });
    $("#relationship-generate").click(function () {
        if (character1 && character2) {
            $("#relationship-select").val(RelationshipLogic.generateRelationship(loadedRelationships, character1, character2));
        }
    });
    $("#relationship-select").change(function () {
        if (character1 && character2) {
            let relat = loadedRelationships.get(character1.id, character2.id, true);
            if (relat) {
                relat.relationshipType = $(this).val();
            }
        }
    });
});
function loadContestants() {
    getNPCs().done(function (items) {
        npcManager1 = new NPCManager(items);
        npcManager1.parse();
        npcManager1.sort();
        npcManager2 = new NPCManager(items);
        npcManager2.parse();
        npcManager2.sort();
        updateRelationshipCharacterSelector1();
    });
}
function updateRelationshipCharacterSelector1() {
    $("#character1-select").html("");
    for (let i = 0; i < npcManager1.filtered.length; i++) {
        const npc = npcManager1.filtered[i];
        $("#character1-select").append($(`<option value="${npc.id}">${npc.name}</option>`));
    }
    $("#character1-select").change();
}
function updateRelationshipCharacterSelector2() {
    $("#character2-select").html("");
    for (let i = 0; i < npcManager2.filtered.length; i++) {
        const npc = npcManager2.filtered[i];
        if (npc.id != character1?.id) {
            $("#character2-select").append($(`<option value="${npc.id}">${npc.name}</option>`));
        }
    }
    $("#character2-select").change();
}
function updateRelationshipLabel() {
    if (character1 && character2) {
        let relationship = loadedRelationships.get(character1?.id, character2?.id);
        if (relationship) {
            $("#relationship-select").val(relationship.relationshipType.toString());
        }
        else {
            $("#relationship-select").val(RelationshipTypes[RelationshipTypes.Stranger]);
        }
    }
    else {
        $("#relationship-select").val(RelationshipTypes[RelationshipTypes.Stranger]);
    }
}
//# sourceMappingURL=relationship-generator.js.map