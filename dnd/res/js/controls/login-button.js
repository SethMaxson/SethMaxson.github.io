"use strict";
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
                React.createElement("button", { className: "nav-link bg-transparent border-0", onClick: this.logout },
                    "Logged in as ",
                    storage.userName,
                    ". ",
                    React.createElement("u", null, "Log out"))));
        }
        else {
            return (React.createElement("a", { className: "nav-item nav-link", href: "/dnd/pages/login.html" + (this.props.redirectUrl ? ("?redirect=" + this.props.redirectUrl) : "") }, "Sign in"));
        }
    }
    logout() {
        storage.userId = -1;
        storage.userName = "";
        this.setState({ loggedIn: false });
    }
}
//# sourceMappingURL=login-button.js.map