interface IDeity {
    Description: string;
    Title: string;
    Symbol: string;
    Alignment: Alignment;
}
interface IDeadDeity extends IDeity {
    Station: "Prime" | "Demigod";
    DeathYear?: number;
}
declare const Deities: {
    PrimePantheon: {
        [key: string]: IDeity;
    };
    Demigods: {
        [key: string]: IDeity;
    };
    Deadgods: {
        [key: string]: IDeadDeity;
    };
};
