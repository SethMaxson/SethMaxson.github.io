let CalendarPageCalendar: GeossCalendar;

$(document).ready(function ()
{
	if (localStorage.year !== undefined) {
		CalendarPageCalendar = new GeossCalendar(parseFloat(localStorage.year), parseFloat(localStorage.month), parseFloat(localStorage.day), parseFloat(localStorage.hour), parseFloat(localStorage.minute));
	} else {
		CalendarPageCalendar = new GeossCalendar(2368, 9, 27);
	}

	$("#Calendar").text(CalendarPageCalendar.getTime() + ' ' + CalendarPageCalendar.getDisplayDate());

	$("#travel-method").on("change", function ()
	{
		let speed = parseFloat($("#travel-method").val() as string);
		$("#travel-speed").val(speed);
	});
})

function calendarGetStuff()
{
	$("#TripDistance").text('Days since epoch:' + CalendarPageCalendar.getDaysSinceEpoch());
	$("#TripTime").text('Days since New Moon:' + CalendarPageCalendar.getDaysSinceEpoch() % 29);
	$("#MoonPhase").text('MoonPhase:' + CalendarPageCalendar.getLunarPhase());
}