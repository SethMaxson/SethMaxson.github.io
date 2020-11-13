var bg1 = "./src/sprites/environment/background-outside.png";
var moon = "./src/sprites/environment/moon-parallax.png";
var cloud1 = "./src/sprites/environment/cloud1.png";
var cloud2 = "./src/sprites/environment/cloud2.png";
var cloud3 = "./src/sprites/environment/cloud3.png";
var greenStoneTile = "./src/sprites/environment/green-stone-tile.png";
var skeleton1_left = "./src/sprites/skeleton/skeleton-clothed-1.png";
var skeleton1_right = "./src/sprites/skeleton/skeleton-clothed-1-flipped.png";
var skeleton2_left = "./src/sprites/skeleton/skeleton-clothed-2.png";
var skeleton2_right = "./src/sprites/skeleton/skeleton-clothed-2-flipped.png";
var skeleton3_left = "./src/sprites/skeleton/skeleton-clothed-3.png";
var skeleton3_right = "./src/sprites/skeleton/skeleton-clothed-3-flipped.png";
var skeleton4_left = "./src/sprites/skeleton/skeleton-clothed-4.png";
var skeleton4_right = "./src/sprites/skeleton/skeleton-clothed-4-flipped.png";
var skeleton5_left = "./src/sprites/skeleton/skeleton-clothed-5.png";
var skeleton5_right = "./src/sprites/skeleton/skeleton-clothed-5-flipped.png";
var skeleton6_left = "./src/sprites/skeleton/skeleton-clothed-6.png";
var skeleton6_right = "./src/sprites/skeleton/skeleton-clothed-6-flipped.png";
var skeleton7_left = "./src/sprites/skeleton/skeleton-clothed-7.png";
var skeleton7_right = "./src/sprites/skeleton/skeleton-clothed-7-flipped.png";
var skeleton8_left = "./src/sprites/skeleton/skeleton-clothed-8.png";
var skeleton8_right = "./src/sprites/skeleton/skeleton-clothed-8-flipped.png";
var skeleton_rise1_left = "./src/sprites/skeleton/skeleton-rise-clothed-1.png";
var skeleton_rise1_right = "./src/sprites/skeleton/skeleton-rise-clothed-1-flipped.png";
var skeleton_rise2_left = "./src/sprites/skeleton/skeleton-rise-clothed-2.png";
var skeleton_rise2_right = "./src/sprites/skeleton/skeleton-rise-clothed-2-flipped.png";
var skeleton_rise3_left = "./src/sprites/skeleton/skeleton-rise-clothed-3.png";
var skeleton_rise3_right = "./src/sprites/skeleton/skeleton-rise-clothed-3-flipped.png";
var skeleton_rise4_left = "./src/sprites/skeleton/skeleton-rise-clothed-4.png";
var skeleton_rise4_right = "./src/sprites/skeleton/skeleton-rise-clothed-4-flipped.png";
var skeleton_rise5_left = "./src/sprites/skeleton/skeleton-rise-clothed-5.png";
var skeleton_rise5_right = "./src/sprites/skeleton/skeleton-rise-clothed-5-flipped.png";
var skeleton_rise6_left = "./src/sprites/skeleton/skeleton-rise-clothed-6.png";
var skeleton_rise6_right = "./src/sprites/skeleton/skeleton-rise-clothed-6-flipped.png";
var enemy_death1 = "./src/sprites/enemy-death/enemy-death-1.png";
var enemy_death2 = "./src/sprites/enemy-death/enemy-death-2.png";
var enemy_death3 = "./src/sprites/enemy-death/enemy-death-3.png";
var enemy_death4 = "./src/sprites/enemy-death/enemy-death-4.png";
var enemy_death5 = "./src/sprites/enemy-death/enemy-death-5.png";
var ghost1_right = "./src/sprites/ghost/ghost-1.png";
var ghost1_left = "./src/sprites/ghost/ghost-1-flipped.png";
var ghost2_right = "./src/sprites/ghost/ghost-2.png";
var ghost2_left = "./src/sprites/ghost/ghost-2-flipped.png";
var ghost3_right = "./src/sprites/ghost/ghost-3.png";
var ghost3_left = "./src/sprites/ghost/ghost-3-flipped.png";
var ghost4_right = "./src/sprites/ghost/ghost-4.png";
var ghost4_left = "./src/sprites/ghost/ghost-4-flipped.png";
const bg1Img = new Image();
bg1Img.src = bg1;
const moonImg = new Image();
moonImg.src = moon;
const cloud1Img = new Image();
cloud1Img.src = cloud1;
const cloud2Img = new Image();
cloud2Img.src = cloud2;
const cloud3Img = new Image();
cloud3Img.src = cloud3;
const greenStoneTileImg = new Image();
greenStoneTileImg.src = greenStoneTile;
const skeleton1Left = new Image();
skeleton1Left.src = skeleton1_left;
const skeleton2Left = new Image();
skeleton2Left.src = skeleton2_left;
const skeleton3Left = new Image();
skeleton3Left.src = skeleton3_left;
const skeleton4Left = new Image();
skeleton4Left.src = skeleton4_left;
const skeleton5Left = new Image();
skeleton5Left.src = skeleton5_left;
const skeleton6Left = new Image();
skeleton6Left.src = skeleton6_left;
const skeleton7Left = new Image();
skeleton7Left.src = skeleton7_left;
const skeleton8Left = new Image();
skeleton8Left.src = skeleton8_left;
const skeleton1Right = new Image();
skeleton1Right.src = skeleton1_right;
const skeleton2Right = new Image();
skeleton2Right.src = skeleton2_right;
const skeleton3Right = new Image();
skeleton3Right.src = skeleton3_right;
const skeleton4Right = new Image();
skeleton4Right.src = skeleton4_right;
const skeleton5Right = new Image();
skeleton5Right.src = skeleton5_right;
const skeleton6Right = new Image();
skeleton6Right.src = skeleton6_right;
const skeleton7Right = new Image();
skeleton7Right.src = skeleton7_right;
const skeleton8Right = new Image();
skeleton8Right.src = skeleton8_right;
const skeletonRise1Left = new Image();
skeletonRise1Left.src = skeleton_rise1_left;
const skeletonRise2Left = new Image();
skeletonRise2Left.src = skeleton_rise2_left;
const skeletonRise3Left = new Image();
skeletonRise3Left.src = skeleton_rise3_left;
const skeletonRise4Left = new Image();
skeletonRise4Left.src = skeleton_rise4_left;
const skeletonRise5Left = new Image();
skeletonRise5Left.src = skeleton_rise5_left;
const skeletonRise6Left = new Image();
skeletonRise6Left.src = skeleton_rise6_left;
const skeletonRise1Right = new Image();
skeletonRise1Right.src = skeleton_rise1_right;
const skeletonRise2Right = new Image();
skeletonRise2Right.src = skeleton_rise2_right;
const skeletonRise3Right = new Image();
skeletonRise3Right.src = skeleton_rise3_right;
const skeletonRise4Right = new Image();
skeletonRise4Right.src = skeleton_rise4_right;
const skeletonRise5Right = new Image();
skeletonRise5Right.src = skeleton_rise5_right;
const skeletonRise6Right = new Image();
skeletonRise6Right.src = skeleton_rise6_right;
const enemyDeath1 = new Image();
enemyDeath1.src = enemy_death1;
const enemyDeath2 = new Image();
enemyDeath2.src = enemy_death2;
const enemyDeath3 = new Image();
enemyDeath3.src = enemy_death3;
const enemyDeath4 = new Image();
enemyDeath4.src = enemy_death4;
const enemyDeath5 = new Image();
enemyDeath5.src = enemy_death5;
const enemyDeathImg = new Image();
enemyDeathImg.src = "./src/sprites/enemy-death/enemy-death.png";
//#region Ghost
const ghost1Left = new Image();
ghost1Left.src = ghost1_left;
const ghost2Left = new Image();
ghost2Left.src = ghost2_left;
const ghost3Left = new Image();
ghost3Left.src = ghost3_left;
const ghost4Left = new Image();
ghost4Left.src = ghost4_left;
const ghost1Right = new Image();
ghost1Right.src = ghost1_right;
const ghost2Right = new Image();
ghost2Right.src = ghost2_right;
const ghost3Right = new Image();
ghost3Right.src = ghost3_right;
const ghost4Right = new Image();
ghost4Right.src = ghost4_right;
//#endregion
//#region Items
const health = new Image();
health.src = "./src/sprites/items/wallmeat.png";
const healthUpgrade = new Image();
healthUpgrade.src = "./src/sprites/items/etank.png";
const keyImg = new Image();
keyImg.src = "./src/sprites/items/key.png";
//#endregion
//#region Player
const playerSheet = new Image();
playerSheet.src = "./src/sprites/player/player_sheet.png";
const playerFrameSize = { x: 130, y: 60 };
export const characterIdleRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 0 }, length: 8 };
export const characterIdleLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 1 }, length: 8 };
export const characterWalkingRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 2 }, length: 4 };
export const characterWalkingLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 3 }, length: 4 };
export const characterWhipRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 4 }, length: 3 };
export const characterWhipLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 5 }, length: 3 };
export const characterDamageRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 6 }, length: 1 };
export const characterDamageLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 7 }, length: 1 };
export const characterJumpRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 8 }, length: 1 };
export const characterJumpLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 9 }, length: 1 };
export const characterFallRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 10 }, length: 2 };
export const characterFallLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 11 }, length: 1 };
export const characterDeadRight = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 12 }, length: 1 };
export const characterDeadLeft = { image: playerSheet, frameSize: playerFrameSize, animationOffset: { x: 0, y: 13 }, length: 1 };
//#endregion
//#region NPC
const npcImg = new Image();
npcImg.src = "./src/sprites/npc/test.png";
const alertImg = new Image();
alertImg.src = "./src/sprites/npc/alert.png";
export const npcImgs = {
    left: { image: npcImg, frameSize: { x: 20, y: 40 }, animationOffset: { x: 0, y: 0 }, length: 8 },
    right: { image: npcImg, frameSize: { x: 20, y: 40 }, animationOffset: { x: 0, y: 1 }, length: 8 },
    alert: { image: alertImg, frameSize: { x: 32, y: 32 }, animationOffset: { x: 0, y: 0 }, length: 1 },
};
//#endregion
//#region SMB1
const smbSheetImg = new Image();
smbSheetImg.src = "./src/sprites/environment/smb1.png";
const smbFrameSize = { x: 16, y: 16 };
export const smbSheet = {
    ground: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 0, y: 0 }, length: 1 },
    brick: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 1, y: 0 }, length: 1 },
    pipeTopLeft: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 2, y: 0 }, length: 1 },
    pipeTopRight: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 3, y: 0 }, length: 1 },
    questionBlock: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 0, y: 1 }, length: 1 },
    hardBlock: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 1, y: 1 }, length: 1 },
    pipeLeft: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 2, y: 1 }, length: 1 },
    pipeRight: { image: smbSheetImg, frameSize: smbFrameSize, animationOffset: { x: 3, y: 1 }, length: 1 }
};
const goombaImg = new Image();
goombaImg.src = "./src/sprites/enemy/goomba.png";
export const goombaImgs = { image: goombaImg, frameSize: { x: 16, y: 16 }, animationOffset: { x: 0, y: 0 }, length: 2 };
//#endregion
export const environmentImgs = [greenStoneTileImg];
export const itemImgs = { healthPlusOne: [health], healthUpgrade: [healthUpgrade], key: [keyImg] };
export const bgImgs = [bg1Img];
export const bgParallaxImgs = [moonImg, cloud1Img, cloud2Img, cloud3Img];
const doorImg = new Image();
doorImg.src = "./src/sprites/environment/wooden-door.png";
export const woodenDoor = [doorImg];
export const zombieLeft = [skeleton1Left, skeleton2Left, skeleton3Left, skeleton4Left, skeleton5Left, skeleton6Left, skeleton7Left, skeleton8Left];
export const zombieRight = [skeleton1Right, skeleton2Right, skeleton3Right, skeleton4Right, skeleton5Right, skeleton6Right, skeleton7Right, skeleton8Right];
export const zombieRiseLeft = [skeletonRise1Left, skeletonRise2Left, skeletonRise3Left, skeletonRise4Left, skeletonRise5Left, skeletonRise6Left];
export const zombieRiseRight = [skeletonRise1Right, skeletonRise2Right, skeletonRise3Right, skeletonRise4Right, skeletonRise5Right, skeletonRise6Right];
// export const enemyDeath = [enemyDeath1, enemyDeath2, enemyDeath3, enemyDeath4, enemyDeath5];
export const enemyDeath = { image: enemyDeathImg, frameSize: { x: 110, y: 130 }, animationOffset: { x: 0, y: 0 }, length: 5 };
export const ghostRight = [ghost1Right, ghost2Right, ghost3Right, ghost4Right];
export const ghostLeft = [ghost1Left, ghost2Left, ghost3Left, ghost4Left];
//# sourceMappingURL=img-loader.js.map