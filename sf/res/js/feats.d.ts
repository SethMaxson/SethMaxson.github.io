/// <reference types="jquery" />
declare function getFeats(): JQuery.jqXHR<any>;
declare class Feat {
    name: string;
    combatFeat: boolean;
    prerequisites?: FeatPrerequisites;
    shortDescription: string;
    description: string;
    source: string;
    page: number;
    [key: string]: any;
    constructor(obj: any);
}
declare class FeatPrerequisites {
    description: string;
    mappings: FeatPrerequisiteMapping[];
    [key: string]: any;
}
declare class FeatPrerequisiteMapping {
    type: string;
    subType: string;
    value: any;
    [key: string]: any;
}
declare class FeatManager {
    allItems: Feat[];
    filteredItems: Feat[];
    character?: Character;
    constructor(items?: Feat[]);
    init(): JQuery.Promise<any, any, any>;
    filter(character?: Character): Feat[];
    get(name: string): Feat | undefined;
    getPreview(name: string): JQuery<HTMLElement>;
    resetFilters(): void;
    parse(): void;
    sort(property?: string): void;
    get json(): string;
    save(): void;
}
declare function getFeatPreview(item: any): JQuery<HTMLElement>;
