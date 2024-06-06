declare enum FilterTrinary {
    Neutral = "n",
    Exclude = "e",
    Include = "i"
}
interface String {
    capitalize(): string;
    replaceAll(search: string, replacement: string): string;
}
declare type Alignment = "CG" | "NG" | "LG" | "CN" | "N" | "LN" | "CE" | "NE" | "LE";
declare type ItemRarity = "None" | "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact";
declare type RpgSystem = "all" | "5e" | "PF2e";
/** Used for the ruleSet property in local storage. Influences how some pages display and function. */
declare type RuleSet = "5e" | "PF2e";
declare function roll(dice: string): number;
declare function rollDie(size?: number, modifier?: number, advantage?: number): number;
declare function getRandomInt(start: number, end: number): number;
declare function chance(percent?: number): boolean;
declare function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K];
declare function GetURLParameter(sParam: string): string | null;
declare function arrayAppend(array: any, item: any, unique?: boolean): Array<any>;
declare function saveJSON(json: JSON | Object, fileName: string): void;
declare function randomize(array: any[], weighted?: boolean): any;
declare function randomProperty(obj: any): any;
declare function statGen(modifier?: number): number;
declare class Attributes {
    str: number;
    dex: number;
    con: number;
    wis: number;
    int: number;
    cha: number;
    constructor(str?: number, dex?: number, con?: number, wis?: number, int?: number, cha?: number);
    get strMod(): number;
    get dexMod(): number;
    get conMod(): number;
    get wisMod(): number;
    get intMod(): number;
    get chaMod(): number;
}
declare class Stats {
    attributes: Attributes;
    speed: number;
    size: string;
    ac: number;
    hp: number;
    constructor(attributes: Attributes | undefined, speed: number | undefined, size: string | undefined, ac: number, hp: number);
}
declare class LocalStorageHelper {
    get day(): number;
    get hour(): number;
    get isGM(): boolean;
    set isGM(value: boolean);
    get month(): number;
    /** Influences how some pages display and function. */
    get ruleSet(): RuleSet;
    /** Influences how some pages display and function. */
    set ruleSet(value: RuleSet);
    get showGMNotes(): boolean;
    set showGMNotes(value: boolean);
    get userId(): number;
    set userId(value: number);
    get userName(): string;
    set userName(value: string);
    get year(): number;
}
/** Helps present correct terminology for different RPG rule sets. All strings are returned in title case unless otherwise noted. */
declare class TerminologyHelper {
    Item: {
        readonly Level: "Rarity" | "Level";
    };
    System: {
        /** The generally accepted community abbreviation for the system (e.g. '5e', 'PF2e') */
        readonly Abbreviation: "5e" | "PF2e";
        readonly EditionAbbreviation: "5e" | "2e";
        readonly GameAbbreviation: "D&D" | "PF";
        readonly GameFullName: "Dungeons & Dragons" | "Pathfinder";
    };
    get is5e(): boolean;
    get isPF2e(): boolean;
}
/** A wrapper for generic things that will likely be needed all over the place. */
declare class SethCommon {
    LocalStorage: LocalStorageHelper;
    Terminology: TerminologyHelper;
}
/**Global constant for SethCommon. */
declare const Sc: SethCommon;
/**Global constant for LocalStorageHelper. */
declare const storage: LocalStorageHelper;
