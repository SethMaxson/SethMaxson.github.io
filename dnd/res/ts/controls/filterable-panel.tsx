interface IFilterableItemObject
{
	text: string;
	tags: string[];

}

interface IFilterPanelProps
{
	items: IFilterableItemObject[];
	onChange: { (index: number): void };
	selectedIndex: number;
}
interface IFilterPanelState
{
	itemDisplay: boolean[];
}
class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {
	constructor(props: IFilterPanelProps)
	{
		super(props);
		this.search = this.search.bind(this);
		this.displayAll = this.displayAll.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			itemDisplay: this.props.items.map(a => true),
		};
	}
	render() {
		return (
			<div className="filter-panel">
				<FilterSearch search={this.search} />
				{this.props.items.map((item, index: number) =>
					this.state.itemDisplay[index] &&
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
	search(searchString: string)
	{
		if (searchString.length == 0) {
			this.displayAll();
		}
		else
		{
			const newDisplay = this.state.itemDisplay.slice();	//copy the array
			for (let i = 0; i < this.props.items.length; i++)	//execute the manipulations
			{
				let item = this.props.items[i];
				newDisplay[i] = (
					fuzzySearch(searchString, item.text) ||
					(
						item.tags.length > 0 &&
						fuzzySearch(searchString, item.tags.join(","))
					)
				);
			}
			this.setState({ itemDisplay: newDisplay });
		}
	}
	displayAll()
	{

		const newDisplay = this.state.itemDisplay.slice();	//copy the array
		for (let i = 0; i < newDisplay.length; i++) {		//execute the manipulations
			newDisplay[i] = true;
		}
		this.setState({ itemDisplay: newDisplay });
	}
	handleClick(index: number)
	{
		this.props.onChange(index);
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
			<div className={"filterable-item" + (this.props.selected ? " selected" : "")} data-tags={this.props.tags.join(",")} onClick={e => this.handleClick(e)}>{this.props.text}</div>
		);
	}
}