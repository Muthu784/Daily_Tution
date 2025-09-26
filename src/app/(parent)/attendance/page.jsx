import { Card, Col, Row, Table, ProgressBar } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Attendance = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Dummy data for Monthly Attendance
  const monthlyAttendance = [
    { subject: 'Mathematics', totalClasses: 20, attended: 18, percentage: 90 },
    { subject: 'Science', totalClasses: 20, attended: 17, percentage: 85 },
    { subject: 'English', totalClasses: 20, attended: 19, percentage: 95 },
    { subject: 'History', totalClasses: 20, attended: 16, percentage: 80 },
  ];

  // Dummy data for Weekly Attendance
  const weeklyAttendance = [
    { week: 'Week 1', totalClasses: 5, attended: 5, percentage: 100 },
    { week: 'Week 2', totalClasses: 5, attended: 4, percentage: 80 },
    { week: 'Week 3', totalClasses: 5, attended: 5, percentage: 100 },
    { week: 'Week 4', totalClasses: 5, attended: 3, percentage: 60 },
  ];

  // Dummy data for Today's Attendance
  const todayAttendance = [
    { subject: 'Mathematics', startTime: '09:00 AM', endTime: '10:00 AM', minutesAttended: 45 },
    { subject: 'Science', startTime: '11:00 AM', endTime: '12:00 PM', minutesAttended: 60 },
    { subject: 'English', startTime: '02:00 PM', endTime: '03:00 PM', minutesAttended: 30 },
  ];

  // Dummy data for Calendar Attendance
  const calendarAttendance = {
    '2024-05-01': { status: 'present', classes: 4, percentage: 100 },
    '2024-05-02': { status: 'absent', classes: 0, percentage: 0 },
    '2024-05-03': { status: 'present', classes: 4, percentage: 100 },
    '2024-05-04': { status: 'present', classes: 3, percentage: 75 },
    '2024-05-05': { status: 'weekend', classes: 0, percentage: 0 },
    '2024-05-06': { status: 'present', classes: 4, percentage: 100 },
    '2024-05-07': { status: 'late', classes: 2, percentage: 50 },
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const attendance = calendarAttendance[dateStr];
      
      if (attendance) {
        return (
          <div className="calendar-tile-content">
            <div className={`attendance-dot ${attendance.status}`} />
            {attendance.classes > 0 && (
              <div className="classes-count">{attendance.classes} classes</div>
            )}
            {attendance.percentage > 0 && (
              <div className="attendance-percentage">{attendance.percentage}%</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const attendance = calendarAttendance[dateStr];
      if (attendance) {
        return `calendar-tile-${attendance.status}`;
      }
    }
    return '';
  };

  const renderMonthlyAttendance = () => (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-4">Monthly Attendance Report</h5>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Classes</th>
              <th>Attended</th>
              <th>Percentage</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {monthlyAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.totalClasses}</td>
                <td>{item.attended}</td>
                <td>{item.percentage}%</td>
                <td>
                  <ProgressBar
                    now={item.percentage}
                    label={`${item.percentage}%`}
                    variant={item.percentage >= 80 ? 'success' : item.percentage >= 60 ? 'warning' : 'danger'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderWeeklyAttendance = () => (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-4">Weekly Attendance Breakdown</h5>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Week</th>
              <th>Total Classes</th>
              <th>Attended</th>
              <th>Percentage</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {weeklyAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.week}</td>
                <td>{item.totalClasses}</td>
                <td>{item.attended}</td>
                <td>{item.percentage}%</td>
                <td>
                  <ProgressBar
                    now={item.percentage}
                    label={`${item.percentage}%`}
                    variant={item.percentage >= 80 ? 'success' : item.percentage >= 60 ? 'warning' : 'danger'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderTodayAttendance = () => (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-4">Today's Live Attendance</h5>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Time</th>
              <th>Minutes Attended</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todayAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.startTime} - {item.endTime}</td>
                <td>{item.minutesAttended}</td>
                <td>
                  <span className={`badge bg-${item.minutesAttended >= 45 ? 'success' : 'warning'}`}>
                    {item.minutesAttended >= 45 ? 'Present' : 'Late'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderCalendar = () => (
    <Card>
      <Card.Body>
        <h5 className="card-title mb-4">Attendance Timeline</h5>
        <div className="timeline-container">
          <div className="timeline-header">
            <div className="month-navigation">
              <button 
                className="btn btn-outline-primary" 
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
              >
                <i className="fas fa-chevron-left"></i> Previous Month
              </button>
              <h3 className="current-month">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
              >
                Next Month <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="timeline-content">
            {Array.from({ length: 31 }, (_, i) => {
              const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
              if (date.getMonth() !== selectedDate.getMonth()) return null;
              
              const dateStr = date.toISOString().split('T')[0];
              const attendance = calendarAttendance[dateStr];
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              
              return (
                <div key={i} className={`timeline-item ${isWeekend ? 'weekend' : ''}`}>
                  <div className="timeline-date">
                    <div className="date-circle">
                      <span className="day-number">{date.getDate()}</span>
                      <span className="day-name">{date.toLocaleString('default', { weekday: 'short' })}</span>
                    </div>
                  </div>
                  
                  <div className="timeline-content">
                    {attendance ? (
                      <div className={`attendance-card ${attendance.status}`}>
                        <div className="attendance-header">
                          <div className="status-badge">{attendance.status}</div>
                          {attendance.classes > 0 && (
                            <div className="classes-badge">
                              <i className="fas fa-book"></i> {attendance.classes} Classes
                            </div>
                          )}
                        </div>
                        
                        <div className="attendance-details">
                          <div className="attendance-stats">
                            <div className="stat-item">
                              <div className="stat-label">Attendance Rate</div>
                              <div className="stat-value">{attendance.percentage}%</div>
                            </div>
                            {attendance.classes > 0 && (
                              <div className="stat-item">
                                <div className="stat-label">Classes Attended</div>
                                <div className="stat-value">{attendance.classes}</div>
                              </div>
                            )}
                          </div>
                          
                          <div className="attendance-progress">
                            <div className="progress">
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${attendance.percentage}%` }}
                                aria-valuenow={attendance.percentage} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              >
                                {attendance.percentage}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-data">
                        {isWeekend ? 'Weekend' : 'No Attendance Data'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="timeline-legend">
            <div className="legend-item">
              <div className="legend-color present"></div>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <div className="legend-color late"></div>
              <span>Late</span>
            </div>
            <div className="legend-item">
              <div className="legend-color absent"></div>
              <span>Absent</span>
            </div>
            <div className="legend-item">
              <div className="legend-color weekend"></div>
              <span>Weekend</span>
            </div>
          </div>
        </div>
      </Card.Body>

      <style jsx>{`
        .timeline-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .timeline-header {
          margin-bottom: 30px;
        }

        .month-navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .current-month {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
        }

        .timeline-content {
          position: relative;
          padding-left: 100px;
        }

        .timeline-content::before {
          content: '';
          position: absolute;
          left: 50px;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: #e9ecef;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 30px;
          display: flex;
          align-items: flex-start;
        }

        .timeline-date {
          position: absolute;
          left: -100px;
          width: 80px;
          text-align: center;
        }

        .date-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #fff;
          border: 2px solid #007bff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .day-number {
          font-size: 20px;
          font-weight: bold;
          color: #2c3e50;
        }

        .day-name {
          font-size: 12px;
          color: #6c757d;
        }

        .timeline-content {
          flex: 1;
          padding-left: 20px;
        }

        .attendance-card {
          background: white;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-left: 4px solid;
        }

        .attendance-card.present { border-left-color: #28a745; }
        .attendance-card.late { border-left-color: #ffc107; }
        .attendance-card.absent { border-left-color: #dc3545; }
        .attendance-card.weekend { border-left-color: #6c757d; }

        .attendance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-badge {
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .present .status-badge { background-color: #28a745; color: white; }
        .late .status-badge { background-color: #ffc107; color: #000; }
        .absent .status-badge { background-color: #dc3545; color: white; }
        .weekend .status-badge { background-color: #6c757d; color: white; }

        .classes-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #6c757d;
          font-size: 14px;
        }

        .attendance-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .attendance-stats {
          display: flex;
          gap: 20px;
        }

        .stat-item {
          flex: 1;
        }

        .stat-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: bold;
          color: #2c3e50;
        }

        .attendance-progress {
          margin-top: 10px;
        }

        .progress {
          height: 8px;
          background-color: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar {
          background-color: #007bff;
          color: white;
          font-size: 0.7em;
          text-align: center;
          line-height: 8px;
        }

        .no-data {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 10px;
          color: #6c757d;
          text-align: center;
        }

        .timeline-legend {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-color.present { background-color: #28a745; }
        .legend-color.late { background-color: #ffc107; }
        .legend-color.absent { background-color: #dc3545; }
        .legend-color.weekend { background-color: #6c757d; }

        .weekend .date-circle {
          border-color: #6c757d;
        }
      `}</style>
    </Card>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Attendance Report</h1>
        </div>
      </div>

      <Row className="mb-4">
        <Col>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${activeTab === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'today' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {activeTab === 'monthly' && renderMonthlyAttendance()}
          {activeTab === 'weekly' && renderWeeklyAttendance()}
          {activeTab === 'today' && renderTodayAttendance()}
          {activeTab === 'calendar' && renderCalendar()}
        </Col>
      </Row>

      <style jsx>{`
        .calendar-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .calendar-tile-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .attendance-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 2px;
        }
        .attendance-dot.present {
          background-color: #28a745;
        }
        .attendance-dot.late {
          background-color: #ffc107;
        }
        .attendance-dot.absent {
          background-color: #dc3545;
        }
        .attendance-dot.weekend {
          background-color: #6c757d;
        }
        .classes-count {
          font-size: 12px;
          color: #6c757d;
        }
        .attendance-percentage {
          font-size: 14px;
          font-weight: bold;
          color: #495057;
        }
        .calendar-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        :global(.react-calendar) {
          width: 100%;
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-size: 16px;
        }
        :global(.react-calendar__tile) {
          padding: 1em;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        :global(.react-calendar__tile--now) {
          background: rgba(0, 123, 255, 0.1);
        }
        :global(.react-calendar__tile--active) {
          background: rgba(0, 123, 255, 0.2);
        }
        :global(.react-calendar__navigation) {
          margin-bottom: 1.5em;
        }
        :global(.react-calendar__navigation button) {
          min-width: 60px;
          background: none;
          border: none;
          font-size: 18px;
          margin-top: 8px;
        }
        :global(.react-calendar__month-view__weekdays) {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.9em;
        }
        :global(.react-calendar__month-view__weekdays__weekday) {
          padding: 0.8em;
        }
        :global(.react-calendar__month-view__weekdays__weekday abbr) {
          text-decoration: none;
        }
        :global(.react-calendar__tile.calendar-tile-present) {
          background-color: rgba(40, 167, 69, 0.2) !important;
        }
        :global(.react-calendar__tile.calendar-tile-late) {
          background-color: rgba(255, 193, 7, 0.2) !important;
        }
        :global(.react-calendar__tile.calendar-tile-absent) {
          background-color: rgba(220, 53, 69, 0.2) !important;
        }
        :global(.react-calendar__tile.calendar-tile-weekend) {
          background-color: rgba(108, 117, 125, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Attendance; 