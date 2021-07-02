"use strict";
class CityBlurbViewer extends ModalWindow {
    constructor(container) {
        super(container);
    }
    close() {
        this.reactRef?.hide();
        this.element.hide();
    }
    displayCity(city) {
        let me = this;
        super.mountReact(React.createElement(CityBlurb, { JsonObject: city, ref: (component) => { me.reactRef = component; } }));
        super.open();
    }
}
//# sourceMappingURL=city-blurb-viewer.js.map