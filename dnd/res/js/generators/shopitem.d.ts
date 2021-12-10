declare type ItemRarities = "any" | "common" | "uncommon" | "rare" | "very rare" | "legendary" | "artifact";
declare const itemData: {
    rarity: string;
    name: (type: string) => any;
}[];
interface IShopItem {
    count: number;
    rarity: ItemRarities;
    type: string;
    name: string;
    price: number;
}
declare class ShopItem implements IShopItem {
    count: number;
    rarity: ItemRarities;
    type: string;
    name: string;
    price: number;
    itemIndex: number;
    constructor(name: string | undefined, rarity?: ItemRarities, type?: string, count?: number);
}
declare function generateItems(rarity: string | undefined, type: string | undefined, count: number, number: number): ShopItem[];
