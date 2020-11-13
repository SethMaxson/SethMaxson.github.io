import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';

export abstract class MapEditorTool
{
	abstract click(map: LevelMap): void;
	abstract settings(main: MapEditor): JQuery<HTMLElement>;
}