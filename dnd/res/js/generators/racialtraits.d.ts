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
declare function getRacialTraits(race: string): RacialTraitSet;
/**
 * Returns a list of speciesIDs for all the species that are known to appear in at least one of the specified alignments.
 * @param alignments A list of alignments with which the return species should be compatible.
 */
declare function getRaceByAlignment(alignments: Alignment[]): string[];
