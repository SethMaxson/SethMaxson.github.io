/// <reference types="jquery" />
/// <reference types="jqueryui" />
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
    /** Indicates where the name should be displayed relative to the map icon. Vertical position followed by horizontal (e.g. "top left") */
    nameLocation: string;
    /** Strictly for debugging the newer, better location placement format. Need to remove once this is finalized. */
    useNewLocation?: "true";
    type: string;
    fontSize?: number;
    description: string[];
    culture: string[];
    dmNotes: string[];
    /** The address of the city's standalone map. */
    url: string;
    /** Should this city be opened in the generic city map viewer when clicked? */
    useCityViewer: boolean;
    position: IMapObjectPosition;
    marker: ICityMarker | CityMarkerTypes;
}
interface ICitiesJsonContinentSection {
    name: string;
    cartographer: string;
    cities: ICity[];
}
declare const MapMarkerRadii: {
    [key in CityMarkerTypes]: number;
};
declare var _totalLoadedCities: number;
declare function getCityData(): JQuery.jqXHR<any>;
declare function getMapLocationData(continent: string): JQuery.jqXHR<any>;
declare function getCitiesByContinent(destinationElement: JQuery<HTMLElement>, continentName: string, specialTreatmentForHyperLinks?: boolean): Promise<unknown>;
/**
 * Get a city marker as an HTML Element
 * @param city The city for which a map marker is needed
 * @param cartographer The name of the cartographer who mapped the city. This will determine the font used
 * @param specialTreatmentForHyperLinks If true, the returned marker will be yellow if the city is associated to a city map
 */
declare function getCityMarkup(city: ICity, cartographer: string, specialTreatmentForHyperLinks?: boolean): JQuery<HTMLElement>;
declare function getPositionString(position: IMapObjectPosition, offset?: number): string;
/**
 * Returns the coordinate portion of the property's position string. Allows unneeded 'calc' to be omitted, thus reducing the work required for the browser to reflow the document.
 * @param position The position string for the chosen property (i.e. top, left, right, or bottom)
 * @param offset The offset to account for the radius of the map icon
 */
declare function getPositionSubstring(position: string, offset?: number): string;
declare function getNamePositionString(nameLocation?: string, iconRadius?: number): string;
