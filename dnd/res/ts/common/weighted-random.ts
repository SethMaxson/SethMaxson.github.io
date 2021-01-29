interface IWeightedKeyList
{
	[key: string]: number;
}

function getLengthOfWeightedKeyList(weightedObject: IWeightedKeyList): number
{
	let i, totalLength = 0;
	for (i in weightedObject)
	{
		totalLength += 1;
	}
	return totalLength;
}

/**
 * Extends one weighted key list by adding the keys from another. Returns the total weight of the extended key list.
 * @param recipient The key list that needs to be extended
 * @param donor The key list whose keys will be copied to recipient
 * @param currentWeightTotal The totaled weight of the recipient before the update
 */
function extendWeightedKeyList(recipient: IWeightedKeyList, donor: IWeightedKeyList)
{
	for (var i in donor)
	{
		recipient[i] = donor[i];
	}
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

function weightedRandom(prob: IWeightedKeyList|any[], totalWeight: number = getTotalWeight(prob)): string
{
	let i: number | string;
	let sum = 0;
	let r = Math.random() * totalWeight;
	let result: string | undefined = undefined;
	for (i in prob)
	{
		//@ts-ignore
		sum += prob[i];
		//@ts-ignore
		if (r <= sum && prob[i] != 0)
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