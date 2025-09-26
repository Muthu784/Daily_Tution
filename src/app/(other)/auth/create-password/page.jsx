import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CreatePasswordPage = () => {
  return <>
      <PageBreadcrumb title='Create Password' />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <img src={logo} alt="logo light" height={26} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Admin Panel Design by Daily Tuition Inc.</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-2 fs-20">Create New Password</h4>
              <p className="text-muted mb-2">Please create your new password.</p>
              <p className="mb-4">Need password suggestion ? <a href="#!" className="link-dark fw-semibold text-decoration-underline">Suggestion</a></p>
              <form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="new-password">Create New Password <small className="text-info ms-1">Must be at least 8 characters</small></label>
                  <input type="password" id="new-password" name="new-password" className="form-control" placeholder="New Password" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="re-password">Reenter New Password</label>
                  <input type="password" id="re-password" name="re-password" className="form-control" placeholder="Reenter Password" />
                </div>
                <div className="mb-2 d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">Create New Password</button>
                </div>
              </form>
              <p className="text-muted fs-14 mb-0">
                Back To <Link to="/auth/login" className="fw-semibold text-danger ms-1">Login !</Link>
              </p>
            </Card>
            <p className="mt-3 text-center mb-0">
             {currentYear} © Adminto - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Daily Tuition Inc.</span>
            </p>
          </Col>
        </Row>
      </div>
    </>;
};
export default CreatePasswordPage;