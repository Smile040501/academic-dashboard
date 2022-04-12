export const isSubset = <T>(subset: T[], superset: T[]) => {
    const l1 = subset.length,
        l2 = superset.length;
    if (l1 > l2) {
        return false;
    }
    if (l1 == 0) {
        return true;
    }
    return subset.every((val) => superset.includes(val));
};
