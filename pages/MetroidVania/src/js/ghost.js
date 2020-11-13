import Enemy from "./enemy.js";
import { ghostLeft, ghostRight, enemyDeath } from "./img-loader.js";
class Ghost extends Enemy {
    constructor(startVals) {
        super(startVals);
        this.playerLoc = startVals.playerLoc;
        this.moveSpeed = startVals.moveSpeed || 0;
        //spawn test
        this.itemDrops.push({ item: 'healthPlusOne', chance: 1 });
        // /spawn test
        this.size = {
            w: 45,
            h: 80
        };
        this.spriteOffset = {
            x: -17,
            y: -32,
            w: 74,
            h: 130
        };
        this.color = "red";
        if (startVals.movingLeft === undefined) {
            this.movingLeft = true;
        }
        else {
            this.movingLeft = startVals.movingLeft;
        }
        if (this.movingLeft) {
            this.sprites = ghostLeft;
        }
        else {
            this.sprites = ghostRight;
        }
        this.animate = this.animate.bind(this);
        this.deathAnimation = this.deathAnimation.bind(this);
        this.animationIntervalId = setInterval(this.animate, 185);
        this.deathAnimationId = null;
        this.distToPlayer = this.distToPlayer.bind(this);
        this.attack = false;
        this.distToPlayerIntervalId = setInterval(this.distToPlayer, 500);
    }
    ai() {
        if (this.deathAnimationId === null) {
            if (this.health <= 0) {
                this.health = 0;
                this.spriteIdx = 0;
                this.sprites = enemyDeath;
                clearInterval(this.animationIntervalId);
                this.vel = { x: 0, y: 0 };
                this.deathAnimationId = setInterval(this.deathAnimation, 180);
            }
        }
        if (this.attack && this.health > 0) {
            if (this.playerLoc.x > this.pos.x) {
                this.vel.x = 1;
            }
            else {
                this.vel.x = -1;
            }
            if (this.playerLoc.y > this.pos.y) {
                this.vel.y = 1;
            }
            else {
                this.vel.y = -1;
            }
        }
        else {
            this.vel = { x: 0, y: 0 };
        }
        if (this.health > 0) {
            if (this.vel.x < 0) {
                this.sprites = ghostLeft;
            }
            else {
                this.sprites = ghostRight;
            }
        }
    }
    distToPlayer() {
        let dist = Math.hypot(this.playerLoc.x - this.pos.x, this.playerLoc.y - this.pos.y);
        if (dist < 500)
            this.attack = true;
        else
            this.attack = false;
    }
    applyVelocity() {
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;
    }
    deathAnimation() {
        this.spriteIdx++;
        if (this.sprites) {
            if (this.spriteIdx >= this.sprites.length) {
                clearInterval(this.deathAnimationId);
                clearInterval(this.distToPlayerIntervalId);
                this.dead = true;
            }
        }
    }
    animate() {
        this.spriteIdx++;
        if (this.sprites) {
            if (this.spriteIdx >= this.sprites.length)
                this.spriteIdx = 0;
        }
    }
    bump() { }
    update() { }
}
export default Ghost;
//# sourceMappingURL=ghost.js.map