declare type ItemRarities = "any" | "common" | "uncommon" | "rare" | "very rare" | "legendary" | "artifact";
declare const itemData: {
    rarity: string;
    name: (type: string) => any;
}[];
declare class ShopItem {
    count: number;
    rarity: ItemRarities;
    type: string;
    name: string;
    price: number;
    itemIndex: number;
    constructor(name: string | undefined, rarity: ItemRarities, type: string, price?: number, count?: number);
}
declare function generateItems(rarity: string, type: string, count: number, number: number): ShopItem[];
