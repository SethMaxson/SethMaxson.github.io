export class Inventory {
    constructor() {
        this._size = 16;
        this.Slots = [];
        for (let i = 0; i < this._size; i++) {
            this.Slots.push(new InventorySlot());
        }
    }
}
export class InventorySlot {
    constructor() {
        this.amount = 0;
    }
}
//# sourceMappingURL=inventory.js.map