import { Entity } from "./entity/entity.js";
export class StageEntityManager {
    constructor(main, parent) {
        this.members = [];
        this.mainProcess = main;
        this.parent = parent;
    }
    GetByModelID(id) {
        var result;
        this.members.forEach(ent => {
            if (ent.Model.uuid == id) {
                return result = ent;
            }
        });
        return result;
    }
    GetByEntityID(id) {
        var result;
        this.members.forEach(ent => {
            if (ent.ID == id) {
                return result = ent;
            }
        });
        return result;
    }
    Add(newMember, collidable = false) {
        this.members.push(newMember);
        this.mainProcess.Entities.Add(newMember, collidable);
        this.parent.EntityModels.add(newMember.Model);
        if (newMember.Motion.physicsBody) {
            this.mainProcess.world.addBody(newMember.Motion.physicsBody);
        }
    }
    AddMesh(newMember, collidable = false) {
        this.Add(new Entity(newMember), collidable);
    }
}
//# sourceMappingURL=stageentitymanager.js.map