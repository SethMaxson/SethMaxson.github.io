import { Eraser } from './eraser.js';
import { Pencil } from './pencil.js';
import { CollisionPencil } from './collision-pencil.js';
import { Zoom } from './zoom.js';
import { Reference } from './reference.js';
import { MainProcess } from '../map-editor.js';
import { Settings } from '../utility.js';
export class Toolbox {
    constructor() {
        this.collisionPencil = new CollisionPencil();
        this.eraser = new Eraser();
        this.pencil = new Pencil();
        this.reference = new Reference();
        this.zoom = new Zoom();
        this.reference = new Reference();
    }
    loadMap(map) {
        this.pencil.imagePath = map.tileset.src;
    }
    addEventListeners() {
        $("body").on("mousedown", ".pencil-tile-selector", function (e) {
            let rect = e.target.getBoundingClientRect();
            let tilesetSize = { x: 8, y: 4 };
            let click = { x: Math.floor((e.pageX - rect.left) * (tilesetSize.x / rect.width)), y: Math.floor((e.pageY - rect.top) * (tilesetSize.y / rect.height)) };
            let vertOffset = (tilesetSize.x * click.y);
            MainProcess.toolbox.pencil.tile = click.x + vertOffset;
        });
        $("body").on("mousedown", ".collision-pencil-tile-selector", function (e) {
            let rect = e.target.getBoundingClientRect();
            let tilesetSize = { x: 9, y: 1 };
            MainProcess.toolbox.collisionPencil.tile = Math.floor((e.pageX - rect.left) * (tilesetSize.x / rect.width));
        });
        $("body").on("change", ".zoom-level-selector", function (e) {
            MainProcess.toolbox.zoom.value = $(this).val();
            Settings.Scale = MainProcess.toolbox.zoom.value;
            MainProcess.resize(true);
        });
        $("body").on("change", ".reference-opacity-selector", function (e) {
            MainProcess.toolbox.reference.opacity = $(this).val();
            $("#map-reference").css("opacity", MainProcess.toolbox.reference.opacity);
        });
        $("body").on("change", ".pencil-radius-selector", function (e) {
            MainProcess.toolbox.pencil.radius = $(this).val();
        });
        $("body").on("change", "#button-open-reference", function (e) {
            let filesList = $(this)[0].files;
            if (filesList && filesList.length > 0) {
                let fileName = filesList[0].name;
                $("#map-reference").css("backgroundImage", `url('/pages/JRPG/images/${fileName}')`);
            }
        });
    }
}
//# sourceMappingURL=toolbox.js.map