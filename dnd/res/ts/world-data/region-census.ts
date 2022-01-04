interface IRegionCensus
{
	name: string;
	inhabitants: IRegionInhabitant[];
	subregions?: IRegionCensus[];
}

interface IRegionInhabitant
{
	name: string;
	percentage: number;
}

const censusData: IRegionCensus[] = [
	{
		"name": "Bravagg Isle",
		"inhabitants": [
			{
				"name": "Dragonborn",
				"percentage": 65
			},
			{
				"name": "Drakkon",
				"percentage": 30
			},
			{
				"name": "Other",
				"percentage": 5
			}
		]
	},
	{
		"name": "Decapos",
		"inhabitants": [
			{
				"name": "Centaur",
				"percentage": 5
			},
			{
				"name": "Drow",
				"percentage": 15
			},
			{
				"name": "Halfling",
				"percentage": 15
			},
			{
				"name": "Hobgoblin",
				"percentage": 20
			},
			{
				"name": "Kuo-Toa",
				"percentage": 2
			},
			{
				"name": "Lizardfolk",
				"percentage": 10
			},
			{
				"name": "Tabaxi",
				"percentage": 23
			},
			{
				"name": "Other",
				"percentage": 10
			}
		],
		"subregions": [
			{
				"name": "Giant's Shell",
				"inhabitants": [
					{
						"name": "Hobgoblin",
						"percentage": 29
					},
					{
						"name": "Kuo-Toa",
						"percentage": 5
					},
					{
						"name": "Lizardfolk",
						"percentage": 18
					},
					{
						"name": "Mongrelfolk",
						"percentage": 10
					},
					{
						"name": "Tabaxi",
						"percentage": 29
					},
					{
						"name": "Other",
						"percentage": 9
					}
				]
			},
			{
				"name": "North Claw",
				"inhabitants": [
					{
						"name": "Elf",
						"percentage": 10
					},
					{
						"name": "Drow",
						"percentage": 35
					},
					{
						"name": "Hobgoblin",
						"percentage": 15
					},
					{
						"name": "Lizardfolk",
						"percentage": 15
					},
					{
						"name": "Other",
						"percentage": 25
					}
				]
			},
			{
				"name": "South Claw",
				"inhabitants": [
					{
						"name": "Centaur",
						"percentage": 32
					},
					{
						"name": "Halfling",
						"percentage": 35
					},
					{
						"name": "Tabaxi",
						"percentage": 33
					},
					{
						"name": "Other",
						"percentage": 10
					}
				]
			}
		]
	},
	{
		"name": "Lagos",
		"inhabitants": [
			{
				"name": "Human",
				"percentage": 40
			}
		]
	},
	{
		"name": "Notre",
		"inhabitants": [
			{
				"name": "Drow",
				"percentage": 5
			},
			{
				"name": "Odenu",
				"percentage": 30
			},
			{
				"name": "Pengos",
				"percentage": 45
			},
			{
				"name": "Yeti",
				"percentage": 20
			}
		]
	},
	{
		"name": "Paros",
		"inhabitants": [
			{
				"name": "Dwarf",
				"percentage": 35
			},
			{
				"name": "Elf",
				"percentage": 18
			},
			{
				"name": "Gnome",
				"percentage": 8
			},
			{
				"name": "Halfling",
				"percentage": 15
			},
			{
				"name": "Grung",
				"percentage": 4
			},
			{
				"name": "Ratfolk",
				"percentage": 20
			}
		],
		"subregions": [
			{
				"name": "Divitaera (Eastern Super-Region)",
				"inhabitants": [
					{
						"name": "Dwarf",
						"percentage": 50
					},
					{
						"name": "Elf",
						"percentage": 25
					},
					{
						"name": "Gnome",
						"percentage": 10
					},
					{
						"name": "Halfling",
						"percentage": 15
					}
				]
			},
			{
				"name": "Incosolum (Southern Super-Region)",
				"inhabitants": [
					{
						"name": "Gnolls",
						"percentage": 25
					},
					{
						"name": "Wilkoss",
						"percentage": 30
					},
					{
						"name": "Other",
						"percentage": 45
					}
				]
			},
			{
				"name": "Silvanenum (Western Super-Region)",
				"inhabitants": [
					{
						"name": "Grung",
						"percentage": 34
					},
					{
						"name": "Ratfolk",
						"percentage": 54
					},
					{
						"name": "Thri-Kreen",
						"percentage": 12
					}
				]
			}
		]
	},
	{
		"name": "Peku",
		"inhabitants": [
			{
				"name": "Bearfolk",
				"percentage": 30
			},
			{
				"name": "Pixie",
				"percentage": 30
			},
			{
				"name": "Sprite",
				"percentage": 30
			},
			{
				"name": "Treant",
				"percentage": 10
			}
		]
	},
	{
		"name": "Sutre",
		"inhabitants": [
			{
				"name": "Centaur",
				"percentage": 48
			},
			{
				"name": "Barbegazi",
				"percentage": 47
			},
			{
				"name": "Other",
				"percentage": 5
			}
		]
	},
	{
		"name": "Terrapim",
		"inhabitants": [
			{
				"name": "Aarakocra",
				"percentage": 5
			},
			{
				"name": "Bugbear",
				"percentage": 18
			},
			{
				"name": "Bullywug",
				"percentage": 10
			},
			{
				"name": "Dwarf",
				"percentage": 12
			},
			{
				"name": "Goblin",
				"percentage": 22
			},
			{
				"name": "Human",
				"percentage": 18
			},
			{
				"name": "Orc",
				"percentage": 10
			},
			{
				"name": "Tortle",
				"percentage": 5
			}
		],
		"subregions": [
			{
				"name": "Apexis Peninsula",
				"inhabitants": [
					{
						"name": "Aarakocra",
						"percentage": 30
					},
					{
						"name": "Dragonspawn",
						"percentage": 40
					},
					{
						"name": "Urd",
						"percentage": 30
					}
				]
			},
			{
				"name": "Cradle of Kings",
				"inhabitants": [
					{
						"name": "Dwarf",
						"percentage": 20
					},
					{
						"name": "Human",
						"percentage": 60
					},
					{
						"name": "Orc",
						"percentage": 20
					}
				]
			},
			{
				"name": "The Wildlands",
				"inhabitants": [
					{
						"name": "Bugbear",
						"percentage": 29
					},
					{
						"name": "Bullywug",
						"percentage": 16
					},
					{
						"name": "Ettercap",
						"percentage": 12
					},
					{
						"name": "Goblin",
						"percentage": 35
					},
					{
						"name": "Tortle",
						"percentage": 8
					}
				]
			}
		]
	},
];