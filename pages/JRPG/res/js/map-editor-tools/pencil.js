import { MapEditorTool } from './map-editor-tool.js';
export class Pencil extends MapEditorTool {
    constructor() {
        super();
        this.tile = 1;
        this.radius = 1;
        this.imagePath = "/pages/jrpg/images/tilesets/WorldMap_Tileset.png";
    }
    click(map) {
        if (map.lastClick.x >= 0 && map.lastClick.x < map.size.x &&
            map.lastClick.y >= 0 && map.lastClick.y < map.size.y) {
            if (this.radius > 1) {
                // If radius is greater than one, apply pencil to all tiles in range.
                let effectiveRadius = this.radius - 1;
                let min = { x: Math.max(map.lastClick.x - effectiveRadius, 0), y: Math.max(map.lastClick.y - effectiveRadius, 0) };
                let max = { x: Math.min(map.lastClick.x + effectiveRadius, map.size.x), y: Math.min(map.lastClick.y + effectiveRadius, map.size.y) };
                for (let y = min.y; y < max.y; y++) {
                    const row = map.data[y];
                    for (let x = min.x; x < max.x; x++) {
                        row[x] = this.tile;
                    }
                }
            }
            else {
                map.data[map.lastClick.y][map.lastClick.x] = this.tile;
            }
        }
    }
    settings(main) {
        return $(`
			<label for="button-open-tileset">Open Tileset:</label><input type="file" id="button-open-tileset" name="button-open-tileset" accept=".jpg, .png, .gif, .bmp" />
			<img class="pencil-tile-selector" src="${this.imagePath}" />
			<label for="pencil-radius-selector">Pencil Radius:</label><input type="range" name="pencil-radius-selector" class="pencil-radius-selector" min="1" max="20" step="1" value="${this.radius}" />
		`);
    }
}
//# sourceMappingURL=pencil.js.map