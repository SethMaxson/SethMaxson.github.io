declare enum NPCGenFilterCategory {
    Age = "age",
    Alignment = "alignment",
    Gender = "gender",
    Intelligence = "intelligence",
    PersonalityTags = "personality tags",
    Profession = "profession",
    Species = "species"
}
declare enum NPCGenFilterType {
    Exclude = "exclude",
    Include = "include"
}
declare enum AgeCategory {
    Child = "child",
    YoungAdult = "young adult",
    Adult = "adult",
    Old = "old"
}
interface IFilterableWeightedKeyListEntry {
    type: NPCGenFilterType;
    category: NPCGenFilterCategory;
    values: any[];
    keys: IWeightedKeyList;
}
interface IFilterableWeightedKeyList {
    generic: IWeightedKeyList;
    specific: IFilterableWeightedKeyListEntry[];
}
declare var races: string[];
declare class NPCDeepGenerator {
    totaledWeights: {
        Age: number;
        Race: number;
        Threat: number;
    };
    racesWeighted: IWeightedKeyList;
    threatLevels: IWeightedKeyList;
    intelligenceLevels: IFilterableWeightedKeyList;
    professions: IFilterableWeightedKeyList;
    PersonalityTagList: IFilterableWeightedKeyList;
    AgeList: IWeightedKeyList;
    PersonalityList: IFilterableWeightedKeyList;
    FromList: IFilterableWeightedKeyList;
    WhoList: IFilterableWeightedKeyList;
    /**
     * Determines which word is correct for the specified pronoun based on an array of possible values
     * @param pronoun The pronoun from which to determine the correct word
     * @param wordForms Possible word forms. The first index is for 'he' or 'she'. The second is for 'they'.
     */
    conjugate(pronoun: string, wordForms: string[]): string;
    getArticle(word: string): string;
    /**
     * Sets the age properties for an NPC.
     * @param npc Target NPC
     * @param rt The Traits for the NPC's species
     * @param ageCategory On a scale of 1-4, how old are they?
     */
    getNPCAge(npc: NPC, rt: IRacialTraitSet, ageCategory?: AgeCategory | AgeCategory[]): void;
    /**How attractive (cute if child) is this NPC on a scale of 1-10? */
    getNPCAttractiveness(npc: NPC): number;
    getNPCDescription(npc: NPC): string;
    getNPCHairColor(npc: NPC): string;
    getNPCHeight(npc: NPC): Length;
    getNPCOldness(npc: NPC): number;
    getNPCPersonalityTags(npc: NPC): void;
    getNPCRacialAppearance(race: string): IRacialAppearanceSet;
    /**
     * Is this NPC a 'he', 'she', or 'they'?
     * @param gender e.g. 'female', 'male', etc.
     * @param wordForms Possible word forms. Must have 3 entries. The first index is for 'they', the second for 'she', and the third for 'he'.
     */
    getPronoun(gender: string, wordForms?: string[]): string;
    getNPCGender(racialTraits: IRacialTraitSet): string;
    getNPCRace(): string;
    getRacialTraits(race: string): IRacialTraitSet;
    resolvePlaceholders(npc: NPC, stringToFix: string): string;
    initializeNPCGen(): void;
    randomizeNPC(npc: NPC, race?: string, gender?: string, age?: AgeCategory | AgeCategory[], alignment?: string): void;
}
/**
 * Returns a random value from an appropriately filtered list of weighted keys.
 * @param npc The NPC to check against the filters
 * @param filterable The filterable weighted key list to use
 */
declare function filteredWeightedRandom(npc: NPC, filterable: IFilterableWeightedKeyList): string;
/**
 * Returns an appropriately filtered list of weighted keys.
 * @param npc The NPC to check against the filters
 * @param filterable The filterable weighted key list to use
 */
declare function getFilteredWeightedKeyList(npc: NPC, filterable: IFilterableWeightedKeyList): IWeightedKeyList;
/**
 * Returns true if the IFilterableWeightedKeyListEntry is applicable, false if not.
 * @param npc The NPC to check against the filter
 * @param kle
 */
declare function isWeightedKeyListEntryApplicable(npc: NPC, kle: IFilterableWeightedKeyListEntry): boolean;
/**
 * Selects a probability weighted species from a provided subset of those available.
 * @param availableRaces The list of species from which to choose
 */
declare function getRandomRaceFromList(availableRaces: string[]): string;
