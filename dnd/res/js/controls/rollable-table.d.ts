/// <reference types="react" />
interface IRollableTableRowData {
    odds: number;
    result: string;
}
interface IRollableTableProps {
    rows: IRollableTableRowData[];
    resultColumnLabel: string;
}
declare class RollableTable extends React.Component<IRollableTableProps> {
    static defaultProps: {
        resultColumnLabel: string;
    };
    constructor(props: IRollableTableProps);
    render(): JSX.Element;
    roll(): string | undefined;
}
