import { FETCH_NETWORTH_PENDING, FETCH_NETWORTH_SUCCESS, FETCH_NETWORTH_ERROR, UPDATE_LINE_ITEM, UPDATE_NETWORTH_PENDING, UPDATE_NETWORTH_SUCCESS, UPDATE_NETWORTH_ERROR, ADD_LINE_ITEM } from "../actions";


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
            return { ...state, pending: true }
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
                    return content.id === data.id ?  {...content, label: data.label, amount: Number(data.amount)} : content
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