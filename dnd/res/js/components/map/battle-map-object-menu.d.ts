/// <reference types="react" />
interface IBattleMapObjectMenuProps {
    CurrentLayer: number;
    DisplayLocations: boolean;
    FloorPlan: IDeckPlan;
    CloseMenu: {
        (): void;
    };
    SetCurrentLayer: {
        (currentLayer: number): void;
    };
    SetDisplayNotableLocations: {
        (displayNotableLocations: boolean): void;
    };
}
declare class BattleMapObjectMenu extends React.Component<IBattleMapObjectMenuProps> {
    render(): JSX.Element;
}
