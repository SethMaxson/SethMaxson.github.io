import * as THREE from '../../../node_modules/three/src/Three.js';

export class ResourceTracker
{
	resources: Set<THREE.Object3D|THREE.Mesh|THREE.Geometry|THREE.Material>;
	constructor()
	{
		this.resources = new Set();
	}
	track(resource: THREE.Object3D | THREE.Object3D[] | THREE.Material | THREE.Material[])
	{
		if (!resource)
		{
			return resource;
		}

		// handle children and when material is an array of materials or
		// uniform is array of textures
		if (Array.isArray(resource))
		{
			resource.forEach((resource:THREE.Object3D|THREE.Material) => this.track(resource));
			return resource;
		}
		//@ts-ignore
		if (resource.dispose || resource instanceof THREE.Object3D)
		{
			this.resources.add(resource);
		}
		if (resource instanceof THREE.Object3D)
		{
			this.track(resource.geometry);
			this.track(resource.material);
			this.track(resource.children);
		} else if (resource instanceof THREE.Material)
		{
			// We have to check if there are any textures on the material
			for (const value of Object.values(resource))
			{
				if (value instanceof THREE.Texture)
				{
					this.track(value);
				}
			}
			// We also have to check if any uniforms reference textures or arrays of textures
			if (resource.uniforms)
			{
				for (const value of Object.values(resource.uniforms))
				{
					if (value)
					{
						const uniformValue = value.value;
						if (uniformValue instanceof THREE.Texture ||
							Array.isArray(uniformValue))
						{
							this.track(uniformValue);
						}
					}
				}
			}
		}
		return resource;
	}
	untrack(resource: any)
	{
		this.resources.delete(resource);
	}
	dispose()
	{
		for (const resource of this.resources)
		{
			if (resource instanceof THREE.Object3D)
			{
				if (resource.parent)
				{
					resource.parent.remove(resource);
				}
			}
			if (resource.dispose)
			{
				resource.dispose();
			}
		}
		this.resources.clear();
	}
}