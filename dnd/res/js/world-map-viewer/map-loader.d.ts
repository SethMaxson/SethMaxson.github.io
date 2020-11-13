/// <reference types="jquery" />
interface IMapObjectPosition {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
}
interface ICityMarker {
    type: string;
    position: IMapObjectPosition;
}
interface ICity {
    name: string;
    type: string;
    fontSize?: number;
    description: string[];
    culture: string[];
    dmNotes: string[];
    url: string;
    useCityViewer: boolean;
    position: IMapObjectPosition;
    marker: ICityMarker;
}
interface ICitiesJsonContinentSection {
    name: string;
    cartographer: string;
    cities: ICity[];
}
declare function getCityData(): JQuery.jqXHR<any>;
declare function getCitiesByContinent(destinationElement: JQuery<HTMLElement>, continentName: string, specialTreatmentForHyperLinks?: boolean): Promise<unknown>;
declare function getCityMarkup(city: ICity, cartographer: string, specialTreatmentForHyperLinks?: boolean): JQuery<HTMLElement>;
declare function getPositionString(position: IMapObjectPosition): string;
