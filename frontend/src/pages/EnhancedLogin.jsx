import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'staff'  // Changed default to staff
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Debug log
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock login success with role-based data
      let userData;
      let dashboardUrl;
      
      console.log('Selected role:', formData.role); // Debug log
      
      if (formData.role === 'student') {
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
      } else if (formData.role === 'staff') {
        userData = {
          _id: 'staff123',
          name: 'Jane Staff',
          email: 'jane@staff.com',
          role: 'staff',
          department: 'Library Management',
          phone: '0987654321'
        };
        dashboardUrl = '/staff/dashboard';
      } else if (formData.role === 'admin') {
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
      
      const token = 'mock-jwt-token';
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Login successful:', userData);
      console.log('Redirecting to:', dashboardUrl);
      
      // Redirect to appropriate dashboard
      navigate(dashboardUrl);
      
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-icon">🎓</div>
          <h2>Academic Resource System</h2>
          <p>Sign in to access your account</p>
          <div className="current-role">
            Current Role: <strong>{formData.role}</strong>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="role">👤 Select Your Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="role-select"
              required
            >
              <option value="staff">👨‍💼 Staff (Library Management)</option>
              <option value="student">👨‍🎓 Student</option>
              <option value="admin">👨‍💻 Administrator</option>
            </select>
            <i className="fa-solid fa-user-tag input-icon"></i>
          </div>
          
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <i className="fa-solid fa-user input-icon"></i>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <i className="fa-solid fa-lock input-icon"></i>
          </div>
          
          {error && (
            <div className="error-message">
              <i className="fa-solid fa-exclamation-triangle"></i>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                <i className="fa-solid fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <p><a href="#">Forgot password?</a></p>
        </div>
      </div>
      
      <style jsx>{`
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .logo-icon {
          font-size: 48px;
          margin-bottom: 15px;
          display: block;
        }
        
        .login-header h2 {
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        
        .login-header p {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }
        
        .current-role {
          margin-top: 15px;
          padding: 8px 12px;
          background: var(--primary-lightest);
          border: 1px solid var(--primary-light);
          border-radius: 8px;
          color: var(--primary-dark);
          font-size: var(--font-size-sm);
        }
        
        .input-group {
          position: relative;
          margin-bottom: 20px;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: var(--text-primary);
          font-size: var(--font-size-sm);
        }
        
        .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
          margin-top: 12px;
        }
        
        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--font-size-sm);
        }
        
        .login-footer {
          text-align: center;
          margin-top: 20px;
        }
        
        .login-footer p {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          margin-bottom: 10px;
        }
        
        .login-footer a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        }
        
        .login-footer a:hover {
          text-decoration: underline;
        }
        
        .role-select {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-family: var(--font-family);
          font-size: var(--font-size-sm);
          transition: var(--transition-normal);
          background: white;
          color: var(--text-primary);
        }
        
        .role-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .fa-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EnhancedLogin;
