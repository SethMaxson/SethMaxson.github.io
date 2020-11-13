export class Reticle {
    constructor(parent) {
        this._target = "";
        this.parent = parent;
    }
    get element() {
        return this.parent.$(".reticle");
    }
    get label() {
        return this.parent.$(".target-label").html();
    }
    set label(value) {
        if (this._target != value) {
            this._target = value;
            this.parent.$(".target-label").html(value);
        }
    }
    target(disposition) {
        if (disposition == undefined) {
            this.element[0].style.borderColor = "rgba(255,255,255, 0.4)"; // Reset to default
        }
        else {
            // TODO: Add handling for non-hostiles
            this.element[0].style.borderColor = "rgba(200,50,50,0.9)"; // Hostile
        }
    }
}
//# sourceMappingURL=reticle.js.map