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
	$(document).on("click", "#Corruption", function(){
		if($("#Corruption").text() == 'Corruption Hidden'){
			$("#Corruption").text('Corruption Shown');
			$('#CorruptionMap').css("display","block");
		} else {
			$("#Corruption").text('Corruption Hidden');
			$('#CorruptionMap').css("display","none");
		}
	});
	$(document).on("click", "#Climates", function(){
		if($("#Climates").text() == 'Climates Hidden'){
			$("#Climates").text('Climates Shown');
			$('#ClimateZones').css("display","block");
		} else {
			$("#Climates").text('Climates Hidden');
			$('#ClimateZones').css("display","none");
		}
	});
	$(document).on("click", "#Airships", function(){
		if($("#Airships").text() == 'Airships Hidden'){
			$("#Airships").text('Airships Shown');
			$('.airship.npc.hideable').css("display","block");
		} else {
			$("#Airships").text('Airships Hidden');
			$('.airship.npc.hideable').css("display","none");
		}
	});
	$(document).on("click", "#NotableNPCs", function(){
		if($("#NotableNPCs").text() == 'Notable NPCs Hidden'){
			$("#NotableNPCs").text('Notable NPCs Shown');
			$('.pedestrian.npc.hideable').css("display","block");
		} else {
			$("#NotableNPCs").text('Notable NPCs Hidden');
			$('.pedestrian.npc.hideable').css("display","none");
		}
	});
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

ReactDOM.render(
	<MapViewer height={11250} width={18750} overlays={overlays} />,
	document.getElementById("map-goes-here")
);