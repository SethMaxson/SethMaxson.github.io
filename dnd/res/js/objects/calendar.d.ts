declare const geossMonths: string[];
declare class GeossCalendar {
    private funcDate;
    constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number);
    addDays(days: number): void;
    addHours(hours: number): void;
    getDate(): number;
    getDisplayDate(): string;
    getHours(): number;
    getMinutes(): number;
    getMonth(): number;
    getMonthName(): string;
    getTime(): string;
    getYear(): number;
}
declare function getFriendlyDayNumber(day: number): string;
declare function getFriendlyHour(date: Date): string;
declare function getFriendlyMinutes(date: Date): string;
