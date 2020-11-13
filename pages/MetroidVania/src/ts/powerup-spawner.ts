import PowerUp from './base-types/powerup.js';
import { itemImgs } from './img-loader.js';
import Player from './player.js';
import { PowerUpFunctions } from './powerup-functions.js';

const powerupSFX = {
	key: new Audio("src/sfx/key.wav"),
	heart: new Audio("src/sfx/heart.wav"),
	heartContainer1: new Audio("src/sfx/heart container 1.wav"),
	heartContainer2: new Audio("src/sfx/heart container 2.wav"),
	heartContainer3: new Audio("src/sfx/heart container 3.wav")
};

export module PowerUpSpawner
{
	export function healthPlusOne(x: number, y: number): PowerUp {
		let powerup = new PowerUp({
			pos: { x: x, y: y },
			sprites: itemImgs.healthPlusOne
		});
		powerup.use = function (player: Player)
		{
			powerupSFX.heart.play();
			PowerUpFunctions.heal(player, 1);
		};
		return powerup;
	}
	export function MaxHealthUpgrade(x: number, y: number): PowerUp {
		let powerup = new PowerUp({
			pos: { x: x, y: y },
			sprites: itemImgs.healthUpgrade
		});
		powerup.use = function (player: Player)
		{
			// powerupSFX.heartContainer1.play();
			// powerupSFX.heartContainer2.play();
			// powerupSFX.heartContainer3.play();
			powerupSFX.heart.play();
			PowerUpFunctions.increaseMaxHealth(player, 1);
		};
		return powerup;
	}
	export function smallKey(x: number, y: number): PowerUp {
		let powerup = new PowerUp({
			pos: { x: x, y: y },
			sprites: itemImgs.key
		})
		powerup.use = function (player: Player)
		{
			powerupSFX.key.play();
			player.inventory.keys += 1;
		};
		return powerup;
	}
}