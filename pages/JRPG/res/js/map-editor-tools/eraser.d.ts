/// <reference types="jquery" />
import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';
export declare class Eraser extends MapEditorTool {
    constructor();
    click(map: LevelMap): void;
    settings(main: MapEditor): JQuery<HTMLElement>;
}
