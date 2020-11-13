import { MapEditorTool } from './map-editor-tool.js';
export class Reference extends MapEditorTool {
    constructor() {
        super();
        this.opacity = 0.0;
    }
    click(map) {
        return;
    }
    settings(main) {
        return $(`
			<label for="button-open-reference">Open Reference Image:</label><input type="file" id="button-open-reference" name="button-open-reference" accept=".jpg, .png, .gif, .bmp" />
			<input type="range" class="reference-opacity-selector" min="0" max="1" step="0.1" value="${this.opacity}" />
		`);
    }
}
//# sourceMappingURL=reference.js.map