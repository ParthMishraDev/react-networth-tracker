import React, { useState, useCallback } from 'react';
import { updateNetWorth, updateLineItem } from '../actions';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LineItem = (props) => {
  const { amount, label } = props.data;

  const [valid, setValid] = useState(true);
  const [editLabel, setEditLabel] = useState(false);
  const [labelValue, setLabelValue] = useState(label);
  const dispatch = useDispatch();

  const handleValidation = useCallback((event) =>  {
    if (isNaN(event.target.value)) {
      setValid(false);
      return;
    }

    if (Number(event.target.value) < 0) {
      setValid(false);
      return;
    }

    setValid(true);
  }, []);

  const updateInputToLabel = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setEditLabel(false)
      dispatch(updateLineItem({...props.data, label: event.target.value}))
      dispatch(updateNetWorth())
      return;
    }
  }


  return (
    <>
      <Form.Group as={Row}>
        { label !== '' && editLabel === false ? 
          <Col className="mt-2">
            <Form.Label>{labelValue}</Form.Label>
            <svg className="bi bi-pencil mb-1 ml-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => setEditLabel(true)}>
              <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
              <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
            </svg>
          </Col>
          :
          <Col sm="8">
            <Form.Control
                className="w-50"
                type="text" 
                value={labelValue} 
                onKeyDown={(e) => {
                  updateInputToLabel(e);
                }}
                onChange={(e) => {
                  setLabelValue(e.target.value);
              }} >
            </Form.Control>
          </Col>
        }
        <Col sm="4">
        <InputGroup className="float-right">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
              className="text-right"
              custom={false} 
              isInvalid={valid === false} 
              type="number" 
              value={amount} 
              onChange={(e) => {
                handleValidation(e);
                dispatch(updateLineItem({...props.data, amount: e.target.value}))
                if (valid) {
                  dispatch(updateNetWorth())
                }
            }} >
          </Form.Control>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
            Please enter a positive number
        </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  );
};

export default React.memo(LineItem);