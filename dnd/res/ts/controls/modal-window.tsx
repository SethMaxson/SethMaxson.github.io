class ModalWindow
{
	reactRef: ReactHideableContainer | null = null;
	reactComponentMounted: boolean = true;
	element: JQuery<HTMLDivElement>;
	constructor(container: string)
	{
		let me = this;
		this.element = $(`<div class="modal-window">
			<button class="modal-close-button">X</button>
			<div class="render-panel">
			</div>
		</div>`);
		$(container).append(this.element);

		this.element.find(".modal-close-button").on("click", function ()
		{
			me.close();
		});

		// this.mountReact(<CharacterSlide JsonObject={CHARACTER} ref={(component) => { me.reactRef = component }} />);
		// this.mountReact(<CityBlurb JsonObject={CITY} ref={(component) => { me.reactRef = component }} />);
	}
	close()
	{
		this.reactRef?.hide();
		this.element.hide();
	}
	dispose()
	{
		this.element.remove();
		this.unmountReact();
	}
	open()
	{
		this.reactRef?.show();
		this.element.show();
	}
	mountReact(element: React.SFCElement<any> | React.SFCElement<any>[])
	{
		ReactDOM.render(
			element,
			this.element.find(".render-panel")[0]
		);
		this.reactComponentMounted = true;
	}
	private unmountReact()
	{
		ReactDOM.unmountComponentAtNode(this.element.find(".render-panel")[0] as HTMLElement);
		this.reactComponentMounted = false;
	}
}

interface IModalWindowExitButtonProps
{
	onClick: { (): void };
}
class ModalWindowExitButton extends React.Component<IModalWindowExitButtonProps> {
	render() {
		return (
			<button onClick={this.props.onClick}>X</button>
		);
	}
}

interface IReactHideableContainerProps
{

}

interface IReactHideableContainerState
{
	showComponent: boolean;
}


class ReactHideableContainer<T extends IReactHideableContainerProps = IReactHideableContainerProps, T2 extends IReactHideableContainerState = IReactHideableContainerState> extends React.Component<T, IReactHideableContainerState> {
	constructor(props: IReactHideableContainerProps) {
		super(props as Readonly<T>);
		this.state = {
			showComponent: true
		};

		// This binding is necessary to make `this` work in the callback
		this.hide = this.hide.bind(this);
		this.show = this.show.bind(this);
	}

	hide() {
		this.setState({
			showComponent: false
		})
	}

	show() {
		this.setState({
			showComponent: true
		})
	}

	renderIfAppropriate(element: JSX.Element) {
		if (!this.state.showComponent) {
			return null;
		}
		return (
			element
		);
	}
}