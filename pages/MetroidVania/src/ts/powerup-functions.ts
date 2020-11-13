import Player from './player.js';

export module PowerUpFunctions {
	export function heal(character: Player, amount: number = 1)
	{
		character.health = Math.min(character.maxHealth, character.health + 1);
	}
	export function increaseMaxHealth(character: Player, amount: number = 1)
	{
		character.maxHealth += amount;
		character.health = character.maxHealth;
	}
	export function addConsumableItem(character: Player, itemName: string, amount: number = 1)
	{
		//@ts-ignore
		if (character.inventory[itemName]) {
			//@ts-ignore
			character.inventory[itemName] += amount;
		}
	}
}