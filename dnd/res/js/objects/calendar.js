"use strict";
const geossMonths = ["Kotahi", "Rua", "Toru", "Ewha", "Erima", "Ono", "Tokowhitu", "Waru", "Iwa", "Tekau", "Matahi", "Marua"];
var LunarPhase;
(function (LunarPhase) {
    LunarPhase["NewMoon"] = "New Moon";
    LunarPhase["WaxingCrescent"] = "Waxing Crescent";
    LunarPhase["WaxingGibbous"] = "Waxing Gibbous";
    LunarPhase["FullMoon"] = "Full Moon";
    LunarPhase["WaningGibbous"] = "Waning Gibbous";
    LunarPhase["WaningCrescent"] = "Waning Crescent";
})(LunarPhase || (LunarPhase = {}));
const daysInGeossYear = 365;
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
    /** Gets the day-of-the-month, using local time. */
    getDate() { return this.funcDate.getDate(); }
    ;
    /** Returns the number of days passed between 01/01, 0 AE and this date. */
    getDaysSinceBeginningOfYear() {
        const startOfYear = new Date(this.funcDate.getFullYear(), 0, 0);
        //@ts-ignore
        const diff = (this.funcDate - startOfYear) + ((startOfYear.getTimezoneOffset() - this.funcDate.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    /** Returns the number of days passed between 01/01, 0 AE and this date. */
    getDaysSinceEpoch() {
        const yearDays = this.getYear() * daysInGeossYear;
        return yearDays + this.getDaysSinceBeginningOfYear();
    }
    /** Returns the number of days passed since the last new moon. */
    getDaysSinceNewMoon() {
        return CalendarPageCalendar.getDaysSinceEpoch() % 29;
    }
    getDisplayDate() { return `${getFriendlyDayNumber(this.funcDate.getDate())} of ${this.getMonthName()}, ${this.getYear()} AE`; }
    /** Gets the hours in a date, using local time. */
    getHours() { return this.funcDate.getHours(); }
    ;
    /** Gets the hours in a date, using local time. */
    getLunarPhase() {
        const phaseDay = this.getDaysSinceNewMoon();
        if (phaseDay == 0) {
            return LunarPhase.NewMoon;
        }
        else if (phaseDay <= 7) {
            return LunarPhase.WaxingCrescent;
        }
        else if (phaseDay <= 14) {
            return LunarPhase.WaxingGibbous;
        }
        else if (phaseDay == 15) {
            return LunarPhase.FullMoon;
        }
        else if (phaseDay <= 22) {
            return LunarPhase.WaningGibbous;
        }
        else {
            return LunarPhase.WaningCrescent;
        }
    }
    ;
    /** Gets the minutes of a Date object, using local time. */
    getMinutes() { return this.funcDate.getMinutes(); }
    ;
    /** Gets the month, using local time. */
    getMonth() { return this.funcDate.getMonth(); }
    ;
    getMonthName() { return geossMonths[this.funcDate.getMonth()]; }
    ;
    getTime() { return getFriendlyHour(this.funcDate); }
    ;
    /** Gets the year, using local time. */
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