declare type AncestryTag = "amphibian" | "animal" | "aquatic" | "cute" | "fur" | "humanlike" | "pretty" | "reptile" | "subterranean" | "tail" | "wings";
declare type CreatureSize = "Tiny" | "Small" | "Medium" | "Large";
interface IAncestryFilterableTraits {
    alignments: string[];
    /**The typical size(s) for this ancestry */
    size: CreatureSize[];
    rpgSystem: RpgSystem[];
    tags: AncestryTag[];
}
interface IRacialTraitSet {
    genders: string[];
    adultAge: number;
    maxAge: number;
    spawnFrequency: number;
    data: IAncestryFilterableTraits;
}
declare const RacialTraits: {
    misc: IRacialTraitSet;
    [key: string]: IRacialTraitSet | undefined;
};
/**
 * Returns the racial traits object for the specified species.
 * Returns the default racial traits object if no entry is found for the specified species ID.
 * @param race The ID of the target species
 */
declare function getRacialTraits(race: string): IRacialTraitSet;
/**
 * Returns a list of speciesIDs for all the species that are known to appear in at least one of the specified alignments.
 * @param alignments A list of alignments with which the returned species should be compatible.
 */
declare function getRaceByAlignment(alignments: Alignment[]): string[];
