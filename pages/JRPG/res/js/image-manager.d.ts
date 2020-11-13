export declare class ImageManager {
    imageDatabase: HTMLImageElement[];
    constructor();
    getImage(path: string): HTMLImageElement;
    findImage(path: string): undefined | HTMLImageElement;
}
