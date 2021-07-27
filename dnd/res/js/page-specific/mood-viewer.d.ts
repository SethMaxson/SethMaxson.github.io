/// <reference types="react" />
interface IMoodViewerProps {
    dioramas: IDioramaIndex;
}
interface IMoodViewerState {
    dioramaShownAtLoad: boolean;
    selectedDiorama: IDioramaProps;
}
declare class MoodViewer extends React.Component<IMoodViewerProps, IMoodViewerState> {
    constructor(props: IMoodViewerProps);
    render(): JSX.Element;
    changeDiorama(diorama: IDioramaProps): void;
}
interface IDioramaModalProps {
    diorama: IDioramaProps;
    startShown: boolean;
}
declare class DioramaModal extends React.Component<IDioramaModalProps> {
    render(): JSX.Element;
}
interface IDioramaLinkProps {
    diorama: IDioramaProps;
    onClick: {
        (diorama: IDioramaProps): void;
    };
}
declare class DioramaLink extends React.Component<IDioramaLinkProps> {
    render(): JSX.Element;
}
interface IDioramaIndex {
    cities: IDioramaProps[];
    continents: IDioramaProps[];
    misc: IDioramaProps[];
    regions: IDioramaProps[];
}
declare const DIORAMAS: IDioramaIndex;
