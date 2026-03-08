import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import PremiumLogin from './pages/PremiumLogin';
import PremiumRegister from './pages/PremiumRegister';
import TestSimple from './pages/TestSimple';
import TestPremium from './pages/TestPremium';
import SimplePremiumTest from './pages/SimplePremiumTest';
import BasicTest from './pages/BasicTest';
import MinimalTest from './pages/MinimalTest';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import SimpleStudentDashboard from './pages/student/SimpleStudentDashboard';
import CleanStudentDashboard from './pages/student/CleanStudentDashboard';
import WorkingStudentDashboard from './pages/student/WorkingStudentDashboard';
import TestDashboard from './pages/student/TestDashboard';
import BrowseResources from './pages/student/BrowseResources';
import CompleteBrowseResources from './pages/student/CompleteBrowseResources';
import BorrowForm from './pages/student/BorrowForm';
import CompleteBorrowForm from './pages/student/CompleteBorrowForm';
import MyRequests from './pages/student/MyRequests';
import CompleteMyRequests from './pages/student/CompleteMyRequests';
import CleanMyRequests from './pages/student/CleanMyRequests';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import SimpleStaffDashboard from './pages/staff/SimpleStaffDashboard';
import CleanStaffDashboard from './pages/staff/CleanStaffDashboard';
import TestStaffDashboard from './pages/staff/TestStaffDashboard';
import PremiumStaffDashboard from './pages/staff/PremiumStaffDashboard';
import ManageResources from './pages/staff/ManageResources';
import PremiumManageResources from './pages/staff/PremiumManageResources';
import PremiumManageResourcesWithPhotos from './pages/staff/PremiumManageResourcesWithPhotos';
import ManageRequests from './pages/staff/ManageRequests';
import PremiumManageRequests from './pages/staff/PremiumManageRequests';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PremiumLogin />} />
          <Route path="/register" element={<PremiumRegister />} />
          <Route path="/test" element={<TestSimple />} />
          <Route path="/test-premium" element={<TestPremium />} />
          <Route path="/test-simple" element={<SimplePremiumTest />} />
          <Route path="/test-basic" element={<BasicTest />} />
          <Route path="/test-minimal" element={<MinimalTest />} />
          
          {/* Test Routes - No Protection */}
          <Route path="/test/student" element={<TestDashboard />} />
          <Route path="/test/staff" element={<TestStaffDashboard />} />
          
          {/* Protected Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <WorkingStudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/browse"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CompleteBrowseResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/borrow/:resourceId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CompleteBorrowForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/requests"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CompleteMyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Profile</h1>
                  <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <p>Profile page coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Protected Staff Routes */}
          <Route
            path="/staff/dashboard"
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <PremiumStaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/resources"
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <PremiumManageResourcesWithPhotos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/requests"
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <PremiumManageRequests />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/test-minimal" replace />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
