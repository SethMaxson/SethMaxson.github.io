"use strict";
class MercenariesTestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGroup: undefined,
            displayType: "all",
            groups: [],
            showDmNotes: false,
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "container bg-light" },
                React.createElement("div", { className: "text-center p-1" },
                    React.createElement("input", { type: "radio", className: "btn-check", name: "quest-filter", id: "display-all", autoComplete: "off", checked: this.state.displayType == "all", onClick: () => { this.setState({ displayType: "all" }); } }),
                    React.createElement("label", { className: "btn btn-secondary mx-1", htmlFor: "display-all" }, "All"),
                    React.createElement("input", { type: "radio", className: "btn-check", name: "quest-filter", id: "reg-req", autoComplete: "off", checked: this.state.displayType == "reg-req", onClick: () => { this.setState({ displayType: "reg-req" }); } }),
                    React.createElement("label", { className: "btn btn-secondary mx-1", htmlFor: "reg-req" }, "Registration Required"),
                    React.createElement("input", { type: "radio", className: "btn-check", name: "quest-filter", id: "reg-not-req", autoComplete: "off", checked: this.state.displayType == "reg-not-req", onClick: () => { this.setState({ displayType: "reg-not-req" }); } }),
                    React.createElement("label", { className: "btn btn-secondary mx-1", htmlFor: "reg-not-req" }, "Registration Not Required")),
                React.createElement("div", { className: "form-check form-switch ms-2" },
                    React.createElement("input", { className: "form-check-input", type: "checkbox", id: "dm-notes-switch", checked: this.state.showDmNotes, onChange: () => { this.setState({ showDmNotes: !this.state.showDmNotes }); } }),
                    React.createElement("label", { className: "form-check-label", htmlFor: "dm-notes-switch" }, "Show DM Notes")),
                React.createElement("table", { className: "table table-light table-bordered table-hover" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: "table-dark" },
                            React.createElement("th", { onClick: () => { } }, "Row"),
                            React.createElement("th", { onClick: () => { } }, "Name"))),
                    React.createElement("tbody", null, this.state.groups.map((quest, index) => React.createElement("tr", { key: index },
                        React.createElement("td", null, index + 1),
                        React.createElement("td", null,
                            React.createElement("button", { className: "btn btn-link lh-sm", onClick: () => { this.setState({ currentGroup: quest }); } }, quest.name))))))),
            (this.state.currentGroup) &&
                React.createElement(MercenaryGroupDetails, { Group: this.state.currentGroup, OnClose: () => { this.setState({ currentGroup: undefined }); }, ShowDmNotes: this.state.showDmNotes })));
    }
    componentDidMount() {
        const self = this;
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/world/mercenaries.json",
            dataType: 'json',
            success: function (items) {
                self.setState({ groups: items });
            }
        });
    }
}
class MercenaryGroupDetails extends React.Component {
    render() {
        return (React.createElement("div", { className: "modal show", style: { display: "block" } },
            React.createElement("div", { className: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h5", { className: "modal-title", id: "exampleModalLabel" }, this.props.Group.name),
                        React.createElement("button", { type: "button", className: "btn-close", onClick: this.props.OnClose })),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("div", { className: "player-notes" }, this.props.Group.notes.player.map((note, index) => React.createElement("p", { key: index }, note))),
                        this.props.ShowDmNotes &&
                            React.createElement("div", { className: "dm-notes" }, this.props.Group.notes.dm.map((note, index) => React.createElement("p", { key: index }, note))))))));
    }
}
//# sourceMappingURL=mercenaries.js.map