interface ILoginButtonProps
{
	/** The URL of the page to which the user will be redirected after a successful login. */
	redirectUrl?: string;
}
interface ILoginButtonState
{
	loggedIn: boolean;
}
class LoginButton extends React.Component<ILoginButtonProps, ILoginButtonState> {
	constructor(props: ILoginButtonProps)
	{
		super(props);
		this.logout = this.logout.bind(this);

		this.state = {
			loggedIn: (storage.userId != undefined && storage.userId > 0)
		}
	}
	render()
	{
		if (this.state.loggedIn) {
			return (
				<div className="nav-item">
					<button className="nav-link bg-transparent border-0" onClick={this.logout}><i>Logged in as {storage.userName}. </i>Log out</button>
				</div>
			);
		}
		else {
			return (
				<a className="nav-item nav-link" href={"/dnd/pages/login.html" + (this.props.redirectUrl? ("?redirect=" + this.props.redirectUrl) : "")}>Sign in</a>
			);
		}
	}
	logout()
	{
		storage.userId = -1;
		storage.userName = "";
		this.setState({ loggedIn: false });
	}
}