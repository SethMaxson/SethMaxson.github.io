/// <reference types="react" />
declare const SPECIESFILTERS: IFilterCategory[];
interface ISpeciesNameProps {
    name: string;
    tagline: string;
}
declare class SpeciesName extends React.Component<ISpeciesNameProps> {
    render(): JSX.Element;
}
interface ISpeciesStandeeProps {
    image: string;
}
declare class SpeciesStandee extends React.Component<ISpeciesStandeeProps> {
    render(): JSX.Element;
}
interface ISpeciesViewProps {
    JsonObject: ISpeciesFluff;
}
interface ISpeciesViewState {
}
declare class SpeciesView extends React.Component<ISpeciesViewProps, ISpeciesViewState> {
    constructor(props: ISpeciesViewProps);
    render(): JSX.Element;
}
interface ISpeciesViewerProps {
    Species: ISpeciesFluff[];
}
interface ISpeciesViewerState {
    selectedSpecies: ISpeciesFluff;
    selectedIndex: number;
}
declare class SpeciesViewer extends React.Component<ISpeciesViewerProps, ISpeciesViewerState> {
    constructor(props: ISpeciesViewerProps);
    render(): JSX.Element;
    changeSpecies(index: number): void;
}
