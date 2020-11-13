import { Settings } from './utility.js';
export function createMapXML(map) {
    // create xml document object
    var xmlString = "<doc></doc>";
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
    var root = xmlDoc.getElementsByTagName("doc")[0];
    // create node
    var tileSetNode = xmlDoc.createElement("tileset");
    tileSetNode.setAttribute("src", map.tileset.src);
    tileSetNode.setAttribute("default-tile", map.defaultTile.toString());
    tileSetNode.setAttribute("grid-size", "32");
    map.tiles.forEach(tile => {
        tileSetNode.appendChild(createTileNode(xmlDoc, tile.x, tile.y));
    });
    // var textNode = document.createTextNode("\n");
    root.appendChild(document.createTextNode("\n"));
    root.appendChild(tileSetNode);
    root.appendChild(document.createTextNode("\n"));
    root.appendChild(createMapNode(xmlDoc, map));
    root.appendChild(document.createTextNode("\n"));
    root.appendChild(createEventNode(xmlDoc, map));
    root.appendChild(document.createTextNode("\n"));
    //probably for saving
    var serializer = new XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDoc);
    console.log(xmlString);
    saveMapXML(xmlString, map.name);
}
function createTileNode(xmlDoc, x, y) {
    var node = xmlDoc.createElement("tile");
    node.setAttribute("x", x.toString());
    node.setAttribute("y", y.toString());
    return node;
}
function createMapNode(xmlDoc, map) {
    let dataSize = 2;
    var node = xmlDoc.createElement("map");
    node.setAttribute("width", map.size.x.toString());
    node.setAttribute("height", map.size.y.toString());
    node.setAttribute("data-size", "2");
    //#region create tiles node
    var tilesNode = xmlDoc.createElement("tiles");
    tilesNode.appendChild(document.createTextNode("\n"));
    for (let y = 0; y < map.size.y; y++) {
        const row = map.data[y];
        let rowText = "";
        for (let x = 0; x < map.size.x; x++) {
            const e = row[x];
            rowText += forceDataSize(e, dataSize);
        }
        rowText += "\n";
        tilesNode.appendChild(document.createTextNode(rowText));
    }
    //#endregion
    //#region create collision node
    var collisionNode = xmlDoc.createElement("collision");
    collisionNode.appendChild(document.createTextNode("\n"));
    for (let y = 0; y < map.size.y; y++) {
        const row = map.collision[y];
        let rowText = "";
        for (let x = 0; x < map.size.x; x++) {
            const e = row[x];
            rowText += e;
        }
        rowText += "\n";
        collisionNode.appendChild(document.createTextNode(rowText));
    }
    //#endregion
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(tilesNode);
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(collisionNode);
    node.appendChild(document.createTextNode("\n"));
    return node;
}
function createEventNode(xmlDoc, map) {
    var node = xmlDoc.createElement("event");
    for (let i = 0; i < map.charas.length; i++) {
        const char = map.charas[i];
        if (!char.specialFlags.includes("Player")) {
            node.appendChild(document.createTextNode("\n"));
            node.appendChild(createCharacterNode(xmlDoc, char));
        }
    }
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createDoorsNode(xmlDoc, map));
    node.appendChild(document.createTextNode("\n"));
    return node;
}
function createDoorsNode(xmlDoc, map) {
    var node = xmlDoc.createElement("doors");
    for (let i = 0; i < map.doors.length; i++) {
        const door = map.doors[i];
        node.appendChild(document.createTextNode("\n"));
        node.appendChild(createDoorNode(xmlDoc, door));
    }
    node.appendChild(document.createTextNode("\n"));
    return node;
}
function createDoorNode(xmlDoc, door) {
    var node = xmlDoc.createElement("door");
    node.setAttribute("targetMap", door.targetMap);
    node.setAttribute("x", door.hitBox.position.x.toString());
    node.setAttribute("y", door.hitBox.position.y.toString());
    node.setAttribute("width", (door.hitBox.width / Settings.GS).toString());
    node.setAttribute("height", (door.hitBox.height / Settings.GS).toString());
    node.setAttribute("targetX", door.targetX.toString());
    node.setAttribute("targetY", door.targetY.toString());
    node.setAttribute("targetDirection", door.targetDirection.toString());
    return node;
}
function createNodeWithTextValue(xmlDoc, nodeName, value) {
    var node = xmlDoc.createElement(nodeName);
    node.appendChild(document.createTextNode(value));
    return node;
}
function createCharacterNode(xmlDoc, char) {
    var node = xmlDoc.createElement("character");
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "name", char.name));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "x", char.cell.x.toString()));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "y", char.cell.y.toString()));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "direction", char.direction.toString()));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "moveType", char.movetype.toString()));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "message", char.message.toString()));
    node.appendChild(document.createTextNode("\n"));
    node.appendChild(createNodeWithTextValue(xmlDoc, "sprite", char.image.src.split("images/")[1].split(".png")[0]));
    node.appendChild(document.createTextNode("\n"));
    return node;
}
function saveMapXML(xmltext, filename) {
    var pom = document.createElement('a');
    filename = filename + ".xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext], { type: 'text/plain' });
    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);
    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.classList.add('dragout');
    pom.click();
}
function forceDataSize(data, dataSize) {
    let converted = data.toString();
    return converted.padStart(dataSize, "0");
}
//# sourceMappingURL=map-writer.js.map