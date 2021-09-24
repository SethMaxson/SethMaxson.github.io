interface IRacialAppearanceSet {
    baseHeight: string;
    heightModifier: string;
    baseWeight: number;
    weightModifier: string;
    /**Stature ratio (male to female) */
    statureRatio: number;
}
declare const RacialAppearance: {
    misc: IRacialAppearanceSet;
    [key: string]: IRacialAppearanceSet | undefined;
};
