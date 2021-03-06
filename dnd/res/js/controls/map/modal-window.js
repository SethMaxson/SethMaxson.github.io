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
class CharacterPortrait extends React.Component {
    render() {
        return (React.createElement("div", { className: "portrait-frame" },
            React.createElement("img", { src: this.props.image, alt: "Character Portrait" })));
    }
}
class CharacterName extends React.Component {
    render() {
        return (React.createElement("div", { className: "name" }, this.props.name));
    }
}
class CharacterProperties extends React.Component {
    render() {
        return (React.createElement("div", { className: "properties" },
            this.props.alignment,
            ", ",
            this.props.race,
            ", ",
            this.props.class,
            React.createElement("br", null),
            "First Appearance: ",
            this.props.firstAppearance,
            React.createElement("br", null),
            "Total Appearances: ",
            this.props.totalAppearances));
    }
}
class ParagraphFromRawHTML extends React.Component {
    render() {
        return (React.createElement("p", { dangerouslySetInnerHTML: { __html: this.props.text } }));
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
class CharacterSlide extends ReactHideableContainer {
    constructor(props) {
        super(props);
    }
    render() {
        return (super.renderIfAppropriate(React.createElement("div", null,
            React.createElement(CharacterName, { name: this.props.JsonObject.name, tagline: this.props.JsonObject.tagline }),
            React.createElement(CharacterProperties, { alignment: this.props.JsonObject.alignment, race: this.props.JsonObject.race, class: this.props.JsonObject.class, firstAppearance: this.props.JsonObject.firstAppearance, totalAppearances: this.props.JsonObject.totalAppearances }),
            React.createElement(ParagraphFromRawHTML, { text: this.props.JsonObject.description }),
            this.props.JsonObject.information.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
            React.createElement(CharacterPortrait, { image: this.props.JsonObject.image }))));
    }
}
const CHARACTER = {
    name: "Jasper Nightbreeze",
    tagline: "Adrift in Time",
    image: "/dnd/img/characters/party/jasper_portrait.png",
    themeColor: "#48A9A6",
    alignment: "CG",
    race: "Simic Hybrid",
    class: "Eldritch Knight",
    firstAppearance: "Birth of the Resistance (11/17/2018)",
    totalAppearances: 13,
    titles: [
        "Sir Jasper the Bold"
    ],
    dmNotes: [
        "From Dom: Jasper is a solider??frozen from the past. Jasper grew up with her sister Mirage and they were inseparable. When Mirage got older she decided she wanted to go into the military and be a solider. Jasper was not used to being away from her sister but Jasper was a male. Jasper worked part time as a Simic scientist and decided to do tests on himself. After some experiments Jasper was able to convert himself into a female to join the military with his sister but not with repercussions. Jasper not only had a new body but powers and wings to go with it. Jasper and Mirage discussed the new change and decided to try and sign up. Jasper made it through training by carefully concealing her wings. But one night an officer went into Mirage???s and Jasper???s bunker and saw Jasper???s wings. The officer demanded Jasper come with him and they went off to his station. When the officer pulled up her file and looked through it and noticed that Jasper used to be a man but transitioned into a female. Outraged the officer was angry this was overlooked and decided to put Jasper down as dishonorable discharge because he felt like just because Jasper identified as female doesn???t make her a true female.",
        "From Dom, partially revised: Jasper is a solider??frozen from the past. Jasper grew up with her sister Mirage and they were inseparable. When Mirage got older she decided she wanted to join the military and be a solider. Jasper was not used to being away from her sister, but Jasper was a male. Jasper worked part time as a Simic scientist and decided to conduct tests on himself. After some experiments Jasper was able to convert himself into a female to join the military with his sister, but this was not without repercussions. Jasper not only had a new body but powers and wings to go with it. Jasper and Mirage discussed the new change and decided to try and enlist. Jasper made it through training by carefully concealing her wings. But one night an officer went into Mirage???s and Jasper???s bunker and saw Jasper???s wings. The officer demanded Jasper come with him and they went off to his station. When the officer pulled up her file and looked through it and noticed that Jasper used to be a man but transitioned into a female. Outraged, the officer was angry this was overlooked and decided to put Jasper down as dishonorable discharge because he felt like just because Jasper identified as female doesn???t make her a true female.",
        "Jasper was once a male, but the same experiments that gave Jasper her powers also changed her sex. Her main drives are to protect the innocent and find her sister. Revenge would also be a plus.",
        "Note to self: winged elves are typically called 'Avariel'. May use this at some point."
    ],
    description: "Jasper is a gifted swordswoman who dabbles in the arcane arts. She is still learning how to interact with most of the more modern technology of Geoss, but that has done nothing to dampen her unwavering dedication to the forces of good.",
    information: [
        "Jasper was orphaned at an early age, and subsequently raised by her elder sister, Mirage. Jasper spent her childhood years learning to value the greater good, and practicing arcane magic under the guidance of her sister. When Jasper was nearing adulthood, her sister was called away to war. Jasper used the resources in her sister's arcane study to undergo alterations in order to follow her to war.",
        "Jasper proved to be a ferocious warrior with a strong moral compass. However, her commander discovered that she had undergone mutations in order to enlist. Learning that she was unqualified for service, the commander discharged her immediately.",
        "Jasper continued to do her best to serve the public as a wandering adventurer. Her success was mixed, but she remained content in the knowledge that she served the greater good. Eventually her adventures saw her turned to stone. She spent roughly five centuries in this state before eventually being thawed by <span class=\"ally\">Cog</span> to once again fight for the good of Geoss."
    ]
};
//# sourceMappingURL=modal-window.js.map