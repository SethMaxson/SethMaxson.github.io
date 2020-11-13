import { globals } from "./util.js";
import { bgImgs, bgParallaxImgs } from "./img-loader.js";
class Camera {
    constructor(player, gameObjects, canvasCtx, levelSize) {
        this.thePlayer = player;
        this.gameObjects = gameObjects;
        this.canvasCtx = canvasCtx;
        this.camBounds = {
            left: 0.4,
            right: 0.55,
            top: 0.4,
            bottom: 0.9
        };
        this.displayDebugInfo = true;
        this.faded = false;
        this.fadingIn = false;
        this.fadingOut = false;
        this.fadeLevel = 0;
        this.levelSize = levelSize;
        this.recalculate();
        this.offsetX = -player.pos.x + (globals.screenWidth * 0.5);
        this.offsetY = -player.pos.y + (globals.screenHeight * 0.5);
        this.oldPosY = this.thePlayer.pos.y;
        this.victoryScreen = false;
        //@ts-ignore legacy stuff for older browsers
        this.canvasCtx.webkitImageSmoothingEnabled = false;
        //@ts-ignore legacy stuff for older browsers
        this.canvasCtx.mozImageSmoothingEnabled = false;
        this.canvasCtx.imageSmoothingEnabled = false;
    }
    loadLevel(player, gameObjects, canvasCtx, levelSize) {
        this.thePlayer = player;
        this.gameObjects = gameObjects;
        this.canvasCtx = canvasCtx;
        this.camBounds = {
            left: 0.4,
            right: 0.55,
            top: 0.4,
            bottom: 0.9
        };
        this.levelSize = levelSize;
        this.recalculate();
        this.offsetX = -player.pos.x + (globals.screenWidth * 0.5);
        this.offsetY = -player.pos.y + (globals.screenHeight * 0.5);
        this.oldPosY = this.thePlayer.pos.y;
        this.victoryScreen = false;
        //@ts-ignore legacy stuff for older browsers
        this.canvasCtx.webkitImageSmoothingEnabled = false;
        //@ts-ignore legacy stuff for older browsers
        this.canvasCtx.mozImageSmoothingEnabled = false;
        this.canvasCtx.imageSmoothingEnabled = false;
    }
    recalculate() {
        this.camLimits = {
            left: 0,
            right: -(this.levelSize.width * globals.tileSize) + (globals.screenWidth),
            top: 0,
            bottom: (this.levelSize.height * globals.tileSize) - globals.screenHeight
        };
    }
    update() {
        if (this.thePlayer.pos.x < (globals.screenWidth * this.camBounds.left - this.offsetX)) {
            this.offsetX = -this.thePlayer.pos.x + (globals.screenWidth * this.camBounds.left);
            // this.offsetX -= this.thePlayer.vel.x;
        }
        if (this.thePlayer.pos.x > (globals.screenWidth * this.camBounds.right - this.offsetX)) {
            // this.offsetX -= this.thePlayer.vel.x;
            this.offsetX = -this.thePlayer.pos.x + (globals.screenWidth * this.camBounds.right);
        }
        if ((this.thePlayer.pos.y < (globals.screenHeight * this.camBounds.top - this.offsetY))) {
            // this.offsetY -= this.thePlayer.pos.y - this.oldPosY;
            this.offsetY = -(this.thePlayer.pos.y) + (globals.screenHeight * this.camBounds.top);
        }
        if ((this.thePlayer.pos.y + this.thePlayer.size.h) > (globals.screenHeight * this.camBounds.bottom - this.offsetY)) {
            // this.offsetY -= this.thePlayer.pos.y - this.oldPosY;
            this.offsetY = -(this.thePlayer.pos.y + this.thePlayer.size.h) + (globals.screenHeight * this.camBounds.bottom);
        }
        this.offsetX = Math.min(this.offsetX, this.camLimits.left);
        this.offsetX = Math.max(this.offsetX, this.camLimits.right);
        this.offsetY = Math.min(this.offsetY, this.camLimits.top);
        this.offsetX = Math.round(this.offsetX);
        this.offsetY = Math.round(this.offsetY);
        this.oldPosY = this.thePlayer.pos.y;
        this.canvasCtx.save();
        this.canvasCtx.translate(this.offsetX, this.offsetY);
        this.render();
        this.canvasCtx.restore();
    }
    render() {
        if (this.fadingOut) {
            if (this.fadeLevel < 1) {
                this.canvasCtx.save();
                this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                this.fadeLevel += 0.05;
                this.canvasCtx.fillRect(0 - this.offsetX, 0 - this.offsetY, globals.screenWidth, globals.screenHeight);
                this.canvasCtx.restore();
            }
            else {
                this.fadingOut = false;
            }
        }
        else {
            // when the game is won
            if (this.victoryScreen) {
                this.canvasCtx.fillStyle = 'black';
                this.canvasCtx.fillRect(0 - this.offsetX, 0 - this.offsetY, globals.screenWidth, globals.screenHeight);
                this.canvasCtx.fillStyle = 'rgb(230, 200, 0)';
                this.canvasCtx.font = 'bold 40px monospace';
                this.canvasCtx.fillText("You've won!", (globals.screenWidth * 0.38) - this.offsetX, (globals.screenHeight / 2) - this.offsetY);
                return;
            }
            //clearing the screen for a new render
            this.canvasCtx.clearRect(-this.offsetX, -this.offsetY, globals.screenWidth, globals.screenHeight);
            //@ts-ignore legacy stuff for older browsers
            this.canvasCtx.webkitImageSmoothingEnabled = false;
            //@ts-ignore legacy stuff for older browsers
            this.canvasCtx.mozImageSmoothingEnabled = false;
            this.canvasCtx.imageSmoothingEnabled = false;
            //drawing the background
            const adjWidth = globals.screenWidth;
            const adjHeight = globals.screenHeight;
            const bgPos = {
                x: globals.screenWidth * 0.5 - adjWidth * 0.5,
                y: globals.screenHeight * 0.5 - adjHeight * 0.5
            };
            // this.canvasCtx.drawImage(
            //   bgImgs[0],
            //   -this.offsetX + bgPos.x, -this.offsetY + bgPos.y,
            //   adjWidth, bgImgs[0].height
            // );
            this.canvasCtx.drawImage(bgImgs[0], -this.offsetX + bgPos.x, -this.offsetY + bgPos.y, adjWidth, adjHeight);
            // draw moon
            const adjSize = {
                width: bgParallaxImgs[0].width * 0.6,
                height: bgParallaxImgs[0].height * 0.6
            };
            this.canvasCtx.drawImage(bgParallaxImgs[0], -this.offsetX * 0.98 + 400, -this.offsetY + 50, adjSize.width, adjSize.height);
            // draw clouds
            for (let i = 0; i <= 3; i++) {
                this.canvasCtx.drawImage(bgParallaxImgs[1], -this.offsetX * 0.92 + 800 + (globals.screenWidth * i), -this.offsetY + 60);
                this.canvasCtx.drawImage(bgParallaxImgs[2], -this.offsetX * 0.92 - 200 + (globals.screenWidth * i), -this.offsetY + 20);
                this.canvasCtx.drawImage(bgParallaxImgs[3], -this.offsetX * 0.92 + 500 + (globals.screenWidth * i), -this.offsetY + 165);
            }
            //loop through all objects and call their respective render functions
            let layerNames = Object.keys(this.gameObjects);
            layerNames.forEach(name => {
                //@ts-ignore
                const renderObjs = this.gameObjects[name];
                for (let i = 0; i < renderObjs.length; i++) {
                    if (renderObjs[i] !== null && renderObjs[i]) {
                        renderObjs[i].render(this.canvasCtx);
                    }
                }
            });
            layerNames = Object.keys(this.gameObjects.collisions);
            layerNames.forEach(name => {
                //@ts-ignore
                const renderObjs = this.gameObjects.collisions[name];
                for (let i = 0; i < renderObjs.length; i++) {
                    if (renderObjs[i] !== null && renderObjs[i]) {
                        renderObjs[i].render(this.canvasCtx);
                    }
                }
            });
            this.thePlayer.render(this.canvasCtx);
            //render the HUD
            //background
            this.canvasCtx.fillStyle = 'black';
            this.canvasCtx.fillRect(0 - this.offsetX, 0 - this.offsetY, globals.screenWidth, 50);
            //player text
            this.canvasCtx.fillStyle = 'white';
            this.canvasCtx.font = 'bold 28px monospace';
            this.canvasCtx.fillText('HEALTH', 12 - this.offsetX, 35 - this.offsetY);
            //keys display
            this.canvasCtx.fillText('KEYS: ' + this.thePlayer.inventory.keys, globals.screenWidth - this.offsetX - 112, 35 - this.offsetY);
            if (this.displayDebugInfo) {
                // this.canvasCtx.save();
                this.canvasCtx.font = '12px monospace';
                // player position display
                this.canvasCtx.fillText('PLAYER POSITION:', 12 - this.offsetX, globals.screenHeight - this.offsetY - 36);
                this.canvasCtx.fillText('PIXELS: X:' + this.thePlayer.pos.x + ", Y:" + +this.thePlayer.pos.y, 12 - this.offsetX, globals.screenHeight - this.offsetY - 24);
                this.canvasCtx.fillText('CELLS: X:' + Math.floor(this.thePlayer.pos.x / globals.tileSize) + ", Y:" + +Math.floor(this.thePlayer.pos.y / globals.tileSize), 12 - this.offsetX, globals.screenHeight - this.offsetY - 12);
                // camera offset
                this.canvasCtx.fillText('CAMERA OFFSET:', 12 - this.offsetX, globals.screenHeight - this.offsetY - 66);
                this.canvasCtx.fillText('PIXELS: X:' + this.offsetX + ", Y:" + +this.offsetY, 12 - this.offsetX, globals.screenHeight - this.offsetY - 54);
            }
            //health rectangles
            let maxHealth = this.thePlayer.maxHealth;
            let currentHealth = this.thePlayer.health;
            for (let i = 0; i < maxHealth; i++) {
                if (i + 1 <= currentHealth) {
                    this.canvasCtx.fillStyle = 'red';
                    this.canvasCtx.fillRect(125 + (i * 20) - this.offsetX, 13 - this.offsetY, 15, 24);
                    this.canvasCtx.lineWidth = 2;
                    this.canvasCtx.strokeStyle = 'white';
                    this.canvasCtx.strokeRect(125 + (i * 20) - this.offsetX, 13 - this.offsetY, 15, 24);
                }
                else {
                    this.canvasCtx.fillStyle = 'transparent';
                    this.canvasCtx.lineWidth = 1;
                    this.canvasCtx.strokeStyle = 'white';
                    this.canvasCtx.strokeRect(125 + (i * 20) - this.offsetX, 13 - this.offsetY, 15, 24);
                }
            }
            //fade in from level transition
            if (this.fadingIn) {
                if (this.fadeLevel > 0) {
                    this.canvasCtx.save();
                    this.canvasCtx.fillStyle = `rgba(0, 0, 0, ${this.fadeLevel})`;
                    this.fadeLevel -= 0.05;
                    this.canvasCtx.fillRect(0 - this.offsetX, 0 - this.offsetY, globals.screenWidth, globals.screenHeight);
                    this.canvasCtx.restore();
                }
                else {
                    this.faded = false;
                    this.fadingIn = false;
                }
            }
            if (this.gameObjects.dialogPrinter.isOpen) {
                const horizontalMargin = (globals.screenWidth - this.gameObjects.dialogPrinter.size.width) / 2;
                this.gameObjects.dialogPrinter.position.x = -this.offsetX + horizontalMargin;
                this.gameObjects.dialogPrinter.position.y = globals.screenHeight - this.offsetY - this.gameObjects.dialogPrinter.size.height - 10;
                this.gameObjects.dialogPrinter.render(this.canvasCtx);
            }
        }
    }
    fadeIn() {
        this.fadingIn = true;
        // this.fadingOut = false;
    }
    fadeOut() {
        this.faded = true;
        this.fadingOut = true;
    }
}
export default Camera;
//# sourceMappingURL=camera.js.map