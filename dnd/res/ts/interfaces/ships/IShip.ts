interface IShip
{
	name: string;
	deckPlan?: string;
	width?: number;
	height?: number;
	gridSize?: number;
	decks?: IDeck[];
}