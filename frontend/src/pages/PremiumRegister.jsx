import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PremiumRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    studentId: '',
    department: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickRegister = () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simple direct registration - no API calls
    const userData = {
      _id: 'newuser123',
      name: formData.name || 'New Student',
      email: formData.email || 'student@test.com',
      role: formData.role || 'student',
      studentId: formData.studentId || 'STU001',
      department: formData.department || 'Computer Science',
      phone: formData.phone || '1234567890'
    };
    
    const token = 'simple-register-token';
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('Registration successful!', userData);
    
    // Show success message and navigate
    setSuccess('✅ Registration successful! Redirecting to dashboard...');
    
    setTimeout(() => {
      if (userData.role === 'student') {
        navigate('/student/dashboard');
      } else if (userData.role === 'staff') {
        navigate('/staff/dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuickRegister();
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

        {/* Right Side - Register Form */}
        <div className="premium-login-form-side">
          <div className="premium-login-form-card">
            <div className="premium-login-form-header">
              <p className="premium-login-form-subtitle">
                Fill in your details to create your account
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
                <label className="premium-form-label">👤 Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="premium-form-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">📧 Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="premium-form-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">🔒 Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="premium-form-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">👥 User Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="premium-form-select"
                  style={{ background: 'rgba(255, 255, 255, 0.95)' }}
                >
                  <option value="student">👨‍🎓 Student</option>
                  <option value="staff">👨‍💼 Staff</option>
                  <option value="admin">👨‍💻 Admin</option>
                </select>
              </div>

              {formData.role === 'student' && (
                <div className="premium-form-group">
                  <label className="premium-form-label">🆔 Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter your student ID"
                    className="premium-form-input"
                  />
                </div>
              )}

              <div className="premium-form-group">
                <label className="premium-form-label">🏢 Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                  className="premium-form-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-form-label">📱 Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="premium-form-input"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="premium-button premium-button-primary"
                style={{ width: '100%', height: '3rem', fontSize: '1rem' }}
              >
                {loading ? '🔄 Creating Account...' : '🚀 Create Account'}
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
                onClick={handleQuickRegister}
                disabled={loading}
                className="premium-button premium-button-success"
                style={{ 
                  width: '100%', 
                  height: '3rem', 
                  fontSize: '1rem'
                }}
              >
                {loading ? '🔄 Quick Registering...' : '⚡ Quick Register (Test Mode)'}
              </button>
            </div>
            
            <div className="premium-login-form-footer">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--primary-color)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumRegister;
