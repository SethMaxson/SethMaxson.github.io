"use strict";
let CalendarPageCalendar;
$(document).ready(function () {
    if (localStorage.year !== undefined) {
        updateCalendarStuff(parseFloat(localStorage.year), parseFloat(localStorage.month), parseFloat(localStorage.day), parseFloat(localStorage.hour), parseFloat(localStorage.minute));
    }
    else {
        updateCalendarStuff(2368, 9, 27);
    }
    $("#date-picker").on("change", function () {
        const dateParts = $("#date-picker").val().split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        updateCalendarStuff(year, month, day);
    });
});
function updateCalendarStuff(year, month, day, hour, minute) {
    CalendarPageCalendar = new GeossCalendar(year, month, day, hour, minute);
    $("#Calendar").text(CalendarPageCalendar.getTime() + ' ' + CalendarPageCalendar.getDisplayDate());
    calendarGetStuff();
}
function calendarGetStuff() {
    $("#TripDistance").text('Days since epoch:' + CalendarPageCalendar.getDaysSinceEpoch());
    $("#TripTime").text('Days since New Moon:' + CalendarPageCalendar.getDaysSinceEpoch() % 29);
    $("#MoonPhase").text('MoonPhase:' + CalendarPageCalendar.getLunarPhase());
}
//# sourceMappingURL=calendar.js.map