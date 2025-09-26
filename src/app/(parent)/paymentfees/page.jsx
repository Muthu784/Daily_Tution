import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, Col, Row, Table, Button, Modal, ProgressBar } from 'react-bootstrap';
import { FaFileInvoiceDollar, FaCreditCard, FaHistory, FaDownload } from 'react-icons/fa';

const PaymentFees = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for payments
  const dummyPayments = [
    {
      id: 1,
      month: 'January 2024',
      amount: 500,
      status: 'Paid',
      date: '2024-01-15',
      receipt: 'REC001',
      dueDate: '2024-01-10',
      paymentMethod: 'Credit Card',
      transactionId: 'TRX001'
    },
    {
      id: 2,
      month: 'February 2024',
      amount: 500,
      status: 'Pending',
      date: '2024-02-15',
      receipt: 'REC002',
      dueDate: '2024-02-10',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TRX002'
    },
    {
      id: 3,
      month: 'March 2024',
      amount: 500,
      status: 'Upcoming',
      date: '2024-03-15',
      receipt: 'REC003',
      dueDate: '2024-03-10',
      paymentMethod: 'Pending',
      transactionId: 'TRX003'
    }
  ];

  // Dummy data for payment summary
  const paymentSummary = {
    totalPaid: 1000,
    pendingAmount: 500,
    upcomingPayments: 500,
    paymentProgress: 66.67
  };

  useEffect(() => {
    // Simulate API call
    setPayments(dummyPayments);
  }, []);

  const handlePayment = (paymentId) => {
    // Simulate payment link generation
    const paymentLink = `https://payment.example.com/pay/${paymentId}`;
    window.open(paymentLink, '_blank');
  };

  const handleCancellation = (payment) => {
    setSelectedPayment(payment);
    setShowCancellationModal(true);
  };

  const renderPaymentOverview = () => (
    <Row className="mb-4">
      <Col xl={3} md={6}>
        <Card className="card-animate">
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium text-muted mb-0">Total Paid</p>
              </div>
              <div className="avatar-sm">
                <span className="avatar-title bg-primary rounded-circle">
                  <FaFileInvoiceDollar className="text-white" />
                </span>
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 className="fs-22 fw-semibold ff-secondary mb-4">${paymentSummary.totalPaid}</h4>
                <span className="badge bg-success">Current</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xl={3} md={6}>
        <Card className="card-animate">
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium text-muted mb-0">Pending Amount</p>
              </div>
              <div className="avatar-sm">
                <span className="avatar-title bg-warning rounded-circle">
                  <FaCreditCard className="text-white" />
                </span>
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 className="fs-22 fw-semibold ff-secondary mb-4">${paymentSummary.pendingAmount}</h4>
                <span className="badge bg-warning">Due</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xl={3} md={6}>
        <Card className="card-animate">
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium text-muted mb-0">Upcoming Payments</p>
              </div>
              <div className="avatar-sm">
                <span className="avatar-title bg-info rounded-circle">
                  <FaHistory className="text-white" />
                </span>
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 className="fs-22 fw-semibold ff-secondary mb-4">${paymentSummary.upcomingPayments}</h4>
                <span className="badge bg-info">Scheduled</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xl={3} md={6}>
        <Card className="card-animate">
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <p className="text-uppercase fw-medium text-muted mb-0">Payment Progress</p>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar 
                now={paymentSummary.paymentProgress} 
                label={`${paymentSummary.paymentProgress}%`}
                variant={paymentSummary.paymentProgress >= 80 ? 'success' : 'warning'}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderPaymentHistory = () => (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Payment History</h5>
          <Button variant="primary" size="sm">
            <FaDownload className="me-2" />
            Export History
          </Button>
        </div>
        <div className="table-responsive">
          <Table hover className="table-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.month}</td>
                  <td>${payment.amount}</td>
                  <td>
                    <span className={`badge bg-${
                      payment.status === 'Paid' ? 'success' :
                      payment.status === 'Pending' ? 'warning' :
                      'info'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.dueDate}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.transactionId}</td>
                  <td>
                    {payment.status === 'Pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handlePayment(payment.id)}
                      >
                        Pay Now
                      </Button>
                    )}
                    {payment.status === 'Paid' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => window.open(`/receipts/${payment.receipt}`, '_blank')}
                        >
                          View Receipt
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancellation(payment)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Payment & Fees</h1>
        </div>
      </div>

      <Row className="mb-4">
        <Col>
          <div className="btn-group" role="group">
            <Button
              variant={activeTab === 'overview' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === 'history' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('history')}
            >
              Payment History
            </Button>
          </div>
        </Col>
      </Row>

      {activeTab === 'overview' && renderPaymentOverview()}
      {activeTab === 'history' && renderPaymentHistory()}

      {/* Cancellation Modal */}
      <Modal show={showCancellationModal} onHide={() => setShowCancellationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel the payment for {selectedPayment?.month}?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancellationModal(false)}>
            No, Keep It
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              // Add cancellation logic here
              setShowCancellationModal(false);
            }}
          >
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentFees;