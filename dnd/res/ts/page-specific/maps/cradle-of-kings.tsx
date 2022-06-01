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
		getCitiesByContinent($(".map-terrapim"), "Terrapim")
	]).then(data => {
		console.log(`Total cities loaded:${_totalLoadedCities}`)
	})
})

//#region temporarily hardcoded data
const cradleOfKingsLandmasses: ILandmassData[] = [
	{
		id: "terrapim",
		image: {
			raster: "/dnd/img/maps/landmasses/terrapim-cradle-of-kings.png",
			vector: "/dnd/img/maps/landmasses/terrapim-cradle-of-kings.png"
		},
		labelPosition: {
			left: "50%",
			top: "50%"
		},
		name: "Terrapim",
		translateLabel: true
	}
];

const cradleOfKingsOverlays: IMapOverlayData[] = [
	// {
	// 	displayedByDefault: false,
	// 	image: "/dnd/img/maps/world-map-overlays/corruptionmap.png",
	// 	name: "Corruption Map",
	// 	opacity: 0.6,
	// 	zIndex: 2,
	// },
];
//#endregion temporarily hardcoded data

ReactDOM.render(
	<MapViewer height={3771} width={6000} landmasses={cradleOfKingsLandmasses} overlays={cradleOfKingsOverlays} />,
	document.getElementById("map-goes-here")
);