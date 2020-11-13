import { Settings } from "./utility.js";
import { LevelMap } from './map.js';
import { InputManager } from './input-manager.js';
import { ImageManager } from './image-manager.js';

export var MainProcess: Engine;
export var Controller: InputManager;
export var SpriteManager: ImageManager;

export interface MainContexts
{
	background: CanvasRenderingContext2D;
	foreground: CanvasRenderingContext2D;
	ui: CanvasRenderingContext2D;
}

export class Engine{
	updateUI: boolean;
	contexts: MainContexts;
	LoopInterval: number;
	FramesPerSecond: number;
	safeZone: number;
	//@ts-ignore
	map: LevelMap;
	constructor(mapName: string = "eventhorizon", fullScreenOnly: boolean = false) {
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
			background: ($('#background')[0] as HTMLCanvasElement).getContext('2d', {alpha: false}) as CanvasRenderingContext2D,
			foreground: ($('#foreground')[0] as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D,
			ui: ($('#ui')[0] as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
		};
		// scale canvas
		this.resize(true);

		$(window).resize(function(){
			target.resize(false);
		});
	}
	resize(clearDraw: boolean = false)
	{
		Settings.Width = $("#background").parent()[0].clientWidth as number;
		Settings.Height = $("#background").parent()[0].clientHeight as number;
		let canvi = ["#background", "#foreground", "#ui"];
		canvi.forEach(e =>
		{
			let cancan = ($(e)[0] as HTMLCanvasElement);
			cancan.width = Math.floor(Settings.Width);
			cancan.height = Math.floor(Settings.Height);
			let ctx = cancan.getContext('2d');
			if (ctx !== null)
			{
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
	loadMap(fileName: string = "test")
	{
		this.map = new LevelMap(fileName);
		this.map.load(fileName);
	}
}