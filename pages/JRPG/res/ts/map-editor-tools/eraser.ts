import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';

export class Eraser extends MapEditorTool {
	constructor() {
		super();
	}
	click(map: LevelMap)
	{
		if (map.lastClick.x >= 0 && map.lastClick.x < map.size.x &&
			map.lastClick.y >= 0 && map.lastClick.y < map.size.y)
		{
			map.data[map.lastClick.y][map.lastClick.x] = map.defaultTile;
		}
	}
	settings(main: MapEditor)
	{
		return $("");
	}
}