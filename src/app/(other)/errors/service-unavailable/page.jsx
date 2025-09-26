import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ServiceUnavailablePage = () => {
  return <>
    <PageBreadcrumb title='Service Unavailable' />
    <div className="auth-bg d-flex min-vh-100">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xxl={3} lg={5} md={6}>
          <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
          <img src={logoDark} alt="dark logo" height={26} className="logo-dark" />
          <img src={logo} alt="logo light" height={26} className="logo-light" />
          </Link>
          <h4 className="fw-semibold mb-4 text-center fs-15">Responsive Admin Dashboard</h4>
          <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
            <div className="text-center">
              <h4 className="text-error fs-36">Services Unavailable !</h4>
              <h3 className="my-2">This site is temporarily down for improvements.</h3>
              <p className="text-muted mb-3">The server is currently unable to handle the request due to temporary
                overload or maintenance. Please try again later.</p>
              <Link to="/" className="btn btn-danger">
                <IconifyIcon icon='tabler:home' className="fs-16 me-1" /> Back to Home
              </Link>
            </div>
          </Card>
          <p className="mt-4 text-center mb-0">
           {currentYear} © Adminto - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Daily Tuition Inc.</span>
          </p>
        </Col>
      </Row>
    </div>
    </>;
};
export default ServiceUnavailablePage;