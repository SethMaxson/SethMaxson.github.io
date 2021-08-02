/// <reference types="react" />
interface IMapLayerObject {
    name: string;
    popoverText: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
}
interface IMapLayer {
    image: string;
    objects: IMapLayerObject[];
}
interface ILayeredMapProps {
    /**
     * Indicates whether or not layers beneath the active one should also be displayed.
     */
    displayStack: boolean;
    layers: IMapLayer[];
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
    layer: IMapLayer;
}
declare class LayeredMapLayer extends React.Component<ILayeredMapLayerProps> {
    render(): JSX.Element;
}
