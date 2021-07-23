declare const weatherTypes: (string | number)[];
declare class Weather {
    weather: string;
    winds: string;
    constructor(type?: string);
}
declare function randomWinds(strength?: string): string;
