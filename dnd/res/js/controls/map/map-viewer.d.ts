/// <reference types="react" />
declare type ButtonClickFunction = {
    (args?: any): void;
};
declare type ToggleChangeFunction = {
    (toggleValue: boolean): void;
};
declare type Size2D = {
    height: number;
    width: number;
};
declare type Position2D = {
    left: string;
    top: string;
};
interface IMapZoom {
    currentZoom: number;
    onZoom: {
        (newZoom: number): void;
    };
    maxZoom: number;
    minZoom: number;
    previousZoom: number;
    step: number;
}
interface IMapPanBounds {
    bottom: number;
    left: number;
    right: number;
    top: number;
}
interface IMapViewerProps {
    height: number;
    overlays: IMapOverlayData[];
    width: number;
}
interface IMapViewerState {
    overlayDisplay: boolean[];
    useVectorImages: boolean;
    zoom: IMapZoom;
}
declare class MapViewer extends React.Component<IMapViewerProps, IMapViewerState> {
    static defaultProps: {
        overlays: never[];
    };
    constructor(props: IMapViewerProps);
    componentDidMount: () => void;
    render(): JSX.Element;
    handleZoomChange: (newZoom: number) => void;
    setImageType(useVector: boolean): void;
    setOverlayDisplay(index: number, displayOverlay: boolean): void;
    centerMap(): void;
}
interface IMapControlsProps {
    zoom: IMapZoom;
    centerMap: ButtonClickFunction;
    overlayDisplay: boolean[];
    overlays: IMapOverlayData[];
    setImageType: ToggleChangeFunction;
    setOverlayDisplay: {
        (index: number, displayOverlay: boolean): void;
    };
}
interface IMapControlsState {
}
declare class MapControls extends React.Component<IMapControlsProps, IMapControlsState> {
    render(): JSX.Element;
}
interface IMapControlTogglerProps {
    targetID: string;
}
declare class MapControlToggler extends React.Component<IMapControlTogglerProps> {
    render(): JSX.Element;
}
interface IMapControlButtonProps {
    onClick: ButtonClickFunction;
    text: string;
}
interface IMapControlButtonState {
}
declare class MapControlButton extends React.Component<IMapControlButtonProps, IMapControlButtonState> {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    render(): JSX.Element;
}
interface IMapControlToggleProps {
    onChange: ToggleChangeFunction;
    text: string;
}
interface IMapControlToggleState {
}
declare class MapControlToggle extends React.Component<IMapControlToggleProps, IMapControlToggleState> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
interface IMapControlOverlayToggleProps {
    setOverlayDisplay: {
        (index: number, displayOverlay: boolean): void;
    };
    overlayDisplay: boolean[];
    overlays: IMapOverlayData[];
}
interface IMapControlOverlayToggleState {
}
declare class MapControlOverlayToggle extends React.Component<IMapControlOverlayToggleProps, IMapControlOverlayToggleState> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    render(): JSX.Element | null;
}
interface IMapZoomControlProps {
    zoom: IMapZoom;
}
interface IMapZoomControlState {
}
declare class MapZoomControl extends React.Component<IMapZoomControlProps, IMapZoomControlState> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
interface ILandmassData {
    id: string;
    image: {
        raster: string;
        vector?: string;
    };
    labelPosition: Position2D;
    name: string;
    position?: Position2D;
    size?: Size2D;
    translateLabel: boolean;
}
interface IMapOverlayData {
    displayedByDefault: boolean;
    image: string;
    name: string;
    opacity: number;
    zIndex: number;
}
interface IMapContainerProps {
    landmasses: ILandmassData[];
    overlayDisplay: boolean[];
    overlays: IMapOverlayData[];
    size: Size2D;
    useVectorImages: boolean;
    zoom: IMapZoom;
}
interface IMapContainerState {
}
declare class MapContainer extends React.Component<IMapContainerProps, IMapContainerState> {
    handleChange: (e: React.WheelEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
interface ILandmassProps {
    cartographer: string;
    className: string;
    fileName: string;
    image: string;
    labelPosition: {
        left: string;
        top: string;
    };
    name: string;
    translateLabel: boolean;
}
declare class Landmass extends React.Component<ILandmassProps> {
    static defaultProps: {
        cartographer: string;
        fileName: string;
        labelPosition: {
            left: string;
            top: string;
        };
        translateLabel: boolean;
    };
    render(): JSX.Element;
}
interface IAirshipProps {
    hideable: boolean;
    image: string;
    name: string;
    position: {
        left: string;
        top: string;
    };
    size: Size2D;
}
declare class AirshipReact extends React.Component<IAirshipProps> {
    static defaultProps: {
        hideable: boolean;
        image: string;
        size: {
            height: number;
            width: number;
        };
    };
    render(): JSX.Element;
}
interface IOverlayProps {
    display: string;
    image: string;
    opacity: number;
    zIndex: number;
}
declare class Overlay extends React.Component<IOverlayProps> {
    static defaultProps: {
        display: string;
        opacity: number;
        zIndex: number;
    };
    render(): JSX.Element;
}
interface IMapLabelProps {
    cartographer: string;
    fontSize: string;
    href: string;
    labelType: "city" | "continent" | "metropolis" | "village";
    name: string;
    position: {
        left: string;
        top: string;
    };
    translate: boolean;
}
declare class MapLabel extends React.Component<IMapLabelProps> {
    static defaultProps: {
        cartographer: string;
        fontSize: undefined;
        href: string;
        labelType: string;
        translate: boolean;
    };
    render(): JSX.Element;
}
interface IMapPanData {
    dx: number;
    dy: number;
    mapPanBounds: IMapPanBounds;
    scale: number;
}
declare const __mapPan: IMapPanData;
declare const __zoomBoxDimensions: {
    height: number;
    width: number;
};
declare const landmasses: ILandmassData[];
declare const overlays: IMapOverlayData[];
