/// <reference types="jquery" />
declare class ThemeBenefit {
    level: number;
    name?: string;
    description?: string;
    constructor(lvl: any, name?: string, description?: string);
}
declare function getClasses(): JQuery.jqXHR<any>;
declare function getRaces(): JQuery.jqXHR<any>;
declare function getThemes(): JQuery.jqXHR<any>;
declare function getRacialTraits(): JQuery.jqXHR<any>;
declare class Race implements IRaceData {
    ability: Abilities;
    name: string;
    description: string;
    ID: string;
    hp: number;
    subrace: string;
    size: string;
    type: string;
    features: RacialBenefit[];
    source: string;
    subraces: any[];
    page: number;
    constructor(o?: any, subraceName?: string);
    get languages(): string[];
    get skills(): number[];
    getRacialBenefits(type: string): RacialBenefitPropertyEffect[];
}
interface IAbilities {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
    [key: string]: number | undefined;
}
interface IRaceData {
    name: string;
    ID: string;
    ability: IAbilities;
    hp: number;
    size: any;
    type: string;
    source: string;
    subraces: any[];
    page: number;
    description: string;
    features: any[];
}
declare class RacialBenefit {
    name: string;
    description: string;
    properties: RacialBenefitProperty[];
}
declare class RacialBenefitProperty {
    type: string;
    properties: RacialBenefitPropertyEffect[] | string[];
}
declare class RacialBenefitPropertyEffect {
    name: string;
    value: any;
}
declare class Theme {
    name: string;
    benefits: ThemeBenefit[];
    ability: Abilities;
    description: string;
    source: string;
    constructor(o?: any);
    ActiveBenefits(lvl: number): ThemeBenefit[];
}
declare class CharacterClassBonus {
    ba: string;
    fs: string;
    rs: string;
    ws: string;
}
declare class CharacterClass {
    name: string;
    hpm: number;
    spm: number;
    srpl: number;
    level: number;
    archetype?: any;
    subclass?: any;
    bonus: CharacterClassBonus;
    spellCasting: string;
    source: string;
    proficiencies: string[];
    skills: string[];
    [key: string]: any;
    constructor(o: any);
    get bab(): number;
    get fortSaveBonus(): number;
    get refSaveBonus(): number;
    get willSaveBonus(): number;
    getSaveBonus(type: string): number;
    get spellSlots(): number[];
    get spellsKnown(): number[];
}
declare class CharacterClasses {
    classes: CharacterClass[];
    get(name: string): CharacterClass | null;
    getSum(name: string): number;
    get bab(): number;
    get fortSaveBonus(): number;
    get refSaveBonus(): number;
    get willSaveBonus(): number;
    contains(name: string): boolean;
    push(obj: CharacterClass): void;
    fromLevels(levels: CharacterLevel[]): void;
    get skills(): string[];
    get spellSlots(): number[];
    get spellsKnown(): number[];
    get proficiencies(): string[];
}
declare class Abilities implements IAbilities {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    [key: string]: any;
    constructor(str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number);
    addScore(ab: any): void;
    getModifiers(): Abilities;
}
declare class MovementSpeed {
    burrow: number;
    fly: number;
    land: number;
    swim: number;
}
declare class Character {
    alignment: string;
    class?: CharacterClass;
    classes: CharacterClasses;
    classID?: string;
    defaultClass?: string;
    deity: string;
    description: string;
    gender: string;
    homeWorld: string;
    levels: CharacterLevel[];
    name?: string;
    player: string;
    race: Race;
    speed: MovementSpeed;
    spells: string[];
    theme: Theme;
    xp: number;
    [key: string]: any;
    constructor();
    get level(): number;
    get languages(): string[];
    skills(stopAt?: number): SkillMap;
    skillRanks(stopAt?: number): SkillRanks;
    getHP(stopAt?: number): number;
    getRP(stopAt?: number): number;
    getSP(stopAt?: number): number;
    benefits(stopAt?: number): (ThemeBenefit | RacialBenefit)[];
    feats(stopAt?: number): (string | undefined)[];
    hasFeat(name: string, stopAt?: number): boolean;
    get maxHP(): number;
    get hp(): number;
    get rp(): number;
    get sp(): number;
    get proficiencies(): string[];
    get bab(): number;
    get fortSaveBonus(): number;
    get refSaveBonus(): number;
    get willSaveBonus(): number;
    get classNames(): string[];
    classLevel(className: string, stopAt?: number): number;
    getAbilities(stopAt?: number): Abilities;
    getAbilityModifiers(stopAt?: number): Abilities;
    get json(): {
        name: string;
        gender: string;
        homeWorld: string;
        alignment: string;
        deity: string;
        player: string;
        description: string;
        ability: {
            pointBuy: any;
        };
        levels: CharacterLevel[];
        race: string;
        theme: string;
        defaultClass: string;
        spells: string[];
    };
    save(): void;
    loadJson(path: string): Promise<unknown>;
    get unarmedStrike(): Attack;
    get spellsKnown(): number[];
    get spellSlots(): number[];
}
declare class CharacterLevelClass {
    name: string;
    choices: any;
}
declare class CharacterLevel {
    class: CharacterLevelClass;
    skillRanks: SkillRanks;
    ability: Abilities;
    feat?: string;
    constructor(className?: string);
}
declare class SkillRanks {
    ranks: number[];
    names: string[];
    constructor();
    get(name: string): number;
    set(name: string, value: number): void;
    add(obj: SkillRanks): SkillRanks;
}
declare class SkillMap extends SkillRanks {
    classBonus: number[];
    classSkill: boolean[];
    misc: number[];
    constructor();
}
declare class SkillModifier {
    name: string;
    value: number;
    constructor(name: string, value: number);
}
declare class Attack {
    weapon: string;
    level: string;
    damage: string;
    critical: string;
    type: string;
    usage: string;
    special: string;
    constructor();
}
