import { Main } from "./engine.js";
import { Entity } from "./entity/entity.js";
import { Stage } from './stage.js';
import { Characters } from './../characters.js';

export class StageEntityManager
	{
		members: Entity[] = [];
		parent: Stage;
		mainProcess: Main;
		constructor(main: Main, parent: Stage)
		{
			this.mainProcess = main;
			this.parent = parent;
		}
		GetByModelID(id: string): Entity | undefined
		{
			var result;
			this.members.forEach(ent =>
			{
				if (ent.Model.uuid == id)
				{
					return result = ent;
				}
			});
			return result;
		}
		GetByEntityID(id: string): Entity | undefined
		{
			var result;
			this.members.forEach(ent =>
			{
				if (ent.ID == id)
				{
					return result = ent;
				}
			});
			return result;
		}
		Add(newMember: Entity, collidable: boolean = false)
		{
			this.members.push(newMember);
			this.mainProcess.Entities.Add(newMember, collidable);
			this.parent.EntityModels.add(newMember.Model);
			if (newMember.Motion.physicsBody) {
				this.mainProcess.world.addBody(newMember.Motion.physicsBody);
			}
		}
		AddMesh(newMember: Characters.Person3D, collidable: boolean = false)
		{
			this.Add(new Entity(newMember), collidable);
		}
	}