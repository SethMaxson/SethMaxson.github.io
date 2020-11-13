interface RacialTraitSet {
    genders: string[];
    adultAge: number;
    maxAge: number;
    alignments: string[];
    spawnFrequency: number;
}
declare const RacialTraits: {
    misc: RacialTraitSet;
    [key: string]: RacialTraitSet | undefined;
};
