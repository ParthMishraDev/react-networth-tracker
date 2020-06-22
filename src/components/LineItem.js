import React from 'react';
import { updateNetWorth, updateLineItem } from '../actions';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form'

const LineItem = (props) => {
  const { amount, label } = props.data;
  const dispatch = useDispatch();

  return (
    <>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="text" value={amount} onChange={(e) => {
            dispatch(updateLineItem({...props.data, amount: e.target.value}))
            dispatch(updateNetWorth())
          }} >
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default React.memo(LineItem);