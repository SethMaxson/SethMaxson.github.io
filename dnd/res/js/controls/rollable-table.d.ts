/// <reference types="react" />
interface IRollableTableRowData {
    odds: number;
    result: string;
}
interface IRollableTableProps {
    rows: IRollableTableRowData[];
    resultColumnLabel: string;
}
/**A table where each row describes a possible outcome and the associated odds in terms of dice result. The header of the dice result column can be clicked to automatically roll. */
declare class RollableTable extends React.Component<IRollableTableProps> {
    static defaultProps: {
        resultColumnLabel: string;
    };
    constructor(props: IRollableTableProps);
    render(): JSX.Element;
    roll(): string | undefined;
}
