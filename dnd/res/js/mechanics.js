"use strict";
var FilterTrinary;
(function (FilterTrinary) {
    FilterTrinary["Neutral"] = "n";
    FilterTrinary["Exclude"] = "e";
    FilterTrinary["Include"] = "i";
})(FilterTrinary || (FilterTrinary = {}));
;
// declare interface Array<T> {
// 	capitalize(): string;
// 	replaceAll(search: string, replacement: string): string;
// 	append(item: T): Array<T>;
// 	move(from: number, to: number): void;
// }
function roll(dice) {
    dice = dice.toLowerCase();
    if (!dice.includes("d")) {
        return -1;
    }
    let result = 0;
    let count = parseInt(dice.split("d")[0]);
    let size = parseInt(dice.split("d")[1]);
    for (let i = 0; i < count; i++) {
        result += rollDie(size);
    }
    return result;
}
function rollDie(size = 20, modifier = 0, advantage = 0) {
    var rolledResult = Math.floor((Math.random() * size)) + 1;
    for (let index = 0; index < advantage; index++) {
        const newRoll = Math.floor((Math.random() * size)) + 1;
        ;
        rolledResult = Math.max(rolledResult, newRoll);
    }
    rolledResult += modifier;
    return rolledResult;
}
function getRandomInt(start, end) {
    let rollResult = rollDie(1 + end - start, -1);
    return start + rollResult;
}
function chance(percent = 50) {
    var rolledResult = false;
    if (Math.floor((Math.random() * 100)) < percent) {
        rolledResult = true;
    }
    return rolledResult;
}
function getProperty(o, propertyName) {
    return o[propertyName]; // o[propertyName] is of type T[K]
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
    return null;
}
;
function arrayAppend(array, item, unique = false) {
    if (array !== undefined && array !== null) {
        if (array.constructor === Array) {
            if (!unique || !array.includes(item)) {
                array.push(item);
            }
        }
        else {
            if (!unique || array != item) {
                array = [array, item];
            }
        }
        return array;
    }
    else {
        return [item];
    }
}
// Array.prototype.append = function (item: any) {
// 	return arrayAppend(this, item);
// };
// Array.prototype.move = function (from: number, to: number) {
// 	this.splice(to, 0, this.splice(from, 1)[0]);
// };
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function saveJSON(json, fileName) {
    var cstring = JSON.stringify(json);
    var charblob = new Blob([cstring], { type: "application/json" });
    var url = URL.createObjectURL(charblob);
    var a = document.createElement('a');
    a.download = fileName + ".json";
    a.href = url;
    a.type = "file";
    $("body").append($(a));
    // $(a).click();
    a.click();
    window.URL.revokeObjectURL(url);
    // $(a).remove();
}
function randomize(array, weighted = false) {
    if (weighted == true) {
        try {
            // check if there are the same number of weights as items
            if (array.length % 2 == 0) {
                var result;
                var totalWeight = 0;
                for (let i = 1; i <= array.length / 2; i++) {
                    const e = array[(i * 2) - 1];
                    totalWeight += e;
                }
                var rand = Math.random() * totalWeight;
                var currentWeight = 0;
                for (let i = 1; i <= array.length / 2; i++) {
                    const e = array[(i * 2) - 1];
                    currentWeight += e;
                    if (rand < currentWeight) {
                        result = array[(i * 2) - 2];
                        break;
                    }
                }
                return result;
            }
            else {
                throw console.error("Error occurred randomizing. Array is not properly weighted.");
            }
        }
        catch (e) {
            throw console.error("Error occurred randomizing. Input was most likely not an array.");
        }
    }
    else {
        try {
            var result = array[Math.floor(Math.random() * array.length)];
            return result;
        }
        catch (e) {
            throw console.error("Error occurred randomizing. Input was most likely not an array.");
        }
    }
}
function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
;
function statGen(modifier = 0) {
    var lowest = 6;
    var rolledResult = 0;
    for (let index = 0; index < 4; index++) {
        const newRoll = Math.floor((Math.random() * 6)) + 1;
        rolledResult += newRoll;
        lowest = Math.min(lowest, newRoll);
    }
    rolledResult += modifier;
    rolledResult -= lowest;
    return rolledResult;
}
class Attributes {
    constructor(str = 10, dex = 10, con = 10, wis = 10, int = 10, cha = 10) {
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.wis = wis;
        this.int = int;
        this.cha = cha;
    }
    get strMod() {
        return Math.floor((this.str - 10) / 2);
    }
    get dexMod() {
        return Math.floor((this.dex - 10) / 2);
    }
    get conMod() {
        return Math.floor((this.con - 10) / 2);
    }
    get wisMod() {
        return Math.floor((this.wis - 10) / 2);
    }
    get intMod() {
        return Math.floor((this.int - 10) / 2);
    }
    get chaMod() {
        return Math.floor((this.cha - 10) / 2);
    }
}
class Stats {
    constructor(attributes = new Attributes(), speed = 30, size = "medium", ac, hp) {
        this.attributes = attributes;
        this.speed = speed;
        this.size = size;
        this.ac = ac || 10 + this.attributes.dexMod;
        this.hp = hp || 6 + this.attributes.conMod;
    }
}
class LocalStorageHelper {
    get day() {
        return parseFloat(localStorage.day);
    }
    get hour() {
        return parseFloat(localStorage.hour);
    }
    get isGM() {
        return localStorage.isGM == "true";
    }
    set isGM(value) {
        localStorage.isGM = value;
    }
    get month() {
        return parseFloat(localStorage.month);
    }
    /** Influences how some pages display and function. */
    get ruleSet() {
        return localStorage.ruleSet || "PF2e";
    }
    /** Influences how some pages display and function. */
    set ruleSet(value) {
        localStorage.ruleSet = value;
    }
    get showGMNotes() {
        return localStorage.showGMNotes == "true";
    }
    set showGMNotes(value) {
        localStorage.showGMNotes = value;
    }
    get userId() {
        return parseFloat(localStorage.userId);
    }
    set userId(value) {
        localStorage.userId = value;
    }
    get userName() {
        return localStorage.userName;
    }
    set userName(value) {
        localStorage.userName = value;
    }
    get year() {
        return parseFloat(localStorage.year);
    }
}
/** Helps present correct terminology for different RPG rule sets. All strings are returned in title case unless otherwise noted. */
class TerminologyHelper {
    constructor() {
        this.Item = {
            get Level() {
                return Sc.Terminology.is5e ? "Rarity" : "Level";
            }
        };
        this.System = {
            /** The generally accepted community abbreviation for the system (e.g. '5e', 'PF2e') */
            get Abbreviation() {
                return Sc.Terminology.is5e ? "5e" : "PF2e";
            },
            get EditionAbbreviation() {
                return Sc.Terminology.is5e ? "5e" : "2e";
            },
            get GameAbbreviation() {
                return Sc.Terminology.is5e ? "D&D" : "PF";
            },
            get GameFullName() {
                return Sc.Terminology.is5e ? "Dungeons & Dragons" : "Pathfinder";
            }
        };
    }
    get is5e() {
        return Sc.LocalStorage.ruleSet == "5e";
    }
    get isPF2e() {
        return Sc.LocalStorage.ruleSet == "PF2e";
    }
}
/** A wrapper for generic things that will likely be needed all over the place. */
class SethCommon {
    constructor() {
        this.LocalStorage = new LocalStorageHelper();
        this.Terminology = new TerminologyHelper();
    }
}
//#region Global Constants
/**Global constant for SethCommon. */
const Sc = new SethCommon();
/**Global constant for LocalStorageHelper. */
const storage = Sc.LocalStorage;
//#endregion Global Constants
//# sourceMappingURL=mechanics.js.map