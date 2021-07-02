type CityType = "city" | "metropolis" | "village";

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

var _cityMapImageData: ICityMapNode[];

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
	return $.ajax({ crossDomain: true, url: `/dnd/res/data/world-map-data/map-locations/${continent}.json`, dataType: 'json' });
}

function getMapImageData()
{
	return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/city-map.json", dataType: 'json' });
}

function getCityObject(cityName: string, continentName: string, dataLocatedInCitiesJson: boolean = false)
{
	return new Promise(
		function (resolve: (value: ICity|undefined) => void, reject)
		{
			var city: ICity|undefined = undefined;
			$.when(getMapImageData(), getCityData(), getMapLocationData(continentName)).done(function (cityMapImageDataRaw: ICityMapNode[][], continentSections: ICitiesJsonContinentSection[][], locationsRaw: IMapLocation[][])
			{
				_cityMapImageData = cityMapImageDataRaw[0];
				if (dataLocatedInCitiesJson)
				{
					//#region getCityData
					let continents = continentSections[0].filter(function (entry)
					{
						return entry.name === continentName;
					});
					if (continents.length == 1)
					{
						city = ensureSingleCityResult(continents[0].cities, cityName, continentName) as ICity;
					}
					//#endregion
				}
				else
				{
					//#region getMapLocationData
					let locationNode = ensureSingleCityResult(locationsRaw[0], cityName, continentName) as IMapLocation;
					if (locationNode)
					{
						city = new City();
						city.name = cityName;
						let relevantMapImage = _cityMapImageData.filter(function (entry)
						{
							return entry.name.toLowerCase() === cityName.toLowerCase();
						});
						city.url = relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + cityName : "#";
					}
					//#endregion
				}
				resolve(city);
			});
		}
	);
}

function ensureSingleCityResult(citiesToFilter: ICity[] | IMapLocation[], cityName: string, continentName: string): ICity | IMapLocation | undefined
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
		console.warn(`Unable to find city: ${cityName} in continent: ${continentName} within cities.json`);
	}
	else if (foundCities.length > 1)
	{
		console.warn(`Found multiple cities matching: ${cityName} in continent: ${continentName} within cities.json`);
	}
	return undefined;
}