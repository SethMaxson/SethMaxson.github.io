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
class City {
    constructor() {
        this.name = "";
        this.type = "village";
        this.description = [];
        this.culture = [];
        this.dmNotes = [];
        this.url = "#";
    }
}
function getCityData() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/cities.json", dataType: 'json' });
}
function getMapLocationData(continent) {
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/locations.json`, dataType: 'json' });
}
function getMapImageData(continent) {
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/maps.json`, dataType: 'json' });
}
function getLocationDetailData(continent) {
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/details.json`, dataType: 'json' });
}
function getCityObject(cityName, continentName, dataLocatedInCitiesJson = false) {
    var city = undefined;
    return new Promise(function (resolve, reject) {
        //#region getCityData
        if (dataLocatedInCitiesJson) {
            $.when(getMapImageData(continentName), getCityData()).done(function (cityMapImageDataRaw, continentSections) {
                const cityMapImageData = cityMapImageDataRaw[0];
                let continents = continentSections[0].filter(function (entry) {
                    return entry.name === continentName;
                });
                if (continents.length == 1) {
                    city = ensureSingleCityResult(continents[0].cities, cityName, continentName, "cities.json");
                    let relevantMapImage = cityMapImageData.filter(function (entry) {
                        return entry.name.toLowerCase() === cityName.toLowerCase();
                    });
                    city.url = (city.url == "#" || !city.url) && relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?continent=" + continentName + "&city=" + city.name : city.url;
                }
                resolve(city);
            });
        }
        //#endregion
        //#region getMapLocationData
        else {
            $.when(getMapImageData(continentName), getMapLocationData(continentName), getLocationDetailData(continentName)).done(function (cityMapImageDataRaw, locationsRaw, locationDetailsRaw) {
                const cityMapImageData = cityMapImageDataRaw[0];
                const locationDetails = locationDetailsRaw[0];
                let locationNode = ensureSingleCityResult(locationsRaw[0], cityName, continentName, continentName.toLowerCase() + "/locations.json");
                if (locationNode) {
                    city = new City();
                    city.name = cityName;
                    let relevantMapImage = cityMapImageData.filter(entry => entry.name.toLowerCase() == cityName.toLowerCase());
                    let relevantDetails = locationDetails.filter(entry => entry.name.toLowerCase() == cityName.toLowerCase());
                    if (relevantDetails.length > 0) {
                        const details = relevantDetails[0];
                        city.description = details.description.slice();
                        city.culture = details.culture.slice();
                    }
                    city.url = relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?continent=" + continentName + "&city=" + cityName : "#";
                    if (city.description.length == 0) {
                        city.description.push("City description was not found in JSON files. Check DM notes.");
                    }
                }
                resolve(city);
            });
        }
        //#endregion
    });
}
function ensureSingleCityResult(citiesToFilter, cityName, continentName, fileName) {
    let foundCities = citiesToFilter.filter(function (entry) {
        return entry.name === cityName;
    });
    if (foundCities.length == 1) {
        return foundCities[0];
    }
    else if (foundCities.length == 0) {
        console.warn(`Unable to find city: ${cityName} in continent: ${continentName} within ${fileName}`);
    }
    else if (foundCities.length > 1) {
        console.warn(`Found multiple cities matching: ${cityName} in continent: ${continentName} within ${fileName}`);
    }
    return undefined;
}
//# sourceMappingURL=map-loader.js.map