"use strict";
class DmScreen extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    render() {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "row row-cols-auto" },
                React.createElement("div", { className: "col border border-dark" }, "Column"),
                React.createElement("div", { className: "col border border-dark" }, "Column"),
                React.createElement("div", { className: "col border border-dark" }, "Column"),
                React.createElement("div", { className: "col border border-dark" }, "Column"))));
    }
}
//# sourceMappingURL=dm-screen.js.map