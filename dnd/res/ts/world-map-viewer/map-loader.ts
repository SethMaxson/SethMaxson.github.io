interface IMapObjectPosition
{
	bottom?: string;
	left?: string;
	right?: string;
	top?: string;
}

interface ICityMarker
{
	type: string;
	position: IMapObjectPosition;
}

interface ICity
{
	name: string;
	type: string;
	fontSize?: number;
	description: string[];
	culture: string[];
	dmNotes: string[];
	url: string;
	useCityViewer: boolean;
	position: IMapObjectPosition;
	marker: ICityMarker;
}

interface ICitiesJsonContinentSection
{
	name: string;
	cartographer: string;
	cities: ICity[];
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

function getCityMarkup(city: ICity, cartographer: string, specialTreatmentForHyperLinks: boolean = false)
{
	let extraCssProperties = "";
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

	let marker = city.marker.type != "none" ? `<div class="marker-${city.marker.type}" style="${getPositionString(city.marker.position)}">&#160;</div>` : "";

	//#region get extra CSS properties for extraCssProperties
	extraCssProperties += ` ${getPositionString(city.position)}`;
	if (city.fontSize) {
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

function getPositionString(position: IMapObjectPosition): string
{
		let mapObjPosition = "";
		//#region get horizontal position property
		if (position.left) {
			mapObjPosition += `left:${position.left};`;
		}
		else if (position.right) {
			mapObjPosition += `right:${position.right};`;
		}
		else  {
			mapObjPosition += `left:0px;`;
		}
		//#endregion
		mapObjPosition += " "; // Add space between CSS properties
		//#region get vertical position property
		if (position.top) {
			mapObjPosition += `top:${position.top};`;
		}
		else if (position.bottom) {
			mapObjPosition += `bottom:${position.bottom};`;
		}
		else  {
			mapObjPosition += `top:0px;`;
		}
		//#endregion
		return mapObjPosition
}