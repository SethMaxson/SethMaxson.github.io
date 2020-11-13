import { Character } from './character.js';
import { div, Settings, Vector2, Enums } from './utility.js';
import { MainContexts } from './engine.js';
import { drawCollision } from './drawing-tools.js';
import { Player } from './player.js';

export class LevelMap {
	size: Vector2 = {x: 0, y: 0};
	defaultStartPosition: Vector2 = {x: -1, y: -1};
	charas: Character[];
	collision: number[][];
	defaultTile: number;
	data: number[][];
	doors: DoorNode[];
	lastClick: Vector2 = {x: 0, y: 0};
	lastClickInPixels: Vector2 = {x: 0, y: 0};
	name: string;
	printCollisions: boolean = false;
	printLastClick: boolean = false;
	redraw: boolean;
	tiles: Vector2[];
	tileset: HTMLImageElement;
	blockers: HitBox[];
	/** strictly for debugging collisions. Delete once done. */
	drawCollisions: HitBox[];
	/** strictly for debugging collisions. Delete once done. */
	entityHitBox: { hitbox: HitBox, color: string }[];
	constructor(name: string) {
		this.name = name;
		this.charas = [];  // characters on this map
		this.collision = [[]];
		this.defaultTile = 0;
		this.data = [[]];
		this.doors = [];
		this.redraw = true;
		this.size.y = -1;
		this.size.x = -1;

		this.tiles = new Array(256);
		this.tileset = new Image();
		this.tileset.src = "images/tilesets/ff1_tileset.png";

		this.tiles[0] = {x: 9, y: 11};
		this.tiles[1] = {x: 5, y: 8};
		this.tiles[2] = {x: 10, y: 12};
		this.tiles[3] = {x: 11, y: 11};
		this.tiles[4] = {x: 10, y: 11};
		this.tiles[5] = {x: 7, y: 8};
		this.tiles[6] = { x: 1, y: 1 };

		this.blockers = [];
		this.drawCollisions = [];
		this.entityHitBox = [];
	}

	load(filename: string) {
		filename = "map/" + filename + ".xml";
		var target = this;
		// load map file
		$.ajax({
            dataType: "xml",
			url: filename,
			async: false,  // synchronous (wait until file is loaded)
            cache: true,
			success: function (xml)
			{
				// Parse the map from the XML file
                $(xml).find("doc").each(function(){
					$(this).find("tileset").each(function(){
						target.tileset = new Image();
						target.tileset.onload = function ()
						{
							target.redraw = true;
						};
						target.tileset.src = $(this).attr("src") as string;

						// grid size
						if ($(this).attr("grid-size")) {
							Settings.GS = parseInt($(this).attr("grid-size") as string);
						}

						// default map tile value
						target.defaultTile = parseInt($(this).attr("default-tile") as string);

						// map data
						target.tiles = [];
						$(this).find("tile").each(function(){
							let newTile = {x: 0, y: 0};
							newTile.x = parseInt($(this).attr("x") as string);
							newTile.y = parseInt($(this).attr("y") as string);
							target.tiles.push(newTile);
						});
                    });
					$(this).find("map").each(function(){
						// the number of row and column
						target.size.y = parseInt($(this).attr("height") as string);
						target.size.x = parseInt($(this).attr("width") as string);
						let dataSize = $(this).attr("data-size") ? parseInt($(this).attr("data-size") as string) : 1;

						// map data
						var lines = $(this).find("tiles").text().trim().split("\n");
						target.data = new Array(target.size.y);
						for (var i = 0; i < target.size.y; i++) {
							target.data[i] = new Array(target.size.x);
							for (var j = 0; j < target.size.x; j++)
							{
								let actualJ = j * dataSize;
								// map data starts from lines[2]
								let line = lines[i];
								target.data[i][j] = parseInt(lines[i].substr(actualJ, dataSize));
							}
						}

						// map collision data
						lines = $(this).find("collision").text().trim().split("\n");
						target.collision = new Array(target.size.y);
						for (var i = 0; i < target.size.y; i++) {
							target.collision[i] = new Array(target.size.x);
							for (var j = 0; j < target.size.x; j++) {
								// map data starts from lines[2]
								target.collision[i][j] = parseInt(lines[i][j]);
								if (parseInt(lines[i][j]) == 1) {
									target.blockers.push(new HitBox(j * Settings.GS, i * Settings.GS, Settings.GS, Settings.GS));
								}
							}
						}

						$(this).find("defaultStartPosition").each(function ()
						{
							target.defaultStartPosition.x = parseInt($(this).attr("x") as string);
							target.defaultStartPosition.y = parseInt($(this).attr("y") as string);
						});
                    });
					$(this).find("event").each(function(){
						// character data
						$(this).find("character").each(function(){
							var chara = new Character($(this).find("name").text(),
							parseInt($(this).find("x").text()),
							parseInt($(this).find("y").text()),
							parseInt($(this).find("direction").text()),
							parseInt($(this).find("moveType").text()),
							$(this).find("message").text(),
							$(this).find("sprite").text()
							);
							target.addChara(chara);
						});
						// door data
						$(this).find("doors").each(function(){
							$(this).find("door").each(function ()
							{
								let door: DoorNode = { targetMap: "", hitBox: new HitBox(), targetX: 0, targetY: 0, targetDirection: 0 };

								door.targetMap = $(this).attr("targetMap") as string;
								door.hitBox.position.x = parseInt($(this).attr("x") as string);
								door.hitBox.position.y = parseInt($(this).attr("y") as string);
								door.hitBox.width = parseInt($(this).attr("width") as string) * Settings.GS;
								door.hitBox.height = parseInt($(this).attr("height") as string) * Settings.GS;
								door.targetX = parseInt($(this).attr("targetX") as string);
								door.targetY = parseInt($(this).attr("targetY") as string);
								door.targetDirection = parseInt($(this).attr("targetDirection") as string);
								target.doors.push(door);
							});
						});
                    });
                });

			},
			error: function(xhr, status, error) {
				if (status == "parsererror") {
					console.log("Error occurred parsing map XML.")
				}
				throw xhr;
			}
		});
	}

	logClick(x: number, y: number)
	{
		this.lastClickInPixels.x = x;
		this.lastClickInPixels.y = y;
		this.lastClick.x = Math.floor(x/(Settings.GS * Settings.Scale));
		this.lastClick.y = Math.floor(y/(Settings.GS * Settings.Scale));
	}

	update() {
		// update characters on this map
		for (var i = 0; i < this.charas.length; i++) {
			this.charas[i].update(this);
		}
	}

	draw(ctx: MainContexts, offset: Vector2, debug: boolean = true) {
		// calculate the range of map
		let startx = div(offset.x, Settings.GS)-1;
		let starty = div(offset.y, Settings.GS)-1;
		// let endx = startx + div(Settings.Width, Settings.GS) + 1;
		// let endy = starty + div(Settings.Height, Settings.GS) + 1;
		let endx = startx + div(Settings.Width, Settings.GS * Settings.Scale) + Math.ceil(1/Settings.Scale) + 1;
		let endy = starty + div(Settings.Height, Settings.GS * Settings.Scale) + Math.ceil(1/Settings.Scale) + 1;
		// if (this.redraw || MainProcess.player.moving) {
		let GS = Settings.GS;
		if (true)
		{
			ctx.background.clearRect(0, 0, Settings.Width, Settings.Height);
			this.redraw = false;
			for (var y = starty; y < endy; y++) {
				for (var x = startx; x < endx; x++) {
					let targetTile: Vector2 = { x: 0, y: 0 };
					let targetCollision: number = 0;
					let drawPosX = x * GS - offset.x;
					let drawPosY = (y * GS) - offset.y;
					if (x < 0 || y < 0 || x > this.size.x - 1 || y > this.size.y - 1)
					{
						// use default tile if outside the bounds of the map
						targetTile = this.tiles[this.defaultTile];
						targetCollision = 1;
					} else {
						targetTile = this.tiles[this.data[y][x]];
						targetCollision = this.collision[y][x];
					}
					ctx.background.drawImage(this.tileset, targetTile.x * GS, targetTile.y * GS, GS, GS, drawPosX, drawPosY, GS, GS);

					if (this.printCollisions)
					{
						drawCollision(ctx.background, targetCollision, drawPosX, drawPosY);
					}
				}
			}
		}

		if (this.printLastClick && this.lastClick.x >= 0 && this.lastClick.y >= 0 && this.lastClick.x < this.size.x && this.lastClick.y < this.size.y) {
			ctx.background.globalAlpha = 0.5;
			ctx.background.fillStyle = "#0000FF"
			ctx.background.fillRect(this.lastClick.x * GS - offset.x, (this.lastClick.y * GS) - offset.y, GS, GS);
			ctx.background.globalAlpha = 1.0;
		}


		// COLLISION TEST
		ctx.background.globalAlpha = 0.5;
		for (let i = 0; i < this.drawCollisions.length; i++) {
			const col = this.drawCollisions[i];

			ctx.background.fillStyle = "#FF00FF"
			ctx.background.fillRect(col.position.x - offset.x, col.position.y - offset.y, col.width, col.height);
		}

		for (let i = 0; i < this.entityHitBox.length; i++) {
			const col = this.entityHitBox[i];
			let box = col.hitbox;

			ctx.background.fillStyle = col.color;
			ctx.background.fillRect(box.position.x - offset.x, box.position.y - offset.y, box.width, box.height);
		}
		ctx.background.globalAlpha = 1.0;
		// /COLLISION TEST

		//#region debug stuff
		if (debug) {
			ctx.ui.clearRect(0, 0, Settings.Width, Settings.Height);

			ctx.ui.globalAlpha = 0.5;
			ctx.ui.fillStyle = "#000000"
			ctx.ui.fillRect(5, 5, 250, 150);
			ctx.ui.globalAlpha = 1.0;

			ctx.ui.fillStyle = "white";
			let debugLineOffset = 16;
			let debugLineIncrement = 16;
			let player = this.charas.filter(char =>
			{
				return char.name == "Player";
			})[0] as Player;
			if (player) {
				ctx.ui.fillText(`Player Position: x: ${player.position.x}, y: ${player.position.y}`, 10, debugLineOffset);
				debugLineOffset += debugLineIncrement;
				ctx.ui.fillText(`Weapon Position: x: ${player.weapon.position.x}, y: ${player.weapon.position.y}`, 10, debugLineOffset);
				debugLineOffset += debugLineIncrement;
			}
			ctx.ui.fillText(`View Offset: x: ${offset.x}, y: ${offset.y}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Start: x: ${startx}, y: ${starty}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`End: x: ${endx}, y: ${endy}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Diff: x: ${endx - startx}, y: ${endy - starty}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Screen: width: ${Settings.Width}, height: ${Settings.Height}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Screen Cells: x: ${Settings.Width / (Settings.GS * Settings.Scale)}, y: ${Settings.Height / (Settings.GS * Settings.Scale)}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Last Click: x: ${this.lastClick.x}, y: ${this.lastClick.y}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Last Click (px): x: ${this.lastClickInPixels.x}, y: ${this.lastClickInPixels.y}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
			ctx.ui.fillText(`Zoom: ${Settings.Scale}`, 10, debugLineOffset);
			debugLineOffset += debugLineIncrement;
		}
		//#endregion

		// draw characters on this map
		this.charas.sort((a, b) => (a.cell.y > b.cell.y) ? 1 : -1)
		for (var i = 0; i < this.charas.length; i++) {
			this.charas[i].draw(ctx.foreground, offset);
		}
	}

	/**
	 * Check if an entity can move to a cell
	 * @param x X coordinate
	 * @param y Y coordinate
	 */
	isMovable(x: number, y: number) {
		if (x < 0 || x > this.size.x-1 || y < 0 || y > this.size.y-1) {
			return false;
		}
		// cannot move if collision object is in target cell
		if (this.collision[y][x] == 1) {
			return false;
		}

		// cannot move to character cell
		for (var i = 0; i < this.charas.length; i++)
		{
			let cell = this.charas[i].cell;
			if (cell.x == x && cell.y == y) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Check if an entity can move to a cell
	 * @param x X coordinate
	 * @param y Y coordinate
	 */
	isMovablePixels(hb: HitBox, x: number, y: number)
	{
		let maxRightPixel = (this.size.x - 1) * Settings.GS;
		let maxBottomPixel = (this.size.y - 1) * Settings.GS;
		if (hb.position.x < 0 || hb.position.x > maxRightPixel || hb.position.y < 0 || hb.position.y > maxBottomPixel) {
			return false;
		}
		// cannot move if collision object is in target cell
		if (this.collision[y][x] == 1) {
			return false;
		}

		// cannot move to character cell
		for (var i = 0; i < this.charas.length; i++)
		{
			let cell = this.charas[i].cell;
			if (cell.x == x && cell.y == y) {
				return false;
			}
		}

		return true;
	}

	addChara(chara: Character) {
		this.charas.push(chara);
	}

	createChara(data: string[]) {
		var name = data[1];
		var x = parseInt(data[2]);
		var y = parseInt(data[3]);
		var direction = parseInt(data[4]);
		var moveType = parseInt(data[5]);
		var message = data[6];
		var sprite = data[7];
		var chara = new Character(name, x, y, direction, moveType, message, sprite);
		this.addChara(chara);
	}
}


export class MapDocNode
{
	tileset: TilesetNode;
	map: MapNode;
	event: EventNode;
	constructor()
	{
		this.tileset = new TilesetNode;
		this.map = new MapNode();
		this.event = new EventNode();
	}
}

export class TilesetNode
{
	src: string = "";
	defaultTile: number = 0;
	tiles: Vector2[] = [];
}

export class MapNode
{
	width: number = 0;
	height: number = 0;
	dataSize: number = 1;
	tiles: any;
	collision: any;
}

export class EventNode
{
	Character: CharacterNode[] = [];
}

export interface CharacterNode
{
	name: string;
	x: number;
	y: number;
	direction: number;
	moveType: number;
	message: string;
	sprite: string;
}

export enum CollisionTypes
{
	None = 0,
	Normal = 1,
	SlashUp = 2,
	SlashDown = 3,
	Water = 4,
	Special = 5,
	Hazard = 6 // May or may not need this one. Not sure yet.
}

export interface DoorNode
{
	hitBox: HitBox;
	targetMap: string;
	targetX: number;
	targetY: number;
	targetDirection: Enums.Directions;
}

export class HitBox
{
	position: Vector2;
	width: number;
	height: number;
	offset: Vector2;
	constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0, offsetX: number = 0, offsetY: number = 0)
	{
		this.position = { x: x, y: y };
		this.width = width;
		this.height = height;
		this.offset = { x: offsetX, y: offsetY };
	}
}