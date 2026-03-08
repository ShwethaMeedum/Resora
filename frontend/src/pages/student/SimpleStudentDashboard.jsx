import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SimpleStudentDashboard = () => {
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
          🎓 Student Dashboard
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
          <p>🎓 Student ID: {user.studentId}</p>
          <p>🏢 Department: {user.department}</p>
          <p>📱 Phone: {user.phone}</p>
        </div>

        {/* Quick Stats */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>📊 Quick Stats</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div className="minimal-card" style={{ background: '#e3f2fd', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>15</div>
              <div>Total Resources</div>
            </div>
            <div className="minimal-card" style={{ background: '#e8f5e8', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
              <div>Available</div>
            </div>
            <div className="minimal-card" style={{ background: '#fff3cd', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
              <div>Active Requests</div>
            </div>
            <div className="minimal-card" style={{ background: '#d1ecf1', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2</div>
              <div>Borrowed Items</div>
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
            <Link to="/student/browse" className="minimal-button" style={{ textAlign: 'center', display: 'block' }}>
              📚 Browse Resources
            </Link>
            <Link to="/student/browse" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#28a745' }}>
              ➕ New Request
            </Link>
            <Link to="/student/requests" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#ffc107' }}>
              📋 My Requests
            </Link>
            <Link to="/student/profile" className="minimal-button" style={{ textAlign: 'center', display: 'block', background: '#6c757d' }}>
              👤 My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStudentDashboard;
