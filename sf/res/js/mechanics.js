// declare interface Array<T> {
// 	capitalize(): string;
// 	replaceAll(search: string, replacement: string): string;
// 	append(item: T): Array<T>;
// 	move(from: number, to: number): void;
// }
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
function chance(percent = 50) {
    var rolledResult = false;
    if (Math.floor((Math.random() * 100)) < percent) {
        rolledResult = true;
    }
    return rolledResult;
}
function arrayAppend(array, item) {
    if (array !== undefined && array !== null) {
        if (array.constructor === Array) {
            array.push(item);
        }
        else {
            array = [array, item];
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
//@ts-ignore
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
//@ts-ignore
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
class DialogWindow {
    constructor(speaker, text, showCloseIcon = false) {
        let icon = showCloseIcon ? `<div class="close" >&#10003;</div>` : "";
        this.element = $(`<div class="speech"><h1>${speaker}</h1\><p>"${text}"</p>${icon}</div>`);
        $(document.body).append(this.element);
    }
    append(button) {
        this.element.append(button.element);
    }
}
class AnswerButton {
    constructor(index, answer, dialog, speech) {
        this.element = $("<button>" + answer.m + "</button>");
        this.element.attr("index", index);
        this.element.attr("next", answer.next);
        let button = this.element;
        if (answer.next == "exit") {
            button.click(function (ev) {
                ev.preventDefault();
                dialog.remove();
            });
        }
        else {
            button.click(function (ev) {
                ev.preventDefault();
                dialog.remove();
                speak(speech, find_label(speech, answer.next));
            });
        }
    }
}
function speak(speaker, speech, callback, character) {
    if (speaker.constructor === Array) {
        var current_line = speech || 0;
        if (current_line < speaker.length) {
            let current_step = speaker[current_line];
            if (current_step.m !== undefined) {
                if (current_step.answers !== undefined) {
                    let dialog = new DialogWindow(current_step.s, current_step.m);
                    for (let i = 0; i < current_step.answers.length; i++) {
                        dialog.append(new AnswerButton(i, current_step.answers[i], dialog.element, speaker));
                    }
                    $(dialog.element).find("button").first().addClass("selected");
                }
                else {
                    new DialogWindow(current_step.s, current_step.m, true);
                }
                $(document).on("keydown", { tree: speaker, dialog: current_step, current_line_index: current_line, callback: callback, character: character }, speechHandler);
            }
            else {
                speak(speaker, ++current_line, callback);
            }
        }
        else {
            if (typeof callback === "function")
                callback();
        }
    }
    else {
        speakWithoutDialog(speaker, speech, callback);
    }
}
function speakWithoutDialog(speaker, speech, callback) {
    let tempDialog = {
        s: speaker,
        m: speech
    };
    new DialogWindow(speaker, speech, true);
    $(document).on("keydown", {
        tree: [
            tempDialog
        ],
        dialog: tempDialog,
        current_line_index: 0,
        callback: callback
    }, speechHandler);
}
function speechHandler(e) {
    let data = e.data;
    let current_branch = data.tree[data.current_line_index];
    switch (e.keyCode) {
        case 13: // enter
            // progress dialog
            let next;
            let chosenAnswer;
            if ($('.speech button.selected').length > 0 && current_branch.answers) {
                chosenAnswer = current_branch.answers[parseInt($('.speech button.selected').attr("index"))];
                next = chosenAnswer.next;
            }
            else {
                next = current_branch.next;
            }
            $(document).off("keydown", speechHandler);
            $(".speech").remove();
            if (chosenAnswer != undefined && chosenAnswer.function) {
                chosenAnswer.function(data.character);
            }
            if (next !== undefined && next !== "exit" && next !== "") {
                speak(data.tree, find_label(data.tree, next), data.callback, data.character);
            }
            else if (next !== "exit") {
                speak(data.tree, ++data.current_line_index, data.callback, data.character);
            }
            else {
                if (typeof data.callback === "function") {
                    data.callback();
                }
                else {
                    console.log("callback() isn't registering as a function.");
                }
            }
            break;
        case 38: // up
        case 87: // w
            // move selected position up
            var index = parseInt($('.speech button.selected').attr("index"));
            if (index > 0) {
                $('.speech button.selected').removeClass('selected');
                $('.speech button[index=' + (index - 1) + ']').addClass('selected');
            }
            else if (index == 0) {
                $('.speech button.selected').removeClass('selected');
                $('.speech button[index=' + ($('.speech button').length - 1) + ']').addClass('selected');
            }
            break;
        case 40: // down
        case 83: // s
            // move selected position down
            var selected_item = $('.speech .selected');
            if (typeof selected_item.next()[0] !== 'undefined') {
                selected_item.next().addClass('selected');
                selected_item.removeClass('selected');
            }
            else if (selected_item != undefined) {
                $('.speech button.selected').removeClass('selected');
                $('.speech button[index=0]').addClass('selected');
            }
            break;
        default:
            break;
    }
    return 0;
}
/**
 * Finds the index of a Label within a Dialog tree.
 * @param story - the Dialog tree to be searched
 * @param label - the label to search for
 * @returns the zero-based index of the label within the Dialog.
*/
function find_label(story, label) {
    for (let i = 0; i < story.length; i++) {
        const line = story[i];
        if (line.label == label) {
            return i;
        }
    }
    return story.length - 1;
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
//# sourceMappingURL=mechanics.js.map