const AirshipCollectionHelpers = {
	SortAirshipsByProperty(AirshipCollection: IAirshipStats[], sortProperty: string = "name", desc: boolean = false)
	{
		if (AirshipCollection[0].hasOwnProperty(sortProperty))
		{
			const property = sortProperty as keyof typeof AirshipCollection[0];
			if (desc) {
				// Descending
				AirshipCollection.sort((a, b) =>
				{
					if (a[property] == b[property]) {
						return 0;
					}
					return (a[property] > b[property]) ? -1 : 1;
				})
			} else {
				AirshipCollection.sort((a, b) =>
				{
					if (a[property] == b[property]) {
						return 0;
					}
					return (a[property] > b[property]) ? 1 : -1;
				})
			}
		}
		return AirshipCollection;
	}
}

interface IAirshipGeneratorControlProps { }
interface IAirshipGeneratorControlState
{
	loadedAirships: IAirshipStats[];
	randomAirships: IAirshipStats[];
	sortLoaded: string;
	sortRandom: string;
	species: IRace[];
}
class AirshipGeneratorControl extends React.Component<IAirshipGeneratorControlProps, IAirshipGeneratorControlState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	// AirshipGenerator: AirshipDeepGenerator;
	constructor(props: IAirshipGeneratorControlProps)
	{
		super(props);

		this.state = {
			loadedAirships: [],
			randomAirships: [],
			sortLoaded: "unsorted",
			sortRandom: "unsorted",
			species: [],
		};
		// this.AirshipGenerator = new AirshipDeepGenerator();
	}
	render()
	{
		return (
			<div className="container bg-secondary" style={{ padding: 0 }}>
				<div className="container bg-body">
					<AirshipStatBlock Airship={TEST_AIRSHIP} />
				</div>
				{/* <div className="accordion accordion-flush" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header noprint" id="headingTwo">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
								Random Airships
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							<div className="accordion-body bg-secondary">
								<AirshipGeneratorSettings
									ClearRandomAirships={this.ClearRandomAirships}
									GenerateAirships={this.GenerateAirships}
									Species={this.state.species}
								/>
								<div className="mb-3 row noprint d-print-none">
									<label className="col-sm-1 col-form-label" htmlFor="random-sort-select">Sort by:</label>
									<div className="col-sm-11">
										<select
											className="form-select"
											onChange={e =>
											{
												this.setState({ sortRandom: e.target.value });
											}}
											value={this.state.sortRandom}
										>
											<option value="unsorted">Unsorted</option>
											<option value="name">Name</option>
											<option value="race">Race</option>
											<option value="gender">Gender</option>
											<option value="age">Age</option>
											<option value="alignment">Alignment</option>
											<option value="threat">Threat</option>
											<option value="intelligence">Intelligence</option>
										</select>
									</div>
								</div>
								<AirshipCollectionDisplay
									IsRandomCollection={true}
									AirshipCollection={this.state.randomAirships}
									SortProperty={this.state.sortRandom}
									DeleteAirship={this.DeleteAirship}
								/>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
	// componentDidMount()
	// {
	// 	const self = this;

	// 	$.ajax({
	// 		crossDomain: true,
	// 		url: "/dnd/res/data/races.json",
	// 		dataType: 'json'
	// 	}).done(function (returnedData: IRace[])
	// 	{
	// 		returnedData.sort(compareRaceJsonObjects);
	// 		self.setState({ species: returnedData });
	// 	});
	// }
	// ClearRandomAirships = () =>
	// {
	// 	const newRandomAirships = this.CloneAirshipManager(this.state.randomAirships);
	// 	newRandomAirships.all = [];
	// 	newRandomAirships.filtered = [];
	// 	this.setState({
	// 		randomAirships: newRandomAirships
	// 	});
	// }
	// /** Creates a deep clone version of the specified AirshipManager, for use in updating state. */
	// CloneAirshipManager = (AirshipManager: AirshipManager): AirshipManager =>
	// {
	// 	const newManager = Object.assign({}, AirshipManager);
	// 	// return JSON.parse(JSON.stringify(AirshipManager));
	// 	newManager.all = JSON.parse(JSON.stringify(AirshipManager.all));
	// 	newManager.filtered = JSON.parse(JSON.stringify(AirshipManager.filtered));
	// 	return newManager;
	// }
	DeleteAirship = (id: string, isRandomCollection: boolean) => {
		// let AirshipCollection = this.CloneAirshipManager(isRandomCollection ? this.state.randomAirships : this.state.loadedAirships);
		// this.RemoveAirshipFromManager(AirshipCollection, id);
		// if (isRandomCollection) {
		// 	this.setState({ randomAirships: AirshipCollection });
		// }
		// else
		// {
		// 	this.setState({ loadedAirships: AirshipCollection });
		// }
	}
	// GenerateAirships = (race: string|string[]|undefined, gender: string|undefined, age: AgeCategory[]|undefined, alignment: Alignment[], number: number) =>
	// {
	// 	const randomAirships = this.CloneAirshipManager(this.state.randomAirships);
	// 	// create Airships
	// 	for (let index = 0; index < number; index++) {
	// 		const newAirship = new Airship();
	// 		let alignmentToUse = undefined;
	// 		if (alignment.length) {
	// 			alignmentToUse = randomize(alignment);
	// 		}
	// 		let raceToUse = race instanceof Array? getRandomRaceFromList(race) : race;
	// 		this.AirshipGenerator.randomizeAirship(newAirship, raceToUse, gender, age, alignmentToUse);
	// 		AirshipCollectionHelpers.AddAirshipToCollection(randomAirships, newAirship);
	// 	}
	// 	this.setState({
	// 		randomAirships: randomAirships
	// 	});
	// }
}


interface IAirshipGeneratorSettingsProps
{
	Species: IRace[];
	ClearRandomAirships: { (): void };
	GenerateAirships: { (race: string|string[]|undefined, gender: string|undefined, age: AgeCategory[]|undefined, alignment: Alignment[], number: number): void }
}
interface IAirshipGeneratorSettingsState
{
	ages: AgeCategory[];
	alignments: Alignment[];
	gender: string[];
	numberToGenerate: number;
	race: string[];
	restrictRacesByAlignment: boolean;
}
class AirshipGeneratorSettings extends React.Component<IAirshipGeneratorSettingsProps, IAirshipGeneratorSettingsState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	constructor(props: IAirshipGeneratorSettingsProps)
	{
		super(props);

		this.state = {
			ages: [],
			alignments: [],
			gender: [ "female", "male" ],
			numberToGenerate: 20,
			race: [],
			restrictRacesByAlignment: false,
		};
	}
	render()
	{
		return (
			<div className="generator-settings noprint bg-light rounded p-2 border border-1 mb-3">
				{/* <button className="btn btn-secondary" onClick={this.restoreDefaultSettings}>Default Settings</button>
				<div className="mb-3 row">
					<label className="col-sm-2 col-form-label" htmlFor="race-select">Species:</label>
					<div className="col-sm-10">
						<MultiSelect
							OnChange={(value: string[]) => this.setState({ race: value })}
							Options={this.props.Species.map(species => {
								return { value: species.ID, label: species.name };
							})}
							Search={true}
							SelectAll={true}
							Value={this.state.race}
						/>
					</div>
				</div>
				<div className="mb-3 row">
					<label className="col-sm-2 col-form-label" htmlFor="gender-select">Gender:</label>
					<div className="col-sm-10">
						<MultiSelect
							OnChange={(value: string[]) => this.setState({ gender: value })}
							Options={[
								{
									value: "female",
									label: "Female"
								},
								{
									value: "male",
									label: "Male"
								}
							]}
							Search={false}
							SelectAll={false}
							Value={this.state.gender}
						/>
					</div>
				</div>
				<div className="mb-3 row">
					<label className="col-sm-2 col-form-label" htmlFor="age-select">Age:</label>
					<div className="col-sm-10">
						<MultiSelect
							OnChange={(value: string[]) => this.setState({ ages: value as AgeCategory[] })}
							Options={[
								{
									value: "child",
									label: "Child"
								},
								{
									value: "young adult",
									label: "Young Adult"
								},
								{
									value: "adult",
									label: "Middle Age"
								},
								{
									value: "old",
									label: "Elder"
								}
							]}
							Search={true}
							SelectAll={true}
							Value={this.state.ages}
						/>
					</div>
				</div>
				<div className="mb-3 row">
					<label className="col-sm-2 col-form-label" htmlFor="alignment-select">Alignment:</label>
					<div className="col-sm-10">
						<MultiSelect
							OnChange={(value: string[]) => this.setState({ alignments: value as Alignment[] })}
							Options={[
								{ value: "LG", label: "Lawful Good" },
								{ value: "NG", label: "Neutral Good" },
								{ value: "CG", label: "Chaotic Good" },
								{ value: "LN", label: "Lawful Neutral" },
								{ value: "N", label: "Neutral" },
								{ value: "CN", label: "Chaotic Neutral" },
								{ value: "LE", label: "Lawful Evil" },
								{ value: "NE", label: "Neutral Evil" },
								{ value: "CE", label: "Chaotic Evil" },
							]}
							Search={true}
							SelectAll={true}
							Value={this.state.alignments}
						/>
					</div>
				</div>
				<label className="form-label me-1" htmlFor="alignment-restrict-races">Only use races matching alignment:</label>
				<input
					className="form-check-input"
					type="checkbox"
					id="alignment-restrict-races"
					checked={this.state.restrictRacesByAlignment}
					onChange={e => { this.setState({ restrictRacesByAlignment: e.target.checked }) }}
				/>
				<div className="mb-3 row">
					<label className="col-sm-2 col-form-label" htmlFor="records-to-generate">Number to create:</label>
					<div className="col-sm-10">
						<input
							type="number"
							className="form-control"
							id="records-to-generate"
							value={this.state.numberToGenerate}
							onChange={this.updateNumberToGenerate}
						/>
					</div>
				</div>
				<button className="btn btn-primary me-1" onClick={this.generateAirships}>Generate!</button>
				<button className="btn btn-danger" onClick={this.props.ClearRandomAirships}>Clear Airships</button> */}
			</div>
		);
	}
	get ages(): AgeCategory[] | undefined
	{
		return this.state.ages.length > 0? this.state.ages : undefined;
	}
	get races(): string | string[] | undefined
	{
		let race: string | string[] | undefined = undefined;
		// get species setting
		if (this.state.race.length == 1)
		{
			race = this.state.race[0];
		}
		else if (this.state.race.length > 1)
		{
			race = this.state.race;
		}
		// get alignment setting
		if (this.state.alignments.length > 0 && this.state.restrictRacesByAlignment)
		{
			race = getRaceByAlignment(this.state.alignments);
		}
		return race;
	}
	generateAirships = () =>
	{
		this.props.GenerateAirships(
			this.races,
			this.state.gender.length == 1? this.state.gender[0] : undefined,
			this.ages,
			this.state.alignments,
			this.state.numberToGenerate
		);
	}
	restoreDefaultSettings = () =>
	{
		this.setState({
			ages: [],
			alignments: [],
			gender: [ "female", "male" ],
			numberToGenerate: 20,
			race: [],
			restrictRacesByAlignment: false
		});
	}
	updateNumberToGenerate = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		this.setState({ numberToGenerate: e.target.valueAsNumber })
	}
}

interface IAirshipCollectionDisplayProps
{
	IsRandomCollection: boolean;
	AirshipCollection: IAirshipStats[];
	SortProperty?: string;
	DeleteAirship: { (id: string, isRandomCollection: boolean): void };
}
interface IAirshipCollectionDisplayState { }
class AirshipCollectionDisplay extends React.Component<IAirshipCollectionDisplayProps, IAirshipCollectionDisplayState> {
	render()
	{

		const Airships = this.props.SortProperty == "unsorted" ? this.props.AirshipCollection : AirshipCollectionHelpers.SortAirshipsByProperty(this.props.AirshipCollection.slice(), this.props.SortProperty);
		return (
			<div className="table-responsive">
				<table className="table table-light table-striped table-bordered">
					<thead>
						<tr className="header-row table-dark">
							<th className="summary">Summary</th>
							<th className="description">Description</th>
							<th className="token">Token</th>
							<th className="controls d-print-none">Controls</th>
						</tr>
					</thead>
					<tbody>
						{Airships.map((Airship, index: number) =>
							<AirshipRow
								Delete={this.Delete}
								Airship={Airship}
								key={index}
							/>
						)}
					</tbody>
				</table>
			</div>
		);
	}
	Delete = (id: string) =>
	{
		this.props.DeleteAirship(id, this.props.IsRandomCollection);
	}
}

interface IAirshipRowProps
{
	Airship: IAirshipStats;
	Delete: { (id: string): void };
}
interface IAirshipRowState { }
class AirshipRow extends React.Component<IAirshipRowProps, IAirshipRowState> {
	render()
	{
		return (
			<tr className="Airship-row">
				{/* <td className="Airship-name">
					<div style={{ fontWeight: "bold" }}>
						{this.props.Airship.name}
					</div>
					<div style={{ fontStyle: "italic" }}>
						{this.props.Airship.alignment}
						{this.props.Airship.gender} {this.props.Airship.race}
					</div>
					Threat Level: {this.props.Airship.threat}<br />
					Intelligence Level: {this.props.Airship.intelligence}
				</td>
				<td>
					{this.props.Airship.description}
				</td> */}
			</tr>
		);
	}
}

interface IAirshipStatBlockProps
{
	Airship: IAirshipStats;
}
interface IAirshipStatBlockState { }
class AirshipStatBlock extends React.Component<IAirshipStatBlockProps, IAirshipStatBlockState> {
	render()
	{
		const airship = this.props.Airship;
		return (
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{airship.name}</h5>
					<h6 className="card-subtitle mb-2 text-muted fst-italic">
						{`${airship.size} ${airship.vehicleType} (${airship.dimensions[0]} by ${airship.dimensions[1]})`}
					</h6>
					<div className="card-text lh-sm">
						<StatBlockProperty
							Label="Creature Capacity"
							Value={airship.capCrew + " crew, " + airship.capPassenger + " passengers"}
						/>
						<StatBlockProperty
							Label="Cargo Capacity"
							Value={airship.capCargo + " tons"}
						/>
						<StatBlockProperty
							Label="Travel Pace"
							Value={`${airship.pace} miles per hour (${airship.pace * 24} miles per day)`}
						/>
						<div className="row">
							<div className="col-2 text-center fw-bold">STR</div>
							<div className="col-2 text-center fw-bold">DEX</div>
							<div className="col-2 text-center fw-bold">CON</div>
							<div className="col-2 text-center fw-bold">INT</div>
							<div className="col-2 text-center fw-bold">WIS</div>
							<div className="col-2 text-center fw-bold">CHA</div>
						</div>
						<div className="row bg-secondary">
							<div className="col-2 text-center text-light">{airship.str}</div>
							<div className="col-2 text-center text-light">{airship.dex}</div>
							<div className="col-2 text-center text-light">{airship.con}</div>
							<div className="col-2 text-center text-light">{airship.int}</div>
							<div className="col-2 text-center text-light">{airship.wis}</div>
							<div className="col-2 text-center text-light">{airship.cha}</div>
						</div>
						<div>
							<b>Damage Immunities </b>
							{airship.immune.join(", ")}
						</div>
						<div>
							<b>Condition Immunities </b>
							{airship.conditionImmune.join(", ")}
						</div>
					</div>
					<div className="card-text ship-actions">
						<StatBlockHeader>
							Actions
						</StatBlockHeader>
						{
							airship.action.map((action, index: number) =>
							{
								return action.hasOwnProperty("type")?
									<div key={index}>
									{action.items.map((item: any, index: number) =>
										<StatBlockProperty
											Label={item.name}
											Value={item.entry}
											key={index}
										/>
									)}
									</div>
									:
									<div key={index}>
										{action.toString()}
									</div>
							}
							)
						}
					</div>
					<div className="card-text ship-hull">
						<StatBlockHeader>
							Hull
						</StatBlockHeader>
						<StatBlockProperty
							Label="Armor Class"
							Value={airship.hull.ac}
						/>
						<StatBlockProperty
							Label="Hit Points"
							Value={airship.hull.hp + " (damage threshold " + airship.hull.dt + ")"}
						/>
					</div>
					<div className="card-text ship-control">
						{airship.control.map((control, index: number) =>
							<div key={index}>
								<StatBlockHeader>
									{"Control: " + control.name}
								</StatBlockHeader>
								<StatBlockProperty
									Label="Armor Class"
									Value={control.ac}
								/>
								<StatBlockProperty
									Label="Hit Points"
									Value={control.hp}
								/>
								{control.entries.map((entry, index: number) =>
									<div key={index}>
										{entry}
									</div>
								)}
							</div>
						)}
					</div>
					<div className="card-text ship-movement">
						{airship.movement.map((movement, index: number) =>
							<div key={index}>
								<StatBlockHeader>
									{"Movement: " + movement.name}
								</StatBlockHeader>
								{/* <div>
									<b>Hit Points </b>
									{movement.hp}
								</div> */}
								{movement.speed.map((speed, index: number) =>
									<div key={index}>
										<b>{"Speed (" + speed.mode + ")"} </b>
										{speed.entries.join(" ")}
									</div>
								)}
							</div>
						)}
					</div>
					<div className="card-text ship-weapons">
						{airship.weapon.map((weapon, index: number) =>
							<div key={index}>
								<StatBlockHeader>
									{"Weapon: " + weapon.name + (weapon.count? ` (${weapon.count})` : "")}
								</StatBlockHeader>
								{weapon.entries.map((entry, index: number) =>
									<div key={index}>
										{entry}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const TEST_AIRSHIP: IAirshipStats = {
	"name": "Warship",
	"source": "GoS",
	"page": 194,
	"vehicleType": "SHIP",
	"size": "G",
	"dimensions": [
		"100 ft.",
		"20 ft."
	],
	"terrain": [
		"sea"
	],
	"capCrew": 40,
	"capPassenger": 60,
	"capCargo": 200,
	"pace": 4,
	"str": 20,
	"dex": 4,
	"con": 20,
	"int": 0,
	"wis": 0,
	"cha": 0,
	"immune": [
		"poison",
		"psychic"
	],
	"conditionImmune": [
		"blinded",
		"charmed",
		"deafened",
		"exhaustion",
		"frightened",
		"incapacitated",
		"paralyzed",
		"petrified",
		"poisoned",
		"prone",
		"stunned",
		"unconscious"
	],
	"hull": {
		"ac": 15,
		"hp": 500,
		"dt": 20
	},
	"control": [
		{
			"name": "Helm",
			"ac": 18,
			"hp": 50,
			"entries": [
				"Move up to the speed of one of its movement components, with one 90-degree turn. If the helm is destroyed, the warship can't turn."
			]
		}
	],
	"movement": [
		{
			"name": "Oars",
			"ac": 12,
			"hp": 100,
			"hpNote": "-5 ft. speed per 25 damage taken",
			"speed": [
				{
					"mode": "water",
					"entries": [
						"20 ft. (requires at least 20 crew)"
					]
				}
			]
		},
		{
			"name": "Sails",
			"ac": 12,
			"hp": 100,
			"hpNote": "-10 ft. speed per 25 damage taken",
			"speed": [
				{
					"mode": "water",
					"entries": [
						"35 ft.; 15 ft. while sailing into the wind; 50 ft. while sailing with the wind."
					]
				}
			]
		}
	],
	"weapon": [
		{
			"name": "Ballistas",
			"count": 2,
			"ac": 15,
			"hp": 50,
			"entries": [
				"{@atk rw} {@hit 6} to hit, range 120/480 ft., one target. {@h}16 ({@damage 3d10}) piercing damage."
			]
		},
		{
			"name": "Mangonels",
			"count": 2,
			"ac": 15,
			"hp": 100,
			"entries": [
				"{@atk rw} {@hit 5} to hit, range 200/800 ft. (can't hit targets within 60 ft. of it), one target. {@h}27 ({@damage 5d10}) bludgeoning damage."
			]
		},
		{
			"name": "Naval Ram",
			"ac": 20,
			"hp": 100,
			"dt": 10,
			"entries": [
				"The warship has advantage on all saving throws relating to crashing when it crashes into a creature or object. Any damage it takes from the crash is applied to the naval ram rather than to the ship. These benefits don't apply if another vessel crashes into the warship."
			]
		}
	],
	"actionThresholds": {
		"0": 0,
		"1": 3,
		"2": 10,
		"3": 20
	},
	"action": [
		"On its turn, the warship can take 3 actions, choosing from the options below. It can take only 2 actions if it has fewer than twenty crew and only 1 action if it has fewer than ten. It can't take these actions if it has fewer than three crew.",
		{
			"type": "list",
			"style": "list-hang-notitle",
			"items": [
				{
					"type": "item",
					"name": "Fire Ballistas.",
					"entry": "The warship can fire its {@object ballista||ballistas} (DMG, ch. 8)."
				},
				{
					"type": "item",
					"name": "Fire Mangonels.",
					"entry": "The warship can fire its {@object mangonel||mangonels} (DMG, ch. 8)."
				},
				{
					"type": "item",
					"name": "Move.",
					"entry": "The warship can use its helm to move with its oars or sails. As part of this move, it can use its naval ram."
				}
			]
		}
	],
	"hasFluff": true,
	"hasFluffImages": true
};

ReactDOM.render(
	<AirshipGeneratorControl />,
	document.getElementById("react-container")
);