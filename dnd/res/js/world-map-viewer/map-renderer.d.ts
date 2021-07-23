/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare var _totalLoadedCities: number;
declare function getCitiesByContinent(destinationElement: JQuery<HTMLElement>, continentName: string, specialTreatmentForHyperLinks?: boolean): Promise<unknown>;
/**
 * Get a city marker as an HTML Element
 * @param city The city for which a map marker is needed
 * @param continent The continent on which the city is located. This will determine the font used, and serve some other more functional purposes.
 * @param specialTreatmentForHyperLinks If true, the returned marker will be yellow if the city is associated to a city map
 */
declare function getCityMarkup(city: ICitiesJsonObject, continent: ICitiesJsonContinentSection, specialTreatmentForHyperLinks?: boolean): JQuery<HTMLElement>;
declare function getPositionString(position: IMapObjectPosition, offset?: number): string;
/**
 * Returns the coordinate portion of the property's position string. Allows unneeded 'calc' to be omitted, thus reducing the work required for the browser to reflow the document.
 * @param position The position string for the chosen property (i.e. top, left, right, or bottom)
 * @param offset The offset to account for the radius of the map icon
 */
declare function getPositionSubstring(position: string, offset?: number): string;
declare function getNamePositionString(nameLocation?: string, iconRadius?: number): string;
/**
 * Adds helper behavior to a map element to aid in placing locations.
 * @param mapElement The css selector for the element that houses the targeted map.
 */
declare function attachPlacementHelper(mapElement: JQuery<HTMLElement>): void;
