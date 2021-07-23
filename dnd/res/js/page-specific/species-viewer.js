"use strict";
function displaySpecies(data) {
    if (data.images.background.length > 0) {
        $(".background").css({
            backgroundImage: "url('" + data.images.background + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        });
    }
    else {
        $(".background").css({
            backgroundImage: "url('/img/textures/Scroll.png')",
            backgroundRepeat: "repeat"
        });
    }
    $("#species-viewer-panel .name").text(data.name);
    $("#species-viewer-panel .properties").text(data.tagline);
    $("#species-viewer-panel .description *").remove();
    for (let i = 0; i < data.description.length; i++) {
        let descText = data.description[i].trim();
        if (descText.startsWith("---") && descText.endsWith("---")) {
            $(".description").append($(`<h3>${descText.split("---")[1]}</h3>`));
        }
        else {
            $(".description").append($(`<p>${descText}</p>`));
        }
    }
    if (data.images.standee.length > 0) {
        $("#species-viewer-panel .standee").show();
        $("#species-viewer-panel .standee").attr("src", data.images.standee);
        // $(".description").append($(`<img class="standee" alt="standee" src="${data.images.standee}" />`));
    }
    else {
        $("#species-viewer-panel .standee").hide();
    }
}
$(document).ready(() => {
    for (let i = 0; i < SpeciesFluff.length; i++) {
        const species = SpeciesFluff[i];
        let el = $(`<div class="filterable-item">${species.name}</div>`);
        if (species.tags) {
            el.attr("data-tags", species.tags.join(","));
        }
        $(".filter-thing").append(el);
    }
    $(document).on("click", ".filter-thing .filterable-item", function () {
        $(this).closest(".filter-thing").find(".filterable-item").removeClass("selected");
        $(this).addClass("selected");
        let targetName = $(this).text().trim();
        let targetSpecies = SpeciesFluff.filter(function (e) {
            return e.name == targetName;
        })[0];
        displaySpecies(targetSpecies);
    });
    displaySpecies(SpeciesFluff[0]);
});
//# sourceMappingURL=species-viewer.js.map