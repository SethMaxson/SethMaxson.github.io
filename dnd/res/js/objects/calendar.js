"use strict";
const geossMonths = ["Kotahi", "Rua", "Toru", "Ewha", "Erima", "Ono", "Tokowhitu", "Waru", "Iwa", "Tekau", "Matahi", "Marua"];
class GeossCalendar {
    constructor(year = 2353, month = 1, day = 1, hour = 7, minute = 0) {
        this.funcDate = new Date(year, month, day, hour, minute);
    }
    addDays(days) { this.funcDate.setDate(this.funcDate.getDate() + days); }
    ;
    addHours(hours) {
        this.funcDate.setHours(this.funcDate.getHours() + hours);
        this.funcDate.setMinutes(this.funcDate.getMinutes() + ((hours % 1) * 60));
    }
    ;
    getDate() { return this.funcDate.getDate(); }
    ;
    getDisplayDate() { return `${getFriendlyDayNumber(this.funcDate.getDate())} of ${this.getMonthName()}, ${this.getYear()} AE`; }
    getHours() { return this.funcDate.getHours(); }
    ;
    getMinutes() { return this.funcDate.getMinutes(); }
    ;
    getMonth() { return this.funcDate.getMonth(); }
    ;
    getMonthName() { return geossMonths[this.funcDate.getMonth()]; }
    ;
    getTime() { return getFriendlyHour(this.funcDate); }
    ;
    getYear() { return this.funcDate.getFullYear(); }
    ;
}
function getFriendlyDayNumber(day) {
    let dayString = day + '';
    switch (dayString.slice(-1)) {
        case "1":
            return day + 'st';
        case "2":
            return day + 'nd';
        case "3":
            return day + 'rd';
        default:
            return day + 'th';
    }
}
function getFriendlyHour(date) {
    var hour = date.getHours();
    var minutes = getFriendlyMinutes(date);
    if (hour < 11) {
        return (hour + 1) + ":" + minutes + "AM";
    }
    else {
        return (hour - 11) + ":" + minutes + "PM";
    }
}
function getFriendlyMinutes(date) {
    var minutes = date.getMinutes();
    if (minutes < 10) {
        return "0" + minutes;
    }
    else {
        return minutes + "";
    }
}
//# sourceMappingURL=calendar.js.map