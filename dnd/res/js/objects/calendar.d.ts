declare const geossMonths: string[];
declare enum LunarPhase {
    NewMoon = "New Moon",
    WaxingCrescent = "Waxing Crescent",
    WaxingGibbous = "Waxing Gibbous",
    FullMoon = "Full Moon",
    WaningGibbous = "Waning Gibbous",
    WaningCrescent = "Waning Crescent"
}
declare const daysInGeossYear = 365;
declare class GeossCalendar {
    private funcDate;
    constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number);
    addDays(days: number): void;
    addHours(hours: number): void;
    /** Gets the day-of-the-month, using local time. */
    getDate(): number;
    /** Returns the number of days passed between 01/01, 0 AE and this date. */
    getDaysSinceBeginningOfYear(): number;
    /** Returns the number of days passed between 01/01, 0 AE and this date. */
    getDaysSinceEpoch(): number;
    /** Returns the number of days passed since the last new moon. */
    getDaysSinceNewMoon(): number;
    getDisplayDate(): string;
    /** Gets the hours in a date, using local time. */
    getHours(): number;
    /** Gets the hours in a date, using local time. */
    getLunarPhase(): LunarPhase;
    /** Gets the minutes of a Date object, using local time. */
    getMinutes(): number;
    /** Gets the month, using local time. */
    getMonth(): number;
    getMonthName(): string;
    getTime(): string;
    /** Gets the year, using local time. */
    getYear(): number;
}
declare function getFriendlyDayNumber(day: number): string;
declare function getFriendlyHour(date: Date): string;
declare function getFriendlyMinutes(date: Date): string;
