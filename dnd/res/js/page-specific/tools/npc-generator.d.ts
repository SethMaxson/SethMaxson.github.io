/// <reference types="react" />
declare var races: string[];
declare const NPCCollectionHelpers: {
    AddNpcToCollection(collection: NPCManager, npc: NPC): void;
    ApplyFilters(collection: NPCManager, races?: string[] | undefined, genders?: string[] | undefined, alignments?: string[] | undefined): NPC[];
    ResetFilters(collection: NPCManager): void;
    SortNPCsByProperty(npcCollection: NPC[], property?: string, desc?: boolean): NPC[];
};
interface INPCGeneratorProps {
}
interface INPCGeneratorState {
    loadedNPCs: NPCManager;
    randomNPCs: NPCManager;
    sortLoaded: string;
    sortRandom: string;
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
    DeleteNPC: (id: string, isRandomCollection: boolean) => void;
    UpdateNpc: (id: string, isRandomCollection: boolean, updateSteps: (npc: INPC) => void) => void;
    UpdateNpcCollection: (npcCollection: NPCManager, isRandomCollection: boolean) => void;
    GenerateNPCs: (race: string | string[] | undefined, gender: string | undefined, age: AgeCategory[] | undefined, alignment: Alignment[], number: number) => void;
    GetRelativeNumericAge: (npc: NPC) => number;
    RemoveNPCFromManager: (manager: NPCManager, id: string) => void;
    SaveNPCs: () => void;
    TransferNPCBetweenManagers: (moveToRandomCollection: boolean, id: string) => void;
}
interface INPCGeneratorSortProps {
    sortMethod: string;
    onChange: {
        (e: React.ChangeEvent<HTMLSelectElement>): void;
    };
}
declare class NPCGeneratorSort extends React.Component<INPCGeneratorSortProps> {
    render(): JSX.Element;
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
    NpcCollection: NPC[];
    SortProperty?: string;
    DeleteNPC: {
        (id: string, isRandomCollection: boolean): void;
    };
    GetRelativeNumericAge: {
        (npc: NPC): number;
    };
    TransferNPCBetweenManagers: {
        (moveToRandomCollection: boolean, id: string): void;
    };
    UpdateNpc: {
        (id: string, isRandomCollection: boolean, updateSteps: {
            (npc: INPC): void;
        }): void;
    };
}
interface INpcCollectionDisplayState {
}
declare class NpcCollectionDisplay extends React.Component<INpcCollectionDisplayProps, INpcCollectionDisplayState> {
    render(): JSX.Element;
    Delete: (id: string) => void;
    Transfer: (id: string) => void;
    Update: (id: string, updateSteps: (npc: INPC) => void) => void;
}
interface INpcRowProps {
    NPC: NPC;
    RelativeNumericAge: number;
    TransferLabel: string;
    Delete: {
        (id: string): void;
    };
    Transfer: {
        (id: string): void;
    };
    Update: {
        (id: string, updateSteps: {
            (npc: INPC): void;
        }): void;
    };
}
interface INpcRowState {
}
declare class NpcRow extends React.Component<INpcRowProps, INpcRowState> {
    render(): JSX.Element;
    CopyMapDescription: () => void;
}
declare function compareRaceJsonObjects(a: IRace, b: IRace): 1 | 0 | -1;
