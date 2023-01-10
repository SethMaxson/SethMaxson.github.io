/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare class PreviewModal {
    element: JQuery<HTMLElement>;
    constructor(header?: string, content?: string);
    set header(val: string);
    set content(val: string);
}
