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
class CityBlurb extends ReactHideableContainer {
    constructor(props) {
        super(props);
    }
    render() {
        return (super.renderIfAppropriate(React.createElement("div", null,
            React.createElement("h1", null, this.props.JsonObject.name),
            this.props.JsonObject.description.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
            this.props.JsonObject.culture.length > 0 && React.createElement("h2", null, "Culture."),
            this.props.JsonObject.culture.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
            this.props.JsonObject.dmNotes.map((paragraph, index) => React.createElement("p", { className: "dmnotes", style: { display: 'none' } }, paragraph)),
            this.props.JsonObject.url.length > 1 && React.createElement("a", { href: this.props.JsonObject.url }, ">City Details<"))));
    }
}
//# sourceMappingURL=city-blurb-viewer.js.map