"use strict";
class Nav extends React.Component {
    render() {
        return (React.createElement("div", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            React.createElement("a", { className: "navbar-brand", target: "mainFrame", href: "/dnd/pages/maps/worldatlas.html" }, "Geoss"),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
                React.createElement("div", { className: "navbar-nav me-auto" },
                    React.createElement("a", { className: "nav-item nav-link", href: "/index.html" }, "Sites List"),
                    React.createElement("div", { className: "nav-item dropdown" },
                        React.createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarWorldDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "World"),
                        React.createElement("div", { className: "dropdown-menu dropdown-menu-dark", "aria-labelledby": "navbarWorldDropdown" },
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/world/races.html", target: "mainFrame" }, "Races"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/world/guilds.html", target: "mainFrame" }, "Guilds"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/world/census-data-viewer.html", target: "mainFrame" }, "Census Data"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/maps/index.html", target: "mainFrame" }, "Maps"))),
                    React.createElement("div", { className: "nav-item dropdown" },
                        React.createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarLoreDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Lore"),
                        React.createElement("div", { className: "dropdown-menu dropdown-menu-dark", "aria-labelledby": "navbarLoreDropdown" },
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/pantheon.html", target: "mainFrame" }, "Pantheon"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/godfall_artifacts.html", target: "mainFrame" }, "Godfall Artifacts"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/sessionnotes.html", target: "mainFrame" }, "Session Notes"),
                            React.createElement("div", { className: "dropdown-divider" }),
                            React.createElement("h6", { className: "dropdown-header" }, "Characters"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/characters/hallofheroes.html", target: "mainFrame" }, "Hall of Heroes"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/characters/character-viewer.html", target: "mainFrame" }, "Party"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/lore/characters/allies.html", target: "mainFrame" }, "Allies"))),
                    React.createElement("div", { className: "nav-item dropdown" },
                        React.createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarRulesDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Rules"),
                        React.createElement("div", { className: "dropdown-menu dropdown-menu-dark", "aria-labelledby": "navbarRulesDropdown" },
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/rules/reincarnation.html", target: "mainFrame" }, "Reincarnation"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/rules/tenetsofgodhood.html", target: "mainFrame" }, "Tenets of Godhood"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/rules/items/weapons.html", target: "mainFrame" }, "Weapons"))),
                    React.createElement("div", { className: "nav-item dropdown" },
                        React.createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarToolDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Tools"),
                        React.createElement("div", { className: "dropdown-menu dropdown-menu-dark", "aria-labelledby": "navbarToolDropdown" },
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/world/moods/mood-viewer.html", target: "mainFrame" }, "Moods"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/tools/random-tables.html", target: "mainFrame" }, "Random Tables"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/tools/table.html", target: "mainFrame" }, "Table"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/tools/travel-calculator.html", target: "mainFrame" }, "Travel Calculator"),
                            React.createElement("a", { className: "dropdown-item disabled", href: "/dnd/pages/tools/charactercreation.html", target: "mainFrame" }, "Character Creation"),
                            React.createElement("div", { className: "dropdown-divider" }),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/adventures/index.html", target: "mainFrame" }, "Adventures"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/tools/generators/index.html", target: "mainFrame" }, "Random Generators"),
                            React.createElement("div", { className: "dropdown-divider" }),
                            React.createElement("h6", { className: "dropdown-header" }, "Campaign I"),
                            React.createElement("a", { className: "dropdown-item", href: "/dnd/pages/tools/militarystrength.html", target: "mainFrame" }, "Military Strength")))),
                React.createElement(LoginButton, null))));
    }
}
class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            loggedIn: (storage.userId != undefined && storage.userId > 0)
        };
    }
    render() {
        if (this.state.loggedIn) {
            return (React.createElement("div", { className: "nav-item" },
                React.createElement("button", { className: "nav-link bg-transparent border-0", onClick: this.logout }, "Log out")));
        }
        else {
            return (React.createElement("a", { className: "nav-item nav-link", href: "pages/login.html" }, "Sign in"));
        }
    }
    logout() {
        storage.userId = -1;
        storage.userName = "";
        this.setState({ loggedIn: false });
    }
}
ReactDOM.render(React.createElement(Nav, null), document.getElementById("top-nav"));
//# sourceMappingURL=nav.js.map