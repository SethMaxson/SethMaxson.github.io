/// <reference types="jquery" />
declare class PreviewModal {
    element: JQuery<HTMLElement>;
    constructor(header?: string, content?: string);
    set header(val: string);
    set content(val: string);
}
