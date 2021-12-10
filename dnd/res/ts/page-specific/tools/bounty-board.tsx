//#region Cut Pasta from contracts.html
function numberWithCommas(x: number)
{
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//#endregion Cut Pasta from contracts.html


interface IQuestLoadedFromJson
{
	id: string;
	name: string;
	active: boolean;
	handcrafted: boolean;
	issuer: string;
	location: string;
	registrationRequired: boolean;
	rank: string;
	payment: IQuestPayment;
	logo: string;
	notes: INotes;
}




interface IBountyBoardMenuProps
{
	shipIndex: IShipIndexEntry[];
}
class BountyBoardMenu extends React.Component<IBountyBoardMenuProps> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	render()
	{
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#brochureOffcanvas" aria-controls="brochureOffcanvas">
						Open Brochure
					</button>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#BountyBoardMenuToggler" aria-controls="BountyBoardMenuToggler" aria-expanded="false" aria-label="Toggle menu">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="BountyBoardMenuToggler">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<select
									className="form-select"
								>
									{this.props.shipIndex.map((ship, index: number) =>
										<option
											value={ship.name}
											key={index}
										>
											{ship.name}
										</option>
									)}
								</select>
							</li>
							{/* <li className="nav-item">
								<a className="nav-link" href="#">Link</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
							</li> */}
						</ul>
						{/* <form className="d-flex">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success" type="submit">Search</button>
						</form> */}
					</div>
				</div>
			</nav>

		);
	}
}

interface IBountyBoardTestPageProps { }
interface IBountyBoardTestPageState
{
	currentQuest?: string;
	displayType: "all" | "reg-req" | "reg-not-req";
	quests: IQuestLoadedFromJson[];
}
class BountyBoardTestPage extends React.Component<IBountyBoardTestPageProps, IBountyBoardTestPageState> {
	constructor(props: IBountyBoardTestPageProps)
	{
		super(props);
		this.state = {
			currentQuest: undefined,
			displayType: "all",
			quests: [],
		};
	}
	render()
	{
		return (
			<>
				<div className="container bg-light">
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
					<table className="table table-light table-bordered table-hover">
						<thead>
							<tr className="table-dark">
								<th onClick={() => { }}>Name</th>
								<th onClick={() => { }}>Location</th>
								<th onClick={() => { }}>Rank</th>
								<th onClick={() => { }}>Payment</th>
							</tr>
						</thead>
						<tbody>
							{this.state.quests.map((quest, index: number) =>
								<tr key={index}>
									<td><button className="btn btn-link lh-sm" onClick={() => { this.setState({ currentQuest: quest.id }) }}>{quest.name}</button></td>
									<td>{quest.location}</td>
									<td className="rank">{quest.rank}</td>
									<td className="credits">{numberWithCommas(quest.payment.credits) + " cr"}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{
					(this.ActiveQuest) &&
					<BountyDetails
						quest={this.ActiveQuest}
						onClose={() => { this.setState({ currentQuest: undefined }) }}
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
			url: "/dnd/res/data/quests.json",
			dataType: 'json',
			success: function (items: IQuestLoadedFromJson[])
			{
				let filteredItems = items.filter(function (entry)
				{
					return entry.active === true;
				});
				filteredItems = filteredItems.filter(function (entry)
				{
					return entry.rank !== "Unfinished";
				});
				self.setState({ quests: filteredItems });
			}
		});
	}
	get ActiveQuest(): IQuestLoadedFromJson | undefined
	{
		let quest: IQuestLoadedFromJson | undefined = undefined;
		if (this.state.currentQuest)
		{
			quest = this.state.quests.filter(entry =>
			{
				return entry.id === this.state.currentQuest
			})[0];
		}
		return quest;

	}
	displayQuest = (questID: string) =>
	{
		this.setState({ currentQuest: questID });
	}
}



interface IBountyDetailsProps
{
	quest: IQuestLoadedFromJson;
	onClose: { (): void };
}
interface IBountyDetailsState
{
	showDmNotes: boolean;
}
class BountyDetails extends React.Component<IBountyDetailsProps, IBountyDetailsState> {
	constructor(props: IBountyDetailsProps)
	{
		super(props);
		this.state = {
			showDmNotes: false,
		};
	}
	render()
	{
		return (
			<div className="modal show" style={{ display: "block" }}>
				<div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">{this.props.quest.name}</h5>
							<div className="form-check form-switch ms-2">
								<input
									className="form-check-input"
									type="checkbox"
									id="dm-notes-switch"
									checked={this.state.showDmNotes}
									onChange={() => { this.setState({ showDmNotes: !this.state.showDmNotes }); }}
								/>
								<label className="form-check-label" htmlFor="dm-notes-switch">Show DM Notes</label>
							</div>
							<button type="button" className="btn-close" onClick={this.props.onClose}></button>
						</div>
						<div className="modal-body">
							<div className="row row-cols-1 row-cols-lg-2 g-0">
								<div className="col">
									<div className="card h-100">
										<div className="card-body">
											<div className="border-bottom">
												<div className="fw-bold">Rank:</div>
												<h4 className="text-center">
													{this.props.quest.rank}
												</h4>
											</div>
											<div className="border-bottom"><b>Payment:</b> {numberWithCommas(this.props.quest.payment.credits)}</div>
											<div className="border-bottom"><b>Issuer:</b> {this.props.quest.issuer}</div>
											<div className="border-bottom"><b>Location:</b> {this.props.quest.location}</div>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="card h-100">
										<div className="card-body">
											<div className="player-notes">
												{this.props.quest.notes.player.map((note, index: number) =>
													<p key={index}>
														{note}
													</p>
												)}
											</div>
											{
												this.state.showDmNotes &&
												<div className="dm-notes">
													{this.props.quest.notes.dm.map((note, index: number) =>
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<BountyBoardTestPage />,
	document.getElementById("react-container")
);