type ItemType = "armor" | "potion" | "ring" | "scroll" | "weapon" | "wondrous item";

interface IShopGeneratorProps { }
interface IShopGeneratorState
{
	inventory: IShopItem[];
	itemType: ItemType | "null";
	maxItemRarity: ItemRarity | "null";
	rowsToGenerate: number;
}
class ShopGenerator extends React.Component<IShopGeneratorProps, IShopGeneratorState> {
	constructor(props: IShopGeneratorProps)
	{
		super(props);

		this.state = {
			inventory: [],
			itemType: "null",
			maxItemRarity: "null",
			rowsToGenerate: 20,
		};
	}
	render()
	{
		return (
			<>
				<h1>Shop Inventory</h1>

				<p className="px-2">
					Generate shop inventories for when players want to do a mall episode.
				</p>

				<div className="card">
					<div className="card-body">
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

						<div className="mb-3 row">
							<label className="col-sm-1 col-form-label">Item Type:</label>
							<div className="col-sm-11">
								<select
									className="form-select"
									onChange={e => this.setState({ itemType: e.target.value as ItemType})}
									value={this.state.itemType}
								>
									<option value="null">Surprise Me</option>
									<option disabled={true}>--------------</option>
									<option value="armor">Armor</option>
									<option value="potion">Potion</option>
									<option value="ring">Ring</option>
									<option value="scroll">Scroll</option>
									<option value="weapon">Weapon</option>
									<option value="wondrous item">Wondrous Item</option>
								</select>
							</div>
						</div>

						<button type="button" onClick={this.generateInventory} className="btn btn-primary m-1">Generate</button>
						<button type="button" onClick={this.clear} className="btn btn-danger m-1">Clear Inventory</button>
						<button type="button" className="btn btn-info m-1" data-bs-toggle="modal" data-bs-target="#price-details">
							Pricing Information
						</button>
					</div>
				</div>

				<table className="table table-light table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Rarity</th>
							<th>Price</th>
							<th>Count</th>
						</tr>
					</thead>
					<tbody>
						{this.state.inventory.map((item, index: number) =>
							<tr key={index}>
								<td>{item.name}</td>
								<td>{item.type}</td>
								<td>{item.rarity}</td>
								<td>{item.price}gp</td>
								<td>{item.count}</td>
							</tr>
						)}
					</tbody>
				</table>

				<div className="modal" id="price-details" tabIndex={-1}>
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Modal title</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<p>Price ranges are as follows:</p>
								<ul>
									<li>
										<b>Common: </b> 50gp - 100gp
									</li>
									<li>
										<b>Uncommon: </b> 101gp - 500gp
									</li>
									<li>
										<b>Rare: </b> 501gp - 5,000gp
									</li>
									<li>
										<b>Very Rare: </b> 5,001gp - 50,000gp
									</li>
									<li>
										<b>Legendary: </b> 50,001gp - 500,000gp
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
	clear = () =>
	{
		this.setState({ inventory: [] });
	}
	generateInventory = () =>
	{
		const itemRarity = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
		const itemType = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
		const newItemArray = this.state.inventory.concat(generateItems(itemRarity, itemType, 0, this.state.rowsToGenerate));
		this.setState({ inventory: newItemArray });
	}
}