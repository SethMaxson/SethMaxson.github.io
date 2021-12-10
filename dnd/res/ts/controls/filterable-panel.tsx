interface IFilterableItemObject
{
	text: string;
	tags: string[];

}

interface IFilterCategory
{
	/**Need to update code so that this actually influences something. */
	andOr: "and" | "or";
	name: string;
	values: string[];
	multiSelect: boolean;
}

interface IFilterPanelProps
{
	className?: string;
	filters: IFilterCategory[];
	items: IFilterableItemObject[];
	onChange: { (index: number): void };
	selectedIndex: number;
}
interface IFilterPanelState
{
	activeFilters: string[][];
	itemDisplay: boolean[];
	searchString: string;
}

class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {
	public static defaultProps = {
		filters: [],
    };
	constructor(props: IFilterPanelProps)
	{
		super(props);
		this.search = this.search.bind(this);
		this.displayAll = this.displayAll.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		let activeFiltersArray: string[][] = [];
		for (let i = 0; i < this.props.filters.length; i++) {
			activeFiltersArray.push([]);
		}

		this.state = {
			activeFilters: activeFiltersArray,
			itemDisplay: this.props.items.map(a => true),
			searchString: ""
		};
	}
	render() {
		return (
			<div className={"bg-secondary d-flex flex-column p-2 h-100" + (this.props.className? (" " + this.props.className) : "")}>
				<div className="header mb-2">
					<h5 id="filterable-panel-label" className="d-none">Filters</h5>
					<FilterSearch search={this.search} />
					{this.props.filters.length > 0 && <a className="btn btn-primary" data-bs-toggle="collapse" href="#filterable-panel-filters" role="button" aria-expanded="false" aria-controls="filterable-panel-filters">
						Filters
					</a>}
				</div>
				<div className="container-fluid collapse flex-grow-0 flex-shrink-0 rounded bg-dark text-light" id="filterable-panel-filters">
					{this.props.filters.map((category, index: number) =>
						<FilterCategoryRow
							category={category}
							activeValues={this.state.activeFilters[index]}
							index={index}
							onChange={this.updateFilter}
							key={index}
						/>
					)}
				</div>
				<FilterableItemList
					items={this.props.items}
					itemDisplay={this.state.itemDisplay}
					onChange={this.props.onChange}
					selectedIndex={this.props.selectedIndex}
				/>
			</div>
		);
	}
	search(searchString: string)
	{
		this.setState({ searchString: searchString }, this.updateDisplay);
	}
	updateDisplay()
	{
		if (this.state.searchString.length == -1) {
			this.displayAll();
		}
		else
		{
			let activeFilterValueCount = 0;
			for (let i = 0; i < this.state.activeFilters.length; i++) {
				activeFilterValueCount += this.state.activeFilters[i].length;

			}
			const newDisplay = this.state.itemDisplay.slice();	//copy the array
			for (let i = 0; i < this.props.items.length; i++)	//execute the manipulations
			{
				let item = this.props.items[i];
				newDisplay[i] = (
					(this.state.searchString.length == 0 && activeFilterValueCount == 0) ||
					(this.state.searchString.length > 0 && fuzzySearch(this.state.searchString, item.text)) ||
					(
						this.props.filters.length == 0 &&
						item.tags.length > 0 &&
						fuzzySearch(this.state.searchString, item.tags.join(","))
					)
				);
				if (!newDisplay[i])
				{
					const itemTags = "|" + item.tags.join("|").toLowerCase() + "|";
					for (let j = 0; j < this.state.activeFilters.length; j++)
					{
						for (let k = 0; k < this.state.activeFilters[j].length; k++) {
							const filterTag = "|" + this.state.activeFilters[j][k].toLowerCase() + "|";
							if (itemTags.includes(filterTag)) {
								newDisplay[i] = true;
								break;
							}
						}
					}
				}
			}
			this.setState({ itemDisplay: newDisplay });
		}
	}
	updateFilter(index: number, activeValues: string[])
	{
		const newFiltersState = this.state.activeFilters.slice();	//copy the array
		newFiltersState[index] = activeValues;
		this.setState({ activeFilters: newFiltersState }, this.updateDisplay);
	}
	displayAll()
	{

		const newDisplay = this.state.itemDisplay.slice();	//copy the array
		for (let i = 0; i < newDisplay.length; i++) {		//execute the manipulations
			newDisplay[i] = true;
		}
		this.setState({ itemDisplay: newDisplay });
	}
}

class FilterPanelOffCanvas extends React.Component<IFilterPanelProps, IFilterPanelState> {
	public static defaultProps = {
		filters: [],
    };
	constructor(props: IFilterPanelProps)
	{
		super(props);
		this.search = this.search.bind(this);
		this.displayAll = this.displayAll.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		let activeFiltersArray: string[][] = [];
		for (let i = 0; i < this.props.filters.length; i++) {
			activeFiltersArray.push([]);
		}

		this.state = {
			activeFilters: activeFiltersArray,
			itemDisplay: this.props.items.map(a => true),
			searchString: ""
		};
	}
	render() {
		return (
			<div className="offcanvas offcanvas-start bg-secondary show h-100" id="filterable-panel" aria-labelledby="filterable-panel-label" data-bs-scroll="true" data-bs-backdrop="false">
				<div className="offcanvas-header">
					<h5 id="filterable-panel-label" className="d-none">Filters</h5>
					<FilterSearch search={this.search} />
					{this.props.filters.length > 0 && <a className="btn btn-primary" data-bs-toggle="collapse" href="#filterable-panel-filters" role="button" aria-expanded="false" aria-controls="filterable-panel-filters">
						Filters
					</a>}
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body overflow-hidden d-flex flex-column p-2">
					<div className="container-fluid collapse flex-grow-0 flex-shrink-0 rounded bg-dark text-light" id="filterable-panel-filters">
						{this.props.filters.map((category, index: number) =>
							<FilterCategoryRow
								category={category}
								activeValues={this.state.activeFilters[index]}
								index={index}
								onChange={this.updateFilter}
								key={index}
							/>
						)}
					</div>
					<FilterableItemList
						items={this.props.items}
						itemDisplay={this.state.itemDisplay}
						onChange={this.props.onChange}
						selectedIndex={this.props.selectedIndex}
					/>
				</div>
			</div>
		);
	}
	search(searchString: string)
	{
		this.setState({ searchString: searchString }, this.updateDisplay);
	}
	updateDisplay()
	{
		if (this.state.searchString.length == -1) {
			this.displayAll();
		}
		else
		{
			let activeFilterValueCount = 0;
			for (let i = 0; i < this.state.activeFilters.length; i++) {
				activeFilterValueCount += this.state.activeFilters[i].length;

			}
			const newDisplay = this.state.itemDisplay.slice();	//copy the array
			for (let i = 0; i < this.props.items.length; i++)	//execute the manipulations
			{
				let item = this.props.items[i];
				newDisplay[i] = (
					(this.state.searchString.length == 0 && activeFilterValueCount == 0) ||
					(this.state.searchString.length > 0 && fuzzySearch(this.state.searchString, item.text)) ||
					(
						this.props.filters.length == 0 &&
						item.tags.length > 0 &&
						fuzzySearch(this.state.searchString, item.tags.join(","))
					)
				);
				if (!newDisplay[i])
				{
					const itemTags = "|" + item.tags.join("|").toLowerCase() + "|";
					for (let j = 0; j < this.state.activeFilters.length; j++)
					{
						for (let k = 0; k < this.state.activeFilters[j].length; k++) {
							const filterTag = "|" + this.state.activeFilters[j][k].toLowerCase() + "|";
							if (itemTags.includes(filterTag)) {
								newDisplay[i] = true;
								break;
							}
						}
					}
				}
			}
			this.setState({ itemDisplay: newDisplay });
		}
	}
	updateFilter(index: number, activeValues: string[])
	{
		const newFiltersState = this.state.activeFilters.slice();	//copy the array
		newFiltersState[index] = activeValues;
		this.setState({ activeFilters: newFiltersState }, this.updateDisplay);
	}
	displayAll()
	{

		const newDisplay = this.state.itemDisplay.slice();	//copy the array
		for (let i = 0; i < newDisplay.length; i++) {		//execute the manipulations
			newDisplay[i] = true;
		}
		this.setState({ itemDisplay: newDisplay });
	}
}

interface IFilterSearchProps
{
	search: { (searchString: string): void };
}
class FilterSearch extends React.Component<IFilterSearchProps> {
	constructor(props: IFilterSearchProps)
	{
		super(props);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>)
	{
		this.props.search((e.target as HTMLInputElement).value);
	}
	render() {
		return (
			<input type="text" name="search" className="search" placeholder="Filter..." onKeyUp={this.handleKeyUp} />
		);
	}
}

interface IFilterCategoryRowProps
{
	activeValues: string[];
	index: number;
	category: IFilterCategory;
	onChange: { (filterIndex: number, activeFilterValues: string[]): void };
}
class FilterCategoryRow extends React.Component<IFilterCategoryRowProps> {
	public static defaultProps = {
		activeValues: [],
    };
	constructor(props: IFilterCategoryRowProps)
	{
		super(props);
		this.toggleValue = this.toggleValue.bind(this);
	}
	toggleValue = (value: string, adding: boolean) =>
	{
		const newValuesState = adding ? this.props.activeValues.slice() : this.props.activeValues.filter(e => e.toLowerCase() !== value.toLowerCase());
		if (adding) {
			newValuesState.push(value.toLowerCase());
		}
        this.props.onChange(this.props.index, newValuesState);
    };
	render() {
		return (
			<div className="row my-1">
				<div className="col-auto">{this.props.category.name}:</div>
				{this.props.category.values.map((value: string, index: number) =>
					<FilterValueToggle
						category={this.props.category.name}
						multiSelect={this.props.category.multiSelect}
						filterValue={value}
						onChange={this.toggleValue}
						key={index}
					/>
				)}
			</div>
		);
	}
}

interface IFilterValueToggleProps
{
	category: string;
	filterValue: string;
	multiSelect: boolean;
	onChange: { (value: string, adding: boolean): void };
}
class FilterValueToggle extends React.Component<IFilterValueToggleProps> {
	public static defaultProps = {
		multiSelect: true,
    };
	constructor(props: IFilterValueToggleProps)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(this.props.filterValue, e.target.checked);
    };
	render() {
		return (
			<span className="col-auto">
				<input type={this.props.multiSelect? "checkbox" : "radio"} className="btn-check" id={this.props.category + "-" + this.props.filterValue + "-btn-check"} onChange={this.handleChange} />
				<label className="btn btn-sm btn-outline-primary" htmlFor={this.props.category + "-" + this.props.filterValue + "-btn-check"}>{this.props.filterValue}</label>
			</span>
		);
	}
}


interface IFilterableItemProps extends IFilterableItemObject
{
	index: number;
	onClick: { (index: number): void };
	selected: boolean;
}
class FilterableItem extends React.Component<IFilterableItemProps> {
	constructor(props: IFilterableItemProps)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e: React.MouseEvent)
	{
		this.props.onClick(this.props.index);
	}
	render() {
		return (
			<button className={"list-group-item list-group-item-action list-group-item-dark filterable-item" + (this.props.selected ? " active" : "")} data-tags={this.props.tags.join(",")} onClick={e => this.handleClick(e)}>{this.props.text}</button>
		);
	}
}

interface IFilterableItemListProps
{
	items: IFilterableItemObject[];
	onChange: { (index: number): void };
	selectedIndex: number;
	itemDisplay: boolean[];
}
class FilterableItemList extends React.Component<IFilterableItemListProps> {
	constructor(props: IFilterableItemListProps)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	render() {
		return (
			<div className="list-group flex-shrink-1 flex-grow-1 overflow-auto">
				{this.props.items.map((item, index: number) =>
					this.props.itemDisplay[index] &&
					<FilterableItem
						index={index}
						key={index}
						onClick={this.handleClick}
						selected={index == this.props.selectedIndex}
						tags={item.tags}
						text={item.text}
					/>
				)}
			</div>
		);
	}
	handleClick(index: number)
	{
		this.props.onChange(index);
	}
}

class FilterPanelToggleButton extends React.Component {
	render() {
		return (
			<button className="btn btn-primary d-none d-lg-block navbar-light position-absolute top-0 start-0 m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterable-panel" aria-controls="filterable-panel">
				<span className="navbar-toggler-icon"></span>
			</button>
		);
	}
}

class FilterPanelToggleButtonMobile extends React.Component {
	render() {
		return (
			<div className="d-block d-lg-none navbar navbar-dark bg-secondary">
				<button className="btn btn-primary navbar-light m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterable-panel" aria-controls="filterable-panel">
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>
		);
	}
}