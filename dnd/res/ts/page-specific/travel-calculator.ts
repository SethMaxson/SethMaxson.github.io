$(document).ready(function(){
	var calendar: GeossCalendar;
	if (localStorage.year !== undefined) {
		calendar = new GeossCalendar(parseFloat(localStorage.year), parseFloat(localStorage.month), parseFloat(localStorage.day), parseFloat(localStorage.hour), parseFloat(localStorage.minute));
	} else {
		calendar = new GeossCalendar(undefined, 11, 18);
	}

	$("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());

	$("#travel-method").on("change", function ()
	{
		let speed = parseFloat($("#travel-method").val() as string);
		$("#travel-speed").val(speed);
	});
})

/**
 * Returns the distance between two-dimensional coordinates
 */
function computeDistance(startX: number, startY: number, endX: number, endY: number)
{
	var deltaX = (endX - startX);
	var deltaY = (endY - startY);
	return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
}

/**
 * Returns the time required to travel a given distance at a constant speed.
 * @param distance The distance traveled
 * @param speed The travel speed
 */
function computeTravelTime(distance: number, speed: number)
{
	return speed != 0? Math.round(distance*100/speed)/100 : -1;
}

function saveCalendarToLocalStorage(calendar: GeossCalendar)
{
	localStorage.year = calendar.getYear();
	localStorage.month = calendar.getMonth();
	localStorage.day = calendar.getDate();
	localStorage.hour = calendar.getHours();
	localStorage.minute = calendar.getMinutes();
}

function applyTravelTime(calendar: GeossCalendar)
{
	let tripTime = parseFloat($("#TripTime").text());
	if (!isNaN(tripTime)) {
		calendar.addHours(tripTime);
	}
	$("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());
}

function calculateButton()
{
	let distance = computeDistance(
		$("#trip-start-lon").val() as number,
		$("#trip-start-lat").val() as number,
		$("#trip-end-lon").val() as number,
		$("#trip-end-lat").val() as number
	);
	let speed = parseFloat($("#travel-speed").val() as string);
	let time = computeTravelTime(distance, speed);
	$("#TripDistance").text((Math.round(distance*100)/100) + "km");
	$("#TripTime").text(time + " hours");
}