/// <reference types="react" />
interface IFilterableItemObject {
    text: string;
    tags: string[];
}
interface IFilterPanelProps {
    items: IFilterableItemObject[];
    onChange: {
        (index: number): void;
    };
    selectedIndex: number;
}
interface IFilterPanelState {
    itemDisplay: boolean[];
}
declare class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {
    constructor(props: IFilterPanelProps);
    render(): JSX.Element;
    search(searchString: string): void;
    displayAll(): void;
    handleClick(index: number): void;
}
interface IFilterSearchProps {
    search: {
        (searchString: string): void;
    };
}
declare class FilterSearch extends React.Component<IFilterSearchProps> {
    constructor(props: IFilterSearchProps);
    handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
interface IFilterableItemProps extends IFilterableItemObject {
    index: number;
    onClick: {
        (index: number): void;
    };
    selected: boolean;
}
declare class FilterableItem extends React.Component<IFilterableItemProps> {
    constructor(props: IFilterableItemProps);
    handleClick(e: React.MouseEvent): void;
    render(): JSX.Element;
}
declare class FilterPanelToggleButton extends React.Component {
    render(): JSX.Element;
}
