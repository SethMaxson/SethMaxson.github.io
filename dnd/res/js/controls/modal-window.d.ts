/// <reference types="jquery" />
/// <reference types="jqueryui" />
/// <reference types="react" />
declare class ModalWindow {
    reactRef: ReactHideableContainer | null;
    reactComponentMounted: boolean;
    element: JQuery<HTMLDivElement>;
    constructor(container: string);
    close(): void;
    dispose(): void;
    open(): void;
    mountReact(element: React.SFCElement<any> | React.SFCElement<any>[]): void;
    private unmountReact;
}
interface IModalWindowExitButtonProps {
    onClick: {
        (): void;
    };
}
declare class ModalWindowExitButton extends React.Component<IModalWindowExitButtonProps> {
    render(): JSX.Element;
}
interface IReactHideableContainerProps {
}
interface IReactHideableContainerState {
    showComponent: boolean;
}
declare class ReactHideableContainer<T extends IReactHideableContainerProps = IReactHideableContainerProps, T2 extends IReactHideableContainerState = IReactHideableContainerState> extends React.Component<T, IReactHideableContainerState> {
    constructor(props: IReactHideableContainerProps);
    hide(): void;
    show(): void;
    renderIfAppropriate(element: JSX.Element): JSX.Element | null;
}
