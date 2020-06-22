import React from 'react';
import { useSelector } from 'react-redux';
import { getLiabilitiesSelector, getLiabilitiesTotalAmount } from '../selectors';
import LineItem from './LineItem';
import { LiabilityType } from '../enums';

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const Liability = () => {

    const liability = useSelector(getLiabilitiesSelector());
    const total = useSelector(getLiabilitiesTotalAmount);

    return (
        <>
          <DropdownButton id="dropdown-basic-button" title="Add Liability">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </DropdownButton>
          {Object.keys(liability).map((key, keyIndex) => (
              <div key={keyIndex}>
                  <h3>{LiabilityType[key]}</h3>
                  <ul>
                      {liability[key].map((value, index) => {
                              return <LineItem key={value.id} data={value} />
                          })}
                  </ul>
              </div> 
          ))}
          <p>Total: {total}</p>
        </>
    );
};

export default React.memo(Liability);