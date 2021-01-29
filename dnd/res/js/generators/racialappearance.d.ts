interface RacialAppearanceSet {
    baseHeight: string;
    heightModifier: string;
    baseWeight: number;
    weightModifier: string;
    /**Stature ratio (male to female) */
    statureRatio: number;
}
declare const RacialAppearance: {
    misc: RacialAppearanceSet;
    [key: string]: RacialAppearanceSet | undefined;
};
