interface IWeightedKeyList
{
	[key: string]: number;
}

function getTotalWeight(weightedObject: any): number
{
	let i, totalWeight = 0;
	for (i in weightedObject)
	{
		totalWeight += weightedObject[i];
	}
	return totalWeight;
}

function weightedRandom(prob: any, totalWeight: number = 1): string
{
	let i, sum = 0;
	let r = Math.random() * totalWeight;
	let result: string | undefined = undefined;
	for (i in prob)
	{
		sum += prob[i];
		if (r <= sum)
		{
			result = i;
			break;
		}
	}
	if (!result)
	{
		result = "THE VOID";
	}
	return result;
}