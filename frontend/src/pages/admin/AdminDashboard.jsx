import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    activeRequests: 0,
    borrowedItems: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      setLoading(false);
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Set mock data
      setStats({
        totalUsers: 156,
        totalResources: 45,
        activeRequests: 23,
        borrowedItems: 18,
      });
      
      setRecentActivity([
        {
          _id: '1',
          action: 'New user registration',
          details: 'John Student (STU001) registered',
          timestamp: new Date('2024-01-23T10:30:00'),
          type: 'user'
        },
        {
          _id: '2',
          action: 'Resource request',
          details: 'Jane Smith requested "Dell Laptop XPS 15"',
          timestamp: new Date('2024-01-23T09:15:00'),
          type: 'request'
        },
        {
          _id: '3',
          action: 'Resource added',
          details: 'New resource "iPad Pro 12.9" added by staff',
          timestamp: new Date('2024-01-22T14:20:00'),
          type: 'resource'
        },
        {
          _id: '4',
          action: 'Request approved',
          details: 'Mike Johnson\'s camera request approved',
          timestamp: new Date('2024-01-22T11:45:00'),
          type: 'request'
        },
        {
          _id: '5',
          action: 'System backup',
          details: 'Daily database backup completed',
          timestamp: new Date('2024-01-22T02:00:00'),
          type: 'system'
        }
      ]);

      setSystemHealth({
        database: 'healthy',
        api: 'operational',
        storage: '85%',
        uptime: '99.9%',
        lastBackup: new Date('2024-01-22T02:00:00')
      });
      
    } catch (error) {
      console.error('Error parsing user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return '👤';
      case 'request': return '📋';
      case 'resource': return '📚';
      case 'system': return '⚙️';
      default: return '📄';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user': return '#10b981';
      case 'request': return '#3b82f6';
      case 'resource': return '#f59e0b';
      case 'system': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getHealthStatus = (status) => {
    switch (status) {
      case 'healthy':
      case 'operational':
        return { color: '#10b981', icon: '✅' };
      case 'warning':
        return { color: '#f59e0b', icon: '⚠️' };
      case 'error':
        return { color: '#ef4444', icon: '❌' };
      default:
        return { color: '#6b7280', icon: '❓' };
    }
  };

  if (loading) {
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

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            🛡️ Admin Dashboard
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
                👥
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Total Users</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                📚
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Total Resources</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalResources}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                ⏳
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Active Requests</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.activeRequests}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#ede9fe', borderRadius: '50%', marginRight: '1rem', fontSize: '1.5rem' }}>
                📦
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Borrowed Items</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>{stats.borrowedItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>🚀 Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link
              to="/admin/reports"
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
                📊
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>View Reports</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Generate reports</p>
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
                👥
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Manage Users</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>User management</p>
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
              <div style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                📚
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Manage Resources</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resource management</p>
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
              <div style={{ padding: '0.5rem', background: '#ede9fe', borderRadius: '0.5rem', marginRight: '1rem', fontSize: '1.25rem' }}>
                ⚙️
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>System Settings</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Configure system</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>🏥 System Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(systemHealth).map(([key, value]) => {
                if (key === 'lastBackup') return null;
                const health = getHealthStatus(value);
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span style={{ color: health.color, fontSize: '0.875rem', fontWeight: '600' }}>
                      {health.icon} {value}
                    </span>
                  </div>
                );
              })}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Last Backup
                </span>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {new Date(systemHealth.lastBackup).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>📈 Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Students
                </span>
                <span style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: '600' }}>
                  142
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Staff
                </span>
                <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '600' }}>
                  12
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Admins
                </span>
                <span style={{ color: '#8b5cf6', fontSize: '0.875rem', fontWeight: '600' }}>
                  2
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Resources Available
                </span>
                <span style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: '600' }}>
                  27/45
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>📋 Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivity.map((activity) => (
              <div key={activity._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'white', borderRadius: '50%', fontSize: '1.25rem' }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{activity.action}</p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{activity.details}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
