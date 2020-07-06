import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAssetsSelector, getAssetsTotalAmount } from '../selectors';
import LineItem from './LineItem';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { AssetType } from '../enums';
import { generateGuid } from '../utils/guidGenerator';
import { addLineItem } from '../actions';

const Asset = () => {
    const asset = useSelector(getAssetsSelector());
    const total = useSelector(getAssetsTotalAmount, shallowEqual);
    const dispatch = useDispatch();

    const addAsset = (event, type) => {
        event.preventDefault();
        dispatch(addLineItem({networthType: 'Asset', type, id: generateGuid(), label: '', amount: 0}));
      }

    return (
        <>
          <Row>
            <Col sm="9">
              <h5 className="text-success mt-2">Assets</h5>
            </Col>
            <Col>
              <DropdownButton id="dropdown-basic-button" title="Add Asset">
                <Dropdown.Item onClick={(e) => addAsset(e,0)}>Cash & Investments</Dropdown.Item>
                <Dropdown.Item onClick={(e) => addAsset(e,1)}>Long Term Assets</Dropdown.Item>
                <Dropdown.Item onClick={(e) => addAsset(e,2)}>Other</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <hr className="border border-dark" />
          {Object.keys(asset).map((key, keyIndex) => (
              <div key={keyIndex + '_assets'}>
                  <h5>{AssetType[key]}</h5>
                  <ul>
                      {asset[key].map((value, index) => {
                            return <LineItem key={value.id} data={value} />
                        })}
                  </ul>
                  <hr className="border border-info" />
              </div> 
          ))}
          <Row>
            <Col>
              <h5 className="text-success">
                <span>Total Assets</span>
                <span className="float-right">$ {total}</span>
              </h5>
            </Col>
          </Row>
        </>
    );
};

export default React.memo(Asset);