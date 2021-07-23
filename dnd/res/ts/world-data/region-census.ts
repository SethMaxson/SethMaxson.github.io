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
		name: "Bravagg Isle",
		inhabitants: [
			{
				name: "Dragonborn",
				percentage: 40
			}
		]
	},
	{
		name: "Decapos",
		inhabitants: [
			{
				name: "Hobgoblin",
				percentage: 40
			}
		]
	},
	{
		name: "Lagos",
		inhabitants: [
			{
				name: "Human",
				percentage: 40
			}
		]
	},
	{
		name: "Notre",
		inhabitants: [
			{
				name: "Drow",
				percentage: 40
			}
		]
	},
	{
		name: "Paros",
		inhabitants: [
			{
				name: "Dwarf",
				percentage: 40
			}
		],
		subregions: [
			{
				name: "Divitaera (Eastern Super-Region)",
				inhabitants: [
					{
						name: "Dwarf",
						percentage: 40
					},
					{
						name: "Elf",
						percentage: 40
					},
					{
						name: "Gnome",
						percentage: 40
					},
					{
						name: "Halfling",
						percentage: 40
					}
				]
			}
		]
	},
	{
		name: "Peku",
		inhabitants: [
			{
				name: "Bearfolk",
				percentage: 40
			}
		]
	},
	{
		name: "Sutre",
		inhabitants: [
			{
				name: "Centaur",
				percentage: 40
			},
			{
				name: "Barbegazi",
				percentage: 40
			}
		]
	},
	{
		name: "Terrapim",
		inhabitants: [
			{
				name: "Bugbear",
				percentage: 40
			}
		]
	},
];