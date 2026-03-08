import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userRole, setUserRole] = useState('student');
  const navigate = useNavigate();

  const handleQuickLogin = () => {
    console.log('🚀 Quick Login button clicked!');
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Simple direct login - no API calls
      let userData;
      let dashboardUrl;
      
      if (userRole === 'student') {
        userData = {
          _id: 'student123',
          name: 'John Student',
          email: 'john@student.com',
          role: 'student',
          studentId: 'STU001',
          department: 'Computer Science',
          phone: '1234567890'
        };
        dashboardUrl = '/student/dashboard';
      } else if (userRole === 'staff') {
        userData = {
          _id: 'staff123',
          name: 'Jane Staff',
          email: 'jane@staff.com',
          role: 'staff',
          department: 'Library Management',
          phone: '0987654321'
        };
        dashboardUrl = '/staff/dashboard';
      } else if (userRole === 'admin') {
        userData = {
          _id: 'admin123',
          name: 'Admin User',
          email: 'admin@university.com',
          role: 'admin',
          department: 'System Administration',
          phone: '5555555555'
        };
        dashboardUrl = '/admin/dashboard';
      }
      
      const token = 'simple-login-token';
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Login successful!', userData);
      
      // Show success message and navigate
      setSuccess('✅ Login successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        navigate(dashboardUrl);
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setError('❌ Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuickLogin();
  };

  const handleClearStorage = () => {
    console.log('🗑️ Clearing localStorage...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setSuccess('✅ Storage cleared');
    setError('');
  };

  return (
    <div className="premium-login-container">
      <div className="premium-login-wrapper">
        {/* Left Side - Welcome Section */}
        <div className="premium-login-welcome">
          <div className="premium-login-welcome-content">
            <div className="premium-login-welcome-header">
              <div className="premium-login-welcome-logo">
                🎓
              </div>
              <h1 className="premium-login-welcome-title">
                Welcome Back
              </h1>
              <p className="premium-login-welcome-subtitle">
                Academic Resource Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="premium-login-form-side">
          <div className="premium-login-form-card">
            <div className="premium-login-form-header">
              <p className="premium-login-form-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="premium-login-form">
              {error && (
                <div className="premium-alert premium-alert-error">
                  ⚠️ {error}
                </div>
              )}
              
              {success && (
                <div className="premium-alert premium-alert-success">
                  ✅ {success}
                </div>
              )}

              <div className="premium-form-group">
                <label className="premium-form-label">👤 User Role</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="premium-form-select"
                  style={{ background: 'rgba(255, 255, 255, 0.95)' }}
                >
                  <option value="student">👨‍🎓 Student</option>
                  <option value="staff">👨‍💼 Staff</option>
                  <option value="admin">👨‍💻 Admin</option>
                </select>
              </div>
              
              <div className="premium-form-group">
                <label className="premium-form-label">📧 Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="premium-form-input"
                  required
                />
              </div>
              
              <div className="premium-form-group">
                <label className="premium-form-label">🔒 Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="premium-form-input"
                  required
                />
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="premium-button premium-button-primary"
                style={{ width: '100%', height: '3rem', fontSize: '1rem' }}
              >
                {loading ? '🔄 Signing in...' : '🚀 Sign In'}
              </button>
            </form>
            
            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '1rem 0',
                textAlign: 'center'
              }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ 
                  padding: '0 1rem', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem'
                }}>
                  OR
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>
              
              <button
                onClick={handleQuickLogin}
                disabled={loading}
                className="premium-button premium-button-success"
                style={{ 
                  width: '100%', 
                  height: '3rem', 
                  fontSize: '1rem'
                }}
              >
                {loading ? '🔄 Logging in...' : '⚡ Quick Login (Test Mode)'}
              </button>
            </div>
            
            <div className="premium-login-form-footer">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: 'var(--primary-color)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
