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
	/** Indicates where the name should be displayed relative to the map icon. Vertical position followed by horizontal (e.g. "top left") */
	nameLocation: string;
	/** Strictly for debugging the newer, better location placement format. Need to remove once this is finalized. */
	useNewLocation?: "true";
	type: string;
	fontSize?: number;
	description: string[];
	culture: string[];
	dmNotes: string[];
	/** The address of the city's standalone map. */
	url: string;
	/** Should this city be opened in the generic city map viewer when clicked? */
	useCityViewer: boolean;
	position: IMapObjectPosition;
	marker: ICityMarker|CityMarkerTypes;
}

interface ICitiesJsonContinentSection
{
	name: string;
	cartographer: string;
	cities: ICity[];
}

const MapMarkerRadii: {
	[key in CityMarkerTypes]: number;
} = {
	city: 12.5,
	none: 0,
	town: 8
}

function getCityData() {
	return $.ajax({ crossDomain: true, url: "/dnd/res/data/world-map-data/cities.json", dataType: 'json' });
}

function getCitiesByContinent(destinationElement:JQuery<HTMLElement>, continentName: string, specialTreatmentForHyperLinks: boolean = false)
{
	return new Promise(
		function (resolve, reject) {
			var cityData = getCityData();
			$.when(cityData).done(function(continentSections: ICitiesJsonContinentSection[]){
				continentSections = continentSections.filter(function (entry)
				{
					return entry.name === continentName;
				});
				let cities: ICity[] = [];
				if (continentSections.length > 0) {
					cities = continentSections[0].cities;
				}
				for (let i = 0; i < cities.length; i++) {
					destinationElement.append(getCityMarkup(cities[i], continentSections[0].cartographer, specialTreatmentForHyperLinks));
				}
				resolve();
			})
		}
	);
}

/**
 * Get a city marker as an HTML Element
 * @param city The city for which a map marker is needed
 * @param cartographer The name of the cartographer who mapped the city. This will determine the font used
 * @param specialTreatmentForHyperLinks If true, the returned marker will be yellow if the city is associated to a city map
 */
function getCityMarkup(city: ICity, cartographer: string, specialTreatmentForHyperLinks: boolean = false)
{
	//#region new experimental version for the new location placement format
	if (city.useNewLocation == "true")
	{
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

		let cm = city.marker as CityMarkerTypes;
		let marker = cm != CityMarkerTypes.None ? `<div class="map-marker-icon marker-${cm}" style="position:absolute; top:0; background-color:#00ff00;">&#160;</div>` : "";

		//#region get extra CSS properties and store them to the extraCssProperties variable
		let offset = MapMarkerRadii[cm] || 0;
		let extraCssProperties = getPositionString(city.position, offset);
		if (city.fontSize) {
			extraCssProperties += ` font-size:${city.fontSize}px;`;
		}
		if (specialTreatmentForHyperLinks && (city.url != "#" || city.useCityViewer))
		{
			extraCssProperties += " color:#ffff00;";
		}
		//#endregion

		let url = (city.url == "#" || !city.url) && city.useCityViewer ? "/dnd/pages/maps/city-viewer.html?city=" + city.name : city.url;

		return $(`<a href="${url}" class="point-of-interest ${cartographer} ${city.type}" style="position:absolute; ${extraCssProperties}">
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
	//#endregion
	//#region original version. Works well enough, but will be deprecated once the new location placement format is finalized.
	else
	{
		let description = "";
		for (let i = 0; i < city.description.length; i++)
		{
			description += "<p>" + city.description[i] + "</p>";
		}

		let culture = city.culture.length > 0 ? "<h1>Culture.</h1>" : "";
		for (let i = 0; i < city.culture.length; i++)
		{
			culture += "<p>" + city.culture[i] + "</p>";
		}

		let dmNotes = "";
		for (let i = 0; i < city.dmNotes.length; i++)
		{
			dmNotes += "<p class=\"dmnotes\" style=\"display:none;\">" + city.dmNotes[i] + "</p>";
		}

		let cm = city.marker as ICityMarker;
		let marker = cm.type != CityMarkerTypes.None ? `<div class="map-marker-icon marker-${cm.type}" style="${getPositionString(cm.position)}">&#160;</div>` : "";

		//#region get extra CSS properties and store them to the extraCssProperties variable
		let extraCssProperties = "";
		extraCssProperties += ` ${getPositionString(city.position)}`;
		if (city.fontSize)
		{
			extraCssProperties += ` font-size:${city.fontSize}px;`;
		}
		if (specialTreatmentForHyperLinks && (city.url != "#" || city.useCityViewer))
		{
			extraCssProperties += " color:#ffff00;";
		}
		//#endregion

		let url = (city.url == "#" || !city.url) && city.useCityViewer ? "/dnd/pages/maps/city-viewer.html?city=" + city.name : city.url;

		return $(`<a href="${url}" class="${cartographer} ${city.type}" style="position:absolute; ${extraCssProperties}">
			${city.name}
			<span class="city-preview">
				<h1>${city.name}</h1>
				${description}
				${culture}
				${dmNotes}
			</span>
			${marker}
		</a>`);
	}
	//#endregion
}

function getPositionString(position: IMapObjectPosition, offset: number = 0): string
{
	let mapObjPosition = "";
	//#region get horizontal position property
	if (position.left) {
		mapObjPosition += `left:${getPositionSubstring(position.left, offset)};`;
	}
	else if (position.right) {
		mapObjPosition += `right:${getPositionSubstring(position.right, offset)};`;
	}
	else  {
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
	else  {
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
function getPositionSubstring(position: string, offset: number = 0): string
{
	let newPosition = position;
	if (position.includes('px') && offset != 0) {
		let posValue = parseFloat(position.split('px')[0]);
		newPosition = (posValue - offset) + 'px';
	}
	else
	{
		newPosition = offset > 0 ? `calc(${position} - ${offset}px);` : `${position};`;
	}
	return newPosition;
}

function getNamePositionString(nameLocation?: string, iconRadius: number = 0): string
{
	let locationString = "";
	if (nameLocation && nameLocation.length > 0)
	{
		let positions = nameLocation.split(" ");
		let vert: VerticalAlignTypes | undefined;
		let horz: HorizontalAlignTypes | undefined;
		for (let i = 0; i < positions.length; i++) {
			const element = positions[i].toLowerCase();
			if (Object.values(HorizontalAlignTypes).includes(element as HorizontalAlignTypes)) {
				horz = element as HorizontalAlignTypes;
			}
			if (Object.values(VerticalAlignTypes).includes(element as VerticalAlignTypes)) {
				vert = element as VerticalAlignTypes;
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
			else  {
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
			else  {
				locationString += ` left:100%;`;
				translateHorz = iconRadius + "px";
			}

			locationString += ` transform: translate(${translateHorz}, ${translateVert});`;
		}
	}
	return locationString;
}