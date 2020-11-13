import { Enums, Settings, Vector2 } from "./utility.js";
import { LevelMap, DoorNode, HitBox } from './map.js';
import { Player } from './player.js';
import { Engine, Controller } from './engine.js';
import { Character } from './character.js';
import { Sprite } from './sprite.js';

export var MainProcess: Main;

export class Main extends Engine {
	//@ts-ignore
	map: LevelMap;
	player: Player;
	constructor()
	{
		super(undefined, true);
		// initialize global objects
		this.player = new Player("Player", 9, 8, Enums.Directions.Down);
		// this.player = new Player("Player", 9, 8, Enums.Directions.Down, "sprites/jasper");

		// this.loadMap("eventhorizon");
		Settings.Scale = 3;
		this.loadMap("maze");
		this.resize(true);

		window.requestAnimationFrame(mainLoop);

		// start music
		var bgmNo = 0;
		var audioObj = new Audio();
		var ext = "";
		if (audioObj.canPlayType("audio/wav") == "maybe") { ext = ".wav"; }
		if (audioObj.canPlayType("audio/mp3") == "maybe") { ext = ".mp3"; }
		if (ext !== "") {
			audioObj = new Audio(musicList[bgmNo].url + ext);
			audioObj.volume = 0.03;
			audioObj.loop = true;
			audioObj.play();
		}
	}
	resize(clearDraw: boolean = false)
	{
		super.resize(clearDraw);
	}
	loadMap(fileName: string = "test")
	{
		super.loadMap(fileName);
		this.map.addChara(this.player);
		if (this.player) {
			if (this.map.defaultStartPosition.x > -1 && this.map.defaultStartPosition.y > -1)
			{
				this.player.position.x = this.map.defaultStartPosition.x * Settings.GS;
				this.player.position.y = this.map.defaultStartPosition.y * Settings.GS;
			}
			this.map.entityHitBox.push({ hitbox: this.player.feetHitBox, color: "yellow" });
		}
	}
	changeMap(door: DoorNode)
	{
		this.loadMap(door.targetMap);
		this.player.position.x = door.targetX * Settings.GS;
		this.player.position.y = door.targetY * Settings.GS;
		this.player.direction = door.targetDirection;
	}
}

var musicList = [
    { name : "field", url: "music/field" },
    { name : "castle", url: "music/castle" }
];

$(document).ready(function(){
	MainProcess = new Main();
	$("#map-select").change(function ()
	{
		console.log($(this).val());
		MainProcess.loadMap($(this).val() as string);
	});
});

// calculate player-map offset
function calcOffset(player: Player): Vector2 {
	// var offsetx = ((player.px * Settings.Scale) - Settings.Width / 2) / Settings.Scale;
	// var offsety = ((player.py * Settings.Scale) - Settings.Height / 2) / Settings.Scale;
	// var offsetx = player.px - (Settings.Width / (2 * Settings.Scale));
    // var offsety = player.py - (Settings.Height / (2 * Settings.Scale));
	var offsetx = Math.floor(player.position.x - (Settings.Width / (2 * Settings.Scale)));
    var offsety = Math.floor(player.position.y - (Settings.Height / (2 * Settings.Scale)));
	return { x: offsetx, y: offsety };
}

function mainLoop() {
	// initialize
	MainProcess.contexts.foreground.clearRect(0, 0, Settings.Width, Settings.Height);
	// MainProcess.contexts.background.clearRect(0, 0, Settings.Width, Settings.Height);
	if (MainProcess.updateUI) {
		MainProcess.contexts.ui.clearRect(0, 0, Settings.Width, Settings.Height);
	}



	//TEST
	MainProcess.map.drawCollisions = [];
	MainProcess.player.resetBounds();
	for (let i = 0; i < MainProcess.map.blockers.length; i++) {
		// detecting player collision against environment
		MainProcess.player.calcBoundsCollision(MainProcess.map.blockers[i], MainProcess.map);
		// // detecting enemy collision against environment
		// for (let j = 0; j < enemies.length; j++) {
		//   if (enemies[j] !== null) {
		// 	enemies[j].calculateBounds();
		// 	enemies[j].calcBoundsCollision(blockers[i]);
		//   }
		// }
	}
	// /TEST

	// update
	MainProcess.map.update();
	Controller.update();
	checkCollisions(MainProcess.map.charas);
	checkStab(MainProcess.player, MainProcess.player.weapon, MainProcess.map.charas);
	doorCollides(MainProcess.player.hitbox, MainProcess.map.doors);

	// draw
	let offset = calcOffset(MainProcess.player);

	MainProcess.map.draw(MainProcess.contexts, offset);
	// console.log("MainProcess.map.name: " + MainProcess.map.name);

	setTimeout( function() {
		requestAnimationFrame(mainLoop);
	}, 1000 / MainProcess.FramesPerSecond );

}

function checkCollisions(entities: Character[])
{
	for (let i = entities.length - 1; i > 0; i--) {
		const ent1 = entities[i];
		for (let j = 0; j < i; j++) {
			const ent2 = entities[j];
			if (collidesHitBox(ent1.hitbox, ent2.hitbox)) {
					// collision detected!
					console.log(ent1.name +  " collided with " + ent2.name)
			 }
		}
	}
}

function collides(ent1: Character|Sprite, ent2: Character|Sprite): boolean
{
	if (ent1.position.x < ent2.position.x + ent2.renderSize.x * Settings.GS &&
		ent1.position.x + ent1.renderSize.x * Settings.GS > ent2.position.x &&
		ent1.position.y < ent2.position.y + ent2.renderSize.y * Settings.GS &&
		ent1.position.y + ent1.renderSize.y * Settings.GS > ent2.position.y) {
			// collision detected!
		return true;
	}
	else
	{
		return false;
	}
}

function collidesHitBox(hitbox1: HitBox, hitbox2: HitBox): boolean
{
	if (hitbox1.position.x < hitbox2.position.x + hitbox2.width &&
		hitbox1.position.x + hitbox1.width > hitbox2.position.x &&
		hitbox1.position.y < hitbox2.position.y + hitbox2.height &&
		hitbox1.position.y + hitbox1.height > hitbox2.position.y) {
			// collision detected!
		return true;
	}
	else
	{
		return false;
	}
}

function doorCollides(entity: HitBox, doors: DoorNode[])
{
	for (let i = 0; i < doors.length; i++) {
		const door = doors[i];
		if (collidesHitBox(entity, door.hitBox)) {
			// collision detected!
			MainProcess.changeMap(door);
			break;
		}
	}
}

function checkStab(attacker: Character, weapon: Sprite, entities: Character[]): Character[]
{
	let collisions: Character[] = [];
	let weaponHitBox = getHitBoxFromSprite(weapon);
	for (let j = 0; j < entities.length; j++) {
		const ent2 = entities[j];
		if (collidesHitBox(weaponHitBox, ent2.hitbox) && !Object.is(attacker, ent2)) {
			collisions.push(ent2);
			console.log(ent2.name + " got shanked.");
		}
	}
	return collisions;
}

function getHitBoxFromSprite(sprite: Sprite)
{
	let hb = new HitBox();
	hb.position.x = sprite.position.x;
	hb.position.y = sprite.position.y;
	hb.width = sprite.renderSize.x * Settings.GS;
	hb.height = sprite.renderSize.y * Settings.GS;
	return hb;
}