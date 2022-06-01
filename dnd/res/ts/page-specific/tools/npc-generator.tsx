declare var races: string[];

const NPCCollectionHelpers = {
	AddNpcToCollection(collection: NPCManager, npc: NPC) {
		// if the item doesn't have an ID, generate one
		if (npc.id == undefined) {
			var hits = collection.all.filter(function(entry) {
				return entry.id == npc.name;
			});
			if (hits.length == 0) {
				npc.id = npc.name;
			}
			else {
				let counter = 0;
				let matchFound = false;
				let newID: string;
				do {
					newID = (npc.name + counter);
					hits = collection.all.filter(function(entry) {
						return entry.id == newID;
					});
					if (hits.length == 0) matchFound = true;
					counter++;
				} while (matchFound == false);
				npc.id = newID;
			}
		}
		collection.all.push(npc);
		NPCCollectionHelpers.ApplyFilters(collection);
	},
	ApplyFilters(collection: NPCManager, races?: string[], genders?: string[], alignments?: string[]) {
		collection.races = races || collection.races;
		collection.genders = genders || collection.genders;
		collection.alignments = alignments || collection.alignments;
		collection.filtered = [];
		for (let index = 0; index < collection.all.length; index++) {
			let shouldRender = true;
			const item = collection.all[index];
			if (collection.races.length > 0) {
				if (!collection.races.includes(item.race)) shouldRender = false;
			}
			if (collection.genders.length > 0) {
				if (!collection.genders.includes(item.gender)) shouldRender = false;
			}
			if (collection.alignments.length > 0) {
				if (!collection.alignments.includes(item.alignment)) shouldRender = false;
			}
			if (collection.relativeAges.length > 0) {
				if (!collection.relativeAges.includes(item.relativeAge)) shouldRender = false;
			}
			if (shouldRender) {
				collection.filtered.push(item);
			}
		}
		return collection.filtered;
	},
	ResetFilters(collection: NPCManager) {
		collection.races = [];
		collection.genders = [];
		collection.alignments = [];
		collection.relativeAges = [];
	},
	SortNPCsByProperty(npcCollection: NPC[], property: string = "name", desc: boolean = false)
	{
		if (npcCollection.length > 0 && npcCollection[0].hasOwnProperty(property)) {
			if (desc) {
				// Descending
				npcCollection.sort((a, b) =>
				{
					if (a[property] == b[property]) {
						return 0;
					}
					return (a[property] > b[property]) ? -1 : 1;
				})
			} else {
				npcCollection.sort((a, b) =>
				{
					if (a[property] == b[property]) {
						return 0;
					}
					return (a[property] > b[property]) ? 1 : -1;
				})
			}
		}
		return npcCollection;
	}
}

interface INPCGeneratorProps { }
interface INPCGeneratorState
{
	loadedNPCs: NPCManager;
	randomNPCs: NPCManager;
	sortLoaded: string;
	sortRandom: string;
	species: IRace[];
}
class NPCGenerator extends React.Component<INPCGeneratorProps, INPCGeneratorState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	npcGenerator: NPCDeepGenerator;
	constructor(props: INPCGeneratorProps)
	{
		super(props);

		this.state = {
			loadedNPCs: new NPCManager(),
			randomNPCs: new NPCManager(),
			sortLoaded: "unsorted",
			sortRandom: "unsorted",
			species: [],
		};
		this.npcGenerator = new NPCDeepGenerator();
	}
	render()
	{
		return (
			<div className="container bg-secondary" style={{padding: 0}}>
				<div className="accordion accordion-flush" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header noprint" id="headingOne">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
								Loaded NPCs
							</button>
						</h2>
						<div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							<div className="accordion-body bg-secondary">
								<div className="row noprint mb-3">
									<div className="col-auto">
										<div className="row noprint">
											<label className="col-auto col-form-label" htmlFor="loaded-sort-select">Sort by:</label>
											<div className="col-auto">
												<NPCGeneratorSort
													sortMethod={this.state.sortLoaded}
													onChange={e =>
													{
														this.setState({ sortLoaded: e.target.value });
													}}
												/>
											</div>
										</div>
									</div>
									<div className="col-auto">
										<button className="btn btn-primary" onClick={this.SaveNPCs}>Save!</button>
									</div>
								</div>
								<NpcCollectionDisplay
									IsRandomCollection={false}
									NpcCollection={this.state.loadedNPCs.filtered}
									SortProperty={this.state.sortLoaded}
									DeleteNPC={this.DeleteNPC}
									GetRelativeNumericAge={this.GetRelativeNumericAge}
									TransferNPCBetweenManagers={this.TransferNPCBetweenManagers}
									UpdateNpc={this.UpdateNpc}
								/>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header noprint" id="headingTwo">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
								Random NPCs
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							<div className="accordion-body bg-secondary">
								<NPCGeneratorSettings
									ClearRandomNPCs={this.ClearRandomNPCs}
									GenerateNPCs={this.GenerateNPCs}
									Species={this.state.species}
								/>
								<div className="mb-3 row noprint d-print-none">
									<label className="col-sm-1 col-form-label" htmlFor="random-sort-select">Sort by:</label>
									<div className="col-sm-11">
										<NPCGeneratorSort
											sortMethod={this.state.sortRandom}
											onChange={e =>
											{
												this.setState({ sortRandom: e.target.value });
											}}
										/>
									</div>
								</div>
								<NpcCollectionDisplay
									IsRandomCollection={true}
									NpcCollection={this.state.randomNPCs.filtered}
									SortProperty={this.state.sortRandom}
									DeleteNPC={this.DeleteNPC}
									GetRelativeNumericAge={this.GetRelativeNumericAge}
									TransferNPCBetweenManagers={this.TransferNPCBetweenManagers}
									UpdateNpc={this.UpdateNpc}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount()
	{
		const self = this;

		$.ajax({
			crossDomain: true,
			url: "/dnd/res/data/races.json",
			dataType: 'json'
		}).done(function (returnedData: IRace[])
		{
			returnedData.sort(compareRaceJsonObjects);
			self.setState({ species: returnedData }, () =>
			{
				//#region initialize jquery.multiselect.js
				//@ts-ignore
				$('#race-select').multiselect({
					columns: 1,
					placeholder: 'Surprise Me',
					search: true,
					selectAll: true
				});
				//#endregion initialize jquery.multiselect.js
			});

			//#region initialize jquery.multiselect.js

			//@ts-ignore
			$('#alignment-select').multiselect({
				columns: 3,
				placeholder: 'Surprise Me',
				selectAll: true,
				// selectGroup: true
			});

			//@ts-ignore
			$('#gender-select').multiselect({
				columns: 1,
				placeholder: 'Surprise Me'
			});
			//#endregion initialize jquery.multiselect.js

			for (let i = 0; i < returnedData.length; i++) {
				races.push(returnedData[i].ID);
			}
			getNPCs().done(function (items) {
				const loadedNPCs = new NPCManager(items);
				loadedNPCs.parse();
				self.setState({ loadedNPCs: loadedNPCs });
			});
			self.GenerateNPCs(undefined, undefined, undefined, [], 20);
		});
	}
	ClearRandomNPCs = () =>
	{
		const newRandomNPCs = this.CloneNPCManager(this.state.randomNPCs);
		newRandomNPCs.all = [];
		newRandomNPCs.filtered = [];
		this.setState({
			randomNPCs: newRandomNPCs
		});
	}
	/** Creates a deep clone version of the specified NPCManager, for use in updating state. */
	CloneNPCManager = (npcManager: NPCManager): NPCManager =>
	{
		const newManager = Object.assign({}, npcManager);
		// return JSON.parse(JSON.stringify(npcManager));
		newManager.all = JSON.parse(JSON.stringify(npcManager.all));
		newManager.filtered = JSON.parse(JSON.stringify(npcManager.filtered));
		return newManager;
	}
	DeleteNPC = (id: string, isRandomCollection: boolean) => {
		let npcCollection = this.CloneNPCManager(isRandomCollection ? this.state.randomNPCs : this.state.loadedNPCs);
		this.RemoveNPCFromManager(npcCollection, id);
		this.UpdateNpcCollection(npcCollection, isRandomCollection);
	}
	UpdateNpc = (id: string, isRandomCollection: boolean, updateSteps: { (npc: INPC): void }) => {
		let npcCollection = this.CloneNPCManager(isRandomCollection ? this.state.randomNPCs : this.state.loadedNPCs);
		const allIndex = npcCollection.all.findIndex(npc => npc.id === id);
		const filteredIndex = npcCollection.filtered.findIndex(npc => npc.id === id);
		updateSteps(npcCollection.all[allIndex]);
		updateSteps(npcCollection.filtered[filteredIndex]);
		this.UpdateNpcCollection(npcCollection, isRandomCollection);
	}
	UpdateNpcCollection = (npcCollection: NPCManager, isRandomCollection: boolean) => {
		if (isRandomCollection) {
			this.setState({ randomNPCs: npcCollection });
		}
		else
		{
			this.setState({ loadedNPCs: npcCollection });
		}
	}
	GenerateNPCs = (race: string|string[]|undefined, gender: string|undefined, age: AgeCategory[]|undefined, alignment: Alignment[], number: number) =>
	{
		const randomNPCs = this.CloneNPCManager(this.state.randomNPCs);
		// create NPCs
		for (let index = 0; index < number; index++) {
			const newnpc = new NPC();
			let alignmentToUse = undefined;
			if (alignment.length) {
				alignmentToUse = randomize(alignment);
			}
			let raceToUse = race instanceof Array? getRandomRaceFromList(race) : race;
			this.npcGenerator.randomizeNPC(newnpc, raceToUse, gender, age, alignmentToUse);
			NPCCollectionHelpers.AddNpcToCollection(randomNPCs, newnpc);
		}
		this.setState({
			randomNPCs: randomNPCs
		});
	}
	GetRelativeNumericAge = (npc: NPC): number =>
	{
		return this.npcGenerator.getNPCOldness(npc);
	}
	RemoveNPCFromManager = (manager: NPCManager, id: string) =>
	{
		const allIndex = manager.all.findIndex(npc => npc.id === id);
		const filteredIndex = manager.filtered.findIndex(npc => npc.id === id);
		// remove from specified npc collection
		manager.all.splice(allIndex, 1);
		manager.filtered.splice(filteredIndex, 1);
	}
	SaveNPCs = () =>
	{
		this.state.loadedNPCs.save();
	};
	TransferNPCBetweenManagers = (moveToRandomCollection: boolean, id: string) =>
	{
		const loadedNPCs = this.CloneNPCManager(this.state.loadedNPCs);
		const randomNPCs = this.CloneNPCManager(this.state.randomNPCs);
		const donor = moveToRandomCollection ? loadedNPCs : randomNPCs;
		const target = moveToRandomCollection ? randomNPCs : loadedNPCs;
		// locate target npc
		const npc = donor.filtered.filter(npc => npc.id == id)[0];
		// add to random npc collection
		NPCCollectionHelpers.AddNpcToCollection(target, npc);
		// remove from saved npc collection
		this.RemoveNPCFromManager(donor, npc.id);

		this.setState({
			loadedNPCs: loadedNPCs,
			randomNPCs: randomNPCs,
		});
	}
}

interface INPCGeneratorSortProps
{
	sortMethod: string;
	onChange: { (e: React.ChangeEvent<HTMLSelectElement>): void }
}
class NPCGeneratorSort extends React.Component<INPCGeneratorSortProps> {
	render()
	{
		return (
			<select
				className="form-select"
				onChange={this.props.onChange}
				value={this.props.sortMethod}
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
		);
	}
}


interface INPCGeneratorSettingsProps
{
	Species: IRace[];
	ClearRandomNPCs: { (): void };
	GenerateNPCs: { (race: string|string[]|undefined, gender: string|undefined, age: AgeCategory[]|undefined, alignment: Alignment[], number: number): void }
}
interface INPCGeneratorSettingsState
{
	ages: AgeCategory[];
	alignments: Alignment[];
	gender: string[];
	numberToGenerate: number;
	race: string[];
	restrictRacesByAlignment: boolean;
}
class NPCGeneratorSettings extends React.Component<INPCGeneratorSettingsProps, INPCGeneratorSettingsState> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	constructor(props: INPCGeneratorSettingsProps)
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
				<button className="btn btn-secondary" onClick={this.restoreDefaultSettings}>Default Settings</button>
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
				<button className="btn btn-primary me-1" onClick={this.generateNPCs}>Generate!</button>
				<button className="btn btn-danger" onClick={this.props.ClearRandomNPCs}>Clear NPCs</button>
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
	generateNPCs = () =>
	{
		this.props.GenerateNPCs(
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

interface INpcCollectionDisplayProps
{
	IsRandomCollection: boolean;
	NpcCollection: NPC[];
	SortProperty?: string;
	DeleteNPC: { (id: string, isRandomCollection: boolean): void };
	GetRelativeNumericAge: { (npc: NPC): number }
	TransferNPCBetweenManagers: { (moveToRandomCollection: boolean, id: string): void };
	UpdateNpc: { (id: string, isRandomCollection: boolean, updateSteps: { (npc: INPC): void }): void };
}
interface INpcCollectionDisplayState { }
class NpcCollectionDisplay extends React.Component<INpcCollectionDisplayProps, INpcCollectionDisplayState> {
	render()
	{

		const NPCs = this.props.SortProperty == "unsorted" ? this.props.NpcCollection : NPCCollectionHelpers.SortNPCsByProperty(this.props.NpcCollection.slice(), this.props.SortProperty);
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
						{NPCs.map((npc, index: number) =>
							<NpcRow
								Delete={this.Delete}
								TransferLabel={this.props.IsRandomCollection? "Add" : "Remove"}
								Transfer={this.Transfer}
								Update={this.Update}
								NPC={npc}
								RelativeNumericAge={this.props.GetRelativeNumericAge(npc)}
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
		this.props.DeleteNPC(id, this.props.IsRandomCollection);
	}
	Transfer = (id: string) =>
	{
		this.props.TransferNPCBetweenManagers(!this.props.IsRandomCollection, id);
	}
	Update = (id: string, updateSteps: { (npc: INPC): void }) =>
	{
		this.props.UpdateNpc(id, this.props.IsRandomCollection, updateSteps);
	}
}

interface INpcRowProps
{
	NPC: NPC;
	RelativeNumericAge: number;
	TransferLabel: string;
	Delete: { (id: string): void };
	Transfer: { (id: string): void };
	Update: { (id: string, updateSteps: { (npc: INPC): void }): void };
}
interface INpcRowState { }
class NpcRow extends React.Component<INpcRowProps, INpcRowState> {
	render()
	{
		let ageColor = `rgb(${Math.round(200 * this.props.RelativeNumericAge)},${Math.round(200 * (1 - this.props.RelativeNumericAge))},00)`;
		let imgSrc = getNPCImage(this.props.NPC);
		// var threatMod = threat.indexOf(this.props.NPC.threat)/(threat.length);
		return (
			<tr className="npc-row">
				<td className="npc-name">
					<div style={{ fontWeight: "bold" }}>
						{this.props.NPC.name}
					</div>
					<div style={{ fontStyle: "italic" }}>
						{this.props.NPC.alignment}
						<span style={{ color: ageColor }}> {this.props.NPC.relativeAge} ({this.props.NPC.age} years) </span>
						<span onClick={() => this.props.Update(this.props.NPC.id, (npc) => { npc.gender = npc.gender == "female"? "male" : "female" })}>{this.props.NPC.gender} </span>
						{this.props.NPC.race}
					</div>
					Threat Level: {this.props.NPC.threat}<br />
					Intelligence Level: {this.props.NPC.intelligence}
				</td>
				<td>
					{this.props.NPC.description}
				</td>
				<td style={{ position: "relative" }}>
					<div className="token" style={{ backgroundImage: "url('" + imgSrc + "')" }}></div>
				</td>
				<td className="noprint">
					<button className="btn btn-secondary m-1" onClick={() => this.props.Transfer(this.props.NPC.id)}>{this.props.TransferLabel}</button>
					<button className="btn btn-secondary m-1" onClick={this.CopyMapDescription}>Copy description</button>
					<button className="btn btn-secondary m-1" onClick={() => alert(HairGenerator.color(this.props.NPC.race, this.props.NPC.gender, this.props.NPC.relativeAge))}>Hair</button>
					<button className="btn btn-danger m-1" onClick={() => this.props.Delete(this.props.NPC.id)}>Delete</button>
				</td>
			</tr>
		);
	}
	CopyMapDescription = () =>
	{
		const mapPageDescription = `${this.props.NPC.name} - ${this.props.NPC.alignment} ${this.props.NPC.relativeAge.capitalize()} ${this.props.NPC.gender.capitalize()} ${this.props.NPC.race.capitalize()}. Threat level: ${this.props.NPC.threat}. Intelligence level: ${this.props.NPC.intelligence}. ${this.props.NPC.description}`;
		navigator.clipboard.writeText(mapPageDescription);
	}
}

function compareRaceJsonObjects(a: IRace, b: IRace): 1 | 0 | -1
{
	if (a.name < b.name)
	{
		return -1;
	}
	else if (a.name > b.name)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

ReactDOM.render(
	<NPCGenerator />,
	document.getElementById("react-container")
);