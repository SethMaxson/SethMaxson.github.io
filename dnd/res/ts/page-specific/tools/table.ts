declare const Vue: any;
interface ITableCharacter
{
	avatar: string;
	ac: number;
	name: string;
	passives: {
		insight: number;
		investigation: number;
		perception: number;
	}
	languages: string[];
}

Vue.component("table-character", {
	props: {
		character: {
			type: Object,
			required: true
		}
	},
	template: `
		<div class="character">
			<div class="header">
				<img v-bind:src="character.avatar" alt="image"/>
				<div class="name">{{ character.name }}</div>
			</div>
			<div class="stats">
				<input class="armorclass" v-bind:placeholder="character.ac" type="text" />
				<div class="senses">
					<div class="passive-sense box">
						<div class="label-container">
							<label for="passive">Passive Wisdom (Perception)</label>
						</div>
						<input name="passive" v-bind:placeholder="character.passives.perception" />
					</div>
					<div class="passive-sense box">
						<div class="label-container">
							<label for="passive">Passive Wisdom (Insight)</label>
						</div>
						<input name="passive" v-bind:placeholder="character.passives.insight" />
					</div>
					<div class="passive-sense box">
						<div class="label-container">
							<label for="passive">Passive Intelligence (Investigation)</label>
						</div>
						<input name="passive" v-bind:placeholder="character.passives.investigation" />
					</div>
				</div>
			</div>
			<div class="otherprofs box textblock">
				<label for="otherprofs">Languages</label>
				<textarea name="otherprofs">{{ character.languages.join(", ") }}</textarea>
			</div>
		</div>
	`,
	data()
	{
		return this.character;
	}
});

var app = new Vue({
	el: '#app',
	data: {
		characters: [
			{
				avatar: "/dnd/img/maps/icons/campaigns/wednesday-warriors/pc/guidos.png",
				ac: 14,
				name: "Guidos",
				passives: {
					insight: 21,
					investigation: 12,
					perception: 21
				},
				languages: [
					"Common", "Gnomish"
				]
			},
			{
				avatar: "/dnd/img/maps/icons/campaigns/wednesday-warriors/pc/murica.png",
				ac: 17,
				name: "Murica Bigbrain",
				passives: {
					insight: 11,
					investigation: 18,
					perception: 11
				},
				languages: [
					"Common"
				]
			},
			{
				avatar: "/dnd/img/maps/icons/bud.png",
				ac: 15,
				name: "Bud Smoak",
				passives: {
					insight: 10,
					investigation: 10,
					perception: 10
				},
				languages: [
					"Celestial", "Common", "Druidic"
				]
			},
			{
				avatar: "/dnd/img/maps/icons/redji.png",
				ac: 18,
				name: "Redji Cloudtaker",
				passives: {
					insight: 12,
					investigation: 21,
					perception: 12
				},
				languages: [
					"Abyssal", "Common", "Gnomish", "Primordial"
				]
			},
			{
				avatar: "/dnd/img/maps/icons/jasper.png",
				ac: 21,
				name: "Jasper Nightbreeze",
				passives: {
					insight: 10,
					investigation: 14,
					perception: 10
				},
				languages: [
					"Celestial", "Common", "Draconic", "Elvish", "Infernal", "Primordial", "Sylvan", "Undercommon"
				]
			},
			{
				avatar: "/dnd/img/maps/icons/teomyr.png",
				ac: 21,
				name: "Teomyr",
				passives: {
					insight: 14,
					investigation: 10,
					perception: 19
				},
				languages: [
					"Abyssal", "Common", "Giant"
				]
			}
		]
	}
})