import { LevelMap } from './map.js';
import { Player } from './player.js';
import { Engine } from './engine.js';
import { MapEditorTool } from './map-editor-tools/map-editor-tool.js';
import { Toolbox } from './map-editor-tools/toolbox.js';
export declare var MainProcess: MapEditor;
export declare class MapEditor extends Engine {
    map: LevelMap;
    player: Player;
    toolbox: Toolbox;
    tool: MapEditorTool | undefined;
    constructor(mapName?: string);
    resize(clearDraw?: boolean): void;
    loadMap(fileName?: string): LevelMap;
}
export declare enum MapEditTools {
    None = 0,
    Paint = 1,
    Eraser = 2
}
export declare enum MapEditModes {
    None = 0,
    EditBackground = 1,
    EditForeground = 2,
    EditCollision = 3
}
