/// <reference types="jquery" />
declare var races: string[];
declare var randomNPCs: NPCManager;
declare var loadedNPCs: NPCManager;
declare const container: JQuery<HTMLElement>;
declare function loadNPCs(): void;
declare function renderLoadedNPCs(): void;
declare function renderRandomNPCs(): void;
declare function getNPCRow(npc: NPC, rando: boolean, index: number): JQuery<HTMLElement>;
declare function generateNPCs(race: string | undefined, gender: string | undefined, age: number, number: number): void;
declare function moveToSaved(index: number): void;
declare function moveToRandom(index: number): void;
