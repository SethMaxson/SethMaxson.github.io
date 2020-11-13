export declare namespace Dialog {
    interface CharacterDialog {
        name: string;
        dialog: Dialog[];
    }
    interface Dialog {
        s?: string;
        m?: string;
        label?: string;
        next?: string;
        answers?: DialogAnswer[];
    }
    interface DialogAnswer {
        m: string;
        next: string;
        function?: Function;
    }
    function getDialog(name: string): Dialog[];
}
