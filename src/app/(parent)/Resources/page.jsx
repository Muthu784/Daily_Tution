import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsPlayCircle } from 'react-icons/bs';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

const Resources = () => {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Dummy data for newsletters
  const newsletters = [
    { id: 1, title: 'Monthly Parent Update', date: 'March 2024', description: 'Latest updates and news for parents' },
    { id: 2, title: 'Educational Tips', date: 'February 2024', description: 'Tips for supporting your child\'s education' },
    { id: 3, title: 'School Events', date: 'January 2024', description: 'Upcoming events and activities' },
  ];

  // Updated training videos with video URLs
  const trainingVideos = [
    { 
      id: 1, 
      title: 'Getting Started with Parent Portal', 
      duration: '10:30', 
      thumbnail: 'https://www.animaker.com/blog/wp-content/uploads/2015/07/teacher-01.png',
      videoUrl: 'https://www.youtube.com/embed/example1'
    },
    { 
      id: 2, 
      title: 'Understanding Progress Reports', 
      duration: '15:45', 
      thumbnail: 'https://www.animaker.com/blog/wp-content/uploads/2015/07/teacher-01.png',
      videoUrl: 'https://www.youtube.com/embed/example2'
    },
    { 
      id: 3, 
      title: 'Communication Best Practices', 
      duration: '12:20', 
      thumbnail: 'https://www.animaker.com/blog/wp-content/uploads/2015/07/teacher-01.png',
      videoUrl: 'https://www.youtube.com/embed/example3'
    },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Resources</h1>

      {/* Social Media Section */}
      <section className="mb-5">
        <h2 className="mb-4">Connect With Us</h2>
        <Row className="g-3">
          <Col xs={12} sm={6} md={3}>
            <a href="#" className="text-decoration-none">
              <Card className="h-100 bg-primary text-white">
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <FaFacebook className="me-2" size={24} />
                  <span>Facebook</span>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#" className="text-decoration-none">
              <Card className="h-100" style={{ backgroundColor: '#E1306C' }}>
                <Card.Body className="d-flex align-items-center justify-content-center text-white">
                  <FaInstagram className="me-2" size={24} />
                  <span>Instagram</span>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#" className="text-decoration-none">
              <Card className="h-100 bg-dark text-white">
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <FaTwitter className="me-2" size={24} />
                  <span>Twitter</span>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <a href="#" className="text-decoration-none">
              <Card className="h-100" style={{ backgroundColor: '#0077B5' }}>
                <Card.Body className="d-flex align-items-center justify-content-center text-white">
                  <FaLinkedin className="me-2" size={24} />
                  <span>LinkedIn</span>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      </section>

      {/* Newsletter Section */}
      <section className="mb-5">
        <h2 className="mb-4">Newsletters</h2>
        <Row className="g-4">
          {newsletters.map((newsletter) => (
            <Col key={newsletter.id} xs={12}>
              <Card className="h-100">
                <Card.Body className="d-flex align-items-center">
                  <MdEmail className="text-primary me-3" size={32} />
                  <div>
                    <h3 className="h5 mb-1">{newsletter.title}</h3>
                    <p className="text-muted mb-1">{newsletter.description}</p>
                    <small className="text-muted">{newsletter.date}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Training Videos Section */}
      <section>
        <h2 className="mb-4">Training Videos</h2>
        <Row className="g-4">
          {trainingVideos.map((video) => (
            <Col key={video.id} xs={12} md={6} lg={4}>
              <Card className="h-100" style={{ cursor: 'pointer' }} onClick={() => handleVideoClick(video)}>
                <div className="position-relative">
                  <Card.Img variant="top" src={video.thumbnail} alt={video.title} />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <BsPlayCircle size={48} className="text-white opacity-75" />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Text className="text-muted">
                    Duration: {video.duration}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Video Modal */}
      <Modal show={selectedVideo !== null} onHide={handleCloseVideo} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <div className="ratio ratio-16x9">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Resources;