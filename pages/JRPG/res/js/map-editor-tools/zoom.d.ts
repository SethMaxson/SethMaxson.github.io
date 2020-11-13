/// <reference types="jquery" />
import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';
export declare class Zoom extends MapEditorTool {
    value: number;
    readonly step: number;
    readonly min: number;
    readonly max: number;
    constructor();
    click(map: LevelMap): void;
    settings(main: MapEditor): JQuery<HTMLElement>;
}
