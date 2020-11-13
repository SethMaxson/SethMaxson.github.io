interface IWeightedKeyList {
    [key: string]: number;
}
declare function getTotalWeight(weightedObject: any): number;
declare function weightedRandom(prob: any, totalWeight?: number): string;
