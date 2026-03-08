import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SimpleStaffDashboard = () => {
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
      <div className="minimal-container">
        <div className="minimal-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="minimal-container">
        <div className="minimal-card">
          <h2>Login Required</h2>
          <p>Please login to view your dashboard</p>
          <Link to="/login" className="minimal-button">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="minimal-container">
      {/* Simple Navbar */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            🎓 Academic Resource System
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>👤 {user.name}</span>
            <button 
              onClick={handleLogout}
              className="minimal-button"
              style={{ background: '#dc3545', padding: '0.5rem 1rem' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="minimal-card">
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          👨‍💼 Staff Dashboard
        </h1>
        <p style={{ marginBottom: '2rem' }}>
          Welcome back, <strong>{user.name}</strong>! 👋
        </p>

        {/* User Info */}
        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Your Information:</h3>
          <p>📧 Email: {user.email}</p>
          <p>🏢 Department: {user.department}</p>
          <p>📱 Phone: {user.phone}</p>
        </div>

        {/* Quick Stats */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>📊 System Statistics</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div className="minimal-card" style={{ background: '#e3f2fd', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>25</div>
              <div>Total Resources</div>
            </div>
            <div className="minimal-card" style={{ background: '#e8f5e8', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>18</div>
              <div>Available</div>
            </div>
            <div className="minimal-card" style={{ background: '#fff3cd', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>7</div>
              <div>Borrowed</div>
            </div>
            <div className="minimal-card" style={{ background: '#f8d7da', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>5</div>
              <div>Pending Requests</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>🚀 Quick Actions</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <Link to="/staff/resources" className="minimal-button" style={{ textAlign: 'center', display: 'block' }}>
              📚 Manage Resources
            </Link>
            <Link to="/staff/requests" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#ffc107' }}>
              ⏳ Manage Requests
            </Link>
            <Link to="/staff/resources" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#28a745' }}>
              ➕ Add Resource
            </Link>
            <Link to="/staff/requests" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#6c757d' }}>
              📊 View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStaffDashboard;
