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
    return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/map-locations/${continent}.json`, dataType: 'json' });
}
function getMapImageData() {
    return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/city-map.json", dataType: 'json' });
}
function getCityObject(cityName, continentName, dataLocatedInCitiesJson = false) {
    return new Promise(function (resolve, reject) {
        var city = undefined;
        $.when(getMapImageData(), getCityData(), getMapLocationData(continentName)).done(function (cityMapImageDataRaw, continentSections, locationsRaw) {
            _cityMapImageData = cityMapImageDataRaw[0];
            if (dataLocatedInCitiesJson) {
                //#region getCityData
                let continents = continentSections[0].filter(function (entry) {
                    return entry.name === continentName;
                });
                if (continents.length == 1) {
                    city = ensureSingleCityResult(continents[0].cities, cityName, continentName);
                }
                //#endregion
            }
            else {
                //#region getMapLocationData
                let locationNode = ensureSingleCityResult(locationsRaw[0], cityName, continentName);
                if (locationNode) {
                    city = new City();
                    city.name = cityName;
                    let relevantMapImage = _cityMapImageData.filter(function (entry) {
                        return entry.name.toLowerCase() === cityName.toLowerCase();
                    });
                    city.url = relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + cityName : "#";
                }
                //#endregion
            }
            resolve(city);
        });
    });
}
function ensureSingleCityResult(citiesToFilter, cityName, continentName) {
    let foundCities = citiesToFilter.filter(function (entry) {
        return entry.name === cityName;
    });
    if (foundCities.length == 1) {
        return foundCities[0];
    }
    else if (foundCities.length == 0) {
        console.warn(`Unable to find city: ${cityName} in continent: ${continentName} within cities.json`);
    }
    else if (foundCities.length > 1) {
        console.warn(`Found multiple cities matching: ${cityName} in continent: ${continentName} within cities.json`);
    }
    return undefined;
}
//# sourceMappingURL=map-loader.js.map