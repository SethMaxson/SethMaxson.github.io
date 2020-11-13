export default class DialogPrinter {
    constructor(speed = 1) {
        this.currentDialogComplete = false;
        this.fontSize = 18;
        this.index = 0;
        this.isOpen = false;
        this.isClosing = false;
        this.isOpening = false;
        this.opacity = 0;
        this.position = { x: 0, y: 0 };
        this.script = [];
        this.size = { width: 500, height: 150 };
        this.closeAnimation = this.closeAnimation.bind(this);
        this.openAnimation = this.openAnimation.bind(this);
        this.closeAnimationId = null;
        this.openAnimationId = null;
    }
    render(ctx) {
        if (this.isOpen) {
            // Save a copy of the current render settings to restore later
            ctx.save();
            // This applies the current state of the box for fading in or out
            ctx.globalAlpha = this.opacity;
            // Render the dialog box
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
            // Render the dialog box outline
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
            // Render the text
            if (this.script[this.index]) {
                ctx.fillStyle = 'white';
                ctx.font = `bold ${this.fontSize}px monospace`;
                ctx.fillText(this.script[this.index], this.position.x + 10, this.position.y + this.fontSize);
            }
            // Restore previous render settings
            ctx.restore();
        }
    }
    open() {
        if (!this.isOpening) {
            this.isOpening = true;
            this.isOpen = true;
            this.opacity = 0;
            this.openAnimationId = setInterval(this.openAnimation, 20);
        }
    }
    close() {
        if (!this.isClosing) {
            this.isClosing = true;
            this.closeAnimationId = setInterval(this.closeAnimation, 20);
            this.index = 0;
            this.script = [];
        }
    }
    openAnimation() {
        this.opacity += 0.1;
        if (this.opacity >= 1) {
            this.opacity = 1;
            this.isOpening = false;
            if (this.openAnimationId) {
                clearInterval(this.openAnimationId);
            }
        }
    }
    closeAnimation() {
        this.opacity -= 0.1;
        if (this.opacity <= 0) {
            this.opacity = 0;
            this.isOpen = false;
            this.isClosing = false;
            if (this.closeAnimationId) {
                clearInterval(this.closeAnimationId);
            }
        }
    }
}
//# sourceMappingURL=dialog-printer.js.map