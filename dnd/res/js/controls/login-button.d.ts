/// <reference types="react" />
interface ILoginButtonProps {
    /** The URL of the page to which the user will be redirected after a successful login. */
    redirectUrl?: string;
}
interface ILoginButtonState {
    loggedIn: boolean;
}
declare class LoginButton extends React.Component<ILoginButtonProps, ILoginButtonState> {
    constructor(props: ILoginButtonProps);
    render(): JSX.Element;
    logout(): void;
}
