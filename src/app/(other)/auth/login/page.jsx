import React, { useState, useCallback } from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { currentYear } from '@/context/constants';
import { useAuth } from '@/context/AuthContext';
import { USER_TYPES } from '@/types/auth';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// Hardcoded credentials for testing
const TEST_CREDENTIALS = {
  [USER_TYPES.ADMIN]: {
    email: 'admin@school.com',
    password: 'admin123',
    name: 'Lokki Raaj',
    image: 'https://www.shutterstock.com/image-vector/wicked-red-devil-logo-illustration-600nw-1612871848.jpg'
  },
  [USER_TYPES.TEACHER]: {
    email: 'teacher@school.com',
    password: 'teacher123',
    name: 'Shriya Saran',
    image: 'https://i.pinimg.com/736x/f1/b3/fc/f1b3fc51595be472424aeab37104a629.jpg'
  },
  [USER_TYPES.STUDENT]: {
    email: 'student@school.com',
    password: 'student123',
    name: 'Aadhvik',
    type: 'student',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNoCF78K327cI9VW8iJ84b9WghrqEeWykL1w&s'
  },
  [USER_TYPES.PARENT]: {
    email: 'parent@school.com',
    password: 'parent123',
    name: 'Ajith Kumar',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7sT5tLkUgwQZnFXs1Cco5DZNOpGyfuQDvjblMBQXEjpmPBIOJAHPHq5JmyJViOWKUmjU&usqp=CAU'
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(USER_TYPES.STUDENT);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const credentials = TEST_CREDENTIALS[userType];
    
    if (email === credentials.email && password === credentials.password) {
      login({
        email,
        type: userType,
        name: credentials.name,
        image: credentials.image
      });

      // Redirect to appropriate dashboard
      switch (userType) {
        case USER_TYPES.ADMIN:
          navigate('/admin/dashboard');
          break;
        case USER_TYPES.TEACHER:
          navigate('/teacher/dashboard');
          break;
        case USER_TYPES.STUDENT:
          navigate('/student/dashboard');
          break;
        case USER_TYPES.PARENT:
          navigate('/parent/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return <>
    <PageBreadcrumb title='Login' />
    <div className="auth-bg d-flex min-vh-100 position-relative">
      {/* Particles Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#242124",
              },
              gradient: {
                start: "#000000",
                stop: "#1a1a1a",
                type: "linear",
                angle: 45
              }
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#3e60d5",
              },
              links: {
                color: "#3e60d5",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3 position-relative" style={{ zIndex: 1 }}>
        <Col xxl={3} lg={5} md={6}>
          <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
            <img src={logoDark} alt="dark logo" height={46} className="logo-dark" />
            <img src={logo} alt="logo light" height={46} className="logo-light" />
          </Link>
          <p className="fw-semibold mb-4 text-center text-muted fs-15">Admin Panel Design by Daily Tuition Inc.</p>
          <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
            <h4 className="fw-semibold mb-3 fs-18">Log in to your account</h4>
            <Form onSubmit={handleSubmit} className="text-start mb-3">
              <div className="mb-3">
                <label className="form-label" htmlFor="userType">User Type</label>
                <Form.Select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-control"
                >
                  <option value={USER_TYPES.STUDENT}>Student</option>
                  <option value={USER_TYPES.TEACHER}>Teacher</option>
                  <option value={USER_TYPES.ADMIN}>Admin</option>
                  <option value={USER_TYPES.PARENT}>Parent</option>
                </Form.Select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                  <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                </div>
                <Link to="/auth/recover-password" className="text-muted border-bottom border-dashed">
                  Forgot Password?
                </Link>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary fw-semibold" type="submit">
                  Login
                </button>
              </div>
            </Form>

            <p className="text-muted fs-14 mb-0">
              Don't have an account? &nbsp;
              <Link to="/auth/register" className="fw-semibold text-danger ms-1">
                Sign Up!
              </Link>
            </p>
          </Card>
          <p className="mt-4 text-center mb-0">
           {currentYear} © Adminto - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Daily Tuition Inc.</span>
          </p>
        </Col>
      </Row>
    </div>
  </>;
};

export default Login;