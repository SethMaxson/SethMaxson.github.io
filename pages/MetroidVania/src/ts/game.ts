import Player from "./player.js";
import Camera from "./camera.js";
import Zombie from "./enemies/basic/zombie.js";
import {
	levels,
	parseLevel
} from "./level-loader.js";
import {
	bindKeyHandlers, userController
} from "./controller.js";
import {
	globals,
	boxCollision
} from "./util.js";
import { GameObjects } from './interfaces/game-objects.js';
import { PowerUpSpawner } from './powerup-spawner.js';
import ZombieSmart from './enemies/basic/zombie-smart.js';
import Door from './door.js';
import NPC from './base-types/npc.js';
import DialogPrinter from './ui/dialog-printer.js';

const GAME_STATES = {
	MENU: "MENU",
	GAME_TALKING: "GAME_TALKING",
	GAME_PLAYING: "GAME_PLAYING",
	GAME_PAUSED: "GAME_PAUSED",
	GAME_WON: "GAME_WON",
	GAME_LOADING: "GAME_LOADING"
};

class Game {
	canvas: HTMLCanvasElement;
	canvasCtx: CanvasRenderingContext2D;
	currentLevel!: string;
	currentLevelNumber: number;
	progressionType: "linear" | "open" = "open";
	alwaysNewPlayer: boolean;
	timeSinceLastFrame: number;
	previousTime: number;
	timeSinceLastTick: number;
	previousTickTime: number;
	spawnZombies: boolean;
	zombieSpawnIntervalId: NodeJS.Timeout|null;
	zombieSpawnSpeed: number;
	needsReset: boolean;
	gameState: string;
	levelSize!: { width: number, height: number };
	gameObjects!: GameObjects;
	player!: Player;
	camera!: Camera;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvas.width = globals.screenWidth;
		this.canvas.height = globals.screenHeight;
		this.canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.currentLevelNumber = 1;
		this.alwaysNewPlayer = false;
		this.gameState = GAME_STATES.GAME_LOADING;
		this.init();
		bindKeyHandlers();

		this.timeSinceLastFrame = 0;
		this.previousTime = Date.now();

		this.step = this.step.bind(this);
		this.step();

		this.timeSinceLastTick = 0;
		this.previousTickTime = Date.now();

		this.tick = this.tick.bind(this);
		setInterval(this.tick);

		//misc game variables
		this.spawnZombies = false;
		this.zombieSpawnIntervalId = null;
		this.zombieSpawnSpeed = 1300;
		this.zombieSpawning = this.zombieSpawning.bind(this);
		this.needsReset = false;

		// let bgm = new Audio("src/bgm/bloody-tears.mp3");
		// bgm.volume = 0.2;
		// // bgm.loop = true;
		// bgm.play();
	}

	init(levelName?: string) {
		this.needsReset = false;
		this.gameState = GAME_STATES.GAME_LOADING;
		if (this.camera) {
			this.camera.fadeOut();
		}
		this.gameObjects = {
			blockers: [],
			collisions: {
				static: [],
				dynamic: []
			},
			dialogPrinter: new DialogPrinter(),
			enemies: [],
			killVolumes: [],
			player: [],
			playerAttack: [],
			playerSpawn: { x: 0, y: 0 },
			powerUps: [],
			victoryTiles: [],
			zombieVolumes: []
		};
		if (levelName) {
			this.loadLevelByName(levelName);
		}
		else if (this.progressionType == "open") {
			if (this.currentLevel) {
				this.loadLevelByName(this.currentLevel);
			}
			else
			{
				this.loadLevelByName("debug.txt");
			}
		}
		else
		{
			this.loadLevel(this.currentLevelNumber-1);
		}

		//#region initializeLevel
		if (this.alwaysNewPlayer || !this.player) {
			this.player = new Player({
				spawnPos: this.gameObjects.playerSpawn
			});
		} else
		{
			this.player.vel.x = 0;
			this.player.vel.y = 0;
			this.player.pos.x = this.gameObjects.playerSpawn.x;
			this.player.pos.y = this.gameObjects.playerSpawn.y;
			this.player.boundaryCollision.top = false;
			this.player.boundaryCollision.right = false;
			this.player.boundaryCollision.bottom = false;
			this.player.boundaryCollision.left = false;
			this.player.bumped = false;
			this.player.dead = false;
		}
		this.gameObjects.player.push(this.player);
		if (this.camera) {
			this.camera.loadLevel(this.player, this.gameObjects, this.canvasCtx, this.levelSize);
		} else
		{
			this.camera = new Camera(this.player, this.gameObjects, this.canvasCtx, this.levelSize);
		}
		this.camera.fadeIn();
		// this.camera = new Camera(this.player, this.gameObjects, this.canvasCtx, this.levelSize);
		this.gameObjects.enemies.forEach(enemy =>
		{
			if (enemy.hasOwnProperty("playerLoc"))
			{
			//@ts-ignore
			enemy.playerLoc = this.player.pos
		} });
		this.resize();

		this.gameState = GAME_STATES.GAME_PLAYING;
		//#endregion

		let target = this;
		$(window).resize(function(){
			target.resize();
		});
	}

	// every frame
	step() {
		let currentTime = Date.now();
		this.timeSinceLastFrame = currentTime - this.previousTime;
		this.previousTime = currentTime;
		let updateCamera = false;

		if (this.gameState == GAME_STATES.GAME_LOADING || this.camera.faded) {
			updateCamera = true;
		}
		else if (this.gameState != GAME_STATES.GAME_PAUSED && this.gameState != GAME_STATES.GAME_TALKING) {
			updateCamera = true;

			if (this.gameState === GAME_STATES.GAME_PLAYING) {
				// if the game is running, the player will receive input
				this.player.input();

				// this checks to see if player died in a pit
				const killVolumes = this.gameObjects.killVolumes;
				for (let i = 0; i < killVolumes.length; i++) {
					if (boxCollision(this.player, killVolumes[i])) {
						this.player.dead = true;
					}
				}
				this.player.applyVelocity(this.timeSinceLastFrame);

				const enemies = this.gameObjects.enemies;
				for (let i = 0; i < enemies.length; i++) {
					if (enemies[i] !== null) {
						enemies[i].applyVelocity(this.timeSinceLastFrame);
						enemies[i].ai();
					}
				}

				this.zombieGenerator();
			}
		}
		else if (this.gameState == GAME_STATES.GAME_TALKING)
		{
			updateCamera = true;

			//#region Do input for dialog
			if (userController.attack)
			{
				this.gameObjects.dialogPrinter.close();
			}
			//#endregion
			if (this.gameObjects.dialogPrinter.isOpen == false) {
				this.gameState = GAME_STATES.GAME_PLAYING;
			}
		}

		if (updateCamera) {
			this.camera.update();
			requestAnimationFrame(this.step);
		}
	}

	// every tick
	tick() {
		let currentTick = Date.now();
		this.timeSinceLastTick = currentTick - this.previousTickTime;
		this.previousTickTime = currentTick;

		if (this.gameObjects.dialogPrinter.isOpen) {
			this.gameState = GAME_STATES.GAME_TALKING;
		}

		// if (this.gameState != GAME_STATES.GAME_PAUSED && this.gameState != GAME_STATES.GAME_LOADING && !this.camera.faded && this.gameState != GAME_STATES.GAME_TALKING) {
		if (this.gameState == GAME_STATES.GAME_PLAYING && !this.camera.faded) {
			// restart game if player died
			if (this.player.dead || this.needsReset)
			{
				if (this.player.dead) {
					this.player.health = this.player.maxHealth;
				}
				this.init();
				// return;
			}
			this.player.update();

			// loop through game objects to detect collision
			const blockers = this.gameObjects.collisions.static;
			const enemies = this.gameObjects.enemies;
			const victoryTiles = this.gameObjects.victoryTiles;
			const powerUps = this.gameObjects.powerUps;
			for (let i = 0; i < blockers.length; i++) {
				// detecting player collision against environment
				this.player.calcBoundsCollision(blockers[i]);
				// detecting enemy collision against environment
				for (let j = 0; j < enemies.length; j++) {
					if (enemies[j] !== null) {
						enemies[j].calculateBounds();
						enemies[j].calcBoundsCollision(blockers[i]);
					}
				}
			}
			// test dynamic stuff and doors
			if (true) {
				for (let i = 0; i < this.gameObjects.collisions.dynamic.length; i++)
				{
					let obj = this.gameObjects.collisions.dynamic[i];
					if (obj.type == "door")
					{
						if (boxCollision(this.player, obj)) {
							let otherSide = (obj as Door).otherSide;
							let faceLeft = otherSide.facing == "left";
							this.gameState = GAME_STATES.GAME_LOADING;
							this.init(otherSide.map + ".txt");
							if (faceLeft) {
								otherSide.x -= 1;
								this.player.playerState = "IDLE_LEFT";
							} else
							{
								this.player.playerState = "IDLE_RIGHT";
							}
							this.player.pos.x = otherSide.x * globals.tileSize;
							this.player.pos.y = otherSide.y * globals.tileSize;
							this.player.facingLeft = faceLeft;
							this.player.actionResets.onGround = otherSide.onGround;
						}
					}
					else
					{
						// detecting player collision against environment
						this.player.calcBoundsCollision(obj);
						// detecting enemy collision against environment
						for (let j = 0; j < enemies.length; j++) {
							if (enemies[j] !== null) {
								enemies[j].calculateBounds();
								enemies[j].calcBoundsCollision(obj);
							}
						}
					}
				}
			}

			// loop through enemies for player attacking
			// and enemy => player body collision
			for (let i = 0; i < enemies.length; i++)
			{
				if (enemies[i] !== null)
				{

					if (enemies[i].isEnemy)
					{// when player is attacking, see if they hit an enemy
						if (this.player.attackVolume !== null)
						{
							let result = boxCollision(this.player.attackVolume, enemies[i]);
							if (result) enemies[i].takeDamage(this.player.attackPower);
						}

						// if player touches enemy, deal damage
						if (enemies[i].health > 0)
						{
							if (boxCollision(this.player, enemies[i]) && !this.player.dead)
							{
								this.player.takeDamage(enemies[i].collisionDamage);
							}
						}
					}
					else if (enemies[i].isInteractive)
					{
						// check if creature is in range for player interaction
						let ent = enemies[i] as NPC;
						let result = boxCollision(this.player.interactVolume, ent);
						if (result)
						{
							ent.inRange = true;
							if (this.player.interactVolumeActive)
							{
								if (ent.talk)
								{
									ent.talk(this.player, this.gameObjects.dialogPrinter);
								} else
								{
									ent.interact(this.player);
								}
							}
						}
						else
						{
							ent.inRange = false;
						}
					}

					// remove enemy if dead
					if (enemies[i].dead)
					{
						//test reward spawning
						for (let j = 0; j < enemies[i].itemDrops.length; j++)
						{
							const drop = enemies[i].itemDrops[j];
							if (Math.random() <= drop.chance)
							{
								this.gameObjects.powerUps.push(PowerUpSpawner[drop.item](enemies[i].pos.x, enemies[i].pos.y));
							}
						}

						let tempEnemies = enemies.slice(0, i).concat(enemies.slice(i + 1));
						this.gameObjects.enemies = tempEnemies;
						// enemies[i] = null;
					}

					enemies[i].update();
				}
			}

			// check if player got a power up
			for (let i = powerUps.length - 1; i >= 0; i--)
			{
				if (boxCollision(this.player, powerUps[i])) {
					powerUps[i].use(this.player);
					powerUps.splice(i, 1);
				}
			}

			// check if player won
			for (let i = 0; i < victoryTiles.length; i++) {
				if (boxCollision(this.player, victoryTiles[i])) {
					if (this.currentLevelNumber == levels.length) {
						this.camera.victoryScreen = true;
						setTimeout(() => {
							this.currentLevelNumber = 1;
							this.needsReset = true;
						}, 2000);
					} else {
						this.gameState = GAME_STATES.GAME_LOADING;
						this.currentLevelNumber++;
						this.init();
						// this.loadLevel(this.currentLevelNumber+1);
						// this.initLevel();
					}
					break;
				}
			}

			this.player.interactVolumeActive = false;
		}
	}

	resize() {
		// console.log(`Before: Width: ${globals.screenWidth}, Height: ${globals.screenHeight}`);
		globals.screenWidth = $("#game")[0].clientWidth;
		globals.screenHeight = $("#game")[0].clientHeight;
		this.canvas.width = globals.screenWidth;
		this.canvas.height = globals.screenHeight;
		this.camera.recalculate();
		// console.log(`After: Width: ${globals.screenWidth}, Height: ${globals.screenHeight}`);
	}

	loadLevel(levelNumber: number) {
		let level = parseLevel(levels[levelNumber]);
		this.currentLevel = levels[levelNumber].file;

		this.gameObjects.playerSpawn = level.playerSpawn;
		this.gameObjects.collisions.static = this.gameObjects.collisions.static.concat(level.tiles.static);
		this.gameObjects.collisions.dynamic = this.gameObjects.collisions.dynamic.concat(level.tiles.dynamic);
		this.gameObjects.killVolumes = this.gameObjects.killVolumes.concat(level.killVolumes);
		this.gameObjects.enemies = this.gameObjects.enemies.concat(level.enemies);
		this.gameObjects.zombieVolumes = this.gameObjects.zombieVolumes.concat(level.zombieVolumes);
		this.gameObjects.victoryTiles = this.gameObjects.victoryTiles.concat(level.victoryTiles);
		this.gameObjects.powerUps = this.gameObjects.powerUps.concat(level.powerUps);
		this.levelSize = level.size;
	}

	loadLevelByName(fileName: string)
	{
		this.currentLevel = fileName;
		let level = parseLevel({ file: fileName, data: null });

		this.gameObjects.playerSpawn = level.playerSpawn;
		this.gameObjects.collisions.static = this.gameObjects.collisions.static.concat(level.tiles.static);
		this.gameObjects.collisions.dynamic = this.gameObjects.collisions.dynamic.concat(level.tiles.dynamic);
		this.gameObjects.killVolumes = this.gameObjects.killVolumes.concat(level.killVolumes);
		this.gameObjects.enemies = this.gameObjects.enemies.concat(level.enemies);
		this.gameObjects.zombieVolumes = this.gameObjects.zombieVolumes.concat(level.zombieVolumes);
		this.gameObjects.victoryTiles = this.gameObjects.victoryTiles.concat(level.victoryTiles);
		this.gameObjects.powerUps = this.gameObjects.powerUps.concat(level.powerUps);
		this.levelSize = level.size;
	}

	zombieGenerator() {
		this.spawnZombies = false;
		const zombieVolumes = this.gameObjects.zombieVolumes;
		zombieVolumes.forEach(volume => {
			if (boxCollision(this.player, volume)) {
				this.spawnZombies = true;
			}
		});
		if (this.zombieSpawnIntervalId === null && this.spawnZombies) {
			this.zombieSpawnIntervalId = setInterval(this.zombieSpawning, this.zombieSpawnSpeed);
		}
		if (this.zombieSpawnIntervalId !== null && !this.spawnZombies) {
			clearInterval(this.zombieSpawnIntervalId);
			this.zombieSpawnIntervalId = null;
		}
	}

	zombieSpawning() {
		let moveLeft, startPos;
		const num = Math.random();
		if (num < 0.5) {
			moveLeft = false;
			startPos = {
				x: -this.camera.offsetX - 100,
				y: this.player.pos.y
			};
		} else {
			moveLeft = true;
			startPos = {
				x: -this.camera.offsetX + globals.screenWidth + 50,
				y: this.player.pos.y
			};
		}

		// this.gameObjects.enemies.push(new Zombie({
		// 	pos: startPos,
		// 	movingLeft: moveLeft
		// }));
		this.gameObjects.enemies.push(new ZombieSmart({
			pos: startPos,
			movingLeft: moveLeft
		}));
	}
}

export default Game;