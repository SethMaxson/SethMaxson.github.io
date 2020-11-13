export class Hair {
    constructor(style, color = 0x2f2f2f, texture) {
        this.color = typeof color == "number" ? "#" + color.toString(16) : color;
        this.style = style;
        this.texture = texture;
    }
}
//# sourceMappingURL=Hair.js.map