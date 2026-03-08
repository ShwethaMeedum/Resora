import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResources: 25,
    availableResources: 18,
    borrowedResources: 7,
    pendingRequests: 5,
  });
  const [recentRequests, setRecentRequests] = useState([
    {
      _id: '1',
      resource: { name: 'Introduction to Algorithms', type: 'Book' },
      user: { name: 'John Student', studentId: 'STU001' },
      status: 'pending',
      createdAt: new Date('2024-01-22'),
    },
    {
      _id: '2',
      resource: { name: 'Dell Laptop XPS 15', type: 'Laptop' },
      user: { name: 'Jane Smith', studentId: 'STU002' },
      status: 'pending',
      createdAt: new Date('2024-01-23'),
    },
    {
      _id: '3',
      resource: { name: 'Canon EOS DSLR', type: 'Camera' },
      user: { name: 'Mike Johnson', studentId: 'STU003' },
      status: 'approved',
      createdAt: new Date('2024-01-21'),
    },
  ]);
  const [overdueItems, setOverdueItems] = useState([
    {
      _id: '1',
      resource: { name: 'Data Structures Book', type: 'Book' },
      user: { name: 'Alice Brown', studentId: 'STU004' },
      dueDate: new Date('2024-01-10'),
      daysOverdue: 12,
    },
    {
      _id: '2',
      resource: { name: 'iPad Pro', type: 'Tablet' },
      user: { name: 'Bob Wilson', studentId: 'STU005' },
      dueDate: new Date('2024-01-15'),
      daysOverdue: 7,
    },
  ]);

  useEffect(() => {
    console.log('👨‍💼 Staff Dashboard: Component mounted!');
    
    // Check if user is logged in immediately
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log('👨‍💼 Staff Dashboard: Initial auth check...', { hasUser: !!userData, hasToken: !!token });
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ Staff Dashboard: User found immediately:', parsedUser.name);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (error) {
        console.error('❌ Staff Dashboard: Error parsing user data:', error);
      }
    }
    
    // If no data found initially, wait a bit and retry
    const timer = setTimeout(() => {
      const retryUserData = localStorage.getItem('user');
      const retryToken = localStorage.getItem('token');
      
      console.log('👨‍💼 Staff Dashboard: Retry auth check...', { hasUser: !!retryUserData, hasToken: !!retryToken });
      
      if (retryUserData && retryToken) {
        try {
          const parsedUser = JSON.parse(retryUserData);
          console.log('✅ Staff Dashboard: User found on retry:', parsedUser.name);
          setUser(parsedUser);
        } catch (error) {
          console.error('❌ Staff Dashboard: Error parsing user data on retry:', error);
        }
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'borrowed': return '📚';
      case 'rejected': return '❌';
      case 'returned': return '↩️';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'background: #fef3c7; color: #92400e;';
      case 'approved': return 'background: #d1fae5; color: #065f46;';
      case 'borrowed': return 'background: #dbeafe; color: #1e40af;';
      case 'rejected': return 'background: #fee2e2; color: #991b1b;';
      case 'returned': return 'background: #f3f4f6; color: #374151;';
      default: return 'background: #f3f4f6; color: #374151;';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Book': return '📚';
      case 'Laptop': return '💻';
      case 'Camera': return '📷';
      case 'Tablet': return '📱';
      case 'Projector': return '📽️';
      default: return '📦';
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // DEBUG: Always show what's happening
  console.log('👨‍💼 Staff Dashboard: Render state:', { loading, user: !!user });

  if (loading) {
    console.log('👨‍💼 Staff Dashboard: Showing loading state');
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('👨‍💼 Staff Dashboard: Showing login required state');
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', color: '#ef4444', margin: '0 auto 1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Login Required</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Please login to view your dashboard</p>
          <Link 
            to="/login" 
            style={{ 
              display: 'inline-block',
              background: '#3b82f6', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Check if user role matches
  if (user.role !== 'staff' && user.role !== 'admin') {
    console.log('👨‍💼 Staff Dashboard: Wrong role, redirecting...');
    setTimeout(() => {
      window.location.href = `/${user.role}/dashboard`;
    }, 100);
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #f59e0b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#6b7280' }}>Redirecting to correct dashboard...</p>
        </div>
      </div>
    );
  }

  console.log('👨‍💼 Staff Dashboard: Showing main dashboard for user:', user.name);

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Navbar */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 1rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          {/* Logo */}
          <Link 
            to="/staff/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1f2937'
            }}
          >
            🎓 Academic Resource System
          </Link>

          {/* Navigation Items */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Link
              to="/staff/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1f2937',
                background: '#f3f4f6',
                transition: 'background-color 0.2s, color 0.2s'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>🏠</span>
              Dashboard
            </Link>
            <Link
              to="/staff/resources"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#6b7280',
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.color = '#1f2937';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>📚</span>
              Manage Resources
            </Link>
            <Link
              to="/staff/requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#6b7280',
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.color = '#1f2937';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>📋</span>
              Manage Requests
            </Link>
          </div>

          {/* User Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#f9fafb',
              borderRadius: '0.375rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>👤</span>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                  {user.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            👨‍💼 Staff Dashboard
          </h1>
          <p style={{ color: '#6b7280' }}>Welcome back, {user.name}! 👋</p>
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            📧 {user.email} | 🏢 {user.department} | 📱 {user.phone}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#dbeafe', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                📚
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Total Resources</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalResources}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                ✅
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Available</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.availableResources}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                📚
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Borrowed</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.borrowedResources}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                ⏳
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Pending Requests</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.pendingRequests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>🚀 Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link
              to="/staff/resources"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ padding: '0.5rem', background: '#dbeafe', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                📚
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Manage Resources</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Add, edit, delete resources</p>
              </div>
            </Link>

            <Link
              to="/staff/requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                ⏳
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Manage Requests</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Approve/reject requests</p>
              </div>
            </Link>

            <Link
              to="/staff/resources"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ padding: '0.5rem', background: '#d1fae5', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                ➕
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Add Resource</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Add new resource</p>
              </div>
            </Link>

            <Link
              to="/staff/requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                📊
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Reports</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>View statistics</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Requests */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>📋 Recent Requests</h2>
            <Link to="/staff/requests" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
              View All →
            </Link>
          </div>
          
          {recentRequests.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentRequests.map((request) => (
                <div key={request._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.5rem', background: 'white', borderRadius: '50%', fontSize: '1.25rem' }}>
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937' }}>{request.resource?.name}</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {request.user?.name} ({request.user?.studentId}) • {request.resource?.type}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Requested: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', ...getStatusColor(request.status) }}>
                      {request.status}
                    </span>
                    {request.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{
                          padding: '0.25rem 0.5rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          ✅
                        </button>
                        <button style={{
                          padding: '0.25rem 0.5rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          ❌
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', color: '#9ca3af', margin: '0 auto 1rem' }}>📋</div>
              <p style={{ color: '#6b7280' }}>No recent requests found</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
