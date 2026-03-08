import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModernLogin = () => {
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
    <div className="login-container">
      {/* Hero Background */}
      <div className="login-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element floating-book">📚</div>
          <div className="floating-element floating-laptop">💻</div>
          <div className="floating-element floating-graduation">🎓</div>
          <div className="floating-element floating-coffee">☕</div>
        </div>

        {/* Login Form Container */}
        <div className="login-form-container fade-in-up">
          <div className="login-form-card card-glass">
            {/* Header */}
            <div className="login-header">
              <div className="login-logo">
                <div className="logo-icon">🎓</div>
                <h1 className="logo-title">Academic Resource System</h1>
              </div>
              <p className="login-subtitle">Sign in to access your academic resources</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="alert alert-error">
                  <span className="alert-icon">⚠️</span>
                  <span className="alert-message">{error}</span>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success">
                  <span className="alert-icon">✅</span>
                  <span className="alert-message">{success}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">👤 Select Your Role</label>
                <div className="role-selector">
                  <button
                    type="button"
                    className={`role-option ${userRole === 'student' ? 'active' : ''}`}
                    onClick={() => setUserRole('student')}
                  >
                    <span className="role-icon">👨‍🎓</span>
                    <span className="role-text">Student</span>
                  </button>
                  <button
                    type="button"
                    className={`role-option ${userRole === 'staff' ? 'active' : ''}`}
                    onClick={() => setUserRole('staff')}
                  >
                    <span className="role-icon">👨‍💼</span>
                    <span className="role-text">Staff</span>
                  </button>
                  <button
                    type="button"
                    className={`role-option ${userRole === 'admin' ? 'active' : ''}`}
                    onClick={() => setUserRole('admin')}
                  >
                    <span className="role-icon">👨‍💻</span>
                    <span className="role-text">Admin</span>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">📧 Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="form-input"
                    required
                  />
                  <span className="input-icon">📧</span>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">🔒 Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                  />
                  <span className="input-icon">🔒</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    🚀 Sign In
                  </>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="login-divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>
            
            {/* Quick Login */}
            <button
              onClick={handleQuickLogin}
              disabled={loading}
              className="btn btn-success btn-lg"
              style={{ width: '100%' }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  ⚡ Quick Login (Test Mode)
                </>
              )}
            </button>
            
            {/* Footer */}
            <div className="login-footer">
              <p className="footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="footer-link">
                  Sign up here
                </Link>
              </p>
              <button
                onClick={handleClearStorage}
                className="btn btn-ghost btn-sm"
                style={{ marginTop: 'var(--spacing-2)' }}
              >
                🗑️ Clear Storage
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="welcome-content slide-in-left">
          <div className="welcome-text">
            <h1 className="welcome-title">Welcome to Your Academic Hub</h1>
            <p className="welcome-description">
              Access thousands of resources, manage your borrowing requests, and enhance your learning experience with our comprehensive academic resource management system.
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">📚</span>
                <span className="feature-text">Extensive Resource Library</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <span className="feature-text">Easy Request Management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Real-time Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Smart Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .login-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-hero);
          opacity: 0.9;
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          font-size: 2rem;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .floating-book {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-laptop {
          top: 20%;
          right: 15%;
          animation-delay: 1.5s;
        }

        .floating-graduation {
          bottom: 30%;
          left: 15%;
          animation-delay: 3s;
        }

        .floating-coffee {
          bottom: 20%;
          right: 10%;
          animation-delay: 4.5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .login-form-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          padding: var(--spacing-8);
        }

        .login-form-card {
          padding: var(--spacing-8);
          border-radius: var(--radius-3xl);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
        }

        .login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-3);
          margin-bottom: var(--spacing-4);
        }

        .logo-icon {
          font-size: var(--font-size-4xl);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          font-family: var(--font-family-display);
        }

        .login-subtitle {
          color: var(--text-secondary);
          font-size: var(--font-size-base);
          margin-bottom: 0;
        }

        .login-form {
          margin-bottom: var(--spacing-6);
        }

        .role-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-2);
        }

        .role-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-1);
          padding: var(--spacing-3);
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .role-option:hover {
          border-color: var(--primary-light);
          background: var(--primary-lightest);
        }

        .role-option.active {
          border-color: var(--primary-color);
          background: var(--primary-lightest);
        }

        .role-icon {
          font-size: var(--font-size-xl);
        }

        .role-text {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
        }

        .role-option.active .role-text {
          color: var(--primary-dark);
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: var(--spacing-4);
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          margin: var(--spacing-6) 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--gray-300);
        }

        .divider-text {
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .login-footer {
          text-align: center;
          margin-top: var(--spacing-6);
        }

        .footer-text {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .footer-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: var(--font-weight-semibold);
          transition: color var(--transition-normal);
        }

        .footer-link:hover {
          color: var(--primary-dark);
        }

        .welcome-content {
          position: absolute;
          left: var(--spacing-12);
          top: 50%;
          transform: translateY(-50%);
          max-width: 500px;
          z-index: 5;
        }

        .welcome-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-inverse);
          margin-bottom: var(--spacing-6);
          font-family: var(--font-family-display);
          line-height: var(--line-height-tight);
        }

        .welcome-description {
          font-size: var(--font-size-lg);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: var(--spacing-8);
          line-height: var(--line-height-relaxed);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          color: var(--text-inverse);
          font-size: var(--font-size-base);
        }

        .feature-icon {
          font-size: var(--font-size-lg);
          opacity: 0.9;
        }

        @media (max-width: 1024px) {
          .welcome-content {
            display: none;
          }
          
          .login-form-container {
            max-width: 100%;
            padding: var(--spacing-4);
          }
        }

        @media (max-width: 640px) {
          .role-selector {
            grid-template-columns: 1fr;
          }
          
          .login-form-card {
            padding: var(--spacing-6);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLogin;
