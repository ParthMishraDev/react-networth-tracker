import React from 'react';
import NetworthLineItem from './NetworthLineItem';
import { useDispatch } from 'react-redux';
// import { addLineItem } from '../actions/netWorth';
import Liability from './Liability';


const Networth = (props) => {
  const netWorth = props.data;
  const dispatch = useDispatch();
  console.log(props.data);

  const addButton = (e) => {
    e.preventDefault();
    // dispatch(addLineItem({type: 1, id: "a8d9bf00-5b78-4790-955c-b24097ed7b80", label: "Mortage 1", amount: 25099}));
  }

  return (
    <div>
      <h1>Tracking your Net Worth</h1>
      <p>Net worth: {netWorth.netWorthAmount}</p>
      {/* {netWorth.assets.map((value, index) => {
          return <NetworthLineItem key={index} data={{...value, dataType: 'Asset'}} />
      })} */}
      <Liability data={{liabilities: netWorth.liabilities, total: netWorth.totalLiabilitiesAmount}} />
      {/* <button onClick={(e) => addButton(e)}>Add</button> */}
    </div>
  );
};

export default React.memo(Networth);