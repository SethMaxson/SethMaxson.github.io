/// <reference types="jquery" />
/// <reference types="jqueryui" />
interface ICutout {
    height: number;
    name: string;
    img: string;
}
interface IDiorama {
    title: string;
    background: string;
    cutouts: ICutout[];
}
declare function getCardboardCutout(cutout: ICutout): JQuery<HTMLElement>;
declare function getDiorama(diorama: IDiorama): void;
