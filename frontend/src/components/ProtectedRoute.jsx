import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  console.log('🛡️ ProtectedRoute: Rendering...');
  
  // Simple localStorage-based authentication - no AuthContext
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('🛡️ ProtectedRoute: Checking auth...', { hasToken: !!token, hasUser: !!userData });
    
    if (!token || !userData) {
      console.log('❌ ProtectedRoute: No auth data found');
      return { authenticated: false, user: null };
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      console.log('✅ ProtectedRoute: User authenticated:', parsedUser.name, 'Role:', parsedUser.role);
      
      // Check role permissions
      if (allowedRoles.length > 0 && !allowedRoles.includes(parsedUser.role)) {
        console.log('🚫 ProtectedRoute: Role not allowed', parsedUser.role, allowedRoles);
        return { authenticated: false, user: parsedUser };
      }
      
      return { authenticated: true, user: parsedUser };
    } catch (error) {
      console.error('❌ ProtectedRoute: Error parsing user data:', error);
      return { authenticated: false, user: null };
    }
  };

  const authResult = checkAuth();

  if (!authResult.authenticated) {
    console.log('🔒 ProtectedRoute: Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ ProtectedRoute: Access granted');
  return children;
};

export default ProtectedRoute;
