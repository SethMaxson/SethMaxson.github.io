export class ImageManager
{
	imageDatabase: HTMLImageElement[];
	constructor()
	{
		this.imageDatabase = [];
	}
	getImage(path: string): HTMLImageElement
	{
		let img = this.findImage(path);
		if (!img) {
			img = new Image();
			img.src = path;
			this.imageDatabase.push(img);
		}
		return img;
	}
	findImage(path: string): undefined|HTMLImageElement
	{
		this.imageDatabase.forEach(img => {
			if (img.src == path) {
				return img;
			}
		});
		return undefined;
	}
}