import React, { createContext, useReducer, useEffect } from "react";
import { Liability } from "../Components/Liability";
import { useFetch } from "../hooks/use-api";

const NetWorthContext = createContext();

let initialState = {
    loading: false,
    netWorth: {
      id: null,
      assets: [],
      liabilities: [],
      netWorthAmount: null,
      totalAssetsAmount: null,
      totalLiabilitiesAmount: null
    }
};

let reducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "GET_NETWORTH_LOADING":
        return { loading: true }
      case "GET_NETWORTH_SUCCESS":
        return { ...state, loading: false, netWorth: action.payload };
      case "UPDATE_NETWORTH":
        return { ...state, netWorth: action.payload }
      case "UPDATE_NETWORTH_2":
          return { ...state, netWorth: action.payload }
      case "UPDATE_LINE_ITEM":
        return { 
          ...state, 
          netWorth: {
            ...state.netWorth,
            liabilities: state.netWorth.liabilities.map(
              (content, i) => {
                const data = action.payload;
                return content.id === data.id ?  {...content, amount: Number(data.amount)} : content
              }
            )
          }
        }
    }
};

const NetWorthContextConsumer = NetWorthContext.Consumer;

const NetWorthContextProvider = props => {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };

    const asyncDispatch = () => {
      dispatch({ type: "GET_NETWORTH_LOADING" });
      fetch("https://localhost:44305/networth").then(data => {
        dispatch({ type: "GET_NETWORTH_SUCCESS", payload: data });
      });
    };
  
    return (
      <NetWorthContext.Provider value={{...value, asyncDispatch}}>{props.children}</NetWorthContext.Provider>
    );
}

export { NetWorthContext, NetWorthContextProvider, NetWorthContextConsumer };
