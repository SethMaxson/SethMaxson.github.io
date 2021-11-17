interface IDMScreenProps
{ }
class DmScreen extends React.Component<IDMScreenProps> {
	// public static defaultProps = {
	// 	friendshipLevel: storage.isGM? 6 : 1
	// };
	render()
	{
		return (
			<div className="container-fluid">
				<div className="row row-cols-auto">
					<div className="col border border-dark">Column</div>
					<div className="col border border-dark">Column</div>
					<div className="col border border-dark">Column</div>
					<div className="col border border-dark">Column</div>
				</div>
			</div>
		);
	}
}