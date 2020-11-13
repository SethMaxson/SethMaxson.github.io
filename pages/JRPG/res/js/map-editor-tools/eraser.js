import { MapEditorTool } from './map-editor-tool.js';
export class Eraser extends MapEditorTool {
    constructor() {
        super();
    }
    click(map) {
        if (map.lastClick.x >= 0 && map.lastClick.x < map.size.x &&
            map.lastClick.y >= 0 && map.lastClick.y < map.size.y) {
            map.data[map.lastClick.y][map.lastClick.x] = map.defaultTile;
        }
    }
    settings(main) {
        return $("");
    }
}
//# sourceMappingURL=eraser.js.map