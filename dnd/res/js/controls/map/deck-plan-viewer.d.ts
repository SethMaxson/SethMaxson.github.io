/// <reference types="react" />
interface IDeckPlanViewerProps {
    deckPlan: IDeckPlan;
    displayClouds: boolean;
    displayGrid: boolean;
    displayWaves: boolean;
}
interface IDeckPlanViewerState {
    currentDeck: number;
    displayLocations: boolean;
    displayMenu: boolean;
}
declare class DeckPlanViewer extends React.Component<IDeckPlanViewerProps, IDeckPlanViewerState> {
    static defaultProps: {
        displayClouds: boolean;
        displayGrid: boolean;
        displayWaves: boolean;
    };
    constructor(props: IDeckPlanViewerProps);
    componentWillReceiveProps(nextProps: IDeckPlanViewerProps): void;
    render(): JSX.Element;
}
interface IDeckPlanMenuProps {
    currentDeck: number;
    deckPlan: IDeckPlan;
    displayLocations: boolean;
}
declare class DeckPlanMenu extends React.Component<IDeckPlanMenuProps> {
    render(): JSX.Element;
}
interface IDeckProps {
    displayLocations: boolean;
    object: IDeck;
}
declare class Deck extends React.Component<IDeckProps> {
    static defaultProps: {
        displayLocations: boolean;
    };
    render(): JSX.Element;
}
interface IDeckLocationProps {
    object: IDeckLocation;
}
declare class DeckLocation extends React.Component<IDeckLocationProps> {
    render(): JSX.Element;
}
interface ICrewMemberProps {
    object: ICrewMember;
}
declare class CrewMember extends React.Component<ICrewMemberProps> {
    render(): JSX.Element;
}
