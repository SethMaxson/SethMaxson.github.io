type CityType = "city" | "metropolis" | "town" | "village";

interface IMapObjectPosition
{
	bottom?: string;
	left?: string;
	right?: string;
	top?: string;
}

enum CityMarkerTypes
{
	City = "city",
	None = "none",
	Town = "town"
}

enum VerticalAlignTypes
{
	Above = "top",
	Below = "bottom",
	Beside = "middle"
}

enum HorizontalAlignTypes
{
	Right = "right",
	Center = "center",
	Left = "left"
}

interface ICityMarker
{
	type: CityMarkerTypes;
	position: IMapObjectPosition;
}

interface ICity
{
	/** The name of the city */
	name: string;
	type: CityType;
	description: string[];
	culture: string[];
	dmNotes: string[];
	/** The address of the city's standalone map. */
	url: string;
}

interface ICitiesJsonObject extends ICity
{
	/** Indicates where the name should be displayed relative to the map icon. Vertical position followed by horizontal (e.g. "top left") */
	nameLocation: string;
	fontSize?: number;
	position: IMapObjectPosition;
	marker: ICityMarker|CityMarkerTypes;
}

interface ICitiesJsonContinentSection
{
	name: string;
	cartographer: string;
	cities: ICitiesJsonObject[];
}

const MapMarkerRadii: {
	[key in CityMarkerTypes]: number;
} = {
	city: 12.5,
	none: 0,
	town: 8
}

class City implements ICity
{
	name: string = "";
	type: CityType = "village";
	description: string[] = [];
	culture: string[] = [];
	dmNotes: string[] = [];
	url: string = "#";
}

function getCityData() {
	return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/cities.json", dataType: 'json' });
}

function getMapLocationData(continent: string) {
	return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/locations.json`, dataType: 'json' });
}

function getMapImageData(continent: string)
{
	return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/maps.json`, dataType: 'json' });
}

function getLocationDetailData(continent: string)
{
	return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/${continent.toLowerCase()}/details.json`, dataType: 'json' });
}

function getCityObject(cityName: string, continentName: string, dataLocatedInCitiesJson: boolean = false)
{
	var city: ICity|undefined = undefined;
	return new Promise(
		function (resolve: (value: ICity|undefined) => void, reject)
		{
			//#region getCityData
			if (dataLocatedInCitiesJson)
			{

				$.when(
					getMapImageData(continentName),
					getCityData()
				).done(function (cityMapImageDataRaw: ICityMapNode[][], continentSections: ICitiesJsonContinentSection[][])
				{
					const cityMapImageData = cityMapImageDataRaw[0];
					let continents = continentSections[0].filter(function (entry)
					{
						return entry.name === continentName;
					});
					if (continents.length == 1)
					{
						city = ensureSingleCityResult(continents[0].cities, cityName, continentName, "cities.json") as ICity;
						let relevantMapImage = cityMapImageData.filter(function (entry)
						{
							return entry.name.toLowerCase() === cityName.toLowerCase();
						});
						city.url = (city.url == "#" || !city.url) && relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?continent=" + continentName + "&city=" + city.name : city.url;
					}
					resolve(city);
				});
			}
			//#endregion
			//#region getMapLocationData
			else
			{
				$.when(
					getMapImageData(continentName),
					getMapLocationData(continentName),
					getLocationDetailData(continentName)
				).done(function (cityMapImageDataRaw: ICityMapNode[][], locationsRaw: IMapLocation[][], locationDetailsRaw: IMapLocationDetails[][])
				{
					const cityMapImageData = cityMapImageDataRaw[0];
					const locationDetails = locationDetailsRaw[0];
					let locationNode = ensureSingleCityResult(locationsRaw[0], cityName, continentName, continentName.toLowerCase() + "/locations.json") as IMapLocation;
					if (locationNode)
					{
						city = new City();
						city.name = cityName;
						let relevantMapImage = cityMapImageData.filter(entry => entry.name.toLowerCase() == cityName.toLowerCase());
						let relevantDetails = locationDetails.filter(entry => entry.name.toLowerCase() == cityName.toLowerCase());
						if (relevantDetails.length > 0)
						{
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
		}
	);
}

function ensureSingleCityResult(citiesToFilter: ICity[] | IMapLocation[], cityName: string, continentName: string, fileName: string): ICity | IMapLocation | undefined
{

	let foundCities = (citiesToFilter as { name: string}[]).filter(function (entry)
	{
		return entry.name === cityName;
	});
	if (foundCities.length == 1)
	{
		return foundCities[0] as ICity | IMapLocation;
	}
	else if (foundCities.length == 0)
	{
		console.warn(`Unable to find city: ${cityName} in continent: ${continentName} within ${fileName}`);
	}
	else if (foundCities.length > 1)
	{
		console.warn(`Found multiple cities matching: ${cityName} in continent: ${continentName} within ${fileName}`);
	}
	return undefined;
}