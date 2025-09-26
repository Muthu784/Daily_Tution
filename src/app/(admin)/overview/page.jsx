import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Overview = () => {
  return (
    <div className="overview-page">
      <h2 className="mb-4">Admin Overview</h2>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Total Users</h5>
              <h3>1,234</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Active Teachers</h5>
              <h3>45</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Total Students</h5>
              <h3>890</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Total Parents</h5>
              <h3>299</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview; 