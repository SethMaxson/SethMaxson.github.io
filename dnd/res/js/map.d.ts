/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare const kmppx = 1;
declare var airshipGrid: number;
declare var dragging: boolean;
declare var dragStartX: number, dragStartY: number, dragStopX: number, dragStopY: number;
declare var shiftkey: boolean;
declare var ctrlkey: boolean;
declare const keys: {
    ctrl: boolean;
    shift: boolean;
};
declare var centerX: any;
declare function initializeMap(): void;
declare function Airship(left: string, top: string, name?: string, image?: string, crew?: string[]): void;
declare function Pedestrian(left?: string, top?: string, name?: string | string[], image?: string | string[]): void;
declare function PedestrianNPC(left?: string, top?: string, name?: string | string[], image?: string | string[]): void;
declare function PartyBattle(left?: string, top?: string, name?: string | string[], image?: string | string[], target?: string): void;
declare function FlyingThing(left?: string, top?: string, name?: string | string[], image?: string | string[]): void;
declare function partyDrag(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams, speed: number): void;
declare function partyDragStop(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams): void;
declare function partyDragStart(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams): void;
declare function partyDroppable(): void;
declare function characterList(characters: string[]): string;
declare function CrewManager(object1: any, object2: any, name1: string, name2: string): void;
declare function SortByY(a: HTMLElement, b: HTMLElement): 1 | -1 | 0;
declare function updateMapCSSForZoom(zoom: number): void;
declare function handleZoomUpdate(delta: number): void;
