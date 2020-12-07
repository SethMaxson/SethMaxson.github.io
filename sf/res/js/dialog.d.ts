export declare namespace Dialog {
    interface CharacterDialog {
        /** The name of the entity that this object pertains to. */
        name: string;
        /** The actual Dialog content of the conversation. */
        dialog: Dialog[];
    }
    interface Dialog {
        /** The name of the entity that is currently speaking. */
        s?: string;
        /** The message being spoken. */
        m?: string;
        /** The internal label for dialog-tree logic. */
        label?: string;
        /** The label of the next dialog. */
        next?: string;
        /** Dialog choices for the player. */
        answers?: DialogAnswer[];
    }
    interface DialogAnswer {
        /** Dialog the player will speak with this option. */
        m: string;
        /** The label of the next dialog. */
        next: string;
        /** A function to execute if this option is selected. */
        function?: Function;
    }
    function getDialog(name: string, id?: string): Dialog[];
}
