"use strict";
//#region Cut Pasta from contracts.html
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
class BountyBoardMenu extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    render() {
        return (React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("button", { className: "btn btn-primary", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#brochureOffcanvas", "aria-controls": "brochureOffcanvas" }, "Open Brochure"),
                React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#BountyBoardMenuToggler", "aria-controls": "BountyBoardMenuToggler", "aria-expanded": "false", "aria-label": "Toggle menu" },
                    React.createElement("span", { className: "navbar-toggler-icon" })),
                React.createElement("div", { className: "collapse navbar-collapse", id: "BountyBoardMenuToggler" },
                    React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("select", { className: "form-select" }, this.props.shipIndex.map((ship, index) => React.createElement("option", { value: ship.name, key: index }, ship.name)))))))));
    }
}
class BountyBoardTestPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayQuest = (questID) => {
            this.setState({ currentQuest: questID });
        };
        this.state = {
            currentQuest: undefined,
            displayType: "all",
            quests: [],
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
                React.createElement("table", { className: "table table-light table-bordered table-hover" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: "table-dark" },
                            React.createElement("th", { onClick: () => { } }, "Name"),
                            React.createElement("th", { onClick: () => { } }, "Location"),
                            React.createElement("th", { onClick: () => { } }, "Rank"),
                            React.createElement("th", { onClick: () => { } }, "Payment"))),
                    React.createElement("tbody", null, this.state.quests.map((quest, index) => React.createElement("tr", { key: index },
                        React.createElement("td", null,
                            React.createElement("button", { className: "btn btn-link lh-sm", onClick: () => { this.setState({ currentQuest: quest.id }); } }, quest.name)),
                        React.createElement("td", null, quest.location),
                        React.createElement("td", { className: "rank" }, quest.rank),
                        React.createElement("td", { className: "credits" }, numberWithCommas(quest.payment.credits) + " cr")))))),
            (this.ActiveQuest) &&
                React.createElement(BountyDetails, { quest: this.ActiveQuest, onClose: () => { this.setState({ currentQuest: undefined }); } })));
    }
    componentDidMount() {
        const self = this;
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/quests.json",
            dataType: 'json',
            success: function (items) {
                let filteredItems = items.filter(function (entry) {
                    return entry.active === true;
                });
                filteredItems = filteredItems.filter(function (entry) {
                    return entry.rank !== "Unfinished";
                });
                self.setState({ quests: filteredItems });
            }
        });
    }
    get ActiveQuest() {
        let quest = undefined;
        if (this.state.currentQuest) {
            quest = this.state.quests.filter(entry => {
                return entry.id === this.state.currentQuest;
            })[0];
        }
        return quest;
    }
}
class BountyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDmNotes: false,
        };
    }
    render() {
        return (React.createElement("div", { className: "modal show", style: { display: "block" } },
            React.createElement("div", { className: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h5", { className: "modal-title", id: "exampleModalLabel" }, this.props.quest.name),
                        React.createElement("div", { className: "form-check form-switch ms-2" },
                            React.createElement("input", { className: "form-check-input", type: "checkbox", id: "dm-notes-switch", checked: this.state.showDmNotes, onChange: () => { this.setState({ showDmNotes: !this.state.showDmNotes }); } }),
                            React.createElement("label", { className: "form-check-label", htmlFor: "dm-notes-switch" }, "Show DM Notes")),
                        React.createElement("button", { type: "button", className: "btn-close", onClick: this.props.onClose })),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("div", { className: "row row-cols-1 row-cols-lg-2 g-0" },
                            React.createElement("div", { className: "col" },
                                React.createElement("div", { className: "card h-100" },
                                    React.createElement("div", { className: "card-body" },
                                        React.createElement("div", { className: "border-bottom" },
                                            React.createElement("div", { className: "fw-bold" }, "Rank:"),
                                            React.createElement("h4", { className: "text-center" }, this.props.quest.rank)),
                                        React.createElement("div", { className: "border-bottom" },
                                            React.createElement("b", null, "Payment:"),
                                            " ",
                                            numberWithCommas(this.props.quest.payment.credits)),
                                        React.createElement("div", { className: "border-bottom" },
                                            React.createElement("b", null, "Issuer:"),
                                            " ",
                                            this.props.quest.issuer),
                                        React.createElement("div", { className: "border-bottom" },
                                            React.createElement("b", null, "Location:"),
                                            " ",
                                            this.props.quest.location)))),
                            React.createElement("div", { className: "col" },
                                React.createElement("div", { className: "card h-100" },
                                    React.createElement("div", { className: "card-body" },
                                        React.createElement("div", { className: "player-notes" }, this.props.quest.notes.player.map((note, index) => React.createElement("p", { key: index }, note))),
                                        this.state.showDmNotes &&
                                            React.createElement("div", { className: "dm-notes" }, this.props.quest.notes.dm.map((note, index) => React.createElement("p", { key: index }, note))))))))))));
    }
}
ReactDOM.render(React.createElement(BountyBoardTestPage, null), document.getElementById("react-container"));
//# sourceMappingURL=bounty-board.js.map