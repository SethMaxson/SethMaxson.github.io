declare const NameGenerator: {
    first: (species?: string, gender?: string, age?: string) => string;
    last: (species?: string, gender?: string, age?: string) => string;
    full: (species?: string, gender?: string, age?: string) => string;
};
declare function getNameFromGender(gender: string, genderNeutralNames: string[], maleNames: string[], femaleNames: string[]): string;
