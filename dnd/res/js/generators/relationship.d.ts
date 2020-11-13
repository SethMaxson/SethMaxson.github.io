/// <reference types="jquery" />
declare enum RelationshipTypes {
    "Acquaintance" = 0,
    "Aunt/Uncle" = 1,
    "Cousin" = 2,
    "Parent/Child" = 3,
    "Enemy" = 4,
    "Friend" = 5,
    "Grandparent/Grandchild" = 6,
    "Sibling" = 7,
    "Significant Other" = 8,
    "Spouse" = 9,
    "Stranger" = 10
}
interface IRelationshipNode {
    characters: [string, string];
    relationshipType: keyof typeof RelationshipTypes;
}
declare function getRelationships(): JQuery.jqXHR<any>;
declare class RelationshipManager {
    all: IRelationshipNode[];
    filtered: IRelationshipNode[];
    npcIDs: string[];
    relationshipTypes: (keyof typeof RelationshipTypes)[];
    private _saved_npcIDs;
    private _saved_relationshipTypes;
    constructor(items?: IRelationshipNode[]);
    load(): void;
    filter(npcIDs?: string[], relationshipTypes?: (keyof typeof RelationshipTypes)[]): IRelationshipNode[];
    saveState(): void;
    restoreState(): void;
    get(characterID1: string, characterID2: string, createIfNotFound?: boolean): IRelationshipNode | undefined;
    resetFilters(): void;
    sort(property: keyof IRelationshipNode, desc?: boolean): void;
    get json(): string;
    save(): void;
    add(relationShip: IRelationshipNode): void;
}
declare class RelationshipLogic {
    static checkIfNPCIsSingle(relationshipManager: RelationshipManager, npc: NPC): boolean;
    static getAllowedRelationshipTypes(relationshipManager: RelationshipManager, character1: NPC, character2: NPC): string[];
    static generateRelationship(relationshipManager: RelationshipManager, character1: NPC, character2: NPC): RelationshipTypes;
}
