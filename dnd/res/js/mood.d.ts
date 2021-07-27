/// <reference types="jquery" />
/// <reference types="jqueryui" />
interface ICutout {
    height: number;
    name: string;
    img: string;
}
declare function getCardboardCutout(cutout: ICutout): JQuery<HTMLElement>;
declare function getDiorama(diorama: IDioramaProps): void;
