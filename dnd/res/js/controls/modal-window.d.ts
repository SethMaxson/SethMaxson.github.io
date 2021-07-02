/// <reference types="jquery" />
/// <reference types="jqueryui" />
/// <reference types="react" />
declare class ModalWindow {
    reactRef: ReactHideableContainer | null;
    reactComponentMounted: boolean;
    element: JQuery<HTMLDivElement>;
    constructor(container: string);
    close(): void;
    dispose(): void;
    open(): void;
    mountReact(element: React.SFCElement<any> | React.SFCElement<any>[]): void;
    private unmountReact;
}
interface ICharacterPortraitProps {
    image: string;
}
declare class CharacterPortrait extends React.Component<ICharacterPortraitProps> {
    render(): JSX.Element;
}
interface ICharacterNameProps {
    name: string;
    tagline: string;
}
declare class CharacterName extends React.Component<ICharacterNameProps> {
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
interface IParagraphFromRawHTMLProps {
    text: string;
}
declare class ParagraphFromRawHTML extends React.Component<IParagraphFromRawHTMLProps> {
    render(): JSX.Element;
}
interface IModalWindowExitButtonProps {
    onClick: {
        (): void;
    };
}
declare class ModalWindowExitButton extends React.Component<IModalWindowExitButtonProps> {
    render(): JSX.Element;
}
interface IReactHideableContainerProps {
}
interface IReactHideableContainerState {
    showComponent: boolean;
}
declare class ReactHideableContainer<T extends IReactHideableContainerProps = IReactHideableContainerProps, T2 extends IReactHideableContainerState = IReactHideableContainerState> extends React.Component<T, IReactHideableContainerState> {
    constructor(props: IReactHideableContainerProps);
    hide(): void;
    show(): void;
    renderIfAppropriate(element: JSX.Element): JSX.Element | null;
}
interface ICharacterSlideProps {
    JsonObject: {
        information: string[];
        name: string;
        themeColor: string;
        tagline: string;
        alignment: string;
        firstAppearance: string;
        race: string;
        class: string;
        totalAppearances: number;
        image: string;
        description: string;
    };
}
declare class CharacterSlide extends ReactHideableContainer<ICharacterSlideProps, IReactHideableContainerState> {
    constructor(props: ICharacterSlideProps);
    render(): JSX.Element | null;
}
interface ICityBlurbProps {
    JsonObject: ICity;
}
declare class CityBlurb extends ReactHideableContainer<ICityBlurbProps, IReactHideableContainerState> {
    constructor(props: ICharacterSlideProps);
    render(): JSX.Element | null;
}
declare const CITY: ICity;
declare const CHARACTER: {
    name: string;
    tagline: string;
    image: string;
    themeColor: string;
    alignment: string;
    race: string;
    class: string;
    firstAppearance: string;
    totalAppearances: number;
    titles: string[];
    dmNotes: string[];
    description: string;
    information: string[];
};
