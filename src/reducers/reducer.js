import { FETCH_NETWORTH_PENDING, FETCH_NETWORTH_SUCCESS, FETCH_NETWORTH_ERROR, UPDATE_LINE_ITEM, UPDATE_NETWORTH_PENDING, UPDATE_NETWORTH_SUCCESS, UPDATE_NETWORTH_ERROR, ADD_LINE_ITEM } from "../actions";
import { createSelector } from "reselect";


const initialState = {
    pending: true,
    networth: null,
    error: null
}

export const netWorthReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NETWORTH_PENDING:
            return { ...state, pending: true }
        case FETCH_NETWORTH_SUCCESS:
            return { ...state, pending: false, networth: action.payload };
        case FETCH_NETWORTH_ERROR:
            return { ...state, pending: false, error: action.payload }
        case UPDATE_NETWORTH_PENDING:
            return { pending: true }
        case UPDATE_NETWORTH_SUCCESS:
            return { ...state, pending: false, networth: action.payload };
        case UPDATE_NETWORTH_ERROR:
            return { ...state, pending: false, error: action.payload }
        case UPDATE_LINE_ITEM:
            return { 
                ...state, 
                networth: {
                ...state.networth,
                liabilities: state.networth.liabilities.map(
                    (content, i) => {
                    const data = action.payload;
                    return content.id === data.id ?  {...content, amount: Number(data.amount)} : content
                    }
                )
                }
            }
        case ADD_LINE_ITEM:
            return { 
                ...state, 
                networth: {
                    ...state.networth,
                    liabilities: state.networth.liabilities.concat(action.payload)
                }
            }
        default:
            return state;
    }
}


const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

export const getNetWorth = state => state.networth;
export const getNetWorthPending = state => state.pending;
export const getNetWorthError = state => state.error;

export const getLiabilitiesSelector = () => createSelector(
    state => state.networth,
    (networth) => groupBy(networth.liabilities, 'type')
);