import Entity from "./entity.js";
export default class Creature extends Entity {
    constructor(startVals) {
        super(startVals);
        this.isEnemy = false;
        this.audio = new Audio();
        this.bumped = false;
        this.collisionDamage = 1;
        this.dead = false;
        this.defense = 0;
        this.health = 1;
        this.iFrames = false;
        this.itemDrops = [];
        this.name = "Name";
        this.recoverTime = 500;
        this.type = "creature";
    }
    update() { }
    takeDamage(damageAmount) {
        if (this.iFrames)
            return;
        this.iFrames = true;
        // this.health -= damageAmount;
        this.health -= Math.max(damageAmount - this.defense, 1);
        this.bumped = false;
        setTimeout(() => this.iFrames = false, this.recoverTime);
    }
    calculateBounds() { }
    calcBoundsCollision(otherBox) { }
    /**
     * Play a sound effect
     * @param file the path to the audio file
     */
    playAudio(file) {
        if (file.length > 0) {
            let sourcesMatch = this.audio.src.indexOf(file) != -1;
            if (!sourcesMatch || this.audio.paused) {
                if (!sourcesMatch) {
                    this.audio.src = file;
                    this.audio.load();
                }
                this.audio.play();
            }
        }
    }
    /**
     * corrects entity's position if they sink into the floor
     * @param amount the number of vertical pixels to adjust
     */
    bump(amount) {
        this.pos.y -= amount;
        this.bumped = true;
    }
}
//# sourceMappingURL=creature.js.map