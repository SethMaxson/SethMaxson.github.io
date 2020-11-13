import * as THREE from '../../../../node_modules/three/src/Three.js';
import { StageEntityManager } from './stageentitymanager.js';
import { ResourceTracker } from '../resource-tracker.js';
/**
 * Intended to be sort of like a chunk in Minecraft.
 */
export class Stage extends THREE.Object3D {
    constructor(main) {
        super();
        this.Sound = [];
        this.Entities = new StageEntityManager(main, this);
        this.EntityModels = new THREE.Object3D();
        this.Terrain = new THREE.Object3D();
        this.add(this.Terrain);
        this.add(this.EntityModels);
    }
    needsUpdate() {
        let models = this.EntityModels;
        this.Entities.members.forEach(ent => {
            if (models.getObjectByProperty("uuid", ent.ID) == undefined) {
                alert("Undefined!");
            }
            else {
                alert(models.getObjectByProperty("uuid", ent.ID).toString());
            }
            ;
        });
    }
    /**
     * Remove this chunk and its contents from memory
     */
    unload() {
        let main = this.Entities.mainProcess;
        // let newCollidable = main.Collidable.slice();
        let newCollidable = main.Collidable.filter(obj => {
            return obj.uuid !== this.uuid;
        });
        this.children.forEach(child => {
            child.traverse(resource => {
                newCollidable = newCollidable.filter(obj => {
                    return obj.uuid !== resource.uuid;
                });
            });
            let rt = new ResourceTracker();
            rt.track(child);
            rt.dispose();
            // child.traverse(resource =>
            // 	{
            // 		if (resource instanceof THREE.Object3D)
            // 		{
            // 			if (resource.parent)
            // 			{
            // 				resource.parent.remove(resource);
            // 			}
            // 		}
            // 		if (resource.dispose)
            // 		{
            // 			resource.dispose();
            // 		}
            // 		if (resource.geometry)
            // 		{
            // 			resource.geometry.dispose();
            // 		}
            // 	}
            // );
        });
        if (this.parent) {
            this.parent.remove(this);
        }
        main.Collidable = newCollidable;
    }
}
//# sourceMappingURL=stage.js.map