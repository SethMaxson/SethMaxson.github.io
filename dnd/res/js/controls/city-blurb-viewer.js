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
        super.mountReact(React.createElement(CityBlurbDeprecated, { JsonObject: city, ref: (component) => { me.reactRef = component; } }));
        super.open();
    }
}
class CityBlurbOffCanvas extends React.Component {
    render() {
        return (React.createElement("div", { className: "offcanvas offcanvas-end", tabIndex: -1, id: "city-blurb-offcanvas", "aria-labelledby": "city-blurb-offcanvas-label" },
            React.createElement("div", { className: "offcanvas-header" },
                React.createElement("h5", { className: "offcanvas-title", id: "city-blurb-offcanvas-label" }, "Offcanvas"),
                React.createElement("button", { type: "button", className: "btn-close text-reset", "data-bs-dismiss": "offcanvas", "aria-label": "Close" })),
            React.createElement("div", { className: "offcanvas-body" }, this.props.city && React.createElement(CityBlurb, { JsonObject: this.props.city }))));
    }
}
class CityBlurbDeprecated extends ReactHideableContainer {
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
class CityBlurb extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.JsonObject.name),
            this.props.JsonObject.description.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
            this.props.JsonObject.culture.length > 0 && React.createElement("h2", null, "Culture."),
            this.props.JsonObject.culture.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
            this.props.JsonObject.dmNotes.map((paragraph, index) => React.createElement("p", { className: "dmnotes", style: { display: 'none' } }, paragraph)),
            this.props.JsonObject.url.length > 1 && React.createElement("a", { href: this.props.JsonObject.url }, ">City Details<")));
    }
}
//# sourceMappingURL=city-blurb-viewer.js.map