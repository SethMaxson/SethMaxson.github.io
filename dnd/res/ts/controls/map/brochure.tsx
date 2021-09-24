interface IBrochureProps
{
	agency: string;
	title: string;
}
class Brochure extends React.Component<IBrochureProps> {
    public static defaultProps = {
        agency: "Amarillo Airship Agency",
	};
	render()
	{
		return (
			<div className="location-info">
				<h3>{this.props.agency}</h3>
				<h1>{this.props.title}</h1>
				{this.props.children}
			</div>
		);
	}
}