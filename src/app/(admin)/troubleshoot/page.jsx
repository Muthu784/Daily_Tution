import React from 'react';
import { Card, Table, Button, ProgressBar, Alert, Row, Col } from 'react-bootstrap'; 

const Troubleshoots = () => {
  const systemStatus = {
    cpu: 45,
    memory: 60,
    storage: 75,
    network: 30
  };

  const recentIssues = [
    {
      id: 1,
      type: 'System',
      description: 'High CPU usage detected',
      status: 'Resolved',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: 'Database',
      description: 'Connection timeout',
      status: 'Investigating',
      date: '2024-03-14'
    },
    {
      id: 3,
      type: 'Network',
      description: 'Slow response time',
      status: 'Resolved',
      date: '2024-03-13'
    }
  ];

  return (
    <div className="troubleshoot-page">
      <h2 className="mb-4">System Troubleshooting</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>CPU Usage</h5>
              <ProgressBar now={systemStatus.cpu} label={`${systemStatus.cpu}%`} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Memory Usage</h5>
              <ProgressBar now={systemStatus.memory} label={`${systemStatus.memory}%`} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Storage Usage</h5>
              <ProgressBar now={systemStatus.storage} label={`${systemStatus.storage}%`} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Network Usage</h5>
              <ProgressBar now={systemStatus.network} label={`${systemStatus.network}%`} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Quick Actions</h4>
            <Button variant="primary">Run Full Diagnostic</Button>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary">Clear Cache</Button>
            <Button variant="outline-primary">Check Database</Button>
            <Button variant="outline-primary">Test Network</Button>
            <Button variant="outline-primary">View Logs</Button>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Recent Issues</h4>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>#{issue.id}</td>
                  <td>{issue.type}</td>
                  <td>{issue.description}</td>
                  <td>
                    <span className={`badge bg-${
                      issue.status === 'Resolved' ? 'success' :
                      issue.status === 'Investigating' ? 'warning' : 'danger'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.date}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">View Details</Button>
                    <Button variant="outline-success" size="sm">Resolve</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Alert variant="info" className="mt-4">
        <Alert.Heading>System Status</Alert.Heading>
        <p>
          All systems are currently operational. No critical issues detected.
          Last system check: {new Date().toLocaleString()}
        </p>
      </Alert>
    </div>
  );
};

export default Troubleshoots; 