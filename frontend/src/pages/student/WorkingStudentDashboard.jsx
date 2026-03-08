import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WorkingStudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simple, direct localStorage check
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log('Dashboard: Checking auth...', { userData: !!userData, token: !!token });
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Dashboard: User found:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Dashboard: Error parsing user:', error);
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

  console.log('Dashboard: Rendering for user:', user.name);

  return (
    <div className="premium-container">
      {/* Premium Navbar */}
      <nav className="premium-navbar">
        <div className="premium-navbar-content">
          <div className="premium-brand">
            🎓 Academic Resource System
          </div>
          <div className="premium-user-section">
            <div className="premium-user-info">
              <div className="premium-user-avatar">👤</div>
              <div className="premium-user-details">
                <div className="premium-user-name">{user.name}</div>
                <div className="premium-user-role">Student</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="premium-button premium-button-error"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="premium-card">
        <div className="premium-card-header">
          <h1 className="premium-card-title">🎓 Student Dashboard</h1>
          <p className="premium-card-subtitle">
            Welcome back, <strong>{user.name}</strong>! 👋
          </p>
        </div>

        {/* User Info */}
        <div className="premium-card" style={{ marginBottom: '2rem', background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: '1rem' }}>📋 Your Information</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div>📧 <strong>Email:</strong> {user.email}</div>
            <div>🎓 <strong>Student ID:</strong> {user.studentId}</div>
            <div>🏢 <strong>Department:</strong> {user.department}</div>
            <div>📱 <strong>Phone:</strong> {user.phone}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📊 Quick Statistics</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📚</div>
              <div className="premium-stat-value">15</div>
              <div className="premium-stat-label">Total Resources</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✅</div>
              <div className="premium-stat-value">12</div>
              <div className="premium-stat-label">Available</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">⏳</div>
              <div className="premium-stat-value">3</div>
              <div className="premium-stat-label">Active Requests</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📋</div>
              <div className="premium-stat-value">2</div>
              <div className="premium-stat-label">Borrowed Items</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🚀 Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/student/browse" className="premium-button premium-button-primary">
              📚 Browse Resources
            </Link>
            <Link to="/student/browse" className="premium-button premium-button-success">
              ➕ New Request
            </Link>
            <Link to="/student/requests" className="premium-button premium-button-warning">
              📋 My Requests
            </Link>
            <Link to="/student/profile" className="premium-button premium-button-outline" style={{ background: '#6b7280', color: 'white' }}>
              👤 My Profile
            </Link>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📋 Recent Requests</h2>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    📚 Introduction to Algorithms
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Jan 15, 2024 - Due: Feb 15, 2024
                  </div>
                </div>
                <span className="premium-badge premium-badge-success">
                  ✅ Approved
                </span>
              </div>
            </div>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    💻 Dell Laptop Model XPS
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Jan 20, 2024 - Due: Feb 20, 2024
                  </div>
                </div>
                <span className="premium-badge premium-badge-info">
                  📚 Borrowed
                </span>
              </div>
            </div>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    📷 Canon DSLR Camera
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Jan 22, 2024
                  </div>
                </div>
                <span className="premium-badge premium-badge-warning">
                  ⏳ Pending
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/student/requests" className="premium-button premium-button-ghost">
              View All Requests →
            </Link>
          </div>
        </div>

        {/* Available Resources */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📚 Available Resources</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  📚
                </div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  Data Structures Book
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Computer Science
                </div>
                <Link to="/student/borrow/1" className="premium-button premium-button-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                  Request
                </Link>
              </div>
            </div>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  💻
                </div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  HP Laptop EliteBook
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Technology
                </div>
                <Link to="/student/borrow/2" className="premium-button premium-button-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                  Request
                </Link>
              </div>
            </div>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  📷
                </div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  Nikon DSLR Camera
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Photography
                </div>
                <Link to="/student/borrow/3" className="premium-button premium-button-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                  Request
                </Link>
              </div>
            </div>
            <div className="premium-card" style={{ padding: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  📱
                </div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  iPad Pro
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Technology
                </div>
                <Link to="/student/borrow/4" className="premium-button premium-button-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                  Request
                </Link>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/student/browse" className="premium-button premium-button-ghost">
              Browse All Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingStudentDashboard;
