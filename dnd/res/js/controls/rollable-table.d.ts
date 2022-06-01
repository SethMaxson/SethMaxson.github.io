/// <reference types="react" />
interface IRollableTableRowData {
    odds?: number;
    result: string;
    /** A list of categories with which the available outcomes can be filtered for more relevant results. */
    categories?: string[];
    /** A list of tags with which the available outcomes can be filtered for more relevant results. */
    tags?: string[];
}
interface IRollableTableProps {
    rows: IRollableTableRowData[];
    resultColumnLabel: string;
    tagsColumnLabel: string;
    useCategories: boolean;
    useTags: boolean;
}
/**A table where each row describes a possible outcome and the associated odds in terms of dice result. The header of the dice result column can be clicked to automatically roll. */
declare class RollableTable extends React.Component<IRollableTableProps> {
    static defaultProps: {
        resultColumnLabel: string;
        tagsColumnLabel: string;
        useCategories: boolean;
        useTags: boolean;
    };
    render(): JSX.Element;
    roll: () => string | undefined;
}
