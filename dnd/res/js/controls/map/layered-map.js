"use strict";
class LayeredMap extends React.Component {
    constructor(props) {
        super(props);
        this.changeLayer = this.changeLayer.bind(this);
        this.state = {
            currentLayer: 0
        };
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100 outer-container d-flex flex-column" },
            React.createElement("div", { className: "row bg-secondary w-100 m-0 text-light" },
                React.createElement("label", { htmlFor: "layer-range", className: "col-auto col-form-label" }, "Layer:"),
                React.createElement("div", { className: "col-auto" },
                    React.createElement("input", { type: "range", className: "form-range", min: "0", max: this.props.layers.length - 1, defaultValue: "0", id: "layer-range", onChange: this.changeLayer }))),
            React.createElement("div", { className: "layer-container row flex-grow-1 h-100 w-100 m-0" }, this.props.layers.map((image, index) => (this.state.currentLayer == index || this.props.displayStack) && React.createElement(LayeredMapLayer, { layer: image, key: index })))));
    }
    changeLayer(event) {
        this.setState({ currentLayer: parseInt(event.target.value) });
    }
}
class LayeredMapLayer extends React.Component {
    render() {
        return (React.createElement("div", { className: "h-100 w-100 overflow-auto p-0 m-0 position-relative" },
            this.props.layer.objects.map((object, index) => React.createElement("div", { className: "modal fade", id: object.name.replaceAll(" ", "").replaceAll("'", "") + "Modal", tabIndex: -1, "aria-labelledby": object.name.replaceAll(" ", "").replaceAll("'", "") + "ModalLabel", "aria-hidden": "true", key: index },
                React.createElement("div", { className: "modal-dialog modal-dialog-centered" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h5", { className: "modal-title", id: object.name.replaceAll(" ", "").replaceAll("'", "") + "ModalLabel" }, object.name),
                            React.createElement("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })),
                        React.createElement("div", { className: "modal-body" }, object.popoverText),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", className: "btn btn-primary", "data-bs-dismiss": "modal" }, "Close")))))),
            this.props.layer.objects.map((object, index) => React.createElement("a", { className: "border border-info border-1 position-absolute d-block", role: "button", "data-bs-toggle": "modal", "data-bs-target": "#" + object.name.replaceAll(" ", "").replaceAll("'", "") + "Modal", style: { left: object.position.x + "px", top: object.position.y + "px", width: object.size.width + "px", height: object.size.height + "px" }, title: object.popoverText, key: index })),
            React.createElement("img", { src: this.props.layer.image })));
    }
}
//# sourceMappingURL=layered-map.js.map