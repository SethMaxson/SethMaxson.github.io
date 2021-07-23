/// <reference types="react" />
declare class RegionCensusViewer extends ModalWindow {
    constructor(container: string);
    close(): void;
    displayCity(city: ICity): void;
}
interface IRegionCensusContainerProps {
    regionCensus: IRegionCensus[];
}
interface IRegionCensusContainerState {
    currentRegion: IRegionCensus | undefined;
}
declare class RegionCensusContainer extends React.Component<IRegionCensusContainerProps, IRegionCensusContainerState> {
    constructor(props: IRegionCensusContainerProps);
    render(): JSX.Element;
    displayRegion(region: IRegionCensus | undefined): void;
    home(): void;
}
interface IRegionCensusProps {
    JsonObject: IRegionCensus;
}
declare class RegionCensus extends React.Component<IRegionCensusProps> {
    render(): JSX.Element;
}
interface IRegionCensusNavigationProps {
    regions: IRegionCensus[] | undefined;
    displayRegion: {
        (region: IRegionCensus | undefined): void;
    };
}
declare class RegionCensusNavigation extends React.Component<IRegionCensusNavigationProps> {
    navigate(region: IRegionCensus): void;
    render(): JSX.Element | null;
}
