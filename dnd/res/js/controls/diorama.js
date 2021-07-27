"use strict";
class DioramaStandee extends React.Component {
    render() {
        return (React.createElement("div", { style: { height: this.props.height + "%" } },
            React.createElement("div", { className: "name" }, this.props.name),
            React.createElement("img", { src: this.props.image, alt: this.props.name })));
    }
}
class Diorama extends React.Component {
    render() {
        return (React.createElement("div", { className: "background", style: { "padding": "0px", "height": "100%", "backgroundImage": "url(" + this.props.background + ")" } },
            React.createElement("div", { className: "title" }, this.props.title),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "slider" },
                    React.createElement("div", { className: "gravity" }),
                    this.props.cutouts.map((cutout, index) => React.createElement(DioramaStandee, { height: cutout.height, image: cutout.img, name: cutout.name, key: index }))))));
    }
}
//# sourceMappingURL=diorama.js.map