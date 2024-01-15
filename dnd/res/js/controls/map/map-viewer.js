"use strict";
class MapViewer extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            __zoomBoxDimensions.width = window.innerWidth;
            __zoomBoxDimensions.height = window.innerHeight;
            this.handleZoomChange(this.state.zoom.currentZoom);
        };
        this.handleZoomChange = (newZoom) => {
            let prevZoom = this.state.zoom.currentZoom;
            newZoom = Math.min(newZoom, this.state.zoom.maxZoom);
            newZoom = Math.max(newZoom, this.state.zoom.minZoom);
            // const mapWindowHeight = window.innerHeight;
            const mapWindowHeight = $(".map-window").innerHeight() || 0;
            // const mapWindowWidth = window.innerWidth;
            const mapWindowWidth = $(".map-window").innerWidth() || 0;
            const mapIsTallerThanScreen = (this.props.height * newZoom) > mapWindowHeight;
            const mapIsWiderThanScreen = (this.props.width * newZoom) > mapWindowWidth;
            const zoomBoxHeight = __zoomBoxDimensions.height * newZoom;
            const zoomBoxWidth = __zoomBoxDimensions.width * newZoom;
            const maxX = -((mapWindowWidth - zoomBoxWidth) / 2) / newZoom;
            const minX = -this.props.width + (((mapWindowWidth + zoomBoxWidth) / 2) / newZoom);
            const maxY = -((mapWindowHeight - zoomBoxHeight) / 2) / newZoom;
            const minY = -this.props.height + (((mapWindowHeight + zoomBoxHeight) / 2) / newZoom);
            // console.log(`newZoom: ${newZoom}`);
            // console.log(`windowWidth: ${windowWidth}`);
            // console.log(`mapIsWiderThanScreen: ${mapIsWiderThanScreen}`);
            // console.log(`zoomBoxWidth: ${zoomBoxWidth}`);
            // console.log(`newZoom: ${newZoom}`);
            // console.log(`this.props.width: ${this.props.width}`);
            // console.log(`minX: ${minX}`);
            this.setState(prevState => {
                let zoom = Object.assign({}, prevState.zoom); // creating copy of state variable
                zoom.currentZoom = newZoom; // update the property, assign a new value
                zoom.previousZoom = prevZoom;
                __mapPan.scale = newZoom;
                if (mapIsWiderThanScreen) {
                    __mapPan.mapPanBounds.left = maxX;
                    __mapPan.mapPanBounds.right = minX;
                }
                else {
                    __mapPan.mapPanBounds.left = minX;
                    __mapPan.mapPanBounds.right = maxX;
                }
                __mapPan.mapPanBounds.top = mapIsTallerThanScreen ? maxY : minY;
                __mapPan.mapPanBounds.bottom = mapIsTallerThanScreen ? minY : maxY;
                updateMapCSSForZoom(newZoom);
                return { zoom }; // return new object
            });
        };
        this.setImageType = (useVector) => {
            this.setState({ useVectorImages: useVector });
        };
        this.setOverlayDisplay = (index, displayOverlay) => {
            const newDisplay = this.state.overlayDisplay.slice(); //copy the array
            newDisplay[index] = displayOverlay; //execute the manipulations
            this.setState({ overlayDisplay: newDisplay }); //set the new state
        };
        this.centerMap = () => {
            $("#map-container").css({
                left: -Math.round(this.props.width / 2) + "px",
                top: -Math.round(this.props.height / 2) + "px"
            });
        };
        this.state = {
            overlayDisplay: this.props.overlays.map(({ displayedByDefault }) => displayedByDefault),
            useVectorImages: false,
            zoom: {
                currentZoom: props.config.initialZoom || 0.5,
                onZoom: this.handleZoomChange,
                maxZoom: props.config.maxZoom || 1.25,
                minZoom: props.config.minZoom || 0.10,
                previousZoom: props.config.initialZoom || 0.5,
                step: props.config.zoomStep || 0.01
            }
        };
        __mapPan.scale = this.state.zoom.currentZoom;
        // __mapPan.mapPanBounds.left = -this.props.width;
    }
    render() {
        return (React.createElement("div", { id: "map-body", className: "map-body sharp" },
            React.createElement(MapControls, { centerMap: this.centerMap, overlayDisplay: this.state.overlayDisplay, overlays: this.props.overlays, setImageType: this.setImageType, setOverlayDisplay: this.setOverlayDisplay, zoom: this.state.zoom }),
            React.createElement("div", { className: "map-window" },
                React.createElement(MapContainer, { landmasses: this.props.landmasses, overlayDisplay: this.state.overlayDisplay, overlays: this.props.overlays, showGridlines: this.props.config.showGridlines, size: { height: this.props.height, width: this.props.width }, useVectorImages: this.state.useVectorImages, zoom: this.state.zoom }, this.props.children))));
    }
}
MapViewer.defaultProps = {
    config: {},
    overlays: []
};
class MapControls extends React.Component {
    render() {
        return (React.createElement("div", { className: "map-controls navbar navbar-dark bg-dark text-light overflow-visible" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "map-controls-top-row" },
                    React.createElement(MapControlToggler, { targetID: "map-controls-overflow-tray" }),
                    React.createElement(MapZoomControl, { zoom: this.props.zoom }),
                    React.createElement("span", { className: "navbar-text ps-2" },
                        React.createElement("span", { id: "Calendar" }),
                        React.createElement("span", { id: "Weather", style: { paddingLeft: "10px" } })),
                    React.createElement("div", { id: "TripDistance" }),
                    React.createElement("div", { id: "TripTime" }))),
            React.createElement("div", { id: "map-controls-overflow-tray", className: "collapse bg-dark row overflow-show" },
                React.createElement("div", { className: "btn-group", role: "group", "aria-label": "Button group with nested dropdown" },
                    React.createElement(MapControlButton, { onClick: this.props.centerMap, text: "Reset Map Position" }),
                    React.createElement(MapControlToggle, { onChange: this.props.setImageType, text: "Use SVG Maps" }),
                    React.createElement(MapControlOverlayToggle, { overlayDisplay: this.props.overlayDisplay, overlays: this.props.overlays, setOverlayDisplay: this.props.setOverlayDisplay })))));
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
        return (React.createElement("button", { className: "btn btn-outline-primary", onClick: this.handleClick }, this.props.text));
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
            return (React.createElement("div", { className: "btn-group", role: "group" },
                React.createElement("button", { id: "btnGroupLayersDrop", type: "button", className: "btn btn-outline-primary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, "Map Layers"),
                React.createElement("ul", { className: "dropdown-menu bg-dark text-light ps-1", "aria-labelledby": "btnGroupLayersDrop" }, this.props.overlays.map((overlay, index) => React.createElement("li", { key: index },
                    React.createElement("div", { className: "form-check" },
                        React.createElement("input", { id: overlay.name.replaceAll(" ", "-"), type: "checkbox", className: "form-check-input", onChange: (e) => this.handleChange(e, index), defaultChecked: this.props.overlayDisplay[index] }),
                        React.createElement("label", { className: "form-check-label", htmlFor: overlay.name.replaceAll(" ", "-") }, overlay.name)))))));
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
        return (React.createElement("div", { className: "zoom-controls mx-2", style: { display: "inline-block" } },
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
        return (React.createElement("div", { id: "zoom-box", style: { width: "100%", height: "100%", textAlign: "center", transformOrigin: "center center", position: "absolute", transform: `scale(${this.props.zoom.currentZoom})` }, onWheelCapture: this.handleChange.bind(this) },
            React.createElement("div", { id: "map-container", className: "map draggable", style: { width: this.props.size.width + "px", height: this.props.size.height + "px", textAlign: "center", transformOrigin: "center center", position: "relative", left: "-50%", top: "-50%" } },
                this.props.showGridlines && React.createElement("div", { className: "grid-lines stay-visible" }),
                this.props.landmasses.map((landmass, index) => React.createElement(Landmass, { key: index, className: "map-" + landmass.id, fileName: landmass.id + ".html", image: this.props.useVectorImages && landmass.image.vector ? landmass.image.vector : landmass.image.raster, name: landmass.name, labelPosition: { left: landmass.labelPosition.left, top: landmass.labelPosition.top }, translateLabel: landmass.translateLabel })),
                this.props.children,
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
const __mapPan = {
    dx: 0,
    dy: 0,
    mapPanBounds: {
        bottom: 0,
        left: -99999999,
        right: 0,
        top: 0
    },
    scale: 0.5
};
const __zoomBoxDimensions = {
    height: 0,
    width: 0
};
$(document).ready(function () {
    $(".draggable").draggable({
        zIndex: 100,
        drag: function (event, ui) {
            //resize bug fix ui drag `enter code here`
            __mapPan.dx = ui.position.left - ui.originalPosition.left;
            __mapPan.dy = ui.position.top - ui.originalPosition.top;
            let newLeft = Math.min(ui.originalPosition.left + (__mapPan.dx / __mapPan.scale), __mapPan.mapPanBounds.left);
            newLeft = Math.max(newLeft, __mapPan.mapPanBounds.right);
            ui.position.left = newLeft;
            let newTop = Math.min(ui.originalPosition.top + (__mapPan.dy / __mapPan.scale), __mapPan.mapPanBounds.top);
            newTop = Math.max(newTop, __mapPan.mapPanBounds.bottom);
            // ui.position.top = ui.originalPosition.top + ( __mapPan.dy/__mapPan.scale );
            ui.position.top = newTop;
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
//# sourceMappingURL=map-viewer.js.map