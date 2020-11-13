import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';

export class CollisionPencil extends MapEditorTool
{
	tile: number;
	constructor() {
		super();
		this.tile = 1;
	}
	click(map: LevelMap)
	{
		if (map.lastClick.x >= 0 && map.lastClick.x < map.size.x &&
			map.lastClick.y >= 0 && map.lastClick.y < map.size.y)
		{
			map.collision[map.lastClick.y][map.lastClick.x] = this.tile;
		}
	}
	settings(main: MapEditor)
	{
		return $(`<img class="collision-pencil-tile-selector" src="/pages/jrpg/images/tilesets/collision_tileset.png" />`);
	}
}