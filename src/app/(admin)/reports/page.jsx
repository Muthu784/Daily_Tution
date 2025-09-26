import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Table, Form } from 'react-bootstrap';
import autoTable from "jspdf-autotable";
import jsPDF from 'jspdf';
// import logo from "../../../../public/favicon.ico";

const Reports = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [viewType, setViewType] = useState('income'); // 'income' or 'expense'

  const handleViewReport = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setShowModal(true);
  };

  const handleDownloadReport = (title, data) => {
    const doc = new jsPDF();
  
    // Add watermark/logo (top right corner)
    // doc.addImage(logo, "PNG", 150, 10, 40, 15); // Adjust size and position
  
    // Title
    doc.setFontSize(18);
    doc.text(`Report: ${title}`, 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
  
    // Prepare table data
    const rows = [];
  
    data.forEach((item) => {
      if (typeof item === "object" && item.subjects) {
        rows.push([
          { content: `ID: ${item.id} | Name: ${item.name}`, colSpan: 3, styles: { halign: 'left', fillColor: [230, 230, 250] } }
        ]);
  
        item.subjects.forEach((subj) => {
          rows.push([subj.subject, subj.marks, subj.grade]);
        });
      } else {
        const flatData = Object.entries(item).map(([key, val]) => `${key}: ${val}`).join(", ");
        rows.push([{ content: flatData, colSpan: 3 }]);
      }
  
      // Add spacing between each item
      rows.push([{ content: "", colSpan: 3 }]);
    });
  
    // Generate table
    autoTable(doc, {
      head: [["Subject", "Marks", "Grade"]],
      body: rows,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
      didDrawPage: (data) => {
        // Footer
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.height - 10);
      },
    });
  
    doc.save(`${title}.pdf`);
  };

  const handleGenerateExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      teacherId: formData.get('teacherId'),
      name: formData.get('name'),
      salary: formData.get('salary'),
    };
    setExpenseData([...expenseData, newExpense]);
    setShowExpenseModal(false);
  };

  const reports = [
    {
      title: 'Student Performance',
      description: 'View detailed performance reports of all students',
      icon: '📊',
      type: 'performance',
      data: [
        {
          id: 'S101',
          name: 'Alice Johnson',
          subjects: [
            { subject: 'Mathematics', marks: 85, grade: 'A' },
            { subject: 'Science', marks: 78, grade: 'B+' },
          ],
        },
        {
          id: 'S102',
          name: 'Brian Lee',
          subjects: [
            { subject: 'Mathematics', marks: 74, grade: 'B' },
            { subject: 'English', marks: 80, grade: 'A-' },
          ],
        },
        {
          id: 'S103',
          name: 'Chloe Kim',
          subjects: [
            { subject: 'English', marks: 91, grade: 'A+' },
            { subject: 'History', marks: 88, grade: 'A' },
          ],
        },
        {
          id: 'S104',
          name: 'David Smith',
          subjects: [
            { subject: 'History', marks: 66, grade: 'C' },
            { subject: 'Geography', marks: 70, grade: 'B-' },
          ],
        },
        {
          id: 'S105',
          name: 'Ella Brown',
          subjects: [
            { subject: 'Geography', marks: 59, grade: 'D' },
            { subject: 'Science', marks: 62, grade: 'C-' },
          ],
        },
      ],
    },
    {
      title: 'Attendance Reports',
      description: 'Track attendance patterns and statistics',
      icon: '📝',
      type: 'attendance',
      data: [
        { studentId: 'S101', name: 'Alice Johnson', role: 'Student', presentDays: 18, totalDays: 20 },
        { studentId: 'S102', name: 'Brian Lee', role: 'Student', presentDays: 20, totalDays: 20 },
        { studentId: 'S103', name: 'Chloe Kim', role: 'Student', presentDays: 19, totalDays: 20 },
        { studentId: 'S104', name: 'David Smith', role: 'Student', presentDays: 16, totalDays: 20 },
        { studentId: 'S105', name: 'Ella Brown', role: 'Student', presentDays: 15, totalDays: 20 },
        { teacherId: 'T201', name: 'Mr. Anderson', role: 'Teacher', presentDays: 22, totalDays: 22 },
        { teacherId: 'T202', name: 'Ms. Martinez', role: 'Teacher', presentDays: 21, totalDays: 22 },
      ],
    },
    {
      title: 'Financial Reports',
      description: 'Generate financial statements and revenue reports',
      icon: '💰',
      type: 'financial',
      data: [
        { studentId: 'S101', name: 'Alice Johnson', feesPaid: 3000, feesPending: 1000, dueDate: '2025-06-10' },
        { studentId: 'S102', name: 'Brian Lee', feesPaid: 4000, feesPending: 0, dueDate: null },
        { studentId: 'S103', name: 'Chloe Kim', feesPaid: 2500, feesPending: 1500, dueDate: '2025-06-15' },
        { studentId: 'S104', name: 'David Smith', feesPaid: 2000, feesPending: 2000, dueDate: '2025-05-30' },
        { studentId: 'S105', name: 'Ella Brown', feesPaid: 1000, feesPending: 3000, dueDate: '2025-06-05' },
      ],
    },
    {
      title: 'Teacher Performance',
      description: 'Evaluate teacher performance and class statistics',
      icon: '👨‍🏫',
      type: 'teacher',
      data: [
        { teacherId: 'T201', name: 'Mr. Anderson', feedbackScore: 4.2, grade: 'A' },
        { teacherId: 'T202', name: 'Ms. Martinez', feedbackScore: 4.8, grade: 'A+' },
        { teacherId: 'T203', name: 'Mr. Patel', feedbackScore: 3.5, grade: 'B' },
      ],
    },
  ];

  const recentReports = [
    {
      title: 'Q1 Performance Report',
      description: 'Detailed Q1 performance data',
      type: 'Performance',
      data: [
        { id: 'S101', name: 'Alice Johnson', marks: 85, grade: 'A' },
        { id: 'S102', name: 'Brian Lee', marks: 74, grade: 'B' },
      ],
    },
    {
      title: 'March Attendance Summary',
      description: 'Attendance summary for March',
      type: 'Attendance',
      data: [
        { studentId: 'S101', name: 'Alice Johnson', presentDays: 18, totalDays: 20 },
        { studentId: 'S102', name: 'Brian Lee', presentDays: 20, totalDays: 20 },
      ],
    },
  ];

  const filteredData = modalData
    ? modalData.filter((item) => {
        const values = Object.values(item).join(' ').toLowerCase();
        return values.includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div className="reports-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports</h2>
        <Button variant="primary" onClick={() => setShowExpenseModal(true)}>
          Generate New Expense
        </Button>
      </div>

      <Row>
        {reports.map((report, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="display-4 me-3">{report.icon}</span>
                  <div>
                    <h4 className="mb-1">{report.title}</h4>
                    <p className="text-muted mb-0">{report.description}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewReport(report.title, report.data)}
                  >
                    View Report
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDownloadReport(report.title, report.data)}
                  >
                    Download
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <h4 className="mb-3">Recent Reports</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Generated On</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.title}</td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>{report.type}</td>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleViewReport(report.title, report.data)}
                      >
                        View
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleDownloadReport(report.title, report.data)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Expense Modal */}
      <Modal show={showExpenseModal} onHide={() => setShowExpenseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGenerateExpense}>
            <Form.Group className="mb-3">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control type="text" name="teacherId" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="number" name="salary" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredData && filteredData.length > 0 && modalTitle === 'Student Performance' ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((student, index) =>
                  student.subjects.map((subject, subIndex) => (
                    <tr key={`${index}-${subIndex}`}>
                      {subIndex === 0 && (
                        <>
                          <td rowSpan={student.subjects.length}>{student.id}</td>
                          <td rowSpan={student.subjects.length}>{student.name}</td>
                        </>
                      )}
                      <td>{subject.subject}</td>
                      <td>{subject.marks}</td>
                      <td>{subject.grade}</td>
                      {subIndex === 0 && (
                        <td rowSpan={student.subjects.length}>
                          <Button
                            size="sm"
                            variant="outline-success"
                            onClick={() =>
                              handleDownloadReport(`${modalTitle}_${student.id}`, [student])
                            }
                          >
                            Download
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          ) : filteredData && filteredData.length > 0 && modalTitle === 'Attendance Reports' ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Present Days</th>
                  <th>Total Days</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.studentId || item.teacherId}</td>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.presentDays}</td>
                    <td>{item.totalDays}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => handleDownloadReport(`${modalTitle}_Row${index + 1}`, [item])}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : filteredData && filteredData.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {Object.keys(filteredData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx}>{value || 'N/A'}</td>
                    ))}
                    <td>
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => handleDownloadReport(`${modalTitle}_Row${index + 1}`, [item])}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No data available to display.</p>
          )}
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

export default Reports;
