interface IBattleMapObjectMenuProps
{
	CurrentLayer: number;
	DisplayLocations: boolean;
	FloorPlan: IDeckPlan;
	CloseMenu: { (): void };
	SetCurrentLayer: { (currentLayer: number): void };
	SetDisplayNotableLocations: { (displayNotableLocations: boolean): void };
}

class BattleMapObjectMenu extends React.Component<IBattleMapObjectMenuProps> {
	public render()
	{
		return (
			<div className="control-bar text-light fs-2">
				<label htmlFor="current-deck" className="form-label">Current Deck:</label>
				<div className="input-group mb-3 fs-2">
					<input
						type="number"
						className="form-control fs-2"
						id="current-deck"
						step={1}
						min={1}
						max={this.props.FloorPlan.decks.length}
						style={{ minWidth: "30px", width: "10%", flex: "0 0 auto", textAlign: "right" }}
						value={this.props.CurrentLayer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						{
							this.props.SetCurrentLayer(e.target.valueAsNumber);
						}}
					/>
					<span className="input-group-text fs-2">/{this.props.FloorPlan.decks.length} - {this.props.FloorPlan.decks[this.props.CurrentLayer - 1].name}</span>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="flexSwitchCheckDefault"
						checked={this.props.DisplayLocations}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						{
							this.props.SetDisplayNotableLocations(e.target.checked);
						}}
					/>
					<label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Display Notable Locations</label>
				</div>
				<button className="btn btn-danger btn-lg close-button fs-2" onClick={this.props.CloseMenu}>
					X
				</button>
			</div>
		);
	}
}