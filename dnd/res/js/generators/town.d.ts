declare var getRandomInt: {
    (min: number, max: number): number;
};
declare var government: string[];
declare var alignment: string[];
declare var dieties: {
    Abadar: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Besmara: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Damoritosh: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Desna: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    "The Devourer": {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Eloritu: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Hylax: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Ibra: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Iomedae: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    "Lao Shu Po": {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Nyarlathotep: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Oras: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Pharasma: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Sarenrae: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Talavet: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Triune: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Urgathoa: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Weydan: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    Yaraesa: {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
    "Zon-Kuthon": {
        Description: string;
        Title: string;
        Symbol: string;
        Align: string;
    };
};
declare var races: string[];
declare var qualities: {
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
declare var cityBySize: {
    empty: string[];
    tiny: string[];
    small: string[];
    medium: string[];
    large: string[];
    huge: string[];
};
declare var wateringHole: {
    prefixes: string[];
    suffixes: string[];
    establishment: string[];
    flavour: string[];
};
declare var placeofWorship: {
    flavour: string[];
    names: string[];
};
declare var stores: {
    Pharmacy: {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Electronics Workshop": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Computer Specialist": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    Hypermarket: {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Magical Items Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Augmentations Clinic": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Gun Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Melee Weapon Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Ammunition Store": {
        equipment: string[];
        flavour: string[];
        names: string[];
    };
    "Upgrade Store": {
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
declare var placesOfInterest: {
    "Robo Repair": {
        flavour: string[];
    };
    Warehouse: {
        flavour: string[];
    };
    "Legal Firm": {
        flavour: string[];
    };
    "Capsule Hotel": {
        flavour: string[];
    };
    "Data Storage": {
        flavour: string[];
    };
    "Low Rent Housing Project": {
        flavour: string[];
    };
    "Designated Starship Parking": {
        flavour: string[];
    };
    "Fast Food Franchise": {
        flavour: string[];
    };
    "Police Department": {
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
    "Luxury Apartments": {
        flavour: string[];
    };
    "Media Company": {
        flavour: string[];
    };
    "Starship Dealership": {
        flavour: string[];
    };
    "Vehicle Rental": {
        flavour: string[];
    };
    VRcade: {
        flavour: string[];
    };
    "Habitation Stack": {
        flavour: string[];
    };
    "Bulk Transport Company": {
        flavour: string[];
    };
    Cafe: {
        flavour: string[];
    };
    Bank: {
        flavour: string[];
    };
    Shipyard: {
        flavour: string[];
    };
    "Private Security": {
        flavour: string[];
    };
};
declare var buildingFlavour: string[];
declare var settlementFlavour: string[];
declare var namesEnd: string[];
declare var namesStart: string[];
declare var names: string[];
declare var numOfShops: {
    empty: number;
    tiny: number;
    small: number;
    medium: number;
    large: number;
    huge: number;
};
declare var indexCounter: number;
declare function getPopulation(size: string): string;
declare function clearOutput(): void;
declare function printPanel(alignment: any, population: any, type: any, government: any, qualities: any, item: any, size: keyof typeof numOfShops): void;
declare function genWateringHole(): string;
declare function genPlaceOfWorship(alignment: string): string;
declare function genStore(index: any): string;
declare function genPlaceOfInterest(): string;
declare function removeEntry(index: any): void;
declare function sortNumber(a: number, b: number): number;
declare function removeElement(array: any, element: any): any;
declare function popPercentages(): string;
declare function generateSettlement(): void;
