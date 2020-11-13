import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';

export class Reference extends MapEditorTool
{
	opacity: number;
	constructor() {
		super();
		this.opacity = 0.0;
	}
	click(map: LevelMap)
	{
		return;
	}
	settings(main: MapEditor)
	{
		return $(`
			<label for="button-open-reference">Open Reference Image:</label><input type="file" id="button-open-reference" name="button-open-reference" accept=".jpg, .png, .gif, .bmp" />
			<input type="range" class="reference-opacity-selector" min="0" max="1" step="0.1" value="${this.opacity}" />
		`);
	}
}