"use strict";
class MapViewer extends React.Component {
    constructor(props) {
        super(props);
        this.centerMap = this.centerMap.bind(this);
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.setImageType = this.setImageType.bind(this);
        this.setOverlayDisplay = this.setOverlayDisplay.bind(this);
        this.state = {
            overlayDisplay: this.props.overlays.map(({ displayedByDefault }) => displayedByDefault),
            useVectorImages: false,
            zoom: {
                currentZoom: 0.5,
                onZoom: this.handleZoomChange,
                maxZoom: 1.25,
                minZoom: 0.10,
                previousZoom: 0.5,
                step: 0.01
            }
        };
        __mapPan.scale = this.state.zoom.currentZoom;
        // __mapPan.mapPanBounds.left = -this.props.width;
    }
    render() {
        return (React.createElement("div", { id: "map-body", className: "map-body" },
            React.createElement(MapControls, { centerMap: this.centerMap, overlayDisplay: this.state.overlayDisplay, overlays: this.props.overlays, setImageType: this.setImageType, setOverlayDisplay: this.setOverlayDisplay, zoom: this.state.zoom }),
            React.createElement(MapContainer, { landmasses: landmasses, overlayDisplay: this.state.overlayDisplay, overlays: this.props.overlays, size: { height: this.props.height, width: this.props.width }, useVectorImages: this.state.useVectorImages, zoom: this.state.zoom })));
    }
    handleZoomChange(newZoom) {
        let prevZoom = this.state.zoom.currentZoom;
        newZoom = Math.min(newZoom, this.state.zoom.maxZoom);
        newZoom = Math.max(newZoom, this.state.zoom.minZoom);
        this.setState(prevState => {
            let zoom = Object.assign({}, prevState.zoom); // creating copy of state variable
            zoom.currentZoom = newZoom; // update the property, assign a new value
            zoom.previousZoom = prevZoom;
            __mapPan.scale = newZoom;
            updateMapCSSForZoom(newZoom);
            return { zoom }; // return new object
        });
    }
    setImageType(useVector) {
        this.setState({ useVectorImages: useVector });
    }
    setOverlayDisplay(index, displayOverlay) {
        const newDisplay = this.state.overlayDisplay.slice(); //copy the array
        newDisplay[index] = displayOverlay; //execute the manipulations
        this.setState({ overlayDisplay: newDisplay }); //set the new state
    }
    centerMap() {
        $("#map-container").css({
            left: -Math.round(this.props.width / 2) + "px",
            top: -Math.round(this.props.height / 2) + "px"
        });
    }
}
MapViewer.defaultProps = {
    overlays: []
};
class MapControls extends React.Component {
    render() {
        return (React.createElement("div", { className: "map-controls navbar navbar-dark bg-dark" },
            React.createElement("div", { className: "map-controls-top-row" },
                React.createElement(MapControlToggler, { targetID: "map-controls-overflow-tray" }),
                React.createElement(MapZoomControl, { zoom: this.props.zoom }),
                React.createElement(MapControlButton, { onClick: this.props.centerMap, text: "Reset Map Position" }),
                React.createElement("span", { id: "Calendar" }),
                React.createElement("span", { id: "Weather", style: { paddingLeft: "10px" } }),
                React.createElement("div", { id: "TripDistance" }),
                React.createElement("div", { id: "TripTime" })),
            React.createElement("div", { id: "map-controls-overflow-tray", className: "collapse card card-body bg-dark" },
                React.createElement(MapControlToggle, { onChange: this.props.setImageType, text: "Use SVG Maps" }),
                React.createElement(MapControlOverlayToggle, { overlayDisplay: this.props.overlayDisplay, overlays: this.props.overlays, setOverlayDisplay: this.props.setOverlayDisplay }))));
    }
}
class MapControlToggler extends React.Component {
    render() {
        return (React.createElement("button", { className: "navbar-toggler bg-dark", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#" + this.props.targetID, "aria-controls": this.props.targetID, "aria-expanded": "false", "aria-label": "Toggle navigation" },
            React.createElement("span", { className: "navbar-toggler-icon" })));
    }
}
class MapControlButton extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (e) => {
            this.props.onClick();
        };
    }
    render() {
        return (React.createElement("button", { className: "btn btn-dark", onClick: this.handleClick }, this.props.text));
    }
}
class MapControlToggle extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            this.props.onChange(e.target.checked);
        };
    }
    render() {
        let name = this.props.text.replaceAll(" ", "-");
        return (React.createElement("span", null,
            React.createElement("input", { id: name, type: "checkbox", className: "btn-check", onChange: this.handleChange }),
            React.createElement("label", { className: "btn btn-outline-primary", htmlFor: name }, this.props.text)));
    }
}
class MapControlOverlayToggle extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e, index) => {
            this.props.setOverlayDisplay(index, e.target.checked);
        };
    }
    render() {
        if (this.props.overlays.length != this.props.overlayDisplay.length) {
            alert(`this.props.overlays.length != this.props.overlayDisplay.length (${this.props.overlays.length} != ${this.props.overlayDisplay.length})`);
        }
        if (this.props.overlays.length > 0 && this.props.overlays.length == this.props.overlayDisplay.length) {
            return (React.createElement("div", { className: "btn-group", role: "group", "aria-label": "Basic checkbox toggle button group" }, this.props.overlays.map((overlay, index) => React.createElement("span", { key: index },
                React.createElement("input", { id: overlay.name.replaceAll(" ", "-"), type: "checkbox", className: "btn-check", onChange: (e) => this.handleChange(e, index), defaultChecked: this.props.overlayDisplay[index] }),
                React.createElement("label", { className: "btn btn-outline-primary", htmlFor: overlay.name.replaceAll(" ", "-") }, overlay.name)))));
        }
        else {
            return null;
        }
    }
}
class MapZoomControl extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            var zoom = parseFloat(e.target.value);
            this.props.zoom.onZoom(zoom);
        };
    }
    render() {
        return (React.createElement("div", { className: "zoom-controls", style: { display: "inline-block" } },
            "- ",
            React.createElement("input", { type: "range", className: "slider", id: "map-viewer-zoom", name: "map-viewer-zoom", min: this.props.zoom.minZoom, max: this.props.zoom.maxZoom, onChange: this.handleChange, step: this.props.zoom.step, value: this.props.zoom.currentZoom }),
            " +",
            React.createElement("input", { type: "number", name: "previous-zoom", id: "previous-zoom", defaultValue: "50", style: { display: "none" } })));
    }
}
class MapContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            var newZoom = this.props.zoom.currentZoom;
            if (e.deltaY < 0) {
                newZoom += 0.05;
            }
            else {
                newZoom -= 0.05;
            }
            this.props.zoom.onZoom(newZoom);
        };
    }
    render() {
        return (React.createElement("div", { style: { width: "100%", height: "100%", textAlign: "center", transformOrigin: "center center", position: "absolute", transform: `scale(${this.props.zoom.currentZoom})` }, onWheelCapture: this.handleChange.bind(this) },
            React.createElement("div", { id: "map-container", className: "map draggable", style: { width: this.props.size.width + "px", height: this.props.size.height + "px", textAlign: "center", transformOrigin: "center center", position: "relative", left: "-50%", top: "-50%" } },
                React.createElement("div", { className: "grid-lines stay-visible" }),
                this.props.landmasses.map((landmass, index) => React.createElement(Landmass, { key: index, className: "map-" + landmass.id, fileName: landmass.name + ".html", image: this.props.useVectorImages && landmass.image.vector ? landmass.image.vector : landmass.image.raster, name: landmass.name, labelPosition: { left: landmass.labelPosition.left, top: landmass.labelPosition.top }, translateLabel: landmass.translateLabel })),
                React.createElement("a", { href: "/dnd/pages/maps/noseyus.html", className: "smith metropolis", style: { "position": "absolute", "top": "4200px", "left": "15000px", "fontSize": "80px", "zIndex": 6 } },
                    "Noseyus Island",
                    React.createElement("span", { className: "city-preview" },
                        React.createElement("h1", null, "Noseyus Island"),
                        React.createElement("p", null, "A small, perfectly circular island. This does not appear on any maps or charts."))),
                React.createElement("a", { href: "#", className: "point-of-interest smith metropolis", style: { "left": "calc(38.6% - 12.5px)", "top": "calc(38% - 12.5px)", "fontSize": "40px", zIndex: 6 } },
                    React.createElement("div", { className: "map-marker-icon marker-city" }, "\u00A0"),
                    React.createElement("span", { className: "map-marker-name", style: { "position": "absolute", "top": "100%", "left": "0%", "transform": "translate(16px, -50%)" } }, "Osta M\u00FC\u00FC Turul"),
                    React.createElement("span", { className: "city-preview" },
                        React.createElement("h1", null, "Osta M\u00FC\u00FC Turul"),
                        React.createElement("p", null, "Osta M\u00FC\u00FC Turul is a city covering a small island roughly midway between Paros, Lagos, and Decapos. The city is a massive trade hub where merchants from each continent can meet and conduct business. Security is tight, and the island has the highest known concentration of airship docks in the world."),
                        React.createElement("h1", null, "Culture."),
                        React.createElement("p", null, "Visitors of any nationality and species are welcome in Osta M\u00FC\u00FC Turul, as long as they abide by its rules."))),
                React.createElement(MapLabel, { fontSize: "110px", labelType: "continent", name: "Seiklus Ocean", position: { left: "27%", top: "40%" } }),
                this.props.overlays.map((overlay, index) => this.props.overlayDisplay[index] ? React.createElement(Overlay, { key: index, image: overlay.image, zIndex: overlay.zIndex, opacity: overlay.opacity, display: "default" }) : null))));
    }
}
class Landmass extends React.Component {
    render() {
        return (React.createElement("div", { className: "landmass " + this.props.className.toLowerCase(), style: { backgroundImage: "url('" + this.props.image + "')" } },
            React.createElement(MapLabel, { cartographer: this.props.cartographer, href: this.props.fileName, labelType: "continent", name: this.props.name, position: this.props.labelPosition, translate: this.props.translateLabel })));
    }
}
Landmass.defaultProps = {
    cartographer: "smith",
    fileName: "#",
    labelPosition: { left: "50%", top: "50%" },
    translateLabel: true,
};
class AirshipReact extends React.Component {
    render() {
        return (React.createElement("div", { className: "airship" + this.props.hideable ? " hideable" : "", style: { height: this.props.size.height + "px", width: this.props.size.width + "px", left: this.props.position.left, top: this.props.position.top } },
            React.createElement("img", { src: this.props.image, style: { width: "100%" }, alt: "image" }),
            React.createElement("span", { className: "city-preview" },
                React.createElement("h1", null, this.props.name))));
    }
}
AirshipReact.defaultProps = {
    hideable: true,
    image: "/dnd/img/maps/Airship.png",
    size: { height: 80, width: 80 }
};
class Overlay extends React.Component {
    render() {
        return (React.createElement("div", { className: "map-overlay", style: { backgroundImage: "url('" + this.props.image + "')", zIndex: this.props.zIndex, opacity: this.props.opacity, display: this.props.display } }, " "));
    }
}
Overlay.defaultProps = {
    display: "none",
    opacity: 0.6,
    zIndex: 1
};
class MapLabel extends React.Component {
    render() {
        let cssProperties = { "position": "absolute", "top": this.props.position.top, "left": this.props.position.left, "zIndex": 1, "display": "block" };
        if (this.props.fontSize != undefined) {
            cssProperties.fontSize = this.props.fontSize;
        }
        if (this.props.translate) {
            cssProperties.transform = "translate(-50%, -50%)";
        }
        return (React.createElement("a", { href: this.props.href, className: this.props.cartographer + " " + this.props.labelType, style: cssProperties }, this.props.name));
    }
}
MapLabel.defaultProps = {
    cartographer: "smith",
    fontSize: undefined,
    href: "#",
    labelType: "village",
    translate: false,
};
var __mapPan = {
    dx: 0,
    dy: 0,
    mapPanBounds: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    scale: 0.5
};
$(document).ready(function () {
    $(".draggable").draggable({
        zIndex: 100,
        drag: function (event, ui) {
            //resize bug fix ui drag `enter code here`
            __mapPan.dx = ui.position.left - ui.originalPosition.left;
            __mapPan.dy = ui.position.top - ui.originalPosition.top;
            ui.position.left = ui.originalPosition.left + (__mapPan.dx / __mapPan.scale);
            // ui.position.left = Math.max(ui.originalPosition.left + ( __mapPan.dx/__mapPan.scale), __mapPan.mapPanBounds.left);
            ui.position.top = ui.originalPosition.top + (__mapPan.dy / __mapPan.scale);
            // ui.position.left = ui.originalPosition.left + (__dx);
            // ui.position.top = ui.originalPosition.top + (__dy);
        },
        // stop: function (event, ui)
        // {
        // 	// $(this).css('cursor', 'default');
        // 	//alternate to revert (don't use revert)
        // 	$(this).animate({
        // 		left: $(this).attr('oriLeft'),
        // 		top: $(this).attr('oriTop')
        // 	}, 1000)
        // },
        create: function (event, ui) {
            $(this).attr('oriLeft', $(this).css('left'));
            $(this).attr('oriTop', $(this).css('top'));
        }
    });
});
//#region temporarily hardcoded data
const landmasses = [
    {
        id: "lagos",
        image: {
            raster: "/dnd/img/maps/landmasses/Lagos.png",
            vector: "/dnd/img/maps/landmasses/Lagos.svg"
        },
        labelPosition: {
            left: "1040px",
            top: "1130px"
        },
        name: "Lagos",
        translateLabel: false
    },
    {
        id: "paros",
        image: {
            raster: "/dnd/img/maps/landmasses/Paros.png",
            vector: "/dnd/img/maps/landmasses/Paros.svg"
        },
        labelPosition: {
            left: "2540px",
            top: "2230px"
        },
        name: "Paros",
        translateLabel: false
    },
    {
        id: "peku",
        image: {
            raster: "/dnd/img/maps/landmasses/Peku.png"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Peku",
        translateLabel: true
    },
    {
        id: "bravagg",
        image: {
            raster: "/dnd/img/maps/landmasses/Bravagg.svg",
            vector: "/dnd/img/maps/landmasses/Bravagg.svg"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Bravagg Isle",
        translateLabel: true
    },
    {
        id: "terrapim",
        image: {
            raster: "/dnd/img/maps/landmasses/Terrapim.png",
            vector: "/dnd/img/maps/landmasses/Terrapim.svg"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Terrapim",
        translateLabel: true
    },
    {
        id: "decapos",
        image: {
            raster: "/dnd/img/maps/landmasses/Decapos.png",
            vector: "/dnd/img/maps/landmasses/Decapos.svg"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Decapos",
        translateLabel: true
    },
    {
        id: "notre",
        image: {
            raster: "/dnd/img/maps/landmasses/Notre.png"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Notre",
        translateLabel: true
    },
    {
        id: "sutre",
        image: {
            raster: "/dnd/img/maps/landmasses/Sutre.png"
        },
        labelPosition: {
            left: "50%",
            top: "50%"
        },
        name: "Sutre",
        translateLabel: true
    }
];
const overlays = [
    {
        displayedByDefault: false,
        image: "/dnd/img/maps/corruptionmap.png",
        name: "Corruption Map",
        opacity: 0.6,
        zIndex: 2,
    },
    {
        displayedByDefault: false,
        image: "/dnd/img/maps/Climate_Zones.png",
        name: "Climate Zones",
        opacity: 0.6,
        zIndex: 2,
    },
    {
        displayedByDefault: false,
        image: "/dnd/img/maps/Possible_Islands.png",
        name: "Possible Islands",
        opacity: 0.6,
        zIndex: 2,
    },
    {
        displayedByDefault: false,
        image: "/dnd/img/maps/Globe.svg",
        name: "Globe",
        opacity: 0.6,
        zIndex: 2,
    },
    {
        displayedByDefault: true,
        image: "/dnd/img/maps/Definite_Islands.png",
        name: "Definite Islands",
        opacity: 1,
        zIndex: 0,
    },
    {
        displayedByDefault: false,
        image: "/dnd/img/maps/Tectonic_Plates.png",
        name: "Tectonic Plates",
        opacity: 1,
        zIndex: 0,
    }
];
//#endregion
//# sourceMappingURL=map-viewer.js.map