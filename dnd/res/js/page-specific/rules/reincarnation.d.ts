/// <reference types="react" />
interface IReincarnationViewerProps {
    tableData: IReincarnationTables;
}
declare class ReincarnationViewer extends React.Component<IReincarnationViewerProps> {
    render(): JSX.Element;
}
interface IReincarnationSlimTableAccordionItemProps {
    parentID: string;
    slimData: ISlimReincarnationTableData;
    resultColumnLabel: string;
}
declare class ReincarnationSlimTableAccordionItem extends React.Component<IReincarnationSlimTableAccordionItemProps> {
    static defaultProps: {
        resultColumnLabel: string;
    };
    render(): JSX.Element;
}
interface IReincarnationAccordionItemProps {
    idBase?: string;
    parentID: string;
    title: string;
    postface: string[];
    preface: string[];
    resultColumnLabel: string;
    rows: IRollableTableRowData[];
}
declare class ReincarnationAccordionItem extends React.Component<IReincarnationAccordionItemProps> {
    static defaultProps: {
        postface: never[];
        preface: never[];
        resultColumnLabel: string;
    };
    render(): JSX.Element;
}
interface ISlimReincarnationTableData {
    postface?: string[];
    preface?: string[];
    rows: IRollableTableRowData[];
    title: string;
}
interface IReincarnationTables {
    distortions: {
        elemental: ISlimReincarnationTableData[];
        magical: ISlimReincarnationTableData[];
    };
    gender: IRollableTableRowData[];
    magicalDistortions: {
        celestial: IRollableTableRowData[];
        fey: IRollableTableRowData[];
        fiend: IRollableTableRowData[];
        necrotic: IRollableTableRowData[];
    };
    otherTables: {
        animals: IRollableTableRowData[];
        lycanthropy: IRollableTableRowData[];
    };
    race: IRollableTableRowData[];
    subraces: {
        exotic: ISlimReincarnationTableData[];
        standard: ISlimReincarnationTableData[];
    };
    successfulness: IRollableTableRowData[];
}
declare const ReincarnationTables: IReincarnationTables;
