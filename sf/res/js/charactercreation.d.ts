/// <reference types="jquery" />
declare var ccm: CharacterCreationManager, ccdm: CharacterCreationDataManager;
declare class CharacterCreationDataManager {
    classes: CharacterClass[];
    feats?: any;
    races: Race[];
    themes: Theme[];
    constructor();
}
declare class CharacterCreationManager {
    character: Character;
    element: JQuery<HTMLElement>;
    isDirty: boolean;
    detailsPage: DetailsPage;
    racePage: RacePage;
    themePage: ThemePage;
    classPage: ClassPage;
    abilityPage: AbilityPage;
    progressionPage: ProgressionPage;
    constructor(char: Character);
    hideAll(): void;
    show(): void;
    finish(): void;
}
declare function prepareCharacterCreationModal(char: Character): void;
declare function updateRace(name: string, subraceName?: string): void;
declare function getRaceOptionEntry(item: Race): JQuery<HTMLElement>;
declare function levelUpModalComplete(): void;
declare function closeModal(modal: JQuery<HTMLElement>): void;
declare function previousModal(): void;
declare function nextModal(): void;
declare function destroyModal(modal: string | JQuery<HTMLElement>): void;
declare function selectCharacterOption(sender: JQuery<HTMLElement>): void;
/********* Stat Generator*********/
declare function changeBase(e: Event): string | undefined;
declare function getCost(e: number): number;
declare function changeTotal(): void;
/************ Menu ************/
declare function showMenu(): void;
declare function showLoadPlayerSelectMenu(): void;
declare function showLoadCharacterSelectMenu(player: string): void;
declare function cancelLoadPlayerSelectMenu(): void;
declare function cancelLoadCharacterSelectMenu(): void;
declare function loadCharacter(name: string): void;
declare class ModalPopup {
    element: JQuery<HTMLElement>;
    id: string;
    constructor(id: string, back: string, header: string, next: string);
    set header(val: string);
    set content(val: string);
    set back(val: string);
    set next(val: string);
    set backLabel(val: string);
    set nextLabel(val: string);
}
declare function enableScroll(): void;
declare function disableScroll(): void;
/************ Modal Pages ************/
declare class CreationPage {
    parent: any;
    id: string;
    element: JQuery<HTMLElement>;
    constructor(parent: any, id: string, back: string, header: string, next: string);
    set header(val: string);
    set content(val: string);
    set back(val: string);
    set next(val: string);
    set backLabel(val: string);
    set nextLabel(val: string);
    show(): void;
    $(toFind: string): JQuery<HTMLElement>;
}
declare class DetailsPage extends CreationPage {
    constructor(parent: CharacterCreationManager);
    update(): void;
    show(): void;
    finish(): void;
}
declare class RacePage extends CreationPage {
    constructor(parent: CharacterCreationManager);
    update(isChoose: boolean, name?: string, subraceName?: string): void;
    show(isChoose?: boolean): void;
}
declare class ThemePage extends CreationPage {
    themes: Theme[];
    constructor(parent: CharacterCreationManager);
    update(isChoose: boolean, name?: string): void;
    show(isChoose?: boolean): void;
    choose(name: string): void;
}
declare class ClassPage extends CreationPage {
    constructor(parent: CharacterCreationManager);
    update(isChoose: boolean, name?: string): void;
    show(isChoose?: boolean): void;
    select(name: string): void;
}
declare class AbilityPage extends CreationPage {
    level: number;
    constructor(parent: CharacterCreationManager, lvl?: number);
    update(): void;
    show(): void;
    finish(): void;
}
declare class ProgressionPage extends CreationPage {
    level: number;
    parent: CharacterCreationManager;
    constructor(parent: CharacterCreationManager);
    update(lvl?: number): void;
    show(): void;
}
declare class CharacterLevelPage extends CreationPage {
    characterLevel: number;
    classLevel: number;
    parent: CharacterCreationManager;
    level: CharacterLevel;
    constructor(parent: CharacterCreationManager, lvl: number);
    update(): void;
}
declare class ClassLevelPage extends CreationPage {
    class: string;
    classObj?: CharacterClass;
    shownFeature: any;
    constructor(parent: CharacterLevelPage);
    update(subclassOnly?: boolean): void;
    checkClassLevelModal(): void;
    displayClassFeature(className: string, lvl: number, name: string): void;
    displaySubclassFeature(className: string, lvl: number, name: string): void;
    updateSelectedClassFeatureOption(sender: JQuery<HTMLElement>): void;
    finish(): void;
}
declare class FeatLevelPage extends CreationPage {
    class: string;
    feats: FeatManager;
    constructor(parent: CharacterLevelPage);
    displayFeat(name: string): void;
    finish(): void;
}
declare class SkillLevelPage extends CreationPage {
    class: string;
    constructor(parent: CharacterLevelPage);
    update(): void;
    skillUp(skill: string): void;
    skillDown(skill: string): void;
    finish(): void;
    showDescription(name: string): void;
}
declare class AbilityLevelPage extends CreationPage {
    character: Character;
    parent: CharacterLevelPage;
    constructor(parent: CharacterLevelPage);
    getUpgradedScore(score: number): number;
    update(): void;
    checkbox(skill: string): void;
    finish(): void;
    showDescription(name: string): void;
}
/************ Dictionaries ************/
declare function skillDescription(skill: string): "" | "You can keep your balance while traversing narrow or treacherous surfaces, escape from restraints, and tumble to avoid attacks. You also use Acrobatics to determine the success of difficult maneuvers while flying." | "You can scale vertical surfaces, leap over obstacles, and swim." | "You can use words and actions to create distractions, misdirect your opponents, tell convincing lies, and pass along secret messages." | "You can operate, manipulate, and hack into computer systems. If you don’t have physical access to a computer system’s user interface, you must use a hacking kit to access and manipulate the system. Details of computers themselves begin on page 213. <p>Computers are set up to give one or more authorized users “root access,” allowing them to access any information or function of the computer as a standard action, with no need for a Computers check. Firewalls can block off specific sections of a computer and grant different users root access to those sections.</p> <p>The base DC for many of the tasks of the Computers skill is equal to 13 + (4 × the computer's tier). These DCs may be adjusted by the GM to reflect other circumstances.</p>" | "You are a student of the vast number of known cultures in the galaxy, and you have a deep and rich understanding of the undercurrents of cultures and language in general. Each time you take a rank in Culture, you learn to speak and read a new language. See page 41 for a list of common languages. " | "You can persuade others to be friendly toward you, resolve conflicts and differences, and learn common knowledge and rumors floating around a settlement." | "You are able to change your appearance to blend in and deceive others, whether to infiltrate." | "You can identify, build, repair, or disable technological devices; assess the stability of structures and machinery; and properly arm and disarm explosives. If you don’t have an engineering kit when attempting an Engineering check, you take a –2 penalty to the check." | "You can rattle your foes or bully them to do what you want with verbal threats or displays of prowess." | "You are educated in the scientific study of living things, from the smallest organisms to the largest biological systems." | "You have knowledge of the biology of many species and can treat a number of different types of wounds and ailments. The DCs of most Medicine tasks are based on the type of equipment used (see Chapter 7 for that information)." | "You are educated in the fields of magic, religion, the planes, and spellcasting, and so can identify magic items and spells and make magic items yourself." | "You can use all of your senses (hearing, taste, touch, sight, and smell) to notice danger, pick out fine details, and search for hidden objects or creatures." | "You are educated in the scientific study of non-living systems, from the tiniest atoms to the largest celestial bodies." | "You know how to drive vehicles, pilot starships, and navigate." | "<p>You are skilled in a specific job, specialty, or creative art. You know how to use the tools of your trade, how to perform the profession’s daily tasks, how to supervise helpers, and how to handle common problems.</p><p>Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. While skills like Culture, Life Science, Mysticism, and Physical Science represent highly specialized fields of study, a Profession skill represents an aptitude in a vocation requiring a broader range of less specific knowledge. When you put ranks in a Profession skill, you must choose the ability score keyed to that skill: Charisma, Intelligence, or Wisdom. Common Charisma-based Profession skills include actor, artist, comedian, con artist, courtesan, dancer, musician, orator, poet, politician, video personality, and writer. Common Intelligence-based Profession skills include accountant, archaeologist, architect, corporate professional, electrician, lab technician, lawyer, mathematician, philosopher, professor, psychologist, and vidgamer. Common Wisdom-based Profession skills include bounty hunter, cook, counselor, dockworker, farmer, gambler, general contractor, herbalist, maintenance worker, manager, mercenary, merchant, miner, and smuggler.</p><p>A Profession skill should not overlap with existing skills. For example, if you want to play a scientist, you should put ranks into Life Science or Physical Science rather than create a Profession (scientist) skill. The GM is the final arbiter of what is a good choice for a Profession skill and what ability score a given Profession skill is keyed to.</p><p> Different professions are considered different skills for the purpose of how many ranks you can have each level. For example, a 4th-level character could have 4 ranks in both Profession (dockworker) and Profession (vidgamer).</p>" | "You can detect falsehoods and gain glimpses of the true intentions of creatures with which you interact." | "You can hide small objects, pick pockets, and accomplish other feats of manual dexterity without being noticed. " | "You can stay hidden and move silently to avoid detection, allowing you to sneak past foes or strike from an unseen position." | "You can survive in and make your way safely through almost any kind of wilderness, follow trails and tracks, deal with wild animals, and ride tamed ones. Use the following base DCs for many of the listed tasks of the Survival skill. These DCs may be adjusted by the GM to reflect other circumstances.";
declare function abilityDescription(ability: string): string;
declare function imgError(t: HTMLImageElement): void;
declare function classLevelOptionsCount(data: CharacterClass[], className: string, level: number): number;
declare function autocomplete(inp: HTMLInputElement, arr: string[]): void;
