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
		super.mountReact(<CityBlurb JsonObject={city} ref={(component) => { me.reactRef = component }} />);
		super.open();
	}
}

interface ICityBlurbProps
{
	JsonObject: ICity;
}

class CityBlurb extends ReactHideableContainer<ICityBlurbProps, IReactHideableContainerState> {
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