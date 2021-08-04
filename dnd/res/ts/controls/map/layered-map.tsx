interface IMapLayerObject
{
	name: string;
	popoverText: string;
	locked?: boolean;
	position: {
		x: number,
		y: number
	},
	size: {
		width: number,
		height: number
	}
}

interface IMapLayer
{
	image: string;
	objects: IMapLayerObject[];
}


interface ILayeredMapProps
{
	/**
	 * Indicates whether or not layers beneath the active one should also be displayed.
	 */
	displayStack: boolean;
	layers: IMapLayer[];
}
interface ILayeredMapState
{
	currentLayer: number;
	scale: number;
}
class LayeredMap extends React.Component<ILayeredMapProps, ILayeredMapState> {
	constructor(props: ILayeredMapProps)
	{
		super(props);
		this.changeLayer = this.changeLayer.bind(this);
		this.changeScale = this.changeScale.bind(this);
		this.state = {
			currentLayer: 0,
			scale: 1
		}
	}
	render()
	{
		return (
			<div className="h-100 w-100 outer-container d-flex flex-column">
				<div className="row bg-secondary w-100 m-0 text-light">
					<label htmlFor="zoom-range" className="col-2 col-md-auto col-form-label">Zoom:</label>
					<div className="col-10 col-md-auto">
						<input type="range" className="form-range" min="0.1" max="10" defaultValue="1" step="0.1" id="zoom-range" onChange={this.changeScale} />
					</div>

					<label htmlFor="layer-range" className="col-2 col-md-auto col-form-label">Layer:</label>
					<div className="col-10 col-md-auto">
						<input type="range" className="form-range" min="0" max={this.props.layers.length - 1} defaultValue="0" id="layer-range" onChange={this.changeLayer} />
					</div>
				</div>
				<div className="layer-container row flex-grow-1 h-100 w-100 m-0">
					{this.props.layers.map((image, index: number) =>
						(this.state.currentLayer == index || this.props.displayStack) && <LayeredMapLayer layer={image} scale={this.state.scale} key={index} />
					)}
				</div>
			</div>
		);
	}
	changeLayer(event: React.ChangeEvent)
	{
		this.setState({ currentLayer: parseInt((event.target as HTMLInputElement).value) });
	}
	changeScale(event: React.ChangeEvent)
	{
		this.setState({ scale: parseFloat((event.target as HTMLInputElement).value) });
	}
}

interface ILayeredMapLayerProps
{
	layer: IMapLayer;
	scale: number;
}
class LayeredMapLayer extends React.Component<ILayeredMapLayerProps> {
	render()
	{
		return (
			<div className="h-100 w-100 overflow-auto p-0 m-0 position-relative">
					{this.props.layer.objects.map((object, index: number) =>
						<div className="modal fade" id={object.name.replaceAll(" ", "").replaceAll("'", "") + "Modal"} tabIndex={-1} aria-labelledby={object.name.replaceAll(" ", "").replaceAll("'", "") + "ModalLabel"} aria-hidden="true" key={index}>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id={object.name.replaceAll(" ", "").replaceAll("'", "") + "ModalLabel"}>{object.name + (object.locked ? " (Locked)" : "")}</h5>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body" dangerouslySetInnerHTML={{__html: object.popoverText}} />
									<div className="modal-footer">
										<button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>
					)}
				<div className="w-auto p-0 m-0 position-relative" style={{ transformOrigin: "top left", transform: "scale(" + this.props.scale + ")" }}>
					{this.props.layer.objects.map((object, index: number) =>
						<a
							className={"border border-1 position-absolute d-block " + (object.locked? "border-danger" : "border-info")}
							role="button"
							data-bs-toggle="modal"
							data-bs-target={"#" + object.name.replaceAll(" ", "").replaceAll("'", "") + "Modal"}
							style={{ left: object.position.x + "px", top: object.position.y + "px", width: object.size.width + "px", height: object.size.height + "px" }}
							title={object.name}
							key={index}
						>
						</a>
					)}
					<img src={this.props.layer.image} style={{imageRendering: "pixelated"}} />
				</div>
			</div>
		);
	}
}