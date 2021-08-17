/// <reference types="react" />
declare class CityBlurbViewer extends ModalWindow {
    constructor(container: string);
    close(): void;
    displayCity(city: ICity): void;
}
interface ICityBlurbOffCanvasProps {
    city?: ICity;
}
declare class CityBlurbOffCanvas extends React.Component<ICityBlurbOffCanvasProps> {
    render(): JSX.Element;
}
interface ICityBlurbProps {
    JsonObject: ICity;
}
declare class CityBlurbDeprecated extends ReactHideableContainer<ICityBlurbProps, IReactHideableContainerState> {
    render(): JSX.Element | null;
}
declare class CityBlurb extends React.Component<ICityBlurbProps> {
    render(): JSX.Element;
}
