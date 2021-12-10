interface ICityGeneratorProps { }
interface ICityGeneratorState
{
	cities: {
		expanded: boolean;
		city: ISettlementData;
	}[];
	citySize: CitySizes[];
	maxItemRarity: ItemRarity | "null";
}
class CityGenerator extends React.Component<ICityGeneratorProps, ICityGeneratorState> {
	constructor(props: ICityGeneratorProps)
	{
		super(props);

		this.state = {
			cities: [],
			citySize: [],
			maxItemRarity: "null",
		};
	}
	render()
	{
		return (
			<>
				<h1>City Generator</h1>
				<p className="px-2">
					Generate settlements for D&D to help fill your world.
				</p>
				<div className="controls">
					<div className="mb-3 row">
						<label className="col-sm-1 col-form-label">City Size:</label>
						<div className="col-sm-11">
							<MultiSelect
								LabelWhenEmpty="Any size"
								OnChange={(value: string[]) => this.setState({ citySize: value as CitySizes[] })}
								Options={[
									{
										value: "empty",
										label: "Empty (0)"
									},
									{
										value: "micro",
										label: "Micro (2 - 20)"
									},
									{
										value: "tiny",
										label: "Tiny (Village) (20 - 200)"
									},
									{
										value: "small",
										label: "Small (Village) (200 - 1,000)"
									},
									{
										value: "medium",
										label: "Medium (Town) (1,000 - 6,000)"
									},
									{
										value: "large",
										label: "Large (City) (6,000 - 25,000)"
									},
									{
										value: "huge",
										label: "Huge (Metropolis) (25,000 - 50,000)"
									}
								]}
								Search={true}
								SelectAll={true}
								Value={this.state.citySize}
							/>
						</div>
					</div>
					<div className="mb-3 row">
						<label className="col-sm-1 col-form-label">Max Item Rarity:</label>
						<div className="col-sm-11">
							<select
								className="form-select"
								onChange={e => this.setState({ maxItemRarity: e.target.value as ItemRarity})}
								value={this.state.maxItemRarity}
							>
								<option value="null">Any max item rarity</option>
								<option disabled={true}>--------------</option>
								<option value="None">None</option>
								<option value="Common">Common</option>
								<option value="Uncommon">Uncommon</option>
								<option value="Rare">Rare</option>
								<option value="Very Rare">Very Rare</option>
								<option value="Legendary">Legendary</option>
								<option value="Artifact">Artifact</option>
							</select>
						</div>
					</div>
					<button type="button" onClick={this.generateSettlement} className="btn btn-primary m-1">Generate</button>
					<button type="button" onClick={this.clear} className="btn btn-danger m-1">Clear</button>
				</div>

				<div className="output-area">
					{this.state.cities.map((city, index: number) =>
						<CityDataDisplay
							City={city.city}
							Expanded={city.expanded}
							Delete={() => this.deleteSettlement(index)}
							ToggleExpand={() => this.updateSettlementExpanded(index)}
							key={index}
						/>
					)}
				</div>
			</>
		);
	}
	clear = () =>
	{
		this.setState({ cities: [] });
	}
	deleteSettlement = (index: number) =>
	{
		let newCityArray = this.state.cities.slice();
		newCityArray.splice(index, 1);
		this.setState({ cities: newCityArray });
	}
	generateSettlement = () =>
	{
		const citySize = this.state.citySize.length > 0 ? randomize(this.state.citySize) : undefined;
		const itemRarity = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
		const newCityArray = this.state.cities.slice();
		newCityArray.push({
			city: generateCity(citySize, itemRarity),
			expanded: true
		});
		this.setState({ cities: newCityArray });
	}
	updateSettlementExpanded = (index: number) =>
	{
		const newArray = this.state.cities.slice();
		const newCity = JSON.parse(JSON.stringify(newArray[index]));
		newCity.expanded = !newCity.expanded;
		newArray[index] = newCity;
		this.setState({ cities: newArray });
	}
}

interface ICityDataDisplayProps
{
	City: ISettlementData;
	Expanded: boolean;
	Delete: { (): void };
	ToggleExpand: { (): void };
}
class CityDataDisplay extends React.Component<ICityDataDisplayProps> {
	render()
	{
		return (
			<>
				<div className="card">
					<div
						className={"accordion-button card-header position-relative user-select-none" + (this.props.Expanded? "" : " collapsed")}
						style={{ cursor: "pointer", textOverflow: "truncate" }}
						onClick={this.props.ToggleExpand}
					>
						{
							this.props.Expanded ?
								this.props.City.name
								:
								<>
									{this.props.City.name}
									<span className="fs-6 text text-muted ms-2 fst-italic">{this.props.City.alignment + " " + this.props.City.type}</span>
								</>
						}
					</div>
					{
						this.props.Expanded &&
						<div className="card-body">
							<h1>{this.props.City.name}</h1>
							<h4>
								{this.props.City.alignment + " " + this.props.City.type}
							</h4>
							<CityAttribute
								Label="Population"
								Value={this.props.City.populationPercentages}
							/>
							<CityAttribute
								Label="Government"
								Value={this.props.City.government}
							/>
							<CityAttribute
								Label="Defense"
								Value={this.props.City.defense}
							/>
							<CityAttribute
								Label="Commerce"
								Value={this.props.City.commerce}
							/>
							<CityAttribute
								Label="Organizations"
								Value={this.props.City.organizations}
							/>
							<br />
							<CityAttribute
								Label="Qualities"
								SeparatorCharacter=":"
								Value={this.props.City.qualities.join(', ').toLowerCase()}
							/>
							<CityAttribute
								Label="Maximum Item Level"
								SeparatorCharacter=":"
								Value={this.props.City.maxItemRarity}
							/>

							{
								(this.props.City.pointsOfInterest.length > 0) &&
								<>
									<h4 className="mt-5">Points of Interest</h4>
									{this.props.City.pointsOfInterest.map((poi, index: number) =>
										<SettlementPointOfInterest
											POI={poi}
											key={index}
										/>
									)}
								</>
							}
							<button type="button" onClick={this.props.Delete} className="btn btn-danger m-1">Remove</button>
						</div>
					}
				</div>
			</>
		);
	}
}

interface ICityAttributeProps
{
	Label: string;
	SeparatorCharacter: string;
	Value: string;
}
class CityAttribute extends React.Component<ICityAttributeProps> {
	public static defaultProps = {
		SeparatorCharacter: "."
	};
	render()
	{
		return (
			<div><span className="fw-bold fst-italic">{this.props.Label + this.props.SeparatorCharacter} </span> {this.props.Value}</div>
		);
	}
}

interface ISettlementPointOfInterestProps
{
	POI: ISettlementPointOfInterestData;
}
class SettlementPointOfInterest extends React.Component<ISettlementPointOfInterestProps> {
	render()
	{
		return (
			<p>
				<div className="fw-bold">{this.props.POI.name}</div>
				{this.props.POI.description}
			</p>
		);
	}
}