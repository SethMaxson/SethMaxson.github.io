"use strict";
class MapViewer extends React.Component {
    render() {
        return (React.createElement("div", { className: "map-body" },
            React.createElement("div", { className: "map-controls" },
                "- ",
                React.createElement("input", { type: "range", min: "10", max: "125", value: "50", className: "slider", id: "map-zoom" }),
                " +",
                React.createElement("input", { type: "number", name: "previous-zoom", id: "previous-zoom", value: "50", style: { display: "none" } }),
                React.createElement("button", { id: "Climates" }, "Climates Hidden"),
                React.createElement("span", { id: "Calendar" }),
                React.createElement("span", { id: "Weather", style: { paddingLeft: "10px" } }),
                React.createElement("div", { id: "TripDistance" }),
                React.createElement("div", { id: "TripTime" })),
            React.createElement("div", { id: "map-container", className: "map-container map", style: { width: "18750px", height: "11250px", textAlign: "center", transformOrigin: "center center" } },
                React.createElement("div", { className: "grid-lines stay-visible" }),
                React.createElement("div", { className: "landmass map-lagos" },
                    React.createElement("a", { href: "lagos.html", className: "smith continent", style: { top: "1130px", left: "1040px" } }, "Lagos")),
                React.createElement("div", { className: "landmass map-paros" },
                    React.createElement("a", { href: "paros.html", className: "smith continent", style: { top: "2230px", left: "2540px" } }, "Paros")),
                React.createElement("div", { id: "ClimateZones", className: "map-overlay", style: { backgroundImage: "url('/dnd/img/maps/Climate_Zones.png')", zIndex: 1, opacity: 0.6, display: "none" } }, " "),
                React.createElement("div", { id: "DefiniteIslands", className: "map-overlay", style: { backgroundImage: "url('/dnd/img/maps/Definite_Islands.png')", zIndex: 0, opacity: 1.0, display: "default" } }, " "))));
    }
}
//# sourceMappingURL=map-viewer copy.js.map