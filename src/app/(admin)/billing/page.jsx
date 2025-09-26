import React from 'react';
import { Card, Table, Row, Col, ProgressBar } from 'react-bootstrap';

const Billing = () => {
  const paymentHistory = [
    { id: 1, date: '2024-03-15', student: 'John Smith', amount: 500, status: 'Paid' },
    { id: 2, date: '2024-03-14', student: 'Emma Wilson', amount: 750, status: 'Pending' },
    { id: 3, date: '2024-03-13', student: 'Michael Brown', amount: 500, status: 'Paid' },
  ];

  return (
    <div className="billing-page">
      <h2 className="mb-4">Billing & Payments</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Total Revenue</h5>
              <h3>$25,000</h3>
              <ProgressBar now={75} label="75%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Pending Payments</h5>
              <h3>$5,000</h3>
              <ProgressBar now={25} variant="warning" label="25%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Overdue Payments</h5>
              <h3>$1,000</h3>
              <ProgressBar now={10} variant="danger" label="10%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Payment History</h4>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.date}</td>
                  <td>{payment.student}</td>
                  <td>${payment.amount}</td>
                  <td>
                    <span className={`badge bg-${payment.status === 'Paid' ? 'success' : 'warning'}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Billing; 