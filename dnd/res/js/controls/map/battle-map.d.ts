/// <reference types="react" />
interface I2DPoint {
    x: number;
    y: number;
}
interface ICreatureToken extends ICrewMember {
    dragging: boolean;
}
interface IBattleMapLayer {
    /**The url of the image representing this map layer. */
    image: string;
    /**The technical name of this map layer */
    name: string;
    /**Noteworthy locations (such as landmarks or buildings) on this map layer. */
    locations: IDeckLocation[];
    /**Any crew members present on this deck. */
    crew?: ICreatureToken[];
}
interface IBattleMap {
    name: string;
    width: number;
    height: number;
    gridSize: number;
    decks: IBattleMapLayer[];
}
interface IBattleMapProps {
    DeckPlan: IDeckPlan;
    DisplayClouds: boolean;
    DisplayGrid: boolean;
    DisplayWaves: boolean;
    MaximumZoom: number;
    MinimumZoom: number;
    Precision: number;
}
interface IBattleMapState {
    battleMap: IBattleMap;
    capturedStartLocation: boolean;
    currentDeck: number;
    displayLocations: boolean;
    displayMenu: boolean;
    /**Indicates whether an item in the map is currently being dragged. */
    dragging: boolean;
    dragStartX: number;
    dragStartY: number;
    dragEndX: number;
    dragEndY: number;
    lastPositionX: number;
    lastPositionY: number;
    mapPosition: I2DPoint;
    initialMapPosition: I2DPoint;
    zoom: number;
}
declare class BattleMap extends React.Component<IBattleMapProps, IBattleMapState> {
    static defaultProps: {
        DisplayClouds: boolean;
        DisplayGrid: boolean;
        DisplayWaves: boolean;
        MaximumZoom: number;
        MinimumZoom: number;
        Precision: number;
    };
    constructor(props: IBattleMapProps);
    componentWillReceiveProps(nextProps: IBattleMapProps): void;
    render(): JSX.Element;
    getActiveMapLayer: () => IBattleMapLayer;
    getDraggedCreature: () => ICreatureToken | undefined;
    getRelativeMousePosition: (e: React.MouseEvent, isMapSubObject?: boolean) => {
        x: number;
        y: number;
    };
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseWheel: (e: React.WheelEvent) => void;
    dragCreatureStart: (creatureName: string, e: React.MouseEvent) => void;
    dragMapStart: (e: React.MouseEvent) => void;
    dragStop: () => void;
    zoom: (zoom: number) => void;
}
interface IBattleMapLayerProps {
    displayLocations: boolean;
    dragStart: {
        (creatureName: string, e: React.MouseEvent): void;
    };
    isWideShot: boolean;
    object: IBattleMapLayer;
}
declare class BattleMapLayer extends React.Component<IBattleMapLayerProps> {
    static defaultProps: {
        displayLocations: boolean;
    };
    render(): JSX.Element;
}
interface IBattleMapLocationProps {
    object: IDeckLocation;
}
declare class BattleMapLocation extends React.Component<IBattleMapLocationProps> {
    render(): JSX.Element;
}
interface ICreatureTokenProps {
    dragStart: {
        (creatureName: string, e: React.MouseEvent): void;
    };
    isWideShot: boolean;
    object: ICreatureToken;
}
declare class CreatureToken extends React.Component<ICreatureTokenProps> {
    render(): JSX.Element;
}
declare function restrictNumberToRange(value: number, lowerLimit: number, upperLimit: number): number;
