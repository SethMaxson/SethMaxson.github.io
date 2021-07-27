
interface IMoodViewerProps
{
	dioramas: IDioramaIndex;
}
interface IMoodViewerState
{
	dioramaShownAtLoad: boolean;
	selectedDiorama: IDioramaProps;
}
class MoodViewer extends React.Component<IMoodViewerProps, IMoodViewerState> {
	constructor(props: IMoodViewerProps)
	{
		super(props);
		this.changeDiorama = this.changeDiorama.bind(this);
		let dioramaName = GetURLParameter("diorama");
		let matches: IDioramaProps[] = [];
		if (dioramaName) {
			matches = matches.concat(this.props.dioramas.cities.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
			matches = matches.concat(this.props.dioramas.continents.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
			matches = matches.concat(this.props.dioramas.misc.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
			matches = matches.concat(this.props.dioramas.regions.filter(el => el.title.toLowerCase() == dioramaName?.toLowerCase()));
		}
		let selectedDiorama = matches.length > 0 ? matches[0] : this.props.dioramas.continents[0];

		this.state = {
			dioramaShownAtLoad: matches.length > 0,
			selectedDiorama: selectedDiorama
		};
	}
	render()
	{
		return (
			<div>
				<ul className="nav nav-tabs sticky-top fixed-top bg-dark" id="myTab" role="tablist">
					<li className="nav-item" role="presentation">
						<button className="nav-link active" id="continents-tab" data-bs-toggle="tab" data-bs-target="#continents" type="button" role="tab" aria-controls="continents" aria-selected="true">Continents</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="cities-tab" data-bs-toggle="tab" data-bs-target="#cities" type="button" role="tab" aria-controls="cities" aria-selected="false">Cities</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="regions-tab" data-bs-toggle="tab" data-bs-target="#regions" type="button" role="tab" aria-controls="regions" aria-selected="false">Regions</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="misc-tab" data-bs-toggle="tab" data-bs-target="#misc" type="button" role="tab" aria-controls="misc" aria-selected="false">Misc.</button>
					</li>
				</ul>
				<div className="tab-content row" id="myTabContent">
					<div className="tab-pane show active" id="continents" role="tabpanel" aria-labelledby="continents-tab">

						<div className="list-group">
							{this.props.dioramas.continents.map((diorama, index: number) =>
								<DioramaLink diorama={diorama} key={index} onClick={this.changeDiorama} />
							)}
						</div>

					</div>

					<div className="tab-pane" id="cities" role="tabpanel" aria-labelledby="cities-tab">

						<div className="list-group">
							{this.props.dioramas.cities.map((diorama, index: number) =>
								<DioramaLink diorama={diorama} key={index} onClick={this.changeDiorama} />
							)}
						</div>

					</div>
					<div className="tab-pane" id="regions" role="tabpanel" aria-labelledby="regions-tab">

						<div className="list-group">
							{this.props.dioramas.regions.map((diorama, index: number) =>
								<DioramaLink diorama={diorama} key={index} onClick={this.changeDiorama} />
							)}
						</div>

					</div>
					<div className="tab-pane" id="misc" role="tabpanel" aria-labelledby="misc-tab">

						<div className="list-group">
							{this.props.dioramas.misc.map((diorama, index: number) =>
								<DioramaLink diorama={diorama} key={index} onClick={this.changeDiorama} />
							)}
						</div>
					</div>
				</div>
				<DioramaModal diorama={this.state.selectedDiorama} startShown={this.state.dioramaShownAtLoad} />
			</div>

		);
	}
	changeDiorama(diorama: IDioramaProps)
	{
		this.setState({ selectedDiorama: diorama });
	}
}

interface IDioramaModalProps
{
	diorama: IDioramaProps;
	startShown: boolean;
}
class DioramaModal extends React.Component<IDioramaModalProps> {
	render()
	{
		return (
			<div className={"modal fade" + (this.props.startShown ? " show" : "")} id="diorama-modal" aria-labelledby="diorama-modal-label" aria-hidden={this.props.startShown ? "false" : "true"} style={{display: this.props.startShown? "block" : "none"}}>
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content bg-dark">
						{/* <div className="modal-header">
							<h4 className="modal-title text-light" id="diorama-modal-label">{this.props.diorama.title}</h4>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
						</div> */}
						<div className="modal-body p-1">
							<button type="button" className="m-2 btn-close btn-close-white position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
							<Diorama background={this.props.diorama.background} title={this.props.diorama.title} cutouts={this.props.diorama.cutouts} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

interface IDioramaLinkProps
{
	diorama: IDioramaProps;
	onClick: { (diorama: IDioramaProps): void };
}
class DioramaLink extends React.Component<IDioramaLinkProps> {
	render()
	{
		return (
			<button className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#diorama-modal" onClick={(ev) => this.props.onClick(this.props.diorama)}>{this.props.diorama.title}</button>
		);
	}
}

interface IDioramaIndex
{
	cities: IDioramaProps[];
	continents: IDioramaProps[];
	misc: IDioramaProps[];
	regions: IDioramaProps[];
}
const DIORAMAS: IDioramaIndex = {
	cities: [],
	continents: [
		{
			title: "Decapos",
			background: "/img/locales/remi-delabaudiere-ancient-kalampaka.jpg",
			cutouts: [
				{
					height: 40,
					name: "Tabaxi",
					img: "/dnd/img/races/raceEntry/Tabaxi.png"
				},
				{
					height: 40,
					name: "Hobgoblin",
					img: "/dnd/img/races/raceEntry/Hobgoblin.png"
				},
				{
					height: 45,
					name: "Myconid",
					img: "/dnd/img/races/raceEntry/Myconid.png"
				},
				{
					height: 35,
					name: "Mongrelfolk",
					img: "/dnd/img/races/raceEntry/Mongrelfolk.png"
				},
				{
					height: 35,
					name: "Kuo-Toa",
					img: "/dnd/img/races/raceEntry/KuoToa.png"
				}
			]
		},
		{
			title: "Notre",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		},
		{
			title: "Paros",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		},
		{
			title: "Peku",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		},
		{
			title: "Sutre",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		},
		{
			title: "Terrapim",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		}
	],
	misc: [
		{
			title: "Temple of the Forest",
			background: "/img/locales/logan-lee-01-shaolin-temple-logan-lee.jpg",
			cutouts: [
				{
					height: 55,
					name: "WickerBeak",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		}
	],
	regions: [
		{
			title: "Scorchwind Desert",
			background: "/img/locales/windows_xp_bliss-wide.jpg",
			cutouts: [
				{
					height: 55,
					name: "string",
					img: "/dnd/img/characters/npc/wickerbeak_dryad.png"
				}
			]
		}
	]
};

ReactDOM.render(
	<MoodViewer dioramas={DIORAMAS} />,
	document.getElementById("mood-viewer-panel")
);