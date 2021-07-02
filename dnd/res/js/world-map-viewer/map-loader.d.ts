/// <reference types="jquery" />
declare type CityType = "city" | "metropolis" | "village";
interface IMapObjectPosition {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
}
declare enum CityMarkerTypes {
    City = "city",
    None = "none",
    Town = "town"
}
declare enum VerticalAlignTypes {
    Above = "top",
    Below = "bottom",
    Beside = "middle"
}
declare enum HorizontalAlignTypes {
    Right = "right",
    Center = "center",
    Left = "left"
}
interface ICityMarker {
    type: CityMarkerTypes;
    position: IMapObjectPosition;
}
interface ICity {
    /** The name of the city */
    name: string;
    type: CityType;
    description: string[];
    culture: string[];
    dmNotes: string[];
    /** The address of the city's standalone map. */
    url: string;
}
interface ICitiesJsonObject extends ICity {
    /** Indicates where the name should be displayed relative to the map icon. Vertical position followed by horizontal (e.g. "top left") */
    nameLocation: string;
    fontSize?: number;
    position: IMapObjectPosition;
    marker: ICityMarker | CityMarkerTypes;
}
interface ICitiesJsonContinentSection {
    name: string;
    cartographer: string;
    cities: ICitiesJsonObject[];
}
declare const MapMarkerRadii: {
    [key in CityMarkerTypes]: number;
};
declare var _cityMapImageData: ICityMapNode[];
declare class City implements ICity {
    name: string;
    type: CityType;
    description: string[];
    culture: string[];
    dmNotes: string[];
    url: string;
}
declare function getCityData(): JQuery.jqXHR<any>;
declare function getMapLocationData(continent: string): JQuery.jqXHR<any>;
declare function getMapImageData(): JQuery.jqXHR<any>;
declare function getCityObject(cityName: string, continentName: string, dataLocatedInCitiesJson?: boolean): Promise<ICity>;
declare function ensureSingleCityResult(citiesToFilter: ICity[] | IMapLocation[], cityName: string, continentName: string): ICity | IMapLocation | undefined;
