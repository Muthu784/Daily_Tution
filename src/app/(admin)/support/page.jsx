import React, { useState } from 'react';
import { Card, Table, Button, Badge, Form, Row, Col, Modal } from 'react-bootstrap';

const Support = () => {
  const initialTickets = [
    { id: 1, subject: 'Login Issues', user: 'John Smith', status: 'Open', priority: 'High', date: '2024-03-15', assignedTo: null },
    { id: 2, subject: 'Payment Gateway Error', user: 'Emma Wilson', status: 'In Progress', priority: 'Medium', date: '2024-03-14', assignedTo: null },
    { id: 3, subject: 'Course Access Problem', user: 'Michael Brown', status: 'Resolved', priority: 'Low', date: '2024-03-13', assignedTo: null }
  ];

  const Developers = [
    { name: "John Carter", email: "john.carter@example.com", specialization: "Frontend Developer" },
    { name: "Maya Thompson", email: "maya.thompson@example.com", specialization: "Backend Developer" },
    { name: "Liam Rivera", email: "liam.rivera@example.com", specialization: "DevOps Engineer" },
    { name: "Sophia Zhang", email: "sophia.zhang@example.com", specialization: "AI/ML Engineer" },
    { name: "Daniel Lee", email: "daniel.lee@example.com", specialization: "Full Stack Developer" },
    { name: "Olivia Fernandez", email: "olivia.fernandez@example.com", specialization: "Cloud Engineer" },
    { name: "Ethan Patel", email: "ethan.patel@example.com", specialization: "Support Engineer" },
    { name: "Ava Brooks", email: "ava.brooks@example.com", specialization: "Mobile App Developer" },
    { name: "Noah Schmidt", email: "noah.schmidt@example.com", specialization: "Security Engineer" },
    { name: "Isabella Romero", email: "isabella.romero@example.com", specialization: "Data Engineer" }
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleView = (id) => {
    const ticket = tickets.find(t => t.id === id);
    alert(`Viewing ticket:\n\nSubject: ${ticket.subject}\nUser: ${ticket.user}\nStatus: ${ticket.status}`);
  };

  const handleResolve = (id) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, status: 'Resolved' } : ticket
      )
    );
  };

  const handleFilter = () => {
    let filtered = initialTickets;

    if (searchText) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(ticket =>
        ticket.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter(ticket =>
        ticket.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    setTickets(filtered);
  };

  const handleAssignTo = (id) => {
    setSelectedTicket(id);
    setShowModal(true);
  };

  const assignDeveloper = (developer) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === selectedTicket ? { ...ticket, assignedTo: developer.name } : ticket
      )
    );
    setShowModal(false);
  };

  return (
    <div className="support-page p-4">
      <h2 className="mb-4">Support Tickets</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search Tickets</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by subject or user"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>&nbsp;</Form.Label>
                  <Button variant="primary" className="w-100" onClick={handleFilter}>
                    Filter
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.user}</td>
                  <td>
                    <Badge bg={
                      ticket.status === 'Open' ? 'danger' :
                      ticket.status === 'In Progress' ? 'warning' : 'success'
                    }>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={
                      ticket.priority === 'High' ? 'danger' :
                      ticket.priority === 'Medium' ? 'warning' : 'info'
                    }>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td>{ticket.date}</td>
                  <td>{ticket.assignedTo || 'Unassigned'}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleView(ticket.id)}>
                      View
                    </Button>
                    {ticket.status !== 'Resolved' && (
                      <>
                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleAssignTo(ticket.id)}>
                          Assign To
                        </Button>
                        <Button variant="outline-success" size="sm" onClick={() => handleResolve(ticket.id)}>
                          Resolve
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal for Assigning Developer */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto" 
      >
        <Modal.Header closeButton className="border-b border-white-200">
          <h5 className="text-lg font-semibold">Assign Developer</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}> 
            <Table striped bordered hover className="mb-0">
              <thead className="bg-gray-100 ">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Developers.map((developer, index) => (
                  <tr key={index}>
                    <td>{developer.name}</td>
                    <td>{developer.email}</td>
                    <td>{developer.specialization}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => assignDeveloper(developer)}
                      >
                        Assign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Support;
