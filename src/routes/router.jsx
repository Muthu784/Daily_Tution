import { appRoutes, publicRoutes } from '@/routes/index';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import { useLayoutContext } from '@/context/useLayoutContext';
import HorizontalLayout from '@/layouts/HorizontalLayout';
import OtherLayout from '@/layouts/OtherLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { USER_TYPES } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';
import { AUTH_STATUS } from '@/types/auth';

// Import dashboard components
import AdminDashboard from '@/app/(admin)/dashboard/page';
import TeacherDashboard from '@/app/(teacher)/dashboard/page';
import StudentDashboard from '@/app/(student)/dashboard/page';
import ParentDashboard from '@/app/(parent)/dashboard/page';
import Performance from '@/app/(parent)/performance/pages';
import Attendance from '@/app/(parent)/attendance/page';
import ParentTeacherChat from '../app/(parent)/teacherchat/page';
import Resources from '../app/(parent)/Resources/page';
import Troubleshoot from '../app/(parent)/troubleshoot/page';
import ParentTeacherChats from '../app/(parent)/paymentfees/page';
import PaymentFees from '../app/(parent)/paymentfees/page';
import Usermanagement from '../app/(admin)/componentpage/dashboard/page';
import Overview from '../app/(admin)/overview/page';
import UserManagement from '../app/(admin)/user-management/page';
import Billing from '../app/(admin)/billing/page';
import Reports from '../app/(admin)/reports/page';
import Support from '../app/(admin)/support/page';
import AITools from '../app/(admin)/ai-tools/page';
import Troubleshoots from '../app/(admin)/troubleshoot/page';


const AppRouter = props => {
  const { orientation } = useLayoutContext();
  const { status } = useAuth();

  // If authentication status is loading, show loading state
  if (status === AUTH_STATUS.LOADING) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={<OtherLayout {...props}>{route.element}</OtherLayout>}
        />
      ))}

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedTypes={[USER_TYPES.ADMIN]}>
            <AdminLayout {...props}>
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/support" element={<Support />} />
                <Route path="/ai-tools" element={<AITools />} />
                {/* <Route path="/troubleshoot" element={<Troubleshoots />} /> */}
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/user-management" element={<Usermanagement />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Teacher routes */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute allowedTypes={[USER_TYPES.TEACHER]}>
            <AdminLayout {...props}>
              <Routes>
                <Route path="/dashboard" element={<TeacherDashboard />} />
                {/* Add more teacher routes here */}
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedTypes={[USER_TYPES.STUDENT]}>
            <AdminLayout {...props}>
              <Routes>
                <Route path="/dashboard" element={<StudentDashboard />} />
                {/* Add more student routes here */}
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Parent routes */}
      <Route
        path="/parent/*"
        element={
          <ProtectedRoute allowedTypes={[USER_TYPES.PARENT]}>
            <AdminLayout {...props}>
              <Routes>
                <Route path="/dashboard" element={<ParentDashboard />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/connect" element={<ParentTeacherChat/>} />
                <Route path="/resources" element={<Resources></Resources>} />
                <Route path="/troubleshoot" element={<Troubleshoot></Troubleshoot>} />
                <Route path="/payments" element={<PaymentFees></PaymentFees>} />

              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Default app routes */}
      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            orientation === 'vertical' ? (
              <AdminLayout {...props}>{route.element}</AdminLayout>
            ) : (
              <HorizontalLayout {...props}>{route.element}</HorizontalLayout>
            )
          }
        />
      ))}

      {/* Catch all route - redirect to login */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRouter;