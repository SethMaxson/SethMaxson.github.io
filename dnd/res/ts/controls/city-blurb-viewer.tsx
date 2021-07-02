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