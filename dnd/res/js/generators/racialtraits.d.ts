interface IRacialTraitSet {
    genders: string[];
    adultAge: number;
    maxAge: number;
    alignments: string[];
    spawnFrequency: number;
}
declare const RacialTraits: {
    misc: IRacialTraitSet;
    [key: string]: IRacialTraitSet | undefined;
};
declare function getRacialTraits(race: string): IRacialTraitSet;
/**
 * Returns a list of speciesIDs for all the species that are known to appear in at least one of the specified alignments.
 * @param alignments A list of alignments with which the return species should be compatible.
 */
declare function getRaceByAlignment(alignments: Alignment[]): string[];
