export class Inventory
{
	private _size: number = 16;
	Slots: InventorySlot[];
	constructor()
	{
		this.Slots = [];
		for (let i = 0; i < this._size; i++)
		{
			this.Slots.push(new InventorySlot());
		}
	}
}

export class InventorySlot
{
	itemID?: number | string;
	amount: number = 0;
}

export interface Item
{
	name: string;
	id: number | string;
	stackSize: number;
	thumbnail: string;
	weight: number;
}