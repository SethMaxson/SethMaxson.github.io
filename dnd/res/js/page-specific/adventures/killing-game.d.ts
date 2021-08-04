/// <reference types="react" />
declare type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
declare type KillingGameMenuActiveTab = "character" | "evidence" | "map" | "rules" | "prizes" | "trial";
declare type KillingGameGender = "Male" | "Female";
declare type KillingGameStatus = "Alive" | "Dead" | "Missing" | "Unknown";
declare function isOfTypeTab(keyInput: string): keyInput is KillingGameMenuActiveTab;
interface IKillingGameCharacter extends INPC {
    /**Should be 0-1 */
    desperation: number;
    dmNotes?: string[];
    dislikes: string[];
    gender: KillingGameGender;
    image: string;
    /**Should be 0-1 */
    killingInstinct: number;
    likes: string[];
    status: KillingGameStatus;
    title: string;
}
interface IKillingGameViewerProps {
    data: IKillingGameIndex;
}
interface IKillingGameViewerState {
    dioramaShownAtLoad: boolean;
    displayType: KillingGameMenuDisplay;
    selectedCharacter: IKillingGameCharacter;
    selectedDiorama: IDioramaProps;
}
declare class KillingGameViewer extends React.Component<IKillingGameViewerProps, IKillingGameViewerState> {
    constructor(props: IKillingGameViewerProps);
    render(): JSX.Element;
    viewCharacter(character: IKillingGameCharacter): void;
    viewDiorama(diorama: IDioramaProps): void;
    viewMenu(): void;
}
interface IKillingGameViewerNavProps {
    data: IKillingGameIndex;
    displayCharacter: {
        (character: IKillingGameCharacter): void;
    };
    showEvidenceTab: boolean;
    showTrialTab: boolean;
}
interface IKillingGameViewerNavState {
    activeTab: KillingGameMenuActiveTab;
}
declare class KillingGameViewerNav extends React.Component<IKillingGameViewerNavProps, IKillingGameViewerNavState> {
    constructor(props: IKillingGameViewerNavProps);
    render(): JSX.Element;
    changeTab(tab: KillingGameMenuActiveTab): void;
}
interface IKillingGameCharacterPageProps {
    character: IKillingGameCharacter;
    close: {
        (): void;
    };
}
declare class KillingGameCharacterPage extends React.Component<IKillingGameCharacterPageProps> {
    render(): JSX.Element;
}
interface IKillingGameVoteResultsProps {
    image: string;
    percentage: number;
}
declare class KillingGameVoteResults extends React.Component<IKillingGameVoteResultsProps> {
    render(): JSX.Element;
}
interface ICharacterLinkProps {
    character: IKillingGameCharacter;
    onClick: {
        (character: IKillingGameCharacter): void;
    };
}
declare class CharacterLink extends React.Component<ICharacterLinkProps> {
    render(): JSX.Element;
}
interface IKillingGameIndex {
    characters: IKillingGameCharacter[];
    mapLayers: IMapLayer[];
    misc: IDioramaProps[];
}
declare const KILLINGGAMEDATA: IKillingGameIndex;
