interface IMercenariesTestPageProps { }
interface IMercenariesTestPageState
{
	currentGroup?: IMercenaryGroup;
	displayType: "all" | "reg-req" | "reg-not-req";
	groups: IMercenaryGroup[];
	showDmNotes: boolean;
}
class MercenariesTestPage extends React.Component<IMercenariesTestPageProps, IMercenariesTestPageState> {
	constructor(props: IMercenariesTestPageProps)
	{
		super(props);
		this.state = {
			currentGroup: undefined,
			displayType: "all",
			groups: [],
			showDmNotes: storage.showGMNotes,
		};
	}
	render()
	{
		return (
			<>
				<div className="container bg-light">
					<div className="p-1">
						<div className="card bg-white" style={{ width: "18rem" }}>
							<h5 className="card-header">Ranks</h5>
							<ul className="list-group list-group-flush">
								<li className="list-group-item bg-light fw-bold">
									<div className="row">
										<div className="col-3 text-center">Rank</div>
										<div className="col">Quest Lvl.</div>
										<div className="col text-end">Avg Pay</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className="col-3 text-center">D</div>
										<div className="col text-center">Up to 2</div>
										<div className="col text-end">5 gp</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className="col-3 text-center">C</div>
										<div className="col text-center">Up to 5</div>
										<div className="col text-end">14 gp</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className="col-3 text-center">B</div>
										<div className="col text-center">Up to 8</div>
										<div className="col text-end">26 gp</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className="col-3 text-center">A</div>
										<div className="col text-center">Up to 11</div>
										<div className="col text-end">98 gp</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className="col-3 text-center">S</div>
										<div className="col text-center">Up to 20</div>
										<div className="col text-end">2,250 gp</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="text-center p-1">
						<input
							type="radio"
							className="btn-check"
							name="quest-filter"
							id="display-all"
							autoComplete="off"
							checked={this.state.displayType == "all"}
							onClick={() => { this.setState({ displayType: "all" }); }}
						/>
						<label className="btn btn-secondary mx-1" htmlFor="display-all">All</label>

						<input
							type="radio"
							className="btn-check"
							name="quest-filter"
							id="reg-req"
							autoComplete="off"
							checked={this.state.displayType == "reg-req"}
							onClick={() => { this.setState({ displayType: "reg-req" }); }}
						/>
						<label className="btn btn-secondary mx-1" htmlFor="reg-req">Registration Required</label>

						<input
							type="radio"
							className="btn-check"
							name="quest-filter"
							id="reg-not-req"
							autoComplete="off"
							checked={this.state.displayType == "reg-not-req"}
							onClick={() => { this.setState({ displayType: "reg-not-req" }); }}
						/>
						<label className="btn btn-secondary mx-1" htmlFor="reg-not-req">Registration Not Required</label>
					</div>

					<div className="form-check form-switch ms-2">
						<input
							className="form-check-input"
							type="checkbox"
							id="dm-notes-switch"
							checked={this.state.showDmNotes}
							onChange={() =>
							{
								storage.showGMNotes = !this.state.showDmNotes;
								this.setState({ showDmNotes: !this.state.showDmNotes });
							}}
						/>
						<label className="form-check-label" htmlFor="dm-notes-switch">Show DM Notes</label>
					</div>

					<table className="table table-light table-bordered table-hover">
						<thead>
							<tr className="table-dark">
								<th onClick={() => { }}>Row</th>
								<th onClick={() => { }}>Name</th>
								<th onClick={() => { }}>Rank</th>
							</tr>
						</thead>
						<tbody>
							{this.state.groups.map((mercGroup, index: number) =>
								<tr key={index}>
									<td>{index + 1}</td>
									<td><button className="btn btn-link lh-sm" onClick={() => { this.setState({ currentGroup: mercGroup }) }}>{mercGroup.name}</button></td>
									<td>{mercGroup.rank}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{
					(this.state.currentGroup) &&
					<MercenaryGroupDetails
						Group={this.state.currentGroup}
						OnClose={() => { this.setState({ currentGroup: undefined }) }}
						ShowDmNotes={this.state.showDmNotes}
					/>
				}
			</>
		);
	}
	componentDidMount()
	{
		const self = this;
		$.ajax({
			crossDomain: true,
			url: "/dnd/res/data/world/mercenaries.json",
			dataType: 'json',
			success: function (items: IMercenaryGroup[])
			{
				self.setState({ groups: items });
			}
		});
	}
}



interface IMercenaryGroupDetailsProps
{
	Group: IMercenaryGroup;
	ShowDmNotes: boolean;
	OnClose: { (): void };
}
interface IMercenaryGroupDetailsState { }
class MercenaryGroupDetails extends React.Component<IMercenaryGroupDetailsProps, IMercenaryGroupDetailsState> {
	render()
	{
		return (
			<div className="modal show" style={{ display: "block" }}>
				<div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">{this.props.Group.name}</h5>
							<button type="button" className="btn-close" onClick={this.props.OnClose}></button>
						</div>
						<div className="modal-body">
							<div className="player-notes">
								{this.props.Group.notes.player.map((note, index: number) =>
									<p key={index}>
										{note}
									</p>
								)}
							</div>
							{
								this.props.ShowDmNotes &&
								<div className="dm-notes">
									{this.props.Group.notes.dm.map((note, index: number) =>
										<p key={index}>
											{note}
										</p>
									)}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}