/// <reference types="react" />
declare var races: string[];
declare const NPCCollectionHelpers: {
    AddNpcToCollection(collection: NPCManager, npc: NPC): void;
    ApplyFilters(collection: NPCManager, races?: string[] | undefined, genders?: string[] | undefined, alignments?: string[] | undefined): NPC[];
    ResetFilters(collection: NPCManager): void;
};
interface INPCGeneratorProps {
}
interface INPCGeneratorState {
    loadedNPCs: NPCManager;
    randomNPCs: NPCManager;
    species: IRace[];
}
declare class NPCGenerator extends React.Component<INPCGeneratorProps, INPCGeneratorState> {
    npcGenerator: NPCDeepGenerator;
    constructor(props: INPCGeneratorProps);
    render(): JSX.Element;
    componentDidMount(): void;
    ClearRandomNPCs: () => void;
    /** Creates a deep clone version of the specified NPCManager, for use in updating state. */
    CloneNPCManager: (npcManager: NPCManager) => NPCManager;
    DeleteNPC: (index: number, isRandomCollection: boolean) => void;
    GenerateNPCs: (race: string | string[] | undefined, gender: string | undefined, age: AgeCategory[] | undefined, alignment: Alignment[], number: number) => void;
    GetRelativeNumericAge: (npc: NPC) => number;
    RemoveNPCFromManager: (manager: NPCManager, index: number) => void;
    SaveNPCs: () => void;
    SortNPCs: (isRandomCollection: boolean, property: string) => void;
    TransferNPCBetweenManagers: (moveToRandomCollection: boolean, index: number) => void;
}
interface INPCGeneratorSettingsProps {
    Species: IRace[];
    ClearRandomNPCs: {
        (): void;
    };
    GenerateNPCs: {
        (race: string | string[] | undefined, gender: string | undefined, age: AgeCategory[] | undefined, alignment: Alignment[], number: number): void;
    };
}
interface INPCGeneratorSettingsState {
    ages: AgeCategory[];
    alignments: Alignment[];
    gender: string[];
    numberToGenerate: number;
    race: string[];
    restrictRacesByAlignment: boolean;
}
declare class NPCGeneratorSettings extends React.Component<INPCGeneratorSettingsProps, INPCGeneratorSettingsState> {
    constructor(props: INPCGeneratorSettingsProps);
    render(): JSX.Element;
    get ages(): AgeCategory[] | undefined;
    get races(): string | string[] | undefined;
    generateNPCs: () => void;
    restoreDefaultSettings: () => void;
    updateNumberToGenerate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface INpcCollectionDisplayProps {
    IsRandomCollection: boolean;
    NpcCollection: NPCManager;
    DeleteNPC: {
        (index: number, isRandomCollection: boolean): void;
    };
    GetRelativeNumericAge: {
        (npc: NPC): number;
    };
    TransferNPCBetweenManagers: {
        (moveToRandomCollection: boolean, index: number): void;
    };
}
interface INpcCollectionDisplayState {
}
declare class NpcCollectionDisplay extends React.Component<INpcCollectionDisplayProps, INpcCollectionDisplayState> {
    render(): JSX.Element;
    Delete: (index: number) => void;
    Transfer: (index: number) => void;
}
interface INpcRowProps {
    Index: number;
    NPC: NPC;
    RelativeNumericAge: number;
    TransferLabel: string;
    Delete: {
        (index: number): void;
    };
    Transfer: {
        (index: number): void;
    };
}
interface INpcRowState {
}
declare class NpcRow extends React.Component<INpcRowProps, INpcRowState> {
    render(): JSX.Element;
    CopyMapDescription: () => void;
}
interface IMultiSelectProps {
    LabelWhenEmpty: string;
    Options: {
        label: string;
        value: string;
    }[];
    OnChange: {
        (value: string[]): void;
    };
    /**Controls whether or not the search bar is displayed. */
    Search: boolean;
    /**Controls whether or not the "Select All" button is displayed. */
    SelectAll: boolean;
    Value: string[];
}
interface IMultiSelectState {
    expanded: boolean;
    searchString: string;
}
declare class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
    static defaultProps: {
        LabelWhenEmpty: string;
        Search: boolean;
        SelectAll: boolean;
    };
    constructor(props: IMultiSelectProps);
    render(): JSX.Element;
    handleCheck: (value: string, adding: boolean) => void;
    selectAll: () => void;
    toggleExpand: () => void;
    unselectAll: () => void;
}
declare function compareRaceJsonObjects(a: IRace, b: IRace): 0 | 1 | -1;
