interface IStatBlockHeaderProps { }
class StatBlockHeader extends React.Component<IStatBlockHeaderProps> {
	render()
	{
		return (
			<h6 className="border-bottom border-info text-info mt-3">
				{this.props.children}
			</h6>
		);
	}
}

interface IStatBlockPropertyProps
{
	Label: string;
	Value: number | string;
}
class StatBlockProperty extends React.Component<IStatBlockPropertyProps> {
	render()
	{
		return (
			<div>
				<b>{this.props.Label + " "}</b>
				{this.props.Value}
			</div>
		);
	}
}