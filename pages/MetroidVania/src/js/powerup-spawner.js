import PowerUp from './base-types/powerup.js';
import { itemImgs } from './img-loader.js';
import { PowerUpFunctions } from './powerup-functions.js';
const powerupSFX = {
    key: new Audio("src/sfx/key.wav"),
    heart: new Audio("src/sfx/heart.wav"),
    heartContainer1: new Audio("src/sfx/heart container 1.wav"),
    heartContainer2: new Audio("src/sfx/heart container 2.wav"),
    heartContainer3: new Audio("src/sfx/heart container 3.wav")
};
export var PowerUpSpawner;
(function (PowerUpSpawner) {
    function healthPlusOne(x, y) {
        let powerup = new PowerUp({
            pos: { x: x, y: y },
            sprites: itemImgs.healthPlusOne
        });
        powerup.use = function (player) {
            powerupSFX.heart.play();
            PowerUpFunctions.heal(player, 1);
        };
        return powerup;
    }
    PowerUpSpawner.healthPlusOne = healthPlusOne;
    function MaxHealthUpgrade(x, y) {
        let powerup = new PowerUp({
            pos: { x: x, y: y },
            sprites: itemImgs.healthUpgrade
        });
        powerup.use = function (player) {
            // powerupSFX.heartContainer1.play();
            // powerupSFX.heartContainer2.play();
            // powerupSFX.heartContainer3.play();
            powerupSFX.heart.play();
            PowerUpFunctions.increaseMaxHealth(player, 1);
        };
        return powerup;
    }
    PowerUpSpawner.MaxHealthUpgrade = MaxHealthUpgrade;
    function smallKey(x, y) {
        let powerup = new PowerUp({
            pos: { x: x, y: y },
            sprites: itemImgs.key
        });
        powerup.use = function (player) {
            powerupSFX.key.play();
            player.inventory.keys += 1;
        };
        return powerup;
    }
    PowerUpSpawner.smallKey = smallKey;
})(PowerUpSpawner || (PowerUpSpawner = {}));
//# sourceMappingURL=powerup-spawner.js.map