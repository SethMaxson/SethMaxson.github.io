interface String {
    capitalize(): string;
    replaceAll(search: string, replacement: string): string;
}
declare type Alignment = "CG" | "NG" | "LG" | "CN" | "N" | "LN" | "CE" | "NE" | "LE";
declare type ItemRarity = "None" | "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact";
declare function roll(dice: string): number;
declare function rollDie(size?: number, modifier?: number, advantage?: number): number;
declare function getRandomInt(start: number, end: number): number;
declare function chance(percent?: number): boolean;
declare function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K];
declare function GetURLParameter(sParam: string): string | null;
declare function arrayAppend(array: any, item: any): Array<any>;
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
    get showGMNotes(): boolean;
    set showGMNotes(value: boolean);
    get userId(): number;
    set userId(value: number);
    get userName(): string;
    set userName(value: string);
    get year(): number;
}
declare const storage: LocalStorageHelper;
