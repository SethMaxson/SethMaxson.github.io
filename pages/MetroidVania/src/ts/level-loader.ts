import Entity from "./base-types/entity.js";
import Ghost from "./enemies/basic/ghost.js";
import Goomba from './enemies/basic/goomba.js';
import { globals, randomColor } from "./util.js";
import IPoint2D from "./interfaces/point2d.js"
import { environmentImgs, woodenDoor, smbSheet } from "./img-loader.js";
import { PowerUpSpawner } from './powerup-spawner.js';
import Door from './door.js';
import IBlock from './interfaces/level-data/block.js';
import Stationary from './enemies/basic/stationary.js';
import NPC from './base-types/npc.js';

export const levels: LevelDataEntry[] = [
	{ file: "level01.txt", data: null },
	{ file: "level0101.txt", data: null },
	{ file: "level02.txt", data: null }
];

interface LevelDataEntry
{
	file: string;
	data: null | string;
}

function parseBlock(blockData: string[])
{
	if (blockData.length >= 8) {
		return {
			key: blockData[1],
			size: {
				width: parseInt(blockData[2]),
				height: parseInt(blockData[3])
			},
			color: blockData[4],
			sprite: blockData[5],
			spriteOffset: {
				x: parseInt(blockData[6]),
				y: parseInt(blockData[7])
			}
		} as IBlock
	}
	else
	{
		throw new Error("Block Definition is invalid. There isn't enough data.")
	}
}

export const parseLevel = (levDat: LevelDataEntry) => {
	$.ajax({
		dataType: "text",
		url: `./src/levels/${levDat.file}`,
		async: false,  // synchronous (wait until file is loaded)
		cache: true,
		success: function (text)
		{
			levDat.data = text;

		},
		error: function(xhr, status, error) {
			if (status == "parsererror") {
				console.log("Error occurred parsing the level's data XML.")
			}
			throw xhr;
		}
	});
	const levelData = levDat.data as string;

	let playerSpawn = { x: 0, y: 0 };
	let staticTiles: Entity[] = [];
	let dynamicTiles: Entity[] = [];
	let killVolumes: Entity[] = [];
	let blockDefinitions: IBlock[] = [];
	let enemies = [];
	let zombieVolumes = [];
	let victoryTiles = [];
	let powerUps = [];
	const tileSize = globals.tileSize;
	let depth = 0;
	let stride = 0;


	//#region parse special data
	let levelDefinitions = levelData.split("~");
	if (levelDefinitions.length > 1)
	{
		let specialDataLines = levelDefinitions[1].split("\n");
		for (let i = 0; i < specialDataLines.length; i++) {
			const line = specialDataLines[i].split(" ");
			if (line[0] == "#Door" || line[0] == "#door")
			{
				dynamicTiles.push(new Door(
					{
						pos: { x: (parseInt(line[1])-1) * tileSize, y: (parseInt(line[2])-1) * tileSize },
						vel: { x: 0, y: 0 },
						color: randomColor(),
						sprites: woodenDoor,
						spriteOffset: {
							x: 0,
							y: 0,
							w: tileSize* 0.5,
							h: tileSize * 3
						}
					},
					line[3],
					isNaN(parseInt(line[4]))? 0 : parseInt(line[4]),
					isNaN(parseInt(line[5]))? 0 : parseInt(line[5]),
					isNaN(parseInt(line[4])),
					isNaN(parseInt(line[5])),
					line[6],
					line[7] == "t"
				));
			}
			else if (line[0] == "#block")
			{
				let block = parseBlock(line);
				if (block)
				{
					blockDefinitions.push(block);
				}
			}

		}
	}
	//#endregion

	let level = levelData.split("~")[0].split("");
	let size = { width: 0, height: 0 };
	for (let i = 0; i < level.length; i++) {
		let bigBreak = false;
		let pos: IPoint2D = { x: stride * tileSize, y: depth * tileSize };
		switch (level[i]) {
			case "\n": // new line
				stride = 0;
				depth++;
				break;
			case "~": // new line
				bigBreak = true;
				break;
			case "P":
				playerSpawn = { x: stride * tileSize, y: depth * tileSize };
				stride++;
				break;
			case "!": // victory tile
				victoryTiles.push(new Entity({
				size: { w: tileSize, h: tileSize },
				pos: { x: stride * tileSize, y: depth * tileSize },
				color: 'rgba(255, 255, 0, 0.3)'
				}));
				stride++;
				break;
			case "i": // invisible wall
				staticTiles.push(new Entity({
				size: { w: tileSize, h: tileSize },
				pos: { x: Math.floor(stride * tileSize), y: depth * tileSize },
				vel: { x: 0, y: 0 },
				color: 'transparent'
				}));
				stride++;
				break;
			case "f": // filler wall
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: Math.floor(stride * tileSize), y: Math.floor(depth * tileSize) },
					vel: { x: 0, y: 0 },
					color: 'rgb(41, 41, 41)'
				}));
				stride++;
				break;
			case "x": // stone block
				let blockWidth = 1;
				let shouldTile = false;
				// // experimental code to roll continuous blocks into one larger one
				// if (level[i+1])
				// {
				// 	while (level[i+blockWidth] && level[i+blockWidth] == 'x') {
				// 		blockWidth++;
				// 	}
				// 	if (blockWidth > 1) {
				// 		shouldTile = true;
				// 	}
				// }
				staticTiles.push(new Entity({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: randomColor(),
					sprites: environmentImgs,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize * blockWidth,
						h: tileSize
					},
					tile: shouldTile
				}));
				// stride++;
				stride += blockWidth;
				i += blockWidth-1;
				break;
			case "0": // insta death tile
				killVolumes.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					// color: 'rgba(250, 35, 0, 0.7)',
					color: 'transparent',
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "z": // zone that spawns zombies
				zombieVolumes.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					color: 'rgba(0, 200, 0, 0.0)'
				}));
				stride++;
				break;
			case "g":
				enemies.push(new Ghost({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'red'
				}));
				stride++;
				break;
			case " ": // blank space
				stride++;
				break;
			case "h": // health
				powerUps.push(PowerUpSpawner.healthPlusOne(pos.x, pos.y));
				stride++;
				break;
			case "E": // health upgrade
				powerUps.push(PowerUpSpawner.MaxHealthUpgrade(pos.x, pos.y));
				stride++;
				break;
			case "k": // small key
				powerUps.push(PowerUpSpawner.smallKey(pos.x, pos.y));
				stride++;
				break;
			case "d": // door
				dynamicTiles.push(new Entity({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: randomColor(),
					sprites: woodenDoor,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize* 0.5,
						h: tileSize * 3
					}
				}));
				stride++;
				break;
			case "n": // npc
				enemies.push(new NPC({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'red'
				}));
				stride++;
				break;
			case "s": // stationary
				enemies.push(new Stationary({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'red'
				}));
				stride++;
				break;
			//#region SMB1
			case "o": // goomba
				enemies.push(new Goomba({
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'red'
				}));
				stride++;
				break;
			case "G": // groundBlock
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.ground,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "Q": // question block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.questionBlock,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "b": // brick block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.brick,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "B": // hard brick block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.hardBlock,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			//#region pipe
			case "1":
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.pipeTopLeft,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "2": // hard brick block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.pipeTopRight,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "3": // hard brick block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.pipeLeft,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			case "4": // hard brick block
				staticTiles.push(new Entity({
					size: { w: tileSize, h: tileSize },
					pos: { x: stride * tileSize, y: depth * tileSize },
					vel: { x: 0, y: 0 },
					color: 'transparent',
					sprites: smbSheet.pipeRight,
					spriteOffset: {
						x: 0,
						y: 0,
						w: tileSize,
						h: tileSize
					}
				}));
				stride++;
				break;
			//#endregion
			//#endregion
			default:
				if (blockDefinitions.filter(o => { return o.key == level[i] }).length > 0)
				{
					let block = blockDefinitions.filter(o => { return o.key == level[i] })[0];
					staticTiles.push(new Entity({
						pos: { x: stride * tileSize, y: depth * tileSize },
						vel: { x: 0, y: 0 },
						color: block.color,
						spriteOffset: {
							x: block.spriteOffset.x * tileSize,
							y: block.spriteOffset.y * tileSize,
							w: (block.spriteOffset.x + block.size.width) * tileSize,
							h: (block.spriteOffset.y + block.size.height) * tileSize
						}
					}));
					stride += block.size.width;
				}
				else
				{
					console.warn("Unhandled level character!");
				}
				break;
		}
		size.width = Math.max(size.width, stride);
		size.height = Math.max(size.height, depth);
		if (bigBreak) {
			break;
		}
	}

	//#region add out of bounds killboxes
	killVolumes.push(new Entity({
		size: { w: (size.width + 100) * tileSize, h: 10 * tileSize },
		pos: { x: -50 * tileSize, y: (size.height + 10) * tileSize },
		vel: { x: 0, y: 0 },
		color: 'rgba(50, 35, 35, 0.7)',
		spriteOffset: {
			x: 0,
			y: 0,
			w: tileSize,
			h: tileSize
		}
	}));
	//#endregion


	return {
		playerSpawn,
		tiles: {
			static: staticTiles,
			dynamic: dynamicTiles
		},
		killVolumes,
		enemies,
		zombieVolumes,
		victoryTiles,
		powerUps,
		size
	};
};
