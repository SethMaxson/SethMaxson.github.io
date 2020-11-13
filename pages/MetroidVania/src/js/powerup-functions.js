export var PowerUpFunctions;
(function (PowerUpFunctions) {
    function heal(character, amount = 1) {
        character.health = Math.min(character.maxHealth, character.health + 1);
    }
    PowerUpFunctions.heal = heal;
    function increaseMaxHealth(character, amount = 1) {
        character.maxHealth += amount;
        character.health = character.maxHealth;
    }
    PowerUpFunctions.increaseMaxHealth = increaseMaxHealth;
    function addConsumableItem(character, itemName, amount = 1) {
        //@ts-ignore
        if (character.inventory[itemName]) {
            //@ts-ignore
            character.inventory[itemName] += amount;
        }
    }
    PowerUpFunctions.addConsumableItem = addConsumableItem;
})(PowerUpFunctions || (PowerUpFunctions = {}));
//# sourceMappingURL=powerup-functions.js.map