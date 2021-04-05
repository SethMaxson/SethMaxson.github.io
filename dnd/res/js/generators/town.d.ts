declare type CitySizes = "empty" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
interface ITown {
    alignment: Alignment;
    population: number;
    populationPercentages: string;
    primaryCulture: keyof typeof racesWeighted;
    type: string;
    government: string;
    defense: string;
    commerce: string;
    organizations: string;
    qualities: string[];
    maxItemRarity: ItemRarity;
    size: CitySizes;
}
declare const townTotaledWeights: {
    governmentTypes: number;
    Race: number;
};
declare const governmentTypes: IWeightedKeyList;
declare var races: string[];
declare var racesWeighted: IWeightedKeyList;
declare const qualities: {
    Academic: string;
    Bureaucratic: string;
    Cultured: string;
    Devout: string;
    "Financial Center": string;
    Insular: string;
    Notorious: string;
    Polluted: string;
    Tech: {
        "Technologically Advanced": string;
        "Technologically Average": string;
        "Technologically Underdeveloped": string;
    };
    "In Recession": string;
    Profiteering: string;
    "Secret Location": string;
    Modular: string;
    "Surrounded by the Past": string;
    Remote: string;
};
declare const cityBySize: {
    empty: IWeightedKeyList;
    micro: IWeightedKeyList;
    tiny: IWeightedKeyList;
    small: IWeightedKeyList;
    medium: IWeightedKeyList;
    large: IWeightedKeyList;
    huge: IWeightedKeyList;
};
declare const wateringHole: {
    prefixes: string[];
    suffixes: string[];
    establishment: string[];
    flavour: string[];
};
declare const placeofWorship: {
    flavour: string[];
    names: string[];
};
declare const stores: {
    "Magical Items Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Melee Weapon Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Armor Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    Armory: {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
};
declare const placesOfInterest: {
    "Airship Dock": {
        flavour: string[];
    };
    Bathhouse: {
        flavour: string[];
    };
    College: {
        flavour: string[];
    };
    "Government Building": {
        flavour: string[];
    };
    Hospital: {
        flavour: string[];
    };
    "Vehicle Rental": {
        flavour: string[];
    };
    Shipyard: {
        flavour: string[];
    };
};
declare const buildingFlavour: string[];
declare const settlementFlavour: string[];
declare const cityNameParts: {
    fullNames: string[];
    nameStarts: string[];
    nameEnds: string[];
};
declare const numOfShops: {
    empty: number;
    micro: number;
    tiny: number;
    small: number;
    medium: number;
    large: number;
    huge: number;
};
/**
 * Returns the number of citizens for a given city.
 * @param size The size of the target city
 */
declare function getPopulation(size: CitySizes): number;
declare function clearOutput(): void;
/**
 * Generates a random city/town name.
 */
declare function getCityName(town: ITown): string;
declare function printPanel(town: ITown): void;
declare function getTavernName(): string;
declare function genWateringHole(): string;
declare function genPlaceOfWorship(alignment: string): string;
declare function genStore(): string;
declare function genPlaceOfInterest(): string;
/**
 * Returns a consistently formatted HTML string to display a place of interest
 * @param name The name of the place of interest
 * @param description A description of the location
 */
declare function getPlaceOfInterestHTML(name: string, description: string): string;
declare function sortNumber(a: number, b: number): number;
declare function removeElement(array: any[], element: any): any[];
declare function popPercentages(population: number, primarySpecies: string): string;
declare function generateSettlement(): void;
declare function initializeTownGen(): void;
