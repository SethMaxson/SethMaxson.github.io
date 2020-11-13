import { Entity, Stage, Main } from "./engine.js";
import { Characters } from '../../../../sf/res/js/characters.js';
export declare class StageEntityManager {
    members: Entity[];
    parent: Stage;
    mainProcess: Main;
    constructor(main: Main, parent: Stage);
    GetByModelID(id: string): Entity | undefined;
    GetByEntityID(id: string): Entity | undefined;
    Add(newMember: Entity, collidable?: boolean): void;
    AddMesh(newMember: Characters.Person3D, collidable?: boolean): void;
}
//# sourceMappingURL=stageentitymanager.d.ts.map