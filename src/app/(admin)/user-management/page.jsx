import React, { useState } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', subjects: ['Math', 'Science'], gradeFrom: 1, gradeTo: 5, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', subjects: ['English', 'History'], gradeFrom: 6, gradeTo: 8, status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', subjects: ['Physics', 'Chemistry'], gradeFrom: 9, gradeTo: 12, status: 'Active' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    subjects: [],
    gradeFrom: '',
    gradeTo: '',
    status: 'Active',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      id: '',
      name: '',
      email: '',
      subjects: [],
      gradeFrom: '',
      gradeTo: '',
      status: 'Active',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    } else {
      setUsers([...users, { ...formData, id: users.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setFormData(user);
    handleShowModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Add New User
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subjects</th>
                <th>Grade Range</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.subjects.join(', ')}</td>
                  <td>{user.gradeFrom} - {user.gradeTo}</td>
                  <td>
                    <span className={`badge bg-${user.status === 'Active' ? 'success' : 'danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal for Adding/Editing User */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subjects</Form.Label>
              <Form.Control
                type="text"
                name="subjects"
                value={formData.subjects.join(', ')}
                onChange={(e) =>
                  setFormData({ ...formData, subjects: e.target.value.split(',').map((s) => s.trim()) })
                }
                placeholder="Enter subjects separated by commas"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade Range</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  name="gradeFrom"
                  value={formData.gradeFrom}
                  onChange={(e) => setFormData({ ...formData, gradeFrom: e.target.value })}
                  placeholder="From"
                  required
                />
                <span className="mx-2">to</span>
                <Form.Control
                  type="number"
                  name="gradeTo"
                  value={formData.gradeTo}
                  onChange={(e) => setFormData({ ...formData, gradeTo: e.target.value })}
                  placeholder="To"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update User' : 'Add User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagement;