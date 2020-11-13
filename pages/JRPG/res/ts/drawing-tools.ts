import { Settings } from './utility.js';
import { CollisionTypes } from './map.js';
import { SpriteManager } from './engine.js';

var collisionTileset: HTMLImageElement|undefined = undefined;

export function drawCollision(context: CanvasRenderingContext2D, targetCollision: CollisionTypes, x: number, y: number)
{
	if (!collisionTileset) {
		collisionTileset = SpriteManager.getImage("/pages/jrpg/images/tilesets/collision_tileset.png");
	}

	if (targetCollision !== CollisionTypes.None && collisionTileset) {
		context.globalAlpha = 0.5;

		context.drawImage(collisionTileset, targetCollision * Settings.GS, 0 * Settings.GS, Settings.GS, Settings.GS, x, y, Settings.GS, Settings.GS);

		context.globalAlpha = 1.0;
	}

}