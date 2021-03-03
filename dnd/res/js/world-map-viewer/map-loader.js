"use strict";
var CityMarkerTypes;
(function (CityMarkerTypes) {
    CityMarkerTypes["City"] = "city";
    CityMarkerTypes["None"] = "none";
    CityMarkerTypes["Town"] = "town";
})(CityMarkerTypes || (CityMarkerTypes = {}));
var VerticalAlignTypes;
(function (VerticalAlignTypes) {
    VerticalAlignTypes["Above"] = "top";
    VerticalAlignTypes["Below"] = "bottom";
    VerticalAlignTypes["Beside"] = "middle";
})(VerticalAlignTypes || (VerticalAlignTypes = {}));
var HorizontalAlignTypes;
(function (HorizontalAlignTypes) {
    HorizontalAlignTypes["Right"] = "right";
    HorizontalAlignTypes["Center"] = "center";
    HorizontalAlignTypes["Left"] = "left";
})(HorizontalAlignTypes || (HorizontalAlignTypes = {}));
const MapMarkerRadii = {
    city: 12.5,
    none: 0,
    town: 8
};
var _totalLoadedCities = 0;
function getCityData() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/cities.json", dataType: 'json' });
}
function getMapLocationData(continent) {
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/map-locations/${continent}.json`, dataType: 'json' });
}
function getCitiesByContinent(destinationElement, continentName, specialTreatmentForHyperLinks = false) {
    return new Promise(function (resolve, reject) {
        /** Counts the cities for this continent so that we can log them later. */
        var cityCount = 0;
        /** Tracks how many data fetches have completed so that this promise knows when to resolve. */
        var completedFetches = 0;
        /** The number of fetches performed. When completedFetches matches this, the promise can resolve. */
        const totalExpectedFetches = 2;
        var cityData = getCityData();
        $.when(cityData).done(function (continentSections) {
            continentSections = continentSections.filter(function (entry) {
                return entry.name === continentName;
            });
            if (continentSections.length > 0) {
                let cities = continentSections[0].cities;
                for (let i = 0; i < cities.length; i++) {
                    destinationElement.append(getCityMarkup(cities[i], continentSections[0].cartographer, specialTreatmentForHyperLinks));
                    cityCount++;
                    _totalLoadedCities++;
                }
            }
            completedFetches++;
            if (completedFetches == totalExpectedFetches) {
                console.log(`Cities on ${continentName}: ${cityCount}`);
                resolve();
            }
        });
        $.when(getMapLocationData(continentName)).done(function (locations) {
            for (let i = 0; i < locations.length; i++) {
                destinationElement.append($(`<a href="#" class="point-of-interest smith village" style="left: calc(${locations[i].left} - 8px); top: calc(${locations[i].top} - 8px);">
								<div class="map-marker-icon marker-town" style="background-color:#f3b;">&nbsp;</div>
								<span class="map-marker-name" style="position: absolute; top:50%; left:100%; transform: translate(10px, -50%);">${locations[i].name}</span>
							</a>`));
                cityCount++;
                _totalLoadedCities++;
            }
            completedFetches++;
            if (completedFetches == totalExpectedFetches) {
                console.log(`Cities on ${continentName}: ${cityCount}`);
                resolve();
            }
        });
    });
}
/**
 * Get a city marker as an HTML Element
 * @param city The city for which a map marker is needed
 * @param cartographer The name of the cartographer who mapped the city. This will determine the font used
 * @param specialTreatmentForHyperLinks If true, the returned marker will be yellow if the city is associated to a city map
 */
function getCityMarkup(city, cartographer, specialTreatmentForHyperLinks = false) {
    let description = "";
    for (let i = 0; i < city.description.length; i++) {
        description += "<p>" + city.description[i] + "</p>";
    }
    let culture = city.culture.length > 0 ? "<h1>Culture.</h1>" : "";
    for (let i = 0; i < city.culture.length; i++) {
        culture += "<p>" + city.culture[i] + "</p>";
    }
    let dmNotes = "";
    for (let i = 0; i < city.dmNotes.length; i++) {
        dmNotes += "<p class=\"dmnotes\" style=\"display:none;\">" + city.dmNotes[i] + "</p>";
    }
    let cm = city.marker;
    let marker = cm != CityMarkerTypes.None ? `<div class="map-marker-icon marker-${cm}">&#160;</div>` : "";
    //#region get extra CSS properties and store them to the extraCssProperties variable
    let offset = MapMarkerRadii[cm] || 0;
    let extraCssProperties = getPositionString(city.position, offset);
    if (city.fontSize) {
        extraCssProperties += ` font-size:${city.fontSize}px;`;
    }
    if (specialTreatmentForHyperLinks && (city.url != "#" || city.useCityViewer)) {
        extraCssProperties += " color:#ffff00;";
    }
    //#endregion
    let url = (city.url == "#" || !city.url) && city.useCityViewer ? "/dnd/pages/maps/city-viewer.html?city=" + city.name : city.url;
    return $(`<a href="${url}" class="point-of-interest ${cartographer} ${city.type}" style="${extraCssProperties}">
		${marker}
		<span class="map-marker-name" style="${getNamePositionString(city.nameLocation, Math.round(offset * 1.3))}">${city.name}</span>
		<span class="city-preview">
			<h1>${city.name}</h1>
			${description}
			${culture}
			${dmNotes}
		</span>
	</a>`);
}
function getPositionString(position, offset = 0) {
    let mapObjPosition = "";
    //#region get horizontal position property
    if (position.left) {
        mapObjPosition += `left:${getPositionSubstring(position.left, offset)};`;
    }
    else if (position.right) {
        mapObjPosition += `right:${getPositionSubstring(position.right, offset)};`;
    }
    else {
        mapObjPosition += `left:0px;`;
    }
    //#endregion
    mapObjPosition += " "; // Add space between CSS properties
    //#region get vertical position property
    if (position.top) {
        mapObjPosition += `top:${getPositionSubstring(position.top, offset)};`;
    }
    else if (position.bottom) {
        mapObjPosition += `bottom:${getPositionSubstring(position.bottom, offset)};`;
    }
    else {
        mapObjPosition += `top:0px;`;
    }
    //#endregion
    return mapObjPosition;
}
/**
 * Returns the coordinate portion of the property's position string. Allows unneeded 'calc' to be omitted, thus reducing the work required for the browser to reflow the document.
 * @param position The position string for the chosen property (i.e. top, left, right, or bottom)
 * @param offset The offset to account for the radius of the map icon
 */
function getPositionSubstring(position, offset = 0) {
    let newPosition = position;
    if (position.includes('px') && offset != 0) {
        let posValue = parseFloat(position.split('px')[0]);
        newPosition = (posValue - offset) + 'px';
    }
    else {
        newPosition = offset > 0 ? `calc(${position} - ${offset}px);` : `${position};`;
    }
    return newPosition;
}
function getNamePositionString(nameLocation, iconRadius = 0) {
    let locationString = "";
    if (nameLocation && nameLocation.length > 0) {
        let positions = nameLocation.split(" ");
        let vert;
        let horz;
        for (let i = 0; i < positions.length; i++) {
            const element = positions[i].toLowerCase();
            if (Object.values(HorizontalAlignTypes).includes(element)) {
                horz = element;
            }
            if (Object.values(VerticalAlignTypes).includes(element)) {
                vert = element;
            }
        }
        if (vert || horz) {
            locationString = "position: absolute;";
            let translateVert = "0";
            let translateHorz = "0";
            // vertical stuff
            if (vert == VerticalAlignTypes.Above) {
                locationString += ` bottom:100%;`;
                horz = horz || HorizontalAlignTypes.Center;
                translateVert = "-" + iconRadius + "px";
            }
            else if (vert == VerticalAlignTypes.Below) {
                locationString += ` top:100%;`;
                horz = horz || HorizontalAlignTypes.Center;
                translateVert = iconRadius + "px";
            }
            else {
                locationString += ` top:50%;`;
                translateVert = "-50%";
            }
            // horizontal stuff
            if (horz == HorizontalAlignTypes.Left) {
                locationString += ` right:100%;`;
                translateHorz = "-" + iconRadius + "px";
            }
            else if (horz == HorizontalAlignTypes.Center) {
                locationString += ` left:0%;`;
                translateHorz = "-50%";
            }
            else {
                locationString += ` left:100%;`;
                translateHorz = iconRadius + "px";
            }
            locationString += ` transform: translate(${translateHorz}, ${translateVert});`;
        }
    }
    return locationString;
}
//# sourceMappingURL=map-loader.js.map