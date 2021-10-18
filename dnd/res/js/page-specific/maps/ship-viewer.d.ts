/// <reference types="react" />
declare type TravelDirection = "down" | "left" | "right" | "up";
declare function isOfTypeTravelDirection(keyInput: string): keyInput is TravelDirection;
declare function isOfTypeShip(ship: IDeckPlan | IShip): ship is IShip;
declare const GALLEON: IDeckPlan;
interface IShipViewerMenuProps {
    shipIndex: IShipIndexEntry[];
    changeShip: {
        (shipFile: string): void;
    };
}
declare class ShipViewerMenu extends React.Component<IShipViewerMenuProps> {
    render(): JSX.Element;
}
interface IShipViewerPageProps {
    data: IShipIndex;
}
interface IShipViewerPageState {
    currentShip: IDeckPlan;
    mapTokens: IMapToken[];
    shipIndex: {
        name: string;
        file: string;
    }[];
}
declare class ShipViewerPage extends React.Component<IShipViewerPageProps, IShipViewerPageState> {
    constructor(props: IShipViewerPageProps);
    render(): JSX.Element;
    changeShip: (shipName: string) => void;
    loadShip: (ship: IDeckPlan) => void;
}
interface IShipIndexEntry {
    file: string;
    name: string;
}
interface IShipIndex {
    deckPlans: {
        option: string;
        value: string;
    }[];
    ships: {
        option: string;
        value: string;
    }[];
}
declare const SHIPDATA: IShipIndex;
