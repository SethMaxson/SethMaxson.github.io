/** @module */
export module THREEx
{
	/**
	* Update renderer and camera when the window is resized
	*
	* @param {Object} renderer the renderer to update
	* @param {Object} camera the camera to update
	* @param {Function} dimension callback for renderer size
	*/
	export class WindowResize
	{
		constructor(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, dimension: Function = function () { return { width: Math.floor(window.innerWidth), height: Math.floor(window.innerHeight) } })
		{
			var callback = function ()
			{
				// fetch target renderer size
				var rendererSize = dimension();

				// notify the renderer of the size change
				renderer.setSize(rendererSize.width, rendererSize.height)

				// update the camera
				camera.aspect = rendererSize.width / rendererSize.height
				camera.updateProjectionMatrix()
			}
			// bind the resize event
			window.addEventListener('resize', callback, false)
			// return .stop() the function to stop watching window resize
			return {
				trigger: function ()
				{
					callback()
				},
				/**
				* Stop watching window resize
				*/
				destroy: function ()
				{
					window.removeEventListener('resize', callback)
				}
			}
		}
	}
}