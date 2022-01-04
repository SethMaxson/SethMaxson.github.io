enum MercenaryRank
{
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	S = 'S',
}

interface IMercenaryGroup
{
	alignment: Alignment;
	logo?: string;
	name: string;
	notes: INotes;
	rank: MercenaryRank;
}