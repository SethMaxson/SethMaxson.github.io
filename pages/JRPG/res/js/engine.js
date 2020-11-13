import { Settings } from "./utility.js";
import { LevelMap } from './map.js';
import { InputManager } from './input-manager.js';
import { ImageManager } from './image-manager.js';
export var MainProcess;
export var Controller;
export var SpriteManager;
export class Engine {
    constructor(mapName = "eventhorizon", fullScreenOnly = false) {
        // initialize global objects
        Controller = new InputManager(fullScreenOnly);
        SpriteManager = new ImageManager();
        this.updateUI = false;
        this.LoopInterval = 20;
        this.FramesPerSecond = 60;
        this.safeZone = 3;
        // this.map = new LevelMap("test");
        // this.map = new LevelMap("eventhorizon");
        this.loadMap(mapName);
        // this.map.addChara(this.player);
        let target = this;
        // initialize canvas drawing contexts
        this.contexts = {
            background: $('#background')[0].getContext('2d', { alpha: false }),
            foreground: $('#foreground')[0].getContext('2d'),
            ui: $('#ui')[0].getContext('2d')
        };
        // scale canvas
        this.resize(true);
        $(window).resize(function () {
            target.resize(false);
        });
    }
    resize(clearDraw = false) {
        Settings.Width = $("#background").parent()[0].clientWidth;
        Settings.Height = $("#background").parent()[0].clientHeight;
        let canvi = ["#background", "#foreground", "#ui"];
        canvi.forEach(e => {
            let cancan = $(e)[0];
            cancan.width = Math.floor(Settings.Width);
            cancan.height = Math.floor(Settings.Height);
            let ctx = cancan.getContext('2d');
            if (ctx !== null) {
                //@ts-ignore Used for compatibility with older browser versions
                ctx.webkitImageSmoothingEnabled = false;
                //@ts-ignore Used for compatibility with older browser versions
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                if (e !== "#ui") {
                    ctx.scale(Settings.Scale, Settings.Scale);
                }
                ctx.font = "16px Arial";
                ctx.fillStyle = "white";
                if (clearDraw) {
                    ctx.clearRect(0, 0, Settings.Width, Settings.Height);
                }
            }
        });
    }
    loadMap(fileName = "test") {
        this.map = new LevelMap(fileName);
        this.map.load(fileName);
    }
}
//# sourceMappingURL=engine.js.map