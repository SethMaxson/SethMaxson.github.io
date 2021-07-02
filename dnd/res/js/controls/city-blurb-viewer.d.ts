declare class CityBlurbViewer extends ModalWindow {
    constructor(container: string);
    close(): void;
    displayCity(city: ICity): void;
}
