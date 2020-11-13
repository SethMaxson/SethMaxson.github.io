import { Enums, Settings, Vector2 } from "./utility.js";
import { LevelMap } from './map.js';
import { Player } from './player.js';
import { Engine } from './engine.js';
import { MapEditorTool } from './map-editor-tools/map-editor-tool.js';
import { Eraser } from './map-editor-tools/eraser.js';
import { Toolbox } from './map-editor-tools/toolbox.js';
import { createMapXML } from './map-writer.js';

export var MainProcess: MapEditor;

var redrawMap = true;
var mouseDown = false;

export class MapEditor extends Engine {
	map: LevelMap;
	player: Player;
	toolbox: Toolbox;
	tool: MapEditorTool | undefined;
	constructor(mapName: string = "worldmap")
	{
		super(undefined, false);
		// initialize global objects
		this.player = new Player("player", 9, 8, Enums.Directions.Down);
		this.toolbox = new Toolbox();
		this.map = this.loadMap(mapName);
		Settings.Scale = 2;
		this.resize(true);

		window.requestAnimationFrame(mainLoop);
		this.toolbox.addEventListeners();
	}
	resize(clearDraw: boolean = false)
	{
		$("#map-reference").width((this.map.size.x * Settings.GS * Settings.Scale));
		$("#map-reference").height((this.map.size.y * Settings.GS * Settings.Scale));
		super.resize(clearDraw);
		redrawMap = true;
	}
	loadMap(fileName: string = "test")
	{
		let printCollisions = this.map? this.map.printCollisions : false;
		super.loadMap(fileName);
		// this.map.charas = [];
		for (let i = 0; i < this.map.charas.length; i++) {
			this.map.charas[i].hidden = true;
		}
		this.map.addChara(this.player);
		this.map.printCollisions = printCollisions;
		redrawMap = true;
		this.toolbox?.loadMap(this.map);

		$("#new-map-name").val(this.map.name);
		$("#input-size-x").val(this.map.size.x);
		$("#input-size-y").val(this.map.size.y);

		// this only returns a value so that TypeScript can see MapEditor.map being initialized in the constructor
		return this.map;
	}
}

$(document).ready(function(){
	MainProcess = new MapEditor();
	//#region override default zoom
	$("#map-scroller").on('wheel', function (event)
	{
		if (event.ctrlKey == true || event.altKey == true)
		{
			event.preventDefault();
			let e = event as unknown as WheelEvent;
			let zoom = MainProcess.toolbox.zoom;
			let deltaY = e.deltaY !== undefined? e.deltaY : (event.originalEvent? (event.originalEvent as WheelEvent).deltaY : 0);

			zoom.value = Settings.Scale;
			if (deltaY < 0)
			{
				zoom.value = Math.min(zoom.value + zoom.step, zoom.max);
			}
			else if (deltaY > 0)
			{
				zoom.value = Math.max(zoom.value - zoom.step, zoom.min);
			}

			Settings.Scale = zoom.value;
			MainProcess.resize(true);
		}
	});
	//#endregion
	$("#map-select").change(function ()
	{
		MainProcess.loadMap($(this).val() as string);
	});
	$("#collision-toggle").click(function ()
	{
		redrawMap = true;
		MainProcess.map.printCollisions = !MainProcess.map.printCollisions;
		console.log(MainProcess.map.printCollisions);
	});
	$(".toolbox button").click(function (e)
	{
		$(".toolbox button").removeClass("selected");
		$(e.target).closest("button").addClass("selected");
		$(".tool-options").html("");
	});
	$("#button-eraser").click(function ()
	{
		MainProcess.tool = MainProcess.toolbox.eraser;
		$(".tool-options").append(MainProcess.tool.settings(MainProcess));
	});
	$("#button-zoom").click(function ()
	{
		MainProcess.tool = MainProcess.toolbox.zoom;
		$(".tool-options").append(MainProcess.tool.settings(MainProcess));
	});
	$("#button-reference").click(function ()
	{
		MainProcess.tool = MainProcess.toolbox.reference;
		$(".tool-options").append(MainProcess.tool.settings(MainProcess));
	});
	$("#save-map").click(function ()
	{
		createMapXML(MainProcess.map);
	});
	$("#button-pencil").click(function ()
	{
		MainProcess.tool = MainProcess.toolbox.pencil;
		$(".tool-options").append(MainProcess.tool.settings(MainProcess));
	});
	$("#button-collision").click(function ()
	{
		MainProcess.tool = MainProcess.toolbox.collisionPencil;
		$(".tool-options").append(MainProcess.tool.settings(MainProcess));
	});
	$("#button-open").change(function (e)
	{
		let filesList = ($(this)[0] as HTMLInputElement).files;
		if (filesList && filesList.length > 0) {
			let fileName = filesList[0].name.split('.xml')[0];
			MainProcess.loadMap(fileName);
		}
	});
	$("#button-create").click(function ()
	{
		let newMapName = $("#new-map-name").val() as string;
		let newMapSize = { x: $("#input-size-x").val() as number, y: $("#input-size-y").val() as number };
		if (newMapName.length > 0)
		{
			let map = new LevelMap(newMapName);
			MainProcess.map = map;
			map.tileset = new Image();
			map.tileset.onload = function ()
			{
				var height = Math.floor(map.tileset.height / Settings.GS);
				var width = Math.floor(map.tileset.width / Settings.GS);
				console.log("Width: " + width);
				console.log("Height: " + height);
				map.tiles = [];
				for (let i = 0; i < height; i++)
				{
					for (let j = 0; j < width; j++) {
						map.tiles.push({ x: j, y: i });
					}
				}
				redrawMap = true;
			};
			map.tileset.src = "images/tilesets/WorldMap_Tileset.png";
			map.size.x = newMapSize.x;
			map.size.y = newMapSize.y;
			map.data = new Array(newMapSize.y);
			map.collision = new Array(newMapSize.y);

			for (var i = 0; i < newMapSize.y; i++) {
				map.data[i] = new Array(newMapSize.x);
				map.collision[i] = new Array(newMapSize.x);
				for (var j = 0; j < newMapSize.x; j++)
				{
					map.data[i][j] = 0;
					map.collision[i][j] = 0;
				}
			}
			MainProcess.resize(true);

		}
	});
	$("#map-scroller").scroll(function (e)
	{
		redrawMap = true;
	});
	$("canvas").mousedown(function (e)
	{
		mouseDown = true;
		redrawMap = true;
		MainProcess.map.printLastClick = true;
		doClick(e);

		if (MainProcess.tool) {
			MainProcess.tool.click(MainProcess.map);
		}
	});
	$("canvas").mousemove(function (e)
	{
		if (mouseDown && MainProcess.tool)
		{
			let original = { x: MainProcess.map.lastClick.x, y: MainProcess.map.lastClick.y };
			doClick(e);

			if (original.x !== MainProcess.map.lastClick.x || original.y !== MainProcess.map.lastClick.y) {
				redrawMap = true;
				MainProcess.tool.click(MainProcess.map);
			}
		}
	});
	$("body").mouseup(function (e)
	{
		mouseDown = false;
	});

});

function doClick(e: JQuery.MouseMoveEvent<HTMLElement, null, HTMLElement, HTMLElement> | JQuery.MouseDownEvent<HTMLElement, null, HTMLElement, HTMLElement>)
{
	let offset = calcOffset();
	offset.x = offset.x * Settings.Scale;
	offset.y = offset.y * Settings.Scale;
	let rect = e.target.getBoundingClientRect();
	MainProcess.map.logClick(e.pageX + offset.x - rect.left, e.pageY + offset.y - rect.top);
};

// calculate player-map offset
function calcOffset(): Vector2 {
	// var offsetx = ((player.px * Settings.Scale) - Settings.Width / 2) / Settings.Scale;
	// var offsety = ((player.py * Settings.Scale) - Settings.Height / 2) / Settings.Scale;
	// var offsetx = player.px - (Settings.Width / (2 * Settings.Scale));
	// var offsety = player.py - (Settings.Height / (2 * Settings.Scale));
	var offsetx = $("#map-scroller").scrollLeft() as number / Settings.Scale;
	var offsety = $("#map-scroller").scrollTop() as number / Settings.Scale;
	return { x: offsetx, y: offsety };
}

function mainLoop() {
	// initialize
	if (redrawMap)
	{
		MainProcess.contexts.foreground.clearRect(0, 0, Settings.Width, Settings.Height);
	}

	// update
	if (redrawMap || MainProcess.map.redraw) {
		redrawMap = false;
		MainProcess.map.redraw = false;
		let offset = calcOffset();
		MainProcess.map.draw(MainProcess.contexts, offset);

		$("#map-scroller canvas").css("left", offset.x * Settings.Scale);
		$("#map-scroller canvas").css("top", offset.y * Settings.Scale);
	}


	// draw
	// console.log("MainProcess.map.name: " + MainProcess.map.name);

	setTimeout( function() {
		requestAnimationFrame(mainLoop);
	}, 1000 / MainProcess.FramesPerSecond );

}

export enum MapEditTools
{
	None = 0,
	Paint = 1,
	Eraser = 2
}

export enum MapEditModes
{
	None = 0,
	EditBackground = 1,
	EditForeground = 2,
	EditCollision = 3
}