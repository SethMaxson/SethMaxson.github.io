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
			<div className="offcanvas offcanvas-start" id="filterable-panel" aria-labelledby="filterable-panel-label">
				<div className="offcanvas-header">
					<FilterSearch search={this.search} />
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<div className="list-group">
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
				</div>
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
			<button className={"list-group-item list-group-item-action filterable-item" + (this.props.selected ? " active" : "")} data-tags={this.props.tags.join(",")} onClick={e => this.handleClick(e)}>{this.props.text}</button>
		);
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