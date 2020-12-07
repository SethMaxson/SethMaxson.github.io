import { Engine } from './engine.js';


export namespace Dialog
{
	export interface CharacterDialog
	{
		/** The name of the entity that this object pertains to. */
		name: string;
		/** The actual Dialog content of the conversation. */
		dialog: Dialog[];
	}

	export interface Dialog
	{
		/** The name of the entity that is currently speaking. */
		s?: string;
		/** The message being spoken. */
		m?: string;
		/** The internal label for dialog-tree logic. */
		label?: string;
		/** The label of the next dialog. */
		next?: string;
		/** Dialog choices for the player. */
		answers?: DialogAnswer[];
	}

	export interface DialogAnswer
	{
		/** Dialog the player will speak with this option. */
		m: string;
		/** The label of the next dialog. */
		next: string;
		/** A function to execute if this option is selected. */
		function?: Function;
	}

	var characterDialog: CharacterDialog[] = [
		{
			name: "Error",
			dialog: [
				{ s: "Error", m: "I AM ERROR" }
			]
		},
		{
			name: "Jasper",
			dialog: [
				{ s: "Jasper", m: "Hi!" },
				{ s: "Jasper", m: "What year is it?", answers: [
					{ m: "353", next: "like_yes" },
					{ m: "1353", next: "like_no" },
				] },
				{ label: "like_yes", s: "Jasper", m: "That's a relief!", next: "exit" },
				{ label: "like_no", s: "Jasper", m: "I've been asleep for that long?!", next: "like_end" },
				{ label: "like_end" },
				{ s: "Jasper", m: "This is going to take some getting used to..." }
			]
		},
		{
			name: "Sir Jasper",
			dialog: [
				{ s: "Jasper", m: "Hi!" },
				{ s: "Jasper", m: "What year is it?", answers: [
					{ m: "353", next: "like_yes" },
					{ m: "1353", next: "like_no" },
				] },
				{ label: "like_yes", s: "Jasper", m: "That's a relief!", next: "exit" },
				{ label: "like_no", s: "Jasper", m: "I've been asleep for that long?!", next: "like_end" },
				{ label: "like_end" },
				{ s: "Jasper", m: "This is going to take some getting used to..." }
			]
		},
		{
			name: "Sir Jeffrey",
			dialog: [
				{ s: "Jasper", m: "Greetings, friend." },
				{ s: "Jasper", m: "What year is it?", answers: [
					{ m: "yes", next: "like_yes" },
					{ m: "no", next: "like_no", function: function (ent: Engine.Entity)
						{
							ent?.Model.setHair("Long_Braid", ent.Model.userData.hairColor || 0x000000);
						}
					},
				] },
				{ label: "like_yes", s: "Jasper", m: "That's a relief!", next: "exit" },
				{ label: "like_no", s: "Jasper", m: "I've been asleep for that long?!", next: "like_end" },
				{ label: "like_end" },
				{ s: "Jasper", m: "This is going to take some getting used to..." }
			]
		},
		{
			name: "Ribbert",
			dialog: [
				{ s: "Ribbert", m: "Hey there, neighbor." },
				{ s: "Ribbert", m: "What can I do for you?", answers: [
					{ m: "I need a potion", next: "rib_potion" },
					{ m: "Die!", next: "rib_die" },
					{ m: "Nothing", next: "rib_nothing" },
				] },
				{ label: "buy_potion", s: "Ribbert", m: "I'd be happy to help with that, but it will take time to brew. What are you in the market for?", next: "exit" },
				{ label: "rib_die", s: "Ribbert", m: "If it's all the same, I'd rather not. Yes sir, I've got lots of unfinished business.", next: "exit" },
				{ label: "rib_nothing", s: "Ribbert", m: "There's no shame in wanting to chat. I'm always happy to take a few minutes for a friend.", next: "exit" }
			]
		},
		{
			name: "TesterMan",
			dialog: [
				{ s: "Test", m: "Welcome to the test dialog tree." },
				{ label: "main_menu", s: "Test", m: "Please select an option.", answers: [
					{ m: "Test invalid 'next' property", next: "invalid" },
					{ m: "Change species", next: "races" },
					{ m: "Change", next: "change" },
					{ m: "Change hair", next: "hairstyles" },
					{ m: "Exit", next: "exit" }
				] },
				{
					label: "change", s: "Test", m: "Please select an option.",
					answers: [
						{
							m: "F", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent.Model.gender = "f";
							}
						},
						{
							m: "M", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent.Model.gender = "m";
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{
					label: "hairstyles", s: "Test", m: "Please select an option.",
					answers: [
						{
							m: "Mohawk", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Warhawk", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Loose_Pony", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Loose_Pony", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Floppy", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Floppy", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Pixie", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Pixie_Cut", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{
					label: "races", s: "Test", m: "Please select an option.",
					answers: [
						{
							m: "HalfOrc", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("halforc");
							}
						},
						{
							m: "Human", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("human");
							}
						},
						{
							m: "Halfling", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("halfling");
							}
						},
						{
							m: "Drow", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("drow");
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{ label: "buy_potion", s: "Test", m: "I'd be happy to help with that, but it will take time to brew. What are you in the market for?", next: "exit" },
				{ label: "rib_die", s: "Test", m: "If it's all the same, I'd rather not. Yes sir, I've got lots of unfinished business.", next: "exit" },
				{ label: "rib_nothing", s: "Test", m: "There's no shame in wanting to chat. I'm always happy to take a few mintues for a friend.", next: "exit" }
			]
		},
		{
			name: "Sidekick",
			dialog: [
				{ s: "Sidekick", m: "Hey." },
				{ label: "main_menu", s: "Sidekick", m: "What did you want to talk to me about?", answers: [
					{ m: "Test invalid 'next' property", next: "invalid" },
					{ m: "Your species", next: "races" },
					{ m: "Change", next: "change" },
					{ m: "Your hair", next: "hairstyles" },
					{ m: "Nothing", next: "nothing" }
				] },
				{
					label: "change", s: "Sidekick", m: "Please select an option.",
					answers: [
						{
							m: "F", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent.Model.gender = "f";
							}
						},
						{
							m: "M", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent.Model.gender = "m";
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{
					label: "hairstyles", s: "Sidekick", m: "How should I wear my hair?",
					answers: [
						{
							m: "Mohawk", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Warhawk", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Braid", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Long_Braid", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Floppy", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Floppy", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{
							m: "Pixie", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setHair("Pixie_Cut", ent.Model.userData.hairColor || 0x000000);
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{
					label: "races", s: "Sidekick", m: "Please select an option.",
					answers: [
						{
							m: "HalfOrc", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("halforc");
							}
						},
						{
							m: "Human", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("human");
							}
						},
						{
							m: "Halfling", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("halfling");
							}
						},
						{
							m: "Drow", next: "main_menu", function: function (ent: Engine.Entity)
							{
								ent?.Model.setRace("drow");
							}
						},
						{ m: "Back", next: "main_menu" }
					]
				},
				{ label: "nothing", s: "Sidekick", m: "There's no shame in wanting to chat. I'm always happy to take a few minutes for a friend.", next: "exit" }
			]
		},
		{
			name: "Namfoodle",
			dialog: [
				{ s: "Namfoodle", m: "Zip-zobbity-bow!!" }
			]
		},
		{
			name: "Shamous",
			dialog: [
				{ s: "Shamous", m: "Move, or I'll eat you." }
			]
		},
		{
			name: "Redji",
			dialog: [
				{ s: "Redji", m: "Something something magic." }
			]
		},
		{
			name: "Teomyr",
			dialog: [
				{ s: "Teomyr", m: "I AM A VERY TALL DWARF" }
			]
		},
		{
			name: "Bud",
			dialog: [
				{ s: "Bud", m: "Wanna buy some toes?" }
			]
		},
		{
			name: "Zenrya",
			dialog: [
				{ s: "Zenrya", m: "Chaos is fun!" }
			]
		},
		{
			name: "Zenny",
			dialog: [
				{ s: "Zenny", m: "Chaos is fun!" }
			]
		}
	]

	export function getDialog(name: string, id?: string): Dialog[]
	{
		var dialog: Dialog[] | undefined = undefined;
		if (id) {
			for (let i = 0; i < characterDialog.length; i++) {
				const el = characterDialog[i];
				if (el.name.toLowerCase() == id.toLowerCase()) {
					dialog = el.dialog;
					break;
				};
			}
		}
		if (dialog == undefined)
		{
			for (let i = 0; i < characterDialog.length; i++)
			{
				const el = characterDialog[i];
				if (el.name.toLowerCase() == name.toLowerCase())
				{
					dialog = el.dialog;
					break;
				};
			}
		}
		if (dialog == undefined) {
			dialog = [
				{ s: name, m: "Hello!" }
			];
		}
		return dialog;
	}
}