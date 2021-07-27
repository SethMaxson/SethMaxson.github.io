interface IDioramaProps
{
	title: string;
	background: string;
	cutouts: ICutout[];
}

interface IDioramaStandeeProps
{
	height: number;
	image: string;
	name: string;
}
class DioramaStandee extends React.Component<IDioramaStandeeProps> {
	render()
	{
		return (
			<div style={{ height: this.props.height + "%"}}>
				<div className="name">{this.props.name}</div>
				<img src={this.props.image} alt={this.props.name} />
			</div>
		);
	}
}

interface IDioramaProps
{
	title: string;
	background: string;
	cutouts: ICutout[];
}
class Diorama extends React.Component<IDioramaProps> {
	render()
	{
		return (
			<div className="background" style={{"padding":"0px","height":"100%","backgroundImage":"url(" + this.props.background + ")"}}>
				<div className="title">{this.props.title}</div>
				<div className="container">
					<div className="slider">
						<div className="gravity"></div>
						{this.props.cutouts.map((cutout, index: number) =>
							<DioramaStandee height={cutout.height} image={cutout.img} name={cutout.name} key={index} />
						)}
					</div>
				</div>
			</div>
		);
	}
}