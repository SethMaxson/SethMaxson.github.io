export declare module SHIP {
    interface Starship {
        Name: string;
        Tier: number;
        Size: Size;
        Frame: Frame;
        Speed: number;
        Maneuverability: number;
        Drift: number;
    }
    enum Size {
        Tiny = 0,
        Small = 1,
        Medium = 2,
        Large = 3,
        Huge = 4,
        Gargantuan = 5,
        Colossal = 6
    }
    enum Frame {
        Battleship = 0,
        BulkFreighter = 1,
        Carrier = 2,
        Cruiser = 3,
        Destroyer = 4,
        Dreadnought = 5,
        Explorer = 6,
        Fighter = 7,
        HeavyFreighter = 8,
        Interceptor = 9,
        LightFreighter = 10,
        Racer = 11,
        Shuttle = 12,
        Transport = 13
    }
}
