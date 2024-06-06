declare type NameDataBlockConvention = "age" | "gendered" | "parts";
/** A block of data using a gendered convention */
interface INameDataBlock {
    /** Indicates what convention is used for this block. */
    convention: NameDataBlockConvention;
}
/** A block of data using a gendered convention */
interface IGenderedNameData extends INameDataBlock {
    convention: "gendered";
    /**gender neutral names */
    neutral: string[];
    feminine: string[];
    masculine: string[];
}
/** A block of data using predefined phonemes to create names */
interface INamePartData extends INameDataBlock {
    /** a series of arrays from which to create names. Adds syllables from these child arrays in ascending order. */
    sets: string[][];
    /** the number of syllables to add from each array of phonemes */
    repeats: number;
}
/** A block of data using an age-based convention */
interface IAgeNameData extends INameDataBlock {
    convention: "age";
    child?: string[];
    youngAdult?: string[];
    adult?: string[];
    old?: string[];
    /** Force the Child age to use the names from a different age. */
    overrideChild?: AgeCategory;
    /** Force the Young Adult age to use the names from a different age. */
    overrideYoungAdult?: AgeCategory;
    /** Force the Adult age to use the names from a different age. */
    overrideAdult?: AgeCategory;
    /** Force the Old age to use the names from a different age. */
    overrideOld?: AgeCategory;
}
/** A collection of data blocks listing names for a culture */
interface INameDataCultureBlock {
    first: INameDataBlock | IGenderedNameData | INamePartData;
    nickname?: INameDataBlock;
    last: string[] | INameDataBlock | IAgeNameData;
}
declare const NameDatabase: {
    [key: string]: INameDataCultureBlock;
};
declare const NameGenerator: {
    first: (species?: string, gender?: string, age?: string) => string;
    last: (species?: string, gender?: string, age?: string) => string;
    full: (species?: string, gender?: string, age?: string) => string;
};
declare function getNameFromGender(gender: string, genderNeutralNames: string[], feminineNames: string[], masculineNames: string[]): string;
declare function getNameFromBlock(gender: string, age: string, block: IGenderedNameData): string;
declare const NameDataHelperMethods: {
    CollectionHelpers: {
        getPossibleNamesForAge(nameData: IAgeNameData, age: AgeCategory): string[];
        getAgeNameCollectionFromOverride(nameData: IAgeNameData, override: AgeCategory): string[];
    };
    Counters: {
        FirstName: {
            total: (cultureBlock: INameDataCultureBlock) => number;
            totalReportRow: (cultureBlock: INameDataCultureBlock) => string;
        };
        LastName: {
            total: (cultureBlock: INameDataCultureBlock) => number;
            totalReportRow: (cultureBlock: INameDataCultureBlock) => string;
        };
        FullName: {
            /** Doesn't factor in possible restrictions preventing some combinations of surname and given name, so this is really only a rough estimate */
            combinedTotal: (cultureBlock: INameDataCultureBlock) => number;
        };
    };
    TypeCheckers: {
        isAge: (dataBlock: INameDataBlock) => dataBlock is IAgeNameData;
        isGendered: (dataBlock: INameDataBlock) => dataBlock is IGenderedNameData;
    };
};
