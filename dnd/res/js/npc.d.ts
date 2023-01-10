/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare function getNPCs(): JQuery.jqXHR<any>;
declare const npcSortOrders: {
    /** A constant used for sorting NPC objects by their intelligence rating. */
    intelligence: string[];
    /** A constant used for sorting NPC objects by their threat rating. */
    threat: string[];
};
interface INPC {
    id: string;
    name: any;
    image?: string;
    race: string;
    subrace: string;
    gender: any;
    age: number;
    relativeAge: string;
    alignment: Alignment;
    threat: string;
    intelligence: string;
    personalityTags: string[];
    profession: string;
    description: string;
    status: string;
}
declare class NPC implements INPC {
    id: string;
    name: string;
    image?: string;
    race: string;
    subrace: string;
    gender: string;
    age: number;
    relativeAge: string;
    alignment: Alignment;
    threat: string;
    intelligence: string;
    personalityTags: string[];
    profession: string;
    description: string;
    status: string;
    [key: string]: any;
    constructor(obj?: any);
}
declare class NPCManager {
    all: NPC[];
    filtered: NPC[];
    races: string[];
    genders: string[];
    alignments: string[];
    relativeAges: string[];
    constructor(items?: NPC[]);
    filter(races?: string[], genders?: string[], alignments?: string[]): NPC[];
    get(name: string): NPC | undefined;
    getByID(id: string): NPC | undefined;
    getPreview(name: string): JQuery<HTMLElement>;
    resetFilters(): void;
    /** Converts raw JSON to JavaScript objects. Only needed when loading NPCs from a JSON file. */
    parse(): void;
    sort(property?: string, desc?: boolean): void;
    private doSort;
    get json(): string;
    save(): void;
    add(npc: NPC): void;
}
declare function getNPCPreview(item?: NPC): JQuery<HTMLElement>;
declare function getNPCImage(npc: NPC): string;
