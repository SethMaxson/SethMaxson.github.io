$(document).ready(function() {
	var calendar: GeossCalendar;
	if (localStorage.year !== undefined) {
		calendar = new GeossCalendar(parseFloat(localStorage.year), parseFloat(localStorage.month), parseFloat(localStorage.day), parseFloat(localStorage.hour));
		localStorage.removeItem("year");
		localStorage.removeItem("month");
		localStorage.removeItem("hour");
		localStorage.removeItem("day");
	} else {
		calendar = new GeossCalendar(undefined, 11, 18);
	}
	var weather = new Weather();
	$("body").on("dragstop", ".airship.party", function(){
		let tripTime = parseFloat($("#TripTime").text());
		if (!isNaN(tripTime)) {
			calendar.addHours(tripTime);
		}
		$("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());
		localStorage.year = calendar.getYear();
		localStorage.month = calendar.getMonth();
		localStorage.day = calendar.getDate();
		localStorage.hour = calendar.getHours();
		localStorage.minute = calendar.getMinutes();
		setTimeout(() => {
			if (!dragging) {
				$("#TripTime").text("");
				$("#TripDistance").text("");
			}
		}, 1500);
	});
	$("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());
	$("#Weather").text(weather.weather + ', Wind: ' + weather.winds);
	// Airship("57%", "47%");
	// Pedestrian("24.5%", "25%", "Seabern", "/dnd/img/maps/icons/seabern.png");
	// Pedestrian("47.2%", "28.8%", "Jasper", "/dnd/img/maps/icons/jasper.png");
	// Pedestrian("49.6%", "38%", "Shamous", "/dnd/img/maps/icons/Shamous.png");
	// Pedestrian("57.1%", "50%", ["Bud", "Namfoodle", "Redji", "Teomyr", "Zenrya"], ["/dnd/img/maps/icons/bud.png", "/dnd/img/maps/icons/namfoodle.png", "/dnd/img/maps/icons/redji.png", "/dnd/img/maps/icons/teomyr.png", "/dnd/img/maps/icons/zenerya.png"]);
	// PedestrianNPC("47.2%", "28.7%", "Smith", "/dnd/img/maps/icons/smith.png");
	// PedestrianNPC("47.3%", "31.8%", "Matthias", "/dnd/img/maps/icons/matthias.png");
	// PedestrianNPC("47%", "27.7%", "Quintus", "/dnd/img/maps/icons/quintus.png");
	$("#map-body").focus();
})

$(document).ready(() => {
	Promise.all([
		getCitiesByContinent($(".map-bravagg"), "Bravagg"),
		getCitiesByContinent($(".map-decapos"), "Decapos"),
		getCitiesByContinent($(".map-lagos"), "Lagos"),
		getCitiesByContinent($(".map-notre"), "Notre"),
		getCitiesByContinent($(".map-paros"), "Paros"),
		getCitiesByContinent($(".map-peku"), "Peku"),
		getCitiesByContinent($(".map-sutre"), "Sutre"),
		getCitiesByContinent($(".map-terrapim"), "Terrapim")
	]).then(data => {
		console.log(`Total cities loaded:${_totalLoadedCities}`)
	})
})

//#region temporarily hardcoded data
const worldMapLandmasses: ILandmassData[] = [
	{
		id: "lagos",
		image: {
			raster: "/dnd/img/maps/landmasses/Lagos.png",
			vector: "/dnd/img/maps/landmasses/Lagos.svg"
		},
		labelPosition: {
			left: "1040px",
			top: "1130px"
		},
		name: "Lagos",
		translateLabel: false
	},
	{
		id: "paros",
		image: {
			raster: "/dnd/img/maps/landmasses/Paros.png",
			vector: "/dnd/img/maps/landmasses/Paros.svg"
		},
		labelPosition: {
			left: "2540px",
			top: "2230px"
		},
		name: "Paros",
		translateLabel: false
	},
	{
		id: "peku",
		image: {
			raster: "/dnd/img/maps/landmasses/Peku.png"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Peku",
		translateLabel: true
	},
	{
		id: "bravagg",
		image: {
			raster: "/dnd/img/maps/landmasses/Bravagg.svg",
			vector: "/dnd/img/maps/landmasses/Bravagg.svg"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Bravagg Isle",
		translateLabel: true
	},
	{
		id: "terrapim",
		image: {
			raster: "/dnd/img/maps/landmasses/Terrapim.png",
			vector: "/dnd/img/maps/landmasses/Terrapim.svg"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Terrapim",
		translateLabel: true
	},
	{
		id: "decapos",
		image: {
			raster: "/dnd/img/maps/landmasses/Decapos.png",
			vector: "/dnd/img/maps/landmasses/Decapos.svg"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Decapos",
		translateLabel: true
	},
	{
		id: "notre",
		image: {
			raster: "/dnd/img/maps/landmasses/Notre.png"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Notre",
		translateLabel: true
	},
	{
		id: "sutre",
		image: {
			raster: "/dnd/img/maps/landmasses/Sutre.png"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Sutre",
		translateLabel: true
	}
];

const worldMapOverlays: IMapOverlayData[] = [
	{
		displayedByDefault: false,
		image: "/dnd/img/maps/world-map-overlays/corruptionmap.png",
		name: "Corruption Map",
		opacity: 0.6,
		zIndex: 2,
	},
	{
		displayedByDefault: false,
		image: "/dnd/img/maps/world-map-overlays/Climate_Zones.png",
		name: "Climate Zones",
		opacity: 0.6,
		zIndex: 2,
	},
	{
		displayedByDefault: false,
		image: "/dnd/img/maps/world-map-overlays/Possible_Islands.png",
		name: "Possible Islands",
		opacity: 0.6,
		zIndex: 2,
	},
	{
		displayedByDefault: false,
		image: "/dnd/img/maps/Globe.svg",
		name: "Globe",
		opacity: 0.6,
		zIndex: 2,
	},
	{
		displayedByDefault: true,
		image: "/dnd/img/maps/world-map-overlays/Definite_Islands.png",
		name: "Definite Islands",
		opacity: 1,
		zIndex: 0,
	},
	{
		displayedByDefault: false,
		image: "/dnd/img/maps/Tectonic_Plates.png",
		name: "Tectonic Plates",
		opacity: 1,
		zIndex: 0,
	}
];
//#endregion temporarily hardcoded data

ReactDOM.render(
	<MapViewer
		height={11250}
		width={18750}
		landmasses={worldMapLandmasses}
		overlays={worldMapOverlays}
		config={{ showGridlines: true }}
	>
		<a href="/dnd/pages/maps/noseyus.html" className="smith metropolis" style={{ "position": "absolute", "top": "4200px", "left": "15000px", "fontSize": "80px", "zIndex": 6 }}>
			Noseyus Island
			<span className="city-preview">
				<h1>Noseyus Island</h1>
				<p>
					A small, perfectly circular island. This does not appear on any maps or charts.
				</p>
			</span>
		</a>
		<a href="#" className="point-of-interest smith metropolis" style={{ "left": "calc(38.6% - 12.5px)", "top": "calc(38% - 12.5px)", "fontSize": "40px", zIndex: 6 }}>
			<div className="map-marker-icon marker-city">&nbsp;</div>
			<span className="map-marker-name" style={{ "position": "absolute", "top": "100%", "left": "0%", "transform": "translate(16px, -50%)" }}>Osta Müü Turul</span>
			<span className="city-preview">
				<h1>Osta Müü Turul</h1>
				<p>Osta Müü Turul is a city covering a small island roughly midway between Paros, Lagos, and Decapos. The city is a massive trade hub where merchants from each continent can meet and conduct business. Security is tight, and the island has the highest known concentration of airship docks in the world.</p>
				<h1>Culture.</h1>
				<p>
					Visitors of any nationality and species are welcome in Osta Müü Turul, as long as they abide by its rules.
				</p>
			</span>
		</a>
		<MapLabel fontSize="110px" labelType="continent" name="Seiklus Ocean" position={{ left: "27%", top: "40%" }} />
		<MapLabel fontSize="110px" labelType="continent" name="Nyr Ocean" position={{ left: "74%", top: "40%" }} />
	</MapViewer>,
	document.getElementById("map-goes-here")
);