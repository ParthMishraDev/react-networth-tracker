import React from 'react';
import Asset from './Asset';
import Liability from './Liability';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Networth = (props) => {
  const netWorth = props.data;

  return (
    <div className="border">
      <Container className="w-50">
        <h1 className="pb-3">Tracking your Net Worth</h1>
        <Row>
          <Col>
            <h4 className="text-success">
              <span>Net Worth</span>
              <span className="float-right">$ {netWorth.netWorthAmount}</span>
            </h4>
          </Col>
        </Row>
        <hr className="border border-dark"/>
        <Row>
          <Col>
            <Asset />
          </Col>
        </Row>
        <hr className="border border-dark"/>
        <Row>
          <Col>
            <Liability />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Networth);