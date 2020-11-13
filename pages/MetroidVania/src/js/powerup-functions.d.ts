import Player from './player.js';
export declare module PowerUpFunctions {
    function heal(character: Player, amount?: number): void;
    function increaseMaxHealth(character: Player, amount?: number): void;
    function addConsumableItem(character: Player, itemName: string, amount?: number): void;
}
