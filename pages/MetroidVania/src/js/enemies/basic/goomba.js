import Enemy from "../../base-types/enemy.js";
import { enemyDeath, goombaImgs } from "./../../img-loader.js";
import { globals } from '../../util.js';
export default class Goomba extends Enemy {
    constructor(startVals) {
        super(startVals);
        this.moveSpeed = startVals.moveSpeed || 1;
        this.size = {
            w: globals.tileSize,
            h: globals.tileSize
        };
        this.spriteOffset = {
            x: 0,
            y: 0,
            w: globals.tileSize,
            h: globals.tileSize
        };
        this.color = "white";
        if (startVals.movingLeft === undefined) {
            this.movingLeft = true;
        }
        else {
            this.movingLeft = startVals.movingLeft;
        }
        if (this.movingLeft) {
            this.sprites = goombaImgs;
        }
        else {
            this.sprites = goombaImgs;
        }
        this.animate = this.animate.bind(this);
        this.deathAnimation = this.deathAnimation.bind(this);
        this.animationIntervalId = setInterval(this.animate, 200);
        this.deathAnimationId = null;
    }
    ai() {
        if (this.deathAnimationId === null) {
            if (this.health > 0) {
                if (this.boundaryCollision.left && this.movingLeft) {
                    this.movingLeft = false;
                    this.sprites = goombaImgs;
                }
                else if (this.boundaryCollision.right && !this.movingLeft) {
                    this.movingLeft = true;
                    this.sprites = goombaImgs;
                }
                if (this.movingLeft) {
                    this.vel.x = -this.moveSpeed;
                }
                else {
                    this.vel.x = this.moveSpeed;
                }
            }
            else // health 0 or less
             {
                this.health = 0;
                this.sprites = enemyDeath;
                this.spriteIdx = 0;
                clearInterval(this.animationIntervalId);
                this.vel = {
                    x: 0,
                    y: 0
                };
                this.playAudio("src/sfx/enemy dies.wav");
                this.deathAnimationId = setInterval(this.deathAnimation, 100);
            }
        }
        Object.keys(this.boundaryCollision).forEach(k => {
            //@ts-ignore
            this.boundaryCollision[k] = false;
        });
    }
    deathAnimation() {
        this.spriteIdx++;
        if (this.sprites) {
            if (this.spriteIdx >= this.sprites.length) {
                clearInterval(this.deathAnimationId);
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
}
//# sourceMappingURL=goomba.js.map