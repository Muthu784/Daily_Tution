import React from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';
const RegisterPage = () => {
  return <>
      <PageBreadcrumb title='Register' />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <img src={logo} alt="logo light" height={26} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Admin Panel Design by Daily Tuition Inc.</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-3 fs-18">Sign Up to your account</h4>
              <Form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-name">Your Name</label>
                  <Form.Control type="text" id="example-name" name="example-name" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-email">Email</label>
                  <Form.Control type="email" id="example-email" name="example-email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-password">Password</label>
                  <Form.Control type="password" id="example-password" placeholder="Enter your password" />
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                    <label className="form-check-label" htmlFor="checkbox-signin">I agree to all <Link to="#!" className="link-dark text-decoration-underline">Terms &amp; Condition</Link> </label>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">Sign Up</button>
                </div>
              </Form>
              <p className="text-nuted fs-14 mb-0">Already have an account? <Link to="/auth/login" className="fw-semibold text-danger ms-1">Login !</Link></p>
            </Card>
            <p className="mt-4 text-center mb-0">
             {currentYear} © Adminto - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Daily Tuition Inc.</span>
            </p>
          </Col>
        </Row>
      </div>
    </>;
};
export default RegisterPage;