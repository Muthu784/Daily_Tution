import FallbackLoading from '@/components/FallbackLoading';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { lazy, Suspense } from 'react';
const VerticalNavigationBar = lazy(() => import('@/components/layout/LeftSideBar/index'));
const TopBar = lazy(() => import('@/components/layout/TopBar/index'));

const AdminLayout = ({
  children
}) => {
  const { user } = useAuth();

  if (!user) {
    return null; // or redirect to login
  }

  return <>
      <div className="wrapper" id='leftside-menu-container'>
        <Suspense fallback={<FallbackLoading />}>
          <TopBar />
        </Suspense>

        <Suspense fallback={<FallbackLoading />}>
          <VerticalNavigationBar />
        </Suspense>

        <div className="page-content">
          <div className="container-fluid">
            <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>;
};

export default AdminLayout;