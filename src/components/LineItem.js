import React, { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { updateNetWorth, updateLineItem, deleteLineItem } from '../actions';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SettingsContext } from '../contexts/SettingsContext';
import { debounce } from 'lodash';

const LineItem = (props) => {
  const { amount, label } = props.data;

  const errorMsg = useRef(null)
  const inputRef = useRef(null);
  
  const [valid, setValid] = useState(true);
  const [editLabel, setEditLabel] = useState(false);
  const [labelValue, setLabelValue] = useState(label);

  const dispatch = useDispatch();
  const { settings } = useContext(SettingsContext);

  // Validation
  const handleValidation = useCallback((event) =>  {
    if (isNaN(event.target.value)) {
      setValid(false);
      return;
    }

    if (Number(event.target.value) < 0) {
      errorMsg.current = 'Please enter a positive number';
      setValid(false);
      return;
    }

    if (Number(event.target.value) > settings.maxValue || Number(event.target.value) < settings.minValue) {
      errorMsg.current = `It should be between ${settings.minValue} to ${settings.maxValue}`;
      setValid(false);
      return;
    }

    setValid(true);
  }, [settings]);

  useEffect(() => {
    if (Number(inputRef.current.value) > settings.maxValue || Number(inputRef.current.value) < settings.minValue ) {
      errorMsg.current = `It should be between ${settings.minValue} to ${settings.maxValue}`;
      setValid(false);
    }
  }, [settings])

  // Modifying Line items
  const deleteLine = useCallback(() => {
    dispatch(deleteLineItem({...props.data}));
    dispatch(updateNetWorth());
  }, [dispatch, props])

  const updateInputToLabel = useCallback((event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setEditLabel(false)
      dispatch(updateLineItem({...props.data, label: event.target.value}))
      dispatch(updateNetWorth())
      return;
    }
  }, [dispatch, props])

  const updateAmount = useCallback(() => {
    if (valid) {
      dispatch(updateNetWorth())
    }
  }, [dispatch, valid]);

  const updateAmountDebounce = useCallback(debounce(() => {
    if (valid) {
      dispatch(updateNetWorth())
    }
  }, 800), [dispatch, valid]);

  return (
    <>
      <Form.Group as={Row} style={{position: 'relative'}}>
        { label !== '' && editLabel === false ? 
          <Col className="mt-2">
            <Form.Label>{labelValue}</Form.Label>
            <svg className="bi bi-pencil mb-1 ml-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => setEditLabel(true)}>
              <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
              <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
            </svg>
            <svg className="bi bi-trash mb-1 ml-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => deleteLine()}>
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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
              ref={inputRef} 
              onChange={(e) => {
                handleValidation(e);
                dispatch(updateLineItem({...props.data, amount: e.target.value}));
                if (settings.debounce) {
                  updateAmountDebounce()
                } else {
                  updateAmount();
                }
            }} >
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            { errorMsg.current ? errorMsg.current : null}
          </Form.Control.Feedback>
        </InputGroup>
        </Col>
      </Form.Group>
    </>
  );
};

export default React.memo(LineItem);