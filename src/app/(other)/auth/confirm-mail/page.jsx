import React from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import mailConfirmImg from '@/assets/images/png/mail-confirm.png';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';
const ConfirmMailPage = () => {
  return <>
    <PageBreadcrumb title='Confirm Mail' />
    <div className="auth-bg d-flex min-vh-100">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xxl={3} lg={5} md={6}>
          <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
            <img src={logoDark} alt="dark logo" height={26} className="logo-dark" />
            <img src={logo} alt="logo light" height={26} className="logo-light" />
          </Link>
          <p className="fw-semibold mb-4 text-center text-muted fs-15">Admin Panel Design by Daily Tuition Inc.</p>
          <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
            <h4 className="fw-semibold mb-4 fs-20">Verify Your Account</h4>
            <img src={mailConfirmImg} alt="img" width={86} className="mx-auto d-block" />
            <p className="text-muted fs-14 mt-2"> A email has been send to <b>youremail@domain.com</b>.
              Please check for an email from company and click on the included link to
              reset your password. </p>
            <Link to="/" className="btn d-block btn-primary mt-3">Back to
              Home</Link>
          </Card>
          <p className="mt-3 text-center mb-0">
           {currentYear} © Adminto - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Daily Tuition Inc.</span>
          </p>
        </Col>
      </Row>
    </div>
    </>;
};
export default ConfirmMailPage;