import { globals } from "./util.js";
const nullImg = new Image();
class Entity {
    constructor(args) {
        args = args || {};
        if (args.size) {
            this.size = args.size;
        }
        else if (args.spriteOffset) {
            this.size = { w: args.spriteOffset.w, h: args.spriteOffset.h };
        }
        else {
            this.size = { w: 100, h: 100 };
        }
        this.tile = args.tile || false;
        this.pos = args.pos || { x: 0, y: 0 };
        this.vel = args.vel || { x: 0, y: 0 };
        this.color = args.color || "limegreen";
        this.sprites = args.sprites || null;
        this.spriteOffset = args.spriteOffset || { x: 0, y: 0, w: 0, h: 0 };
        this.type = "block";
        this.spriteIdx = 0;
        this.nullImg = nullImg;
        this.render = this.render.bind(this);
    }
    render(ctx) {
        if (this.sprites === null) {
            ctx.fillStyle = this.color;
            //   ctx.fillRect(
            //     Math.floor(this.pos.x),
            //     Math.floor(this.pos.y),
            //     Math.round(this.size.w),
            //     Math.round(this.size.h)
            //   );
            ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        }
        else if (Array.isArray(this.sprites)) {
            /* v for debug v */
            // ctx.fillStyle = this.color;
            // ctx.fillRect(
            //   this.pos.x,
            //   this.pos.y,
            //   this.size.w,
            //   this.size.h
            // );
            /* ^ for debug ^ */
            if (this.sprites[this.spriteIdx]) {
                ctx.drawImage(this.sprites[this.spriteIdx], this.pos.x + this.spriteOffset.x, this.pos.y + this.spriteOffset.y, this.spriteOffset.w, this.spriteOffset.h);
            }
        }
        else {
            ctx.drawImage(this.sprites.image, this.sprites.frameSize.x * (this.sprites.animationOffset.x + this.spriteIdx), this.sprites.frameSize.y * this.sprites.animationOffset.y, this.sprites.frameSize.x, this.sprites.frameSize.y, this.pos.x + this.spriteOffset.x, this.pos.y + this.spriteOffset.y, this.spriteOffset.w, this.spriteOffset.h);
        }
    }
    applyVelocity(deltaT) {
        const timeAdj = 0.01;
        this.pos.y += (this.vel.y * (deltaT * timeAdj));
        this.pos.x += this.vel.x;
        this.vel.y += (globals.gravity * (deltaT * timeAdj));
        if (this.vel.y > globals.maxVelocity)
            this.vel.y = globals.maxVelocity;
    }
    input() { }
    update() { }
}
export default Entity;
//# sourceMappingURL=entity.js.map