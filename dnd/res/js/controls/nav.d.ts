/// <reference types="react" />
interface INavProps {
}
declare class Nav extends React.Component<INavProps> {
    render(): JSX.Element;
}
interface ILoginButtonProps {
}
interface ILoginButtonState {
    loggedIn: boolean;
}
declare class LoginButton extends React.Component<ILoginButtonProps, ILoginButtonState> {
    constructor(props: ILoginButtonProps);
    render(): JSX.Element;
    logout(): void;
}
