import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { ComponentContainerCard } from '../../../../../components/ComponentContainerCard';

const ProjectsReport = () => {
  // Sample project data - replace with actual data from your backend
  const projects = [
    {
      id: 1,
      projectName: 'Science Fair Project',
      studentName: 'John Doe',
      status: 'Completed',
      submissionDate: '2024-04-25',
      evaluationDate: '2024-04-28',
      grade: 'A',
      teacherComments: 'Excellent work! Very detailed and well-researched.',
      attachments: ['Project Report.pdf', 'Presentation.pptx']
    },
    // Add more sample data as needed
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'Completed': 'success',
      'In Progress': 'warning',
      'Not Started': 'danger',
      'Submitted': 'info'
    };
    return <Badge color={statusMap[status]}>{status}</Badge>;
  };

  return (
    <ComponentContainerCard title="Projects Status & Evaluation">
      <CardBody>
        <div className="table-responsive">
          <Table className="table-centered mb-0">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Student</th>
                <th>Status</th>
                <th>Submission Date</th>
                <th>Evaluation Date</th>
                <th>Grade</th>
                <th>Comments</th>
                <th>Attachments</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td>{project.studentName}</td>
                  <td>{getStatusBadge(project.status)}</td>
                  <td>{project.submissionDate}</td>
                  <td>{project.evaluationDate}</td>
                  <td>{project.grade}</td>
                  <td>{project.teacherComments}</td>
                  <td>
                    {project.attachments.map((file, index) => (
                      <div key={index}>
                        <a href="#" className="text-primary">
                          {file}
                        </a>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </ComponentContainerCard>
  );
};

export default ProjectsReport; 