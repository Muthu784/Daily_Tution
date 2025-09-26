import { Card, Col, Row, Table } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const Performance = () => {
  const { user } = useAuth();
  const [expandedView, setExpandedView] = useState({
    quizzes: false,
    aiReports: false,
    projects: false
  });

  // Dummy data for Quizzes
  const quizData = [
    { subject: 'Mathematics', score: 92, date: '2024-03-15', status: 'Completed' },
    { subject: 'Science', score: 85, date: '2024-03-10', status: 'Completed' },
    { subject: 'English', score: 78, date: '2024-03-05', status: 'Completed' },
  ];

  // Dummy data for AI Reports
  const aiReports = [
    { title: 'Learning Pattern Analysis', date: '2024-03-18', type: 'Pattern' },
    { title: 'Performance Prediction', date: '2024-03-17', type: 'Prediction' },
    { title: 'Study Habit Insights', date: '2024-03-16', type: 'Behavior' },
  ];

  // Dummy data for Projects
  const projects = [
    { name: 'Science Fair Project', status: 'Completed', grade: 'A', dueDate: '2024-03-20' },
    { name: 'History Presentation', status: 'In Progress', grade: 'Pending', dueDate: '2024-03-25' },
    { name: 'Art Portfolio', status: 'Not Started', grade: 'Pending', dueDate: '2024-04-01' },
  ];

  const toggleView = (section) => {
    setExpandedView(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Performance Report</h1>
        </div>
      </div>

      <Row className="mt-4">
        <Col xl={4} md={6}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-uppercase fw-medium text-muted mb-0">Quizzes Report</h5>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-muted mb-3">View detailed quiz performance of each student</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-2">85%</h4>
                    <span className="badge bg-primary">Average Score</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => toggleView('quizzes')}
                  >
                    {expandedView.quizzes ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedView.quizzes && (
                  <>
                    <Table hover responsive className="table-sm">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Score</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizData.map((quiz, index) => (
                          <tr key={index}>
                            <td>{quiz.subject}</td>
                            <td>{quiz.score}%</td>
                            <td>{quiz.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <button className="btn btn-primary btn-sm w-100 mt-2">View All Quizzes</button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} md={6}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-uppercase fw-medium text-muted mb-0">AI Reports</h5>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-muted mb-3">Automatically generated AI-based learning insights</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-2">3</h4>
                    <span className="badge bg-info">New Insights</span>
                  </div>
                  <button 
                    className="btn btn-info btn-sm"
                    onClick={() => toggleView('aiReports')}
                  >
                    {expandedView.aiReports ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedView.aiReports && (
                  <>
                    <div className="list-group list-group-flush">
                      {aiReports.map((report, index) => (
                        <div key={index} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{report.title}</h6>
                              <small className="text-muted">{report.date}</small>
                            </div>
                            <span className="badge bg-info">{report.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-info btn-sm w-100 mt-2">View All Reports</button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} md={6}>
          <Card className="card-animate">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-uppercase fw-medium text-muted mb-0">Projects Report</h5>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-muted mb-3">Status of student project submissions</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-2">2/3</h4>
                    <span className="badge bg-success">In Progress</span>
                  </div>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => toggleView('projects')}
                  >
                    {expandedView.projects ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedView.projects && (
                  <>
                    <div className="list-group list-group-flush">
                      {projects.map((project, index) => (
                        <div key={index} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{project.name}</h6>
                              <small className="text-muted">Due: {project.dueDate}</small>
                            </div>
                            <div className="text-end">
                              <div className="badge bg-success mb-1">{project.status}</div>
                              <div className="text-muted">{project.grade}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-success btn-sm w-100 mt-2">View All Projects</button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Performance; 