import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from localStorage instead of AuthContext
  const getUser = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const user = getUser();

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getNavItems = () => {
    const items = [];

    if (user?.role === 'student') {
      items.push(
        { path: '/student/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/student/browse', label: 'Browse Resources', icon: '📚' },
        { path: '/student/requests', label: 'My Requests', icon: '📋' },
        { path: '/student/profile', label: 'Profile', icon: '👤' }
      );
    } else if (user?.role === 'staff') {
      items.push(
        { path: '/staff/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/staff/resources', label: 'Manage Resources', icon: '📚' },
        { path: '/staff/requests', label: 'Manage Requests', icon: '📋' }
      );
    } else if (user?.role === 'admin') {
      items.push(
        { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/admin/reports', label: 'Reports', icon: '📊' }
      );
    }

    return items;
  };

  const navItems = getNavItems();

  return (
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
          to={user ? `/${user.role}/dashboard` : '/login'}
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
        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: isActivePath(item.path) ? '#1f2937' : '#6b7280',
                  background: isActivePath(item.path) ? '#f3f4f6' : 'transparent',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isActivePath(item.path)) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.color = '#1f2937';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActivePath(item.path)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* User Menu */}
        {user && (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
