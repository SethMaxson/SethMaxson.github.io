interface IRollableTableRowData
{
	odds: number;
	result: string;
}

interface IRollableTableProps
{
	rows: IRollableTableRowData[];
	resultColumnLabel: string;
}
/**A table where each row describes a possible outcome and the associated odds in terms of dice result. The header of the dice result column can be clicked to automatically roll. */
class RollableTable extends React.Component<IRollableTableProps> {
	public static defaultProps = {
		resultColumnLabel: "Result"
    };
	render()
	{
		let die = 0;
		let lastRollCutoff = 1;
		for (let i = 0; i < this.props.rows.length; i++) {
			die += this.props.rows[i].odds;
		}
		return (
			<table className="table table-dark table-striped">
				<thead>
					<tr>
						<th>
							<button
								type="button"
								className="btn btn-link btm-sm m-0 p-0"
								onClick={this.roll}
							>
								1d{die}
							</button>
						</th>
						<th>{this.props.resultColumnLabel}</th>
					</tr>
				</thead>
				<tbody>
					{this.props.rows.map((row, index: number) =>
					{
						let oddsRange = row.odds > 1 ? (lastRollCutoff + "-" + (lastRollCutoff + row.odds - 1)) : lastRollCutoff;
						lastRollCutoff += row.odds;
						return (
							<tr key={index}>
								<td>{oddsRange}</td>
								<td>{row.result}</td>
							</tr>
						)
					}
					)}
				</tbody>
			</table>
		);
	}
	roll = (): string | undefined =>
	{
		var result: string | undefined;
		var totalWeight = 0;
		for (let i = 0; i < this.props.rows.length; i++) {
			totalWeight += this.props.rows[i].odds;
		}

		var rand = Math.ceil(Math.random() * totalWeight);
		var currentWeight = 0;
		for (let i = 0; i <= this.props.rows.length; i++) {
			const row = this.props.rows[i];
			currentWeight += row.odds;
			if (rand <= currentWeight) {
				result = row.result;
				break;
			}
		}

		alert(rand + ".\n" + result);
		return result;
	}
}