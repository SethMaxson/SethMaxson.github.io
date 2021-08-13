/// <reference types="react" />
interface IFilterableItemObject {
    text: string;
    tags: string[];
}
interface IFilterCategory {
    /**Need to update code so that this actually influences something. */
    andOr: "and" | "or";
    name: string;
    values: string[];
    multiSelect: boolean;
}
interface IFilterPanelProps {
    filters: IFilterCategory[];
    items: IFilterableItemObject[];
    onChange: {
        (index: number): void;
    };
    selectedIndex: number;
}
interface IFilterPanelState {
    activeFilters: string[][];
    itemDisplay: boolean[];
    searchString: string;
}
declare class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {
    static defaultProps: {
        filters: never[];
    };
    constructor(props: IFilterPanelProps);
    render(): JSX.Element;
    search(searchString: string): void;
    updateDisplay(): void;
    updateFilter(index: number, activeValues: string[]): void;
    displayAll(): void;
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
interface IFilterCategoryRowProps {
    activeValues: string[];
    index: number;
    category: IFilterCategory;
    onChange: {
        (filterIndex: number, activeFilterValues: string[]): void;
    };
}
declare class FilterCategoryRow extends React.Component<IFilterCategoryRowProps> {
    static defaultProps: {
        activeValues: never[];
    };
    constructor(props: IFilterCategoryRowProps);
    toggleValue: (value: string, adding: boolean) => void;
    render(): JSX.Element;
}
interface IFilterValueToggleProps {
    category: string;
    filterValue: string;
    multiSelect: boolean;
    onChange: {
        (value: string, adding: boolean): void;
    };
}
declare class FilterValueToggle extends React.Component<IFilterValueToggleProps> {
    static defaultProps: {
        multiSelect: boolean;
    };
    constructor(props: IFilterValueToggleProps);
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
interface IFilterableItemListProps {
    items: IFilterableItemObject[];
    onChange: {
        (index: number): void;
    };
    selectedIndex: number;
    itemDisplay: boolean[];
}
declare class FilterableItemList extends React.Component<IFilterableItemListProps> {
    constructor(props: IFilterableItemListProps);
    render(): JSX.Element;
    handleClick(index: number): void;
}
declare class FilterPanelToggleButton extends React.Component {
    render(): JSX.Element;
}
declare class FilterPanelToggleButtonMobile extends React.Component {
    render(): JSX.Element;
}
