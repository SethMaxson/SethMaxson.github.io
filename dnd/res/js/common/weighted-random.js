"use strict";
function getTotalWeight(weightedObject) {
    let i, totalWeight = 0;
    for (i in weightedObject) {
        totalWeight += weightedObject[i];
    }
    return totalWeight;
}
function weightedRandom(prob, totalWeight = 1) {
    let i, sum = 0;
    let r = Math.random() * totalWeight;
    let result = undefined;
    for (i in prob) {
        sum += prob[i];
        if (r <= sum) {
            result = i;
            break;
        }
    }
    if (!result) {
        result = "THE VOID";
    }
    return result;
}
//# sourceMappingURL=weighted-random.js.map