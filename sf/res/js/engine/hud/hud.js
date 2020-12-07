import { Reticle } from "./reticle.js";
import { Compass } from './compass.js';
export class HUD {
    constructor(name = "Player") {
        this.html = $(`
			<div class="hud-wrapper">
				<div id="hud">
					<div class="characterInfo">
						<div class="charLabel">
							${name}
						</div>
					</div>
				</div>


				<div id="tooltip" class="tooltip" style="position:absolute; bottom:0; left:0; z-index:9; background:none; width:100%; display:none;">
					<div style="margin-left:auto; margin-right:auto; background:none; width:80%; opacity:0.8; text-align:center;">
						<span class="tooltip-text" style="text-align:center; background: gray; color:white;"></span>
					</div>
				</div>
				<div id="spells" class="spells" style="position:absolute; bottom:0; left:0; z-index:9; background:none; width:100%;">
					<select id="spell-name" style="width:10%; background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
						<option value="polymorph">Polymorph</option>
					</select>
					<span id="spell-parameters" style="display:inline-block; width:80%;">
						<select index="1" style=" background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
							<option value="f">F</option>
							<option value="m">M</option>
						</select>
					</span>
					<button id="spell-cast" style="width:8%; background:rgba(0,0,0,0.3); color:#ccc; border:1px solid #ccc;">
						Cast!
					</button>
				</div>
				<div class="reticle">
					<div class="target-label"></div>
					&#160;
				</div>
			</div>
		`);
        this.reticle = new Reticle(this);
        this.healthBar = new HealthBar();
        this.html.find(".characterInfo").append(this.healthBar.element);
        this.compass = new Compass();
        this.html.append(this.compass.element);
    }
    $(selector) {
        return this.html.find(selector);
    }
    setEntity(ent) {
        this.name = ent._Model.name;
        this.healthBar.update(ent.Health);
    }
    showTooltip(text, duration = 2000) {
        let tooltip = this.html.find(".tooltip");
        if (!tooltip.is(":visible")) {
            tooltip.show(0);
            this.html.find(".tooltip-text").text(text);
            // let target = this;
            setTimeout(() => {
                this.hideTooltip();
            }, duration);
        }
    }
    hideTooltip() {
        this.html.find(".tooltip-text").text("");
        this.html.find(".tooltip").hide(0);
    }
    update(main) {
        if (!main.Settings.hideCompass) {
            this.compass.update(main);
        }
    }
    get name() {
        return this.html.find(".charLabel").text().trim();
    }
    set name(value) {
        this.html.find(".charLabel").text(value);
    }
    get showSpellMenu() {
        return this.html.find(".spells").is(":visible");
    }
    set showSpellMenu(value) {
        let spellMenu = this.html.find(".spells");
        if (value == true) {
            spellMenu.show();
        }
        else {
            spellMenu.hide();
        }
    }
}
export class HealthBar {
    constructor(hp) {
        // this.element = $(`
        // 	<div class="hp">
        // 		<div class="bar" style="width:${100 * hp.currentHP / hp.maxHP}%;"></div>
        // 		<div class="text">${hp.currentHP}/${hp.maxHP}</div>
        // 	</div>
        // `);
        if (hp) {
            this.element = $(`
				<div style="width:100%" class="hp">
					<progress class="bar" value="${hp.currentHP}" max="${hp.maxHP}" style="width:100%;"></progress>
					<div class="text"></div>
				</div>
			`);
        }
        else {
            this.element = $(`
				<div style="width:100%" class="hp">
					<progress class="bar" value="1" max="1" style="width:100%;"></progress>
					<div class="text">1/1</div>
				</div>
			`);
        }
    }
    update(hp) {
        this.element.find(".bar").val(hp.currentHP);
        this.element.find(".bar").attr("max", hp.maxHP);
        this.element.find(".text").text(`${hp.currentHP}/${hp.maxHP}`);
    }
}
//# sourceMappingURL=hud.js.map