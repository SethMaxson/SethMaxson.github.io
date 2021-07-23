/**
 * Returns the distance between two-dimensional coordinates
 */
declare function computeDistance(startX: number, startY: number, endX: number, endY: number): number;
/**
 * Returns the time required to travel a given distance at a constant speed.
 * @param distance The distance traveled
 * @param speed The travel speed
 */
declare function computeTravelTime(distance: number, speed: number): number;
declare function saveCalendarToLocalStorage(calendar: GeossCalendar): void;
declare function applyTravelTime(calendar: GeossCalendar): void;
declare function calculateButton(): void;
