"use strict";
class Brochure extends React.Component {
    render() {
        return (React.createElement("div", { className: "location-info" },
            React.createElement("h3", null, this.props.agency),
            React.createElement("h1", null, this.props.title),
            this.props.children));
    }
}
Brochure.defaultProps = {
    agency: "Amarillo Airship Agency",
};
//# sourceMappingURL=brochure.js.map