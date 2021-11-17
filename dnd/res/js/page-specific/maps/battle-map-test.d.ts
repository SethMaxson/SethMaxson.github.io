/// <reference types="react" />
declare const MACAW: IDeckPlan;
interface IBattleMapMenuProps {
    shipIndex: IShipIndexEntry[];
}
declare class BattleMapMenu extends React.Component<IBattleMapMenuProps> {
    render(): JSX.Element;
}
interface IBattleMapTestPageProps {
    data: IShipIndex;
}
interface IBattleMapTestPageState {
    currentShip: IDeckPlan;
    mapTokens: IMapToken[];
    shipIndex: {
        name: string;
        file: string;
    }[];
}
declare class BattleMapTestPage extends React.Component<IBattleMapTestPageProps, IBattleMapTestPageState> {
    constructor(props: IBattleMapTestPageProps);
    render(): JSX.Element;
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
declare const SHIPDATA2: IShipIndex;
