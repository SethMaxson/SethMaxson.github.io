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
var _cityMapImageData;
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
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/map-locations/${continent.toLowerCase()}.json`, dataType: 'json' });
}
function getMapImageData() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/city-map.json", dataType: 'json' });
}
function getCityObject(cityName, continentName, dataLocatedInCitiesJson = false) {
    var city = undefined;
    return new Promise(function (resolve, reject) {
        //#region getCityData
        if (dataLocatedInCitiesJson) {
            $.when(getMapImageData(), getCityData()).done(function (cityMapImageDataRaw, continentSections) {
                _cityMapImageData = cityMapImageDataRaw[0];
                let continents = continentSections[0].filter(function (entry) {
                    return entry.name === continentName;
                });
                if (continents.length == 1) {
                    city = ensureSingleCityResult(continents[0].cities, cityName, continentName, "cities.json");
                    let relevantMapImage = _cityMapImageData.filter(function (entry) {
                        return entry.name.toLowerCase() === cityName.toLowerCase();
                    });
                    city.url = (city.url == "#" || !city.url) && relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + city.name : city.url;
                }
                resolve(city);
            });
        }
        //#endregion
        //#region getMapLocationData
        else {
            $.when(getMapImageData(), getMapLocationData(continentName)).done(function (cityMapImageDataRaw, locationsRaw) {
                _cityMapImageData = cityMapImageDataRaw[0];
                let locationNode = ensureSingleCityResult(locationsRaw[0], cityName, continentName, continentName.toLowerCase() + ".json");
                if (locationNode) {
                    city = new City();
                    city.name = cityName;
                    let relevantMapImage = _cityMapImageData.filter(function (entry) {
                        return entry.name.toLowerCase() === cityName.toLowerCase();
                    });
                    city.url = relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + cityName : "#";
                    city.description.push("City description was not found in JSON files. Check DM notes.");
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