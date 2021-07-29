/// <reference types="react" />
declare type KillingGameMenuDisplay = "Character" | "Diorama" | "Menu";
declare type KillingGameGender = "Male" | "Female";
declare type KillingGameStatus = "Alive" | "Dead" | "Missing" | "Unknown";
interface IKillingGameCharacter extends INPC {
    /**Should be 0-1 */
    desperation: number;
    dmNotes: string[];
    gender: KillingGameGender;
    image: string;
    information: string[];
    /**Should be 0-1 */
    killingInstinct: number;
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
}
declare class KillingGameViewerNav extends React.Component<IKillingGameViewerNavProps> {
    render(): JSX.Element;
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
    mapLayers: string[];
    misc: IDioramaProps[];
}
declare const KILLINGGAMEDATA: IKillingGameIndex;
