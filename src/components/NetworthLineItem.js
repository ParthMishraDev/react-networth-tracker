import React from 'react';
import LineItem from './LineItem';

const NetworthLineItem = (props) => {
    const NetworthLineItemData = props.data;
    return (
      <li>
          <LineItem key={NetworthLineItemData.id} data={{id: NetworthLineItemData.id, amount: NetworthLineItemData.amount, label: NetworthLineItemData.label}} />
      </li>
    );
};

export default React.memo(NetworthLineItem);