declare var races: string[];
declare var racesWeighted: IWeightedKeyList;
declare var spawnFrequencySum: number;
declare const totaledWeights: {
    Adjectives: number;
    Age: number;
    From: number;
    Personality: number;
    Profession: number;
    Race: number;
    Threat: number;
    Who: number;
};
declare const adjectives: string[];
declare const threatLevels: IWeightedKeyList;
declare var professions: IWeightedKeyList;
declare var AgeRanks: {
    1: number;
    2: number;
    3: number;
    4: number;
};
declare var AgeList: string[];
declare var PersonalityList: string[];
declare var FromList: string[];
declare var WhoList: string[];
declare function getArticle(word: string): string;
/**
 * Is this NPC a 'he', 'she', or 'they'?
 * @param gender e.g. 'female', 'male', etc.
 */
declare function getPronoun(gender: string): string;
/**
 * Determines which word is correct for the specified pronoun based on an array of possible values
 * @param pronoun The pronoun from which to determine the correct word
 * @param wordForms Possible word forms. The first index is for 'he' or 'she'. The second is for 'they'.
 */
declare function conjugate(pronoun: string, wordForms: string[]): string;
declare function getNPCOldness(npc: NPC): number;
declare function randomizeNPC(npc: NPC, name?: string, race?: string, gender?: string, age?: number | string, alignment?: string): void;
/**
 * Sets the age properties for an NPC.
 * @param npc Target NPC
 * @param rt The Traits for the NPC's species
 * @param ageCategory On a scale of 1-4, how old are they?
 */
declare function getNPCAge(npc: NPC, rt: RacialTraitSet, ageCategory?: number | string): void;
declare function getNPCDescription(race?: string, age?: string, profession?: string, gender?: string): string;
declare function initializeNPCGen(): void;
declare function testRaceMapping(): void;
