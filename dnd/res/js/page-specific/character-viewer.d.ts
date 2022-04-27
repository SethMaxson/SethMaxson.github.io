/// <reference types="react" />
declare type CharacterStatus = "Fine" | "Fallen" | "Missing" | "Unknown";
interface ICharacterPortraitProps {
    image: string;
}
declare class CharacterPortrait extends React.Component<ICharacterPortraitProps> {
    render(): JSX.Element;
}
interface ICharacterNameProps {
    name: string;
    status: CharacterStatus;
    tagline: string;
}
declare class CharacterName extends React.Component<ICharacterNameProps> {
    static defaultProps: {
        status: string;
    };
    render(): JSX.Element;
}
interface ICharacterPropertiesProps {
    alignment: string;
    firstAppearance: string;
    race: string;
    class: string;
    totalAppearances: number;
}
declare class CharacterProperties extends React.Component<ICharacterPropertiesProps> {
    render(): JSX.Element;
}
interface ICharacterTitlesProps {
    titles: string[];
}
declare class CharacterTitles extends React.Component<ICharacterTitlesProps> {
    render(): JSX.Element | null;
}
interface ICharacterSlideObject {
    dmNotes: string[];
    information: string[];
    titles: string[];
    name: string;
    themeColor: string;
    tagline: string;
    alignment: Alignment;
    firstAppearance: string;
    race: string;
    class: string;
    totalAppearances: number;
    image: string;
    description: string;
    status: CharacterStatus;
}
interface ICharacterViewProps {
    JsonObject: ICharacterSlideObject;
}
interface ICharacterViewState {
}
declare class CharacterView extends React.Component<ICharacterViewProps, ICharacterViewState> {
    constructor(props: ICharacterViewProps);
    render(): JSX.Element;
}
interface ICharacterViewerProps {
    characters: ICharacterSlideObject[];
}
interface ICharacterViewerState {
    selectedCharacter: ICharacterSlideObject;
    selectedIndex: number;
    viewingItem: boolean;
}
declare class CharacterViewer extends React.Component<ICharacterViewerProps, ICharacterViewerState> {
    constructor(props: ICharacterViewerProps);
    render(): JSX.Element;
    changeCharacter(index: number): void;
}
declare const CHARACTERS: ICharacterSlideObject[];
