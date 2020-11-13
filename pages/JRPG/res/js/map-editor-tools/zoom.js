import { MapEditorTool } from './map-editor-tool.js';
export class Zoom extends MapEditorTool {
    constructor() {
        super();
        this.step = 0.25;
        this.min = 0.25;
        this.max = 3;
        this.value = 1;
    }
    click(map) {
        return;
    }
    settings(main) {
        return $(`<input type="range" class="zoom-level-selector" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />`);
    }
}
//# sourceMappingURL=zoom.js.map