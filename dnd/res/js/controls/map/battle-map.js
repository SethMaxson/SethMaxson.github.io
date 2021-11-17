"use strict";
;
class BattleMap extends React.Component {
    constructor(props) {
        super(props);
        this.getActiveMapLayer = () => this.state.battleMap.decks[this.state.currentDeck - 1];
        this.getDraggedCreature = () => {
            if (this.state.dragging && this.state.battleMap.decks.length > 0) {
                const draggedCreatures = this.getActiveMapLayer().crew?.filter(creature => creature.dragging);
                if (draggedCreatures && draggedCreatures?.length > 0) {
                    return draggedCreatures[0];
                }
            }
            return undefined;
        };
        this.getRelativeMousePosition = (e, isMapSubObject = false) => {
            const applicableZoom = isMapSubObject ? this.state.zoom : 1;
            const windowAdjustmentFactor = isMapSubObject ? 0 : 0.5;
            let dragStartX = Math.round(((e.screenX / applicableZoom)
                - (this.state.initialMapPosition.x / applicableZoom)
                - (window.innerWidth * windowAdjustmentFactor)));
            let dragStartY = Math.round(((e.pageY / applicableZoom) - (this.state.initialMapPosition.y / applicableZoom) - (window.innerHeight * windowAdjustmentFactor)));
            return { x: dragStartX, y: dragStartY };
        };
        this.handleMouseMove = (e) => {
            if (this.state.dragging) {
                const draggedCreature = this.getDraggedCreature();
                const newPosition = ctrlkey ? { x: this.state.dragStartX, y: this.state.dragStartY } : this.getRelativeMousePosition(e, draggedCreature != undefined);
                const deltaX = (newPosition.x - this.state.dragStartX);
                const deltaY = (newPosition.y - this.state.dragStartY);
                if (!this.state.capturedStartLocation) {
                    this.setState({
                        capturedStartLocation: true,
                        dragStartX: newPosition.x,
                        dragStartY: newPosition.y
                    });
                }
                else if (draggedCreature) {
                    const gridDeltaX = Math.floor(deltaX / airshipGrid);
                    const gridDeltaY = Math.floor(deltaY / airshipGrid);
                    const newBattleMapState = Object.assign({}, this.state.battleMap);
                    const newMapLayer = Object.assign({}, newBattleMapState.decks[this.state.currentDeck - 1]);
                    const creature = this.getDraggedCreature();
                    if (creature) {
                        newMapLayer.crew = JSON.parse(JSON.stringify(newMapLayer.crew));
                        const newCreature = newMapLayer.crew?.filter(token => token.name == creature.name)[0];
                        newCreature.left = restrictNumberToRange(this.state.lastPositionX + gridDeltaX, 0, Math.round(this.state.battleMap.width / this.state.battleMap.gridSize));
                        newCreature.top = restrictNumberToRange(this.state.lastPositionY + gridDeltaY, 0, Math.round(this.state.battleMap.height / this.state.battleMap.gridSize));
                    }
                    newBattleMapState.decks[this.state.currentDeck - 1] = newMapLayer;
                    this.setState({
                        battleMap: newBattleMapState,
                        dragEndX: newPosition.x,
                        dragEndY: newPosition.y
                    });
                }
                else {
                    // Dragging map
                    const newMapPosition = {
                        x: Math.round(this.state.lastPositionX + deltaX),
                        y: Math.round(this.state.lastPositionY + deltaY)
                    };
                    this.setState({
                        dragEndX: newPosition.x,
                        dragEndY: newPosition.y,
                        mapPosition: newMapPosition
                    });
                }
            }
        };
        this.handleMouseWheel = (e) => {
            const delta = e.deltaY;
            const startZoom = this.state.zoom;
            let newZoom = startZoom;
            if (delta > 0) {
                newZoom -= 0.05;
            }
            else {
                newZoom += 0.05;
            }
            this.zoom(newZoom);
        };
        this.dragCreatureStart = (creatureName, e) => {
            e.stopPropagation();
            let lastPositionX = 0;
            let lastPositionY = 0;
            const newBattleMapState = Object.assign({}, this.state.battleMap);
            const newMapLayer = Object.assign({}, newBattleMapState.decks[this.state.currentDeck - 1]);
            newMapLayer.crew = JSON.parse(JSON.stringify(newMapLayer.crew));
            const creatures = newMapLayer.crew?.filter(creature => creature.name == creatureName);
            newBattleMapState.decks[this.state.currentDeck - 1] = newMapLayer;
            const dragStart = this.getRelativeMousePosition(e, true);
            if (creatures) {
                const creature = creatures[0];
                creature.dragging = true;
                lastPositionX = creature.left;
                lastPositionY = creature.top;
                dragStart.x += creature.left * airshipGrid;
            }
            this.setState({
                battleMap: newBattleMapState,
                capturedStartLocation: false,
                dragging: true,
                dragStartX: dragStart.x,
                dragStartY: dragStart.y,
                lastPositionX: lastPositionX,
                lastPositionY: lastPositionY,
            });
        };
        this.dragMapStart = (e) => {
            const dragStart = this.getRelativeMousePosition(e, false);
            const initialMapPosition = Object.assign({}, this.state.mapPosition);
            this.setState({
                capturedStartLocation: true,
                dragging: true,
                dragStartX: dragStart.x,
                dragStartY: dragStart.y,
                dragEndX: dragStart.x,
                dragEndY: dragStart.y,
                lastPositionX: this.state.mapPosition.x,
                lastPositionY: this.state.mapPosition.y,
                initialMapPosition: initialMapPosition,
            });
        };
        this.dragStop = () => {
            if (this.state.dragging) {
                const wasDraggingCreature = this.getDraggedCreature() != undefined;
                if (wasDraggingCreature) {
                    const newBattleMapState = Object.assign({}, this.state.battleMap);
                    newBattleMapState.decks.map(layer => {
                        layer.crew?.map(token => {
                            token.dragging = false;
                        });
                    });
                    this.setState({
                        battleMap: newBattleMapState,
                        capturedStartLocation: false,
                        dragging: false,
                        dragStartX: 0,
                        dragStartY: 0,
                        dragEndX: 0,
                        dragEndY: 0,
                        lastPositionX: 0,
                        lastPositionY: 0,
                    });
                }
                else {
                    // Was dragging map
                    this.setState({
                        dragging: false,
                        dragStartX: 0,
                        dragStartY: 0,
                        dragEndX: 0,
                        dragEndY: 0,
                        lastPositionX: 0,
                        lastPositionY: 0,
                        initialMapPosition: Object.assign({}, this.state.mapPosition),
                    });
                }
            }
        };
        this.zoom = (zoom) => {
            // const previousZoom = parseFloat($("#previous-zoom").val() as  string);
            // const windowHeight = $(window).height() as number;
            // const windowWidth = $("#map-body").width() as number;
            // // $(".map").css("transform-origin", originLeft + "px " + originTop + "px");
            // const windowScale = ($(window).width() as number/(previousZoom*2));
            // const newWindowScale = ($(window).width() as number / (zoom * 2));
            // const mapContainer = $(".map-container") as JQuery<HTMLElement>;
            // // var initialLeft = parseFloat($(".map-container").css("left")) + newWindowScale - windowScale;
            // var initialLeft = parseFloat(mapContainer.css("left"));
            // const initialWidth = mapContainer[0].clientWidth;
            // mapContainer.css("transform", `scale(${zoom})`);
            // const heightMod = -1 * (mapContainer[0].clientHeight / 2);
            // const widthMod = -1 * (mapContainer[0].clientWidth / 2);
            // const topPos = (heightMod * (1 - zoom));
            // const bottomPos = (heightMod * (1 + zoom)) + windowHeight;
            // const leftPos = (widthMod * (1 - zoom));
            // const rightPos = (widthMod * (1 + zoom)) + windowWidth;
            // (mapContainer.offset() as JQuery.Coordinates).top = 0;
            // (mapContainer.offset() as JQuery.Coordinates).left = 0;
            // const curTop = parseFloat(mapContainer.css("top"));
            // const curLeft = parseFloat(mapContainer.css("left"));
            // const adjustedClientHeight = mapContainer[0].clientHeight * zoom;
            // const adjustedClientWidth = mapContainer[0].clientWidth * zoom;
            // const verticalPositionMinimum = adjustedClientHeight < windowHeight ? topPos : bottomPos;
            // const verticalPositionMaximum = adjustedClientHeight < windowHeight ? bottomPos : topPos;
            // if (curTop < verticalPositionMinimum) {
            // 	mapContainer.css("top", verticalPositionMinimum + "px");
            // }
            // else if (curTop > verticalPositionMaximum) {
            // 	mapContainer.css("top", verticalPositionMaximum + "px");
            // }
            // if (adjustedClientWidth < windowWidth) {
            // 	if (curLeft <= leftPos) {
            // 		mapContainer.css("left", leftPos + "px");
            // 	}
            // 	else if (curLeft > rightPos) {
            // 		mapContainer.css("left", rightPos + "px");
            // 	}
            // }
            // else {
            // 	if (curLeft >= leftPos) {
            // 		mapContainer.css("left", leftPos + "px");
            // 	}
            // 	else if (curLeft < rightPos) {
            // 		mapContainer.css("left", rightPos + "px");
            // 	}
            // 	else {
            // 		mapContainer.css("left", (initialLeft) + "px");
            // 	}
            // }
            let newZoom = Math.round(zoom * this.props.Precision) / this.props.Precision;
            newZoom = Math.max(newZoom, this.props.MinimumZoom);
            newZoom = Math.min(newZoom, this.props.MaximumZoom);
            if (newZoom != this.state.zoom) {
                this.setState({ zoom: newZoom });
                updateMapCSSForZoom(newZoom);
            }
        };
        //@ts-ignore
        const battleMap = Object.assign({}, props.DeckPlan);
        battleMap.decks.map(layer => {
            if (layer.crew) {
                layer.crew.map(token => {
                    token.dragging = false;
                });
            }
        });
        this.state = {
            battleMap: battleMap,
            capturedStartLocation: false,
            currentDeck: props.DeckPlan.decks.length,
            displayLocations: false,
            displayMenu: false,
            dragging: false,
            dragStartX: 0,
            dragStartY: 0,
            dragEndX: 0,
            dragEndY: 0,
            lastPositionX: 0,
            lastPositionY: 0,
            mapPosition: { x: 0, y: 0 },
            initialMapPosition: { x: 0, y: 0 },
            zoom: 1,
        };
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.DeckPlan.decks.length < this.state.currentDeck) {
            this.setState({ currentDeck: nextProps.DeckPlan.decks.length });
        }
    }
    render() {
        return (React.createElement("div", { id: "map-body", className: "map-body", style: { overflow: 'hidden', height: '100%', width: "100%" }, onMouseUp: this.dragStop, onMouseMove: this.handleMouseMove, onWheel: this.handleMouseWheel },
            React.createElement("div", { className: "map-controls", style: { zIndex: 2, paddingLeft: '80px' } },
                "- ",
                React.createElement("input", { type: "range", min: this.props.MinimumZoom, max: this.props.MaximumZoom, value: this.state.zoom, step: 0.01, className: "slider", id: "map-zoom", onChange: e => this.zoom(e.target.valueAsNumber) }),
                " +",
                React.createElement("input", { type: "number", name: "previous-zoom", id: "previous-zoom", defaultValue: "0.50", style: { display: 'none' } }),
                React.createElement("div", { style: {
                        background: "rgba(255, 255, 255, 0.4)"
                    } },
                    React.createElement("div", null, "Drag Start: X: " + this.state.dragStartX + ", Y: " + this.state.dragStartY),
                    React.createElement("div", null, "Drag End: X: " + this.state.dragEndX + ", Y: " + this.state.dragEndY))),
            this.props.DisplayWaves && React.createElement("div", { className: "waves" }, "\u00A0"),
            this.props.DisplayClouds && React.createElement("div", { className: "clouds" }, "\u00A0"),
            React.createElement("div", { id: "battle-map", className: "map deck-plan", style: {
                    cursor: "move",
                    width: (this.state.battleMap.width + 'px'),
                    height: (this.state.battleMap.height + 'px'),
                    textAlign: 'center',
                    transformOrigin: 'center center',
                    imageRendering: 'pixelated',
                    position: "relative",
                    left: (this.state.mapPosition.x + 'px'),
                    top: (this.state.mapPosition.y + 'px'),
                    transform: `scale(${this.state.zoom})`
                } },
                !this.state.displayMenu &&
                    React.createElement("button", { className: "btn btn-light btn-lg control-toggle-button fs-2", onClick: () => { this.setState({ displayMenu: true }); } }, "Menu"),
                this.state.displayMenu &&
                    React.createElement(BattleMapObjectMenu, { CurrentLayer: this.state.currentDeck, DisplayLocations: this.state.displayLocations, FloorPlan: this.state.battleMap, CloseMenu: () => this.setState({ displayMenu: false }), SetCurrentLayer: (value) => this.setState({ currentDeck: value }), SetDisplayNotableLocations: (value) => this.setState({ displayLocations: value }) }),
                this.props.DisplayGrid &&
                    React.createElement("div", { className: "grid" }, "\u00A0"),
                React.createElement("div", { className: "map-object-layers", id: "Decks", style: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0px',
                        left: '0px'
                    }, onMouseDown: this.dragMapStart }, this.state.battleMap.decks.map((deck, index) => (index < this.state.currentDeck) && React.createElement(BattleMapLayer, { displayLocations: this.state.displayLocations, dragStart: this.dragCreatureStart, isWideShot: this.state.zoom < 1, object: deck, key: index }))))));
    }
}
BattleMap.defaultProps = {
    DisplayClouds: true,
    DisplayGrid: false,
    DisplayWaves: true,
    MaximumZoom: 4,
    MinimumZoom: 0.1,
    Precision: 100,
};
class BattleMapLayer extends React.Component {
    render() {
        return (React.createElement("div", { id: this.props.object.name, style: { backgroundImage: ('url(' + this.props.object.image + ')') } },
            this.props.displayLocations && this.props.object.locations.map((loc, index) => React.createElement(BattleMapLocation, { object: loc, key: index })),
            this.props.object.crew && this.props.object.crew.map((crew) => React.createElement(CreatureToken, { dragStart: this.props.dragStart, isWideShot: this.props.isWideShot, object: crew, key: crew.name }))));
    }
}
BattleMapLayer.defaultProps = {
    displayLocations: true,
};
class BattleMapLocation extends React.Component {
    render() {
        return (React.createElement("a", { href: "#", className: "smith city deck-location", style: { top: this.props.object.top, left: this.props.object.left } },
            "I",
            React.createElement("span", { className: "city-preview" },
                React.createElement("h1", null, this.props.object.name),
                this.props.object.description.map((paragraph, index) => React.createElement("p", { key: index }, paragraph)))));
    }
}
class CreatureToken extends React.Component {
    render() {
        const size = airshipGrid + 'px';
        return (React.createElement("div", { className: "pedestrian party pixels stay-visible battle-token", style: {
                width: size,
                height: size,
                top: (this.props.object.top * window.airshipGrid) + "px",
                left: (this.props.object.left * window.airshipGrid) + "px"
            }, onMouseDown: e => { this.props.dragStart(this.props.object.name, e); } },
            this.props.isWideShot && React.createElement("img", { className: "wide-shot scale-me", src: this.props.object.icon, alt: this.props.object.name }),
            !this.props.isWideShot && React.createElement("div", { className: "creature-token-img", style: { backgroundImage: `url('${this.props.object.full}')` } })));
    }
}
function restrictNumberToRange(value, lowerLimit, upperLimit) {
    return Math.max(Math.min(value, upperLimit), lowerLimit);
}
//# sourceMappingURL=battle-map.js.map