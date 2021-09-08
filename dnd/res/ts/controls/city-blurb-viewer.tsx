class CityBlurbViewer extends ModalWindow
{
	constructor(container: string)
	{
		super(container);
	}
	close()
	{
		this.reactRef?.hide();
		this.element.hide();
	}
	displayCity(city: ICity)
	{
		let me = this;
		super.mountReact(<CityBlurbDeprecated JsonObject={city} ref={(component) => { me.reactRef = component }} />);
		super.open();
	}
}


interface ICityBlurbOffCanvasProps
{
	city?: ICity;
}
class CityBlurbOffCanvas extends React.Component<ICityBlurbOffCanvasProps> {
	render()
	{
		return (
			<div className="offcanvas offcanvas-end" tabIndex={-1} id="city-blurb-offcanvas" aria-labelledby="city-blurb-offcanvas-label">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="city-blurb-offcanvas-label">Offcanvas</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					{this.props.city && <CityBlurb JsonObject={this.props.city} />}
				</div>
			</div>
		);
	}
}

interface ICityBlurbProps
{
	JsonObject: ICity;
}

class CityBlurbDeprecated extends ReactHideableContainer<ICityBlurbProps, IReactHideableContainerState> {
	render()
	{
		return (
			super.renderIfAppropriate(
				<div>
					<h1>{this.props.JsonObject.name}</h1>
					{this.props.JsonObject.description.map((paragraph, index: number) =>
						<ParagraphFromRawHTML text={paragraph} key={index} />
					)}
					{this.props.JsonObject.culture.length > 0 && <h2>Culture.</h2>}
					{this.props.JsonObject.culture.map((paragraph, index: number) =>
						<ParagraphFromRawHTML text={paragraph} key={index} />
					)}
					{this.props.JsonObject.dmNotes.map((paragraph, index: number) =>
						<p className="dmnotes" style={{ display: 'none' }}>{paragraph}</p>
					)}
					{this.props.JsonObject.url.length > 1 && <a href={this.props.JsonObject.url}>&gt;City Details&lt;</a>}
				</div>
			)
		)
	}
}


class CityBlurb extends React.Component<ICityBlurbProps> {
	render() {
		return (
			<div>
				<h1>{this.props.JsonObject.name}</h1>
				{this.props.JsonObject.description.map((paragraph, index: number) =>
					<ParagraphFromRawHTML text={paragraph} key={index} />
				)}
				{this.props.JsonObject.culture.length > 0 && <h2>Culture.</h2>}
				{this.props.JsonObject.culture.map((paragraph, index: number) =>
					<ParagraphFromRawHTML text={paragraph} key={index} />
				)}
				{this.props.JsonObject.dmNotes.map((paragraph, index: number) =>
					<p className="dmnotes" style={{ display: 'none' }}>{paragraph}</p>
				)}
				{this.props.JsonObject.url.length > 1 && <a href={this.props.JsonObject.url}>&gt;City Details&lt;</a>}
			</div>
		);
	}
}