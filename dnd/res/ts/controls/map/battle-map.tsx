interface I2DPoint { x: number, y: number };
interface ICreatureToken extends ICrewMember
{
	dragging: boolean;
}
interface IBattleMapLayer
{
	/**The url of the image representing this map layer. */
	image: string;
	/**The technical name of this map layer */
	name: string;
	/**Noteworthy locations (such as landmarks or buildings) on this map layer. */
	locations: IDeckLocation[];
	/**Any crew members present on this deck. */
	crew?: ICreatureToken[];
}
interface IBattleMap
{
	name: string;
	width: number;
	height: number;
	gridSize: number;
	decks: IBattleMapLayer[];
}

interface IBattleMapProps
{
	DeckPlan: IDeckPlan;
	DisplayClouds: boolean;
	DisplayGrid: boolean;
	DisplayWaves: boolean;
	MaximumZoom: number;
	MinimumZoom: number;
	Precision: number;
}
interface IBattleMapState
{
	battleMap: IBattleMap;
	capturedStartLocation: boolean;
	currentDeck: number;
	displayLocations: boolean;
	displayMenu: boolean;
	/**Indicates whether an item in the map is currently being dragged. */
	dragging: boolean;
	dragStartX: number;
	dragStartY: number;
	dragEndX: number;
	dragEndY: number;
	lastPositionX: number;
	lastPositionY: number;
	mapPosition: I2DPoint;
	initialMapPosition: I2DPoint;
	zoom: number;
}
class BattleMap extends React.Component<IBattleMapProps, IBattleMapState> {
	public static defaultProps = {
		DisplayClouds: true,
		DisplayGrid: false,
		DisplayWaves: true,
		MaximumZoom: 4,
		MinimumZoom: 0.1,
		Precision: 100,
	};
	constructor(props: IBattleMapProps)
	{
		super(props);

		//@ts-ignore
		const battleMap: IBattleMap = Object.assign({}, props.DeckPlan);
		battleMap.decks.map(layer =>
		{
			if (layer.crew) {
				layer.crew.map(token =>
				{
					token.dragging = false;
				})
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
	componentWillReceiveProps(nextProps: IBattleMapProps)
	{
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.DeckPlan.decks.length < this.state.currentDeck)
		{
			this.setState({ currentDeck: nextProps.DeckPlan.decks.length });
		}
	}
	public render()
	{
		return (
			<div
				id="map-body"
				className="map-body"
				style={{ overflow: 'hidden', height: '100%', width: "100%" }}
				onMouseUp={this.dragStop}
				onMouseMove={this.handleMouseMove}
				onWheel={this.handleMouseWheel}
				// onMouseLeave={this.dragStop}
			>
				<div className="map-controls" style={{ zIndex: 2, paddingLeft: '80px' }}>
					- <input
						type="range"
						min={this.props.MinimumZoom}
						max={this.props.MaximumZoom}
						value={this.state.zoom}
						step={0.01}
						className="slider"
						id="map-zoom"
						onChange={e => this.zoom(e.target.valueAsNumber)}
					/> +
					<input type="number" name="previous-zoom" id="previous-zoom" defaultValue="0.50" style={{ display: 'none' }} />
					<div style={{
						background: "rgba(255, 255, 255, 0.4)"
					}}>
						<div>{"Drag Start: X: " + this.state.dragStartX + ", Y: " + this.state.dragStartY}</div>
						<div>{"Drag End: X: " + this.state.dragEndX + ", Y: " + this.state.dragEndY}</div>
					</div>
				</div>
				{this.props.DisplayWaves && <div className="waves">&nbsp;</div>}
				{this.props.DisplayClouds && <div className="clouds">&nbsp;</div>}
				<div
					id="battle-map"
					className="map deck-plan"
					style={{
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
					}}
				>
					{
						!this.state.displayMenu &&
						<button className="btn btn-light btn-lg control-toggle-button fs-2" onClick={() => { this.setState({ displayMenu: true }) }}>
							Menu
						</button>
					}
					{
						this.state.displayMenu &&
						<BattleMapObjectMenu
							CurrentLayer={this.state.currentDeck}
							DisplayLocations={this.state.displayLocations}
							FloorPlan={this.state.battleMap}
							CloseMenu={() => this.setState({ displayMenu: false })}
							SetCurrentLayer={(value: number) => this.setState({ currentDeck: value })}
							SetDisplayNotableLocations={(value: boolean) => this.setState({ displayLocations: value })}
						/>
					}
					{
						this.props.DisplayGrid &&
						<div className="grid">
							&#160;
						</div>
					}
					<div
						className="map-object-layers"
						id="Decks"
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: '0px',
							left: '0px'
						}}
						onMouseDown={this.dragMapStart}
					>
						{this.state.battleMap.decks.map((deck, index: number) =>
							(index < this.state.currentDeck) && <BattleMapLayer
								displayLocations={this.state.displayLocations}
								dragStart={this.dragCreatureStart}
								isWideShot={this.state.zoom < 1}
								object={deck}
								key={index}
							/>
						)}
					</div>
				</div>
			</div>

		);
	}
	getActiveMapLayer = (): IBattleMapLayer => this.state.battleMap.decks[this.state.currentDeck - 1];
	getDraggedCreature = (): ICreatureToken | undefined =>
	{
		if (this.state.dragging && this.state.battleMap.decks.length > 0) {
			const draggedCreatures = this.getActiveMapLayer().crew?.filter(creature => creature.dragging);
			if (draggedCreatures && draggedCreatures?.length > 0) {
				return draggedCreatures[0];
			}
		}
		return undefined;
	}
	getRelativeMousePosition = (e: React.MouseEvent, isMapSubObject: boolean = false) =>
	{
		const applicableZoom = isMapSubObject ? this.state.zoom : 1;
		const windowAdjustmentFactor = isMapSubObject ? 0 : 0.5;
		let dragStartX = Math.round(
			(
				(e.screenX / applicableZoom)
				- (this.state.initialMapPosition.x / applicableZoom)
				- (window.innerWidth as number * windowAdjustmentFactor)
			)
		);
		let dragStartY = Math.round(((e.pageY / applicableZoom) - (this.state.initialMapPosition.y / applicableZoom) - (window.innerHeight as number * windowAdjustmentFactor)));
		return { x: dragStartX, y: dragStartY };
	}
	handleMouseMove = (e: React.MouseEvent) =>
	{
		if (this.state.dragging) {
			const draggedCreature = this.getDraggedCreature();

			const newPosition = ctrlkey? { x: this.state.dragStartX, y: this.state.dragStartY } : this.getRelativeMousePosition(e, draggedCreature != undefined);
			const deltaX = (newPosition.x - this.state.dragStartX);
			const deltaY = (newPosition.y - this.state.dragStartY);

			if (!this.state.capturedStartLocation)
			{
				this.setState({
					capturedStartLocation: true,
					dragStartX: newPosition.x,
					dragStartY: newPosition.y
				});
			 }
			else if (draggedCreature)
			{
				const gridDeltaX = Math.floor(deltaX / airshipGrid);
				const gridDeltaY = Math.floor(deltaY / airshipGrid);


				const newBattleMapState = Object.assign({}, this.state.battleMap);
				const newMapLayer = Object.assign({}, newBattleMapState.decks[this.state.currentDeck - 1]);
				const creature = this.getDraggedCreature();
				if (creature)
				{
					newMapLayer.crew = JSON.parse(JSON.stringify(newMapLayer.crew));
					const newCreature = newMapLayer.crew?.filter(token => token.name == creature.name)[0] as ICreatureToken;
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
			else
			{
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
	}
	handleMouseWheel = (e: React.WheelEvent) =>
	{
		const delta = e.deltaY;
		const startZoom = this.state.zoom;
		let newZoom = startZoom;
		if(delta > 0) {
			newZoom -= 0.05;
		}
		else{
			newZoom += 0.05;
		}
		this.zoom(newZoom);
	}
	dragCreatureStart = (creatureName: string, e: React.MouseEvent) =>
	{
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
	}
	dragMapStart = (e: React.MouseEvent) =>
	{
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
	}
	dragStop = () =>
	{
		if (this.state.dragging)
		{
			const wasDraggingCreature = this.getDraggedCreature() != undefined;
			if (wasDraggingCreature) {
				const newBattleMapState = Object.assign({}, this.state.battleMap);
				newBattleMapState.decks.map(layer =>
				{
					layer.crew?.map(token =>
					{
						token.dragging = false
					});
				})
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
			else
			{
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
	}
	zoom = (zoom: number) =>
	{
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
	}
}

interface IBattleMapLayerProps
{
	displayLocations: boolean;
	dragStart: { (creatureName: string, e: React.MouseEvent): void };
	isWideShot: boolean;
	object: IBattleMapLayer;
}
class BattleMapLayer extends React.Component<IBattleMapLayerProps> {
	public static defaultProps = {
		displayLocations: true,
	};
	public render()
	{
		return (
			<div id={this.props.object.name} style={{ backgroundImage: ('url(' + this.props.object.image + ')') }}>
				{this.props.displayLocations && this.props.object.locations.map((loc, index: number) =>
					<BattleMapLocation object={loc} key={index} />
				)}
				{this.props.object.crew && this.props.object.crew.map((crew) =>
					<CreatureToken
						dragStart={this.props.dragStart}
						isWideShot={this.props.isWideShot}
						object={crew}
						key={crew.name}
					/>
				)}
			</div>
		);
	}
}

interface IBattleMapLocationProps
{
	object: IDeckLocation;
}
class BattleMapLocation extends React.Component<IBattleMapLocationProps> {
	public render()
	{
		return (
			<a href="#" className="smith city deck-location" style={{ top: this.props.object.top, left: this.props.object.left }}>
				{/* <a href="#" className="smith city deck-location d-none d-lg-block" style={{top: this.props.object.top, left: this.props.object.left}}> */}
				I
				<span className="city-preview">
					<h1>{this.props.object.name}</h1>
					{this.props.object.description.map((paragraph, index: number) =>
						<p key={index}>
							{paragraph}
						</p>
					)}
				</span>
			</a>

		);
	}
}

interface ICreatureTokenProps
{
	dragStart: { (creatureName: string, e: React.MouseEvent): void };
	isWideShot: boolean;
	object: ICreatureToken;
}
class CreatureToken extends React.Component<ICreatureTokenProps> {
	public render()
	{
		const size = airshipGrid + 'px';
		return (
			<div
				className="pedestrian party pixels stay-visible battle-token"
				style={{
					width: size,
					height: size,
					top: (this.props.object.top * window.airshipGrid) + "px",
					left: (this.props.object.left * window.airshipGrid) + "px"
				}}
				onMouseDown={e => { this.props.dragStart(this.props.object.name, e) } }
			>
				{this.props.isWideShot && <img className="wide-shot scale-me" src={this.props.object.icon} alt={this.props.object.name} />}
				{/* <img className="close-up" src={this.props.object.full} alt={this.props.object.name} /> */}
				{!this.props.isWideShot && <div className="creature-token-img" style={{backgroundImage: `url('${this.props.object.full}')`}}></div>}
				{/* <span className="city-preview">
					<h1>{this.props.object.name}</h1>
				</span> */}
			</div>
		);
	}
}

function restrictNumberToRange(value: number, lowerLimit: number, upperLimit: number): number
{
	return Math.max(Math.min(value, upperLimit), lowerLimit);
}