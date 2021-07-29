/// <reference types="react" />
interface ILayeredMapProps {
    /**
     * Indicates whether or not layers beneath the active one should also be displayed.
     */
    displayStack: boolean;
    layers: string[];
}
interface ILayeredMapState {
    currentLayer: number;
}
declare class LayeredMap extends React.Component<ILayeredMapProps, ILayeredMapState> {
    constructor(props: ILayeredMapProps);
    render(): JSX.Element;
    changeLayer(event: React.ChangeEvent): void;
}
interface ILayeredMapLayerProps {
    imageUrl: string;
}
declare class LayeredMapLayer extends React.Component<ILayeredMapLayerProps> {
    render(): JSX.Element;
}
