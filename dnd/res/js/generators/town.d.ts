declare type CitySizes = "empty" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
declare type CityPointOfInterestType = "bar" | "place" | "shop" | "worship";
interface ISettlementData {
    alignment: Alignment;
    commerce: string;
    defense: string;
    government: string;
    maxItemRarity: ItemRarity;
    name: string;
    organizations: string;
    pointsOfInterest: ISettlementPointOfInterestData[];
    population: number;
    populationPercentages: string;
    primaryCulture: keyof typeof racesWeighted;
    qualities: string[];
    size: CitySizes;
    type: string;
}
interface ISettlementPointOfInterestData {
    description: string;
    name: string;
    subtype?: string;
    type: CityPointOfInterestType;
}
declare class SettlementPointOfInterestData implements ISettlementPointOfInterestData {
    description: string;
    name: string;
    subtype?: string | undefined;
    type: CityPointOfInterestType;
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
/**
 * Generates a random city/town name.
 */
declare function getCityName(town: ISettlementData): string;
declare function getTavernName(): string;
declare function genWateringHole(): SettlementPointOfInterestData;
declare function genPlaceOfWorship(alignment: string): SettlementPointOfInterestData;
declare function genStore(): SettlementPointOfInterestData;
declare function genPlaceOfInterest(): SettlementPointOfInterestData;
declare function sortNumber(a: number, b: number): number;
declare function removeElement(array: any[], element: any): any[];
declare function popPercentages(population: number, primarySpecies: string): string;
declare function generateCity(citySize?: CitySizes, itemRarity?: ItemRarity): ISettlementData;
declare function initializeTownGen(): void;
