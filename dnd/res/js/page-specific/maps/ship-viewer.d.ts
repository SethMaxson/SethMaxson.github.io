/// <reference types="react" />
declare type TravelDirection = "down" | "left" | "right" | "up";
declare function isOfTypeTravelDirection(keyInput: string): keyInput is TravelDirection;
declare const GALLEON: IDeckPlan;
interface IShipViewerMenuProps {
    data: IShipIndex;
}
declare class ShipViewerMenu extends React.Component<IShipViewerMenuProps> {
    render(): JSX.Element;
}
interface IShipViewerPageProps {
    data: IShipIndex;
}
interface IShipViewerPageState {
    currentShip: IDeckPlan;
}
declare class ShipViewerPage extends React.Component<IShipViewerPageProps, IShipViewerPageState> {
    constructor(props: IShipViewerPageProps);
    render(): JSX.Element;
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
