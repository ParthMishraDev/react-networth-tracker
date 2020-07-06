import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getLiabilitiesSelector, getLiabilitiesTotalAmount } from '../selectors';
import LineItem from './LineItem';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { LiabilityType } from '../enums';
import { generateGuid } from '../utils/guidGenerator';
import { addLineItem, updateNetWorth } from '../actions';

const Liability = () => {

    const liability = useSelector(getLiabilitiesSelector());
    const total = useSelector(getLiabilitiesTotalAmount, shallowEqual);
    const dispatch = useDispatch();

    const addLiability = (event, type) => {
        event.preventDefault();
        dispatch(addLineItem({networthType: 'Liability', type, id: generateGuid(), label: '', amount: 0}));
        dispatch(updateNetWorth());
      }

    return (
        <>
          <Row>
            <Col sm="9">
              <h5 className="text-success mt-2">Liabilities</h5>
            </Col>
            <Col>
              <DropdownButton id="dropdown-basic-button" title="Add Liability">
                <Dropdown.Item onClick={(e) => addLiability(e,0)}>Short term liability</Dropdown.Item>
                <Dropdown.Item onClick={(e) => addLiability(e,1)}>Long term debt</Dropdown.Item>
                <Dropdown.Item onClick={(e) => addLiability(e,2)}>Other</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <hr className="border border-dark" />
          {Object.keys(liability).map((key, keyIndex) => (
              <div key={keyIndex + '_liabilities'}>
                  <h5>{LiabilityType[key]}</h5>
                  <ul>
                      {liability[key].map((value, index) => {
                            return <LineItem key={value.id} data={value} />
                        })}
                  </ul>
                  <hr className="border border-info" />
              </div> 
          ))}

          <Row>
            <Col>
              <h5 className="text-success">
                <span>Total Liabilities</span>
                <span className="float-right">$ {total}</span>
              </h5>
            </Col>
          </Row>
        </>
    );
};

export default React.memo(Liability);