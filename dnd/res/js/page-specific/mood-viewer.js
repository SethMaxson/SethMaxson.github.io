"use strict";
class MoodViewer extends React.Component {
    constructor(props) {
        super(props);
        this.changeDiorama = this.changeDiorama.bind(this);
        let dioramaName = GetURLParameter("diorama");
        let matches = [];
        if (dioramaName) {
            matches = matches.concat(this.props.dioramas.cities.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
            matches = matches.concat(this.props.dioramas.continents.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
            matches = matches.concat(this.props.dioramas.misc.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
            matches = matches.concat(this.props.dioramas.regions.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
        }
        let selectedDiorama = matches.length > 0 ? matches[0] : this.props.dioramas.continents[0];
        this.state = {
            dioramaShownAtLoad: matches.length > 0,
            selectedDiorama: selectedDiorama
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("ul", { className: "nav nav-tabs sticky-top fixed-top bg-dark", id: "myTab", role: "tablist" },
                React.createElement("li", { className: "nav-item", role: "presentation" },
                    React.createElement("button", { className: "nav-link active", id: "continents-tab", "data-bs-toggle": "tab", "data-bs-target": "#continents", type: "button", role: "tab", "aria-controls": "continents", "aria-selected": "true" }, "Continents")),
                React.createElement("li", { className: "nav-item", role: "presentation" },
                    React.createElement("button", { className: "nav-link", id: "cities-tab", "data-bs-toggle": "tab", "data-bs-target": "#cities", type: "button", role: "tab", "aria-controls": "cities", "aria-selected": "false" }, "Cities")),
                React.createElement("li", { className: "nav-item", role: "presentation" },
                    React.createElement("button", { className: "nav-link", id: "regions-tab", "data-bs-toggle": "tab", "data-bs-target": "#regions", type: "button", role: "tab", "aria-controls": "regions", "aria-selected": "false" }, "Regions")),
                React.createElement("li", { className: "nav-item", role: "presentation" },
                    React.createElement("button", { className: "nav-link", id: "misc-tab", "data-bs-toggle": "tab", "data-bs-target": "#misc", type: "button", role: "tab", "aria-controls": "misc", "aria-selected": "false" }, "Misc."))),
            React.createElement("div", { className: "tab-content row", id: "myTabContent" },
                React.createElement("div", { className: "tab-pane show active", id: "continents", role: "tabpanel", "aria-labelledby": "continents-tab" },
                    React.createElement("div", { className: "list-group" }, this.props.dioramas.continents.map((diorama, index) => React.createElement(DioramaLink, { diorama: diorama, key: index, onClick: this.changeDiorama })))),
                React.createElement("div", { className: "tab-pane", id: "cities", role: "tabpanel", "aria-labelledby": "cities-tab" },
                    React.createElement("div", { className: "list-group" }, this.props.dioramas.cities.map((diorama, index) => React.createElement(DioramaLink, { diorama: diorama, key: index, onClick: this.changeDiorama })))),
                React.createElement("div", { className: "tab-pane", id: "regions", role: "tabpanel", "aria-labelledby": "regions-tab" },
                    React.createElement("div", { className: "list-group" }, this.props.dioramas.regions.map((diorama, index) => React.createElement(DioramaLink, { diorama: diorama, key: index, onClick: this.changeDiorama })))),
                React.createElement("div", { className: "tab-pane", id: "misc", role: "tabpanel", "aria-labelledby": "misc-tab" },
                    React.createElement("div", { className: "list-group" }, this.props.dioramas.misc.map((diorama, index) => React.createElement(DioramaLink, { diorama: diorama, key: index, onClick: this.changeDiorama }))))),
            React.createElement(DioramaModal, { diorama: this.state.selectedDiorama, startShown: this.state.dioramaShownAtLoad })));
    }
    changeDiorama(diorama) {
        this.setState({ selectedDiorama: diorama });
    }
}
class DioramaModal extends React.Component {
    render() {
        return (React.createElement("div", { className: "modal fade" + (this.props.startShown ? " show" : ""), id: "diorama-modal", "aria-labelledby": "diorama-modal-label", "aria-hidden": this.props.startShown ? "false" : "true", style: { display: this.props.startShown ? "block" : "none" } },
            React.createElement("div", { className: "modal-dialog modal-fullscreen" },
                React.createElement("div", { className: "modal-content bg-dark" },
                    React.createElement("div", { className: "modal-body p-1" },
                        React.createElement("button", { type: "button", className: "m-2 btn-close btn-close-white position-absolute top-0 end-0", "data-bs-dismiss": "modal", "aria-label": "Close" }),
                        React.createElement(Diorama, { background: this.props.diorama.background, title: this.props.diorama.title, cutouts: this.props.diorama.cutouts }))))));
    }
}
class DioramaLink extends React.Component {
    render() {
        return (React.createElement("button", { className: "list-group-item list-group-item-action", "data-bs-toggle": "modal", "data-bs-target": "#diorama-modal", onClick: (ev) => this.props.onClick(this.props.diorama) }, this.props.diorama.title));
    }
}
const DIORAMAS = {
    cities: [],
    continents: [
        {
            title: "Decapos",
            background: "/img/locales/remi-delabaudiere-ancient-kalampaka.jpg",
            cutouts: [
                {
                    height: 40,
                    name: "Tabaxi",
                    img: "/dnd/img/races/raceEntry/Tabaxi.png"
                },
                {
                    height: 40,
                    name: "Hobgoblin",
                    img: "/dnd/img/races/raceEntry/Hobgoblin.png"
                },
                {
                    height: 45,
                    name: "Myconid",
                    img: "/dnd/img/races/raceEntry/Myconid.png"
                },
                {
                    height: 35,
                    name: "Mongrelfolk",
                    img: "/dnd/img/races/raceEntry/Mongrelfolk.png"
                },
                {
                    height: 35,
                    name: "Kuo-Toa",
                    img: "/dnd/img/races/raceEntry/KuoToa.png"
                }
            ]
        },
        {
            title: "Notre",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        },
        {
            title: "Paros",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        },
        {
            title: "Peku",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        },
        {
            title: "Sutre",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        },
        {
            title: "Terrapim",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        }
    ],
    misc: [
        {
            title: "Temple of the Forest",
            background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "WickerBeak",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        }
    ],
    regions: [
        {
            title: "Scorchwind Desert",
            background: "/img/locales/windows_xp_bliss-wide.jpg",
            cutouts: [
                {
                    height: 55,
                    name: "string",
                    img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
                }
            ]
        }
    ]
};
ReactDOM.render(React.createElement(MoodViewer, { dioramas: DIORAMAS }), document.getElementById("mood-viewer-panel"));
//# sourceMappingURL=mood-viewer.js.map