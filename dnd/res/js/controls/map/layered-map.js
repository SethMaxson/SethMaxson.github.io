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
            React.createElement("div", { className: "row bg-light" },
                React.createElement("label", { htmlFor: "layer-range", className: "col-auto col-form-label" }, "Layer:"),
                React.createElement("div", { className: "col-auto" },
                    React.createElement("input", { type: "range", className: "form-range", min: "0", max: this.props.layers.length - 1, defaultValue: "0", id: "layer-range", onChange: this.changeLayer }))),
            React.createElement("div", { className: "layer-container row flex-grow-1 h-100 w-100" }, this.props.layers.map((image, index) => (this.state.currentLayer == index || this.props.displayStack) && React.createElement(LayeredMapLayer, { imageUrl: image, key: index })))));
    }
    changeLayer(event) {
        this.setState({ currentLayer: parseInt(event.target.value) });
    }
}
class LayeredMapLayer extends React.Component {
    render() {
        return (React.createElement("div", { className: "h-100 w-100 overflow-auto" },
            React.createElement("img", { src: this.props.imageUrl })));
    }
}
//# sourceMappingURL=layered-map.js.map