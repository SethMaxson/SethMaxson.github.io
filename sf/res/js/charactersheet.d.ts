/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare class CharacterSheetDataManager {
    spell: SpellManager | undefined;
}
declare const csdm: CharacterSheetDataManager;
declare function prepareCharacterSheet(): JQuery.Promise<any, any, any>;
declare function getPage2(): void;
declare function getPage3(): void;
declare function getPage4(): void;
declare function populateCharacterSheet(char: Character): void;
declare function populatePage1(char: Character): void;
declare function populatePage2(char: Character): void;
declare function getClassDisplayString(char: Character): void;
declare function populateSpells(char: Character): void;
declare function createSkillTable(): void;
declare function createSkillRow(skill: string, ability: string, trainedOnly: boolean, armorPenalty: boolean): JQuery<HTMLElement>;
declare function createProfessionSkillRow(skill: string, ability: string, trainedOnly: boolean): JQuery<HTMLElement>;
declare function createWeaponTable(): void;
declare function createEquipmentTable(): void;
declare function createSpellTable(): void;
declare function createAmmoTable(): void;
declare function createAmmoCheckboxes(line: number, index: number): JQuery<HTMLElement>;
declare function modCapacity(): void;
declare function createInventoryLogTable(): void;
declare function createInventoryLogRow(): JQuery<HTMLElement>;
declare function updateAC(): void;
declare function sum(srcfields: string[]): number;
declare function populateName(charname?: string): void;
declare function updateClassSkills(): void;
declare function updateSkillRanks(): void;
declare function updateProficiencies(char: Character): void;
declare function populateAbilities(): void;
declare function ClearInputs(): void;
declare function CalcSavingThrows(): void;
declare function CalcAllSkills(): void;
declare function SumUpSkill(skill: HTMLElement, trainedonly: boolean, applyACP: boolean): void;
declare function CalculateCarry(): void;
declare function CalculateBulk(): void;
declare function SumUp(dstfield: string, srcfields: string[]): void;
declare function displaySpell(spellName: string): void;
