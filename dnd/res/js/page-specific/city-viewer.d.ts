interface ICityMapNode {
    name: string;
    image: string;
}
interface ImageSize {
    width: number;
    height: number;
}
interface ICityBrochure {
    name: string;
    displayName?: string;
    description: string[];
    attractionsLabel: string;
    attractionsBlurb: string[];
    attractions: string[];
}
declare function getAppropriateImageDimensions(imageSrc: string): void;
declare function scaleImageSize(width: number, height: number): ImageSize;
