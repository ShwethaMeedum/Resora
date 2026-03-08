import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CleanStaffDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="clean-container">
        <div className="clean-card">
          <h2>Login Required</h2>
          <p>Please login to view your dashboard</p>
          <Link to="/login" className="clean-button">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-container">
      {/* Clean Navbar */}
      <div className="clean-navbar">
        <div className="clean-brand">
          🎓 Academic Resource System
        </div>
        <div className="clean-user-info">
          <span>👤 {user.name}</span>
          <button 
            onClick={handleLogout}
            className="clean-button clean-button-danger"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="clean-card">
        <h1 className="clean-title">👨‍💼 Staff Dashboard</h1>
        <p className="clean-subtitle">
          Welcome back, <strong>{user.name}</strong>! 👋
        </p>

        {/* User Info */}
        <div className="clean-info-box">
          <h3 style={{ marginBottom: '1rem' }}>📋 Your Information</h3>
          <div className="clean-info-item">📧 <strong>Email:</strong> {user.email}</div>
          <div className="clean-info-item">🏢 <strong>Department:</strong> {user.department}</div>
          <div className="clean-info-item">📱 <strong>Phone:</strong> {user.phone}</div>
        </div>

        {/* Quick Stats */}
        <div>
          <h2 className="clean-section-title">📊 System Statistics</h2>
          <div className="clean-stats">
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📚</div>
              <div className="clean-stat-value">25</div>
              <div className="clean-stat-label">Total Resources</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">✅</div>
              <div className="clean-stat-value">18</div>
              <div className="clean-stat-label">Available</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">📚</div>
              <div className="clean-stat-value">7</div>
              <div className="clean-stat-label">Borrowed</div>
            </div>
            <div className="clean-stat-card">
              <div className="clean-stat-icon">⏳</div>
              <div className="clean-stat-value">5</div>
              <div className="clean-stat-label">Pending Requests</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="clean-section-title">🚀 Quick Actions</h2>
          <div className="clean-actions">
            <Link to="/staff/resources" className="clean-button">
              📚 Manage Resources
            </Link>
            <Link to="/staff/requests" className="clean-button clean-button-warning">
              ⏳ Manage Requests
            </Link>
            <Link to="/staff/resources" className="clean-button clean-button-success">
              ➕ Add Resource
            </Link>
            <Link to="/staff/requests" className="clean-button" style={{ background: '#6b7280' }}>
              📊 View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanStaffDashboard;
