export const FETCH_NETWORTH_PENDING = 'FETCH_NETWORTH_PENDING';
export const FETCH_NETWORTH_SUCCESS = 'FETCH_NETWORTH_SUCCESS';
export const FETCH_NETWORTH_ERROR = 'FETCH_NETWORTH_ERROR';

export const UPDATE_NETWORTH_PENDING = 'UPDATE_NETWORTH_PENDING';
export const UPDATE_NETWORTH_SUCCESS = 'UPDATE_NETWORTH_SUCCESS';
export const UPDATE_NETWORTH_ERROR = 'UPDATE_NETWORTH_ERROR';

export const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
export const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';
export const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM';

// Get
export const fetchNetworthPending = () => {
    return {
        type: FETCH_NETWORTH_PENDING
    }
}

export const fetchNetworthSuccess = (networth) => {
    return {
        type: FETCH_NETWORTH_SUCCESS,
        payload: networth
    }
}

export const fetchNetworthError = (error) => {
    return {
        type: FETCH_NETWORTH_ERROR,
        payload: error
    }
}

// Update
export const updateNetworthPending = () => {
    return {
        type: UPDATE_NETWORTH_PENDING
    }
}

export const updateNetworthSuccess = (networth) => {
    return {
        type: UPDATE_NETWORTH_SUCCESS,
        payload: networth
    }
}

export const updateNetworthError = (error) => {
    return {
        type: UPDATE_NETWORTH_ERROR,
        payload: error
    }
}

// Line item
export const updateLineItem = (lineItem) => {
    return {
        type: UPDATE_LINE_ITEM,
        payload: lineItem
    }
}

export const addLineItem = (lineItem) => {
    return {
        type: ADD_LINE_ITEM,
        payload: lineItem
    }
}

export const deleteLineItem = (lineItem) => {
    return {
        type: DELETE_LINE_ITEM,
        payload: lineItem
    }
}


export const fetchNetWorth = () => {
    return dispatch => {
        dispatch(fetchNetworthPending());
        return fetch('https://localhost:44305/networth')
                .then(response => response.json())
                .then(json => dispatch(fetchNetworthSuccess(json)));
    }
}

export const updateNetWorth = () => {
    return (dispatch, getState) => {
        dispatch(updateNetworthPending());
        return fetch('https://localhost:44305/networth', { method: 'PUT', body: JSON.stringify(getState().networth), headers: { 'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(json => dispatch(updateNetworthSuccess(json)));
    }
}