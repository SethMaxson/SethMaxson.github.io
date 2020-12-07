import { Engine } from './engine.js';
import { Dialog } from './dialog.js';

declare interface String {
	capitalize(): string;
	replaceAll(search: string, replacement: string): string;
}

// declare interface Array<T> {
// 	capitalize(): string;
// 	replaceAll(search: string, replacement: string): string;
// 	append(item: T): Array<T>;
// 	move(from: number, to: number): void;
// }

function rollDie(size: number = 20, modifier: number = 0, advantage: number = 0): number
{
	var rolledResult = Math.floor((Math.random() * size)) + 1;
	for (let index = 0; index < advantage; index++) {
		const newRoll = Math.floor((Math.random() * size)) + 1;;
		rolledResult = Math.max(rolledResult, newRoll);
	}
	rolledResult += modifier;
	return rolledResult;
}

function chance(percent: number = 50): boolean {
	var rolledResult = false;
	if (Math.floor((Math.random() * 100)) < percent) {
		rolledResult = true;
	}
	return rolledResult;
}

function arrayAppend(array: any, item: any): Array<any> {
	if (array !== undefined && array !== null) {
		if (array.constructor === Array) {
			array.push(item);
		}
		else
		{
			array = [array, item];
		}
		return array;
	} else {
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
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
//@ts-ignore
String.prototype.replaceAll = function(search: string, replacement: string) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function saveJSON(json: JSON|Object, fileName: string) {
	var cstring=JSON.stringify(json);
	var charblob = new Blob([cstring], {type: "application/json"});
	var url = URL.createObjectURL(charblob);

	var a = document.createElement('a');
	a.download = fileName+".json";
	a.href = url;
	a.type = "file";
	$("body").append($(a));
	// $(a).click();
	a.click();
	window.URL.revokeObjectURL(url);

	// $(a).remove();
}

class DialogWindow
{
	element: JQuery<HTMLElement>;
	constructor(speaker: string, text: string, showCloseIcon: boolean = false)
	{
		let icon = showCloseIcon ? `<div class="close" >&#10003;</div>` : "";
		this.element = $(`<div class="speech"><h1>${ speaker }</h1\><p>"${ text }"</p>${ icon }</div>`);
		$(document.body).append(this.element);
	}
	append(button: AnswerButton)
	{
		this.element.append(button.element);
	}
}

class AnswerButton
{
	element: JQuery<HTMLElement>;
	constructor(index: number, answer: Dialog.DialogAnswer, dialog: JQuery<HTMLElement>, speech: Dialog.Dialog[])
	{
		this.element = $("<button>" + answer.m + "</button>");
		this.element.attr("index", index);
		this.element.attr("next", answer.next);
		let button = this.element;
		if (answer.next == "exit") {
			button.click(function(ev){
				ev.preventDefault();
				dialog.remove();
			});
		} else {
			button.click(function(ev){
				ev.preventDefault();
				dialog.remove();
				speak(speech, find_label(speech, answer.next));
			});
		}
	}
}

interface SpeakEventData
{
	tree: Dialog.Dialog[];
	dialog: Dialog.Dialog;
	current_line_index: number;
	callback?: Function;
	character?: Engine.Entity;
}

function speak(speaker: string|Dialog.Dialog[], speech:number|string, callback?: Function, character?: Engine.Entity) {
	if (speaker.constructor === Array) {
		var current_line = speech as number || 0;
		if (current_line < speaker.length)
		{
			let current_step = speaker[current_line] as Dialog.Dialog;
			if (current_step.m !== undefined)
			{
				if (current_step.answers !== undefined)
				{
					let dialog = new DialogWindow(current_step.s as string, current_step.m);
					for (let i = 0; i < current_step.answers.length; i++)
					{
						dialog.append(new AnswerButton(i, current_step.answers[i], dialog.element, speaker as Dialog.Dialog[]));
					}
					$(dialog.element).find("button").first().addClass("selected");
				}
				else
				{
					new DialogWindow(current_step.s as string, current_step.m, true);
				}
				$(document).on("keydown", { tree: speaker, dialog: current_step, current_line_index: current_line, callback: callback, character: character } as SpeakEventData, speechHandler);
			}
			else
			{
				speak(speaker, ++current_line, callback);
			}
		}
		else {
			if (typeof callback === "function") callback();
		}
	}
	else {
		speakWithoutDialog(speaker as string, speech as string, callback);
	}
}
function speakWithoutDialog(speaker: string, speech: string, callback?: Function)
{
	let tempDialog = {
		s: speaker,
		m: speech
	};
	new DialogWindow(speaker, speech as string, true);
	$(document).on(
		"keydown",
		{
			tree: [
				tempDialog
			] as Dialog.Dialog[],
			dialog: tempDialog,
			current_line_index: 0,
			callback: callback
		} as SpeakEventData,
		speechHandler
	);
}

function speechHandler(e: JQuery.KeyDownEvent)
{
	let data: SpeakEventData = e.data;
	let current_branch = data.tree[data.current_line_index];
	switch (e.keyCode) {
		case 13: // enter
			// progress dialog
			let next: string | undefined;
			let chosenAnswer: Dialog.DialogAnswer | undefined;
			if ($('.speech button.selected').length > 0 && current_branch.answers)
			{
				chosenAnswer = current_branch.answers[parseInt($('.speech button.selected').attr("index") as string)];
				next = chosenAnswer.next;
			} else {
				next = current_branch.next;
			}
			$(document).off("keydown", speechHandler);

			$(".speech").remove();
			if (chosenAnswer != undefined && chosenAnswer.function) {
				chosenAnswer.function(data.character);
			}
			if (next !== undefined && next !== "exit" && next !== "") {
				speak(data.tree, find_label(data.tree, next), data.callback, data.character);
			} else if (next !== "exit") {
				speak(data.tree, ++data.current_line_index, data.callback, data.character);
			} else {
				if(typeof data.callback === "function") {
					data.callback();
				} else {
					console.log("callback() isn't registering as a function.");
				}
			}
			break;
		case 38: // up
		case 87: // w
			// move selected position up
			var index = parseInt($('.speech button.selected').attr("index") as string);
            if(index > 0) {
                $('.speech button.selected').removeClass('selected');
                $('.speech button[index=' + (index - 1) + ']').addClass('selected');
			}
			else if (index == 0)
			{
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
function find_label(story: Dialog.Dialog[], label: string) {
	for (let i = 0; i < story.length; i++) {
		const line = story[i];
		if (line.label == label) {
			return i;
		}
	}
	return story.length - 1;
}

function randomize(array: any[], weighted: boolean = false) {
	if (weighted == true) {
		try {
			// check if there are the same number of weights as items
			if (array.length % 2 == 0) {
				var result;
				var totalWeight = 0;

				for (let i = 1; i <= array.length/2; i++) {
					const e = array[(i*2) - 1];
					totalWeight += e;
				}

				var rand = Math.random() * totalWeight;
				var currentWeight = 0;
				for (let i = 1; i <= array.length/2; i++) {
					const e = array[(i*2) - 1];
					currentWeight += e;
					if (rand < currentWeight) {
						result = array[(i*2) - 2];
						break;
					}
				}

				return result
			} else {
				throw console.error("Error occurred randomizing. Array is not properly weighted.");
			}
		} catch (e) {
			throw console.error("Error occurred randomizing. Input was most likely not an array.");
		}
	} else {
		try {
			var result = array[Math.floor(Math.random() * array.length)];
			return result
		} catch (e) {
			throw console.error("Error occurred randomizing. Input was most likely not an array.");
		}
	}
}

function randomProperty(obj: any) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

function statGen(modifier: number = 0) {
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

class Attributes
{
	str: number;
	dex: number;
	con: number;
	wis: number;
	int: number;
	cha: number;
	constructor(str: number = 10, dex: number = 10, con: number = 10, wis: number = 10, int: number = 10, cha: number = 10) {
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

class Stats
{
	attributes: Attributes;
	speed: number;
	size: string;
	ac: number;
	hp: number;
	constructor(attributes: Attributes = new Attributes(), speed: number = 30, size: string = "medium", ac: number, hp: number)
	{
		this.attributes = attributes;
		this.speed = speed;
		this.size = size;
		this.ac = ac || 10 + this.attributes.dexMod;
		this.hp = hp || 6 + this.attributes.conMod;
	}
}