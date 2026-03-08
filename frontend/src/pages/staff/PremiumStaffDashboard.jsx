import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PremiumStaffDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResources: 25,
    availableResources: 18,
    borrowedResources: 7,
    pendingRequests: 5,
    overdueItems: 2,
    newUsers: 12,
    activeUsers: 48,
    totalUsers: 156
  });
  const [recentRequests, setRecentRequests] = useState([
    {
      _id: '1',
      resource: { name: 'Introduction to Algorithms', type: 'Book', icon: '📚' },
      user: { name: 'John Student', studentId: 'STU001', avatar: '👨‍🎓' },
      status: 'pending',
      createdAt: new Date('2024-01-22'),
      priority: 'high'
    },
    {
      _id: '2',
      resource: { name: 'Dell Laptop XPS 15', type: 'Laptop', icon: '💻' },
      user: { name: 'Jane Smith', studentId: 'STU002', avatar: '👩‍🎓' },
      status: 'approved',
      createdAt: new Date('2024-01-23'),
      priority: 'normal'
    },
    {
      _id: '3',
      resource: { name: 'Canon EOS DSLR', type: 'Camera', icon: '📷' },
      user: { name: 'Mike Johnson', studentId: 'STU003', avatar: '👨‍🎓' },
      status: 'borrowed',
      createdAt: new Date('2024-01-21'),
      priority: 'normal'
    },
    {
      _id: '4',
      resource: { name: 'iPad Pro 12.9', type: 'Tablet', icon: '📱' },
      user: { name: 'Alice Brown', studentId: 'STU004', avatar: '👩‍🎓' },
      status: 'overdue',
      createdAt: new Date('2024-01-10'),
      priority: 'high'
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role === 'staff' || parsedUser.role === 'admin') {
          setUser(parsedUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'borrowed': return '📚';
      case 'returned': return '↩️';
      case 'rejected': return '❌';
      case 'overdue': return '⚠️';
      default: return '📋';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'premium-badge-warning',
      approved: 'premium-badge-success',
      borrowed: 'premium-badge-info',
      returned: 'premium-badge',
      rejected: 'premium-badge-error',
      overdue: 'premium-badge-error'
    };
    return colors[status] || 'premium-badge';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { color: '#dc2626', bg: '#fee2e2' };
      case 'normal': return { color: '#059669', bg: '#d1fae5' };
      case 'low': return { color: '#6b7280', bg: '#f3f4f6' };
      default: return { color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  if (loading) {
    return (
      <div className="premium-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column'
        }}>
          <div className="premium-spinner"></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="premium-container">
        <div className="premium-card">
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Please login to view your dashboard
          </h2>
          <div style={{ textAlign: 'center' }}>
            <Link to="/login" className="premium-button premium-button-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="premium-user-avatar">👨‍💼</div>
              <div className="premium-user-details">
                <div className="premium-user-name">{user.name}</div>
                <div className="premium-user-role">Staff Member</div>
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
          <h1 className="premium-card-title">👨‍💼 Staff Dashboard</h1>
          <p className="premium-card-subtitle">
            Welcome back, <strong>{user.name}</strong>! 👋 Manage resources and requests efficiently.
          </p>
        </div>

        {/* User Info */}
        <div className="premium-card" style={{ marginBottom: '2rem', background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: '1rem' }}>👤 Your Information</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div>📧 <strong>Email:</strong> {user.email}</div>
            <div>🏢 <strong>Department:</strong> {user.department}</div>
            <div>📱 <strong>Phone:</strong> {user.phone}</div>
            <div>👑 <strong>Role:</strong> <span className="premium-badge premium-badge-info">{user.role}</span></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📊 Resource Statistics</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📦</div>
              <div className="premium-stat-value">{stats.totalResources}</div>
              <div className="premium-stat-label">Total Resources</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✅</div>
              <div className="premium-stat-value">{stats.availableResources}</div>
              <div className="premium-stat-label">Available</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">📚</div>
              <div className="premium-stat-value">{stats.borrowedResources}</div>
              <div className="premium-stat-label">Borrowed</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">⏳</div>
              <div className="premium-stat-value">{stats.pendingRequests}</div>
              <div className="premium-stat-label">Pending</div>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">👥 User Statistics</h2>
          </div>
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">👥</div>
              <div className="premium-stat-value">{stats.totalUsers}</div>
              <div className="premium-stat-label">Total Users</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">🟢</div>
              <div className="premium-stat-value">{stats.activeUsers}</div>
              <div className="premium-stat-label">Active Users</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">🆕</div>
              <div className="premium-stat-value">{stats.newUsers}</div>
              <div className="premium-stat-label">New Users</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">⚠️</div>
              <div className="premium-stat-value">{stats.overdueItems}</div>
              <div className="premium-stat-label">Overdue Items</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🚀 Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/staff/resources" className="premium-button premium-button-primary">
              📦 Manage Resources with Photos
            </Link>
            <Link to="/staff/requests" className="premium-button premium-button-success">
              📋 Manage Requests
            </Link>
            <button className="premium-button premium-button-warning">
              📧 Generate Reports
            </button>
            <button className="premium-button premium-button-outline">
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📋 Recent Requests</h2>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {recentRequests.map((request) => (
              <div key={request._id} className="premium-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>{request.resource.icon}</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        {request.resource.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {request.resource.type}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span className={`premium-badge ${getStatusBadge(request.status)}`}>
                      {getStatusIcon(request.status)} {request.status}
                    </span>
                    <div style={{ 
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                      background: getPriorityColor(request.priority).bg,
                      color: getPriorityColor(request.priority).color,
                      fontWeight: '600'
                    }}>
                      {request.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>{request.user.avatar}</span>
                    <div>
                      <div style={{ fontWeight: '600' }}>{request.user.name}</div>
                      <div>{request.user.studentId}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="premium-button premium-button-success" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                    ✅ Approve
                  </button>
                  <button className="premium-button premium-button-error" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                    ❌ Reject
                  </button>
                  <button className="premium-button premium-button-ghost" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                    📄 Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/staff/requests" className="premium-button premium-button-ghost">
              View All Requests →
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🔗 Quick Links</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <Link to="/staff/resources" className="premium-card" style={{ 
              padding: '1.5rem', 
              textDecoration: 'none',
              color: 'inherit',
              transition: 'var(--transition-normal)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Resource Management</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Add, edit, and manage all resources in the system
                </p>
                <div className="premium-button premium-button-primary" style={{ fontSize: '0.875rem' }}>
                  Manage Resources →
                </div>
              </div>
            </Link>
            
            <Link to="/staff/requests" className="premium-card" style={{ 
              padding: '1.5rem', 
              textDecoration: 'none',
              color: 'inherit',
              transition: 'var(--transition-normal)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Request Management</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Approve, reject, and monitor all borrowing requests
                </p>
                <div className="premium-button premium-button-success" style={{ fontSize: '0.875rem' }}>
                  Manage Requests →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumStaffDashboard;
