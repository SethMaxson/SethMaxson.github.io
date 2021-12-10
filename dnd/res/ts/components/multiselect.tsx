interface IMultiSelectProps
{
	LabelWhenEmpty: string;
	Options: { label: string, value: string }[];
	OnChange: { (value: string[]): void };
	/**Controls whether or not the search bar is displayed. */
	Search: boolean;
	/**Controls whether or not the "Select All" button is displayed. */
	SelectAll: boolean;
	Value: string[];
}
interface IMultiSelectState
{
	expanded: boolean;
	searchString: string;
}
class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
	public static defaultProps = {
		LabelWhenEmpty: "Surprise Me",
		Search: false,
		SelectAll: false,
	};
	constructor(props: IMultiSelectProps)
	{
		super(props);

		this.state = {
			expanded: false,
			searchString: "",
		};
	}
	render()
	{
		let headerLabel = this.props.LabelWhenEmpty;
		if (this.props.Value.length > 5)
		{
			headerLabel = `${this.props.Value.length} selected`;
		}
		else if (this.props.Value.length > 0) {
			let selectedLabels: string[] = [];
			for (let i = 0; i < this.props.Options.length; i++) {
				const option = this.props.Options[i];
				if (this.props.Value.includes(option.value)) {
					selectedLabels.push(option.label);
				}
				headerLabel = selectedLabels.join(", ");
			}
		}
		return (
			<div className="card">
				<div
					className={"card-header bg-white position-relative user-select-none" + ((this.props.Value.length > 0)? "" : " text-muted")}
					style={{ cursor: "pointer", textOverflow: "truncate" }}
					onClick={this.toggleExpand}
				>
					{headerLabel}
					<span className="position-absolute top-50 end-0 translate-middle text-black-50">
						{this.state.expanded ? "▲" : "▼"}
					</span>
				</div>
				{
					this.state.expanded &&
					<ul className="list-group list-group-flush user-select-none">
						{
							this.props.Search &&
							<li className="list-group-item">
								<input
									className="form-control mb-1"
									placeholder="Search"
									type="text"
									value={this.state.searchString}
									onChange={e => this.setState({ searchString: e.target.value })}
								/>
							</li>
						}
						{
							this.props.SelectAll &&
							<li className="list-group-item">
								{
									(this.props.Value.length != this.props.Options.length) ?
										(
											<button type="button" className="btn btn-outline-primary btn-sm" onClick={this.selectAll}>Select All</button>
										) :
										(
											<button type="button" className="btn btn-outline-primary btn-sm" onClick={this.unselectAll}>Unselect All</button>
										)
								}
							</li>
						}
						{
							this.props.Options.map((option, index) =>
							{
								if (this.state.searchString.length == 0 || option.label.toLowerCase().includes(this.state.searchString.toLowerCase()))
								{
									return (
										<li
											className="list-group-item list-group-item-action"
											key={index}
											onClick={() => this.handleCheck(option.value, !this.props.Value.includes(option.value))}
										>
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													checked={this.props.Value.includes(option.value)}
													readOnly={true}
												/>
												<label className="form-check-label">
													{option.label}
												</label>
											</div>
										</li>
									)
								}
							})
						}

					</ul>
				}
			</div>
		);
	}
	handleCheck = (value: string, adding: boolean) => {
		const newArray = this.props.Value.slice();
		if (adding)
		{
			newArray.push(value);
		}
		else
		{
			const index = newArray.indexOf(value);
			if (index > -1) {
				newArray.splice(index, 1);
			}
		}
		this.props.OnChange(newArray);
	}
	selectAll = () =>
	{
		this.props.OnChange(this.props.Options.map(option => option.value));
	}
	toggleExpand = () =>
	{
		this.setState({ expanded: !this.state.expanded});
	}
	unselectAll = () =>
	{
		this.props.OnChange([]);
	}
}