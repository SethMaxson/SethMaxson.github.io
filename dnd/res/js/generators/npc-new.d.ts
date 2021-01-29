declare var chance: {
    (num: number): boolean;
};
declare var rollDie: {
    (numberofFaces: number): number;
};
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
