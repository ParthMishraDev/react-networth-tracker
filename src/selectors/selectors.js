import { createSelector } from "reselect";
import { groupBy } from "../utils/groupBy";

export const getNetWorth = state => state.networth;
export const getLiabilitiesTotalAmount = state => state.networth.totalLiabilitiesAmount
export const getNetWorthPending = state => state.pending;
export const getNetWorthError = state => state.error;

export const getLiabilitiesSelector = () => createSelector(
    state => state.networth,
    (networth) => groupBy(networth.liabilities, 'type')
);

export const getAssetsSelector = () => createSelector(
    state => state.networth,
    (networth) => groupBy(networth.assets, 'type')
);