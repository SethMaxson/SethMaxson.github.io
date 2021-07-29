interface ILayeredMapProps
{
	/**
	 * Indicates whether or not layers beneath the active one should also be displayed.
	 */
	displayStack: boolean;
	layers: string[];
}
interface ILayeredMapState
{
	currentLayer: number;
}
class LayeredMap extends React.Component<ILayeredMapProps, ILayeredMapState> {
	constructor(props: ILayeredMapProps)
	{
		super(props);
		this.changeLayer = this.changeLayer.bind(this);
		this.state = {
			currentLayer: 0
		}
	}
	render()
	{
		return (
			<div className="h-100 w-100 outer-container d-flex flex-column">
				<div className="row bg-light">
					{/* <label htmlFor="zoom-range" className="col-auto col-form-label">Zoom:</label>
					<div className="col-auto">
						<input type="range" className="form-range" min="10" max="500" defaultValue="50" id="zoom-range" />
					</div> */}

					<label htmlFor="layer-range" className="col-auto col-form-label">Layer:</label>
					<div className="col-auto">
						<input type="range" className="form-range" min="0" max={this.props.layers.length - 1} defaultValue="0" id="layer-range" onChange={this.changeLayer} />
					</div>
				</div>
				<div className="layer-container row flex-grow-1 h-100 w-100">
					{this.props.layers.map((image, index: number) =>
						(this.state.currentLayer == index || this.props.displayStack) && <LayeredMapLayer imageUrl={image} key={index} />
					)}
				</div>
			</div>
		);
	}
	changeLayer(event: React.ChangeEvent)
	{
		this.setState({ currentLayer: parseInt((event.target as HTMLInputElement).value) });
	}
}

interface ILayeredMapLayerProps
{
	imageUrl: string;
}
class LayeredMapLayer extends React.Component<ILayeredMapLayerProps> {
	render()
	{
		return (
			<div className="h-100 w-100 overflow-auto">
				<img src={this.props.imageUrl} />
			</div>
		);
	}
}