var characterDialog = [
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
			{ s: "Jasper", question: "What year is it?", answers: [
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
			{ s: "Jasper", question: "What year is it?", answers: [
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
		name: "Ribbert",
		dialog: [
			{ s: "Ribbert", m: "Hey there, neighbor." },
			{ s: "Ribbert", question: "What can I do for you?", answers: [
				{ m: "I need a potion", next: "rib_potion" },
				{ m: "Die!", next: "rib_die" },
				{ m: "Nothing", next: "rib_nothing" },
			] },
			{ label: "buy_potion", s: "Ribbert", m: "I'd be happy to help with that, but it will take time to brew. What are you in the market for?", next: "exit" },
			{ label: "rib_die", s: "Ribbert", m: "If it's all the same, I'd rather not. Yes sir, I've got lots of unfinished business.", next: "exit" },
			{ label: "rib_nothing", s: "Ribbert", m: "There's no shame in wanting to chat. I'm always happy to take a few mintues for a friend.", next: "exit" }
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
	}
]

function getDialog(name) {
	var dialog = characterDialog[0].dialog;
	for (let i = 0; i < characterDialog.length; i++) {
		const el = characterDialog[i];
		if (el.name.toLowerCase() == name.toLowerCase()) {
			dialog = el;
			break;
		};
	}
	return dialog.dialog;
}