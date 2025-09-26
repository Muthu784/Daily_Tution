import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { ComponentContainerCard } from '../../../../../components/ComponentContainerCard';

const QuizzesReport = () => {
  // Sample data - replace with actual data from your backend
  const quizData = [
    {
      id: 1,
      studentName: 'John Doe',
      quizName: 'Math Quiz 1',
      score: 85,
      totalQuestions: 20,
      date: '2024-04-30',
      timeSpent: '25 mins'
    },
    // Add more sample data as needed
  ];

  return (
    <ComponentContainerCard title="Quizzes Performance Report">
      <CardBody>
        <div className="table-responsive">
          <Table className="table-centered mb-0">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Quiz Name</th>
                <th>Score</th>
                <th>Total Questions</th>
                <th>Date</th>
                <th>Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.studentName}</td>
                  <td>{quiz.quizName}</td>
                  <td>{quiz.score}%</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.date}</td>
                  <td>{quiz.timeSpent}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </ComponentContainerCard>
  );
};

export default QuizzesReport; 