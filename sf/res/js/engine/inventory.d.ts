export declare class Inventory {
    private _size;
    Slots: InventorySlot[];
    constructor();
}
export declare class InventorySlot {
    itemID?: number | string;
    amount: number;
}
export interface Item {
    name: string;
    id: number | string;
    stackSize: number;
    thumbnail: string;
    weight: number;
}
