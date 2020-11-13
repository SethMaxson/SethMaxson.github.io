import { MapEditorTool } from './map-editor-tool.js';
import { LevelMap } from '../map.js';
import { MapEditor } from '../map-editor.js';

export class Zoom extends MapEditorTool
{
	value: number;
	readonly step: number = 0.25;
	readonly min: number = 0.25;
	readonly max: number = 3;
	constructor() {
		super();
		this.value = 1;
	}
	click(map: LevelMap)
	{
		return;
	}
	settings(main: MapEditor)
	{
		return $(`<input type="range" class="zoom-level-selector" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />`);
	}
}