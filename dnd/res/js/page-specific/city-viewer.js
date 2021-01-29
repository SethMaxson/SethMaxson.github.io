"use strict";
$(document).ready(function () {
    const targetCity = GetURLParameter("city");
    if (targetCity) {
        document.title = targetCity;
        // Load map image
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/world-map-data/city-map.json",
            dataType: 'json',
            success: function (returnedData) {
                let city = returnedData.filter(function (entry) {
                    return entry.name.toLowerCase() === targetCity.toLowerCase();
                })[0];
                if (city) {
                    $("#map-container").css("backgroundImage", `url('${city.image}')`);
                    getAppropriateImageDimensions(city.image);
                }
            }
        });
        // Load brochure
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/world-map-data/city-brochures.json",
            dataType: 'json',
            success: function (returnedData) {
                let city = returnedData.filter(function (entry) {
                    return entry.name.toLowerCase() === targetCity.toLowerCase();
                })[0];
                if (city) {
                    $("#brochure").html("<h3>Amarillo Airship Agency</h3>");
                    $("#brochure").append($(`<h1>${city.displayName ? city.displayName : targetCity}</h1>`));
                    for (let i = 0; i < city.description.length; i++) {
                        $("#brochure").append($(`<p>${city.description[i]}</p>`));
                    }
                    if (city.attractions.length > 0 || city.attractionsBlurb.length > 0) {
                        let attractionsString = `<h2>${city.attractionsLabel}</h2>`;
                        attractionsString += "<p>";
                        for (let i = 0; i < city.attractionsBlurb.length; i++) {
                            attractionsString += city.attractionsBlurb[i];
                            if (i != city.attractionsBlurb.length - 1) {
                                attractionsString += "</p><p>";
                            }
                        }
                        if (city.attractions.length > 0) {
                            attractionsString += "<ul>";
                            for (let i = 0; i < city.attractions.length; i++) {
                                attractionsString += `<li>${city.attractions[i]}</li>`;
                            }
                            attractionsString += "</ul>";
                        }
                        attractionsString += "</p>";
                        $("#brochure").append($(attractionsString));
                    }
                }
            }
        });
    }
});
function getAppropriateImageDimensions(imageSrc) {
    let img = new Image();
    img.src = imageSrc;
    img.onload = function () {
        let size = scaleImageSize(img.width, img.height);
        $("#map-container").css("width", size.width + "px");
        $("#map-container").css("height", size.height + "px");
    };
}
function scaleImageSize(width, height) {
    let x = Math.round(Math.max(width, height));
    let modifier = Math.max(Math.round((2000 / x) * 10) / 10, 0.1);
    return { width: Math.round(width * modifier), height: Math.round(height * modifier) };
}
//# sourceMappingURL=city-viewer.js.map