interface ImageSize {
    width: number;
    height: number;
}
declare function getAppropriateImageDimensions(imageSrc: string): void;
declare function scaleImageSize(width: number, height: number): ImageSize;
