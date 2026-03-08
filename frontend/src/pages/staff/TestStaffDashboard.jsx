import React from 'react';

const TestStaffDashboard = () => {
  // Get user directly from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          👨‍💼 Test Staff Dashboard
        </h1>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome Staff!</h2>
          <p style={{ marginBottom: '0.5rem' }}>Name: {user.name || 'Unknown'}</p>
          <p style={{ marginBottom: '0.5rem' }}>Email: {user.email || 'Unknown'}</p>
          <p style={{ marginBottom: '0.5rem' }}>Role: {user.role || 'Unknown'}</p>
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#d1fae5', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>✅ Staff Dashboard Working!</h3>
            <p style={{ color: '#065f46' }}>If you can see this, the staff dashboard is loading correctly.</p>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestStaffDashboard;
