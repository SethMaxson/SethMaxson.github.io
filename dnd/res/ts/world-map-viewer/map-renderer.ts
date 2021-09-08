var _totalLoadedCities = 0;

function getCitiesByContinent(destinationElement: JQuery<HTMLElement>, continentName: string, specialTreatmentForHyperLinks: boolean = false)
{
	if (specialTreatmentForHyperLinks) {
		attachPlacementHelper(destinationElement);
	}
	return new Promise(
		function (resolve, reject)
		{
			/** Counts the cities for this continent so that we can log them later. */
			var cityCount = 0;
			$.when(getMapImageData(continentName), getCityData(), getMapLocationData(continentName)).done(function (cityMapImageDataRaw: ICityMapNode[][], continentSections: ICitiesJsonContinentSection[][], locationsRaw: IMapLocation[][])
			{
				const cityMapImageData = cityMapImageDataRaw[0];
				//#region getCityData
				let continents = continentSections[0].filter(function (entry)
				{
					return entry.name === continentName;
				});
				if (continents.length == 1) {
					let cities = continents[0].cities;
					for (let i = 0; i < cities.length; i++) {
						destinationElement.append(getCityMarkup(cities[i], continents[0], cityMapImageData, specialTreatmentForHyperLinks));
						cityCount++;
						_totalLoadedCities++;
					}
				}
				//#endregion
				//#region getMapLocationData
				let locations = locationsRaw[0];
				for (let i = 0; i < locations.length; i++) {
					let relevantMapImage = cityMapImageData.filter(function (entry) {
						return entry.name.toLowerCase() === locations[i].name.toLowerCase();
					});
					let url = relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + locations[i].name : "#";
					destinationElement.append(
						$(
							`<a href="${url}" class="point-of-interest smith village" style="left: calc(${locations[i].left} - 8px); top: calc(${locations[i].top} - 8px); ${specialTreatmentForHyperLinks && url != "#" ? " color:#ffff00;" : ""}" data-city="${locations[i].name}" data-continent="${continentName}" data-structure="map-location">
								<div class="map-marker-icon marker-town" style="background-color:#f3b;">&nbsp;</div>
								<span class="map-marker-name" style="position: absolute; top:50%; left:100%; transform: translate(10px, -50%);">${locations[i].name}</span>
							</a>`
						)
					);
					cityCount++;
					_totalLoadedCities++;
				}
				//#endregion
				console.log(`Cities on ${continentName}: ${cityCount}`);
				resolve(undefined);
			});
		}
	);
}

/**
 * Get a city marker as an HTML Element
 * @param city The city for which a map marker is needed
 * @param continent The continent on which the city is located. This will determine the font used, and serve some other more functional purposes.
 * @param specialTreatmentForHyperLinks If true, the returned marker will be yellow if the city is associated to a city map
 */
function getCityMarkup(city: ICitiesJsonObject, continent: ICitiesJsonContinentSection, cityMapImageData: ICityMapNode[], specialTreatmentForHyperLinks: boolean = false)
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
	let marker = cm != CityMarkerTypes.None ? `<div class="map-marker-icon marker-${cm}">&#160;</div>` : "";

	let relevantMapImage = cityMapImageData.filter(function (entry) {
		return entry.name.toLowerCase() === city.name.toLowerCase();
	});
	let url = (city.url == "#" || !city.url) && relevantMapImage.length > 0 ? "/dnd/pages/maps/city-viewer.html?city=" + city.name : city.url;

	//#region get extra CSS properties and store them to the extraCssProperties variable
	let offset = MapMarkerRadii[cm] || 0;
	let extraCssProperties = getPositionString(city.position, offset);
	if (city.fontSize) {
		extraCssProperties += ` font-size:${city.fontSize}px;`;
	}
	if (specialTreatmentForHyperLinks && url != "#")
	{
		extraCssProperties += " color:#ffff00;";
	}
	//#endregion

	return $(`<a href="${url}" class="point-of-interest ${continent.cartographer} ${city.type}" style="${extraCssProperties}" data-city="${city.name}" data-continent="${continent.name}" data-structure="cities.json">
		${marker}
		<span class="map-marker-name" style="${getNamePositionString(city.nameLocation, Math.round(offset * 1.3))}">${city.name}</span>
		<!--<span class="city-preview">
			<h1>${city.name}</h1>
			${description}
			${culture}
			${dmNotes}
		</span>-->
	</a>`);
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

/**
 * Adds helper behavior to a map element to aid in placing locations.
 * @param mapElement The css selector for the element that houses the targeted map.
 */
function attachPlacementHelper(mapElement: JQuery<HTMLElement>) {
	mapElement.click(function(evt) {
		$(".location-tester").remove();
		var zoom = ($("#map-zoom").val() as number) * 0.01;
		let map = $(this) as JQuery<HTMLElement>;
		//@ts-ignore
		var x = (evt.pageX + 8 - map.offset().left)/(map.width() * zoom);
		//@ts-ignore
		var y = (evt.pageY + 8 - map.offset().top)/(map.height() * zoom);
		// console.log(`evt.pageX: ${evt.pageX}, evt.pageY: ${evt.pageY}`);
		// //@ts-ignore
		// console.log(`map.offset().left: ${map.offset().left}, map.offset().top: ${map.offset().top}`);
		// console.log(`X: ${x}, X: ${y}`);
		var newMarker = $(`<a href="#" class="point-of-interest smith village location-tester">
			<div class="map-marker-icon marker-town">&nbsp;</div>
		</a>`);
		map.append(newMarker);
		newMarker.css("left", (Math.round(x * 10000) / 100) + "%");
		newMarker.css("top", (Math.round(y * 10000) / 100) + "%");
	});
}


$(document).ready(function ()
{
	var modalWindow: CityBlurbViewer;
	$(document).ready(function ()
	{
		//@ts-ignore
		window.modalWindow = new CityBlurbViewer("#map-body");
		//@ts-ignore
		window.modalWindow.close();
		$(document).on("click", "a.point-of-interest", function(e) {
			e.preventDefault();
			$.when(getCityObject($(this).attr("data-city") as string, $(this).attr("data-continent") as string, $(this).attr("data-structure") == "cities.json")).done(function(city) {
				//@ts-ignore
				window.modalWindow.displayCity(city as ICity);
			})
		});
	});
})