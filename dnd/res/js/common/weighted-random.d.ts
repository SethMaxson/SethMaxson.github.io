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
declare function weightedRandom(prob: IWeightedKeyList | any[], totalWeight?: number): string;
