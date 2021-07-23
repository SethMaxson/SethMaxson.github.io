"use strict";
class ModalWindow {
    constructor(container) {
        this.reactRef = null;
        this.reactComponentMounted = true;
        let me = this;
        this.element = $(`<div class="modal-window">
			<button class="modal-close-button">X</button>
			<div class="render-panel">
			</div>
		</div>`);
        $(container).append(this.element);
        this.element.find(".modal-close-button").on("click", function () {
            me.close();
        });
        // this.mountReact(<CharacterSlide JsonObject={CHARACTER} ref={(component) => { me.reactRef = component }} />);
        // this.mountReact(<CityBlurb JsonObject={CITY} ref={(component) => { me.reactRef = component }} />);
    }
    close() {
        this.reactRef?.hide();
        this.element.hide();
    }
    dispose() {
        this.element.remove();
        this.unmountReact();
    }
    open() {
        this.reactRef?.show();
        this.element.show();
    }
    mountReact(element) {
        ReactDOM.render(element, this.element.find(".render-panel")[0]);
        this.reactComponentMounted = true;
    }
    unmountReact() {
        ReactDOM.unmountComponentAtNode(this.element.find(".render-panel")[0]);
        this.reactComponentMounted = false;
    }
}
class ModalWindowExitButton extends React.Component {
    render() {
        return (React.createElement("button", { onClick: this.props.onClick }, "X"));
    }
}
class ReactHideableContainer extends React.Component {
    constructor(props) {
        super(props);
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
        });
    }
    show() {
        this.setState({
            showComponent: true
        });
    }
    renderIfAppropriate(element) {
        if (!this.state.showComponent) {
            return null;
        }
        return (element);
    }
}
//# sourceMappingURL=modal-window.js.map