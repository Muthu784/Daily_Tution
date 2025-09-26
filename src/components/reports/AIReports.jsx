import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { ComponentContainerCard } from '../../../../../components/ComponentContainerCard';

const AIReports = () => {
  // Sample AI insights data - replace with actual data from your backend
  const aiInsights = [
    {
      id: 1,
      studentName: 'John Doe',
      subject: 'Mathematics',
      strength: 'Algebra',
      weakness: 'Geometry',
      learningStyle: 'Visual Learner',
      recommendation: 'Focus on geometric concepts with visual aids',
      lastUpdated: '2024-04-30'
    },
    // Add more sample data as needed
  ];

  return (
    <ComponentContainerCard title="AI Learning Insights">
      <CardBody>
        <Row>
          {aiInsights.map((insight) => (
            <Col key={insight.id} md={6} className="mb-4">
              <Card className="h-100">
                <CardHeader>
                  <h5 className="card-title mb-0">{insight.studentName}</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <h6>Subject: {insight.subject}</h6>
                    <p className="text-success mb-1">
                      <strong>Strength:</strong> {insight.strength}
                    </p>
                    <p className="text-danger mb-1">
                      <strong>Area for Improvement:</strong> {insight.weakness}
                    </p>
                    <p className="mb-1">
                      <strong>Learning Style:</strong> {insight.learningStyle}
                    </p>
                    <p className="mb-1">
                      <strong>Recommendation:</strong> {insight.recommendation}
                    </p>
                    <small className="text-muted">
                      Last Updated: {insight.lastUpdated}
                    </small>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </ComponentContainerCard>
  );
};

export default AIReports; 