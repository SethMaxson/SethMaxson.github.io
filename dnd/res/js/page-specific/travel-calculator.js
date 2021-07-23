"use strict";
$(document).ready(function () {
    var calendar;
    if (localStorage.year !== undefined) {
        calendar = new GeossCalendar(parseFloat(localStorage.year), parseFloat(localStorage.month), parseFloat(localStorage.day), parseFloat(localStorage.hour), parseFloat(localStorage.minute));
    }
    else {
        calendar = new GeossCalendar(undefined, 11, 18);
    }
    $("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());
    $("#travel-method").on("change", function () {
        let speed = parseFloat($("#travel-method").val());
        $("#travel-speed").val(speed);
    });
});
/**
 * Returns the distance between two-dimensional coordinates
 */
function computeDistance(startX, startY, endX, endY) {
    var deltaX = (endX - startX);
    var deltaY = (endY - startY);
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
}
/**
 * Returns the time required to travel a given distance at a constant speed.
 * @param distance The distance traveled
 * @param speed The travel speed
 */
function computeTravelTime(distance, speed) {
    return speed != 0 ? Math.round(distance * 100 / speed) / 100 : -1;
}
function saveCalendarToLocalStorage(calendar) {
    localStorage.year = calendar.getYear();
    localStorage.month = calendar.getMonth();
    localStorage.day = calendar.getDate();
    localStorage.hour = calendar.getHours();
    localStorage.minute = calendar.getMinutes();
}
function applyTravelTime(calendar) {
    let tripTime = parseFloat($("#TripTime").text());
    if (!isNaN(tripTime)) {
        calendar.addHours(tripTime);
    }
    $("#Calendar").text(calendar.getTime() + ' ' + calendar.getDisplayDate());
}
function calculateButton() {
    let distance = computeDistance($("#trip-start-lon").val(), $("#trip-start-lat").val(), $("#trip-end-lon").val(), $("#trip-end-lat").val());
    let speed = parseFloat($("#travel-speed").val());
    let time = computeTravelTime(distance, speed);
    $("#TripDistance").text((Math.round(distance * 100) / 100) + "km");
    $("#TripTime").text(time + " hours");
}
//# sourceMappingURL=travel-calculator.js.map