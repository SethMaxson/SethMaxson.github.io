export class ImageManager {
    constructor() {
        this.imageDatabase = [];
    }
    getImage(path) {
        let img = this.findImage(path);
        if (!img) {
            img = new Image();
            img.src = path;
            this.imageDatabase.push(img);
        }
        return img;
    }
    findImage(path) {
        this.imageDatabase.forEach(img => {
            if (img.src == path) {
                return img;
            }
        });
        return undefined;
    }
}
//# sourceMappingURL=image-manager.js.map