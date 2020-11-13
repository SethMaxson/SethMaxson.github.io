/// <reference types="jquery" />
declare function getSpells(): JQuery.jqXHR<any>;
declare class Spell {
    name: string;
    level: number;
    castTime: string;
    classes: string[];
    components: string;
    shortDescription: string;
    description: string;
    descriptor: string;
    duration: string;
    range: string;
    saveInfo: string;
    school: string;
    spellRes: string;
    targetArea: string;
    source: string;
    page: number | string;
    [key: string]: any;
    constructor(obj: any);
}
declare class SpellManager {
    levels: number[];
    classes: string[];
    schools: string[];
    allSpells: Spell[];
    filteredSpells: Spell[];
    constructor(spells: Spell[]);
    filter(lvl: number[], classes: string[], schools: string[]): Spell[];
    get(name: string): Spell | undefined;
    getPreview(name: string): JQuery<HTMLElement>;
    resetFilters(): void;
    parse(): void;
    sort(property?: string): void;
    get json(): string;
    save(): void;
}
declare function getSpellPreview(item: Spell): JQuery<HTMLElement>;
