"use strict";
class ParagraphFromRawHTML extends React.Component {
    render() {
        return (React.createElement("p", { dangerouslySetInnerHTML: { __html: this.props.text } }));
    }
}
//# sourceMappingURL=react-controls.js.map