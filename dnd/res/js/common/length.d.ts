declare class Length {
    _inches: number;
    constructor(measurement?: string);
    add(measurement: string): void;
    subtract(measurement: string): void;
    imperial(): string;
    get feet(): number;
    get inches(): number;
}
/**
 * Parses a measurement passed as a string and returns it as a number of inches.
 * @param measurement The measurement to parse
 */
declare function parseMeasurementString(measurement: string): number;
