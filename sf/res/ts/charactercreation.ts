var ccm: CharacterCreationManager, ccdm: CharacterCreationDataManager;
class CharacterCreationDataManager {
	classes: CharacterClass[] = [];
	feats?;
	races: Race[] = [];
	themes: Theme[] = [];
	constructor() {
		this.feats = null;
	}
}
class CharacterCreationManager
{
	character: Character;
	element: JQuery<HTMLElement>;
	isDirty: boolean;
	detailsPage: DetailsPage;
	racePage: RacePage;
	themePage: ThemePage;
	classPage: ClassPage;
	abilityPage: AbilityPage;
	progressionPage: ProgressionPage;
	constructor(char: Character) {
		this.character = char;
		this.element = $(`
			<div id="creation-steps" style="display:none;"">
				<div id="modal-blocker"></div>
			</div>
		`);
		this.isDirty = false;
		this.detailsPage = new DetailsPage(this);
		this.racePage = new RacePage(this);
		this.themePage = new ThemePage(this);
		this.classPage = new ClassPage(this);
		this.abilityPage = new AbilityPage(this);
		this.progressionPage = new ProgressionPage(this);
		$("body").append(this.element);
	}
	hideAll() {
		this.element.find(".modal").hide();
	}
	show() {
		this.element.show();
		this.element.find("#modal-blocker").show();
		this.detailsPage.show();
		// this.racePage.show();
	}
	finish() {
		this.hideAll();
		$("#modal-blocker").hide();
		enableScroll();
		populateCharacterSheet(this.character);
	}
}

function prepareCharacterCreationModal(char: Character) {
	ccm = new CharacterCreationManager(char);
	ccdm = new CharacterCreationDataManager();
}

function updateRace(name: string, subraceName?: string) {
	name = name || "Human";
	subraceName = subraceName || "";

	let race = ccdm.races.filter(function (entry: Race) {
		return entry.name === name;
	})[0];
	// if (subraceName.length > 0) {
	// 	race = race.subraces.filter(function (entry) {
	// 		return entry.name === subraceName;
	// 	})[0];
	// }
	ccm.character.race = new Race(race, subraceName);
	ccm.racePage.show();
}

function getRaceOptionEntry(item: Race) {
	const id = item.hasOwnProperty('ID')? item.ID.toLowerCase() : item.name.toLowerCase();
	const l = "/sf/img/portraits/" + id + ".png";
	if (item.hasOwnProperty('subraces')) {
		let subraces = $("<ul class=\"options\"></ul>");
		for (let index = 0; index < item.subraces.length; index++) {
			const subItem = item.subraces[index];
			const subId = subItem.hasOwnProperty('ID')? subItem.ID.toLowerCase() : subItem.name.toLowerCase();
			subraces.append(
				$(`<li class="subrace-option" name="${subItem.name}">
					<div class="header">
						<img src="/sf/img/portraits/${subId}.png" class="token" onerror="imgError(this)" />
						<div class="name">${subItem.name}</div>
					</div>
				</li>`)
			);
		}
		return $(`<li class="race-option" name="${item.name}">
			<div class="option-header">
				<img src="${l}" class="token" onerror="imgError(this)" />
				<div class="name">${item.name}</div>
			</div>
			<div class="option-details">
				<ul class="options">{subraces.html()}</ul>
			</div>
		</li>`);
	} else {
		return $(`<li class="race-option" name="${item.name}">
			<div class="header">
				<img src="${l}" class="token" onerror="imgError(this)" />
				<div class="name">${item.name}</div>
			</div>
		</li>`);
	}
}

$(document).ready(function(){
	$(document.body).on("click", ".option-header", function(){
		$(this).parent().toggleClass("expanded");
	});
	$(document.body).on("click", ".race-option>.header", function(){
		const raceName = $(this).closest(".race-option").attr("name");
		if (raceName != undefined) {
			updateRace(raceName, "");
		}
	});
	$(document.body).on("click", ".subrace-option>.header", function(){
		const raceName = $(this).closest(".race-option").attr("name");
		const subraceName = $(this).closest(".subrace-option").attr("name");
		if (raceName != undefined) {
			updateRace(raceName, subraceName);
		}
	});
	$(document.body).on("change", ".builder-option", function(){
		selectCharacterOption(this);
	});
})

function levelUpModalComplete(){
	const modal = $("#level-up");
	const classVal = modal.find(".class-options .value").val() as string;
	destroyModal(modal);
}
function closeModal(modal: JQuery<HTMLElement>) {
	$(modal).hide();
	if ($('.modal:visible').length == 0) {
		$("#modal-blocker").hide();
	}
}
function previousModal() {
	const modal = $('.modal:visible');
	modal.prev().show();
	modal.hide();
}
function nextModal() {
	const modal = $('.modal:visible');
	modal.next().show();
	modal.hide();
	if ($('.modal:visible').length == 0) {
		$("#modal-blocker").hide();
	}
}
function destroyModal(modal: string|JQuery<HTMLElement>) {
	$(modal).remove();
	if ($('.modal:visible').length == 0) {
		$("#modal-blocker").hide();
	}
}
function selectCharacterOption(sender: JQuery<HTMLElement>) {
	sender = $(sender);
	sender.closest(".subsection").find(".option-content").text(sender.val() as string);
}

/********* Stat Generator*********/
function changeBase(e: Event)
{
	const o=Number($("#budget").val());
	let a = 0;
	const target: HTMLInputElement = this;
	$(".base").each((e, o) => a += getCost(Number(o.value)));
	if (a > o)
	{
		if (target.dataset.prev != undefined)
			return target.value = target.dataset.prev;
	}
	target.dataset.prev = target.value, $("#remaining").val(o - a), changeTotal()
}
function getCost(e: number): number{
	// return e<14?e-8:14===e?7:9;
	return e-10;
}
function changeTotal(){
	$("#pointbuy tr[id]").each((e,o)=>{
		const [a, r, t, n, c] = $("input", o).get() as HTMLInputElement[];
		var s=n.value=(Number(a.value)+Number(r.value)+Number(t.value)).toString();
		c.value=Math.floor((parseInt(s)-10)/2).toString();
	})
}

/************ Menu ************/
function showMenu() {
	const newpage = new ModalPopup("", "", "Menu", "X");
	newpage.backLabel = "";
	newpage.next = "destroyModal('.load-prompt'); $('.no-scroll').removeClass('no-scroll');";
	newpage.element.addClass("load-prompt");
	newpage.content = `<button class="load-button create-new">
		Create New Character
	</button>
	<button class="load-button load-existing">
		Load Existing Character
	</button>
	<a class="load-button save-character" style="margin-top:0.5em;">
		Save
	</a>`;
	const a: HTMLAnchorElement = newpage.element.find(".save-character")[0] as HTMLAnchorElement;
	var charname = (document.getElementById("Charname") as HTMLInputElement).value;
	var cstring=JSON.stringify(ccm.character.json);
	var charblob = new Blob([cstring], {type: "application/json"});
	var url = URL.createObjectURL(charblob);

	a.download    = charname+".json";
	a.href        = url;
	a.textContent = "Save";

	$("body").append(newpage.element);
	disableScroll();
}
function showLoadPlayerSelectMenu() {
	$.ajax({ crossDomain: true, url: "/sf/res/data/characters/index.json", dataType: 'json' }).done(
		function(returnedData){
			var players = "";
			for (let i = 0; i < returnedData.items.length; i++) {
				const e = returnedData.items[i];
				players += `<button class="load-button" onclick="destroyModal('.load-player-select-menu'); showLoadCharacterSelectMenu('${e.player}');">
					${e.player}
				</button>`;
			}

			$("body").append(`<div class="modal load-player-select-menu details">
				<div class="modal-header">
					<div class="back button" onclick="cancelLoadPlayerSelectMenu();">&lt; Prev</div>
					<h2>Which Player?</h2>
				</div>
				<div class="modal-content">
					${players}
				</div>
			</div>`);
		}
	)
}
function showLoadCharacterSelectMenu(player: string) {

	$.ajax({ crossDomain: true, url: "/sf/res/data/characters/index.json", dataType: 'json' }).done(
		function(returnedData){
			var options = "";
			var items = returnedData.items.filter(function (entry: any) {
				return entry.player === player;
			})[0].characters;
			for (let i = 0; i < items.length; i++) {
				const e = items[i];
				options += `<button class="load-button" onclick="loadCharacter('${e}')">
					${e}
				</button>`;
			}

			$("body").append(`<div class="modal load-character-select-menu details">
				<div class="modal-header">
					<div class="back button" onclick="cancelLoadCharacterSelectMenu();">&lt; Prev</div>
					<h2>Which Character?</h2>
				</div>
				<div class="modal-content">
					${options}
				</div>
			</div>`);
		}
	)
}
$(document).on("click", ".load-prompt .create-new", function() {
	destroyModal('.load-prompt');
	ccm.show();
});
$(document).on("click", ".load-prompt .load-existing", function() {
	showLoadPlayerSelectMenu();
	destroyModal('.load-prompt');
});
function cancelLoadPlayerSelectMenu(){
	showMenu();
	destroyModal('.load-player-select-menu');
}
function cancelLoadCharacterSelectMenu(){
	showLoadPlayerSelectMenu();
	destroyModal('.load-character-select-menu');
}
function loadCharacter(name: string) {
	destroyModal('.load-character-select-menu');
	ccm.character.loadJson(name).then(function(){
		populateCharacterSheet(ccm.character);
		enableScroll();
	});
}

class ModalPopup {
	element: JQuery<HTMLElement>;
	id: string;
	constructor(id: string, back: string, header: string, next: string) {
		this.id = id || "";
		back = back || "&lt; Prev";
		header = header || "";
		next = next || "Next >";
		id = this.id.length>0? ` id="${this.id}"`:"";
		this.element = $(`<div${id} class="modal details"></div>`);
		this.element.html(`
		<div class="modal-header">
			<div class="back button"></div>
			<h2>${header}</h2>
			<div class="select button"></div>
		</div>
		<div class="modal-content"></div>
		`);
		this.backLabel = back;
		this.nextLabel = next;
	}
	set header(val: string) {
		this.element.find(".modal-header>h2").html(val);
	}
	set content(val: string) {
		this.element.find(".modal-content").html(val);
	}
	set back(val: string) {
		this.element.find(".modal-header>.back").attr("onclick", val);
	}
	set next(val: string) {
		this.element.find(".modal-header>.select").attr("onclick", val);
	}
	set backLabel(val: string) {
		if (val.length > 0) {
			this.element.find(".modal-header>.back").html(val);
		} else {
			this.element.find(".modal-header>.back").hide();
		}
	}
	set nextLabel(val: string) {
		if (val.length > 0) {
			this.element.find(".modal-header>.select").html(val);
		} else {
			this.element.find(".modal-header>.select").hide();
		}
	}

}

function enableScroll() {
	$(".no-scroll").removeClass("no-scroll");
}
function disableScroll() {
	$("body").addClass("no-scroll");
	$("#CharacterSheet").addClass("no-scroll");
}

/************ Modal Pages ************/
class CreationPage
{
	parent: any;
	id: string;
	element: JQuery<HTMLElement>;
	constructor(parent: any, id: string, back: string, header: string, next: string) {
		this.parent = parent;
		this.id = id || "";
		back = back || "&lt; Prev";
		header = header || "";
		next = next || "Next >";
		id = this.id.length>0? ` id="${this.id}"`:"";
		this.element = $(`<div${id} class="modal details"></div>`);
		this.element.html(`
		<div class="modal-header">
			<button class="back button"></button>
			<h2>${header}</h2>
			<button class="select button"></button>
		</div>
		<div class="modal-content"></div>
		`);
		this.backLabel = back;
		this.nextLabel = next;
		this.parent.element.append(this.element);
	}
	set header(val: string) {
		this.element.find(".modal-header>h2").html(val);
	}
	set content(val: string) {
		this.element.find(".modal-content").html(val);
	}
	set back(val: string) {
		this.element.find(".modal-header>.back").attr("onclick", val);
	}
	set next(val: string) {
		this.element.find(".modal-header>.select").attr("onclick", val);
	}
	set backLabel(val: string) {
		if (val.length > 0) {
			this.element.find(".modal-header>.back").html(val);
		} else {
			this.element.find(".modal-header>.back").hide();
		}
	}
	set nextLabel(val: string) {
		if (val.length > 0) {
			this.element.find(".modal-header>.select").html(val);
		} else {
			this.element.find(".modal-header>.select").hide();
		}
	}
	show() {
		this.parent.hideAll();
		this.element.show();
	}
	$(toFind: string) {
		return this.element.find(toFind);
	}
}
class DetailsPage extends CreationPage {
	constructor(parent: CharacterCreationManager) {
		super(parent, "ability-options", "&lt; Menu", "Step 1. - Character Details", "Next >");
		this.back = "showMenu(); ccm.hideAll();"
		this.update();
		this.content = `
			<div class="autocomplete" style="width:300px;">
				<input id="name-input" type="text" name="name" placeholder="Name" />
				<input id="gender-input" type="text" name="gender" placeholder="Gender" />
				<input id="homeworld-input" type="text" name="home-world" placeholder="Home World" />
			</div>
		`;
		let target = this;
		this.$("button.select").on("click", function(){
			target.finish();
		});
		let worlds = ["Aballon","Absalom Station","Akiton","Aucturn","Apostae","Castrovel","Ceres","The Diaspora","Eox","Triaxus","Vesk Prime","Vesk-4","Vesk-3"];
		autocomplete(this.$("#homeworld-input")[0] as HTMLInputElement, worlds);
	}
	update() {

	}
	show() {
		super.show();
		this.update();
	}
	finish() {
		// this.parent.character
		this.parent.racePage.show();
	}
}
class RacePage extends CreationPage {
	constructor(parent: CharacterCreationManager) {
		super(parent, "race-options", "&lt; Prev", "Step 2. - Choose a Species", "Next >");
		// this.backLabel = "";
		this.back = "ccm.detailsPage.show();";
		this.next = "ccm.themePage.show();";
		this.update(true);
	}
	update(isChoose: boolean, name: string = "", subraceName?: string) {
		isChoose = isChoose || false;
		name = name || this.parent.character.race.name || "";
		subraceName = subraceName || this.parent.character.race.subrace || "";
		let target = this;
		if (name.length > 0) {
			this.element.find("button.select").removeAttr("disabled");
		} else {
			this.element.find("button.select").attr("disabled", "");
		}
		getRaces().done(function (returnedData: any) {
			var items: Race[] = returnedData.items;
			ccdm.races = items;
			var newBody = $("<div></div>");
			if (isChoose || name.length == 0) {
				let options = $("<ul class=\"options\"></ul>");
				newBody.append(options);
				for (let index = 0; index < items.length; index++) {
					const opt = getRaceOptionEntry(items[index]);
					options.append(opt);
				}
				newBody.append(options);
			} else {
				subraceName = subraceName || "";
				var item = ccdm.races.filter(function (entry: Race) {
					return entry.name === name;
				})[0];
				if (subraceName.length > 0) {
					item = item.subraces.filter(function (entry: Race) {
						return entry.name === subraceName;
					})[0];
				}
				const id = item.hasOwnProperty('ID')? item.ID.toLowerCase() : item.name.toLowerCase();
				const l = "/sf/img/portraits/" + id + ".png";

				var asi = "";
				if (item.hasOwnProperty('ability')) {
					for (let i = 0; i < Object.keys(item.ability).length; i++) {
						const e = Object.keys(item.ability)[i];
						const a = Object.keys(item.ability)[i];
						const val = item.ability[e];
						const sign = val<0? "":"+";
						asi += `<span class="ability">${sign}${val} ${a}</span>`;
					}
				}
				const description = `
					<div class="summary">
						<div class="header">
							<span class="name">${item.name}</span>
							${asi}
						</div>
						<div class="content fancy-details">
							<div><img src="${l}" class="token" onerror="imgError(this)" /></div>
							<div>${item.description}</div>
						</div>
					</div>
				`;
				const size = item.hasOwnProperty('size')? `<div class="subsection"><div class="header">Size</div><div class="content">Your size is ${item.size}.</div></div>` : "";

				var feats = "";
				if (item.features) {
					for (let index = 0; index < item.features.length; index++) {
						const feat = item.features[index];
						feats += "<div class=\"subsection\"><div class=\"header\">" + feat.name + "</div><div class=\"content\">" + feat.description + "</div></div>";
					}
				}
				newBody.append(
					$(`
						<div class="select-another"><span class="button" onclick="ccm.racePage.show(true);">Select Another Species</span></div>
						${description}
						${size}
						${feats}
					`)
				);
			}
			target.content = newBody.html();
		});
	}
	show(isChoose: boolean = false) {
		super.show();
		this.update(isChoose);
	}
}
class ThemePage extends CreationPage
{
	themes: Theme[] = [];
	constructor(parent: CharacterCreationManager) {
		super(parent, "theme-options", "&lt; Prev", "Step 3. - Choose a Theme", "Next >");
		this.back = "ccm.racePage.show();";
		this.next = "ccm.classPage.show();";
		let target = this;
		getThemes().done(function (returnedData)
		{
			ccdm.themes = returnedData.items;
			target.themes = returnedData.items;
			target.update(true);
		});
	}
	update(isChoose: boolean, name: string = "") {
		isChoose = isChoose || false;
		name = name || this.parent.character.theme.name || "";
		let target = this;
		if (name.length > 0) {
			this.element.find("button.select").removeAttr("disabled");
		} else {
			this.element.find("button.select").attr("disabled", "");
		}

		var newBody = $("<div></div>");
		if (isChoose || name.length == 0) {
			let options = $("<ul class=\"options\"></ul>");
			for (let index = 0; index < this.themes.length; index++) {
				const item = this.themes[index];
				let opt = $(`<li class="theme-option" name="${item.name}">
					<div class="header">
						<div class="name">${item.name}</div>
					</div>
				</li>`);
				options.append(opt);
				opt.on("click", function() {
					target.choose(item.name);
				});
			}
			newBody.append(options);
		} else {
			var item = this.themes.filter(function (entry) {
				return entry.name === name;
			})[0];
			const description = `<div class="summary"><div class="header"><span class="name">${item.name}</span><span class="ability">+${item.ability[Object.keys(item.ability)[0]]} ${Object.keys(item.ability)[0]}</span></div><div class="content">${item.description}</div></div>`;
			var feats = "";
			if (item.benefits) {
				for (let index = 0; index < item.benefits.length; index++) {
					const feat = item.benefits[index];
					feats += "<div class=\"subsection\"><div class=\"header\">" + feat.name +" [" + feat.level + (feat.level==1?"st": "th") + "]</div><div class=\"content\">" + feat.description + "</div></div>";
				}
			}
			newBody.append(
				$(`
					<div class="select-another"><span class="button" onclick="ccm.themePage.show(true);">Select Another Theme</span></div>
					${description}
					${feats}
				`)
			);
		}
		this.$(".modal-content").html("");
		this.$(".modal-content").append(newBody);
	}
	show(isChoose: boolean = false) {
		super.show();
		this.update(isChoose);
	}
	choose(name: string) {
		var item = this.themes.filter(function (entry: any) {
			return entry.name === name;
		})[0];
		this.parent.character.theme = new Theme(item);
		this.show();
	}
}
class ClassPage extends CreationPage {
	constructor(parent: CharacterCreationManager) {
		super(parent, "class-options", "&lt; Prev", "Step 4. - Choose a Class", "Next >");
		this.back = "ccm.themePage.show();";
		this.next = "ccm.abilityPage.show();";
		this.update(true);
	}
	update(isChoose: boolean, name: string = "") {
		isChoose = isChoose || false;
		name = name || this.parent.character.defaultClass || "";
		let target = this;
		if (name.length > 0) {
			this.element.find("button.select").removeAttr("disabled");
		} else {
			this.element.find("button.select").attr("disabled", "");
		}
		getClasses().done(function (returnedData) {
			var items: CharacterClass[] = returnedData.items;
			ccdm.classes = items;
			var newBody = $("<div></div>");
			if (isChoose || name.length == 0) {
				newBody = $("<ul class=\"options\"></ul>");
				for (let index = 0; index < items.length; index++) {
					const item = items[index];
					let opt = $(`<li class="class-option" name="${item.name}">
						<div class="header">
							<img src="/sf/img/classes/${item.name.toLowerCase()}.png" class="token" onerror="imgError(this)" />
							<div class="name">${item.name}</div>
						</div>
					</li>`);
					newBody.append(opt);
					opt.on("click", function(){
						target.select(item.name);
					});
				}
			} else {
				var item = items.filter(function (entry) {
					return entry.name === name;
				})[0];
				// get description
				const description = `
					<div class="summary">
						<div class="header">
							<span class="name">${item.name}</span>
						</div>
						<div class="content fancy-details">
							<div><img src="/sf/img/classes/${item.name.toLowerCase()}.png" class="token" onerror="imgError(this)" /></div>
							<div>${item.description}</div>
						</div>
					</div>
				`;
				// get Feats
				var feats = "";
				if (item.levels) {
					for (let index = 0; index < item.levels.length; index++) {
						const lvl = item.levels[index];
						if (lvl.hasOwnProperty('features')) {
							for (let j = 0; j < lvl.features.length; j++) {
								const feat = lvl.features[j];
								var options = "";
								if (feat.hasOwnProperty('options'))
								{
									options = `<div><select class="builder-option"><option value="none">- Select -</option>`;
									for (let i = 0; i < feat.options.length; i++) {
										const op = feat.options[i];
										options += `<option value="${op.name}">${op.name}</option>`
									}
									options += `</select></div><div class="option-content"></div>`;
								}
								feats += "<div class=\"subsection\"><div class=\"header\">" + feat.name + "</div><div class=\"content\">" + feat.description[0] + options + "</div></div>";
							}
						}
					}
				}
				newBody.append($(`
					<div class="select-another"><span class="button" onclick="ccm.classPage.show(true);">Select Another Class</span></div>
					${description}
					${feats}
				`));
				// newBody.append($(getClassBody(items, name)));
			}
			target.$(".modal-content").html("");
			target.$(".modal-content").append(newBody);
		});
	}
	show(isChoose: boolean = false) {
		super.show();
		this.update(isChoose);
	}
	select(name: string) {
		this.$(".class-option").removeClass("selected");
		$(this).closest(`.class-option[name="${name}"]`).addClass("selected");
		var item = ccdm.classes.filter(function (entry: CharacterClass) {
			return entry.name === name;
		})[0];
		const cls = new CharacterClass(item);
		this.parent.character.class = cls
		this.parent.character.classes.push(cls);
		this.parent.character.defaultClass = name;
		this.show();
	}
}
class AbilityPage extends CreationPage
{
	level: number;
	constructor(parent: CharacterCreationManager, lvl?: number) {
		super(parent, "ability-options", "&lt; Prev", "Step 5. - Point Buy", "Next >");
		this.back = "ccm.classPage.show();";
		this.update();
		this.level = lvl || parent.character.level || 0;
		this.content = `
			<div id="pointbuy">
				<label>Budget: <input id="budget" type="number" min="10" value="10"></label>
				<label>Remaining: <input id="remaining" type="number" min="10" value="10" readonly="" tabindex="-1"></label>
				<button type="button" id="reset" class="btn btn-default">Reset</button>
				<table style="margin-left:auto; margin-right:auto;">
					<tbody>
						<tr>
							<td></td>
							<td>Base</td>
							<td>Racial</td>
							<td>Theme</td>
							<td>Total</td>
							<td>Mod</td>
						</tr>
						<tr id="str">
							<td><b>STR</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" class="theme" readonly="" tabindex="-1"></td>
							<td><input type="number" value="10" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" readonly="" tabindex="-1"></td>
						</tr>
						<tr id="dex">
							<td><b>DEX</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" class="theme" readonly="" tabindex="-1"></td>
							<td><input type="number" value="10" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" readonly="" tabindex="-1"></td>
						</tr>
						<tr id="con">
							<td><b>CON</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly=""></td>
							<td><input type="number" value="0" class="theme" readonly=""></td>
							<td><input type="number" value="10" readonly=""></td>
							<td><input type="number" value="0" readonly=""></td>
						</tr>
						<tr id="int">
							<td><b>INT</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly=""></td>
							<td><input type="number" value="0" class="theme" readonly=""></td>
							<td><input type="number" value="10" readonly=""></td>
							<td><input type="number" value="0" readonly=""></td>
						</tr>
						<tr id="wis">
							<td><b>WIS</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" class="theme" readonly="" tabindex="-1"></td>
							<td><input type="number" value="10" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" readonly="" tabindex="-1"></td>
						</tr>
						<tr id="cha">
							<td><b>CHA</b></td>
							<td><input type="number" min="10" max="18" value="10" data-prev="10" class="base"></td>
							<td><input type="number" value="0" class="racial" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" class="theme" readonly="" tabindex="-1"></td>
							<td><input type="number" value="10" readonly="" tabindex="-1"></td>
							<td><input type="number" value="0" readonly="" tabindex="-1"></td>
						</tr>
					</tbody>
				</table>
			</div>
		`;
		let target = this;
		this.$(".base").each((e,o)=>{
			$(o).on("change",function(e){
				let o=parseInt((this as HTMLInputElement).value);
				let max=parseInt($(this).attr("max") as string);
				let min=parseInt($(this).attr("min") as string);
				isNaN(o)?(this as HTMLInputElement).value="10":(this as HTMLInputElement).value=Math.max(Math.min(o,max),min).toString();
				changeTotal();
			})
		});
		this.$(".base").on("input",changeBase);
		this.$("button.select").on("click", function(){
			target.finish();
		});
	}
	update() {
		var rA = this.parent.character.race.ability;
		var tA = this.parent.character.theme.ability;
		var pb = this.parent.character.ability.pointBuy;
		var spent = pb.str+pb.dex+pb.con+pb.int+pb.wis+pb.cha;
		this.$("#remaining").val(10-spent);
		this.$("#pointbuy tr[id]").each((e,o)=>{
			const [a, r, t, n, c] = $("input", o).get() as HTMLInputElement[];
			a.value = pb[o.id]+10;
			r.value = rA[o.id];
			t.value = tA[o.id];
			a.setAttribute("max", (18 - (Number(r.value) + Number(t.value))).toString());
		})
		changeTotal();
	}
	show() {
		super.show();
		this.update();
	}
	finish() {
		const[s,d,c,i,w,ch]=this.$("input.base").get() as HTMLInputElement[];
		const str = parseInt(s.value)-10 || 0;
		const dex = parseInt(d.value)-10 || 0;
		const con = parseInt(c.value)-10 || 0;
		const int = parseInt(i.value)-10 || 0;
		const wis = parseInt(w.value)-10 || 0;
		const cha = parseInt(ch.value)-10 || 0;
		this.parent.character.ability.pointBuy = new Abilities(str, dex, con, int, wis, cha);
		this.parent.progressionPage.show();
	}
}
class ProgressionPage extends CreationPage
{
	level: number;
	parent: CharacterCreationManager;
	constructor(parent: CharacterCreationManager) {
		super(parent, "character-progression", "&lt; Prev", "Step 6. - Character Progression", "Finish");
		this.back = "ccm.abilityPage.show();";
		this.parent = parent;
		this.level = parent.character.level || 1;
		this.content = `
			<select class=\"level-select\">
				<option value="1">Level 1</option>
				<option value="2">Level 2</option>
				<option value="3">Level 3</option>
				<option value="4">Level 4</option>
				<option value="5">Level 5</option>
				<option value="6">Level 6</option>
				<option value="7">Level 7</option>
				<option value="8">Level 8</option>
				<option value="9">Level 9</option>
				<option value="10">Level 10</option>
				<option value="11">Level 11</option>
				<option value="12">Level 12</option>
				<option value="13">Level 13</option>
				<option value="14">Level 14</option>
				<option value="15">Level 15</option>
				<option value="16">Level 16</option>
				<option value="17">Level 17</option>
				<option value="18">Level 18</option>
				<option value="19">Level 19</option>
				<option value="20">Level 20</option>
			</select>
			<ul class=\"options\"></ul>
		`;
		let target = this;
		this.$(".level-select").on("change", function() {
			target.update(parseInt($(this).val() as string));
		});
		this.$("button.select").on("click", function(){
			target.parent.finish();
		});
		this.update(this.level);
	}
	update(lvl?: number) {
		lvl = lvl || this.parent.character.level || 1;
		const list = this.$(".options");
		let target = this;
		this.level = lvl || this.parent.character.levels.length || 1;

		list.html("");
		for (let index = 1; index < this.level+1; index++) {
			let opt = $(`
			<li class="level-button">
				<div class="header">
					<div class="name">Level ${index}</div>
				</div>
			</li>`);
			list.append(opt);
			opt.on("click", function(){
				new CharacterLevelPage(target.parent, index);
			});
			if (this.parent.character.levels.length < index) {
				this.parent.character.levels.push(new CharacterLevel(this.parent.character.defaultClass));
			}
		}
		this.parent.character.levels.length = this.level;
	}
	show() {
		super.show();
		this.update();
	}
}
class CharacterLevelPage extends CreationPage
{
	characterLevel: number;
	classLevel: number;
	parent: CharacterCreationManager;
	level: CharacterLevel;
	constructor(parent: CharacterCreationManager, lvl: number) {
		lvl = lvl || 1;
		super(parent, "level-up", "&lt;", `Level ${lvl}`, "Finish");
		this.back = "destroyModal('#level-up'); ccm.progressionPage.show();";
		this.parent = parent;
		this.next = "levelUpModalComplete();";
		this.characterLevel = lvl;
		this.level = this.parent.character.levels[lvl-1];
		this.classLevel = this.parent.character.classLevel(this.level.class.name, this.characterLevel);
		this.$("button.select").attr("disabled", "");

		const classOptions = $(`<button class="class-options">1. Class Options <input type="text" class="value" disabled /></button>`);
		const feat = $(`<button class="feat">2. Select Feat <input type="text" class="value" disabled /></button>`);
		const asi = $(`<button class="asi">3. Ability Score Increase <input type="text" class="value" disabled /></button>`);
		if (lvl % 2 != 1) feat.attr("disabled", "").attr("readonly", "");
		if (lvl % 5 != 0) asi.attr("disabled", "").attr("readonly", "");

		this.content = `
		${classOptions[0].outerHTML}
		${feat[0].outerHTML}
		${asi[0].outerHTML}
		<button class="spend-skill-ranks skill-ranks">4. Skill Ranks <input type="hidden" class="value" disabled /></button>
		<input type="hidden" class="class" />
		<input type="hidden" id="level-up-feat" />
		<input type="hidden" class="asi" />
		<input type="hidden" class="ranks" />`;
		let target = this;
		this.$("button.class-options").on("click", function() {
			new ClassLevelPage(target);
		})
		this.$("button.feat").on("click", function() {
			new FeatLevelPage(target);
		})
		this.$("button.skill-ranks").on("click", function() {
			new SkillLevelPage(target);
		})
		this.$("button.asi").on("click", function() {
			new AbilityLevelPage(target);
		})
		this.update();
	}
	update() {
		let target = this;
		this.classLevel = this.parent.character.classLevel(this.level.class.name, this.characterLevel);
		// new, not functional
		const spentSkillRanks = this.level.skillRanks.ranks.reduce((a: number, b: number) => a + b, 0);
		// /new, not functional

		if (this.level.class.name !== undefined && this.level.class.name !== "") {
			var val = this.level.class.name;
			this.level.class.choices.forEach(choice => {
				val += "|" + choice.value;
			});
			this.$(".class-options .value").val(val);

			getClasses().done(function (returnedData) {
				let clvl = target.parent.character.classLevel(target.level.class.name);
				let clsData = returnedData.items.filter(function (entry: CharacterClass) {
					return entry.name === target.level.class.name;
				})[0];

				const spendableSkillRanks = target.parent.character.getAbilityModifiers().int
				+ (clsData != undefined? parseInt(clsData.skillRanks):0);

				if (classLevelOptionsCount(returnedData.items, target.level.class.name, clvl) <= target.level.class.choices.length) {
					target.$(".class-options").addClass("complete");
				}
				else {
					target.$(".class-options").removeClass("complete");
				}

				if (spentSkillRanks == spendableSkillRanks) target.$(".skill-ranks").addClass("complete");
				else target.$(".skill-ranks").removeClass("complete");
			});
		}
		if (this.level.feat !== undefined) {
			this.$(".feat .value").val(this.level.feat);
			this.$(".feat").addClass("complete");
		}


		if (this.$(".modal-content button:not(:disabled)").length == this.$(".modal-content button.complete").length) {
			this.$("button.select").removeAttr("disabled");
		} else {
			this.$("button.select").attr("disabled", "");
		}
	}
}
class ClassLevelPage extends CreationPage
{
	class: string;
	classObj?: CharacterClass;
	shownFeature;
	constructor(parent: CharacterLevelPage) {
		super(parent, "class-level-modal", "&lt;", "Select Class Options", "Finish");
		this.parent.parent.element.append(this.element);
		this.back = "destroyModal('#class-level-modal');";
		this.class = this.parent.level.class.name;
		this.shownFeature = undefined;

		this.$(".modal-content").addClass("entry-reader");
		let target = this;
		getClasses().done(function (returnedData) {
			var items = returnedData.items;
			target.$(".entry-reader").append($(`
				<div class="menu">
					<select class="classes"><option value="" disabled selected>- Select -</option></select>
					<ul class="options"></ul>
				</div>
			`));
			for (let index = 0; index < items.length; index++) {
				let nombre = items[index].name;
				target.$(".classes").append($(`<option value="${nombre}">${nombre}</option>`));
			}
			target.$(".entry-reader").append($(`
				<div class="preview-pane">
					<div class="name"></div>
					<div class="details"></div>
					<div class="source"></div>
				</div>
			`));
			target.$(".classes").val(target.class);
			target.update();
			target.$(".classes").on("change", function(){
				target.class = $(this).val() as string;
				target.update();
			});
		});

		this.$("button.select").on("click", function(){
			target.finish();
		});
	}
	update(subclassOnly: boolean = false) {
		let target = this;
		const name = this.class;

		if (!subclassOnly) this.$(".options").html("");
		this.parent.classLevel = this.parent.parent.character.classLevel(name, this.parent.characterLevel-1);
		getClasses().done(function (returnedData) {
			const lvl = target.parent.classLevel;
			var cls: CharacterClass = returnedData.items.filter(function (entry: CharacterClass) {
				return entry.name === name;
			})[0];
			target.classObj = cls;
			var clvl = cls.levels[lvl];
			if (!subclassOnly) {
				var features = clvl.hasOwnProperty("features")? clvl.features:[];
				for (let index = 0; index < features.length; index++) {
					let e = features[index];
					let opt = $(`
						<li name="${e.name}" title="${e.name}">
							<span class="name">${e.name} <input type="text" class="id" disabled /> <input type="text" class="value" disabled /></span>
							<span class="combatFeat">${e.type}</span>
						</li>
					`);
					if (e.hasOwnProperty('choice')) opt.addClass("has-options");
					target.$(".options").append(opt);
					opt.on("click", function() {
						target.displayClassFeature(name, lvl, e.name.replace("'", "\\'"));
					});
				}
			}

			// populate Subclass stuff
			target.$("li.subclass-option").remove();
			let classDef = target.parent.parent.character.classes.get(name);
			let subClsName = classDef != null? classDef.subclass : undefined;
			if (cls.hasOwnProperty("subclasses") && subClsName) {
				var subclass = cls.subclasses.filter(function (entry) {
					return entry.id === subClsName;
				})[0];
				subclass.levels.forEach(scLvl => {
					if (scLvl.level == lvl+1) {
						scLvl.features.forEach(e => {
							let opt = $(`
								<li name="${e.name}" title="${e.name}" class="subclass-option">
									<span class="name">${e.name} <input type="text" class="id" disabled /> <input type="text" class="value" disabled /></span>
									<span class="combatFeat">${e.type}</span>
								</li>
							`);
							if (e.hasOwnProperty('choice')) opt.addClass("has-options");
							target.$(".options").append(opt);
							opt.on("click", function() {
								target.displaySubclassFeature(name, lvl, e.name.replace("'", "\\'"));
							});
						});
					}
				});
			}
			target.checkClassLevelModal();
		});
	}
	checkClassLevelModal() {
		if (this.$(".has-options").length == this.$(".has-options.complete").length) {
			this.$(".modal-header button.select").removeAttr("disabled");
		} else {
			this.$(".modal-header button.select").attr("disabled", "");
		}
	}
	displayClassFeature(className: string, lvl: number, name: string) {
		if (this.classObj != undefined) {
			let target = this;
			var clvl = this.classObj.levels[lvl];
			var features = clvl.hasOwnProperty("features")? clvl.features:[];
			var feat = features.filter(function (entry: any) {
				return entry.name === name;
			})[0];
			target.$(".preview-pane .name").text(feat.name);
			var options = "";
			if (feat.hasOwnProperty('choice'))
			{
				options = `<div><select class="builder-option" choice-id="${feat.choice.id}"><option value="" disabled selected>- Select -</option>`;
				for (let i = 0; i < feat.choice.options.length; i++) {
					const op = feat.choice.options[i];
					options += `<option value="${op.name}">${op.name}</option>`
				}
				options += `</select></div><div class="option-content"></div>`;
			}
			target.$(".preview-pane .details").html(feat.description + options);
			target.$(".preview-pane .details .builder-option").on("change", function() {
				target.updateSelectedClassFeatureOption($(this));
				target.checkClassLevelModal();
			})
			target.shownFeature = feat;
		}
	}
	displaySubclassFeature(className: string, lvl: number, name: string)
	{
		if (this.classObj != undefined) {
			let target = this;
			if (this.classObj.hasOwnProperty("subclasses")) {
				this.classObj.subclasses.forEach(subclass => {
					subclass.levels.forEach(scLvl => {
						if (scLvl.level == lvl+1) {
							var feat = scLvl.features.filter(function (entry) {
								return entry.name === name;
							})[0];
							target.$(".preview-pane .name").text(feat.name);
							var options = "";
							if (feat.hasOwnProperty('choice'))
							{
								options = `<div><select class="builder-option" choice-id="${feat.choice.id}"><option value="" disabled selected>- Select -</option>`;
								for (let i = 0; i < feat.choice.options.length; i++) {
									const op = feat.choice.options[i];
									options += `<option value="${op.name}">${op.name}</option>`
								}
								options += `</select></div><div class="option-content"></div>`;
							}
							target.$(".preview-pane .details").html(feat.description + options);
							target.$(".preview-pane .details .builder-option").on("change", function() {
								target.updateSelectedClassFeatureOption($(this));
								target.checkClassLevelModal();
							})
							target.shownFeature = feat;
						}
					});
				});
			}
		}
	}
	updateSelectedClassFeatureOption(sender: JQuery<HTMLElement>) {
		const name = sender.closest(".preview-pane").find(".name").text();
		const val = sender.val() as string;
		const id = sender.attr("choice-id") as string;
		let target = $(`.menu li[name="${name}"`);
		target.addClass("complete");
		target.find(".id").val(id);
		target.find(".value").val(val);

		var option = this.shownFeature.choice.options.filter(function (entry) {
			return entry.name === val;
		})[0];
		$(".option-content").html(option.description);
		if (id == "Subclass") {
			this.update(true);
			this.parent.parent.character.classes.get(this.class).subclass = val;
		}
	}
	finish() {
		var val = this.$(".classes").val();
		const parent = this.parent;
		parent.level.class.name = val;
		parent.level.class.choices = [];
		this.$(".complete").each(function() {
			parent.level.class.choices.push({
				id: $(this).find(".id").val(),
				value: $(this).find(".value").val()
			});
		})
		destroyModal('#class-level-modal');
		this.parent.update();
	}
}
class FeatLevelPage extends CreationPage
{
	class: string;
	feats: FeatManager;
	constructor(parent: CharacterLevelPage) {
		super(parent, "feat-select", "&lt;", "Select a Feat", "Finish");
		this.parent.parent.element.append(this.element);
		this.back = "destroyModal('#feat-select');";
		this.class = this.parent.level.class.name;


		this.$(".modal-content").addClass("entry-reader");
		this.$("button.select").attr("disabled", "");
		let target = this;
		let char: Character = this.parent.parent.character;

		// start paste
		this.feats = new FeatManager();
		this.feats.init().done(function () {
			target.$(".modal-content").append($(`<div class="menu">
				<div class="label">
					<span class="name">Name</span>
					<span class="combatFeat">Combat Feat</span>
					<span class="source">Source</span>
				</div>
				<ul class=\"options\"></ul>
			</div>`));
			target.feats.filter(char);
			for (let index = 0; index < target.feats.filteredItems.length; index++) {
				let e = target.feats.filteredItems[index];
				let opt = $(`
					<li name="${e.name}" title="${e.name}">
						<span class="name">${e.name}</span>
						<span class="combatFeat">${e.combatFeat}</span>
						<span class="source source${e.source}">${e.source}</span>
					</li>
				`);
				target.$(".entry-reader .options").append(opt);
				opt.on("click", function() {
					target.displayFeat(e.name);
				});
			}
			target.$(".entry-reader ").append($(`
				<div class="preview-pane">
					<div class="name"></div>
					<div class="prerequisite"></div>
					<div class="details"></div>
					<div class="source"></div>
				</div>
			`));
			if (target.parent.level.feat != undefined) {
				target.displayFeat(target.parent.level.feat);
			}
		})

		this.$("button.select").on("click", function(){
			target.finish();
		});
	}
	displayFeat(name: string) {
		var feat = this.feats.filteredItems.filter(function (entry) {
			return entry.name === name;
		})[0];
		this.$(".preview-pane .name").text(feat.name);
		var preReqString: string = "";
		if (feat.prerequisites != undefined) {
			preReqString = typeof feat.prerequisites =="string"? feat.prerequisites: feat.prerequisites.description;
		}
		if (preReqString.length > 0) {
			this.$(".preview-pane .prerequisite").show();
			this.$(".preview-pane .prerequisite").html("Prerequisite(s): " + preReqString);
		} else {
			this.$(".preview-pane .prerequisite").hide();
		}
		this.$(".preview-pane .details").html(feat.description);
		this.$(".preview-pane .source").html(`<b>Source: </b><i>${feat.source}</i>, page ${feat.page}`);
		this.$("button.select").removeAttr("disabled");
	}
	finish() {
		const featName = this.$(".preview-pane .name").text();
		destroyModal('#feat-select');
		this.parent.level.feat = featName;
		this.parent.update();
	}
}
class SkillLevelPage extends CreationPage
{
	class: string;
	constructor(parent: CharacterLevelPage) {
		super(parent, "skill-point-spend", "&lt;", "Spend your Skill Points", "Finish");
		this.parent.parent.element.append(this.element);
		this.back = "destroyModal('#skill-point-spend');";
		this.class = this.parent.level.class.name;

		this.$(".modal-content").addClass("entry-reader");
		this.$("button.select").attr("disabled", "");
		let target = this;
		let char = this.parent.parent.character;

		// start paste
		const ranks = char.skillRanks(this.parent.characterLevel-1);
		const name = this.parent.level.class.name;
		const cl = parseInt(this.parent.characterLevel);
		const spendable = char.getAbilityModifiers().int;
		const lvlRanks = this.parent.level.skillRanks;

		getClasses().done(function (returnedData) {
			var items = returnedData.items;
			var clsData = items.filter(function (entry: CharacterClass) {
				return entry.name === name;
			})[0];
			const sr = clsData != undefined? parseInt(clsData.skillRanks):0;
			const spentRanks = lvlRanks.ranks.reduce((a: number, b: number) => a + b, 0);
			target.$(".modal-content").append($(`<div class="menu">
				<div class="label">
					Remaining Ranks:
					<input class="remaining-ranks" type="number" value="${spendable+sr-spentRanks}" disabled readonly />
				</div>
				<ul class=\"options\"></ul>
			</div>`));

			for (let i = 0; i < ranks.names.length; i++) {
				const n = ranks.names[i];
				const nID = n.replace(/\s/g, '-');
				const r = ranks.ranks[i];
				const lr = lvlRanks.ranks[i];
				let opt = $(`
					<li class="${nID}" name="${nID}" title="${n}">
						<span class="name">${n}</span>
						<button class="btn-decrease">&minus;</button>
						<span class="value"><input type="number" min="${r}" max="${cl}" value="${r + lr}" /></span>
						<button class="btn-increase">+</button>
					</li>
				`);
				target.$(".options").append(opt);
				opt.find(".btn-decrease").on("click", function() {
					target.skillDown(nID);
				});
				opt.find(".btn-increase").on("click", function() {
					target.skillUp(nID);
				});
				opt.on("click", function() {
					target.showDescription(nID);
				});
			}
			target.$(".entry-reader ").append($(`
				<div class="preview-pane">
					<div class="name"></div>
					<div class="details"></div>
				</div>
			`));
			target.update();
		});
		// end paste

		this.$("button.select").on("click", function(){
			target.finish();
		});
	}
	update(){
		const rr = parseInt(this.$(".remaining-ranks").val() as string);
		this.$(".btn-increase").removeAttr("disabled");
		this.$("button.select").attr("disabled", "");

		this.$(`ul.options li`).each(function(){
			const e = $(this).find(".value input");
			if (parseInt(e.val() as string) <= parseInt(e.attr("min") as string)) {
				$(this).find(".btn-decrease").attr("disabled", "");
			} else {
				$(this).find(".btn-decrease").removeAttr("disabled");
			}
			if (parseInt(e.val() as string) >= parseInt(e.attr("max") as string)) {
				$(this).find(".btn-increase").attr("disabled", "");
			} else {
				$(this).find(".btn-increase").removeAttr("disabled");
			}
		});

		if (rr == 0) {
			this.$("button.select").removeAttr("disabled");
			this.$(".btn-increase").attr("disabled", "");
		}
	}
	skillUp(skill: string) {
		const rr = this.$(".remaining-ranks");
		const e = this.$(`ul.options li.${skill} .value input`);
		if ((rr.val() as number) > 0) {
			rr.val(parseInt(rr.val() as string)-1);
			e.val(parseInt(e.val() as string)+1);
		}
		this.update();
	}
	skillDown(skill: string) {
		const rr = this.$(".remaining-ranks");
		const e = this.$(`ul.options li.${skill} .value input`);
		if (e.val() != e.attr("min")) {
			rr.val(parseInt(rr.val() as string)+1);
			e.val(parseInt(e.val() as string)-1);
		}
		this.update();
	}
	finish() {
		const lvlRanks = this.parent.level.skillRanks;
		const co = this.parent.$(".skill-ranks");
		var i = 0;
		var val = "";
		this.$("ul.options li .value input").each(function(){
			val += $(this).val()+"|";
			lvlRanks.ranks[i] = parseInt($(this).val() as string) - parseInt($(this).attr("min") as string);
			i++;
		});
		val = val.substring(0, val.length-1);
		co.find(".value").val(val);
		co.addClass("complete");
		destroyModal('#skill-point-spend');
		this.parent.update();
	}
	showDescription(name: string) {
		name = name.replace(/-/g, ' ');
		this.$(".preview-pane .name").text(name);
		this.$(".preview-pane .details").html(skillDescription(name));
	}
}
class AbilityLevelPage extends CreationPage
{
	character: Character;
	parent: CharacterLevelPage;
	constructor(parent: CharacterLevelPage) {
		super(parent, "ability-point-spend", "&lt;", "Increase your ability scores", "Finish");
		this.parent = parent;
		this.parent.parent.element.append(this.element);
		this.back = "destroyModal('#ability-point-spend');";
		this.character = this.parent.parent.character;

		this.$(".modal-content").addClass("entry-reader");
		this.$("button.select").attr("disabled", "");
		let target = this;
		const abilities = this.character.getAbilities(this.parent.characterLevel-1);

		target.$(".modal-content").append($(`<div class="menu">
			<div class="label">
				Select 4 abilities. Remaining:
				<input class="remaining-ranks" type="number" value="4" disabled readonly />
			</div>
			<ul class=\"options\"></ul>
		</div>`));

		const abNames = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
		for (let i = 0; i < abNames.length; i++) {
			const nID = abNames[i];
			let currentScore = abilities[nID.toLowerCase()];
			let opt = $(`
				<li class="${nID}" name="${nID}" title="${nID}">
					<span class="name">${nID}</span>
					<span class="value before">Before: <input type="number" value="${currentScore}" disabled /></span>
					<span class="value after"><input type="number" value="${currentScore}" disabled /></span>
					<input type="checkbox" class="checkbox" />
				</li>
			`);
			target.$(".options").append(opt);
			opt.find(".checkbox").on("click", function(e) {
				target.checkbox(nID);
			});
			opt.find(".checkbox").on("mouseUp", function(e) {
				e.preventDefault();
			});
			opt.find(".checkbox").on("mouseDown", function(e) {
				e.preventDefault();
			});
			opt.on("click", function ()
			{
				target.showDescription(nID);
			});
		}
		target.$(".entry-reader ").append($(`
			<div class="preview-pane">
				<div class="name"></div>
				<div class="details"></div>
			</div>
		`));
		target.update();

		this.$("button.select").on("click", function(){
			target.finish();
		});
	}
	getUpgradedScore(score: number): number
	{
		return score <= 16? score+2 : score+1;
	}
	update()
	{
		let spent = this.$("ul.options input.checkbox:checked").length;
		let spendable = 4 - spent;
		this.$(".remaining-ranks").val(spendable);
		this.$("button.select").attr("disabled", "");

		if (spendable == 0) {
			this.$("button.select").removeAttr("disabled");
		}
	}
	checkbox(skill: string) {
		const rr = this.$(".remaining-ranks");
		const e = this.$(`ul.options li.${skill} input.checkbox`) as JQuery<HTMLInputElement>;
		if (e.prop("checked") == false) {
			this.$(`ul.options li.${skill} .after input`).val(this.$(`ul.options li.${skill} .before input`).val() as number);
		}
		else
		{
			if ((rr.val() as number) > 0) {
				this.$(`ul.options li.${skill} .after input`).val(this.getUpgradedScore(parseInt(this.$(`ul.options li.${skill} .before input`).val() as string)));
			}
			else
			{
				e.prop("checked", false);
			}
		}
		this.update();
	}
	finish() {
		const lvlRanks = this.parent.level.skillRanks;
		const co = this.parent.$(".skill-ranks");
		var i = 0;
		var val = "";
		this.$("ul.options li .value input").each(function(){
			val += $(this).val()+"|";
			lvlRanks.ranks[i] = parseInt($(this).val() as string) - parseInt($(this).attr("min") as string);
			i++;
		});
		val = val.substring(0, val.length-1);
		co.find(".value").val(val);
		co.addClass("complete");
		destroyModal('#skill-point-spend');
		this.parent.update();
	}
	showDescription(name: string) {
		name = name.replace(/-/g, ' ');
		this.$(".preview-pane .name").text(name);
		this.$(".preview-pane .details").html(abilityDescription(name));
	}
}

/************ Dictionaries ************/
function skillDescription(skill: string) {
	switch (skill) {
		case "Acrobatics":
			return "You can keep your balance while traversing narrow or treacherous surfaces, escape from restraints, and tumble to avoid attacks. You also use Acrobatics to determine the success of difficult maneuvers while flying."
		case "Athletics":
			return "You can scale vertical surfaces, leap over obstacles, and swim."
		case "Bluff":
			return "You can use words and actions to create distractions, misdirect your opponents, tell convincing lies, and pass along secret messages."
		case "Computers":
			return "You can operate, manipulate, and hack into computer systems. If you don’t have physical access to a computer system’s user interface, you must use a hacking kit to access and manipulate the system. Details of computers themselves begin on page 213. <p>Computers are set up to give one or more authorized users “root access,” allowing them to access any information or function of the computer as a standard action, with no need for a Computers check. Firewalls can block off specific sections of a computer and grant different users root access to those sections.</p> <p>The base DC for many of the tasks of the Computers skill is equal to 13 + (4 × the computer's tier). These DCs may be adjusted by the GM to reflect other circumstances.</p>"
		case "Culture":
			return "You are a student of the vast number of known cultures in the galaxy, and you have a deep and rich understanding of the undercurrents of cultures and language in general. Each time you take a rank in Culture, you learn to speak and read a new language. See page 41 for a list of common languages. "
		case "Diplomacy":
			return "You can persuade others to be friendly toward you, resolve conflicts and differences, and learn common knowledge and rumors floating around a settlement."
		case "Disguise":
			return "You are able to change your appearance to blend in and deceive others, whether to infiltrate."
		case "Engineering":
			return "You can identify, build, repair, or disable technological devices; assess the stability of structures and machinery; and properly arm and disarm explosives. If you don’t have an engineering kit when attempting an Engineering check, you take a –2 penalty to the check."
		case "Intimidate":
			return "You can rattle your foes or bully them to do what you want with verbal threats or displays of prowess."
		case "Life Science":
			return "You are educated in the scientific study of living things, from the smallest organisms to the largest biological systems."
		case "Medicine":
			return "You have knowledge of the biology of many species and can treat a number of different types of wounds and ailments. The DCs of most Medicine tasks are based on the type of equipment used (see Chapter 7 for that information)."
		case "Mysticism":
			return "You are educated in the fields of magic, religion, the planes, and spellcasting, and so can identify magic items and spells and make magic items yourself."
		case "Perception":
			return "You can use all of your senses (hearing, taste, touch, sight, and smell) to notice danger, pick out fine details, and search for hidden objects or creatures."
		case "Physical Science":
			return "You are educated in the scientific study of non-living systems, from the tiniest atoms to the largest celestial bodies."
		case "Piloting":
			return "You know how to drive vehicles, pilot starships, and navigate."
		case "Profession":
			return "<p>You are skilled in a specific job, specialty, or creative art. You know how to use the tools of your trade, how to perform the profession’s daily tasks, how to supervise helpers, and how to handle common problems.</p><p>Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. While skills like Culture, Life Science, Mysticism, and Physical Science represent highly specialized fields of study, a Profession skill represents an aptitude in a vocation requiring a broader range of less specific knowledge. When you put ranks in a Profession skill, you must choose the ability score keyed to that skill: Charisma, Intelligence, or Wisdom. Common Charisma-based Profession skills include actor, artist, comedian, con artist, courtesan, dancer, musician, orator, poet, politician, video personality, and writer. Common Intelligence-based Profession skills include accountant, archaeologist, architect, corporate professional, electrician, lab technician, lawyer, mathematician, philosopher, professor, psychologist, and vidgamer. Common Wisdom-based Profession skills include bounty hunter, cook, counselor, dockworker, farmer, gambler, general contractor, herbalist, maintenance worker, manager, mercenary, merchant, miner, and smuggler.</p><p>A Profession skill should not overlap with existing skills. For example, if you want to play a scientist, you should put ranks into Life Science or Physical Science rather than create a Profession (scientist) skill. The GM is the final arbiter of what is a good choice for a Profession skill and what ability score a given Profession skill is keyed to.</p><p> Different professions are considered different skills for the purpose of how many ranks you can have each level. For example, a 4th-level character could have 4 ranks in both Profession (dockworker) and Profession (vidgamer).</p>"
		case "Sense Motive":
			return "You can detect falsehoods and gain glimpses of the true intentions of creatures with which you interact."
		case "Sleight of Hand":
			return "You can hide small objects, pick pockets, and accomplish other feats of manual dexterity without being noticed. "
		case "Stealth":
			return "You can stay hidden and move silently to avoid detection, allowing you to sneak past foes or strike from an unseen position."
		case "Survival":
			return "You can survive in and make your way safely through almost any kind of wilderness, follow trails and tracks, deal with wild animals, and ride tamed ones. Use the following base DCs for many of the listed tasks of the Survival skill. These DCs may be adjusted by the GM to reflect other circumstances."
		default:
			return "";
	}
}
function abilityDescription(ability: string)
{
	ability = ability.toLowerCase();
	switch (ability) {
		case "str":
			return ""
		case "dex":
			return ""
		case "con":
			return ""
		case "int":
			return ""
		case "wis":
			return ""
		case "cha":
			return ""
		default:
			return "";
	}
}

function imgError(t: HTMLImageElement) {
	$(t).remove();
}

function classLevelOptionsCount(data: CharacterClass[], className: string, level: number) {
	var result = 0;
	var cls = data.filter(function (entry: CharacterClass) {
		return entry.name === className;
	})[0];
	var clvl = cls.levels[level-1];
	var features = clvl.hasOwnProperty("features")? clvl.features:[];

	for (let index = 0; index < features.length; index++) {
		let e = features[index];
		if (e.hasOwnProperty('choice')) result++;
	}
	return result;
}

function autocomplete(inp: HTMLInputElement, arr: string[]) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus: number = 0;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt?) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}