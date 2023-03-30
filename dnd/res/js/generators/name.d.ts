declare type NameDataBlockConvention = "gendered" | "parts";
/** A block of data using a gendered convention */
interface INameDataBlock {
    /** Indicates what convention is used for this block. */
    convention: string;
}
/** A block of data using a gendered convention */
interface IGenderedNameData extends INameDataBlock {
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
/** A collection of data blocks listing names for a culture */
interface INameDataCultureBlock {
    first: INameDataBlock;
    nickname?: INameDataBlock;
    last: string[];
}
declare const NameDatabase: {
    aarakocra: {
        first: {
            convention: string;
            neutral: string[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    anime: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    brokkos: {
        first: {
            convention: string;
            neutral: never[];
            feminine: never[];
            masculine: never[];
        };
        last: never[];
    };
    dragonborn: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    drow: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    dwarf: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    elf: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    gnome: {
        first: {
            convention: string;
            neutral: never[];
            feminine: never[];
            masculine: never[];
        };
        last: string[];
    };
    goliath: {
        first: {
            convention: string;
            neutral: string[];
            feminine: never[];
            masculine: never[];
        };
        last: string[];
    };
    halfling: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    hobgoblin: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    human: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    kenku: {
        first: {
            convention: string;
            neutral: string[];
            feminine: never[];
            masculine: never[];
        };
        last: never[];
    };
    kobold: {
        first: {
            convention: string;
            neutral: string[];
            feminine: string[];
            masculine: string[];
        };
        last: never[];
    };
    lizardfolk: {
        first: {
            convention: string;
            neutral: string[];
            feminine: never[];
            masculine: never[];
        };
        last: never[];
    };
    orc: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: never[];
    };
    ratfolk: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    tabaxi: {
        first: {
            convention: string;
            neutral: string[];
            feminine: never[];
            masculine: never[];
        };
        last: string[];
    };
    tortle: {
        first: {
            convention: string;
            neutral: string[];
            feminine: never[];
            masculine: never[];
        };
        last: never[];
    };
    triton: {
        first: {
            convention: string;
            neutral: never[];
            feminine: string[];
            masculine: string[];
        };
        last: string[];
    };
    default: {
        first: {
            convention: string;
            neutral: never[];
            feminine: never[];
            masculine: never[];
        };
        last: never[];
    };
};
declare const NameGenerator: {
    first: (species?: string, gender?: string, age?: string) => string;
    last: (species?: string, gender?: string, age?: string) => string;
    full: (species?: string, gender?: string, age?: string) => string;
};
declare function getNameFromGender(gender: string, genderNeutralNames: string[], feminineNames: string[], masculineNames: string[]): string;
declare function getNameFromBlock(gender: string, age: string, block: IGenderedNameData): string;
declare const NameDataHelperMethods: {
    Counters: {
        FirstName: {
            total: (cultureBlock: INameDataCultureBlock) => number;
        };
    };
    TypeCheckers: {
        isGendered: (dataBlock: INameDataBlock) => dataBlock is IGenderedNameData;
    };
};
