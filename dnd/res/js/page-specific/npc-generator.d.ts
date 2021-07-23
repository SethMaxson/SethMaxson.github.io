/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare var races: string[];
declare var randomNPCs: NPCManager;
declare var loadedNPCs: NPCManager;
declare const npcGenerator: NPCDeepGenerator;
declare function deleteNPC(index: number, isRando: boolean): void;
declare function sortNPCs(isRando: boolean, property: string): void;
declare function transferNPCBetweenManagers(moveToRando: boolean, index: number): void;
declare function removeNPCFromManager(manager: NPCManager, index: number): void;
declare function loadNPCs(): void;
declare function renderLoadedNPCs(): void;
declare function renderRandomNPCs(): void;
declare function getNPCRow(npc: NPC, rando: boolean, index: number): JQuery<HTMLElement>;
declare function generateNPCs(race: string | string[] | undefined, gender: string | undefined, age: AgeCategory | AgeCategory[] | undefined, alignment: string[] | undefined, number: number): void;
declare function getFilterValue(jquerySelector: string): string | number | string[] | undefined;
