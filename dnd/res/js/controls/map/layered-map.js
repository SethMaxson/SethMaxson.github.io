"use strict";
class LayeredMap extends React.Component {
    constructor(props) {
        super(props);
        this.changeLayer = this.changeLayer.bind(this);
        this.changeScale = this.changeScale.bind(this);
        this.state = {
            currentLayer: 0,
            scale: 1
        };
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100 outer-container d-flex flex-column" },
            React.createElement("div", { className: "row bg-secondary w-100 m-0 text-light" },
                React.createElement("label", { htmlFor: "zoom-range", className: "col-2 col-md-auto col-form-label" }, "Zoom:"),
                React.createElement("div", { className: "col-10 col-md-auto" },
                    React.createElement("input", { type: "range", className: "form-range", min: "0.1", max: "10", defaultValue: "1", step: "0.1", id: "zoom-range", onChange: this.changeScale })),
                React.createElement("label", { htmlFor: "layer-range", className: "col-2 col-md-auto col-form-label" }, "Layer:"),
                React.createElement("div", { className: "col-10 col-md-auto" },
                    React.createElement("input", { type: "range", className: "form-range", min: "0", max: this.props.layers.length - 1, defaultValue: "0", id: "layer-range", onChange: this.changeLayer }))),
            React.createElement("div", { className: "layer-container row flex-grow-1 h-100 w-100 m-0" }, this.props.layers.map((image, index) => (this.state.currentLayer == index || this.props.displayStack) && React.createElement(LayeredMapLayer, { layer: image, scale: this.state.scale, key: index })))));
    }
    changeLayer(event) {
        this.setState({ currentLayer: parseInt(event.target.value) });
    }
    changeScale(event) {
        console.log("set scale to " + parseFloat(event.target.value));
        this.setState({ scale: parseFloat(event.target.value) });
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
            React.createElement("div", { className: "w-auto p-0 m-0 position-relative", style: { transformOrigin: "top left", transform: "scale(" + this.props.scale + ")" } },
                this.props.layer.objects.map((object, index) => React.createElement("a", { className: "border border-1 position-absolute d-block " + (object.locked ? "border-danger" : "border-info"), role: "button", "data-bs-toggle": "modal", "data-bs-target": "#" + object.name.replaceAll(" ", "").replaceAll("'", "") + "Modal", style: { left: object.position.x + "px", top: object.position.y + "px", width: object.size.width + "px", height: object.size.height + "px" }, title: object.name, key: index })),
                React.createElement("img", { src: this.props.layer.image, style: { imageRendering: "pixelated" } }))));
    }
}
//# sourceMappingURL=layered-map.js.map