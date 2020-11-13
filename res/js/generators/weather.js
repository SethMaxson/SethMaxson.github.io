const weatherTypes = ["Sunny", 10,
"Partly-Cloudy", 8,
"Cloudy", 4,
"Light Rain", 4,
"Fog", 4,
"Rain", 5,
"Hail", 1,
"Snow", 2,
"Thunderstorm", 3,
"Windstorm", 1];

function Weather(type) {
	var weather;
	this.weather = type || randomize(weatherTypes, true);
	this.winds = randomWinds();
}

function randomWinds(strength) {
	strength = strength || "low";
	var speed = 0;
	switch (strength) {
		case "low":
			speed = rollDie(10);
			break;
		case "medium":
			speed = 10 + rollDie(20);
			break;
		case "high":
			speed = 50 + rollDie(100)
			break;
		case "extreme":
			280 + rollDie(325)
			break;
		default:
			break;
	}
	return speed + "kph " + randomize(["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]);
}