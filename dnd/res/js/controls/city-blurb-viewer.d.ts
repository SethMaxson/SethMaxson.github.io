/// <reference types="react" />
declare class CityBlurbViewer extends ModalWindow {
    constructor(container: string);
    close(): void;
    displayCity(city: ICity): void;
}
interface ICityBlurbProps {
    JsonObject: ICity;
}
declare class CityBlurb extends ReactHideableContainer<ICityBlurbProps, IReactHideableContainerState> {
    render(): JSX.Element | null;
}
