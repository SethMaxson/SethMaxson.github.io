interface IWeightedKeyList {
    [key: string]: number;
}
declare function getLengthOfWeightedKeyList(weightedObject: IWeightedKeyList): number;
/**
 * Extends one weighted key list by adding the keys from another. Returns the total weight of the extended key list.
 * @param recipient The key list that needs to be extended
 * @param donor The key list whose keys will be copied to recipient
 * @param currentWeightTotal The totaled weight of the recipient before the update
 */
declare function extendWeightedKeyList(recipient: IWeightedKeyList, donor: IWeightedKeyList): void;
declare function getTotalWeight(weightedObject: any): number;
/**
 * Returns a random entry from a collection with weighted probabilities.
 * @param prob the collection of items from which to select a random entry.
 * @param totalWeight If not provided, this is automatically calculated.
 * @returns
 */
declare function weightedRandom(prob: IWeightedKeyList | any[], totalWeight?: number): string;
